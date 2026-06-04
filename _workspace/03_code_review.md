# 03 코드 리뷰 — A그룹(신규 미디어) + B그룹(레거시 → ratio/kind 통일)

리뷰 대상: `git diff` 미커밋분 (6개 파일). 정적 diff 읽기만 수행(빌드·dev 미실행).
참조: `MediaBlank.tsx`(이번 변경 없음, 직전 커밋분)로 신규 API 동작 확인.

## 차단 여부

**병합 차단 이슈 없음 (🔴 0 · 🟠 0).** 커밋 진행 가능.
🟡 1건 · 🟢 2건은 선택적 후속.

---

## 🔴 Critical — 없음

## 🟠 Major — 없음

### B그룹 회귀 검증 (핵심 — 통과)
레거시 `aspect-*` className + `glyph` → 신규 `ratio`/`kind` 전환이 비율·구조를 보존함:

| 파일:라인 | 이전 | 이후 | 비율 보존 | 글리프 매핑 |
|---|---|---|---|---|
| careers/page.tsx:157 | `className="aspect-[4/3]"` | `ratio="4/3" kind="image"` | 4/3 = 4/3 ✅ | image→image ✅ |
| moverse/page.tsx:151~159 | `glyph="play"` + `aspect-video` | `ratio="16/9" kind="video"` + `w-full` | video=16/9 ✅ | play→video(play) ✅ |
| xr-studio/page.tsx:118 | `aspect-[4/3]` | `ratio="4/3" kind="image"` | 4/3 = 4/3 ✅ | image ✅ |
| xr-studio/page.tsx:166 | `glyph="play"` + `aspect-[16/9] w-full` | `ratio="16/9" kind="video"` + `w-full` | 16/9 = 16/9 ✅ | play→video(play) ✅ |
| xr-studio/page.tsx:170 | `aspect-video`(16/9) | `ratio="16/9" kind="image"` | 16/9 = 16/9 ✅ | image ✅ |

- `kind="video"`→`resolvedGlyph="play"`, 그 외 `kind="image"`→`image` 매핑이 `MediaBlank.tsx:120-121` 로직과 정확히 일치. play 글리프 보존(재생 아이콘 유지).
- `aspectRatio`는 `ratio.replace("/"," / ")`로 인라인 style 적용(`MediaBlank.tsx:125`) — Tailwind `aspect-*` 유틸리티와 수치상 등가. CLS 0 의도 유지.
- careers/xr-studio의 `real` 이미지 figure 분기(careers:147-155)는 미변경 — figure/figcaption 구조 보존.

### 신규 §00 밴드 (PageHero 무간섭 — 통과)
- solution/page.tsx:51-63, product/page.tsx:70-82 모두 `<PageHero .../>` **다음** 형제 `<section>`으로 추가. PageHero props·내부 미변경 → 타 페이지 공용 컴포넌트 안전.
- virtual-production/page.tsx:118-126 §03은 기존 `<div className="mt-12 grid ...">` 위에 MediaBlank를 삽입하고 grid 첫 마진을 `mt-12`→`mt-5`로 조정 — 섹션 헤더와의 상단 간격 유지, 합리적.

### 단색 배경 정책 (통과)
- 신규 §00 두 곳 모두 `section--ink`(단색 surface). `section--glow` 부활 없음.
- 그라데이션은 `MediaBlank` 카드 내부(`backgroundImage` radial, `MediaBlank.tsx:143-144`)에 한정 — 자산 자리이므로 섹션 단색 배경 정책과 무관(컴포넌트 주석에도 명시). 정책 준수.
- product:85의 기존 `section--glow`(§01 Why EX)는 이번 diff 무관·미변경.

### 정직성 (통과)
- product §00 sublabel "Aximmetry · Moverse AI · RETracker · 자산 준비 중" — 파트너 제품 나열(공급/연결). 자체 솔루션으로 오인 표현 없음.
- solution §00 "EX 통합 XR 파이프라인 / 촬영→트래킹→렌더→송출" — 시나리오/파이프라인 설명(활용=시나리오). EXLINK=자체 톤 일관.
- virtual-production §03 "실시간 합성 데모 / 크로마→가상 배경 합성 루프" — 시연 시나리오. 가짜 고객·실적 없음.
- 모든 미디어가 "준비 중" 라벨 유지 — 없는 자산을 있는 것처럼 호도하지 않음.

### 타입·import·접근성 (통과)
- product/page.tsx:8, solution/page.tsx:5, virtual-production/page.tsx:6에 `MediaBlank` import 신규 추가 — 모두 사용됨(미사용 import 없음).
- careers/xr-studio는 기존 import 재사용(신규 import 불필요).
- `ratio` 방식은 `role="img"` + `aria-label`("… 자산 준비 중") 자동 부여(`MediaBlank.tsx:126-135`). 레거시 className 방식보다 접근성 **향상**(회귀 아님).
- 타입: `ratio: string`·`kind: MediaKind` 모두 정의된 prop. `as`/`any` 우회 없음.

---

## 🟡 Minor

1. **moverse/page.tsx:159, 미디어 라벨 케이싱 변화(시각 의도 확인 필요)** — 레거시 방식은 라벨이 `text-fg`(밝은 본문색)였으나, `ratio` 방식 전환 후 `lowercase text-faint`(흐린·소문자)로 렌더된다(`MediaBlank.tsx:164`). "캡처 프리뷰 준비 중" 같은 한글 라벨은 lowercase 영향이 없지만, **톤이 fg→faint로 어두워지는 변화**가 전 B그룹에 공통 적용됨. 이는 신규 API 통일의 의도된 결과로 보이나, 디자인 의도와 일치하는지 design-ux-reviewer/qa 시각 확인 1회 권장. — 회귀가 아닌 **일관성 통일**로 판단하나 시각 확인이 안전.

## 🟢 Nit

1. **`tag` 케이스 혼재** — 신규 §00 태그가 영문 대문자(`VIRTUAL PRODUCTION LINEUP`, `EX · INTEGRATED XR PIPELINE`, `REAL-TIME COMPOSITING`)로 일관. 기존 B그룹 태그(`STUDIO · VIDEO`, `CAPTURE PREVIEW`)와 톤 일치 — 문제없음. 참고용.
2. **`className="w-full"` 명시성** — `ratio` 방식은 컨테이너가 이미 블록·`overflow-hidden rounded-2xl`이라 `w-full`이 기본 블록 폭과 사실상 동일하지만, grid 셀(careers/xr-studio presets)에서 누락해도 셀 폭을 채우므로 일관성 위해 §00·full-width 자리에만 붙인 선택은 합리적. 변경 불필요.

---

## 못 본 범위
- `MediaBlank.tsx` 자체 로직(직전 커밋분)은 동작 검증 대상 아님 — 신규 API 계약 확인용으로만 읽음.
- 실제 렌더·CLS·반응형 시각 회귀는 정적 diff로 단정 불가 → qa-verifier dev 렌더에서 §00 3페이지 + B그룹 5개 블랭크 시각 1회 확인 위임.
