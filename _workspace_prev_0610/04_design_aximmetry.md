# Aximmetry 제품 페이지 미디어·레이아웃 재구성 설계 — design-ux-reviewer

대상: `src/app/product/aximmetry/page.tsx` (상단 trust strip + §01~§10)
참고 구현: `src/app/solution/xr-solution/page.tsx`(미디어 배치 완료본), `src/components/ui/MediaBlank.tsx`(`ratio`/`kind`/`label`/`sublabel` + **신규 `src`/`alt`** — src 지정 시 실제 이미지를 `object-cover`로 채우고 하단 라벨 캡션)
기준: `DESIGN.md §0(다크)`·§4(card/button)·§5(layout)·§7(motion)·§8(정직성·NO box glow)·§9(responsive), `_workspace/01_design_review.md`(XR Solution 5원칙)
**구현은 frontend-builder. 이 문서는 설계안만.**

---

## 0. 핵심 판단 (요약)

- **현재 상태**: 이 페이지는 이미 실제 에셋 2장(§01 `aximmetry-hero.png` 쇼케이스, §10 `cert-aximmetry.png` 인증서)을 쓰고 있다. 본문 중반(§02 Why ~ §09 FAQ)은 **카드/표 텍스트만** 8연속 — 정보는 충실하나 **시각 리듬이 길게 평평**하다. XR Solution처럼 임팩트 지점에 미디어를 **선별 주입**해 스캔성과 신뢰감을 높인다.
- **선별 배치(5원칙 ①)**: 10개 섹션 전부에 미디어를 넣지 않는다. 임팩트 큰 **5곳**(§01 쇼케이스[유지·강화]·§02 Why·§04 Features·§07 Use Cases·§10 인증[유지])에 집중. §03 Editions·§05 Compare·§06 Specs·§08 Process·§09 FAQ는 **미디어 불필요**(표·번호·아코디언 자체가 콘텐츠).
- **죽은 클래스 정리(5원칙 ②)**: §02·§10에 붙은 `section--glow`는 globals.css에서 시각 효과가 제거된 무력 클래스(단색 배경 정책 위배는 아님). **정직성·정리 차원에서 제거 권장**(XR Solution 페이지도 동일 메모 보유). 별도 정리 항목으로 분리.
- **단색 배경 정책 유지(5원칙 ②)**: 섹션 배경에 글로우/그라데이션 신설 금지. 브랜드 톤 그라데이션은 `MediaBlank` placeholder **카드 내부 한정**으로만 존재(섹션 배경 아님). 실제 이미지 슬롯은 `MediaBlank src=` 또는 `next/image`로 채움.
- **정직성(5원칙 ④)**: Aximmetry는 **파트너 제품**(EX 자체 제작 아님), EX는 **공식 인증 리셀러**. 가짜 고객사·실적·로고 금지. Use Cases 미디어는 **"활용 시나리오"** 라벨 명시. 인증서(§10)는 실제 자산이므로 그대로 신뢰 근거.
- **CLS 0(5원칙 ③)**: 모든 신규 미디어는 `MediaBlank ratio=` 또는 `aspect-ratio` 고정 래퍼로 비율 고정. 추후 교체(5원칙 ⑤)는 동일 비율 래퍼 유지 → 레이아웃 흔들림 0.

---

## 1. 재구성된 섹션 구조 (순서·배경 톤 교차·역할)

배경 톤은 `section--ink`(base #0E0626) ↔ `section--surface`(raised #14112C) ↔ `section--white`(다크 리맵) 3톤 교차 리듬을 유지한다. **순서는 정보 흐름상 타당하므로 대규모 재배치는 하지 않되, 두 가지만 조정**:

### 1-A. 순서 변경 제안
1. **§04 Features ↔ §05 Compare 인접 유지하되, §03 Editions → §05 Compare를 연속**시킨다(현재도 §03→§04→§05). **권고: §04 Features를 §05 Compare 뒤로 이동**해 `Editions(개요) → Compare(에디션 표) → Features(기능 심화)` 흐름으로 정렬. 근거: 사용자는 "어떤 에디션?"을 먼저 정하고(03·05), 그다음 "무슨 기능?"(04)을 본다. 에디션 의사결정 블록을 끊지 않는다.
   - **단, 리스크 최소화 우선이면 순서 유지 가능**(현 03→04→05도 자연스러움). 이 이동은 **선택(Med)** — frontend-builder가 카피/앵커 영향 점검 후 결정.
2. 나머지(§06 Specs → §07 Use Cases → §08 Process → §09 FAQ → §10)는 **현행 유지**. 신뢰(스펙)→상상(활용)→행동(절차)→해소(FAQ)→권위(인증·CTA)로 깔끔.

### 1-B. 섹션별 역할 + 배경 톤 (재구성 결과)

| # | 섹션 | 배경 톤 | 역할 | 미디어 |
|---|------|--------|------|--------|
| — | Trust strip (quickSpec bar) | surface | 4대 수치 즉시 인지(8K/Node/Unlimited/Unreal) | X (수치 타이포) |
| §01 | Showcase | **ink** | **첫 임팩트** — 실제 합성 결과로 "무엇을 만드는가" 즉시 증명 | **O(유지·강화)** |
| §02 | Why Aximmetry | **surface** | 3대 차별점(UE5·노드엔진·라이선스) | **O(노드 엔진 1장 추가)** |
| §03 | Editions | **white** | 3에디션 선택 가이드 | X |
| §05 | Compare | **ink** | 에디션 매트릭스 표 | X |
| §04 | Features | **surface** | 7대 기능 심화 | **O(크로마키/노드 시각 1~2장)** |
| §06 | Specifications | **white** | B&F 풀스펙 표 | X |
| §07 | Use Cases | **ink** | 5대 활용 시나리오 | **O(시나리오 썸네일 — 일부)** |
| §08 | Process | **surface** | 도입 4단계 | X |
| §09 | FAQ | **white** | 도입 전 Q&A 아코디언 | X |
| §10 | EX × Aximmetry | **ink** | EX 공식 리셀러 권위 + 인증서 + CTA | **O(인증서 유지)** |

> 톤 교차 주의: §04↔§05 순서 이동 시 `surface/ink/white`가 끊기지 않게 **§05 Compare=ink, §04 Features=surface**로 배정(위 표 반영). frontend-builder는 이동 시 인접 섹션 톤이 같아지지 않도록 클래스만 맞바꾸면 됨.

---

## 2. 섹션별 미디어 표

| 섹션 | 미디어? | 실제에셋 / placeholder | 비율 | 배치 | kind | 모바일 | 라벨/캡션 의도 |
|------|--------|----------------------|------|------|------|--------|---------------|
| Trust strip | **X** | — | — | 수치 4그리드 유지 | — | 2→4열 | — |
| **§01 Showcase** | **O (유지)** | 실제 `aximmetry-hero.png` | 1140×641 (≈16/9) | 중앙 `max-w-4xl` figure(현행) | image | 1열, 비율 유지 | "실시간 크로마키 합성 — Beauty & Joy 가상 세트"(현행 캡션 유지) |
| **§02 Why** | **O (추가)** | 실제 `vp-workflow.png` | 16/9 | **3 차별점 카드 위 풀폭 1장**(lead 아래, 카드 그리드 앞) | image | 1열, 16/9 | "노드 기반 자체 엔진 — 실제 그래프 편집 화면". 노드 엔진 주장(추상)에 **실물 근거** |
| §03 Editions | **X** | — | — | 3카드 유지 | — | 1열 | — |
| §05 Compare | **X** | — | — | `CompareTable` 유지 | — | 표 가로스크롤 | — |
| **§04 Features** | **O (추가)** | 실제 `vp-chroma.png` | 16/9 | **7기능 그리드 위 풀폭 1장** 또는 좌우 2단(텍스트+이미지) | image | 1열, 16/9 | "방송급 자체 크로마키 — 실시간 합성 현장". 핵심 기능(크로마키·실시간)을 시각화 |
| §06 Specs | **X** | — | — | `SpecTable` 유지 | — | 표 세로 | — |
| **§07 Use Cases** | **O (부분)** | 실제 `aximmetry-vp.jpg`(1장만, "방송 가상 스튜디오"/"XR" 카드) + 나머지 4 카드는 **placeholder** | 16/10 | **카드 상단 썸네일** | image | 1→2→3열, 16/10 | 각 카드 상단 16/10 + 모서리 **"활용 시나리오"** 정직성 라벨(실적 아님) |
| §08 Process | **X** | — | — | 4 step 카드 유지 | — | 1→2→4열 | — |
| §09 FAQ | **X** | — | — | 아코디언 유지 | — | 1열 | — |
| **§10 EX × Aximmetry** | **O (유지)** | 실제 `cert-aximmetry.png` | 957×677 (≈4/3) | 좌텍스트 / 우인증서 2단(현행) | image | 1열 스택 | "Aximmetry Authorization Certificate — EX Corporation"(현행 유지) |

### 배치 근거 보충
- **§02·§04에 실물 1장씩** = 이 페이지에서 가장 "말로만 설득 중"인 두 구간(노드 엔진·크로마키)에 증거를 박는다. 과밀 회피를 위해 **각 1장**, 카드 그리드는 그대로.
- **§07만 카드형 썸네일** = XR Solution §08 패턴과 동일. 단 **실제 시나리오 사진이 1장(`aximmetry-vp.jpg`)뿐**이라 나머지는 placeholder로 자리만 잡고 "활용 시나리오" 라벨로 정직성 확보. 추후 교체.
- **§03/§05/§06/§08/§09는 미디어 노이즈** — 표·번호·아코디언이 더 빠르게 읽힌다. XR Solution과 동일 판단(§04/§07 미디어 불필요 확정 패턴).

---

## 3. 가용 에셋 → 슬롯 매핑

| 에셋 (public/) | 무엇 | 배치 슬롯 | 비고 |
|----------------|------|----------|------|
| `aximmetry-hero.png` | 크로마키→가상세트 합성(Beauty & Joy) | **§01 Showcase** (이미 사용 중) | 변경 없음 |
| `vp-workflow.png` | Aximmetry 노드 기반 에디터 실화면 | **§02 Why** 신규 (노드 엔진 근거) | **신규 투입.** XR Solution §01에서도 쓰지만 별개 페이지라 중복 무방 |
| `vp-chroma.png` | 크로마키 촬영 현장 + 합성 모니터 | **§04 Features** 신규 (크로마키 근거) | **신규 투입** |
| `aximmetry-vp.jpg` | 그린스크린 스튜디오 인물(VP 촬영) | **§07 Use Cases** "방송 가상 스튜디오" or "XR" 카드 썸네일 1장 | **신규 투입.** 1장만 실사, 나머지 placeholder |
| `cert-aximmetry.png` | 공식 리셀러 인증서 | **§10 EX × Aximmetry** (이미 사용 중) | 변경 없음. 정직성 핵심 근거 |
| `vp-set.png` | 그린스크린 스튜디오(촬영 준비) | **예비** — §07 두 번째 시나리오 썸네일로 선택 투입 가능 | 인물 유사 → §07에서 `aximmetry-vp.jpg`와 톤 중복 주의. 1장만 쓰면 `aximmetry-vp.jpg` 우선 |
| `exlink-control-room.jpg` | EXLINK 컨트롤룸·스튜디오 그리드 | **사용 안 함(이 페이지)** | EXLINK(EX 자체 솔루션) 자산 → Aximmetry 제품 페이지에 쓰면 제품/솔루션 경계 흐림. XR Solution용 |
| `exlink-vp-core.png` | EXLINK 통합 아이소메트릭 다이어그램 | **사용 안 함(이 페이지)** | EXLINK 전용. XR Solution §03에 이미 사용 |

### placeholder 필요 슬롯 (실제 에셋 없음)
- **§07 Use Cases — 5 카드 중 4 카드 썸네일**(뉴스/AR/라이브 등): `MediaBlank ratio="16/10" kind="image"` + 모서리 `"활용 시나리오"` 라벨. "방송 가상 스튜디오"(또는 "XR") 1 카드만 `src="/aximmetry-vp.jpg"`로 실사.
  - 대안: 실사 1장으로 카드 간 시각 불균형이 거슬리면 **§07 전체를 텍스트 카드 유지**(현행)하고, 실사 1장은 §07 헤더 아래 **풀폭 1장**으로 빼는 안도 가능(과밀·불균형 회피). frontend-builder 판단(아래 지시 참조).

---

## 4. 정직성·반응형·접근성·단색배경 주의

### 정직성 (DESIGN.md §8 / 5원칙 ④)
- Aximmetry = 파트너 제품, EX = **공식 인증 리셀러**. 본문 카피(현행)는 이미 정합("Aximmetry 제품 사양", "EX는 공식 인증 리셀러"). **미디어 캡션도 이 톤 유지** — 제품 화면/촬영 사진은 "Aximmetry"로 귀속, EX 귀속 자산은 인증서뿐.
- §07 미디어는 **반드시 "활용 시나리오"** 라벨(실적·고객사 아님). `MediaBlank tag="활용 시나리오"` 또는 캡션.
- 가짜 로고/고객사/수치 금지. quickSpec 4수치(8K/Unlimited 등)는 제품 사양이므로 OK.

### 반응형 (DESIGN.md §9 / 양 모드)
- 모든 신규 미디어 `aspect-ratio` 고정 → 모바일 16/9·16/10 유지, CLS 0. `MediaBlank src=`는 내부에서 `object-cover absolute inset-0`로 처리됨.
- §04를 좌우 2단으로 갈 경우: 데스크톱 `lg:grid-cols-2`, 모바일 세로 스택(이미지→텍스트 or 텍스트→이미지). XR Solution §01 패턴 차용.
- §07 카드 그리드 `sm:grid-cols-2 lg:grid-cols-3` 유지. 썸네일은 카드폭 100%.
- §10 좌우 2단은 현행 `lg:grid-cols-2` 유지(모바일 1열 스택).
- `container-ex`(padding-inline 1.25rem) 안에서 풀폭 미디어 좌우 여백 처리.

### 접근성 (WCAG)
- 실제 이미지: **의미 있는 한국어 `alt` 필수**. §02 "Aximmetry 노드 기반 그래픽 편집 화면", §04 "크로마키 촬영을 실시간 합성하는 버추얼 프로덕션 현장", §07 "그린스크린 가상 스튜디오 촬영 예시".
- placeholder(`MediaBlank` ratio·src 없음): 내부에서 `role="img"` + `aria-label="… (자산 준비 중)"` 자동 부여됨(컴포넌트 기제공). 추가 작업 불필요.
- 캡션/라벨 색 ≥ `--color-faint`(다크 AA). `MediaBlank` src 캡션은 흑색 스크림 위 흰 텍스트라 대비 안전.
- 카드 hover/focus 현행 유지. 미디어에 링크 어포던스 부여 금지(href 없는 카드).

### 단색 배경 정책 (5원칙 ②)
- 섹션 배경에 글로우/그라데이션 신설 **금지**. `MediaBlank` placeholder 내부 미세 그라데이션은 카드 내부 한정(정책 무관, 기존 컴포넌트 기제공).
- **§02·§10 `section--glow` 무력 클래스 제거** 권장(별도 정리 항목, 시각 변화 없음).

---

## 5. frontend-builder 구현 지시 요약

**파일**: `src/app/product/aximmetry/page.tsx` (단일 파일), 컴포넌트 `@/components/ui/MediaBlank`(import 추가).

우선순위: **High = 본문 시각 리듬 핵심(§02·§04), Med = §07·순서이동·glow 정리, Low = §07 placeholder 정교화.**

| # | 우선순위 | 섹션 | 한 줄 지시 |
|---|---------|------|-----------|
| 1 | **High** | §02 Why | lead 아래·`whyPoints` 카드 그리드 **앞**에 `<MediaBlank ratio="16/9" kind="image" src="/vp-workflow.png" tag="AXIMMETRY NODE EDITOR" label="노드 기반 자체 엔진 — 실제 그래프 편집 화면" className="w-full mt-12" />` 1장. (카드 그리드 `mt-12`는 이미지로 이동) alt는 src 캡션이 대체. |
| 2 | **High** | §04 Features | `SectionLabel`/`h2` 아래·`features` 그리드 **앞**에 `<MediaBlank ratio="16/9" kind="image" src="/vp-chroma.png" tag="REAL-TIME CHROMA KEY" label="방송급 자체 크로마키 — 실시간 합성 현장" className="w-full mt-12" />` 1장. (좌우 2단은 선택; 풀폭 1장이 더 안전) |
| 3 | **Med** | §07 Use Cases | useCases 카드 **상단에 16/10 썸네일** 부착. 첫 카드(또는 "방송 가상 스튜디오")만 `src="/aximmetry-vp.jpg"`, 나머지는 src 없이 `<MediaBlank ratio="16/10" kind="image" tag="활용 시나리오" label={u.t} />`. **대안 채택 시**: 카드 썸네일 대신 헤더 아래 풀폭 `aximmetry-vp.jpg` 1장 + 카드는 현행 텍스트 유지(불균형 회피). 둘 중 택1, 불균형 우려 시 대안 권장. |
| 4 | **Med** | 순서 | **§04 Features를 §05 Compare 뒤로 이동**(Editions→Compare→Features). 이동 시 배경 톤 재배정: §05 Compare=`section--ink`, §04 Features=`section--surface`(인접 톤 충돌 방지). 카피·앵커 영향 없으면 적용, 있으면 현행 유지. |
| 5 | **Med** | 정리 | §02·§10 `className`에서 **`section--glow` 제거**(무력 클래스, 시각 변화 0). |
| 6 | **Low** | §07 | placeholder 4장 `tag="활용 시나리오"` 일관 적용 + 실사 1장과 톤 균형 확인. 필요 시 `vp-set.png`를 두 번째 실사로 보강. |
| — | — | 공통 | 실제 이미지 `MediaBlank src=`는 내부 `object-cover`+비율 고정이라 CLS 0. 모든 미디어 `Reveal` 입장은 기존 페이지 패턴 따름(현재 이 페이지는 Reveal 미사용 — 추가 여부는 frontend-builder 판단, 비율 고정만 필수). §01·§10은 **변경 없음**. |

---

## 재구성 핵심 (요약)

- **섹션 구조 변화**: 10개 섹션 골격 유지 + **§04 Features를 §05 Compare 뒤로 이동**(에디션 결정 흐름 보존, Med 선택). 배경 톤 ink/surface/white 3톤 교차 리듬 재배정. §02·§10 무력 `section--glow` 제거.
- **미디어 배치(선별 5곳)**: 기존 §01 쇼케이스·§10 인증서 **유지**, **§02 노드 엔진·§04 크로마키에 실물 1장씩 신규 주입**(가장 "말로만 설득 중"인 구간 보강), **§07 활용 시나리오 썸네일**(실사 1 + placeholder, "활용 시나리오" 정직성 라벨). §03/§05/§06/§08/§09는 미디어 불필요(표·번호·아코디언).
- **에셋 매핑**: `aximmetry-hero→§01`, `vp-workflow→§02`, `vp-chroma→§04`, `aximmetry-vp(+예비 vp-set)→§07`, `cert-aximmetry→§10`. **EXLINK 자산(`exlink-vp-core`/`exlink-control-room`)은 제품/솔루션 경계 보호 위해 미사용**. §07 4슬롯은 placeholder.
- **원칙 준수**: 선별 배치(과밀 회피)·단색 배경(글로우 신설 금지, glow 정리)·CLS 0(비율 고정)·정직성(파트너 제품/리셀러, 활용=시나리오)·추후 교체(동일 비율 래퍼) 5원칙 충족.
