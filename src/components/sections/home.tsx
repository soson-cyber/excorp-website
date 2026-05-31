import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/ui/ParticleField";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { partners } from "@/lib/site";

/*
  Color system (3 roles):
  - Purple  : structure / links (SectionLabel, default)
  - Mint     : "EX Original" / 자체 기술 (EXLINK, 특허)
  - Pink     : Action / 전환 CTA (accent button, LIVE)
*/

/* ── §01 Hero ───────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
      <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-accent/15 blur-[120px]" />
      <ParticleField className="absolute inset-0 h-full w-full" />
      {/* readability mask — darkens behind the text column, fades to reveal particles */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_70%_at_25%_45%,rgba(15,17,41,0.92),rgba(15,17,41,0.35)_55%,transparent_82%)]" />
      {/* floating EX cube accent (right) — particles preserved, low parallax */}
      <Parallax speed={44} className="pointer-events-none absolute right-[7%] top-1/2 hidden md:block">
        <div className="relative -translate-y-1/2">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-[90px]" />
          <Image
            src="/ex-cube.png"
            alt=""
            aria-hidden="true"
            width={800}
            height={800}
            priority
            className="animate-ex-float relative w-52 drop-shadow-[0_20px_60px_rgba(94,46,192,0.5)] lg:w-72"
          />
        </div>
      </Parallax>
      <div className="container-ex relative py-24 md:py-32">
        {/* meta strip */}
        <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 text-fg">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-live" />
            LIVE · REAL-TIME XR · LIVE PRODUCTION
          </span>
          <span className="hidden md:inline">SEOUL · PANGYO / STUDIO · HANAM</span>
          <span>VOL. 03 / 2026</span>
        </div>

        <div className="mt-10 inline-flex rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs text-primary">
          All-in-One, Real-time XR Content Production Solution
        </div>

        <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl">
          기술의 연결로
          <br />
          <span className="text-gradient-ex">경험을 확장하다.</span>
        </h1>

        <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          이엑스(EX Corp.)는 <strong className="text-fg">AI와 XR 기술을 연결하여</strong>, 현실과
          가상이 융합되는 새로운 콘텐츠 경험을 만듭니다.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" variant="accent">
            전문가 상담 신청 →
          </Button>
          <Button href="/solution" variant="secondary">
            솔루션 둘러보기 →
          </Button>
          <Button href="/xr-studio#apply" variant="secondary">
            스튜디오 대관 →
          </Button>
        </div>

        <div className="mt-12 flex gap-10 border-t border-border/60 pt-8">
          <div>
            <p className="font-mono text-3xl font-bold text-mint">6+</p>
            <p className="mt-1 text-sm text-muted">기술 특허</p>
          </div>
          <div>
            <p className="font-mono text-3xl font-bold text-primary">3</p>
            <p className="mt-1 text-sm text-muted">글로벌 총판</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── §02 Trust Bar ──────────────────────────────────────── */
export function TrustBar() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-ex py-10">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Authorised Reseller &amp; Official Partner
        </p>
        {/* TODO: 실제 파트너 로고 이미지로 교체 (현재 로고칩 placeholder) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <span className="text-sm font-semibold text-fg">{p.name}</span>
              <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint group-hover:text-primary">
                {p.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §03 About summary ──────────────────────────────────── */
const aboutMeta = [
  { label: "Headquarters", value: "Pangyo, Seongnam" },
  { label: "XR Studio", value: "Hanam, Gyeonggi" },
  { label: "R&D", value: "연구개발전담부서" },
  { label: "Recognition", value: "벤처기업 인증" },
];

export function AboutSummary() {
  return (
    <section className="container-ex py-section">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel index="01">About EX</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">
            현실과 가상의 융합,
            <br />
            새로운 경험을
            <br />
            창조하는 세상.
          </h2>
          <Button href="/about" variant="secondary" className="mt-7">
            More about EX →
          </Button>
        </div>
        <div className="space-y-5 text-muted">
          <p>
            이엑스(EX Corp.)는 XR 기술을 활용한 <strong className="text-fg">실시간 콘텐츠 제작에
            필요한 통합 솔루션</strong>을 제공합니다. 고사양의 미디어서버와 AI비전센서, 실시간 엔진과
            소프트웨어를 유기적으로 연결하여 콘텐츠 제작자에게 몰입형 경험을 가능케 하는 XR 솔루션의
            미래를 제안합니다.
          </p>
          <p>
            우리는 고객의 상상력을 기반으로 XR의 잠재력을 AI와 융합하여 놀라울 정도로 현실적인 경험을
            제공합니다.
          </p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {aboutMeta.map((m) => (
              <div key={m.label} className="bg-surface p-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-faint">{m.label}</dt>
                <dd className="mt-1 text-sm font-medium text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ── §04 Solution entry (asymmetric feature block) ──────── */
export function SolutionEntry() {
  return (
    <section className="container-ex py-section-lg">
      <SectionLabel index="02">Solution</SectionLabel>
      <h2 className="mt-5 max-w-3xl text-balance text-3xl font-bold leading-snug md:text-4xl">
        자체 솔루션과 글로벌 파트너 기술, 현장에 맞는 최적의 XR 환경을 구성합니다.
      </h2>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {/* EXLINK — EX Original, featured (Mint) */}
        <a
          href="/solution/xr-solution"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-mint/40 bg-surface p-8 transition-colors hover:border-mint lg:col-span-2"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint/10 blur-[90px]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-mint">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
              EX Original
            </span>
            <h3 className="mt-5 text-3xl font-bold">
              XR Solution <span className="text-mint">EXLINK</span>
            </h3>
            <p className="mt-4 max-w-xl text-muted">
              카메라·트래커·모션센서·네트워크·미디어서버까지, 현실과 가상을 실시간으로 연결하는 EX의 통합
              XR 솔루션. 복잡한 기술을 하나의 제어 흐름으로 묶습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-faint">
              <span className="rounded bg-surface-2 px-2 py-1">Integrated</span>
              <span className="rounded bg-surface-2 px-2 py-1">Real-time</span>
              <span className="rounded bg-surface-2 px-2 py-1">All-in-One</span>
            </div>
          </div>
          <span className="relative mt-8 font-medium text-mint transition-transform group-hover:translate-x-1">
            View Solution →
          </span>
        </a>

        {/* Virtual Production — methodology */}
        <a
          href="/solution/virtual-production"
          className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-8 transition-colors hover:border-primary/50"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Methodology
            </span>
            <h3 className="mt-3 text-2xl font-semibold">Virtual Production</h3>
            <p className="mt-3 text-muted">
              카메라 전환·배경 합성·라이브 연출이 동시에 일어나는 신개념 영상 제작 기법.
            </p>
          </div>
          <span className="mt-8 font-medium text-primary transition-transform group-hover:translate-x-1">
            Learn VP →
          </span>
        </a>
      </div>

      <div className="mt-8">
        <Button href="/solution" variant="secondary">
          솔루션 전체 보기 →
        </Button>
      </div>
    </section>
  );
}

/* ── §05 Product (directory rows) ───────────────────────── */
const products = [
  {
    badge: "Authorised Reseller",
    title: "Aximmetry",
    copy: "방송 및 엔터테인먼트 산업을 위한 실시간 3D 그래픽 & 버추얼 프로덕션 플랫폼",
    meta: "Real-time Compositing",
    href: "/product/aximmetry",
  },
  {
    badge: "Korea Distributor",
    title: "Moverse AI",
    copy: "센서 없이 동작하는 AI 기반 마커리스 모션 인식 솔루션",
    meta: "Markerless MoCap",
    href: "/product/moverse",
  },
  {
    badge: "Korea Distributor",
    title: "RETracker",
    copy: "실시간 6DoF 기반 고정밀 광학 트래킹 시스템 — Bliss / Fizz",
    meta: "6DoF Optical Tracker",
    href: "/product/retracker",
  },
];

export function Products() {
  return (
    <section className="bg-surface">
      <div className="container-ex py-section">
        <SectionLabel index="03">Product</SectionLabel>
        <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">
          검증된 글로벌 파트너 제품, EX가 한국에서 책임집니다.
        </h2>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-white">
          {products.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group flex flex-col gap-3 border-b border-border p-6 transition-colors last:border-0 hover:bg-surface-2 md:flex-row md:items-center md:gap-8 md:px-8"
            >
              <span className="w-44 shrink-0">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                  {p.badge}
                </span>
              </span>
              <span className="flex-1">
                <span className="block text-xl font-semibold">{p.title}</span>
                <span className="mt-1 block text-sm text-muted">{p.copy}</span>
              </span>
              <span className="hidden shrink-0 font-mono text-xs uppercase tracking-wider text-faint lg:block">
                {p.meta}
              </span>
              <span className="shrink-0 font-medium text-primary transition-transform group-hover:translate-x-1">
                Discover →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §06 XR Studio (mid-page conversion anchor) ─────────── */
const studioMetrics = [
  { k: "XR", l: "Chromakey Studio" },
  { k: "6DoF", l: "Camera Tracking" },
  { k: "Live", l: "Real-time Render" },
  { k: "All-in-One", l: "통합 운영" },
];

export function XrStudio() {
  return (
    <section className="container-ex py-section-lg">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel index="04">EX XR Studio</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">
            촬영과 동시에
            <br />
            완성형 콘텐츠를
            <br />
            구현합니다.
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-muted">
            EX XR Studio는 경기 하남에 위치한 <strong className="text-fg">실시간 XR 크로마키
            스튜디오</strong>입니다. 고도화된 리얼타임 XR 기술을 바탕으로 현실과 가상을 실시간으로
            정합하는 몰입형 콘텐츠 제작 공간을 제공합니다.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {studioMetrics.map((m) => (
              <div key={m.k}>
                <p className="font-mono text-lg font-bold text-primary">{m.k}</p>
                <p className="mt-1 text-xs text-muted">{m.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/xr-studio#apply" variant="accent">
              스튜디오 대관 문의 →
            </Button>
            <Button href="/xr-studio" variant="secondary">
              스튜디오 둘러보기 →
            </Button>
          </div>
        </div>

        {/* HUD visual — low parallax */}
        <Parallax speed={28} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-white">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="absolute inset-0 p-5 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span className="absolute left-5 top-5 flex items-center gap-1.5 text-live">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-live" /> REC · XR · LIVE
            </span>
            <span className="absolute right-5 top-5">TC 00:34:12:08</span>
            <span className="absolute bottom-5 left-5">RES 4K · 60FPS</span>
            <span className="absolute bottom-5 right-5 text-primary">UNREAL · AXIMMETRY</span>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-base font-semibold normal-case tracking-normal text-fg">
              XR Studio.
              <br />
              <span className="text-sm text-muted">Hanam, Gyeonggi</span>
            </span>
            <span className="absolute bottom-12 left-1/2 -translate-x-1/2 text-primary">LATENCY &lt; 1F</span>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

/* ── §07 Why EX (editorial, numbered — no boxes) ────────── */
const whyCards = [
  {
    tag: "INTEGRATED",
    title: "All-in-One 통합 솔루션",
    desc: "카메라, 트래커, 모션센서, 네트워크, 미디어서버까지 복잡한 요소들의 기술을 통합하여 누구나 빠르고 유연하게 실감형 콘텐츠를 제작할 수 있는 환경을 제공합니다.",
  },
  {
    tag: "TAILORED",
    title: "고객 중심의 맞춤형 시스템",
    desc: "사용자 친화적인 인터페이스로 유연한 운영 기능을 제공하며, 사용자 피드백과 함께 진화하는 기술 생태계를 만들어갑니다.",
  },
  {
    tag: "PROVEN",
    title: "다양한 실전 프로젝트 경험",
    desc: "문화기술과 엔터테인먼트를 연결하는 깊은 이해, 그리고 한국의 주요 XR 프로젝트 수행 경험과 노하우를 보유하고 있습니다.",
  },
  {
    tag: "END-TO-END",
    title: "기술과 인프라의 통합 운용",
    desc: "공간 + 시스템 + 전문가가 함께 움직입니다. 셋업, 교육, 유지보수까지 전 주기를 지원합니다.",
  },
];

export function WhyEx() {
  return (
    <section className="bg-surface">
      <div className="container-ex py-section">
        <SectionLabel index="05">Why EX</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-bold leading-snug md:text-4xl">
          우리는 단순한 XR 시스템을 넘어, 콘텐츠 제작의 경험을 다시 설계합니다.
        </h2>
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {whyCards.map((c, i) => (
            <div key={c.tag} className="flex gap-6 border-t border-border pt-6">
              <span className="font-mono text-5xl font-bold leading-none tracking-tighter text-fg/15">
                0{i + 1}
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{c.tag}</span>
                <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §08 Industries (compact grid) ──────────────────────── */
const industries = [
  { en: "Broadcast", ko: "방송", d: "실시간 합성·렌더링 라이브 방송 세트" },
  { en: "News", ko: "뉴스", d: "실시간 데이터 뉴스 그래픽·가상 스튜디오" },
  { en: "Music", ko: "음악", d: "콘서트·뮤직비디오 실시간 비주얼" },
  { en: "Fashion", ko: "패션", d: "가상 런웨이·룩북 몰입형 비주얼" },
  { en: "Performance", ko: "공연", d: "무대 연출 + 실시간 영상 결합" },
  { en: "Brand Event", ko: "브랜드 이벤트", d: "브랜드 경험을 확장하는 XR 연출" },
  { en: "Education", ko: "교육", d: "XR 기반 실감형 학습 콘텐츠" },
  { en: "Hybrid Event", ko: "하이브리드", d: "온·오프라인 실시간 인터랙션" },
];

export function Industries() {
  return (
    <section className="container-ex py-section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel index="06">Industries</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-balance text-3xl font-bold leading-snug md:text-4xl">
            다양한 산업에서 현실감과 상상력을 결합한 스토리텔링.
          </h2>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {industries.map((i) => (
          <div key={i.en} className="bg-surface p-5 transition-colors hover:bg-surface-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-faint">{i.en}</p>
            <p className="mt-1.5 text-base font-semibold">{i.ko}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── §09 Numbers ────────────────────────────────────────── */
const numbers = [
  { n: "6+", en: "Tech Patents", ko: "기술 특허 보유", mint: true },
  { n: "4", en: "Certifications", ko: "정부·공공 인증" },
  { n: "3", en: "Global Partners", ko: "공식 총판 / 리셀러" },
  { n: "3", en: "University MOU", ko: "산학 협력" },
];

export function Numbers() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* oversized ghost wordmark backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 bottom-[-2rem] select-none font-mono text-[12rem] font-bold leading-none tracking-tighter text-fg/[0.03] md:text-[18rem]"
      >
        EX
      </span>
      <div className="container-ex relative py-section-lg">
        <SectionLabel index="07">EX with Numbers</SectionLabel>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((x) => (
            <div key={x.en} className="relative">
              <p
                className={`font-mono text-[clamp(4rem,9vw,7rem)] font-bold leading-[0.85] tracking-[-0.03em] ${
                  x.mint ? "text-mint" : "text-fg"
                }`}
              >
                <CountUp value={parseInt(x.n, 10)} suffix={x.n.replace(/[0-9]/g, "")} />
              </p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="font-mono text-xs uppercase tracking-wider text-primary">{x.en}</p>
                <p className="mt-1 text-sm text-muted">{x.ko}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── §10 News & Insight (featured 1 + 2) ────────────────── */
const news = [
  {
    cat: "Press Release",
    date: "2026.04.22",
    title: "Rassi Engineering LTD 공식 한국 총판 계약 체결, 6DoF 광학 트래킹 사업 본격 확장",
    cta: "Read More",
  },
  {
    cat: "Case Study",
    date: "2026.03.19",
    title: "EX XR Studio, 라이브 방송 프로덕션 도입 사례 — 실시간 가상 배경과 인터랙션 그래픽 합성",
    cta: "View Case",
  },
  {
    cat: "Insight",
    date: "2026.02.04",
    title: "Moverse AI 마커리스 모션캡처, 메타버스·교육 콘텐츠 제작 효율을 어떻게 바꾸는가",
    cta: "Read Insight",
  },
];

export function NewsInsight() {
  const [featured, ...rest] = news;
  return (
    <section className="container-ex py-section">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel index="08">News &amp; Insight</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-snug md:text-4xl">
            실시간으로 확장되는
            <br />
            콘텐츠 제작의 새로운 기준.
          </h2>
        </div>
        <Button href="/news" variant="secondary">
          전체 소식 보기 →
        </Button>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {/* featured */}
        <a
          href="/news"
          className="group relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-8 transition-colors hover:border-primary/50 lg:col-span-2"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10" />
          <div className="relative flex items-center gap-2">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              {featured.cat}
            </span>
            <span className="font-mono text-xs text-faint">{featured.date}</span>
          </div>
          <div className="relative">
            <h3 className="text-2xl font-semibold leading-snug">{featured.title}</h3>
            <span className="mt-5 inline-block font-medium text-primary transition-transform group-hover:translate-x-1">
              {featured.cta} →
            </span>
          </div>
        </a>

        {/* rest */}
        <div className="flex flex-col gap-5">
          {rest.map((n) => (
            <a
              key={n.title}
              href="/news"
              className="group flex flex-1 flex-col rounded-2xl border border-border bg-white p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                  {n.cat}
                </span>
                <span className="font-mono text-xs text-faint">{n.date}</span>
              </div>
              <h3 className="mt-3 flex-1 text-sm font-medium leading-relaxed">{n.title}</h3>
              <span className="mt-4 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                {n.cta} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
