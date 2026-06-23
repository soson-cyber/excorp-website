# EX코퍼레이션 회사 홈페이지

이엑스코퍼레이션(EX Corporation) 공식 웹사이트 프로젝트입니다.

## ⚑ 현재 상태 — 먼저 읽기 (2026-06, 리뉴얼 v3 — 전체 다크 product-led)

**진행 상태·디자인 토큰·컴포넌트·페이지 현황·정직성 규칙·다음 작업의 단일 기준은 루트의 [`HANDOFF.md`](./HANDOFF.md) 다.** 새 세션은 이 파일을 먼저 확인할 것.

**디자인 시스템(컬러·타이포·컴포넌트·레이아웃·모션·깊이·가이드라인·반응형·접근성)의 9-섹션 스펙은 [`DESIGN.md`](./DESIGN.md) 다.** (KAOPU-XiaoPu/web-design "스펙 먼저, 코드 나중" 방법론 적용본 — 코드와 어긋나면 DESIGN.md 기준으로 맞춘다.)

요약:
- **테마 = 전체 다크 product-led** (Claude Design 핸드오프 구현). 표면: base#0E0626 ↔ raised#14112C 교차·카드#161232·footer#0F1129. 텍스트: fg#FFFFFF·muted#C3C6D6·faint#9094A9. 퍼플 텍스트는 라벤더#C4B5FD/violet#8B5CF6, 퍼플#5E2EC0은 채움용. **Glow/모션 허용**(버튼 헤일로·회전 보더·파티클·오로라 — `prefers-reduced-motion` 안전). 단일 기준 = `DESIGN.md §0` + `globals.css @theme`.
- `globals.css` `@theme` 토큰이 다크로 리맵됨 → 내부 페이지(시맨틱 토큰 사용)는 자동 다크. 키트 컴포넌트 CSS(`.hero/.console/.feat/.section/.btn` 등)도 globals.css에 포함.
- **Home**: `src/components/home/HomeClean.tsx` (히어로=`Hero.tsx` — product-led 다크 + 인터랙티브 EXLINK Live Console). **Work**: `src/components/work/WorkGallery.tsx` (필터 갤러리, Sanity 연결 예정 TODO).
- 다음 작업: 제품 3종 심층 재구성 → Sanity CMS 연결 → 실제 콘텐츠(케이스·인터뷰·로고). 자세한 건 HANDOFF.md §9.

## 하네스: EX 웹사이트 제작·운영

**목표:** excorp-website의 구현·디자인검토·카피·SEO·코드리뷰·검증·CMS를 7개 전문 에이전트 팀으로 조율해, DESIGN.md 정합·정직성·반응형·접근성을 지키며 빠르게 반복한다.

**트리거:** EX 사이트 작업(페이지/컴포넌트 구현·수정, 디자인/UX 검토, 한글 카피, SEO, 코드 리뷰, 빌드·프리뷰 검증, Sanity 모델링)과 그 후속(재실행·수정·보완) 요청 시 `ex-web-orchestrator` 스킬을 사용하라. 단순 단일 질문은 직접 응답 가능. 하네스 자체의 재구성·확장·점검은 `harness:harness` 스킬로 처리한다. 에이전트(누가)·스킬(어떻게)의 단일 출처는 `.claude/agents/`·`.claude/skills/`다.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-03 | 초기 구성 (6인: frontend-builder·design-ux-reviewer·content-brand-writer·seo-specialist·qa-verifier·sanity-cms + ex-web-orchestrator) | 전체 | - |
| 2026-06-03 | code-reviewer(+ex-code-review) 추가 → 7인 | agents/code-reviewer.md · skills/ex-code-review · 오케스트레이터 | 품질·보안 코드 리뷰 갭 보완 |
| 2026-06-03 | 범용 "AI Team Configuration" 표 제거, 하네스로 일원화 | CLAUDE.md | 신규 하네스와 중복·혼선 제거 |
| 2026-06-03 | 스킬 보강 — 컴포넌트·폴더 구조 관례 / OWASP Top 10 대조 | skills/ex-frontend-implementation · ex-code-review | harness-100(16·21·36) 패턴 참고 |
| 2026-06-05 | 이미지 생성팀 추가 (3인: figma-art-director·image-generator·image-qc-reviewer + ex-image-orchestrator) — Figma 연결 Nano Banana(Gemini) 이미지 생성·검증·납품 | agents/* · skills/ex-figma-image-bridge · ex-image-generation(+scripts) · ex-image-qc · ex-image-orchestrator | 홈페이지 이미지를 Figma와 연결해 생성하는 팀 필요 |
| 2026-06-05 | 이미지 엔진 듀얼화 — **GPT 이미지(OpenAI gpt-image-1)를 기본 엔진으로 추가**, Nano Banana(Gemini) 보존. 동일 CLI 계약 | skills/ex-image-generation(+scripts/openai_generate.py) · agents/image-generator · ex-image-orchestrator | 사용자 요청: Figma에 GPT API 연결 |

## 기준 문서 (Source of Truth)

IA·사이트맵·콘텐츠·카피의 단일 기준은 Notion `CORP_PLAN` DB의 **"EX 홈페이지 리뉴얼 마스터플랜 V2"** 다.
IA/카피 작업 전 항상 Notion에서 최신본을 확인한다. (첨부: `EX_full_copy.md`, `EX_wireframes_spec.md`)

- **슬로건**: 기술의 연결로 경험을 확장하다 (EXpand EXperiences) / All-in-One, Real-time XR Content Production Solution
- **사이트맵 (GNB v2 — `src/lib/site.ts`에 반영 완료)**:
  - Solution▾ — XR Solution(EXLINK, 자체 통합 솔루션) / Virtual Production
  - Product▾ — Aximmetry(Reseller) / Moverse AI(Distributor) / RETracker(Distributor)
  - XR Studio(대관·상품화) · **Work**(도입 사례·포트폴리오) · **Company▾**(About EX / News & Insight / Career)
  - 문의하기 CTA / 유틸리티(Footer): Support · Contact · Privacy · Terms + 거점·연락처
- **거점**: EX AI Office(경기 성남시 수정구 금토동 327, 스타트업스퀘어 B동 3층) / EX XR Studio(경기 하남시 미사대로 540). *단일 출처는 `src/lib/site.ts`의 `locations`.*
- **사업 구조**: EXLINK(자체 통합 XR 솔루션) · EXEZ(무인 스튜디오, *V2 사이트에서는 제외 — 대표 컨펌 대기*) · 파트너 제품 유통(Aximmetry/Moverse/RETracker)
- **미션/비전/문화**: Notion RULEBOOK 운영-001·002. 단 Draft·Internal(온보딩용) → 외부 공개용 톤 재작성 필요
- SEO(검색 노출)·다중 CTA(상담·데모·대관·자료다운로드) 중요

## 기술 스택

- **Next.js 16 (App Router) + React 19 + TypeScript** — SSR/SSG 기반, SEO 최적화
- **Tailwind CSS v4** — **전체 다크 product-led** 디자인 시스템 (토큰은 `src/app/globals.css @theme`, 단일 기준은 `DESIGN.md §0`)
- **three.js 제거됨** — Home 히어로 배경은 캔버스 파티클 + CSS 글로우/오로라(WebGL·퍼스펙티브 그리드 미사용). 자세한 건 `HANDOFF.md §0 v3.1`
- **Sanity (Headless CMS)** — 블로그·채용·Work 갤러리 (스키마 예정, 미연결)
- **Cloudflare Workers + OpenNext** — 실제 운영 배포 / 호스팅 (`wrangler.jsonc`, `open-next.config.ts`, `npm run cf:deploy`)
- 문의/지원 폼 — Next.js API Route + Notion DB 저장/이메일 전송(추후 결정)

## AI 에이전트 팀

작업은 위 **하네스**로 조율한다. 두 오케스트레이터가 도메인별로 나뉜다:
- **웹 제작·운영** → `ex-web-orchestrator` (7종: frontend-builder·design-ux-reviewer·content-brand-writer·seo-specialist·code-reviewer·qa-verifier·sanity-cms).
- **이미지 자산 생성(Figma 연결)** → `ex-image-orchestrator` (3종: figma-art-director·image-generator·image-qc-reviewer). Figma 원본에서 사양을 읽어 생성·QC 후 `public/`+Figma에 납품. 엔진은 듀얼: **기본 GPT 이미지(OpenAI gpt-image-1) / 대안 Nano Banana(Gemini)**. **1회 셋업 필요(둘 중 택1): GPT=`OPENAI_API_KEY`+`pip install openai pillow`, Gemini=`GEMINI_API_KEY`+`pip install google-genai pillow`.**

에이전트(누가)·스킬(어떻게)의 단일 출처는 `.claude/agents/`·`.claude/skills/`다. 배포는 **Cloudflare Workers + OpenNext** 기준이며, 배포 전 게이트는 qa-verifier PASS + code-reviewer 차단 이슈 없음. 실제 운영 확인: `https://excorp.kr` / `https://excorp.kr/en`.

## 코딩 운영 원칙 (Karpathy Guidelines 반영)

LLM 코딩 실수(과잉 구현·묵시적 추정·불필요한 리팩터링)를 줄이기 위해 다음을 기본 원칙으로 둔다.

- **코딩 전 사고:** 구현 전에 가정·불확실성·해석 차이를 드러낸다. 요구가 모호하면 조용히 임의 선택하지 말고 확인한다. 더 단순한 방법이 있으면 먼저 제안한다.
- **단순성 우선:** 요청된 문제를 해결하는 최소 변경만 한다. 단일 사용처를 위한 추상화, 미요청 옵션/설정, 미래 확장성 명목의 코드 추가를 피한다. 200줄이 50줄로 가능하면 줄인다.
- **외과적 변경:** 사용자 요청과 직접 연결되는 줄만 수정한다. 주변 코드·포맷·주석을 “개선”하지 않는다. 기존 스타일을 따른다. 무관한 dead code는 발견 사실만 보고하고 삭제하지 않는다.
- **내 변경의 부산물 정리:** 내가 만든 변경으로 unused import/변수/함수가 생기면 제거한다. 단, 기존에 이미 죽어 있던 코드는 요청 없이는 건드리지 않는다.
- **검증 가능한 목표:** 버그 수정은 재현 테스트/확인 절차를 먼저 정하고, 기능 추가·리팩터링은 성공 기준과 검증 명령을 명확히 한다. 멀티스텝 작업은 `작업 → 검증` 형태의 짧은 계획으로 진행하고 실제 검증 결과를 남긴다.

## 브랜드 자산

- 로고/브랜드 가이드: `~/Documents/11_브랜드_디자인`
- 이미지 소스: `~/Documents/10_사진_이미지소스`
- 서비스 단가표·소개 자료: `~/Documents/14_회사일반_이엑스`
