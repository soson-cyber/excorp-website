# DESIGN.md

> EX Corporation — 화이트 크리에이티브-테크 스타트업 톤. 단 하나의 퍼플로 절제하되, 실시간 XR의 기술감을 깨끗한 다이어그램·동심원 오로라로 보여준다. **기술의 연결로 경험을 확장하다.**

> 단일 기준(Source of Truth). 코드(`src/app/globals.css` `@theme`/`:root` + 컴포넌트)와 이 문서가 어긋나면 **이 문서를 기준**으로 맞춘다.
> KAOPU-XiaoPu/web-design 스킬의 9-섹션 템플릿을 현 사이트에서 역추출·정합한 정식본. 최종 갱신: 2026-05 (UI/UX 프로 점검 + 스킬 정합 반영).

---

## 1. Visual Theme & Atmosphere

**Style**: Clean Creative-Tech Startup (라이트) + Dark Aurora Hero (Highnote식)
**Keywords**: 실시간 · 정밀 · 연결 · 절제 · 기술감 · 신뢰 · 확장
**Tone**: 깨끗하고 차분한 기술 신뢰감 — NOT 아트적·컬러풀·요란함·네온 글로우
**Feel**: "백색 갤러리에 놓인 정밀 광학 장비" — 여백은 넓게, 강조는 드물게, 빛은 배경(오로라)에만.

**Interaction Tier**: **L2–L3 혼합** — 사이트 본문 L2(스크롤 reveal·패럴럭스·내비 전환), Home 히어로 L3(포인터 반응 오로라·커스텀 커서).
**Dependencies**: CSS + IntersectionObserver(자체 `Reveal`) + 원시 three.js(레거시, 현재 히어로는 DOM/CSS). **GSAP/Lenis 미사용**(원시 rAF로 처리, 성능·번들 절감).

---

## 2. Color Palette & Roles

> 코드의 실제 토큰명을 그대로 사용(globals.css `@theme`). RGB 보조값은 `rgba()`용.

```css
:root {
  /* Backgrounds */
  --color-bg: #ffffff;            /* 페이지 배경 */
  --color-surface: #f7f8fa;       /* 카드 / 교차 section (paper) */
  --color-surface-2: #eef0f5;     /* 한 단계 진한 면 / hover 표면 */
  --ex-pale: #f2f4f7;             /* 플레이스홀더 채움 */

  /* Borders */
  --color-border: #e5e7eb;        /* 기본 헤어라인 */
  /* border-hover = --color-primary @ 50% (rgba) */

  /* Text */
  --color-fg: #0f1129;            /* 제목·주요 텍스트 (잉크) */
  --color-muted: #51545e;         /* 본문·보조 — AA on white */
  --color-faint: #5f636d;         /* 캡션·최소강조 — AA on white·surface·surface-2 */

  /* Accent (브랜드 퍼플 — 유일한 상시 강조색) */
  --color-primary: #5e2ec0;
  --color-primary-hover: #4a23a0;
  --color-primary-soft: rgba(94, 46, 192, 0.1);

  /* Action (브랜드 핑크 — 최고 전환 CTA에만 절제) */
  --color-accent: #d206ee;
  --color-accent-soft: rgba(210, 6, 238, 0.1);

  /* Point (브랜드 민트 — 다크/그라데이션 표면에서만, 텍스트 금지) */
  --color-mint: #45f1e0;
  --color-deep-purple: #310a9e;

  /* Dark surfaces */
  --ex-hero: #0e0626;             /* Home 히어로 베이스 */
  --ex-mesh: #2a0e63;             /* gradient-ex-mesh 베이스 */
  --ex-footer: #0f1129;           /* Footer 앵커 */

  /* Semantic (흰 배경 AA 튜닝) */
  --color-success: #16a34a;
  --color-error: #dc2626;
  --color-warning: #b45309;
  --color-live: #e11d48;

  /* RGB variants for rgba() */
  --color-primary-rgb: 94, 46, 192;
  --color-accent-rgb: 210, 6, 238;
  --color-mint-rgb: 69, 241, 224;
  --color-fg-rgb: 15, 17, 41;
  --ex-hero-rgb: 14, 6, 38;
}
```

**Color Rules:**
- **퍼플은 유일한 상시 강조색.** 핑크는 Action(최고전환 CTA)에만, 민트는 다크/메시 표면에서만(흰 배경 텍스트 금지 — 대비 ≈1.2:1).
- 한 section 안에서 강조색은 하나만. 정보 위계는 텍스트 3단(`fg`→`muted`→`faint`)으로.
- **캡션 최저색은 `--color-faint #5F636D`** (그 이상으로 밝게 쓰지 않는다 — 틴트 표면 AA 보장).
- Home·신규 컴포넌트는 리터럴 hex 허용하되 **반드시 위 팔레트 값과 일치**시킨다(임의 색 신설 금지).

---

## 3. Typography Rules

**Font Stack** (next/font로 self-host = `@import` 등가, FOUT 없음):
```css
/* 포터블 환경용 등가 @import */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
/* 모노: Geist Mono (또는 ui-monospace fallback) */
--font-sans: var(--font-poppins), var(--font-noto-kr), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, monospace;
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 (Home) | sans | `clamp(3.75rem, 9vw, 6.75rem)` | 500 | 0.98 | -0.02em |
| Page H1 (inner) | sans | `clamp(2.75rem, 6vw, 5.25rem)` | 700 | 1.02 | -0.02em |
| Section H2 | sans | `clamp(1.875rem, 4vw, 3rem)` | 700 | 1.15 (snug) | -0.01em |
| H3 (card) | sans | `1.125–1.25rem` | 600 | 1.4 | — |
| Body | sans | `1–1.125rem` | 400 | 1.7 (KO) / 1.625 | — |
| Label / Eyebrow | mono | `0.625–0.75rem` | 500 | 1.4 | 0.18–0.22em (UPPER) |
| Mono / Code | mono | `0.6875–0.875rem` | 400–700 | 1.5 | — |

**Typography Rules:**
- 제목 weight: Section H2/Page H1 = 700, Home Hero = 500(라이트·대형으로 긴장감). 본문 400.
- 라벨 규칙: `SectionLabel` = `[ NN ] LABEL` (모노·대문자·대괄호).
- **한글 본문 행간 ≥ 1.7**, 자간 0.02em 권장(혼합 KO/EN — 국문 Noto Sans KR이 우선, 영문 Poppins fallback).
- **NEVER use**: 시스템 기본 serif를 제목에 사용 / Comic Sans·Papyrus / 본문에 모노폰트 / 굵기 800+ 블랙(브랜드 톤과 불일치).

**Text Decoration** (text-decoration-rules.md 판정 결과):
- **Home Hero H1** "확장하다": 그라데이션 ✓ (`text-gradient-ex-bright` mint→#8B5CF6→pink, 다크 배경 — "暗黑科技" 조건 충족). **투명 폴백색 `#8B5CF6`** 지정.
- **Page H1 (inner)**: 그라데이션 ✓ (`text-gradient-ex` deep-purple→purple→pink, ≥44px 대형이라 흰 배경 가독). 폴백 `#5E2EC0`.
- **투영(text-shadow)**: **사용 안 함** — 다크 히어로 대형 제목은 규칙상 "glow" 후보지만, **브랜드 NO-glow 원칙으로 의도적 생략**(절제 우선).
- **본문 p / 인라인 작은 강조**: 장식 금지. 인라인 강조는 `color: var(--color-primary)` solid(핑크 그라데이션 텍스트 금지 — AA).

---

## 4. Component Stylings

### Buttons (pill, `rounded-full`, **NO glow**)
```css
.btn { display:inline-flex; align-items:center; gap:.375rem; border-radius:9999px;
  padding:.875rem 1.75rem; font-size:.875rem; font-weight:700; transition:background-color .2s, color .2s, border-color .2s; }
/* Primary — 잉크 (Home/Header 표준) */
.btn--primary{ background:var(--color-fg); color:#fff; }
.btn--primary:hover{ background:#23264a; }
.btn--primary:active{ background:#0a0b1c; }
.btn--primary:disabled{ opacity:.6; pointer-events:none; }
/* On dark hero — 화이트 필 */
.btn--onDark{ background:#fff; color:var(--color-fg); }
.btn--onDark:hover{ background:rgba(255,255,255,.9); }
/* Accent — 핑크 = Action (최고전환 CTA에만) */
.btn--accent{ background:var(--color-accent); color:#fff; }
.btn--accent:hover{ background:rgba(var(--color-accent-rgb),.85); }
/* Secondary — 아웃라인 */
.btn--secondary{ border:1px solid var(--color-border); background:rgba(247,248,250,.6); color:var(--color-fg); }
.btn--secondary:hover{ border-color:rgba(var(--color-primary-rgb),.6); color:var(--color-primary); }
/* Ghost (on dark) */
.btn--ghost-dark{ border:1px solid rgba(255,255,255,.3); color:#fff; }
.btn--ghost-dark:hover{ background:rgba(255,255,255,.1); }
/* Focus — 전역 :focus-visible 퍼플 링; 다크 표면은 .focus-on-dark(흰 링) */
.btn:focus-visible{ outline:2px solid var(--color-primary); outline-offset:2px; }
.btn.focus-on-dark:focus-visible{ outline-color:#fff; }
```

### Cards (`rounded-2xl`, 헤어라인 + soft shadow, **NO glow**)
```css
.card{ border-radius:1rem; border:1px solid var(--color-border); background:var(--color-bg);
  box-shadow:0 1px 2px rgba(var(--color-fg-rgb),.04), 0 6px 16px rgba(var(--color-fg-rgb),.06); transition:border-color .2s, transform .2s; }
.card:hover{ border-color:rgba(var(--color-primary-rgb),.5); }
.card:focus-within{ outline:2px solid var(--color-primary); outline-offset:2px; }
.card__media img{ transition:transform .5s var(--ease-ex); }
.card:hover .card__media img{ transform:scale(1.03); }
```

### Navigation (sticky, 히어로 위 투명 → 스크롤 시 라이트)
```css
.header{ position:sticky; top:0; z-index:50; transition:background-color .3s, border-color .3s; }
.header--overHero{ background:transparent; border-bottom:1px solid rgba(255,255,255,.1); }     /* 다크 히어로 위: 흰 텍스트·로고(filter:brightness(0) invert(1)) */
.header--solid{ background:rgba(255,255,255,.8); backdrop-filter:blur(16px); border-bottom:1px solid var(--color-border); } /* scrollY > 82vh */
.nav__link{ color:var(--color-muted); }
.nav__link:hover{ color:var(--color-fg); }
.header--overHero .nav__link{ color:rgba(255,255,255,.8); }
.header--overHero .nav__link:hover{ color:#fff; }
```

### Links
```css
.link{ color:var(--color-primary); transition:color .2s; }
.link:hover{ color:var(--color-primary-hover); text-underline-offset:3px; text-decoration:underline; }
.link--arrow .arrow{ transition:transform .2s; }
.link--arrow:hover .arrow{ transform:translateX(2px); }
```

### Tags / Badges / Filter chips
```css
.tag{ border-radius:9999px; padding:.125rem .5rem; font-family:var(--font-mono); font-size:10px; text-transform:uppercase; letter-spacing:.06em;
  background:var(--color-primary-soft); color:var(--color-primary); }
/* 필터 칩 — 전 페이지 통일: 활성 퍼플, aria-pressed (role=tab 금지: tabpanel 없을 때) */
.chip{ border-radius:9999px; padding:.5rem 1rem; font-size:.875rem; font-weight:500; border:1px solid var(--color-border); background:var(--color-bg); color:var(--color-muted); transition:border-color .2s,color .2s,background-color .2s; }
.chip:hover{ border-color:rgba(var(--color-primary-rgb),.5); color:var(--color-fg); }
.chip[aria-pressed="true"]{ background:var(--color-primary); color:#fff; border-color:transparent; }
```

### Form fields (ContactForm)
```css
.field{ width:100%; border-radius:.5rem; border:1px solid var(--color-border); background:var(--color-surface);
  padding:.75rem 1rem; font-size:.875rem; color:var(--color-fg); }
.field::placeholder{ color:var(--color-faint); }
.field:focus{ border-color:var(--color-primary); }                 /* + 전역 focus-visible 링 */
.field[aria-invalid="true"]{ border-color:var(--color-error); }
```

---

## 5. Layout Principles

**Container:** `container-ex`
- Max width: **80rem (1280px)**
- Padding-inline: **1.25rem**
- Narrow variant (장문 본문): `max-w-xl` ~ `max-w-prose` (≤ ~70ch)

**Spacing Scale** (토큰에서만 선택 — 임의 padding 금지):
- Section padding: `--spacing-section-sm 5rem` / `--spacing-section 7rem` / `--spacing-section-lg 10rem`
- Component gap: 카드 그리드 `1.25rem`(gap-5), 인트로 그리드 `3rem`(gap-12)
- Card internal padding: `1.5rem`(p-6)

**Grid:**
```css
.grid-cards{ display:grid; gap:1.25rem; grid-template-columns:1fr; }
@media (min-width:640px){ .grid-cards{ grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px){ .grid-cards{ grid-template-columns:repeat(3,1fr); } }
.grid-cards .featured{ grid-column:span 2; }      /* 대표 카드 */
```

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | 보더만 `1px solid var(--color-border)` | 입력 필드·태그·교차 section 구획 |
| Subtle | `.shadow-soft` = `0 1px 2px /.04 , 0 6px 16px /.06` (잉크 RGB) | 카드 기본 — 촉각적 레이어 |
| Hover lift | 보더색 전환(`primary/50`) ± `translateY(-2px)` | 카드 hover |
| Dark glow | 오로라 글로우 + 비네팅 **(배경 한정)** | Home 히어로 깊이 |

> **규칙**: 깊이는 **그림자·보더**로만. **요소 박스 글로우/네온 섀도우 금지**(하드 규칙). 다크 표면의 "빛"은 배경 오로라로만 표현하고 텍스트/버튼엔 글로우를 얹지 않는다.

---

## 7. Animation & Interaction

**Motion Philosophy**: 절제·우아 — `opacity` + `transform`(+소량 `filter:blur` in/out) 위주, **무빙 요소에 상시 blur 금지**, 모든 모션은 `prefers-reduced-motion`에서 정적.
**Tier**: 본문 **L2** / Home 히어로 **L3**.
**Easing**: `--ease-ex: cubic-bezier(0.22, 1, 0.36, 1)`.

### Dependencies
```text
CSS keyframes + 자체 IntersectionObserver(Reveal) — 외부 모션 라이브러리 없음.
Home 히어로/커서: 원시 requestAnimationFrame (rAF 절두). three.js는 레거시(현 히어로 미사용).
```

### Entrance Animation (scroll reveal — `[data-anim]` 게이트)
```css
[data-anim] [data-reveal]{ opacity:0; transform:translateY(48px); filter:blur(8px);
  transition:opacity .7s var(--ease-ex), transform .7s var(--ease-ex), filter .7s var(--ease-ex); }
[data-anim] [data-reveal].in-view{ opacity:1; transform:none; filter:none; }   /* stagger: 인라인 transition-delay */
```

### Scroll Behavior
```js
// IntersectionObserver로 .in-view 토글(자체 Reveal). 내비는 scrollY>innerHeight*0.82에서 라이트 전환.
// CountUp(숫자), Parallax(translateY) 동일 패턴. 스크롤 자체는 native scroll-behavior:smooth (Lenis 미사용).
```

### Hover & Focus States
```css
/* 모든 인터랙티브 요소는 hover + focus 보유(§4). 전역 키보드 링: */
:focus-visible{ outline:2px solid var(--color-primary); outline-offset:2px; border-radius:4px; }
.focus-on-dark:focus-visible{ outline-color:#fff; }   /* 다크 표면(오버히어로 헤더·로고·햄버거·Footer) */
```

### Special Effects (Home 히어로 — L3, 성능 가드 필수)
```js
// HeroAurora: 동심원 컬러밴드(민트/퍼플/핑크) 거대 레이어를 GPU translate로 포인터 추종(이징 lag=비선형)
//   + 자율 리사주 드리프트. IntersectionObserver로 오프스크린 시 rAF 정지. (pointer:fine) 한정.
// CustomCursor: 헥사곤 트레일링 링(네이티브 커서 유지), lerp 0.28, hover 56 / 기본 30 / 클릭 24.
//   matchMedia('(pointer: fine)')에서만, reduced-motion이면 트레일 없이 스냅.
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce){
  [data-anim] [data-reveal]{ opacity:1; transform:none; filter:none; transition:none; }
  .animate-dropdown, .animate-ex-float, .text-gradient-ex, .gradient-ex-mesh{ animation:none; }
  html{ scroll-behavior:auto; }
  /* HeroAurora/CustomCursor: JS가 reduced 감지 시 정적 1프레임 / 트레일 비활성 */
}
```

### Signature Moments (L2+ 6 카테고리 — 충족 현황)
- Text(Hero) ✓ `text-gradient-ex-bright` 그라데이션 헤드라인 · Text(Section/Body) ✓ `Reveal`(blur-up)
- Element ✓ 헥사곤 커서 + 카드 hover lift · Component ✓ 필터 갤러리/메가메뉴
- **Background ✓ Aurora(동심원 오로라, 포인터 반응)** ← 시그니처

---

## 8. Do's and Don'ts

### Do
- 퍼플을 **유일한 상시 강조색**으로. 핑크는 Action 전용·드물게, 민트는 다크/메시 표면에서만.
- 텍스트 대비 **WCAG AA** 항상 충족(캡션 ≥ `--color-faint #5F636D`, 다크 표면 텍스트 ≥ `#8489A8`).
- 색은 팔레트 변수/일치 hex로만. 깊이는 `shadow-soft`·보더로만.
- 모든 모션에 `prefers-reduced-motion` 경로. 포인터 인터랙션은 `(pointer:fine)` 한정 + rAF 절두 + 오프스크린 정지.
- 정직성: Work=**"활용 시나리오"**, 스튜디오=**"견적 문의"만**, 파트너 제품=**"연결/조율·총판/리셀러"**(EX 자체 제작 아님), 실제 시설/스펙만.

### Don't
- ❌ 버튼/섹션/텍스트 **글로우·네온 박스섀도우** (하드 규칙).
- ❌ 흰 배경 위 **핑크·민트 본문/작은 텍스트**(AA 미달). ❌ 그라데이션 텍스트를 <40px·인라인에 사용.
- ❌ 출처 없는 **수치·고객사·로고 날조**. ❌ "대표" 등 권한 **과대표현**(총판=Distributor로 통일).
- ❌ `role="tab"`을 `tabpanel`/`aria-controls` 없이 사용. ❌ `href` 없는 카드에 링크 어포던스.
- ❌ 임의 섹션 패딩(토큰 스케일에서만). ❌ Footer를 라이트로(다크 앵커 유지).
- ❌ 무빙 요소에 상시 `filter:blur()` / `backdrop-filter:blur()` > 14px 대면적.
- ❌ WebGL/3D 상주 렌더(오프스크린 미정지). ❌ 전역 커스텀 커서를 일반 SaaS 톤에 남발(본 사이트는 기술톤이라 허용).
- ❌ 임의 신규 색/폰트 도입(팔레트·폰트 스택 밖).

---

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | 가로 GNB + 메가메뉴, 3열 그리드, 2열 인트로 |
| Tablet | 640–1024px | 2열 그리드, 인트로 1~2열, 햄버거 |
| Mobile | < 640px | 1열, 햄버거 시트(스크롤 락), 다이어그램 세로 스택 |
| xs | < 24rem | 히어로 H1 한 단계 축소, 2열→1열 보정 |

**Touch Targets:** 최소 **44×44px** (햄버거 11×11=44px ✓). 소셜/인라인 아이콘 링크는 패딩으로 ≥24px 확보.
**Collapsing Strategy:** GNB→햄버거 시트, 3→2→1열, 인트로 2열→세로, 파이프라인/3×3 다이어그램은 모바일에서 화살표 커넥터 대신 세로 흐름.

```css
@media (max-width:1024px){ .nav--desktop{ display:none; } .nav--mobile-toggle{ display:inline-flex; } }
@media (max-width:640px){
  .grid-cards{ grid-template-columns:1fr; }
  .intro-2col{ grid-template-columns:1fr; }
  .hero h1{ font-size:clamp(2.75rem, 12vw, 3.75rem); }   /* 좁은 폭 오버플로 방지 */
}
/* 컨테이너/이미지 오버플로 차단 */
.container-ex{ width:100%; max-width:80rem; margin-inline:auto; padding-inline:1.25rem; }
img{ max-width:100%; height:auto; }
```

---

### 부록 — 품질 체크리스트 결과 & 알려진 편차
- **체크리스트 통과**: 9섹션 충실 · hover/focus 전요소 · 입장(Reveal)·스크롤 reveal·L3 특효(오로라/커서) · reduced-motion 전 컴포넌트 · 모바일 폴드/햄버거 · 시그니처 모션 6류 · 정직성.
- **알려진 편차(의도적)**: ① 다크 히어로 대형 제목 **글로우 생략**(규칙상 권장이나 브랜드 NO-glow 우선). ② 잔여 리터럴 hex = 의도적 1회성 색 + SVG/인라인 그라데이션(런타임)뿐(라이브 코드 매핑가능 hex = 0). ③ 외부 크롤러/토큰추출 스크립트 미실행(사이트·토큰 기보유).
- **정합 완료 (2026-05)**: 리터럴 hex → 토큰 매핑 ✓ · 섹션 헤더 정렬(제품 상세 좌측 통일) ✓ · 섹션 패딩 리듬(`py-24 lg:py-28`) ✓ · CTA 문구(주 전환 = "도입 상담 →") ✓ · 스펙/비교표 컴포넌트화(`SpecTable`·`CompareTable`, 시맨틱) ✓ · 한글 본문 행간 1.7 ✓ · 죽은 코드·`three` 제거 ✓.
