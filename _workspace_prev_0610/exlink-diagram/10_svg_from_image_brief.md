# EX-LINK 파이프라인 다이어그램 — 최종 이미지 기반 SVG 재현 브리프

## 목표
현재 XR Solution §03에 들어간 이미지 `public/exlink-vp-core.png`(1672×941)를 **기반으로**, 같은 레이아웃·구성·무드를 **React/SVG 컴포넌트**로 재현한다. 목적: 텍스트 100% 정확, 무한 확대 선명, 파티클 실제 애니메이션, 브랜드 토큰 정밀.

> 픽셀 단위 복제가 아니라 **레이아웃·라벨·스타일 방향의 깔끔한 SVG 해석**이다(이미지의 사진풍 3D 음영을 그대로 손코딩하지 않는다). 다이어그램적으로 단정하게.

## 반드시 먼저
- `public/exlink-vp-core.png`를 Read로 직접 보고 배치/연결/아이콘/라벨을 파악한다(이게 단일 기준).
- `.claude/agents/frontend-builder.md` + `.claude/skills/ex-frontend-implementation/SKILL.md`(토큰·관례) 로딩.
- 기존 `src/components/solution/ExlinkDiagram.tsx`는 다른(15라벨) 레이아웃 — 참고만, 그대로 쓰지 말 것.

## 레이아웃 (이미지 기준, 5블록 VP 파이프라인)
- **좌측 대형 플랫폼**: 한 플랫폼 위에 두 모듈 —
  - **Tracking System**(좌: 모션트래킹 노드그래프 별자리) + **Camera System**(우: 시네마 카메라, 본체에 `HDR` 라벨). 각 라벨은 플랫폼 위 모듈 아래.
- **상단 중앙 플랫폼**: **Media Server**(상단에 팬 3개 있는 타워형 서버) + 라벨.
- **하단 중앙 플랫폼**: **Broadcast System**(스위처 키패드/콘솔) + 라벨. 우상단에 **`LIVE`** 네온 와이파이 태그.
- **우측 플랫폼**: **Platform Streaming**(위에 데이터 비 내리는 클라우드 + 플랫폼 위 노트북·폰) + 라벨.
- **플랫폼 공통**: 3겹 적층 가장자리(stacked) + 네온 언더글로우(퍼플·마젠타·시안).

## 연결선 (글로우 + 데이터 파티클)
- Camera/Tracking 플랫폼 → **Media Server**(상단)로 시안 라인
- Camera/Tracking 플랫폼 → **Broadcast System**(하단)로 시안 라인
- **Media Server → Broadcast System** 시안 라인
- **Broadcast System →(LIVE)→ Platform Streaming** 마젠타/퍼플 라인
- 선 위로 흐르는 작은 파티클 점. `@media (prefers-reduced-motion: reduce)`에서 파티클 정지·선/노드/라벨 정적 표시.

## 라벨 (정확히, 영문 그대로)
Tracking System · Camera System · HDR · Media Server · Broadcast System · LIVE · Platform Streaming

## 브랜드 (globals.css @theme 토큰)
- 배경: navy `#0e0626 → #1a1d40` 그라데이션.
- 플랫폼 언더글로우/엣지: 퍼플 `#5e2ec0`(primary) · 마젠타 `#d206ee`(pink) · 시안 `#45f1e0`(mint).
- 연결선: 시안(입력/내부), 마젠타-퍼플(스트리밍 출력). LIVE = 시안 네온. 라벨 텍스트 = white, 보조 = lav `#c4b5fd`. 노랑/주황 금지.
- SVG `<text>`는 Poppins 스택(키트 폰트와 동일 계열) 또는 시스템 산세리프. 가독 크기.

## 산출물 & 통합
- `src/components/solution/ExlinkPipeline.tsx` (`"use client"`, 인라인 SVG, viewBox 16:9, width 100%).
- XR Solution §03에서 현재의 `<Image src="/exlink-vp-core.png" .../>` 블록을 `<ExlinkPipeline />`로 교체. 캡션(※…) 유지. `next/image` import가 그 파일에서 더 안 쓰이면 정리(다른 곳 사용 시 보존).
- 미사용된 기존 `ExlinkDiagram.tsx`는 삭제하지 말고 그대로 둔다(별도 판단).

## 접근성·반응형
- SVG `role="img"` + 한글 `aria-label` 요지, 장식 파티클 `aria-hidden`.
- 데스크톱 가로 아이소메트릭, 모바일(≤640) 무리없이 축소 또는 세로 재배치(가로 스크롤 금지), 라벨 가독 유지.

## 검증
- `npx tsc --noEmit` + `npx eslint <새 파일> src/app/solution/xr-solution/page.tsx` 통과.
- 작업 노트 `_workspace/exlink-diagram/11_svg_pipeline_notes.md`.
