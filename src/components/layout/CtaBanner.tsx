import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-ex relative flex flex-col items-start gap-8 py-section md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Get in Touch
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-snug md:text-4xl">
            XR 제작,
            <br />
            어디서부터 시작해야
            <br />
            할지 모르시겠다면?
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            지금 바로 EX 전문가와 상담해보세요. 솔루션 도입부터 스튜디오 대관까지, 콘텐츠 제작의
            모든 여정을 함께 설계합니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Button href="/contact" variant="accent">
            전문가 상담 신청 →
          </Button>
          <Button href="/xr-studio#apply" variant="secondary">
            스튜디오 대관 →
          </Button>
          <Button href="/support" variant="secondary">
            자료 다운로드 →
          </Button>
        </div>
      </div>
    </section>
  );
}
