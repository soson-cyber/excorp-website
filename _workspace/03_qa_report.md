# QA 검증 리포트 — 전체 사이트 콘텐츠·레이아웃 재빌드

- 일자: 2026-06-10
- 검증자: qa-verifier
- 대상: 전체 사이트 콘텐츠·레이아웃 재빌드 직후 (Home/Hero/CtaBanner/site.ts/layout.tsx + 내부 페이지 전체 + src/components/seo/JsonLd.tsx 신규)
- 작업 폴더: /Users/ex/Documents/Claude-Projects/excorp-website-rebuild
- **전체 판정: PASS**

---

## 1. 빌드 — `npm run build` — PASS
- `✓ Compiled successfully in 3.1s`, TypeScript 통과, 정적 페이지 41/41 생성.
- 전 라우트 정상 등록(/, /solution, /solution/xr-solution, /solution/virtual-production, /product, /product/{aximmetry,moverse,retracker}, /xr-studio, /work, /work/[slug]×6, /news, /news/[slug]×11, /about, /careers, /contact, /support, /privacy, /terms, sitemap, robots).
- 에러·경고 없음.

## 2. 타입·린트 — PASS
- `npx tsc --noEmit` → exit 0, 출력 없음.
- `npx eslint src` → exit 0, 출력 없음.

## 3. 렌더 정합성 (production `next start` @ :3100, curl) — PASS
- 9개 핵심 페이지 전부 HTTP 200: /, /solution, /solution/xr-solution, /solution/virtual-production, /product, /product/aximmetry, /xr-studio, /work, /contact.
- ① **Problem Quote Trio (Home)** — PASS. 3개 인용문 모두 렌더 확인: "세트 하나 바꾸는 데 수천만 원…", "버추얼 프로덕션, 어디서부터…", "라이브 방송 중에 시스템이 멈추면…". `quote-txt` 클래스 정상.
- ② **Work 인덱스 = 갤러리 6건 (≠ ComingSoon)** — PASS. `src/lib/work.ts`의 6개 시나리오(실시간 XR 방송 시스템 통합 / 실시간 크로마 합성 컨퍼런스 / 기업 IR 발표 영상 / 기업 웨비나 라이브 / 버추얼 패션 필름 / 언리얼 기반 가상 세트) 전부 노출. ComingSoon류 배너 없음. 빌드 산출물의 work/[slug] 6경로와 일치.
- ③ **JSON-LD head 주입 + 유효 JSON** — PASS.
  - 페이지별 breadcrumb/Product/FAQ/LocalBusiness 스키마는 SSR로 `<script type="application/ld+json">` 주입. 예: /product/aximmetry는 1개 script에 `[BreadcrumbList, Product, FAQPage]` 배열 — `json.loads` 파싱 성공(유효 JSON).
  - 전역 Organization/WebSite 스키마는 layout.tsx `next/script strategy="afterInteractive"`로 주입(payload에 존재 확인).
- ④ **CtaBanner 쇼룸 CTA** — PASS(설계대로). 전 콘텐츠 페이지(solution·product·work·about·news·support·careers 계열)에 "Visit the Studio" / "하남 스튜디오 체험 예약" CTA 노출. **/xr-studio·/contact는 의도적 제외**(스튜디오 자기참조 회피·전환 종착 페이지). Home은 별도 인라인 스튜디오 체험 CTA 보유. 원본 레포(excorp-website)와 CtaBanner 적용 페이지 집합 동일 → 회귀 없음.

## 4. 경계면 정합 (site.ts 단일 출처) — PASS
- `src/lib/site.ts`가 sameAs / contact / locations의 단일 출처.
- `layout.tsx` Organization 스키마: `email: site.contact.email`, `telephone: telE164`, `sameAs`(site.ts) 사용 → instagram/excorp_kr · facebook/EXCorp.Story · youtube/@excorp_kr 일치 확인.
- `Footer.tsx`: `site`, `footerColumns`, `locations` import — social·tel·fax·email·거점 전부 site.ts 소비.
- `contact/page.tsx`: `locations`, `site` import — tel·fax·email·거점·social 전부 site.ts 소비.
- 3곳 모두 단일 출처 일관 반영.

## 5. 배포 함정 (대문자 이미지 파일명 등) — PASS
- `public/`에 대문자 확장자(.JPG/.PNG/.WEBP/.JPEG/.GIF/.SVG) 파일 0건.
- xr-studio 이미지 참조(studio-bg-01~08.jpg, studio_01~03.jpeg) 11건 전부 실제 파일 존재.
- 주의(비차단): `src/components/ui/MediaBlank.tsx`의 `/xr/hero-loop.mp4|.webm`, `/xr/hero-poster.jpg`, `/xr/studio.jpg` 참조는 **JSDoc 주석 내 향후 교체 예시일 뿐 실행 코드 아님**(컴포넌트는 src 미지정 시 디자인된 플레이스홀더 렌더). 원본 레포에도 동일하게 public/xr 없음. 회귀 아님.

## 6. 메뉴/사이트맵 구조 무변경 — PASS
- `diff src/lib/site.ts` (원본 excorp-website 대비): **유일한 차이는 `sameAs` export 추가(21a22~29)**. nav·footerColumns·locations 구조는 완전 동일.
- `diff src/app/sitemap.ts`: **바이트 동일(IDENTICAL)**. staticRoutes 17개 + works·insights 동적 동일.

---

## FAIL 목록
- 없음.

## 비차단 메모
- MediaBlank의 /xr/* 참조는 주석 예시(미실행) — 실제 영상/이미지 교체 시 소문자 파일명으로 public/xr에 배치 필요(컴포넌트 가이드대로).
- _workspace의 기존 산출물(qa_shots 등)이 git상 deleted 상태 — 이번 검증과 무관(재빌드 정리 과정으로 추정).
