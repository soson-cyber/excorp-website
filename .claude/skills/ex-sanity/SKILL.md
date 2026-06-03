---
name: ex-sanity
description: EX 웹사이트의 Sanity Headless CMS(스키마 설계·Portable Text·콘텐츠 모델링·GROQ·타입 생성)를 다룰 때 반드시 사용. News & Insight, Career, Work 갤러리의 콘텐츠 모델링. "Sanity", "CMS", "스키마", "콘텐츠 모델", "블로그 연동", "Portable Text", "GROQ" 등에 트리거.
---

# EX Sanity CMS

EX 웹사이트의 동적 콘텐츠(News & Insight, Career, Work 도입 사례)를 Sanity로 모델링한다. 현재 미연결 — 스키마 설계부터 시작한다.

## 콘텐츠 모델링 원칙
- **페이지가 아니라 재사용 콘텐츠 타입**으로 모델링: `post`(News), `caseStudy`(Work), `jobPosting`(Career), `author`, `category`, 공용 `seo` 오브젝트 등. 필드/IA는 Notion `CORP_PLAN` 마스터플랜 V2 기준.
- 공식 베스트프랙티스 스킬을 우선 참조: `sanity:content-modeling-best-practices`, `sanity:portable-text-conversion`/`portable-text-serialization`, `sanity:seo-aeo-best-practices`, `sanity:sanity-best-practices`. 스키마 배포·타입 생성은 `sanity:deploy-schema`·`sanity:typegen` 활용.

## Portable Text
- 본문은 Portable Text. 커스텀 serializer로 다크 product-led 디자인(키트 클래스 `.lead`/`.card` 등)에 맞춰 렌더. 코드블록·이미지·인용 등 커스텀 마크 정의.

## GROQ·이미지·타입
- 쿼리는 **페이지가 필요한 필드만**(과다 페치 금지). 목록/상세 쿼리 분리.
- 이미지: `@sanity/image-url`로 반응형 URL, `next/image`와 연동(소문자·sizes 규칙은 ex-frontend-implementation 따름).
- `sanity typegen`으로 스키마→TS 타입 생성 → frontend-builder가 strict로 사용.

## 시크릿·안전
- projectId·dataset·토큰 등 시크릿을 코드에 하드코딩하지 않는다. `.env` 설정은 **사용자가 직접** 하도록 안내하고, 키를 제3자/로그에 노출하지 않는다.
- 정직성: 콘텐츠는 실제 데이터만. 더미·테스트는 명확히 라벨.

## 출력
스키마·GROQ·serializer 명세 + frontend-builder 연동 지점. 스키마 변경이 기존 콘텐츠에 영향을 주면 마이그레이션 영향을 먼저 보고하고, qa-verifier에 타입·빌드 검증을 요청한다.
