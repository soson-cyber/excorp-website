import Image from "next/image";
import Link from "next/link";
import { Hero } from "./Hero";
import { FeatureCard } from "./FeatureCard";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* ── data ──────────────────────────────────────────────────────────────── */
const WHAT = [
  { i: "01", tag: "EXLINK", title: "통합 XR 솔루션", desc: "자체 개발한 올인원 실시간 XR 제작·운영 솔루션", href: "/solution/xr-solution" },
  { i: "02", tag: "PARTNER", title: "파트너 제품 유통", desc: "Aximmetry · Moverse · RETracker — 검증된 글로벌 XR 장비·SW 공급", href: "/product" },
  { i: "03", tag: "STUDIO", title: "XR 콘텐츠 스튜디오", desc: "IR · 웨비나 · 대담을 실시간 XR로 제작하는 하남 스튜디오", href: "/xr-studio" },
];
const EXLINK_BULLETS = ["멀티캠 · 트래킹 자동 동기화", "가상 배경 · 그래픽 실시간 합성", "라이브 송출 · 동시 녹화", "운영자 1인 중심 워크플로우"];
const NODES = [
  { t: "CAPTURE", s: "멀티캠 입력" },
  { t: "TRACKING", s: "좌표 동기화" },
  { t: "EXLINK", s: "통합 코어", core: true },
  { t: "RENDER", s: "실시간 합성" },
  { t: "BROADCAST", s: "송출 · 녹화" },
];
const PARTNERS = [
  { name: "Aximmetry", role: "RESELLER", desc: "리얼타임 버추얼 프로덕션 소프트웨어", initial: "A", href: "/product/aximmetry" },
  { name: "Moverse AI", role: "DISTRIBUTOR", desc: "마커리스 AI 모션캡처 시스템", initial: "M", href: "/product/moverse" },
  { name: "RETracker", role: "DISTRIBUTOR", desc: "정밀 카메라 트래킹 솔루션", initial: "R", href: "/product/retracker" },
];
const STUDIO_BULLETS = ["메뉴형 콘텐츠 제작 — IR · 웨비나 · 대담", "후반 작업 없이 촬영과 동시에 완성", "대형 크로마 · 멀티캠 · XR 트래킹"];
const STATS = [
  { v: 6, s: "+", l: "기술 특허" },
  { v: 3, s: "", l: "글로벌 파트너" },
  { v: 3, s: "", l: "대학 MOU" },
  { v: 4, s: "", l: "제품 인증" },
];

function SectionHead({ index, label, title, lead, narrow }: { index: string; label: string; title: string; lead?: string; narrow?: boolean }) {
  return (
    <Reveal>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2 className="h2" style={{ marginTop: 22, maxWidth: narrow ? "48rem" : "none" }}>
        {title}
      </h2>
      {lead && (
        <p className="lead" style={{ maxWidth: "40rem" }}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export function HomeClean() {
  return (
    <>
      <Hero />

      {/* §01 — What we do (Wope feature cards) */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionHead
            index="01"
            label="WHAT WE DO"
            title="솔루션부터 스튜디오까지, 하나의 흐름으로"
            lead="EX는 실시간 XR 콘텐츠 제작의 전 과정을 솔루션 · 장비 · 스튜디오로 연결합니다."
            narrow
          />
          <div className="featgrid">
            {WHAT.map((c, i) => (
              <FeatureCard key={c.i} idx={c.i} tag={c.tag} title={c.title} desc={c.desc} href={c.href} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* §02 — EXLINK core solution */}
      <section className="section section--white">
        <div className="container-ex twocol">
          <Reveal>
            <SectionLabel index="02">CORE SOLUTION</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              EXLINK — 흩어진 XR을 하나로 묶다
            </h2>
            <p className="lead" style={{ maxWidth: "36rem" }}>
              촬영 · 트래킹 · 렌더 · 송출을 단일 파이프라인으로 통합한 EX의 자체 개발 솔루션. 분산된 장비와
              워크플로우를 하나로 연결합니다.
            </p>
            <ul className="bullets">
              {EXLINK_BULLETS.map((b) => (
                <li key={b}>
                  <span className="bdot" />
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/solution/xr-solution" className="arrowlink arrowlink--accent" style={{ marginTop: 30 }}>
              EXLINK 자세히{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
          <Reveal>
            <div className="card" style={{ padding: 22 }}>
              <div className="diag-head">
                <span className="cap">EXLINK ARCHITECTURE</span>
                <span className="cap" style={{ color: "var(--color-success)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-success)" }} />
                  LIVE
                </span>
              </div>
              <div className="diag-row">
                {NODES.map((n, i) => (
                  <div key={n.t} style={{ display: "contents" }}>
                    <div className={`node${n.core ? " node--core" : ""}`}>
                      <div className="node-t">{n.t}</div>
                      <div className="node-s">{n.s}</div>
                    </div>
                    {i < NODES.length - 1 && (
                      <span className="diag-conn" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured case */}
      <section className="section section--surface">
        <div className="container-ex twocol twocol--media">
          <Reveal>
            <div className="photo" style={{ aspectRatio: "16 / 10" }}>
              <Image src="/uc-broadcast.png" alt="EXLINK 구축사례 — 실시간 XR 방송 시스템" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <span className="hud" style={{ left: 12, top: 12 }}>
                EXLINK
              </span>
            </div>
          </Reveal>
          <Reveal>
            <SectionLabel index="CASE">EXLINK 구축사례</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              실시간 XR 방송 시스템을 하나로 통합
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <div className="statchip">
                <div className="statchip-v">운영 인력 4 → 1</div>
              </div>
              <div className="statchip">
                <div className="statchip-v">셋업 시간 −70%</div>
              </div>
            </div>
            <p className="lead" style={{ maxWidth: "36rem" }}>
              분산된 촬영·트래킹·렌더·송출 장비를 EXLINK 하나로 묶어, 운영 부담은 줄이고 실시간 합성 품질은
              끌어올리는 대표 활용 시나리오입니다.
            </p>
            <Link href="/work" className="arrowlink arrowlink--accent" style={{ marginTop: 30 }}>
              사례 자세히{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* §03 — Partner products */}
      <section className="section section--white">
        <div className="container-ex">
          <SectionHead
            index="03"
            label="PARTNER PRODUCTS"
            title="검증된 글로벌 XR 기술, 국내에 연결합니다"
            lead="EX는 세계적인 XR 솔루션의 공식 리셀러·총판으로 도입부터 기술지원까지 책임집니다."
            narrow
          />
          <Reveal>
            <p className="cap" style={{ marginTop: 40 }}>
              공식 파트너 · OFFICIAL PARTNERS
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16, alignItems: "center" }}>
              <span className="cred">
                <span className="cred-nm">Aximmetry</span>
                <span style={{ color: "var(--color-faint)" }}>·</span>
                <span className="cap">RESELLER</span>
              </span>
              <span className="cred">
                <span className="cred-nm">Moverse AI</span>
                <span style={{ color: "var(--color-faint)" }}>·</span>
                <span className="cap">DISTRIBUTOR</span>
              </span>
              <span className="cred">
                <span className="cred-nm">RETracker</span>
                <span style={{ color: "var(--color-faint)" }}>·</span>
                <span className="cap">DISTRIBUTOR</span>
              </span>
              <span style={{ width: 1, height: 24, background: "var(--color-border-strong)" }} />
              <span className="cred">
                <span className="cred-nm">NVIDIA Inception</span>
              </span>
              <span className="cred">
                <span className="cred-nm">Epic Games · Unreal</span>
              </span>
            </div>
          </Reveal>
          <div className="cardrow" style={{ marginTop: 56 }}>
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className="card cardpad">
                <div className="cardpad-head">
                  <span className="initial">{p.initial}</span>
                  <span className="rolepill">{p.role}</span>
                </div>
                <h3 className="cardtitle">{p.name}</h3>
                <p className="carddesc">{p.desc}</p>
                <Link href={p.href} className="arrowlink" style={{ marginTop: 24 }}>
                  자세히{" "}
                  <span className="ar" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §04 — XR Studio */}
      <section className="section section--surface">
        <div className="container-ex twocol twocol--media">
          <Reveal>
            <div className="photo" style={{ aspectRatio: "16 / 10" }}>
              <Image src="/studio.png" alt="EX XR Studio — 하남 그린 크로마 스튜디오" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <span className="hud" style={{ left: 14, top: 12 }}>
                <span className="recdot" />
                REC 00:14:22:08
              </span>
              <span className="hud" style={{ right: 14, top: 12 }}>
                CAM 01
              </span>
              <span style={{ position: "absolute", bottom: 12, left: 12, width: 14, height: 14, borderBottom: "1px solid rgba(255,255,255,.5)", borderLeft: "1px solid rgba(255,255,255,.5)" }} />
              <span style={{ position: "absolute", bottom: 12, right: 12, width: 14, height: 14, borderBottom: "1px solid rgba(255,255,255,.5)", borderRight: "1px solid rgba(255,255,255,.5)" }} />
            </div>
          </Reveal>
          <Reveal>
            <SectionLabel index="04">XR STUDIO</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              촬영이 곧 완성이 되는
              <br />
              실시간 XR 스튜디오
            </h2>
            <p className="lead" style={{ maxWidth: "36rem" }}>
              하남 70㎡ 그린 크로마에서 IR · 웨비나 · 대담을 실시간 XR로 제작합니다.
            </p>
            <ul className="bullets">
              {STUDIO_BULLETS.map((b) => (
                <li key={b}>
                  <span className="bdot" />
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/xr-studio" className="arrowlink arrowlink--accent" style={{ marginTop: 30 }}>
              스튜디오 둘러보기{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* §05 — Numbers */}
      <section className="section section--white">
        <div className="container-ex">
          <Reveal>
            <SectionLabel index="05">BY THE NUMBERS</SectionLabel>
          </Reveal>
          <Reveal className="statgrid">
            {STATS.map((s) => (
              <div key={s.l} className="statcell">
                <CountUp value={s.v} suffix={s.s} className="statnum" />
                <span className="statlabel">{s.l}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Quote band */}
      <section className="section section--surface">
        <div className="container-ex" style={{ maxWidth: "54rem", textAlign: "center" }}>
          <Reveal>
            <span className="quote-ey">
              <span className="quote-bar" />
              WHAT YOU GET
            </span>
            <p className="quote-txt">
              촬영과 동시에 결과물이 완성됩니다. 후반 일정에 쫓기지 않고, 현장에서 바로 확인하고 끝낼 수
              있습니다.
            </p>
            <p style={{ marginTop: 24, fontSize: 14, color: "var(--color-faint)" }}>실시간 XR 제작이 만드는 차이</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--white">
        <div className="container-ex">
          <Reveal>
            <div className="ctacard">
              <span className="cta-ey">
                <span className="cta-bar" />
                START A PROJECT
              </span>
              <h2 className="h2" style={{ marginTop: 22 }}>
                당신의 다음 콘텐츠를
                <br />
                실시간 XR로 시작하세요
              </h2>
              <p style={{ margin: "16px auto 0", maxWidth: "34rem", fontSize: 17, color: "var(--color-footer-link)" }}>
                솔루션 도입 · 제품 문의 · 스튜디오 제작 — 무엇이든 상담하세요.
              </p>
              <div className="hero-cta" style={{ justifyContent: "center" }}>
                <Link href="/contact" className="btn btn--accent">
                  도입 상담 →
                </Link>
                <Link href="/support" className="btn btn--ghostDark">
                  회사 소개서 받기
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
