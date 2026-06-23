# EX Corporation Website — Handoff Brief

> 다른 Claude 세션/환경(또는 협업자)이 이 프로젝트를 이어받기 위한 단일 인수인계 문서.
> 이 파일 + `CLAUDE.md` + `DESIGN.md` + Figma 파일만 있으면 맥락 복원이 가능합니다.

## 0. v3.2 — 헤더/히어로 폴리시 · 파트너 미디어 카드 · 전 페이지 키트 통일 (2026-06, 최신·최우선)

> §0.v3.1 이후 디자인 폴리시 + **내부 전 페이지를 홈 키트로 통일**.

**헤더 (globals.css `.header*`/`.navbar`/Header.tsx)**
- 로고 = **EX 큐브 심볼**(`ex-cube.png`, 60px, `alt=""`+링크 aria-label). 상단 패딩 `10px`.
- 메뉴 **박스(글래스 pill) 제거** → 텍스트가 바 위에 직접. 스크롤 시 `.header--solid` **불투명**(`rgba(14,6,38,.92)`+blur14 + 다크 섀도, **흰 헤어라인 제거**).
- 메가메뉴 → **심플 드롭다운**(`.dropdown`/`.dropdown__panel`/`__row`, hover 브리지 `padding-top`). 기존 `.mega*` CSS·`featured` 사용 안 함(site.ts featured 데이터는 잔존, 무해).

**히어로 (Hero.tsx)**
- pill 제거, 트러스트 텍스트 제거, 리드="이엑스는 …하나의 흐름으로 연결합니다", 흰 CTA→**퍼플**(`.btn--onDark`), 글래스 CTA=외곽 흰 라인+엣지 글로우링+안쪽 투명.
- 콘솔: 멀티캠 **CAM01→CAM02→CAM03→PGM** 순, **PGM 기본 선택**, 이미지 `next/image` 전환(webp), **8초 자동 순환 + 1초 디졸브**(stacked feeds opacity, reduced-motion/hidden 정지).

**홈 (HomeClean.tsx)**
- §01 중앙정렬+제목 줄바꿈+대칭 3카드(번호 단색 violet), §02 CORE SOLUTION **삭제**, FAQ **삭제**, 최종 CTA **핑크**(`.btn--pink`).
- §03 파트너 bento 3카드에 **배경 이미지+스크림**(`card--media`/`.pcard-bg`/`.pcard-scrim`): `aximmetry-vp.jpg`·`moverse-mocap.jpg`·`retracker-tracking.jpg`.
- CASE 실사 `exlink-control-room.jpg`(16:9), §04 `xr-studio.jpg`(16:9, Hero studio.png와 분리).

**전 내부 페이지 키트 통일** (Solution/Product 인덱스·솔루션2·제품3·xr-studio·work(+slug)·about·news·careers·contact·support)
- `PageHero` + Tailwind 에디토리얼 → **`.section section--ink/surface/white` 톤 교차 + `.section--glow` + `.h2`/`.lead` + 더블베젤 `.card` + `.arrowlink`**.
- 기능 컴포넌트(SpecTable·CompareTable·StudioMenu·StudioOptions·ContactForm·NewsList·WorkGallery·Gauge·MediaBlank)·정직성 표기 보존. **빌드 32p ✓ / ESLint 0**.

**성능/정리**: 콘솔 이미지 next/image webp, `next.config` `images.formats:['avif','webp']`, Geist_Mono 제거, 데드 CSS(`.hero-pill*`·`.hero-trust` 등) 제거, Header set-state-in-effect 수정.

## 0. v3.1 — Wope 그리드·글래스 네브바·콘텐츠/SEO·브랜드 패스 (2026-06)

> §0(다크 전환) **이후**의 변경. three.js **완전 제거**, 히어로 그리드는 정적 CSS 퍼스펙티브로, 네브바는 글래스 필+셰브론으로, 박스 회전보더는 버튼 conic 글로우-라인으로 이전. 콘텐츠/SEO 딥 패스 + 브랜드 감사 완료. 단일 기준은 `globals.css`·`DESIGN.md §0`.

**디자인/모션 변경**
- **히어로 그리드 = 정적 CSS 퍼스펙티브** (`.hero-grid` + `::before`, `perspective()/rotateX()` + mask 페이드). **three.js·GridBackground·CurvedGridBackground 전부 삭제**(의존성 `three` 제거). 콘솔 상단 핫퍼플 블룸(`.hero-glow` Wope식 radial) + `HeroStars` 파티클 캔버스 유지. 히어로 하단 그라데이션 ray 애니메이션 제거.
- **네브바 = 투명 바 + 중앙 글래스 필**: 스크롤 시 바 자체 투명(`.header--solid{background:transparent}`), 중앙 메뉴를 감싸는 반투명 라운드 필(`.navbar` — `bg rgba(255,255,255,.05)`·`backdrop-filter blur(12px)`·`border-radius 9999px`). 서브메뉴 항목 셰브론(`.caret`/`.caret--open`), 메뉴 간격·시작/끝 패딩 확대(`.navlink padding 9px 20px`). ⚠ headless Chromium은 `backdrop-filter` 미렌더 → 실제 글래스는 실브라우저에서만 확인.
- **글로우-라인 이전**: 박스(콘솔·피처카드)의 회전 conic 보더 **제거**(`.console-shell .edge, .feat .feat-edge{display:none}`). 대신 **버튼 테두리에 애니메이션 conic 글로우-라인**(`.btn::after` + `@property --ex-angle` + `btnBorderSpin 4.5s`).
- **그레인 오버레이**: `layout.tsx`에 SVG `feTurbulence` 필름그레인(`.grain-overlay`, fixed z-60).
- **레이아웃 추가**: §01 `featgrid--wope`(3번째 카드 `full`), §03 `partner-bento`, FAQ `<details class="faq-item">` 아코디언, CTA `ctacard`, Numbers/Quote `section--glow`.

**콘텐츠/SEO 딥 패스 (Content Creator 에이전트)**
- Hero NEW 배너의 가짜 "EXLINK 2.0 릴리스" 클레임 제거 → 사실 기반 EXLINK pill로 교체(정직성).
- 홈 "WHAT YOU GET" 인용밴드 → "WHY REAL-TIME XR" 가치 진술로(고객 후기 오독 방지).
- FAQ "데모/스튜디오 방문" 항목 추가, Work 인덱스 메타 title/desc 보강("포트폴리오" 검색의도).
- 제품·솔루션·About·News 등은 이미 정직·SEO 양호로 판단 → 미변경.

**브랜드 감사 (Brand Guardian 에이전트)**
- 전반 양호: 명칭·EXLINK 대소문자·파트너 역할(리셀러·총판)·톤(합니다체·클리셰 0)·정직성 합격.
- 슬로건 마침표 불일치 2건 수정(`site.ts`·`opengraph-image.tsx` — "확장하다." → "확장하다").
- ⚠ **High(미해결): 공개 이메일 3종 분기** — 대표 `ax.excorp@gmail.com`(`site.ts`→Footer·Contact·Support·Careers·JSON-LD) vs 법무 `soson@excorp.kr`(privacy/terms) vs 폼 백엔드 `@excorp.kr` 부서계정. **`site.contact.email` 한 값만 결정하면 대부분 자동 정합** — 대표 이메일 통일 의사결정 대기.
- (제안만) 비브랜드 회색 하드코딩(`MediaBlank`·`NewsList` SVG stroke), Footer hover 근사 hex → 토큰화. `work.ts` 주석-타입 드리프트(`scenario` 필드 부재).

**빌드**: 변경 후 전 라우트 통과(에러 0).

## 0. v3 — 전체 다크 전환 (2026-06)

> **사이트 전체가 라이트/화이트 → 다크 product-led로 전환됨.** Claude Design 핸드오프(`EX Corporation Design System-handoff.zip` → `ui_kits/website`)의 디자인을 라이브 코드에 구현. 단일 기준 = [`DESIGN.md §0`](./DESIGN.md) + `src/app/globals.css @theme`(다크값).

- **토큰(globals.css @theme = 다크)**: bg#0E0626 · surface#14112C · surface-2/card#161232 · footer#0F1129 · fg#FFFFFF · muted#C3C6D6 · faint#9094A9 · border rgba(255,255,255,.1) · lav#C4B5FD · violet#8B5CF6 · mint/pink/purple 유지. `--font-mono`=산스(Geist 드롭). `color-scheme:dark`.
- **키트 컴포넌트 CSS를 globals.css에 포팅**: `.btn`(+글로우 헤일로)·`.hero/.console`·`.feat`(회전보더+spotlight)·`.section--ink/surface/white`·`.mega`·`.footer`·`.modal/.field`·`.card/.tag/.chip/.cred/.statgrid/.quote/.ctacard` 등. Home·헤더가 1:1 사용.
- **새 컴포넌트**: `home/Hero.tsx`(product-led 다크 히어로 + 인터랙티브 EXLINK Live Console: 멀티캠 클릭→프로그램 피드·telemetry·pipeline·회전보더·커서 spotlight·파티클 캔버스·light ray, reduced-motion 안전), `home/FeatureCard.tsx`(Wope 카드). `HomeClean.tsx` 전면 다크 재구축(8섹션).
- **공통 갱신**: `Header`(다크 글래스 + `ex-logo-dark.png` 화이트 로고 + 다크 메가메뉴, `.desktop-cta` 모바일 숨김 수정), `Footer`(bg-footer), `Button`(→`.btn` 변형: primary=퍼플·accent=핑크·secondary/ghost=ghostDark), `SectionLabel`(라벤더 `.seclabel`), `ContactForm`(다크 필드 + 퍼플 submit).
- **내부 페이지 스윕**: `bg-white`→`bg-card`(24파일), `text-primary`→`text-lav`(21파일), `text-gradient-ex`→`-bright`(6파일). 하드코딩 라이트 hex 0. **빌드 32라우트 통과**.
- **삭제된 죽은 라이트 코드**: `HeroAurora`·`home/SectionLabel`·`sections/home`·`ui/ParticleField`.
- **Glow 규칙 반전**: 기존 "버튼/섹션 Glow 금지" → **허용**(Wope 헤일로·회전 보더·파티클). 이전 무광 규칙 폐기.

## 0.1 이전 세션 (2026-05, 라이트/오로라 — 참고용, §0이 대체)

> **디자인 시스템 단일 기준은 이제 루트 [`DESIGN.md`](./DESIGN.md)** (9섹션, web-design 스킬 적용본). 코드와 충돌 시 DESIGN.md 기준.

- **Hero 교체**: three.js `Hero3D` 폐기·삭제 → **`components/home/HeroAurora.tsx`** (다크 Highnote식 풀블리드 동심원 컬러밴드 오로라 + **포인터 반응**·이징, 중앙 초대형 스택 헤드라인 "경험을/확장하다"). `three`/`@types/three` 의존성 및 `components/three/*`·`HeroTracking.tsx` **삭제됨**. (남은 고아: `components/sections/home.tsx`·`ui/ParticleField.tsx` — 정리 후보)
- **GNB**: Evervault식 **메가메뉴**(좌 컬럼+설명+태그, 우 `gradient-ex-mesh` 피처드 카드) + **히어로 위 투명 → 스크롤 시 라이트** 전환(`Header.tsx`, `usePathname`+scroll, 로고 filter 화이트, `.focus-on-dark` 흰 포커스 링). 키보드 접근성(aria-haspopup/expanded·Esc).
- **디자인 토큰 변경**(globals.css): `--color-faint` → **`#5F636D`**(AA), 신규 `--color-{ink-hover,hero,pale,footer-muted,footer-link,footer-accent}`, `--spacing-section` **8.5rem**. `text-gradient-ex` = deep-purple→purple→pink(+가시 폴백), `text-gradient-ex-bright`(다크용 민트→퍼플→핑크), `.gradient-ex-mesh`(오로라). **muted #7C8090 표기는 폐기** — 실제 body `#51545E`·faint `#5F636D`.
- **UI/UX 프로 패스**(전 사이트): WCAG AA(캡션 토큰·메가메뉴 키보드·ContactForm `role=alert`/`aria-invalid`/포커스·다크 흰 포커스 링), 리터럴 hex→**시맨틱 토큰** 일괄(라이브 코드 매핑가능 0), **카드=플랫 화이트 보더**(`shadow-soft` 제거), 섹션 배경 `bg-surface/40`→**`bg-surface`**(경계 크리스프), 모바일 다이어그램 **세로 스택**, CTA 문구 **"도입 상담 →"** 통일, 섹션 헤딩 **`text-4xl font-semibold md:text-5xl`**(크게/가볍게)·여백↑, **PageHero 글로우 블롭 제거**, 제품 상세 섹션 **좌측 정렬** 통일.
- **신규 컴포넌트**: `components/product/SpecTable.tsx`(그룹 `<dl>`)·`CompareTable.tsx`(시맨틱 `<table>`) — 제품 스펙/비교표 통일.
- **정직성**: Moverse/RETracker "공식 한국 **총판**"(대표 표현 제거).
- **코드베이스 지식 그래프**: `.understand-anything/knowledge-graph.json` (understand-anything 플러그인, 137노드/288엣지/8레이어/투어10, 한국어) + 자체 뷰어 `.understand-anything/dashboard.html`. 보기: `cd .understand-anything && python3 -m http.server 8099` → `http://localhost:8099/dashboard.html`. (플러그인 정식 대시보드는 Astro 빌드가 보안 차단됨)
- **다음 작업 후보**: ① **색 절제 패스**(모노톤+퍼플 단일 시그니처, Highnote 완성도 마지막 레버) ② Sanity CMS 연결(Work/News/Career) ③ 실제 자산(케이스·인터뷰·로고·자기소개 PDF) ④ Vercel 배포 ⑤ 고아 파일(`sections/home.tsx`·`ParticleField`) 정리.

## 1. 개요
- **프로젝트**: 이엑스코퍼레이션(EX Corporation) 공식 웹사이트. 실시간 XR / 버추얼 프로덕션 콘텐츠 기업. (HQ 판교, Studio 하남)
- **로컬 경로**: `/Users/ex/Documents/Claude-Projects/excorp-website`
- **실행**: `npm install` → `npm run dev` (http://localhost:3000) / `npm run build`
- **슬로건**: 기술의 연결로 경험을 확장하다 / All-in-One, Real-time XR Content Production

## 2. 스택
- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. **three.js 제거됨**(히어로 그리드는 정적 CSS 퍼스펙티브 + 캔버스 파티클 — §0 v3.1).
- 폰트: Poppins(영문) + Noto Sans KR(국문) + Geist Mono. CMS 예정: Sanity(미연결).

## 3. 디자인 시스템 (⚠ 아래는 v1 라이트 — §0/§0.1로 대체됨, 히스토리 참고용)
> **현재 테마는 전체 다크 product-led** + Wope 그리드/글래스 네브바(§0·§0.1·v3.1). 이 §3은 초기 라이트 시스템 기록이며 더는 라이브와 일치하지 않는다. 단일 기준 = `DESIGN.md §0` + `globals.css @theme`.
참조 톤(v1): kakaocorp.com — 화이트 배경, 여백, 잉크 타이포, **퍼플 1색 액센트**, 기술은 클린 다이어그램/UI로.
- 팔레트(리터럴 hex, Home·신규 페이지에서 사용): white `#FFFFFF` · paper `#F7F8FA` · pale `#F2F4F7` · ink `#0F1129` · body `#51545E` · muted `#7C8090` · line `#E5E7EB` · accent purple `#5E2EC0` · 다크 푸터/CTA `#0F1129`.
- `globals.css`의 `@theme` 시맨틱 토큰(`bg-bg/surface/border/fg/muted/primary` 등)은 **라이트값으로 리맵**되어 내부 페이지가 자동 라이트. `text-gradient-ex` = 퍼플→딥퍼플. focus ring = 퍼플.
- **Footer는 다크 네이비로 하드코딩**(라이트 사이트의 다크 앵커). Header는 항상 라이트(실제 로고 `ex-logo.png`).

## 4. IA / GNB (v2 — 적용 완료)
- **Solution ▾** — XR Solution(EXLINK) · Virtual Production
- **Product ▾** — Aximmetry(Reseller) · Moverse AI(Distributor) · RETracker(Distributor)
- **XR Studio** (대관/상품화)
- **Work** (도입 사례·포트폴리오 갤러리)
- **Company ▾** — About EX · News & Insight · Career
- CTA: 문의하기 / 유틸리티(Footer): Support · Contact · Privacy · Terms + 거점·연락처
- 데이터 출처: `src/lib/site.ts` (`nav`, `footerColumns`, `locations`, `site.contact`, `partners`)

## 5. 핵심 컴포넌트
- `src/components/home/HomeClean.tsx` — Home(다크, 8섹션): **`Hero`**(product-led + EXLINK Live Console) → §01 What We Do(`featgrid--wope`) → §02 EXLINK 아키텍처 → **FeaturedCase** → §03 Partner Products(`partner-bento`) → §04 XR Studio → §05 Numbers(`section--glow`) → **QuoteBand(가치 진술)** → **FAQ 아코디언** → **다크 CTA(`ctacard`)**. 배경 ink/surface/white 다크 교차.
- `src/components/home/Hero.tsx` — product-led 다크 히어로: 정적 CSS 퍼스펙티브 그리드(`.hero-grid`) + `HeroStars` 파티클 캔버스 + 인터랙티브 EXLINK Live Console(멀티캠 클릭→프로그램). ~~three.js Hero3D~~ **삭제됨**(§0 v3.1).
- `src/components/ui/MediaBlank.tsx` — 블랭크 미디어 플레이스홀더(태그·코너틱·라벨). 사진/영상 자산 없을 때 사용.
- `src/components/work/WorkGallery.tsx` — `"use client"` 필터형 갤러리(카테고리 pill, featured 2-col, empty state). **상단 TODO: Sanity 쿼리로 교체 + skeleton.**
- 공유(라이트, 토큰 기반): `components/page/PageHero.tsx`, `components/ui/SectionLabel.tsx`, `components/ui/Button.tsx`(glow 제거됨), `components/layout/{Header,Footer,CtaBanner}.tsx`.

## 6. 페이지 현황
| 경로 | 상태 |
|------|------|
| `/` (Home) | ✅ 다크 product-led — Hero(CSS 그리드+콘솔) + Wope 그리드/bento/FAQ/CTA |
| `/solution` | ✅ 라이트 |
| `/solution/xr-solution` (EXLINK) | ✅ **심층 재구성**(7섹션, 정직성 가드레일) |
| `/solution/virtual-production` | ✅ **심층 재구성**(8섹션, 교육형) |
| `/work` | ✅ 필터 갤러리(정적 데이터) |
| `/product` + `/product/{aximmetry,moverse,retracker}` | ✅ **1차 규격서 실사양 반영**(`docs/sales-products.md`) |
| `/xr-studio` (EX Studio) | ✅ **메뉴형 상품 재구성** — 차별점 + 콘텐츠 메뉴(탭+S/M/L, `components/studio/StudioMenu.tsx`) + 옵션 + 이용안내 + 시설스펙 + 견적 CTA |
| `/work` + `/work/[slug]` | ✅ **사례 상세 구축** — `lib/work.ts`(활용 시나리오 6건) · 갤러리 카드→상세 · 과제/해결/기대효과 템플릿 · 홈 CASE→상세 연결 |
| `/about` `/news` `/careers` (Company) | ✅ **재구성** — 좌측 에디토리얼 헤더 통일 · News 필터 실동작(`NewsList`) · **인사이트 2편**(`lib/insights.ts`, `/news/[slug]`) · 액센트 절제 |
| `/product` `/solution` (인덱스) | ✅ 재구성 — 좌측 헤더 통일 · Product 비교표/라인업 실사양 정합 |
| `/contact` `/support` | ✅ 재구성 — 좌측 헤더 통일 · "스튜디오 대관" → "제작" 포지셔닝 정합(폼·API·CtaBanner 포함) |
| `/privacy` `/terms` | ✅ 라이트 마이그레이션됨 (정책 문서) |

전 사이트 "대관(rental)" 표현 제거 완료 — "콘텐츠 제작" 포지셔닝으로 통일.

## 7. 콘텐츠 정직성 규칙 (반드시 유지)
- 파트너 제품(Aximmetry·Moverse·RETracker)은 **"연결·조율"**, 자체 개발 아님. 자체 개발 = **EXLINK 통합 코어**.
- LED Wall은 **업계 방식**으로만 소개(EX는 그린 크로마 + 실시간 트래킹). "후반 제로" ✗ → "최소화". "1프레임 미만"은 **목표**로 표기.
- 레퍼런스가 얇음(실질 ~1건) → **역량 기반 정직 포지셔닝**, 가짜 고객명/미검증 수치 금지. 고객 로고월은 동의 확보 후 단계적.

## 8. 자산
- `public/`: `ex-logo.png`(그라데이션 EX+그레이 CORP, 투명), `studio.png`, `vp-{chroma,set,workflow}.png`, `uc-{broadcast,fashion,event}.png`, `cert-{aximmetry,moverse,retracker}.png`, `retracker-{bliss,fizz}.png`, `aximmetry-hero.png`, `ex-cube.png`.
- 브랜드 가이드: `~/Documents/11_브랜드_디자인`, 이미지 소스: `~/Documents/10_사진_이미지소스`, CI 로고: `~/Documents/01_TIPS/이엑스_TIPS 서류/03_EX_CI.png`.
- **Figma**: 파일 key `KnNSwLmFImkgYjhscBPiBs` ("EX — Wireframes v2") — 와이어프레임(Home/Studio) + 하이파이 히어로(다크 XR / 클린 화이트) + Home clean 빌드.
- 기준 문서(IA/카피): Notion `CORP_PLAN` "EX 홈페이지 리뉴얼 마스터플랜 V2", EX Studio 상품화 보고서.

## 9. 다음 작업(백로그)
1. **제품 3종(Aximmetry/Moverse/RETracker) 심층 재구성** (Solution 페이지와 동일 깊이)
2. **Sanity CMS 연결** — `project`/`caseStudy` 스키마(클라이언트·NDA플래그·3축 facet[콘텐츠형/분야/솔루션]·featured·status) + WorkGallery 바인딩 + skeleton 로딩
3. **실제 콘텐츠** — EXLINK 구축사례 2~3건 · 고객 인터뷰 · 동의받은 고객 로고
4. **공개 대표 이메일 통일**(브랜드 감사 H-1) — `ax.excorp@gmail.com`/`soson@excorp.kr`/`@excorp.kr` 분기. `site.contact.email` + privacy/terms + JSON-LD를 `excorp.kr` 도메인 한 주소로 통일.
5. (선택) 토큰 우회 hex 정리(`MediaBlank`·`NewsList`·Footer hover), `work.ts` `scenario` 타입 정합, §01·§03 카드 차별화 강화
