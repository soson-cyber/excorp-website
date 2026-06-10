# 07. 코드 리뷰 — 섹션 헤더 중앙 정렬 변경 (정적 diff)

리뷰어: code-reviewer · 날짜: 2026-06-05
대상: `git diff` — 10개 page.tsx 섹션 헤더 중앙 정렬
정본: `_workspace/07_layout_review.md`
방법: 정적 diff 리뷰 (빌드/dev 미실행) + `tsc --noEmit`(통과, exit 0)

---

## 차단 여부: **병합 가능 (차단 이슈 없음)**

🔴 Critical 0 · 🟠 Major 0 · 🟡 Minor 0 · 🟢 Nit 1

순수 정렬 diff로 확인됨. 헤더 3요소(SectionLabel + .h2 + .lead)만 `text-center` 래퍼로 감싸고 `.h2`/`.lead`에 `marginInline:auto`를 병합. 본문·문구·색·구조 변경 없음. 정본 §3 구현 지시 및 R1~R3 예외를 모두 준수.

---

## 검증 항목별 결과

### 1. 본문 정렬 오염 없음 — ✅
- 모든 변경에서 `<div className="text-center">` 래퍼가 **헤더 3요소 직후 `</div>`로 닫힘**. 후속 본문 컨테이너(`grid`/`card`/`SpecTable`/`CompareTable`/`ol`/`ul`/FAQ `details`/`NewsList`/`StudioMenu` 등)는 래퍼 바깥에 그대로 남음 → 본문 좌측 유지.
- **moverse §05**(retracker.tsx line 372~380): 래퍼가 `</h2>` 직후 닫히고, 제품 고지 문단 `<p className="mt-4 max-w-3xl ... text-muted">`은 래퍼 **밖**에 위치 → 좌측 유지(R2 준수, 정확).

### 2. 예외 준수 — ✅
- **VP §01 What is VP / §04 EX Virtual Production**: `grid items-center gap-12 lg:grid-cols-2` 2단 인트로, text-center 미적용 — 유지됨.
- **product/{aximmetry §08, moverse §09, retracker §09} EX × {제품}**: 모두 `grid items-center gap-12 lg:grid-cols-2` 2단, 미적용 — 유지됨.
- **support §03 Technical Support**(2단 `lg:grid-cols-2`) · **§05 Quick Inquiry**(폼): SectionLabel이 text-center로 감싸지지 않음 — 유지됨. (변경된 건 §02 FAQ·§04 Downloads 헤더뿐.)
- **about / 각 stats band / xr-studio CTA card / PageHero**: diff에 미포함 — 미변경 확인.
- **work(WorkGallery)**: diff에 미포함 — 미변경 확인.

### 3. JSX 구조 안전 — ✅
- `tsc --noEmit` exit 0 → 신규 래퍼 `<div>`의 여닫기 균형·타입 정상.
- 기존 인라인 `style`(marginTop:22, maxWidth) 보존 + `marginInline:"auto"` 병합 정확. lead의 maxWidth(36~44rem) 전부 유지 → 풀폭 확산 없음.
- `key`/중복 없음(map 키 무변경). 본문 텍스트는 들여쓰기만 +2 deepening, 문자열 동일.

### 4. lead maxWidth 유지 · SectionLabel 미변경 — ✅
- `src/components/ui/SectionLabel.tsx` diff 비어 있음(미변경). `.seclabel`이 inline-flex라 부모 text-center에서 자동 중앙.

### 5. 순수 정렬 diff — ✅
- 추가/삭제 라인 전수 스캔 결과 정렬 외 변경(문구·색·구조·로직) 없음. `aximmetry §01` 등의 기존 `figcaption ... text-center`는 사전 존재 캡션으로 이번 변경과 무관.

---

## 🟢 Nit (선택 — 차단 아님)
- 동일 `text-center` + `marginInline:auto` 패턴이 10개 파일 50여 곳에 반복됨. 정본도 인지한 사항(메인 `SectionHead center` 헬퍼 존재). 향후 재사용 헬퍼(`<SectionHead center>`)로 통일하면 유지보수성↑. 단 본 작업 범위는 정렬만이므로 이번 PR에서 강요하지 않음.

---

## 후속
- 시각 회귀(특히 모바일 375px에서 중앙정렬 lead 가독성, 정본 §4 우려)는 **qa-verifier**가 dev 렌더로 확인 권장. 코드 자체는 병합 안전.
