# 미디어 요소 설계안 — XR Solution 외 페이지 적용 (design-ux-reviewer)

대상: Solution 인덱스 · VP · Product 인덱스 · Aximmetry · Moverse · RETracker · XR Studio · Work · About · Careers
범위: XR Solution에서 확정한 미디어 패턴을 다른 페이지에 **선별 적용**. 자리·비율·배치·라벨만 확정, 자산은 추후 `MediaBlank` → `<video>`/`<Image>` 교체. 구현은 frontend-builder.
기준: `_workspace/01_design_review.md`(확정 패턴) · `DESIGN.md §0(다크)·§4·§5·§8(정직성)·§9(반응형)` · 기존 `MediaBlank.tsx`(신규 API `label/sublabel/ratio/kind` 보유).

---

## 0. 확정 패턴 재확인 (모든 페이지 공통 전제)

1. **선별 배치 — 과밀 회피**: 페이지당 임팩트 있는 1~4곳만. 표/스펙/다이어그램/실사가 이미 있는 섹션엔 미디어를 더하지 않는다.
2. **단색 섹션 배경 정책 유지**: 섹션 배경에 그라데이션·글로우 금지. 브랜드 그라데이션은 `MediaBlank` **카드 내부 한정**(이미 컴포넌트가 처리).
3. **`aspect-ratio` 고정 → CLS 0**: 신규 API `ratio="16/9"` 형식 사용(컨테이너 aspect-ratio 고정 + `role="img"` + `aria-label("… 준비 중")`). 레거시 `aspect-video` className 방식은 신규 작업에서 지양하고 `ratio` prop 사용.
4. **정직성 라벨**: 채워질 자산 성격을 `label`+`sublabel`로 정직하게. "준비 중"/"활용 시나리오"/"예정". 날조 금지(DESIGN.md §8).
5. **추후 교체**: 비율 컨테이너만 유지하고 내부만 `<video>`/`<Image fill>`로 교체 → 레이아웃 흔들림 0.

> **`section--glow` 메모**: 여러 페이지에 `section--glow`가 붙어 있으나 globals.css에서 무력화된 죽은 클래스(01_design_review §0 확인). 이번 미디어 작업 범위 밖이지만, 미디어를 새로 얹는 섹션에 한해 frontend-builder가 함께 제거해도 무방(배경 정책 위배는 아님).

---

## 1. 페이지별 미디어 배치 표

비율: V=video, I=image, D=diagram. 배치형태: FB=풀블리드(섹션 폭), L2=좌우2단, CG=카드그리드 부착.

| 페이지 | 현재 미디어 상태 | 추가 위치(섹션) | 비율 | 배치형태 | kind | 모바일 동작 | 라벨 의도 | 우선순위 |
|---|---|---|---|---|---|---|---|---|
| **solution (인덱스)** | 미디어 0 (전부 텍스트·카드·표) | **Hero 아래 신설 §00 영상 밴드** | 16/9 | FB | video | 16/9 유지·1열, poster 우선 | "EX 통합 XR 파이프라인 — 촬영→트래킹→렌더→송출" | **P0** |
| solution (인덱스) | — | §02 Two Routes — EXLINK 대형 카드 상단 | 16/9 | CG(카드 상단) | image | 카드 폭 100%·1열 | "EXLINK 통합 제어 콘솔 — 자산 준비 중" | P2 |
| solution (인덱스) | — | §01 Approach / §03 Capability / §04 Proof | — | — | — | — | **미디어 불필요**(아래 §2) | — |
| **virtual-production** | §01 vp-chroma.png(실사), §04 vp-workflow.png(실사) 2장 보유 | **§01 좌측 실사 옆은 유지**, 추가는 §03 Methods 헤더 아래 | 16/9 | FB | video | 16/9·1열 | "실시간 합성 데모 — 크로마→가상배경 합성 루프" | **P1** |
| virtual-production | — | §06 Use Cases 6카드 상단 썸네일 | 16/10 | CG | image | 1→2→3열 각 16/10 | 각 카드 "활용 시나리오" 라벨 | P2 |
| virtual-production | — | §02 Why / §05 Process | — | — | — | — | **미디어 불필요** | — |
| **product (인덱스)** | §04 인증서 3장(실사) 보유 | **Hero 아래 신설 §00 제품 3종 비주얼 밴드** 또는 §02 Lineup 행에 썸네일 | 16/9 | FB | image | 16/9·1열 | "버추얼 프로덕션 핵심 제품군 — Aximmetry·Moverse·RETracker" | P1 |
| product (인덱스) | — | §01 Why / §03 Compare(표) / §04(인증서 보유) | — | — | — | — | **미디어 불필요** | — |
| **product/aximmetry** | §01 aximmetry-hero.png(실사), §10 인증서(실사) | (보강 거의 불요) §07 Use Cases 카드 썸네일만 선택적 | 16/10 | CG | image | 1→2→3열 | "활용 시나리오 — 자산 준비 중" | P2 |
| product/aximmetry | — | §02~§06·§08·§09 | — | — | — | — | **미디어 불필요**(실사+표 충분) | — |
| **product/moverse** | §01 Showcase에 MediaBlank(레거시 API), §09 인증서(실사) | **§01 기존 MediaBlank를 신규 ratio API로 정정**(교체 아님·API 통일) | 16/9 | FB | video | 16/9·1열 | "캡처 프리뷰 — 자료 준비 중"(기존 의도 유지) | **P0(정정)** |
| product/moverse | — | §06 Use Cases 카드 썸네일(선택) | 16/10 | CG | image | 1→2→3열 | "활용 시나리오" | P2 |
| **product/retracker** | §01 retracker-tracking.jpg(실사), §03 제품 사진 2장, §09 인증서 | (보강 불요) | — | — | — | — | **미디어 불필요**(가장 풍부) | — |
| **xr-studio** | studio.png(실사) + §03 프리셋 8 MediaBlank + §06 영상+갤러리 MediaBlank 다수 | **기존 레거시 MediaBlank를 신규 ratio API로 통일**(신규 추가 X) | 4/3·16/9 | — | image/video | 기존 유지 | 기존 라벨 유지 | P1(정정) |
| xr-studio | — | 신규 미디어 추가 | — | — | — | — | **미디어 불필요**(이미 과밀에 가까움) | — |
| **work** | 갤러리 카드 6장 전부 이미지 보유(uc-*.png 등) | 신규 추가 | — | — | — | — | **미디어 불필요**(갤러리 자체가 미디어) | — |
| **about** | 컨트롤룸 실사 + 특허 이미지 3 + 플레이스홀더 특허 + 지도 2 | 신규 추가 | — | — | — | — | **미디어 불필요**(신중 — 이미 풍부) | — |
| careers | ambiance studio.png(실사) + §03 spaces 2 MediaBlank(레거시) | **§03 spaces MediaBlank를 신규 ratio API로 통일** | 4/3 | CG | image | 1→3열 | 기존 "사진 준비 중" 유지 | P2(정정) |

---

## 2. "미디어 불필요"로 둘 섹션 (정보/표/다이어그램 우선)

- **solution §01 Approach / §03 Capability / §04 Proof**: Approach는 4-키워드 카드(정보 그래픽), Capability는 4단계 리스트 카드(파이프라인 텍스트), Proof는 수치 카운터. 모두 텍스트 위계가 더 빠르게 읽힘. 미디어는 노이즈.
- **virtual-production §02 Why / §05 Process**: benefit 4카드·process 4번호카드. 정보 그래픽 자체가 콘텐츠.
- **product 인덱스 §01 Why / §03 Compare / §04 Authorisation**: Why=4스텝 카드, Compare=`CompareTable`(구조화 표), Authorisation=인증서 실사 이미 보유. 추가 미디어 불요.
- **제품 상세 3종의 §Features·§Specifications·§Compare·§FAQ·§Process**: 스펙표(`SpecTable`)·비교표(`CompareTable`)·아코디언·번호 카드가 핵심. 미디어를 넣으면 정보 밀도를 해친다. retracker는 §03 Lineup에 제품 실사도 있어 전 구간 충분.
- **about 전 섹션**: Vision/Mission(타이포 스테이트먼트), Why(카드), Patents(인증·특허 이미지), History(타임라인), Location(지도). 이미 시각 요소가 풍부 → **추가 금지**(과밀·중복 위험). 굳이 보강한다면 추후 실제 오피스/스튜디오 사진이 확보됐을 때 Location 위 1장 정도만 별도 검토.
- **work 갤러리**: 카드마다 이미지가 이미 들어가는 구조 → 추가 미디어 자리 불요. 빈 카테고리는 빈 상태 UI가 이미 처리.
- **careers §02 Culture / §04 Environment / §05 / §06 / §07**: 행동강령·환경 카드·포지션·절차 = 텍스트/번호 그래픽이 적절.

---

## 3. MediaBlank 재사용 전제 · 공통 규칙

### 신규 API 사용 (필수)
- 신규 자리는 반드시 `ratio` prop 사용: `<MediaBlank ratio="16/9" kind="video" label="…" sublabel="…" />`. 이러면 컨테이너 `aspect-ratio` 고정(CLS 0) + 카드 내부 한정 그라데이션 + `role="img"` + `aria-label("{label} — {sublabel} (자산 준비 중)")`가 자동 적용된다.
- **레거시 `className="aspect-video"` + `glyph` 방식은 신규 작업에서 사용 금지.** moverse §01 / xr-studio / careers의 기존 레거시 호출은 신규 `ratio`/`kind` API로 통일(접근성 `role="img"`·aria 라벨 일관성 확보 목적).
  - `glyph="play"` → `kind="video"`, 기본 → `kind="image"`로 매핑. `tag`는 유지 가능(좌상단 모노 태그).

### 공통 정직성 라벨 규칙
- **준비 중 자산**: `sublabel`에 "자산 준비 중" / "사진 준비 중" / "영상 에셋 추가 예정" 등 상태 명시.
- **활용 시나리오 썸네일**(use-case 카드): `label`에 시나리오명, 모서리/태그에 **"활용 시나리오"** 표기 — 실적이 아님을 분명히(DESIGN.md §8). work 페이지의 "활용 시나리오" 카피 톤과 일치시킨다.
- 날조 금지: 파트너 로고·수치·고객사는 자산·허가 확보 전까지 넣지 않는다.

### 반응형
- 모든 미디어 `aspect-ratio`로 비율 고정 → 모바일에서도 동일 비율, CLS 0.
- 풀블리드 영상 밴드는 `container-ex`(padding-inline 1.25rem) 안에서 16/9 유지, 1열.
- use-case 카드 썸네일은 카드 폭 100%·16/10, 모바일 1열에서 세로로 길어지는 것 허용(스캔 가능).

### 접근성 (WCAG)
- 영상 교체 시: `<video muted loop playsInline poster>` + `prefers-reduced-motion: reduce`에서 자동재생 금지(poster만). `aria-label`로 내용 설명.
- 이미지 교체 시: 의미 있는 한국어 `alt` 필수.
- `MediaBlank` 플레이스홀더 단계: `ratio` API가 `role="img"`+aria-label("… 준비 중")을 부여 → 스크린리더가 미완성 상태 인지.
- 라벨 텍스트 색은 `--color-faint #9094A9`(다크 AA) 이상. 그 아래로 내리지 않는다(컴포넌트 기본값 준수).

---

## 4. frontend-builder 구현 지시 요약 (파일경로 + 한 줄씩)

### A그룹 — Solution 인덱스 + VP + Product 인덱스 (신규 미디어 도입, P0~P1)

1. `src/app/solution/page.tsx` — **Hero 아래 신설 §00 풀블리드 영상 밴드**(`section section--ink`, `container-ex` 안 `<MediaBlank ratio="16/9" kind="video" label="EX 통합 XR 파이프라인" sublabel="촬영 → 트래킹 → 렌더 → 송출 · 영상 준비 중" />`). PageHero·기존 섹션 무수정. **[P0]**
2. `src/app/solution/page.tsx` — §02 Two Routes의 EXLINK 대형 카드(`lg:col-span-2`) 상단에 `<MediaBlank ratio="16/9" kind="image" label="EXLINK 통합 제어 콘솔" sublabel="자산 준비 중" />` 부착(카드 내부 최상단, 기존 텍스트 위). **[P2]**
3. `src/app/solution/virtual-production/page.tsx` — §03 Methods의 lead 아래(`mt-12` 그리드 앞)에 풀폭 `<MediaBlank ratio="16/9" kind="video" label="실시간 합성 데모" sublabel="크로마 → 가상 배경 합성 루프 · 영상 준비 중" />`. 기존 §01·§04 실사 2장은 그대로. **[P1]**
4. `src/app/solution/virtual-production/page.tsx` — §06 Use Cases 6카드 각 상단에 `<MediaBlank ratio="16/10" kind="image" label={u.t} sublabel="활용 시나리오" />` 부착, `tag="활용 시나리오"`. 카드 구조: 썸네일 → 기존 h3/p. **[P2]**
5. `src/app/product/page.tsx` — **Hero 아래 신설 §00 풀블리드 비주얼 밴드**(`section section--ink`, `<MediaBlank ratio="16/9" kind="image" label="버추얼 프로덕션 핵심 제품군" sublabel="Aximmetry · Moverse AI · RETracker · 자산 준비 중" />`). §04 인증서·§03 표는 유지. **[P1]**

### B그룹 — 제품 상세 3종 (대부분 정정/선택, P0 정정 + P2)

6. `src/app/product/moverse/page.tsx` — §01 Showcase의 기존 `<MediaBlank tag="CAPTURE PREVIEW" glyph="play" … className="aspect-video">`를 **신규 API로 정정**: `<MediaBlank ratio="16/9" kind="video" tag="CAPTURE PREVIEW" label="캡처 프리뷰 준비 중" sublabel="실측 자료 확보 후 교체 예정" />`(figure/figcaption은 유지). **[P0 정정]**
7. `src/app/product/moverse/page.tsx` — (선택) §06 Use Cases 카드 상단 `<MediaBlank ratio="16/10" kind="image" label={u.t} sublabel="활용 시나리오" />`. **[P2]**
8. `src/app/product/aximmetry/page.tsx` — (선택) §07 Use Cases 카드 상단 `<MediaBlank ratio="16/10" kind="image" label={u.t} sublabel="활용 시나리오" />`. 그 외 섹션은 실사+표로 충분, **추가 금지**. **[P2]**
9. `src/app/product/retracker/page.tsx` — **변경 없음**(실사·제품 사진·표가 가장 풍부, 미디어 불필요).

### C그룹 — Studio + Work + Careers + About (정정/유지)

10. `src/app/xr-studio/page.tsx` — §03 프리셋·§06 영상/갤러리의 기존 레거시 MediaBlank를 신규 `ratio`/`kind` API로 통일(프리셋 `ratio="4/3" kind="image"`, §06 영상 `ratio="16/9" kind="video"`, 갤러리 `ratio="16/9" kind="image"`). 라벨/태그는 기존 유지. **신규 미디어 추가 금지**. **[P1 정정]**
11. `src/app/careers/page.tsx` — §03 Spaces의 비실사 항목 `<MediaBlank … className="aspect-[4/3]">`를 `<MediaBlank ratio="4/3" kind="image" tag={s.label} label={s.caption} sublabel="사진 준비 중" />`로 정정. 실사(studio.png)는 유지. **[P2 정정]**
12. `src/app/work/page.tsx` — **변경 없음**(갤러리 카드가 이미 이미지 보유).
13. `src/app/about/page.tsx` — **변경 없음**(컨트롤룸 실사·특허·지도로 이미 풍부, 과밀 방지). 추후 실 오피스 사진 확보 시 Location 위 1장만 별도 검토.

### 공통
14. 모든 신규/정정 미디어는 신규 `ratio` API 사용(`role="img"`+aria-label 자동). 추후 교체 시 동일 비율 래퍼 유지 → CLS 0.
15. 미디어를 새로 얹는 섹션의 `section--glow`(죽은 클래스)는 frontend-builder 재량으로 함께 제거 가능(범위 밖이나 안전).

---

## 5. 그룹 분할 · 권장 순서

전체 작업량이 작지 않으므로 3그룹 단계 구현 권장:

- **A그룹 (신규 도입, 임팩트 최대 / 먼저)**: solution 인덱스 §00 영상 밴드(P0), product 인덱스 §00 밴드(P1), VP §03 데모 영상(P1). → 페이지에 "비어 보이던 핵심 상단"을 채움. 가장 효과 큼.
- **B그룹 (정정 우선, 일관성)**: moverse §01 레거시→신규 API 정정(P0 정정), xr-studio·careers 레거시 정정(P1·P2 정정). → 접근성·API 일관성 확보. A와 병행 가능(독립).
- **C그룹 (선택 보강, 나중)**: use-case 카드 썸네일들(solution §02 카드 / VP §06 / moverse·aximmetry use-cases), solution §02 EXLINK 카드 썸네일. 전부 P2 — 자산 윤곽이 잡힌 뒤 일괄 진행. 과하면 생략 가능.

**권장 우선순위 정렬**: P0(solution §00 영상, product moverse §01 정정) → P1(product §00, VP §03, xr-studio/careers 정정) → P2(use-case 썸네일 일괄).
