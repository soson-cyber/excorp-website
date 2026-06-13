import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

const COPY = {
  ko: {
    studio: {
      eyebrow: "Visit the Studio",
      title: (
        <>
          글로 읽는 것보다,{" "}
          <br className="hidden sm:block" />
          직접 보는 게 빠릅니다
        </>
      ),
      body: "하남 EX 스튜디오에서 버추얼 프로덕션 데모 시연과 기술 상담을 무료로 진행합니다. 방문이 어려우시면 화상 데모로 먼저 보여드립니다.",
      primary: "하남 스튜디오 체험 예약 →",
      secondary: "구축 견적 문의",
    },
    touch: {
      eyebrow: "Get in Touch",
      title: (
        <>
          XR 제작,{" "}
          <br className="hidden sm:block" />
          어디서부터 시작해야{" "}
          <br className="hidden sm:block" />
          할지 모르시겠다면?
        </>
      ),
      body: "지금 바로 EX 전문가와 상담해보세요. 솔루션 도입부터 스튜디오 제작까지, 콘텐츠 제작의 모든 여정을 함께 설계합니다.",
      primary: "도입 상담 →",
      secondary: "스튜디오 둘러보기 →",
      tertiary: "자료 요청 →",
    },
  },
  en: {
    studio: {
      eyebrow: "Visit the Studio",
      title: <>Seeing it beats reading about it</>,
      body: "Get a free virtual production demo and technical consultation at the EX Studio in Hanam. Can't visit in person? We'll walk you through a live remote demo first.",
      primary: "Book a studio visit →",
      secondary: "Request a quote",
    },
    touch: {
      eyebrow: "Get in Touch",
      title: <>Not sure where your XR project should start?</>,
      body: "Talk to an EX specialist today. From solution rollout to studio production, we design the entire content workflow with you.",
      primary: "Talk to us →",
      secondary: "Explore the studio →",
      tertiary: "Request materials →",
    },
  },
} as const;

/** 페이지 하단 공통 CTA.
 *  - 기본(get-in-touch): 전 페이지 공통 상담 유도.
 *  - studio: 하남 쇼룸 체험 유도 — xr-solution 등 솔루션 전환축 페이지 전용.
 *  - locale 미지정 시 ko. href는 locale에 맞게 프리픽스된다. */
export function CtaBanner({
  variant = "get-in-touch",
  locale = "ko",
}: {
  variant?: "get-in-touch" | "studio";
  locale?: Locale;
}) {
  if (variant === "studio") {
    const t = COPY[locale].studio;
    return (
      <section className="relative overflow-hidden border-y border-border bg-surface">
        <div className="container-ex relative flex flex-col items-start gap-8 py-section md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-lav">{t.eyebrow}</span>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-snug md:text-4xl">{t.title}</h2>
            <p className="mt-4 max-w-xl text-muted">{t.body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button href={withLocale("/xr-studio", locale)} variant="accent" className="focus-on-dark">
              {t.primary}
            </Button>
            <Button href={withLocale("/contact", locale)} variant="secondary" className="focus-on-dark">
              {t.secondary}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const t = COPY[locale].touch;
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="container-ex relative flex flex-col items-start gap-8 py-section md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-lav">{t.eyebrow}</span>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-snug md:text-4xl">{t.title}</h2>
          <p className="mt-4 max-w-xl text-muted">{t.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Button href={withLocale("/contact", locale)} variant="accent">
            {t.primary}
          </Button>
          <Button href={withLocale("/xr-studio", locale)} variant="secondary">
            {t.secondary}
          </Button>
          <Button href={withLocale("/support", locale)} variant="secondary">
            {t.tertiary}
          </Button>
        </div>
      </div>
    </section>
  );
}
