# 코드 리뷰 — product/aximmetry/page.tsx (미디어 재구성·순서 이동·glow 제거)

**차단 여부: 차단 이슈 없음 (🔴 0 · 🟠 0).** 병합 진행 가능. 🟡 1건은 라벨 번호 일관성, 🟢 2건은 취향.

리뷰 범위: `src/app/product/aximmetry/page.tsx` diff + 파일 전체, `MediaBlank.tsx`(미변경, src 분기 검증용 정독), `public/` 자산 존재 확인.

---

## 🔴 Critical
없음.

## 🟠 Major
없음.

검증 통과 항목:
- **JSX 구조 무결**: §05 블록이 §03 뒤로, §04 앞으로 이동. 여는/닫는 `<section>`·`</div>` 짝 정상, 고아 태그·중복 블록 없음. 파일 끝까지 구조 균형(`CtaBanner` → `</>`).
- **자산 경로 일치**: `/vp-workflow.png`(§02), `/vp-chroma.png`(§04), `/aximmetry-vp.jpg`(§07 첫 카드) 모두 `public/`에 실재. 404 위험 없음.
- **타입 안전성**: `useCases`에 명시 타입 `{ t; mono; d; src?; alt? }[]` 부여. `src`/`alt` optional → MediaBlank에서 `hasSrc = typeof src === "string" && src.length > 0`로 안전 분기, undefined 카드(뉴스/XR/AR/라이브)는 플레이스홀더로 정상 폴백. `alt={u.alt}`(undefined) → MediaBlank가 `alt ?? label ?? ""`로 처리하므로 빈 alt 안 됨(label=`u.t`로 대체).
- **map key 유일성**: `key={u.t}` 5개 값(방송 가상 스튜디오/뉴스/XR/AR/라이브) 전부 고유. whyPoints·features·editions 기존 key도 충돌 없음.
- **정직성**: 리셀러 표기 일관(tag "Authorised Reseller", §06·§10 "공식 인증 리셀러"), §07에 `실제 사례가 아닌 활용 시나리오입니다 · 일부 이미지 준비 중` 디스클레이머 + 카드 tag="활용 시나리오"로 날조 방지. 가짜 실적 없음. **exlink-* 자산 미사용 확인**(grep 결과 0건; public에 exlink-control-room.jpg·exlink-vp-core.png 존재하나 이 페이지에서 미참조 — 의도대로).
- **단색 배경 정책**: `section--glow` §02·§10에서 제거 완료(파일 전체 grep 0건). 새 글로우 신설 없음. MediaBlank의 radial-gradient는 `hasSrc`일 때 적용 안 됨(src 카드는 `backgroundColor: var(--color-card)`만) — 이번 추가분은 전부 src 지정이라 그라데이션 미발동, 정책 위반 없음.
- **접근성**: src MediaBlank는 `role="img"` + `aria-label`(alt→label 폴백)로 라벨됨. 데코 글리프 `aria-hidden`. §07 카드 이미지에 의미 있는 label(분야명) 노출.
- **배경 톤 교차**: surface→ink→surface→white→ink→surface→white→ink→surface→white→ink. 인접 동일 톤 중복 없이 리듬 유지.

## 🟡 Minor
1. **page.tsx:230, 243 — SectionLabel index와 시각 순서 역전 (라벨 번호 비단조)**
   - 무엇: 시각 순서가 03 → **05(Compare)** → **04(Features)** → 06 으로, 화면을 위→아래로 읽으면 05가 04보다 먼저 나온다. 코드 주석(`{/* §05 Compare */}` / `{/* §04 Features */}`)은 정확하나, 사용자에게 보이는 SectionLabel 숫자가 "…03 → 05 → 04 → 06…"으로 역행한다.
   - 왜: SectionLabel은 장식이 아니라 페이지 내 목차 번호로 읽히므로, 04 뒤에 05가 아니라 그 반대로 보이면 "섹션 누락/순서 오류"로 오인될 수 있다. 빌드·기능 영향은 없음(차단 아님).
   - 제안: 의도된 콘텐츠 흐름(비교를 기능보다 먼저)이라면 **표시 번호를 시각 순서대로 재부여**(현 05→"04", 현 04→"05") 권장. 코드 주석/배열 위치는 그대로 두고 `<SectionLabel index>` 문자열만 스왑하면 됨. 단순 톤 이동이 목적이고 번호 변경이 의도가 아니라면 frontend-builder 확인 후 결정.

## 🟢 Nit
1. **page.tsx:294 — 디스클레이머 문구 위치/범위**
   - `일부 이미지 준비 중`은 정직하지만, 실제로는 5개 중 1개만 실이미지(나머지 4개 플레이스홀더)다. 정직성상 문제는 없으나 "대부분 준비 중"에 가까움 — 차후 이미지 채워지면 문구 갱신 잊지 말 것(기능 영향 없음).
2. **MediaBlank 일관성(참고, 미변경 파일)** — §07 카드 이미지는 next/image 옵티마이저 우회(`<img>`) 경로를 탄다(MediaBlank src 분기). §01·§10의 `next/image`와 최적화 정책이 섞이나, MediaBlank 주석에 "원본 직접·CLS 0" 의도가 명시돼 있어 수용 가능. 향후 LCP 민감 영역엔 next/image 권장.

---

### 반환 요약
- **차단 이슈(🔴/🟠) 없음** → 병합/배포 게이트 통과(코드 리뷰 관점).
- JSX 구조·자산 경로·타입·key·정직성·단색 배경·접근성 전부 정상. glow 제거·톤 재배정 깔끔.
- 단 1건 권고: **§04↔§05 SectionLabel 표시 번호가 시각 순서와 역전(🟡)** — 의도 확인 후 번호 스왑 권장. 코드 수정은 frontend-builder에 위임.
