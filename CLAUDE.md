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

## 기준 문서 (Source of Truth)

IA·사이트맵·콘텐츠·카피의 단일 기준은 Notion `CORP_PLAN` DB의 **"EX 홈페이지 리뉴얼 마스터플랜 V2"** 다.
IA/카피 작업 전 항상 Notion에서 최신본을 확인한다. (첨부: `EX_full_copy.md`, `EX_wireframes_spec.md`)

- **슬로건**: 기술의 연결로 경험을 확장하다 (EXpand EXperiences) / All-in-One, Real-time XR Content Production Solution
- **사이트맵 (GNB v2 — `src/lib/site.ts`에 반영 완료)**:
  - Solution▾ — XR Solution(EXLINK, 자체 통합 솔루션) / Virtual Production
  - Product▾ — Aximmetry(Reseller) / Moverse AI(Distributor) / RETracker(Distributor)
  - XR Studio(대관·상품화) · **Work**(도입 사례·포트폴리오) · **Company▾**(About EX / News & Insight / Career)
  - 문의하기 CTA / 유틸리티(Footer): Support · Contact · Privacy · Terms + 거점·연락처
- **거점**: HQ 판교(성남 분당) / Studio 하남
- **사업 구조**: EXLINK(자체 통합 XR 솔루션) · EXEZ(무인 스튜디오, *V2 사이트에서는 제외 — 대표 컨펌 대기*) · 파트너 제품 유통(Aximmetry/Moverse/RETracker)
- **미션/비전/문화**: Notion RULEBOOK 운영-001·002. 단 Draft·Internal(온보딩용) → 외부 공개용 톤 재작성 필요
- SEO(검색 노출)·다중 CTA(상담·데모·대관·자료다운로드) 중요

## 기술 스택

- **Next.js 16 (App Router) + React 19 + TypeScript** — SSR/SSG 기반, SEO 최적화
- **Tailwind CSS v4** — **전체 다크 product-led** 디자인 시스템 (토큰은 `src/app/globals.css @theme`, 단일 기준은 `DESIGN.md §0`)
- **three.js 제거됨** — Home 히어로 배경은 정적 CSS 퍼스펙티브 그리드 + 캔버스 파티클(WebGL 미사용). 자세한 건 `HANDOFF.md §0 v3.1`
- **Sanity (Headless CMS)** — 블로그·채용·Work 갤러리 (스키마 예정, 미연결)
- **Vercel** — 배포 / 호스팅
- 문의/지원 폼 — Next.js API Route + 이메일 전송(추후 결정)

## AI 에이전트 팀

작업은 위 **하네스**(`ex-web-orchestrator`)로 조율한다. 에이전트(누가)·스킬(어떻게)의 단일 출처는 `.claude/agents/`(7종: frontend-builder·design-ux-reviewer·content-brand-writer·seo-specialist·code-reviewer·qa-verifier·sanity-cms)와 `.claude/skills/`다. 배포(Vercel)는 사용자가 직접 수행하며, 배포 전 게이트는 qa-verifier PASS + code-reviewer 차단 이슈 없음.

## 브랜드 자산

- 로고/브랜드 가이드: `~/Documents/11_브랜드_디자인`
- 이미지 소스: `~/Documents/10_사진_이미지소스`
- 서비스 단가표·소개 자료: `~/Documents/14_회사일반_이엑스`
