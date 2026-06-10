# 07. 섹션 헤더 정렬 검토 — 좌측 vs 중앙 일관화

검토자: design-ux-reviewer · 날짜: 2026-06-05
대상: 내부 페이지 섹션 헤더(SectionLabel + h2 + lead)의 정렬 방향
구현: frontend-builder (이 문서는 검토·설계만, 코드 수정 없음)

---

## 0. 핵심 발견

**불일치**: 메인(`HomeClean.tsx`)은 풀폭 섹션 헤더에 `SectionHead ... center`(text-center + h2/lead `marginInline:auto`)를 쓴다(§01 WHAT WE DO, §03 PARTNER PRODUCTS는 narrow만). 반면 **내부 페이지의 거의 모든 섹션 헤더는 좌측 정렬**이다. `about`만 예외적으로 이미 전 섹션 `Reveal className="text-center"` + `marginInline:auto`로 **중앙 정렬**을 적용 중.

**정렬 판단의 핵심 축은 "헤더가 어디에 놓이는가"다:**
- **풀폭 헤더(헤더 아래로 중앙대칭 그리드/표/카드/타임라인이 펼쳐짐)** → 중앙 정렬이 시각적 균형·메인 통일감에 유리. **권장 C.**
- **좌우 2단(`grid items-center gap-12 lg:grid-cols-2`)의 좌측 칼럼에 박힌 헤더** → 옆 미디어와 짝을 이루는 구조라 중앙정렬 불가. **권장 L 고정.**
- **본문 자체(표·다이어그램·2단 비교·카드 설명문·리스트·긴 산문)** → 중앙정렬 가독성 저해. **항상 L 유지**(정렬 변경은 헤더 한정).

`SectionLabel`(`.seclabel`)은 `display:inline-flex`라 부모 `text-center` 안에서 자동으로 중앙에 오므로 **컴포넌트 변경 불필요**. `.h2`/`.lead`는 블록이라 `text-center` + `marginInline:auto`(+ lead의 `maxWidth` 유지)면 중앙화됨 — 메인 `SectionHead`가 이미 쓰는 그 방식 그대로.

---

## 1. 현황 표 (페이지 | 섹션 | 현재 헤더 정렬 | 본문 유형 | 권장 | 사유)

| 페이지 | 섹션 | 현재 | 본문 유형 | 권장 | 사유 |
|---|---|---|---|---|---|
| **(레퍼런스) Home** | §01 WHAT, §03 PARTNER | **C** | 대칭 3카드 / bento | C | 기준점 — 유지 |
| **(레퍼런스) PageHero** | 모든 페이지 상단 H1 | **C** | — | C | 이미 중앙 — 기준점 |
| solution/page | 01 Approach | L | 헤더만(이어서 다음 섹션) | **C** | 풀폭 헤더, 후속 중앙대칭 |
| solution/page | 02 Two Routes | L | 비대칭 카드(col-span-2) | **C(헤더)** | 헤더 C, 카드 본문 L 유지 |
| solution/page | 03 Capability | L | 풀폭 이미지 카드 | **C** | 풀폭 헤더 + 중앙 미디어 |
| solution/page | 04 (stats) | text-center | 4-stat 그리드 | C(현행) | 이미 중앙 — 유지 |
| solution/virtual-production | 01 What is VP | L (2단 좌칼럼) | 좌우 2단 + 미디어 | **L 고정** | 2단 인트로 — 옆 미디어와 짝 |
| solution/virtual-production | 02 Why VP | L | 풀폭(카드 그리드) | **C** | 풀폭 헤더 |
| solution/virtual-production | 03 Methods | L | 3카드 그리드 | **C** | 풀폭 헤더 + 대칭 그리드 |
| solution/virtual-production | 04 EX VP | L (2단 좌칼럼) | 좌우 2단 + 리스트 | **L 고정** | 2단 인트로 |
| solution/virtual-production | 05 Process | L | 4-step 그리드 | **C** | 풀폭 헤더 |
| solution/virtual-production | 06 Use Cases | L | 3카드 그리드 | **C** | 풀폭 헤더 |
| product/page | 01 Why EX | L | 풀폭 카드 | **C** | 풀폭 헤더 |
| product/page | 02 Lineup | L | 풀폭 리스트(행 테이블) | **C(헤더)** | 헤더 C, 리스트 행 L 유지 |
| product/page | 03 Compare | L | CompareTable(표) | **C(헤더)** | 헤더 C, 표 L 유지 |
| product/page | 04 Authorisation | L | 헤더 + 본문 | **C** | 풀폭 헤더 |
| product/aximmetry | (stats band) | text-center | 4-stat | C(현행) | 유지 |
| product/aximmetry | 01 Showcase | L | 중앙 figure(caption center) | **C** | 풀폭 헤더 + 중앙 미디어 |
| product/aximmetry | 02 Why | L | 카드 그리드 | **C** | 풀폭 헤더 |
| product/aximmetry | 03 Edition | L | 카드 그리드 | **C** | 풀폭 헤더 |
| product/aximmetry | 04 Features | L | 4카드 그리드 | **C** | 풀폭 헤더 |
| product/aximmetry | 05 Specifications | L | SpecTable(표) | **C(헤더)** | 헤더 C, 표 L 유지 |
| product/aximmetry | 06 Process | L | 4-step 그리드 | **C** | 풀폭 헤더 |
| product/aximmetry | 07 FAQ | L | 아코디언 리스트 | **C(헤더)** | 헤더 C, FAQ 본문 L 유지 |
| product/aximmetry | 08 EX × Aximmetry | L (2단 좌칼럼) | 좌우 2단 + 미디어 | **L 고정** | 2단 인트로 |
| product/moverse | 01~08 (동일 패턴) | L | showcase/카드/표/step/FAQ | **C(헤더)** | aximmetry와 동일 규칙 |
| product/moverse | 09 EX × Moverse | L (2단 좌칼럼) | 좌우 2단 | **L 고정** | 2단 인트로 |
| product/retracker | 01~08 (동일 패턴) | L | showcase/카드/표/step/FAQ | **C(헤더)** | aximmetry와 동일 규칙 |
| product/retracker | 09 EX × RETracker | L (2단 좌칼럼) | 좌우 2단 | **L 고정** | 2단 인트로 |
| xr-studio | 01 Why | L | 풀폭 | **C** | 풀폭 헤더 |
| xr-studio | 02 Content Menu | L | 카드 그리드 | **C** | 풀폭 헤더 |
| xr-studio | 03 Backgrounds | L | 그리드 | **C** | 풀폭 헤더 |
| xr-studio | 04 Options | L | 그리드 | **C** | 풀폭 헤더 |
| xr-studio | 05 Guide | L | 번호 리스트(산문) | **C(헤더)** | 헤더 C, 리스트 L 유지 |
| xr-studio | 06 Studio (facilities) | L | 시설 정보/미디어 | **C(헤더)** | 헤더 C, 본문 L |
| xr-studio | (CTA card) | text-center | 카드 | C(현행) | 유지 |
| about | 01~05 | **C(현행)** | vision/카드/cert/타임라인/지도 | C | 이미 중앙 — 기준 유지 |
| careers | 01 Our Values | L | 풀폭 | **C** | 풀폭 헤더 |
| careers | 02 Culture | L | 카드 그리드 | **C** | 풀폭 헤더 |
| careers | 03 Spaces | L | 그리드 | **C** | 풀폭 헤더 |
| careers | 04 Environment | L | 그리드 | **C** | 풀폭 헤더 |
| careers | 05 Who We Want | L | 체크 리스트(산문) | **C(헤더)** | 헤더 C, 리스트 L 유지 |
| careers | 06 Open Positions | L | 포지션 리스트 | **C(헤더)** | 헤더 C, 리스트 L 유지 |
| careers | 07 How to Apply | L | step | **C** | 풀폭 헤더 |
| support | 01 FAQ | L | 아코디언 | **C(헤더)** | 헤더 C, FAQ 본문 L |
| support | 02 Technical Support | L (2단 좌칼럼) | 좌우 2단 | **L 고정** | 2단 인트로 |
| support | 03 Downloads | L | 다운로드 카드/리스트 | **C(헤더)** | 헤더 C, 리스트 L |
| support | 04 Quick Inquiry | L | 폼(좌측 라벨·필드) | **L 고정** | 폼은 좌측이 입력 가독에 유리 |
| news | 01 Archive | L | 기사 리스트/그리드 | **C(헤더)** | 헤더 C, 리스트 L 유지 |
| work | (WorkGallery) | — | 필터 + 갤러리 | **L 고정** | 필터 칩·그리드 본문 — 좌측 유지(별도) |

> work는 `WorkGallery.tsx`(필터 갤러리)라 SectionLabel 헤더 패턴이 아님 — 본 정렬 규칙 대상 아님. 필터·그리드는 좌측 유지.

---

## 2. 일관 규칙 제안 (확정안)

**규칙 R1 — 풀폭 섹션 헤더 = 중앙 정렬.**
`container-ex` 직속이며 헤더 아래로 그리드/표/카드/타임라인이 펼쳐지는 모든 섹션의 헤더(SectionLabel + h2 + lead)는 **중앙 정렬**한다. 메인 `SectionHead center`와 동일 처리.

**규칙 R2 — 본문은 항상 좌측 유지.**
표(SpecTable/CompareTable), 다이어그램/파이프라인, 카드 설명문, 리스트(번호·체크), FAQ 아코디언, 긴 산문은 정렬을 바꾸지 않는다. **R1은 헤더 3요소에만 적용**, 본문 영역은 손대지 않는다.

**규칙 R3 — 예외(L 고정).** 다음은 좌측 유지:
1. **좌우 2단 인트로** `grid items-center gap-12 lg:grid-cols-2`의 좌측 칼럼 헤더 — 옆 미디어와 짝을 이루는 비대칭 구조라 중앙화하면 균형이 깨짐.
   - virtual-production §01 What is VP, §04 EX VP
   - product/{aximmetry,moverse,retracker} 마지막 "EX × {제품}" 섹션
   - support §02 Technical Support
2. **폼 섹션**(support §04 Quick Inquiry) — 입력 라벨·필드는 좌측 정렬이 스캔·입력에 유리.
3. **work**(필터 갤러리) — 필터 칩·그리드는 좌측 유지.
4. 이미 적절히 중앙인 곳(about 전 섹션, 각 product stats band, xr-studio CTA card, PageHero) — **현행 유지**.

**일관 한 줄 요약:** *전 페이지 풀폭 섹션 헤더 = 중앙 정렬, 본문(표·그리드·2단·리스트·폼)은 좌측 유지. 좌우 2단 인트로 헤더·폼·work는 예외로 좌측 고정.*

---

## 3. frontend-builder 구현 지시 (한 줄씩)

- SectionLabel은 변경 불필요 — `.seclabel`이 `display:inline-flex`라 부모 `text-center`에서 자동 중앙 정렬됨.
- 메인이 쓰는 방식 그대로 적용: 헤더를 감싼 `container-ex`(또는 헤더 묶음 `div`/`Reveal`)에 `text-center` 추가.
- `<h2 className="h2">`에 `marginInline:"auto"` 추가(maxWidth가 있으면 유지, 없으면 그대로). `.h2`는 이미 `text-wrap:balance`라 중앙에서 줄 균형 자동.
- `<p className="lead">`에 `marginInline:"auto"` 추가하고 기존 `maxWidth`(36~44rem)는 유지 — 그대로 중앙 정렬 블록이 됨.
- `style={{ marginTop: 22 }}` 등 기존 인라인 스타일은 보존하고 `marginInline:"auto"`만 병합.
- 헤더 바로 뒤 본문 컨테이너(`grid`, `card`, `CompareTable`, `SpecTable`, `ol`, FAQ 등)에는 **아무 정렬 클래스도 추가하지 말 것** — 본문은 좌측 유지.
- 메인 `SectionHead`처럼 재사용 헬퍼를 둘 거면 `center` prop 패턴을 그대로 따르되, 본 작업 범위는 정렬만이므로 기존 페이지 구조 변경은 최소화.
- R3 예외(2단 좌칼럼 헤더·support 폼·work)는 **건드리지 말 것** — 좌측 유지.
- about·각 stats band·xr-studio CTA·PageHero는 이미 중앙이므로 **수정 금지**.

---

## 4. 반응형 · 접근성 · 과밀 주의

- **모바일(360~390px)**: 중앙 정렬 h2는 어절 단위(`word-break:keep-all` 전역)로 줄바꿈되며 `text-wrap:balance`로 균형 잡힘 — 문제 없음. 단 **lead가 모바일에서 2~3줄 이상 길어질 때 중앙정렬은 가독성이 떨어짐**. lead가 모바일 3줄을 초과하는 섹션은 `sm:` 이상에서만 중앙(`text-left sm:text-center`)으로 다운그레이드 검토 — 우선 데스크톱 중앙 적용 후 qa-verifier 375px 스크린샷으로 확인.
- **수동 `<br className="hidden sm:block">`**: 중앙정렬 시 데스크톱에서만 줄바꿈되므로 그대로 호환. 모바일은 자동 줄바꿈. 신규 `<br>` 추가 금지(스킬 §2 규칙).
- **접근성**: 정렬은 시각 표현만 바꾸므로 의미·DOM 순서·포커스 영향 없음. `text-align:center`가 스크린리더·탭 순서에 영향 주지 않음. 대비·포커스 링 변화 없음.
- **과밀 주의**: lead `maxWidth`(40~44rem)를 반드시 유지할 것. 제거하면 중앙정렬 본문이 풀폭으로 퍼져 한 줄이 너무 길어짐(가독 저하). 중앙정렬은 *짧은 헤더 텍스트*에만 어울리므로 lead가 4줄 이상인 섹션은 좌측 유지 후보로 재검토.
- **2단 인트로를 실수로 중앙화하지 말 것**: `lg:grid-cols-2` 안의 텍스트 칼럼을 중앙정렬하면 옆 미디어와 시각 축이 어긋나 균형이 가장 크게 깨지는 케이스다.
