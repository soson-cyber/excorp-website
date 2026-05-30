# EX Corporation — DESIGN.md

> 디자인 시스템 단일 기준 (Source of Truth). "스펙 먼저, 코드 나중" 원칙.
> KAOPU-XiaoPu/web-design 9-섹션 방법론을 현 사이트에서 역추출해 코드화한 문서.
> 토큰 원본: `src/app/globals.css` (`@theme` + `:root`). 코드와 이 문서가 어긋나면 **이 문서를 기준**으로 맞춘다.
>
> 톤: 화이트 기반 "크리에이티브 테크 스타트업"(kakaocorp 톤). 단, **Home 히어로만 다크 오로라**, **Footer만 다크 네이비 앵커**.
> 최종 갱신: 2026-05 (UI/UX 프로 점검 P0/P1 반영본).

---

## 1. Color

### 브랜드 팔레트 (221025 브랜딩 가이드 p.11 — "New Logo Color System 1")
| 토큰 | HEX | 역할 |
|------|-----|------|
| `--color-purple` / `--color-primary` | `#5E2EC0` | **주 강조색. 사이트 전체에서 유일한 상시 액센트** |
| `--color-primary-hover` | `#4A23A0` | 퍼플 hover |
| `--color-mint` | `#45F1E0` | 밝은 포인트 — **다크 표면/그라데이션 메시에서만** (흰 배경 텍스트 금지: 대비 ≈1.2:1) |
| `--color-pink` / `--color-accent` | `#D206EE` | **Action 색** — 최고 전환 CTA에만 절제 사용 (본문 텍스트 금지: ≈3.6:1) |
| `--color-deep-purple` | `#310A9E` | 그라데이션 시작/딥 톤 |
| `--color-dark-purple` | `#1A1D40` | 보조 다크 |

### 표면 / 텍스트 (라이트)
| 토큰 | HEX | 용도 | 대비 |
|------|-----|------|------|
| `--color-bg` | `#FFFFFF` | 기본 배경 | — |
| `--color-surface` | `#F7F8FA` | 카드 / 교차 섹션 (paper) | — |
| `--color-surface-2` | `#EEF0F5` | 한 단계 진한 면 | — |
| `--color-border` | `#E5E7EB` | 헤어라인 | — |
| `--color-fg` | `#0F1129` | 잉크 — 제목/주요 텍스트 | AAA |
| `--color-muted` | `#51545E` | 본문/보조 | AA (모든 면) |
| `--color-faint` | `#5F636D` | 캡션/최소강조 | **AA (white·#F7F8FA·#EEF0F5 모두)** ← `#6b7280`에서 강화 |

### 다크 표면 (Home 히어로 / Footer)
| 값 | HEX | 용도 |
|----|-----|------|
| 히어로 베이스 | `#0E0626` | HeroAurora 베이스 + 섹션 bg |
| 메시 베이스 | `#2A0E63` | `.gradient-ex-mesh` |
| Footer 베이스 | `#0F1129` | 다크 앵커 |
| Footer 본문 | `#8489A8` | AA on 다크 ← `#6f7490`에서 강화 |
| Footer 링크 | `#9BA0B8` | hover→white |
| Footer 거점 라벨 | `#A78BF0` | 밝은 퍼플 |

### 시맨틱 (흰 배경 AA 튜닝)
`--color-success #16A34A` · `--color-live #E11D48` · `--color-warning #B45309` · `--color-error #DC2626`

### 그라데이션 (전부 토큰/리터럴, 인라인 메시는 런타임 적용)
- `text-gradient-ex` — `deep-purple→purple→pink` (라이트 배경). **디스플레이(≥24px·bold)에서만**, 인라인 본문 금지. 폴백색 `#5E2EC0`.
- `text-gradient-ex-bright` — `mint→#8B5CF6→pink` (다크 배경 헤드라인 강조). 폴백색 `#8B5CF6`.
- `.gradient-ex-mesh` — 민트·핑크·퍼플 오로라 (딥퍼플 베이스). GNB 메가메뉴 피처드 카드.
- HeroAurora — 동심원 컬러 밴드(민트/퍼플/핑크) + 중앙 비네팅(흰 텍스트 가독).

---

## 2. Typography

- **서체**: Poppins(영문) → Noto Sans KR(국문) 자동 폴백 = `--font-sans`. 모노 = Geist Mono `--font-mono`.
- **굵기**: Poppins 400/500/600/700, Noto KR 300/400/500/700.
- **스케일** (반응형 clamp/브레이크포인트):
  | 레벨 | 크기 | 비고 |
  |------|------|------|
  | Hero H1 | `text-6xl → sm:7xl → lg:[6.75rem]`, `font-medium`, `leading-[0.98]` | 중앙 정렬, 라이트 웨이트 |
  | 내부 H1 (PageHero) | `clamp(2.75rem, 6vw, 5.25rem)`, `text-gradient-ex` | |
  | 섹션 H2 | `text-3xl → md:4xl / lg:5xl`, `font-bold`, `leading-snug` | |
  | 카드 H3 | `text-lg ~ text-xl`, `font-semibold` | |
  | 본문 | `text-base ~ text-lg`, `leading-relaxed`, `text-muted` | |
  | 모노 라벨 | `text-[10px]~xs`, `uppercase`, `tracking-[0.18~0.22em]`, `text-faint` | |
- **라벨 규칙**: `SectionLabel` = `[ NN ] LABEL` (모노·대문자·대괄호).
- **측정(line-length)**: 본문 ≤ ~70ch 목표 → `max-w-xl`/`max-w-prose` 권장. (현 혼용 `max-w-2xl` → 정리 대상)

---

## 3. Components

- **Button** (`ui/Button.tsx`): `primary`(퍼플 필) · `accent`(핑크 필 = **Action, 최고전환 CTA에만**) · `secondary`(아웃라인) · `ghost`. 전부 `rounded-full`. **Glow 금지.**
- **CTA 필 관례**: Home/Header = **잉크(#0F1129) 필** + 화이트 보조(고스트). 내부 페이지 주 전환 = **accent(핑크)**. (※ 문구 통일은 미완 — §7 Don't 참고)
- **카드**: `rounded-2xl border border-border bg-white/surface`, hover `border-primary/50`, 깊이는 `shadow-soft`(글로우 아님).
- **필터/탭 칩**(WorkGallery·StudioMenu·NewsList): 통일 규칙 — 활성 `bg-primary text-white`, 비활성 아웃라인+`hover:border-primary/50`, **`aria-pressed`** 사용(`role=tab`는 tabpanel 없이 쓰지 않음).
- **GNB 메가메뉴**(`layout/Header.tsx`): 좌 컬럼(제목+태그+설명) + 우 피처드 카드(`gradient-ex-mesh`). 키보드: 포커스 시 열림·Esc 닫힘·`aria-haspopup`/`aria-expanded`.
- **Header 상태**: Home 히어로 위 = 투명+흰 텍스트/로고(`filter:brightness(0) invert(1)`), 히어로 통과 후(scrollY > 82vh) = 라이트(`bg-white/80` backdrop) + 잉크 텍스트.
- **MediaBlank**: 이미지/영상 부재 시 코너틱+라벨 플레이스홀더(에셋 입수 시 교체).
- **ContactForm**: 라벨 연결, 필수 `*`(`text-primary`)+`sr-only "(필수)"`, 오류 `role="alert"`+`aria-invalid`/`aria-describedby`+첫 오류 포커스, 성공 `role="status"`+포커스.

---

## 4. Layout

- **컨테이너**: `container-ex` = `max-width:80rem(1280px)`, `padding-inline:1.25rem`, 중앙 정렬.
- **섹션 리듬**: `--spacing-section-sm 5rem / --spacing-section 7rem / --spacing-section-lg 10rem`. → **세 토큰 중에서만 선택**(임의 py 혼용 지양 — 현 Home은 정리 대상 §7).
- **그리드**: 카드 그리드 `sm:grid-cols-2 lg:grid-cols-3`, 2열 인트로 `lg:grid-cols-2`. featured 카드 `col-span-2`.
- **섹션 헤더 정렬**: **한 컨벤션으로 통일 필요**(현재 Solution=좌측 / Product=중앙 혼재 — §7).
- **콘텐츠 측정**: 그리드/스펙 영역 `max-w-5xl` 권장(페이지 간 통일).

---

## 5. Motion

- **이징**: `--ease-ex: cubic-bezier(0.22, 1, 0.36, 1)`.
- **스크롤 리빌**: `Reveal` — `[data-anim]`(모션 허용 시에만 set) 게이트, `opacity+translateY(48px)+blur(8px)` → in-view 해제, stagger는 인라인 delay.
- **숫자**: `CountUp`. **패럴럭스**: `Parallax`. **그라데이션 드리프트**: `ex-gradient-drift`(9s) / `ex-mesh-drift`(18s).
- **Hero 인터랙션**: HeroAurora — 포인터 추종(이징 lag = 비선형) + 자율 리사주 드리프트, **오프스크린 시 rAF 정지**(IntersectionObserver).
- **커서**: `CustomCursor` — 헥사곤 트레일링 링(네이티브 커서 유지). lerp 0.28, 호버 56/기본 30/클릭 24.
- **전역 규칙**: **모든 모션은 `prefers-reduced-motion: reduce`에서 비활성/정적**. fine 포인터에서만 포인터 인터랙션.

---

## 6. Depth

- **깊이는 그림자(shadow-soft)와 헤어라인 보더로만.**
  - `.shadow-soft` = `0 1px 2px rgba(15,17,41,.04), 0 6px 16px rgba(15,17,41,.06)` (촉각적 레이어, 글로우 아님).
- **Glow 전면 금지** (블러 글로우 블롭·네온 박스섀도우 금지). — 하드 규칙.
- 다크 표면 깊이: 오로라 글로우 + 비네팅으로만(요소 박스 글로우 금지).
- 배경 보조: `.bg-grid`(잉크 5% 56px 격자), 라이트 섹션 한정.

---

## 7. Design Guidelines (Do / Don't)

### Do
- 퍼플은 **유일한 상시 강조색**. 핑크는 **Action 전용**으로 드물게. 민트는 **다크/메시에서만**.
- 텍스트 대비 **WCAG AA** 항상 충족(캡션은 `--color-faint #5F636D` 이상).
- 다크 표면 위 포커스는 **`.focus-on-dark`(흰 링)**, 라이트는 전역 퍼플 링.
- 정직성: Work=**"활용 시나리오"**, 스튜디오 가격=**"견적 문의"만**, 파트너 제품=**"연결/조율·총판/리셀러"**(EX 자체 제작 아님), 실제 시설/스펙만.
- 혼합 KO/EN 타이포 고려(영문 Poppins / 국문 Noto KR).

### Don't
- ❌ 버튼/섹션 **글로우**. ❌ 흰 배경 위 **핑크/민트 본문 텍스트**(AA 미달). ❌ 그라데이션 텍스트를 작은 인라인에 사용.
- ❌ 출처 없는 **수치/고객사/로고 날조**. ❌ "대표" 등 **권한 과대표현**(총판=Distributor로 통일).
- ❌ `role="tab"`을 tabpanel 없이 사용. ❌ href 없는 카드에 링크 어포던스.
- ❌ 임의 섹션 패딩(토큰 스케일에서만). ❌ Footer를 라이트로(다크 앵커 유지).
- ⚠️ **미완 통일 항목**(차기 적용 권장): 섹션 헤더 정렬(좌/중) · 섹션 패딩 리듬 · CTA 문구(도입상담/프로젝트상담/제품도입문의/전문가상담 → 1~2종) · 본문 측정 max-w · 스펙/비교표 컴포넌트화(+`<table>` 시맨틱).

---

## 8. Responsive

- **브레이크포인트**: `xs 24rem`(토큰) · sm · md · lg(데스크톱 GNB 분기 1024px).
- **GNB**: <1024px 햄버거(11×11 타깃) + 모바일 시트(스크롤 락). 메가메뉴는 데스크톱 전용.
- **그리드 붕괴**: 3열→2열→1열. 2열 인트로는 모바일 1열.
- **다이어그램/파이프라인**: 모바일에서 화살표 커넥터 대신 세로 스택 권장(EXLINK 3×3, xr-solution 파이프라인 — 개선 여지).
- **타깃 크기**: 인터랙션 ≥ 24×24px(WCAG 2.5.8). 소셜 아이콘 링크 패딩 확보.

---

## 9. Accessibility (WCAG 2.1 AA)

- **대비**: 본문 ≥4.5:1 / 대형·UI ≥3:1. 캡션 토큰 `#5F636D`, Footer `#8489A8`로 AA 확보. 핑크/민트는 텍스트 비사용.
- **포커스**: 전역 `:focus-visible` 퍼플 2px 링 + `outline-offset`. 다크 표면은 `.focus-on-dark`(흰 링).
- **키보드**: 메가메뉴 포커스 오픈·Esc 닫힘·`aria-haspopup/expanded`. 필터는 `aria-pressed`. 모바일 메뉴 조작 가능.
- **시맨틱**: 페이지당 단일 `<h1>`(PageHero)·`<h2>`섹션·`<h3>`카드. 랜드마크 `header/main/footer`, 스킵 링크(`#main`), `lang="ko"`.
- **폼**: 라벨 연결, 필수 `sr-only "(필수)"`, 오류 `role="alert"`+`aria-invalid`+`aria-describedby`+첫 오류 포커스, 성공 `role="status"`+포커스.
- **모션**: `prefers-reduced-motion` 전 컴포넌트 커버(Reveal/CountUp/Parallax/CustomCursor/HeroAurora/CSS 키프레임).
- **이미지**: `next/image` alt 필수, 장식은 `aria-hidden`, MediaBlank 라벨.

---

### 부록 — 적용 메모
- 토큰 추가/변경은 `src/app/globals.css`에서. Home·신규 컴포넌트는 리터럴 hex 허용(단 위 팔레트 준수).
- 본 문서는 KAOPU-XiaoPu/web-design의 "DESIGN.md 우선" 방법론 적용본. 업스트림 크롤러/토큰추출 스크립트(Playwright·Python/JS)는 미설치·미실행.
