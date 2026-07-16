export const CONTACT_MAX_BODY_BYTES = 16_384;

const CONTACT_TYPES = new Set([
  "솔루션 도입",
  "제품 도입",
  "스튜디오 제작",
  "시연·쇼룸 방문",
  "자료 요청",
  "기술 지원",
  "일반 문의",
]);

export type ContactSubmission = {
  type: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: true;
  marketing: boolean;
  sourcePage: string;
  sourceCampaign: string;
  isBot: boolean;
};

type ContactError = { ok: false; status: number; error: string };
type ContactSuccess = { ok: true; value: ContactSubmission };
export type ContactValidationResult = ContactError | ContactSuccess;

function error(status: number, message: string): ContactError {
  return { ok: false, status, error: message };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textField(
  input: Record<string, unknown>,
  key: string,
  options: { required?: boolean; max: number; fallback?: string },
): string | ContactError {
  const raw = input[key] ?? options.fallback ?? "";
  if (typeof raw !== "string") return error(400, `Invalid ${key}`);

  const value = raw.trim();
  if (options.required && !value) return error(400, `Missing ${key}`);
  if (value.length > options.max || value.includes("\0")) return error(413, `Invalid ${key}`);
  return value;
}

export function validateContactPayload(input: unknown): ContactValidationResult {
  if (!isRecord(input)) return error(400, "Invalid request");

  const website = textField(input, "website", { max: 200 });
  if (typeof website !== "string") return website;
  if (website) {
    return {
      ok: true,
      value: {
        type: "일반 문의",
        company: "",
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: true,
        marketing: false,
        sourcePage: "",
        sourceCampaign: "",
        isBot: true,
      },
    };
  }

  const type = textField(input, "type", { max: 40, fallback: "일반 문의" });
  if (typeof type !== "string") return type;
  if (!CONTACT_TYPES.has(type)) return error(400, "Invalid type");

  const company = textField(input, "company", { max: 200 });
  if (typeof company !== "string") return company;
  const name = textField(input, "name", { required: true, max: 100 });
  if (typeof name !== "string") return name;
  const email = textField(input, "email", { required: true, max: 320 });
  if (typeof email !== "string") return email;
  const phone = textField(input, "phone", { max: 50 });
  if (typeof phone !== "string") return phone;
  const message = textField(input, "message", { required: true, max: 5_000 });
  if (typeof message !== "string") return message;
  const sourcePage = textField(input, "sourcePage", { max: 500 });
  if (typeof sourcePage !== "string") return sourcePage;
  const sourceCampaign = textField(input, "sourceCampaign", { max: 200 });
  if (typeof sourceCampaign !== "string") return sourceCampaign;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error(400, "Invalid email");
  if (input.consent !== true) return error(400, "Consent is required");
  if (input.marketing !== undefined && typeof input.marketing !== "boolean") {
    return error(400, "Invalid marketing consent");
  }

  return {
    ok: true,
    value: {
      type,
      company,
      name,
      email,
      phone,
      message,
      consent: true,
      marketing: input.marketing === true,
      sourcePage,
      sourceCampaign,
      isBot: false,
    },
  };
}

export function validateContactRequestMetadata(request: Request): ContactError | null {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) return error(415, "JSON request required");

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const requestUrl = new URL(request.url);
      const originUrl = new URL(origin);
      const expectedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? requestUrl.host;
      const expectedProtocol = request.headers.get("x-forwarded-proto") ?? requestUrl.protocol.replace(":", "");
      if (originUrl.host !== expectedHost || originUrl.protocol !== `${expectedProtocol}:`) {
        return error(403, "Origin not allowed");
      }
    } catch {
      return error(403, "Origin not allowed");
    }
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const length = Number(declaredLength);
    if (!Number.isFinite(length) || length < 0) return error(400, "Invalid content length");
    if (length > CONTACT_MAX_BODY_BYTES) return error(413, "Request too large");
  }

  return null;
}

async function readLimitedBody(request: Request): Promise<string | ContactError> {
  if (!request.body) return error(400, "Missing request body");

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > CONTACT_MAX_BODY_BYTES) {
      await reader.cancel();
      return error(413, "Request too large");
    }
    body += decoder.decode(value, { stream: true });
  }

  body += decoder.decode();
  return body;
}

export async function parseContactRequest(request: Request): Promise<ContactValidationResult> {
  const metadataError = validateContactRequestMetadata(request);
  if (metadataError) return metadataError;

  const rawBody = await readLimitedBody(request);
  if (typeof rawBody !== "string") return rawBody;

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return error(400, "Invalid JSON");
  }
  return validateContactPayload(parsed);
}
