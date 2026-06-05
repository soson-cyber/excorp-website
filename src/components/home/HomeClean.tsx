import type { ReactNode } from "react";
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
const PARTNERS: { name: string; role: string; desc: string; initial: string; href: string; img?: string; objPos?: string }[] = [
  { name: "Aximmetry", role: "Certified Reseller", desc: "리얼타임 버추얼 프로덕션 소프트웨어", initial: "A", href: "/product/aximmetry", img: "/aximmetry-vp.jpg" },
  { name: "Moverse AI", role: "DISTRIBUTOR", desc: "마커리스 AI 모션캡처 시스템", initial: "M", href: "/product/moverse", img: "/moverse-mocap.jpg" },
  { name: "RETracker", role: "DISTRIBUTOR", desc: "정밀 카메라 트래킹 솔루션", initial: "R", href: "/product/retracker", img: "/retracker-tracking.jpg" },
];
const STUDIO_BULLETS = ["후반 작업 없이 촬영과 동시에 완성", "대형 크로마 · 멀티캠 · XR 트래킹"];
const STATS = [
  { v: 6, s: "+", l: "기술 특허" },
  { v: 3, s: "", l: "글로벌 파트너" },
  { v: 3, s: "", l: "대학 MOU" },
  { v: 4, s: "", l: "제품 인증" },
];

function SectionHead({
  index,
  label,
  title,
  lead,
  narrow,
  center,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  narrow?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2
        className="h2"
        style={{ marginTop: 22, maxWidth: narrow ? "48rem" : "none", marginInline: center ? "auto" : undefined }}
      >
        {title}
      </h2>
      {lead && (
        <p className="lead" style={{ maxWidth: center ? "none" : "40rem", marginInline: center ? "auto" : undefined }}>
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

      {/* §01 — What we do (centered header + symmetric 3-card grid) */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          <SectionHead
            index="01"
            label="WHAT WE DO"
            title={
              <>
                솔루션부터 스튜디오까지,{" "}
                <br className="hidden sm:block" />
                하나의 흐름으로
              </>
            }
            lead="EX는 실시간 XR 콘텐츠 제작의 전 과정을 솔루션 · 장비 · 스튜디오로 연결합니다."
            center
          />
          <div className="featgrid">
            {WHAT.map((c, i) => (
              <FeatureCard
                key={c.i}
                idx={c.i}
                tag={c.tag}
                title={c.title}
                desc={c.desc}
                href={c.href}
                delay={i * 90}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured case */}
      <section className="section section--surface">
        <div className="container-ex twocol twocol--media">
          <Reveal>
            <div className="photo" style={{ aspectRatio: "16 / 9" }}>
              <Image src="/exlink-control-room.jpg" alt="EXLINK 구축사례 — 실시간 XR 통합 제어실(멀티뷰·프로그램·트래킹)" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              <span className="hud" style={{ left: 12, top: 12 }}>
                EXLINK
              </span>
            </div>
          </Reveal>
          <Reveal>
            <SectionLabel index="CASE">EXLINK 구축사례</SectionLabel>
            <h2 className="h2" style={{ marginTop: 22 }}>
              실시간{" "}
              <br className="hidden lg:block" />
              XR 방송 시스템을{" "}
              <br className="hidden lg:block" />
              하나로 통합
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
              분산된 촬영·트래킹·렌더·송출 장비를 EXLINK로 통합하여, 운영 부담은 줄이고 실시간 합성 품질은 끌어올리는 대표 활용 시나리오입니다.
            </p>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--color-faint)", maxWidth: "36rem" }}>
              ※ 위 수치는 도입 시 기대 효과(예시)이며, 구성·환경에 따라 달라질 수 있습니다.
            </p>
            <Link href="/work" className="arrowlink arrowlink--accent" style={{ marginTop: 30 }}>
              활용 시나리오 보기{" "}
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
            title={
              <>
                검증된 글로벌 XR 기술,{" "}
                <br className="hidden sm:block" />
                국내에 연결합니다
              </>
            }
            lead="EX는 세계적인 XR 솔루션의 공식 리셀러·총판으로 도입부터 기술지원과 운영교육까지 전 주기를 책임집니다."
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
                <span className="cap">Certified Reseller</span>
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
          <div className="partner-bento">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 90} className={`card cardpad${p.img ? " card--media" : ""}`}>
                {p.img && (
                  <>
                    <Image src={p.img} alt={`${p.name} 버추얼 프로덕션 합성 예시`} fill sizes="(min-width:768px) 60vw, 100vw" className="pcard-bg" style={p.objPos ? { objectPosition: p.objPos } : undefined} />
                    <span className="pcard-scrim" aria-hidden="true" />
                  </>
                )}
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
            <div className="photo" style={{ aspectRatio: "16 / 9" }}>
              <Image src="/xr-studio.jpg" alt="EX XR Studio — 가상 세트 기반 콘텐츠 촬영" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
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
              촬영이 곧 완성이 되는{" "}
              <br className="hidden sm:block" />
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
      <section className="section section--white section--glow">
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

      {/* Value band */}
      <section className="section section--surface section--glow">
        <div className="container-ex" style={{ maxWidth: "54rem", textAlign: "center" }}>
          <Reveal>
            <span className="quote-ey">
              <span className="quote-bar" />
              WHY REAL-TIME XR
            </span>
            <p className="quote-txt">
              촬영과 동시에 결과물이 완성됩니다. 긴 후반 일정에 쫓기지 않고, 현장에서 바로 확인하고 끝낼 수
              있습니다.
            </p>
            <p style={{ marginTop: 24, fontSize: 14, color: "var(--color-faint)" }}>
              실시간 XR 제작이 만드는 차이 — EXLINK · 파트너 기술 · 하남 스튜디오
            </p>
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
                당신의 다음 콘텐츠를{" "}
                <br className="hidden sm:block" />
                실시간 XR로 시작하세요
              </h2>
              <p style={{ margin: "16px auto 0", maxWidth: "34rem", fontSize: 17, color: "var(--color-footer-link)" }}>
                솔루션 도입 · 제품 문의 · 스튜디오 제작 — 무엇이든 상담하세요.
              </p>
              <div className="hero-cta" style={{ justifyContent: "center" }}>
                <Link href="/contact" className="btn btn--pink">
                  도입 상담 →
                </Link>
                <Link href="/support" className="btn btn--ghostDark">
                  회사 소개서 요청
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
