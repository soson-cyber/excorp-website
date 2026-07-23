import type { Locale } from "@/lib/i18n";

/*
  PipelinePosition — 제작 흐름에서의 위치 (리디자인 A · P2-8).
  세 파트너 제품이 파이프라인의 서로 다른 단계를 맡는다는 사실을 시각화해
  경쟁재 오인을 막는다. 비교 대상은 파트너 제품 3종(EXLINK 제외 — 대표 지시).
  색 규칙은 SignalFlow와 공유(파트너=라벤더, 색+텍스트 이중 구분).
  정적 서버 컴포넌트 — 수치·성능 주장 없음.
*/

const STAGES = ["Capture", "Tracking", "Network", "Render", "Output"] as const;

type Row = {
  name: string;
  badge: string;
  owner: "ex" | "partner";
  covers: number[]; // STAGES 인덱스
  position: string;
};

const ROWS: Record<Locale, Row[]> = {
  ko: [
    { name: "Aximmetry", badge: "Certified Reseller", owner: "partner", covers: [3, 4], position: "실시간 합성·렌더와 송출 단계를 맡습니다." },
    { name: "Moverse AI", badge: "Distributor", owner: "partner", covers: [0], position: "모션캡처 단계를 맡습니다. 인물 동작을 실시간으로 캡처합니다." },
    { name: "RETracker", badge: "Distributor", owner: "partner", covers: [1, 2], position: "트래킹과 네트워크 단계를 맡습니다. 카메라 위치를 추적해 전송합니다." },
  ],
  en: [
    { name: "Aximmetry", badge: "Certified Reseller", owner: "partner", covers: [3, 4], position: "Owns the real-time compositing/render and output stages." },
    { name: "Moverse AI", badge: "Distributor", owner: "partner", covers: [0], position: "Owns the motion-capture stage, capturing talent movement in real time." },
    { name: "RETracker", badge: "Distributor", owner: "partner", covers: [1, 2], position: "Owns the tracking and network stages, tracking and relaying camera position." },
  ],
};

const NOTE: Record<Locale, string> = {
  ko: "세 제품은 서로 경쟁하지 않고 각기 다른 단계를 맡습니다.",
  en: "The three products don't compete; each owns a different stage.",
};

export function PipelinePosition({ locale = "ko" }: { locale?: Locale }) {
  const rows = ROWS[locale];
  return (
    <div className="pipepos">
      {/* 단계 축 헤더 (모바일에서는 텍스트 설명이 대신함) */}
      <div className="pipepos__head" aria-hidden="true">
        <span className="pipepos__headspacer" />
        <div className="pipepos__axis pipepos__axis--5">
          {STAGES.map((s) => (
            <span key={s} className="pipepos__stage">{s}</span>
          ))}
        </div>
        <span className="pipepos__headspacer pipepos__headspacer--right" />
      </div>

      {rows.map((r) => (
        <div key={r.name} className="pipepos__row">
          <div className="pipepos__name">
            <span className="text-base font-semibold text-fg">{r.name}</span>
            <span className={`sf-tag sf-tag--${r.owner === "ex" ? "ex" : "partner"}`}>{r.badge}</span>
          </div>
          <div
            className="pipepos__axis pipepos__axis--5"
            role="img"
            aria-label={`${r.name}: ${r.position}`}
          >
            {STAGES.map((s, i) => (
              <span
                key={s}
                className={`pipepos__cell ${r.covers.includes(i) ? (r.owner === "ex" ? "is-ex" : "is-pt") : ""}`}
              />
            ))}
          </div>
          <p className="pipepos__pos">{r.position}</p>
        </div>
      ))}

      <p className="pipepos__note">{NOTE[locale]}</p>
    </div>
  );
}
