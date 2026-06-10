# VP 워크플로우 SVG 구현 — 작업 노트 (frontend-builder)

작성일: 2026-06-07 · 단일 기준: `00_brief.md`

## 생성 파일
- `src/components/solution/VpWorkflow.tsx` — `"use client"`, 인라인 SVG 컴포넌트, 외부 라이브러리 0, `width:100%`.
- `src/app/vp-workflow-preview/page.tsx` — 임시 프리뷰 라우트(navy 풀스크린, `<VpWorkflow/>`만). **검수 후 삭제 예정.**

## 15 라벨 (전부 SVG `<text>`, 영문 대문자)
단계 헤더 3 — PREPRODUCTION · PRODUCTION · POSTPRODUCTION
노드 12 — STORY · PHYSICAL ART · VIRTUAL ART · VISUAL EFFECTS · VISUALIZATION ·
HYBRID CAMERA · MOTION CAPTURE · LED LIVE ACTION · FILMING · EDITING · POST VFX · SHOWTIME
- 데스크톱은 15개 모두 개별 `<text>`. 모바일은 공간 제약상 4개 PRODUCTION 서브노드 라벨
  (VISUALIZATION/HYBRID CAMERA/MOTION CAPTURE/LED LIVE ACTION)을 FILMING 아래 2줄
  `·` 구분 텍스트로 압축(가독·가로 스크롤 금지 우선). 나머지 11개는 노드별 개별 라벨.
  → 15개 라벨 텍스트는 양쪽 뷰 모두에 존재.

## 아이콘 (라인 스타일, 인라인 path, 외부 아이콘 라이브러리 금지)
모두 `fill=none stroke=#ffffff` 라인 컴포넌트로 직접 그림(`iconG` 헬퍼):
- 문서/펜 DocIcon(STORY) · 팔레트 PaletteIcon · 큐브(아이소) CubeIcon · 별 StarIcon(수식 생성 10점) ·
  눈 EyeIcon · 사람+스크린 PersonScreenIcon(HYBRID CAMERA) · 달리는사람 RunnerIcon ·
  프레임속사람 FramePersonIcon · 비디오카메라 CameraIcon(FILMING) · 이미지 ImageIcon(EDITING) ·
  필름스트립 FilmStripIcon(POST VFX) · 재생 PlayIcon(SHOWTIME, 삼각형 채움).
- 별/팔레트 점 등 일부 미세 채움만 흰색, 그 외 전부 stroke 라인.

## 단계별 색 매핑 (globals.css @theme 토큰값, SVG라 직접 사용 + 주석 출처 명시)
- PRE / POST = 퍼플: 외곽선 violet `#8b5cf6`, 글로우 filter, 헤더 텍스트 lav `#c4b5fd`.
- PRODUCTION = 민트(강조): 외곽선·링·글로우·헤더 mint `#45f1e0`.
- FILMING 코어 글로우 = mint→pink radial(`vpwf-core`), pink `#d206ee`는 stopOpacity 0.10로 절제.
- 배경 navy 그라데이션 `#0e0626`(--color-bg) → `#1a1d40`(브리프 지정 끝).
- 라벨 white `#ffffff`, Poppins 스택(`var(--font-poppins)`), 대문자·자간 넓게. 노랑/주황 미사용.
- 하드코딩 hex는 전부 토큰명 주석 병기. (SVG `stroke`/`stop-color`는 CSS 변수 상속이
  불안정해 토큰값을 직접 기입 — 프로젝트 "하드코딩 금지"의 SVG 예외, 브리프 지시대로.)

## 모션 / reduced-motion
- 연결 화살표(FlowArrow/VArrow): SVG `<animateMotion>`로 흐르는 데이터 점.
- FILMING 코어: `.vpwf-pulse` CSS keyframe(scale+opacity, 3s).
- `@media (prefers-reduced-motion: reduce)`: `.vpwf-pulse` 정지(opacity 0.85, scale 1),
  `.vpwf-flowdot` 및 `animateMotion` display:none → 선·노드·라벨 정적 표시.

## 반응형 전략
- 데스크톱 `viewBox 0 0 1280 720`(16:9), `.vpwf-desktop`.
- 모바일 `≤640px`: `.vpwf-desktop` 숨김, `.vpwf-mobile`(viewBox 360×1280) 세로 스택 표시
  — STORY→PRE 3노드→FILMING→POST(EDITING/POST VFX 미니 순환)→SHOWTIME.
- 두 SVG 모두 `width:100% height:auto` → 가로 스크롤 발생 안 함.
- 접근성: 두 SVG `role="img"` + 한글 `aria-label`(흐름 요지). 배경·그리드·선·아이콘·파티클 `aria-hidden`.

## 빌드 영향
- 새 의존성 0. `npx tsc --noEmit` PASS, `npx eslint <두 파일>` PASS(0 errors / 0 warnings).
- 스타일은 컴포넌트 내 스코프 `<style>`(.vpwf 프리픽스) — globals.css 미변경.

## 결정·가정 (브리프 모호 지점 → 합리적 처리)
- 모바일 4개 PRODUCTION 서브노드: 개별 원 대신 2줄 텍스트로 압축(세로 길이·가독 우선).
- MergeLines의 합류 종점은 0-length 라인 대신 작은 점으로 표기.
- 원근 그리드는 옅게(violet 수평선 opacity 0.12 / mint 소실선 0.08)만.

## 후속(메인이 수행)
- 프리뷰 스크린샷 검증(데스크톱+모바일) 후 라벨 위치·겹침 미세조정 가능.
- 솔루션 페이지 실배치 시 프리뷰 라우트 삭제.
