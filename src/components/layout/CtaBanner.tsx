import { Button } from "@/components/ui/Button";

/** 페이지 하단 공통 CTA.
 *  - 기본(get-in-touch): 전 페이지 공통 상담 유도.
 *  - studio: 하남 쇼룸 체험 유도 — xr-solution 등 솔루션 전환축 페이지 전용. */
export function CtaBanner({ variant = "get-in-touch" }: { variant?: "get-in-touch" | "studio" }) {
  if (variant === "studio") {
    return (
      <section className="relative overflow-hidden border-y border-border bg-surface">
        <div className="container-ex relative flex flex-col items-start gap-8 py-section md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-lav">
              Visit the Studio
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-snug md:text-4xl">
              글로 읽는 것보다,{" "}
              <br className="hidden sm:block" />
              직접 보는 게 빠릅니다
            </h2>
            <p className="mt-4 max-w-xl text-muted">
              하남 EX 스튜디오에서 버추얼 프로덕션 데모 시연과 기술 상담을 무료로 진행합니다.
              방문이 어려우시면 화상 데모로 먼저 보여드립니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button href="/xr-studio" variant="accent" className="focus-on-dark">
              하남 스튜디오 체험 예약 →
            </Button>
            <Button href="/contact" variant="secondary" className="focus-on-dark">
              구축 견적 문의
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="container-ex relative flex flex-col items-start gap-8 py-section md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-lav">
            Get in Touch
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-snug md:text-4xl">
            XR 제작,{" "}
            <br className="hidden sm:block" />
            어디서부터 시작해야{" "}
            <br className="hidden sm:block" />
            할지 모르시겠다면?
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            지금 바로 EX 전문가와 상담해보세요. 솔루션 도입부터 스튜디오 제작까지, 콘텐츠 제작의
            모든 여정을 함께 설계합니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Button href="/contact" variant="accent">
            도입 상담 →
          </Button>
          <Button href="/xr-studio" variant="secondary">
            스튜디오 둘러보기 →
          </Button>
          <Button href="/support" variant="secondary">
            자료 요청 →
          </Button>
        </div>
      </div>
    </section>
  );
}
