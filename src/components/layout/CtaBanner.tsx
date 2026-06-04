import { Button } from "@/components/ui/Button";

export function CtaBanner() {
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
