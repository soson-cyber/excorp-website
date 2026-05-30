# EX Corporation Website — Handoff Brief

> 다른 Claude 세션/환경(또는 협업자)이 이 프로젝트를 이어받기 위한 단일 인수인계 문서.
> 이 파일 + `CLAUDE.md` + Figma 파일만 있으면 맥락 복원이 가능합니다.

## 1. 개요
- **프로젝트**: 이엑스코퍼레이션(EX Corporation) 공식 웹사이트. 실시간 XR / 버추얼 프로덕션 콘텐츠 기업. (HQ 판교, Studio 하남)
- **로컬 경로**: `/Users/ex_ceo/Documents/Claude/Projects/excorp-website`
- **실행**: `npm install` → `npm run dev` (http://localhost:3000) / `npm run build`
- **슬로건**: 기술의 연결로 경험을 확장하다 / All-in-One, Real-time XR Content Production

## 2. 스택
- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · three.js (히어로 3D)
- 폰트: Poppins(영문) + Noto Sans KR(국문) + Geist Mono. CMS 예정: Sanity(미연결).

## 3. 디자인 시스템 (현재 = 라이트/화이트)
참조 톤: kakaocorp.com — 화이트 배경, 여백, 잉크 타이포, **퍼플 1색 액센트**, 기술은 클린 다이어그램/UI로. **버튼·섹션 Glow 금지(플랫)**.
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
- `src/components/home/HomeClean.tsx` — Home(9섹션): 3D 히어로 → §01 What We Do → §02 EXLINK 아키텍처 허브 → **FeaturedCase(EXLINK 구축사례)** → §03 Partner Products(+공식 파트너 크리덴셜 행) → §04 XR Studio(실사) → §05 Numbers → **QuoteBand(고객 인터뷰)** → **다크 CTA(푸터 브릿지)**. 배경 white/paper 교차.
- `src/components/three/Hero3D.tsx` + `Hero3DStage.tsx` — three.js 와이어프레임 정이십면체(회전), `ssr:false`, prefers-reduced-motion 정지, 완전 cleanup.
- `src/components/ui/MediaBlank.tsx` — 블랭크 미디어 플레이스홀더(태그·코너틱·라벨). 사진/영상 자산 없을 때 사용.
- `src/components/work/WorkGallery.tsx` — `"use client"` 필터형 갤러리(카테고리 pill, featured 2-col, empty state). **상단 TODO: Sanity 쿼리로 교체 + skeleton.**
- 공유(라이트, 토큰 기반): `components/page/PageHero.tsx`, `components/ui/SectionLabel.tsx`, `components/ui/Button.tsx`(glow 제거됨), `components/layout/{Header,Footer,CtaBanner}.tsx`.

## 6. 페이지 현황
| 경로 | 상태 |
|------|------|
| `/` (Home) | ✅ 클린 화이트 + 실제 3D + 신뢰/사례/인용/다크CTA |
| `/solution` | ✅ 라이트 |
| `/solution/xr-solution` (EXLINK) | ✅ **심층 재구성**(7섹션, 정직성 가드레일) |
| `/solution/virtual-production` | ✅ **심층 재구성**(8섹션, 교육형) |
| `/work` | ✅ 필터 갤러리(정적 데이터) |
| `/product` + `/product/{aximmetry,moverse,retracker}` | ✅ **1차 규격서 실사양 반영**(`docs/sales-products.md`) |
| `/xr-studio` (EX Studio) | ✅ **메뉴형 상품 재구성** — 차별점 + 콘텐츠 메뉴(탭+S/M/L, `components/studio/StudioMenu.tsx`) + 옵션 + 이용안내 + 시설스펙 + 견적 CTA |
| `/about` `/news` `/careers` (Company) | ✅ **재구성** — 좌측 에디토리얼 헤더 통일 · News 필터 실동작(`components/news/NewsList.tsx`, 실 마일스톤만) · 액센트 절제 |
| `/support` `/contact` `/privacy` `/terms` | ✅ 라이트 마이그레이션됨 (재구성 미진행) |

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
4. (선택) §01·§03 카드 차별화 강화, 고객 로고월, 다크 내부페이지의 추가 폴리시
