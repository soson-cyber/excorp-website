# VP 워크플로우 다이어그램 — EX 브랜드 SVG 재구성 브리프

## 목표
첨부된 "Virtual Production Workflow" 다이어그램(원본: 파랑=전/후반, 초록=프로덕션)을 **이엑스 브랜드 SVG 컴포넌트**로 재구성. 텍스트 정확·확대 선명·브랜드 정합.

> 원본을 본 적 없는 빌더를 위해 아래에 구조를 전부 명세함. 이 브리프가 단일 기준.

## 전체 레이아웃 (좌 → 우, 가로 16:9)
상단에 3개 단계 헤더(괄호형 라인 + 양끝 점):
**PREPRODUCTION** (좌, 퍼플) · **PRODUCTION** (중앙, 민트) · **POSTPRODUCTION** (우, 퍼플)

흐름: STORY → [Preproduction 3분기] → FILMING(Production 링) → [Postproduction 순환] → SHOWTIME
단계 사이는 화살표로 연결.

### 1) 좌측 — PREPRODUCTION (퍼플 계열)
- **STORY**: 다이아몬드(마름모) 노드, 문서/펜 아이콘, 하단 라벨 "STORY".
- STORY에서 화살표 → 수직 분기선으로 3개 원으로 갈라짐(상/중/하), 각 원 우측에 라벨:
  - **PHYSICAL ART** — 팔레트 아이콘
  - **VIRTUAL ART** — 큐브(아이소) 아이콘
  - **VISUAL EFFECTS** — 별 아이콘
- 3개 원에서 분기선 합쳐져 → 우측 화살표로 PRODUCTION으로.

### 2) 중앙 — PRODUCTION (민트 계열, 가장 강조)
- 중앙 **FILMING**: 큰 다이아몬드, 비디오카메라 아이콘, 라벨 "FILMING".
- FILMING을 둘러싼 원형 링 위에 4개 원(각 라벨):
  - 좌상 **VISUALIZATION** — 눈 아이콘
  - 우상 **HYBRID CAMERA** — 사람+스크린(삼각대) 아이콘
  - 좌하 **MOTION CAPTURE** — 달리는 사람 아이콘
  - 우하 **LED LIVE ACTION** — 프레임 안 사람 아이콘
- 4개 원을 잇는 원형 곡선(링). FILMING에서 우측 화살표 → POSTPRODUCTION.

### 3) 우측 — POSTPRODUCTION (퍼플 계열)
- 2개 원이 곡선 화살표로 **순환 루프**:
  - 상 **EDITING** — 이미지/사진 아이콘
  - 하 **POST VFX** — 필름스트립 아이콘
  - 두 원 사이 위/아래 곡선 화살표로 사이클 형성.
- 화살표 → 우측 끝 **SHOWTIME**: 다이아몬드, 재생(▶) 아이콘, 라벨 "SHOWTIME".

### 바닥
하단에 은은한 원근 그리드(퍼플→민트 글로우), 옅게.

## 브랜드 매핑 (globals.css @theme 토큰)
- 배경: navy `#0e0626 → #1a1d40` 그라데이션.
- **PREPRODUCTION / POSTPRODUCTION**: 퍼플/바이올렛 — 외곽선 `#8b5cf6`(violet), 글로우 `#5e2ec0`(primary), 헤더 텍스트 lav `#c4b5fd`.
- **PRODUCTION**: 민트 `#45f1e0`(mint) — 외곽선·글로우·헤더(활성 강조).
- 포인트 액센트: 핑크 `#d206ee` 아주 절제해서(예: FILMING 코어 글로우 일부).
- 노드/아이콘: **라인(stroke) 스타일**(원본처럼 외곽선 위주, 채움 최소), 네온 글로우.
- 라벨 텍스트: white, 대문자, 자간 넓게(원본 톤). 폰트 Poppins 스택.
- 노랑/주황 금지.

## 라벨 (정확히, 영문 대문자)
PREPRODUCTION · PRODUCTION · POSTPRODUCTION · STORY · PHYSICAL ART · VIRTUAL ART · VISUAL EFFECTS · VISUALIZATION · HYBRID CAMERA · MOTION CAPTURE · LED LIVE ACTION · FILMING · EDITING · POST VFX · SHOWTIME

## 모션 (prefers-reduced-motion 안전)
- 단계 연결 화살표 위로 흐르는 데이터 점 + FILMING 코어 은은한 펄스 글로우. `@media (prefers-reduced-motion: reduce)`에서 정지, 선·노드·라벨 정적 표시.

## 접근성·반응형
- SVG `role="img"` + 한글 `aria-label`(VP 워크플로우 요지), 장식/파티클 `aria-hidden`.
- 데스크톱 가로 16:9. 모바일(≤640): 3단계를 세로 스택(PRE → PRODUCTION → POST → SHOWTIME)으로 재배치, 가로 스크롤 금지, 라벨 가독 유지.

## 산출물
- `src/components/solution/VpWorkflow.tsx` (`"use client"`, 인라인 SVG, 외부 라이브러리 0, viewBox, width 100%).
- **임시 프리뷰 라우트** `src/app/vp-workflow-preview/page.tsx` — navy 배경 풀스크린에 `<VpWorkflow />`만 렌더(스크린샷 확인용, 나중에 삭제). `export const metadata`로 noindex 불필요(임시).
- 검증: `npx tsc --noEmit` + `npx eslint <두 파일>` 통과.
- 작업 노트 `_workspace/vp-workflow/01_notes.md`.
