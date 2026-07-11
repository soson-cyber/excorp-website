"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { withLocale, type Locale } from "@/lib/i18n";

// 문의 유형 — API로 전송되는 값은 ko로 통일(route.ts 수정 금지). 영문 폼은 라벨만 영어로 보여준다.
const types = ["솔루션 도입", "제품 도입", "스튜디오 제작", "시연·쇼룸 방문", "자료 요청", "기술 지원", "일반 문의"] as const;
const typeLabels: Record<Locale, Record<(typeof types)[number], string>> = {
  ko: {
    "솔루션 도입": "솔루션 도입",
    "제품 도입": "제품 도입",
    "스튜디오 제작": "스튜디오 제작",
    "시연·쇼룸 방문": "시연·쇼룸 방문",
    "자료 요청": "자료 요청",
    "기술 지원": "기술 지원",
    "일반 문의": "일반 문의",
  },
  en: {
    "솔루션 도입": "Solution adoption",
    "제품 도입": "Product adoption",
    "스튜디오 제작": "Studio production",
    "시연·쇼룸 방문": "Demo · showroom visit",
    "자료 요청": "Resource Request",
    "기술 지원": "Technical support",
    "일반 문의": "General inquiry",
  },
};

const COPY = {
  ko: {
    errMissing: "이름·이메일·문의 내용을 입력해 주세요.",
    errEmail: "올바른 이메일 형식을 입력해 주세요.",
    errConsent: "개인정보 수집·이용에 동의해 주세요.",
    errSend: "전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.",
    successTitle: "문의가 접수되었습니다.",
    successBody: "담당자가 영업일 기준 1~2일 내에 회신드립니다. 급하시면 031-699-8228로 전화 주세요.",
    downloadChecklist: "체크리스트 다운로드",
    downloadNote: "그 외 자료는 영업일 1~2일 내 이메일로 보내드립니다.",
    newInquiry: "새 문의 작성 →",
    name: "이름",
    company: "회사 / 기관",
    email: "이메일",
    type: "문의 유형",
    message: "문의 내용",
    required: "(필수)",
    requiredNote: "표시는 필수 항목입니다.",
    consent: "개인정보 수집·이용에 동의합니다.",
    consentTag: "(필수)",
    consentLink: "자세히 보기",
    marketing: "(선택) EX의 소식·제품 정보 수신에 동의합니다.",
    submit: "문의 보내기 →",
    submitting: "전송 중…",
  },
  en: {
    errMissing: "Please enter your name, email, and message.",
    errEmail: "Please enter a valid email address.",
    errConsent: "Please agree to the collection and use of personal information.",
    errSend: "Something went wrong. Please try again shortly or reach us by phone.",
    successTitle: "Your inquiry has been received.",
    successBody: "A team member will get back to you within 1–2 business days. For urgent matters, call +82-31-699-8228.",
    downloadChecklist: "Download checklist",
    downloadNote: "We'll email any other materials within 1–2 business days.",
    newInquiry: "Write a new inquiry →",
    name: "Name",
    company: "Company / Organization",
    email: "Email",
    type: "Inquiry type",
    message: "Message",
    required: "(required)",
    requiredNote: "indicates a required field.",
    consent: "I agree to the collection and use of my personal information.",
    consentTag: "(required)",
    consentLink: "Learn more",
    marketing: "(optional) I'd like to receive news and product updates from EX.",
    submit: "Send message →",
    submitting: "Sending…",
  },
} as const;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ defaultType, locale = "ko" }: { defaultType?: string; locale?: Locale }) {
  const t = COPY[locale];
  const labels = typeLabels[locale];
  // URL의 ?type= 값을 클라이언트에서 읽어 초기 선택값으로. (Suspense 경계 안에서 렌더 →
  // 페이지 정적 생성 유지) prop defaultType > URL type(유효할 때) > 첫 유형 순.
  const params = useSearchParams();
  const urlType = params.get("type");
  const presetType =
    defaultType ?? (urlType && (types as readonly string[]).includes(urlType) ? urlType : types[0]);
  const [selectedType, setSelectedType] = useState<string>(presetType);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  // Announce + move focus to the success message when it appears.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function focusField(name: string) {
    const el = formRef.current?.elements.namedItem(name) as HTMLElement | null;
    el?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const missing = ["name", "email", "message"].filter((k) => !String(data[k] ?? "").trim());
    if (missing.length) {
      setInvalid(missing);
      setError(t.errMissing);
      setStatus("error");
      focusField(missing[0]);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      setInvalid(["email"]);
      setError(t.errEmail);
      setStatus("error");
      focusField("email");
      return;
    }
    if (data.consent !== "on") {
      setInvalid(["consent"]);
      setError(t.errConsent);
      setStatus("error");
      focusField("consent");
      return;
    }

    setInvalid([]);
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: data.consent === "on",
          marketing: data.marketing === "on",
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setError(t.errSend);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-success/40 bg-surface p-8 text-center">
        <p ref={successRef} tabIndex={-1} className="font-semibold text-success outline-none">
          {t.successTitle}
        </p>
        <p className="mt-2 text-sm text-muted">{t.successBody}</p>
        {selectedType === "자료 요청" && (
          <div className="mt-5">
            <a
              href="/downloads/ex-virtual-studio-checklist.pdf"
              download
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
            >
              {t.downloadChecklist} ↓
            </a>
            <p className="mt-3 text-xs text-faint">{t.downloadNote}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-lav hover:underline"
        >
          {t.newInquiry}
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-fg placeholder:text-faint focus:border-primary aria-[invalid=true]:border-error";
  const describedBy = (n: string) => (invalid.includes(n) && error ? "cf-error" : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-medium text-muted">
            {t.name} <span aria-hidden="true" className="text-lav">*</span>
            <span className="sr-only">{t.required}</span>
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            className={field}
            aria-invalid={invalid.includes("name") || undefined}
            aria-describedby={describedBy("name")}
          />
        </div>
        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-xs font-medium text-muted">
            {t.company}
          </label>
          <input id="cf-company" name="company" autoComplete="organization" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-xs font-medium text-muted">
          {t.email} <span aria-hidden="true" className="text-lav">*</span>
          <span className="sr-only">{t.required}</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={field}
          aria-invalid={invalid.includes("email") || undefined}
          aria-describedby={describedBy("email")}
        />
      </div>
      <div>
        <label htmlFor="cf-type" className="mb-1.5 block text-xs font-medium text-muted">
          {t.type}
        </label>
        <select
          id="cf-type"
          name="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className={field}
        >
          {types.map((opt) => (
            <option key={opt} value={opt}>
              {labels[opt]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-medium text-muted">
          {t.message} <span aria-hidden="true" className="text-lav">*</span>
          <span className="sr-only">{t.required}</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          className={field}
          aria-invalid={invalid.includes("message") || undefined}
          aria-describedby={describedBy("message")}
        />
      </div>

      {status === "error" && error && (
        <p id="cf-error" role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      <p className="text-xs text-faint">
        <span aria-hidden="true">*</span> {t.requiredNote}
      </p>

      <div className="flex items-start gap-2.5">
        <input
          id="cf-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border bg-card text-primary accent-primary focus:ring-primary aria-[invalid=true]:border-error"
          aria-invalid={invalid.includes("consent") || undefined}
          aria-describedby={describedBy("consent")}
        />
        <label htmlFor="cf-consent" className="text-xs leading-relaxed text-muted">
          {t.consent} <span className="text-lav">{t.consentTag}</span>{" "}
          <a
            href={withLocale("/privacy", locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lav underline-offset-4 hover:underline"
          >
            {t.consentLink}
          </a>
        </label>
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="cf-marketing"
          name="marketing"
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border bg-card text-primary accent-primary focus:ring-primary"
        />
        <label htmlFor="cf-marketing" className="text-xs leading-relaxed text-muted">
          {t.marketing}
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
