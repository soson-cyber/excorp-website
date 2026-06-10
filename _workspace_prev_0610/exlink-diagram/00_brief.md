# EX-LINK 통합 아이소메트릭 다이어그램 — 빌드 브리프

## 목표
EX-LINK VP Production Core 통합 신호 흐름을 **React/SVG 컴포넌트**로 제작. 이미지 생성으로는 15개 라벨 정확도가 보장되지 않아 코드로 전환(브랜드 토큰·라벨 100% 정확·실제 파티클 애니메이션).

## 배치
`src/app/solution/xr-solution/page.tsx`의 **§03 Architecture** 섹션. 현재 그 자리의 `MediaBlank`(tag="EXLINK PIPELINE", label="EXLINK 파이프라인 구성도") 플레이스홀더를 새 컴포넌트로 **교체**. 상단의 "CAPTURE → TRACKING → EXLINK CORE → RENDER → BROADCAST" 흐름 텍스트는 유지.

## 컴포넌트
- 파일: `src/components/solution/ExlinkDiagram.tsx` (`"use client"`)
- 순수 인라인 SVG(외부 라이브러리 금지). viewBox 기반 16:9, `width=100%` 반응형.

## 레이아웃 (좌 → 중앙 → 우)
- **좌측(입력, 삼각 배치)** — Camera(상), Tracking(중), Controller(하). 각 아이소메트릭 아이콘 칩 + 라벨. 시안 연결선이 코어로 **into**.
- **중앙(코어, 가장 크고 밝음)** — 아이소메트릭 큐브. 상단 2줄 텍스트 **"EX-LINK"**(굵게) / **"VP Production Core"**. 큐브 전면에 내부 5칩 격납(외부로 새지 않게): **Media Server · Aximmetry · Unreal Engine · Video I/O · Control System**.
- **우측(출력, 세로 5)** — 위→아래: **LED Wall · Chroma Key · Broadcast · Recording · Streaming**. 각 아이콘 칩 + 라벨. 바이올렛 연결선이 코어에서 **out**. **5개 모두 정확히 포함**(이미지 v3는 Recording 누락 — 코드에선 절대 누락 금지).

## 라벨 (정확히 이 15개, 철자 그대로, 영문)
EX-LINK / VP Production Core / Camera / Tracking / Controller / Media Server / Aximmetry / Unreal Engine / Video I/O / Control System / LED Wall / Chroma Key / Broadcast / Recording / Streaming

## 브랜드 (시맨틱 토큰/CSS 변수 사용, 하드코딩 hex 지양)
- 배경: `--color-bg` #0e0626 → #1a1d40 → #310a9e 계열 그라데이션(섹션 톤과 조화).
- 코어: 퍼플 `--color-primary` #5e2ec0 + 시안 `--color-mint` #45f1e0 글로우 엣지. **노랑/주황 금지.**
- 입력 연결선: 시안(`--color-mint`). 출력 연결선: 바이올렛(`--color-violet` #8b5cf6). 액센트: white. Chroma Key 칩만 클린 그린, LED Wall 칩 blue/purple.

## 모션 (prefers-reduced-motion 안전 필수)
- 연결선 따라 흐르는 데이터 파티클(시안=입력 방향, 바이올렛=출력 방향). SVG SMIL `<animateMotion>` 또는 CSS `stroke-dashoffset`/translate 애니메이션.
- `@media (prefers-reduced-motion: reduce)`에서 파티클 정지/숨김, 선·노드는 정적으로 완전히 보이게. JS 없이도 콘텐츠 노출.
- 프로젝트 모션 규약 참고: `ex-frontend-implementation` 스킬 + 기존 `src/components/motion/*`.

## 접근성
- SVG에 `role="img"` + `aria-label`로 다이어그램 요지 1줄 설명(한글). 장식 파티클은 `aria-hidden`.
- 라벨 텍스트는 SVG `<text>`로 실제 렌더(읽기 가능한 크기, 데스크톱/모바일 대비 AA).

## 반응형
- 데스크톱: 좌-중-우 3열 아이소메트릭. 모바일(≤640): 세로 스택(입력군 → 코어 → 출력군)으로 재배치하거나 가로 스크롤 없이 축소. 라벨 가독 유지.

## 레퍼런스
- 브랜드·구도 기준: `_workspace_img/gen/exlink-vp-flow-v3.png` (반드시 Read로 확인). 단 v3의 결함(Recording 누락, 내부칩 텍스트 깨짐)은 코드에서 모두 교정.

## 완료 기준(DoD)
- 15개 라벨 모두 정확히 렌더 · 브랜드 색 정합 · 파티클 애니메이션 동작 + reduced-motion 정지 · tsc/eslint 통과 · 데스크톱/모바일 렌더 정상 · xr-solution §03에 통합.
