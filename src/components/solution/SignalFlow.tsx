"use client";

/*
  SignalFlow — 인터랙티브 신호 흐름 (리디자인 A 핵심 · P1-6).
  홈과 EXLINK 상세가 공유하는 단일 컴포넌트. 노드를 선택하면 역할·흔한 문제·EX 수행 범위·
  관련 제품·고객 결과가 열린다. EX 수행(민트)과 파트너 기술(라벤더)을 색+라벨로 이중 구분(접근성).
  거버넌스: 수치·성능 주장 없음, 파트너 라벨 정확(Reseller/Distributor는 제품 페이지에서). em-dash 미사용.
  키보드: 노드는 버튼, ←/→ 로 이동, Enter/Space 로 선택. 모바일은 세로 스테퍼로 자동 재배치.
*/
import { useRef, useState } from "react";
import Link from "next/link";
import { withLocale, type Locale } from "@/lib/i18n";

type Owner = "ex" | "partner";
type Node = {
  key: string;
  label: string;
  owner: Owner;
  role: string;
  problem: string;
  ex: string;
  result: string;
  product?: { label: string; href: string };
};

const NODES: Record<Locale, Node[]> = {
  ko: [
    { key: "capture", label: "Capture", owner: "ex", role: "여러 대의 카메라 영상을 실시간으로 받습니다.", problem: "카메라마다 신호와 규격이 달라 입력을 맞추기 어렵습니다.", ex: "입력 구성과 동기화를 현장에 맞게 설계합니다.", result: "여러 카메라가 하나의 흐름으로 들어옵니다." },
    { key: "tracking", label: "Tracking", owner: "partner", role: "카메라의 위치와 움직임을 추적합니다.", problem: "트래킹이 없으면 카메라가 움직일 때 배경이 어긋납니다.", ex: "트래킹 장비를 도입·연동하고 캘리브레이션합니다.", result: "카메라가 움직여도 가상 배경이 정합됩니다.", product: { label: "RETracker", href: "/product/retracker" } },
    { key: "network", label: "Network", owner: "ex", role: "영상·타임코드·제어 신호의 경로를 잇습니다.", problem: "지연이나 비동기가 생기면 화면이 깨집니다.", ex: "신호 경로와 장애 복구 순서를 설계합니다.", result: "동기화된 신호가 안정적으로 흐릅니다." },
    { key: "render", label: "Render", owner: "partner", role: "가상 배경을 실시간으로 합성·렌더링합니다.", problem: "엔진과 장비 조합이 복잡해 구성이 어렵습니다.", ex: "Unreal·Aximmetry 기반 구성을 설계·연동합니다.", result: "실사와 가상이 실시간으로 합쳐집니다.", product: { label: "Aximmetry", href: "/product/aximmetry" } },
    { key: "core", label: "EXLINK Core", owner: "ex", role: "전체 제작 흐름을 하나로 통합 제어합니다.", problem: "장비가 제각각이면 운영 부담이 커집니다.", ex: "EX가 자체 개발한 통합 제어 코어로 조율합니다.", result: "흩어진 파이프라인이 하나의 제어 흐름이 됩니다.", product: { label: "EXLINK", href: "/solution/xr-solution" } },
    { key: "output", label: "Output", owner: "ex", role: "방송 송출·녹화·스트리밍으로 내보냅니다.", problem: "출력 규격과 인수 범위를 맞춰야 합니다.", ex: "송출·녹화 구성과 인수 항목을 정리합니다.", result: "방송과 스트리밍으로 동시에 내보냅니다." },
  ],
  en: [
    { key: "capture", label: "Capture", owner: "ex", role: "Takes in feeds from multiple cameras in real time.", problem: "Cameras differ in signal and spec, so aligning inputs is hard.", ex: "We design input configuration and sync to fit the site.", result: "Multiple cameras arrive as one flow." },
    { key: "tracking", label: "Tracking", owner: "partner", role: "Tracks camera position and movement.", problem: "Without tracking, the background drifts when the camera moves.", ex: "We supply, integrate, and calibrate the tracking gear.", result: "The virtual background stays aligned as the camera moves.", product: { label: "RETracker", href: "/product/retracker" } },
    { key: "network", label: "Network", owner: "ex", role: "Routes video, timecode, and control signals.", problem: "Latency or drift breaks the picture.", ex: "We design signal paths and failure-recovery order.", result: "Synchronized signals flow reliably." },
    { key: "render", label: "Render", owner: "partner", role: "Composites and renders the virtual background in real time.", problem: "Engine and hardware combinations are complex to configure.", ex: "We design and integrate Unreal / Aximmetry setups.", result: "Live action and virtual combine in real time.", product: { label: "Aximmetry", href: "/product/aximmetry" } },
    { key: "core", label: "EXLINK Core", owner: "ex", role: "Orchestrates the whole production flow as one.", problem: "Scattered devices drive up operational load.", ex: "EX's own integrated control core coordinates it all.", result: "A scattered pipeline becomes a single control flow.", product: { label: "EXLINK", href: "/solution/xr-solution" } },
    { key: "output", label: "Output", owner: "ex", role: "Sends out via broadcast, recording, and streaming.", problem: "Output specs and acceptance scope must line up.", ex: "We set up streaming/recording and acceptance items.", result: "Broadcast and streaming go out at once." },
  ],
};

const UI: Record<Locale, { role: string; problem: string; ex: string; result: string; product: string; hint: string; exLeg: string; ptLeg: string }> = {
  ko: { role: "역할", problem: "흔한 문제", ex: "EX가 하는 일", result: "고객이 얻는 것", product: "관련 제품", hint: "노드를 선택하면 상세가 열립니다", exLeg: "EX 설계·통합·운영", ptLeg: "파트너 기술" },
  en: { role: "Role", problem: "Common problem", ex: "What EX does", result: "What you get", product: "Related product", hint: "Select a node to see details", exLeg: "EX design · integration · operation", ptLeg: "Partner technology" },
};

export function SignalFlow({ locale = "ko", defaultKey = "core" }: { locale?: Locale; defaultKey?: string }) {
  const nodes = NODES[locale];
  const t = UI[locale];
  const [sel, setSel] = useState(() => Math.max(0, nodes.findIndex((n) => n.key === defaultKey)));
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? Math.min(sel + 1, nodes.length - 1) : Math.max(sel - 1, 0);
    setSel(next);
    btns.current[next]?.focus();
  };

  const cur = nodes[sel];

  return (
    <div className="signalflow">
      <div className="signalflow__track" role="group" aria-label={locale === "en" ? "Signal flow from camera to output" : "촬영부터 송출까지 신호 흐름"} onKeyDown={onKey}>
        {nodes.map((n, i) => (
          <div key={n.key} className="signalflow__cell">
            <button
              ref={(el) => { btns.current[i] = el; }}
              type="button"
              className={`sf-node ${n.owner} ${i === sel ? "is-sel" : ""}`}
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
            >
              <span className={`sf-tag sf-tag--${n.owner}`}>{n.owner === "ex" ? "EX" : "PARTNER"}</span>
              <span className="sf-node__label">{n.label}</span>
            </button>
            {i < nodes.length - 1 && <span className="sf-conn" aria-hidden="true">›</span>}
          </div>
        ))}
      </div>

      <div className="signalflow__detail" aria-live="polite">
        <div className="sf-detail__head">
          <span className={`sf-tag sf-tag--${cur.owner}`}>{cur.owner === "ex" ? "EX" : "PARTNER"}</span>
          <h3 className="sf-detail__title">{cur.label}</h3>
        </div>
        <div className="sf-detail__grid">
          <div><span className="sf-k">{t.role}</span><p>{cur.role}</p></div>
          <div><span className="sf-k">{t.problem}</span><p>{cur.problem}</p></div>
          <div><span className="sf-k">{t.ex}</span><p>{cur.ex}</p></div>
          <div><span className="sf-k">{t.result}</span><p>{cur.result}</p></div>
        </div>
        {cur.product && (
          <Link href={withLocale(cur.product.href, locale)} className="arrowlink sf-detail__product">
            {t.product}: {cur.product.label} <span className="ar" aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      <div className="signalflow__legend">
        <span><i className="sf-sw sf-sw--ex" />{t.exLeg}</span>
        <span><i className="sf-sw sf-sw--pt" />{t.ptLeg}</span>
      </div>
    </div>
  );
}
