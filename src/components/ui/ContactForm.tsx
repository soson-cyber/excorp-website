"use client";

import { useEffect, useRef, useState } from "react";

const types = ["솔루션 도입", "제품 도입", "스튜디오 제작", "기술 지원", "일반 문의"] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ defaultType }: { defaultType?: string }) {
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
      setError("이름·이메일·문의 내용을 입력해 주세요.");
      setStatus("error");
      focusField(missing[0]);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      setInvalid(["email"]);
      setError("올바른 이메일 형식을 입력해 주세요.");
      setStatus("error");
      focusField("email");
      return;
    }

    setInvalid([]);
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setError("전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-success/40 bg-surface p-8 text-center">
        <p ref={successRef} tabIndex={-1} className="font-semibold text-success outline-none">
          문의가 접수되었습니다.
        </p>
        <p className="mt-2 text-sm text-muted">담당자가 영업일 기준 1~2일 내에 회신드립니다.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-primary hover:underline"
        >
          새 문의 작성 →
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-fg placeholder:text-faint focus:border-primary aria-[invalid=true]:border-error";
  const describedBy = (n: string) => (invalid.includes(n) && error ? "cf-error" : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-medium text-muted">
            이름 <span aria-hidden="true" className="text-primary">*</span>
            <span className="sr-only">(필수)</span>
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
            회사 / 기관
          </label>
          <input id="cf-company" name="company" autoComplete="organization" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-xs font-medium text-muted">
          이메일 <span aria-hidden="true" className="text-primary">*</span>
          <span className="sr-only">(필수)</span>
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
          문의 유형
        </label>
        <select id="cf-type" name="type" defaultValue={defaultType ?? types[0]} className={field}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-medium text-muted">
          문의 내용 <span aria-hidden="true" className="text-primary">*</span>
          <span className="sr-only">(필수)</span>
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
        <span aria-hidden="true">*</span> 표시는 필수 항목입니다.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-fg px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-ink-hover disabled:opacity-60"
      >
        {status === "submitting" ? "전송 중…" : "문의 보내기 →"}
      </button>
    </form>
  );
}
