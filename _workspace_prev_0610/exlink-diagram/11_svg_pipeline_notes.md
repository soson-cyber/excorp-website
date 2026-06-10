# 11 — ExlinkPipeline SVG 작업 노트

`public/exlink-vp-core.png`(1672×941) 최종 이미지를 기반으로, XR Solution §03의 정적
이미지를 React/SVG 컴포넌트(`src/components/solution/ExlinkPipeline.tsx`)로 재현했다.
픽셀 복제가 아니라 레이아웃·라벨·무드의 깔끔한 SVG 해석(다이어그램적 단정함).

## 생성/수정 파일
- **신규** `src/components/solution/ExlinkPipeline.tsx` (`"use client"`, 인라인 SVG, 외부 라이브러리 0).
- **수정** `src/app/solution/xr-solution/page.tsx`
  - `import { ExlinkPipeline }` 추가.
  - §03의 `<Image src="/exlink-vp-core.png" .../>` 블록 → `<ExlinkPipeline />` 교체.
  - 캡션(※…) 유지. 래퍼 `rounded-2xl border border-border` 유지.
  - `next/image` import는 **보존**(같은 파일 line 107 `vp-workflow.png`에서 계속 사용 — grep 확인).
- `ExlinkDiagram.tsx`는 손대지 않음(별도 보존).

## 5블록 구현
| 블록 | 위치(데스크톱) | 아이콘 | 언더글로우 |
|------|------|------|------|
| 좌측 대형 플랫폼 | (300,410) w170 | Tracking(노드그래프 별자리) + Camera(시네마 카메라, 본체 HDR) | 퍼플 #5e2ec0 |
| 상단 중앙 | (660,230) | Media Server(팬 3개 타워) | 시안 #45f1e0 |
| 하단 중앙 | (660,470) | Broadcast(스위처 키패드 3×4) + LIVE 와이파이 태그 | 마젠타 #d206ee |
| 우측 | (1010,360) | Platform Streaming(데이터 비 클라우드 + 노트북) | 마젠타 #d206ee |

- 플랫폼 공통: `Platform` 컴포넌트 — 아이소 마름모 상면 + **3겹 적층 측면**(좌/우면) + 블러된 네온 언더글로우 마름모.

## 7개 라벨 렌더 방식
SVG `<text>`로 영문 그대로, 공유 `Label` 컴포넌트(fontFamily `var(--font-sans, system-ui, sans-serif)`):
`Tracking System` · `Camera System` · `HDR`(카메라 본체 내부 text) · `Media Server` ·
`Broadcast System` · `LIVE`(네온 태그 내부 text) · `Platform Streaming`.
→ 텍스트가 벡터라 확대 시 항상 선명·정확.

## 연결선
글로우 필터(`exp-line-glow`) 적용 정적 경로 + 그 위 데이터 파티클(`<animateMotion path=...>`):
- Camera/Tracking → Media Server (시안)
- Camera/Tracking → Broadcast (시안)
- Media Server → Broadcast (시안)
- Broadcast →(LIVE)→ Platform Streaming (마젠타/퍼플)
시안 = 입력/내부, 마젠타 = 스트리밍 출력.

## 모션 / reduced-motion
- 파티클: SVG `<animateMotion>` (SMIL, 외부 라이브러리 불필요).
- `@media (prefers-reduced-motion: reduce)`에서 `.exp-particles { display:none }` → 파티클 정지,
  선·노드·라벨·플랫폼은 항상 정적 렌더(컴포넌트 `<style>` 블록).

## 반응형 전략
- 데스크톱(`hidden sm:block`): `DesktopPipeline`, viewBox 1280×720(16:9), 가로 아이소 배치.
- 모바일(`sm:hidden`): `MobilePipeline`, viewBox 540×1120 세로 재배치(입력→Media→Broadcast→Streaming),
  라벨 비례 확대, `width:100%`·`h-auto`로 가로 스크롤 없음.
- 두 SVG 모두 `preserveAspectRatio="xMidYMid meet"`.

## 접근성
- 각 SVG `role="img"` + 한글 `aria-label`(신호 흐름 요지).
- 장식 파티클 그룹 `aria-hidden="true"`.
- `<figcaption className="sr-only">` 보조 설명.

## 적용 토큰 (globals.css @theme hex, SVG 직접 필요분만, 주석 명시)
bg #0e0626 / dark-purple #1a1d40 / primary(퍼플) #5e2ec0 / pink(마젠타) #d206ee /
mint(시안) #45f1e0 / lav #c4b5fd / fg(white) #ffffff. **노랑·주황 미사용.**
디바이스 본체 음영용 보조 hex(#241a52 등)는 토큰 사이 보간값으로 파일 상단 주석에 출처 명시.

## 빌드 영향
- **새 의존성 0.** 순수 인라인 SVG + SMIL.
- `npx tsc --noEmit` ✅ / `npx eslint`(새 파일+page) ✅ / `npx next build` ✅(`/solution/xr-solution` static prerender).
- 빌드/프리뷰 스크린샷 시각 검증은 qa-verifier가 별도 수행.

## 결정 메모(모호점 처리)
- 이미지의 사진풍 3D 음영은 손코딩하지 않고 마름모+적층+언더글로우로 다이어그램화(브리프 지침).
- HDR은 카메라 본체 위 작은 라벨로, LIVE는 Broadcast 우상단 네온 와이파이 태그로 배치(이미지 일치).
- Camera/Tracking → Media·Broadcast 진입선은 좌측 플랫폼 우측 가장자리에서 출발(시각적 깔끔함 우선).
