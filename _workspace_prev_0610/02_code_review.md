# 코드 리뷰 — MediaBlank 하위호환 확장 + xr-solution 미디어 배치

리뷰 대상: `src/components/ui/MediaBlank.tsx`, `src/app/solution/xr-solution/page.tsx` (커밋 전 diff + 전체)
대조 사용처: `src/app/xr-studio/page.tsx`, `src/app/careers/page.tsx`, `src/app/product/moverse/page.tsx`
방식: 정적 분석/diff 읽기 (빌드·dev 미실행)

## 차단 여부: **차단 이슈 없음 (🔴/🟠 없음) — 커밋 진행 가능**

---

## 🔴 Critical
없음.

## 🟠 Major
없음.

## 🟡 Minor

- **MediaBlank.tsx:64-77 — `Glyph`의 `common` 객체에 명시적 타입 없음(약한 추론).**
  무엇: `common`이 인라인 객체 리터럴로 SVG에 `{...common}` 전개됨. `"aria-hidden": true`(boolean)·`strokeWidth: "1.5"`(string) 등 타입이 추론에 의존.
  왜: React 19 SVG props는 boolean `aria-hidden`을 허용하므로 컴파일 에러는 없을 것으로 판단되나, `strokeLinecap`/`strokeLinejoin`만 `as const`로 좁히고 나머지는 추론에 맡겨 향후 prop 추가 시 타입 안전성이 약함.
  제안: `React.SVGProps<SVGSVGElement>` 타입을 명시하면 견고. (현 상태로도 동작상 문제 없음 — Nit에 가까운 Minor)

- **xr-solution/page.tsx:135-148 — §02 "분산형/EXLINK 통합" MediaBlank 2개가 동일 sublabel "구성 비교 이미지 준비 중"으로 중복.**
  무엇: 두 카드의 `sublabel`이 글자까지 동일.
  왜: 기능 문제는 아니나 스크린리더가 동일 aria-label을 두 번 읽음(label로 구분되긴 함: "분산형 구성"/"EXLINK 통합").
  제안: 의도된 대칭이면 유지 가능. 차별화하려면 sublabel을 각각 다르게.

## 🟢 Nit

- **MediaBlank.tsx:120-121 — `resolvedGlyph` 3중 삼항.** 읽기 약간 빡빡하나 정확. lookup 맵으로 단순화 가능(취향).
- **MediaBlank.tsx:164 — ratio 방식에서 label을 `lowercase`로 강제.** "EXLINK 실시간 XR 워크플로우" 같은 한글 라벨엔 `lowercase`가 무영향이고, "EXLINK" 같은 영문 약어가 라벨에 섞이면 소문자화됨. 현재 전달되는 label은 한글 위주라 시각 영향 미미. 의도 확인만.

---

## 항목별 점검 결과

### 1. 회귀 안전성 — PASS (핵심)
- 레거시 3개 사용처(`xr-studio` ×3, `careers` ×1, `moverse` ×1) 전부 `tag`/`glyph`/`label`/`sublabel`/`className`(aspect 유틸)만 사용하고 **`ratio`를 넘기지 않음**.
- `hasRatio = typeof ratio === "string" && ratio.length > 0` → 레거시 호출에서 `false`.
- `hasRatio=false` 분기는 기존과 동일 동작 유지: `bg-pale` 적용, label `text-fg`(소문자화 없음), `role`/`aria-label` 미부여, inline `style` undefined. 즉 **기존 렌더 경로 보존**.
- `tag` 기본값 `"MEDIA"`, `glyph` 기본값 `"image"` 유지 → 시그니처 호환.
- `Glyph` 내부 kind 유니온이 `"diagram"` 추가로 확장됐으나, 레거시는 `resolvedGlyph`가 `glyph`(image|play)로 귀결되어 영향 없음.
- 신규 토큰 `--color-card`(#161232)·기존 `--color-pale`(#1c1838) 모두 globals.css에 존재 — 미정의 변수 참조 없음.

### 2. 접근성 — PASS
- ratio 방식: `role="img"` + `aria-label`("… (자산 준비 중)") 부여 → 의미 전달 적절, 정직(준비 중 명시).
- 중앙 글리프는 `aria-hidden` 처리(장식). 모서리 틱 `pointer-events-none`.
- 영상/이미지 교체 동선 주석에 alt·poster·loop/muted/playsInline·sizes 가이드 포함 — 적정. reduced-motion은 정적 플레이스홀더라 무관(주석 명시 정확).
- 레거시 방식은 role 미부여(장식적 박스) — 종전과 동일, 회귀 아님.

### 3. 타입 안전성 / 죽은 코드 / 중복 — 대체로 양호
- `any` 없음. `as const`로 SVG 리터럴 좁힘. `ratio!` non-null 단언은 `hasRatio` 가드 뒤라 안전.
- 죽은 분기 없음. `common` 추출로 SVG 중복 제거(개선).
- `MediaKind`("video"|"image"|"diagram")와 `Glyph` kind 유니온("image"|"play"|"diagram")이 분리돼 있어 `resolvedGlyph` 매핑이 필요 — 의도된 설계(video→play). 합리적.

### 4. 정직성 — PASS
- 가짜 고객/실적 라벨 없음. 모든 라벨이 "… 준비 중", "활용 시나리오", "개념 구성" 톤.
- xr-solution:337-339 "실제 사례가 아닌 활용 시나리오입니다 · 이미지 준비 중" 명시 — 정직성 규칙 부합.
- xr-solution:199-201 "위 노드 흐름은 개념 구성이며, 실제 결선·신호 흐름 다이어그램은 준비 중" — 정직.
- useCases `mono` 라벨(BROADCAST/IR·KEYNOTE 등)은 분야 카테고리 태그이지 고객명/실적 아님 — 문제없음.

### 5. 단색 배경 정책 — PASS
- 그라데이션(radial-gradient 핫퍼플 0.18)은 **MediaBlank 카드 컨테이너 내부 한정**, ratio 방식에서만 inline style로 적용. 섹션 배경(`.section--ink`)엔 글로우 부활 없음.
- xr-solution의 `<section className="section section--ink">` 신규 §00은 단색 ink 표면 유지, 글로우 미추가.
- 주석(141-142)이 "섹션 배경이 아니라 자산 자리이므로 단색 배경 정책과 무관"으로 의도 명시 — 정책 부합.

### 6. 성능/CLS — PASS
- ratio 방식: 컨테이너 `aspectRatio`(예: "16 / 9") inline 고정 → 자산 로드 전후 레이아웃 시프트 방지 구조. CLS 0 의도 충족.
- 레거시 방식: className의 `aspect-*` 유틸로 동일하게 비율 고정.
- 교체 가이드도 동일 비율 래퍼 유지 권장 → 향후 실자산 교체 시에도 CLS 안전.

---

## 못 본 범위
- 실제 빌드/타입체크/렌더는 미실행(지시대로). `common` 객체 spread의 타입 통과 여부는 정적 판단(React 19에서 통과 예상)으로, 최종 확인은 qa-verifier의 빌드에 위임.
