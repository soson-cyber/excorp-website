---
name: ex-seo
description: EX 웹사이트의 검색 노출(SEO)을 설계·점검할 때 반드시 사용. Next.js App Router 메타데이터, JSON-LD 구조화 데이터, sitemap·robots, Open Graph. "SEO", "메타데이터", "구조화 데이터", "sitemap", "검색 노출", "OG 태그", 새 페이지 추가 시 메타 점검 등에 트리거.
---

# EX SEO·구조화 데이터

Next.js 16 App Router 기준으로 검색 노출 자산을 설계·점검한다. 카피·라벨은 ex-brand-copy의 정직성 규칙을 따른다.

## 메타데이터 (App Router)
- 각 라우트에 `export const metadata` 또는 `generateMetadata`로 title·description·alternates.canonical·openGraph·twitter 정의.
- 루트 레이아웃에 `metadataBase`(사이트 절대 URL) 설정 → OG·canonical 절대경로 자동화.
- title 패턴: `"{페이지} — 이엑스(EX Corporation)"`. description은 합니다체·155자 내외·핵심 키워드 자연 포함.
- 키워드: 실시간 XR · 버추얼 프로덕션 · EXLINK · Aximmetry/Moverse/RETracker · 판교/하남 · XR 스튜디오.

## 구조화 데이터 (JSON-LD)
`<script type="application/ld+json">`로 주입. 허위·과장 속성 금지.
- **Organization:** EX Corporation, 거점(판교 본사·하남 스튜디오), 연락처(contact@excorp.kr), sameAs(공식 채널만).
- **WebSite**, **BreadcrumbList**(내부 페이지), 제품/문서엔 적합 스키마.
- 라벨 정확히(리셀러/총판) — 정직성 규칙 준수.

## sitemap / robots
- `app/sitemap.ts`·`app/robots.ts`를 최신 라우트와 동기화. 비공개·중복·법무 외 페이지 포함, 중복 title 점검.
- 동적 라우트(Work/News 등 Sanity 연결 후)는 콘텐츠 소스에서 URL을 생성하도록 설계.

## 점검 체크
새 페이지 추가 시: title/description 존재·중복 없음 · canonical 정확 · OG 이미지 지정 · sitemap 등록 · JSON-LD 유효(허위 속성 없음).

## 출력
변경안을 코드 스니펫 또는 frontend-builder 위임용 명세로 제출하고, qa-verifier에 빌드 검증을 요청한다.
