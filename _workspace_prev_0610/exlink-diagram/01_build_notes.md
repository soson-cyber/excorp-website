# EX-LINK 다이어그램 — 빌드 노트 (frontend-builder)

날짜: 2026-06-05

## 생성/수정 파일
- **생성** `src/components/solution/ExlinkDiagram.tsx` — `"use client"`, 외부 라이브러리 없는 순수 인라인 SVG.
- **수정** `src/app/solution/xr-solution/page.tsx`
  - import 추가: `ExlinkDiagram`.
  - §03 Architecture의 `MediaBlank`(tag="EXLINK PIPELINE") → `<ExlinkDiagram />` 교체.
  - 하단 캡션 문구를 "다이어그램 준비 중" → 실제 표현 설명으로 수정.
  - 상단 "CAPTURE → TRACKING → EXLINK CORE → RENDER → BROADCAST" 텍스트는 **유지**.
  - `MediaBlank` import는 **유지**(§00·§02·§08에서 여전히 사용 → 정리 불필요).

## 컴포넌트 구조
- 단일 파일에 두 레이아웃 함수 + 래퍼:
  - `DesktopDiagram()` — viewBox `0 0 1280 720`(16:9), 좌-중-우 3열 아이소메트릭.
  - `MobileDiagram()` — viewBox `0 0 540 1180`(portrait), 세로 스택(INPUT row → CORE → OUTPUT).
  - `ExlinkDiagram()` — `<figure>` 안에서 `hidden sm:block`(데스크톱) / `sm:hidden`(모바일) div로 토글. `<figcaption className="sr-only">` 추가 설명.
- `NodeChip` 공용 서브컴포넌트(라운드 사각 칩).

## 15개 라벨 렌더 방식
모두 SVG `<text>`로 실제 렌더(철자 그대로, 데스크톱·모바일 양쪽 레이아웃 각각 포함):
EX-LINK / VP Production Core / Camera / Tracking / Controller / Media Server / Aximmetry / Unreal Engine / Video I/O / Control System / LED Wall / Chroma Key / Broadcast / Recording / Streaming.
- 코어 5칩은 전면 사다리꼴(x 490–650) 안쪽 x=504~636에 격납(외부로 새지 않음).
- v3 결함 교정: **Recording 라벨 포함**, 내부 5칩 텍스트 정상 렌더.
- 브라우저 DOM 검증: 데스크톱·모바일 모두 `missing: []`.

## 모션 / reduced-motion
- 데이터 파티클 = SVG SMIL `<animateMotion>` + `<mpath>`. JS 없이 동작.
  - 입력 3개 = 시안 파티클(`url(#exlink-p-mint)`), 출력 5개 = 바이올렛(`url(#exlink-p-violet)`). 데스크톱 8개, 모바일 4개.
  - `begin` 스태거로 흐름감.
- 파티클은 `<g className="exlink-particles" aria-hidden="true">`로 묶음.
- 컴포넌트 내 `<style>` 블록:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .exlink-diagram .exlink-particles { display: none; }
  }
  ```
  → reduced-motion에서 파티클만 숨김. 연결선·노드·칩·라벨은 SVG에 정적으로 항상 완전 표시(JS 불필요, 콘텐츠 노출 보장).

## 반응형 전략
- 데스크톱(≥640): 16:9 3열 아이소메트릭, `width:100%` 비례 축소.
- 모바일(≤640): **별도 portrait SVG**로 세로 스택. 1280폭을 그대로 축소하면 13px 라벨이 ~3.6px로 깨지므로, 모바일 전용 레이아웃에서 폰트를 비례 확대(18~22px)해 가독성 유지.
- 검증: mobile(375px)에서 `scrollWidth == clientWidth`(가로 스크롤 없음), 모든 라벨 렌더.

## 접근성
- 각 레이아웃 `<svg role="img" aria-label="...">`(한글 요지 1줄, 입력→코어→출력 전체 라벨 나열).
- 장식 파티클 그룹 `aria-hidden="true"`.
- 코어/노드 텍스트 흰색(#fff) on 다크 → AA 대비.

## 적용 토큰 (globals.css @theme 출처)
SVG가 CSS 변수를 직접 stop-color/stroke에 받지 못해, 동일 hex를 모듈 상단 상수로 두고 **각 토큰 출처를 주석으로 명시**(브랜드 hex 직접 필요 SVG의 합의된 예외):
- `--color-bg` #0e0626 · `--color-dark-purple` #1a1d40 · `--color-deep-purple` #310a9e (배경 그라데이션)
- `--color-primary` #5e2ec0 (코어 전면 채움) · `--color-mint` #45f1e0 (시안 글로우/입력선) · `--color-violet` #8b5cf6 (출력선)
- `--color-lav` #c4b5fd (코어 부제) · `--color-fg` #ffffff (라벨) · `--color-success` #0e9e84 (Chroma Key 클린 그린)
- LED Wall 칩 blue/purple #3b6fe0(브리프 지정), Recording 점 #ed1e64(--color-live). **노랑/주황 미사용.**

## 빌드 영향
- **새 의존성 없음**(순수 인라인 SVG). `next/image` 등 추가 자산 없음.
- `npx tsc --noEmit` → exit 0. `npx eslint`(두 파일) → exit 0.
- 다크 토큰·레이아웃·기존 클래스(.section--white 등) 보존.

## qa-verifier 인계 포인트
- 데스크톱/모바일 §03 렌더, 파티클 애니메이션 동작, reduced-motion에서 파티클 정지(선·라벨 유지) 시각 확인.
- 프리뷰 스크린샷 도구가 페이지 상단으로 리셋되어 미드페이지 캡처가 안 됨 → DOM/SVG 인스펙션으로 구조·색·라벨·오버플로우는 검증 완료(본 노트 참조). 시각 스크린샷은 qa-verifier가 별도 수행.

## QA 후속 수정 (defs 자체 포함 — 잠재 결합 제거)
qa-verifier 지적: 모바일 SVG가 파티클 그라데이션·글로우 필터(`#exlink-p-mint`/`#exlink-p-violet`/`#exlink-glow`)를 **데스크톱 SVG `<defs>`에서만** 정의된 채 참조 → 향후 데스크톱 레이아웃 조건부 언마운트 시 모바일 파티클 색/글로우가 깨짐.

**조치:** 각 SVG가 자기 `<defs>`를 자체 포함하도록 분리. SVG `id`는 문서 전역이라 중복 정의가 충돌하므로 **레이아웃별 고유 prefix**로 네임스페이스 분리:
- 데스크톱: `exlink-*` → **`exlink-d-*`** (전체 rename)
  - 분리한 id: `exlink-d-bg`, `exlink-d-core-front`, `exlink-d-core-side`, `exlink-d-core-top`, `exlink-d-glow`, `exlink-d-p-mint`, `exlink-d-p-violet`, `exlink-d-in-{cam,trk,ctl}`, `exlink-d-out-{led,chr,bro,rec,str}`
  - 내부 참조 갱신: 배경 `fill="url(#exlink-d-bg)"`, 연결선 `<use href>`, 파티클 `<mpath href>`+`fill="url(#exlink-d-p-*)"`, 코어 `filter="url(#exlink-d-glow)"`+면 `fill="url(#exlink-d-core-*)"`.
- 모바일: 기존 `exlink-m-*`(bg/core/path) 유지 + **누락분 3개를 모바일 defs에 신규 추가** → `exlink-m-glow`, `exlink-m-p-mint`, `exlink-m-p-violet`
  - 내부 참조 갱신: 파티클 `fill="url(#exlink-m-p-mint|violet)"`, 코어 `filter="url(#exlink-m-glow)"`.

**규칙:** 데스크톱=`exlink-d-*` / 모바일=`exlink-m-*`. 두 레이아웃이 서로의 defs에 의존하지 않으며, 한쪽을 언마운트해도 다른 쪽 시각이 유지된다.

**회귀 없음:** id 네임스페이스·defs 위치만 변경. 좌표·색(brand hex)·15라벨·모션(SMIL dur/begin)·reduced-motion `display:none`은 그대로. 시각 결과 동일.

**검증:** `grep`으로 prefix 없는 공유 id 잔존 0건. `npx tsc --noEmit` → exit 0. `npx eslint src/components/solution/ExlinkDiagram.tsx` → exit 0.
