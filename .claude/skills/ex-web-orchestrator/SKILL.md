---
name: ex-web-orchestrator
description: EX 웹사이트(excorp-website) 작업을 에이전트 팀으로 조율할 때 반드시 사용. 페이지·컴포넌트 구현, 디자인/UX/반응형/접근성 검토, 한글 카피, SEO, 코드 리뷰(품질·보안), 빌드·프리뷰 검증, Sanity CMS를 7개 전문 에이전트로 협업시킨다. "EX 사이트 작업", "페이지 만들어/수정", "섹션 추가", "디자인 검토하고 구현", "카피+디자인", "SEO 점검", "코드 리뷰", "병합 전 점검", 그리고 후속 작업("다시 실행", "재실행", "업데이트", "수정", "보완", "이전 결과 기반으로", "○○만 다시")에도 트리거. 단순 단일 질문은 직접 응답 가능.
---

# EX 웹 오케스트레이터

excorp-website 작업을 6개 전문 에이전트의 **에이전트 팀**으로 조율한다. 모든 Agent 호출은 `model: "opus"`.

## 팀 구성원 (`.claude/agents/`)
| 에이전트 | subagent_type | 담당 스킬 | 역할 |
|---|---|---|---|
| frontend-builder | general-purpose | ex-frontend-implementation | Next.js/React/Tailwind 구현 |
| design-ux-reviewer | general-purpose | ex-design-ux-review | 디자인·UX·반응형·접근성 검토 |
| content-brand-writer | general-purpose | ex-brand-copy | 한글 카피·정직성 |
| seo-specialist | general-purpose | ex-seo | 메타·JSON-LD·sitemap |
| code-reviewer | general-purpose | ex-code-review | diff 품질·보안 리뷰(병합 전) |
| qa-verifier | general-purpose | ex-qa-verify | 빌드·프리뷰·정합성 검증 |
| sanity-cms | general-purpose | ex-sanity | CMS 스키마·모델링 |

## Phase 0: 컨텍스트 확인 (실행 모드 판별)
1. `_workspace/` 존재 여부 확인.
   - 미존재 → **초기 실행**.
   - 존재 + 사용자가 부분 수정 요청 → **부분 재실행**(해당 에이전트만 재호출, 이전 산출물 읽고 개선).
   - 존재 + 새 입력 → **새 실행**(기존 `_workspace/`를 `_workspace_prev/`로 이동 후 시작).
2. 요청 규모를 보고 팀 크기를 정한다(소 2~3 / 중 3~5 / 대 5~7). 단일 에이전트로 충분한 사소한 작업은 팀 없이 해당 에이전트 1명만 호출한다.

## Phase 1: 작업 분해 & 팀 구성
1. 요청을 작업 유형으로 분해(구현 / 검토 / 카피 / SEO / CMS / 검증).
2. 필요한 에이전트만 `TeamCreate`로 팀 구성(불필요한 인원 제외 — 3명의 집중 팀 > 5명 산만).
3. `TaskCreate`로 작업·의존관계 등록.

## Phase 2: 표준 워크플로우 (생성–검증)
기본 흐름은 **입력 준비 → 구현 → 동작 검증 → 품질·보안 리뷰**:
```
[검토/카피/CMS 준비]        [구현]            [동작]          [코드 품질·보안]
design-ux-reviewer  ─┐
content-brand-writer ─┼─▶ frontend-builder ─▶ qa-verifier ─▶ code-reviewer ─▶ (커밋/배포 게이트)
seo-specialist       ─┤        ▲                  │               │
sanity-cms          ─┘        └─── 수정 요청 ◀────┴───────────────┘
```
- 디자인/카피/SEO/CMS 산출물이 먼저 나오고, frontend-builder가 통합 구현, **qa-verifier가 "돌아가는가"(빌드·렌더·정합성)**, **code-reviewer가 "옳고 안전한가"(diff 품질·보안)** 를 본다. 둘은 역할이 다르다.
- **점진 QA:** 모듈 단위로 완성 즉시 검증(전체 후 1회 금지). code-reviewer는 qa PASS 후 또는 커밋 직전에 diff를 본다.
- code-reviewer가 🔴Critical/🟠Major를 내면 **커밋·배포 보류** → frontend-builder 수정 → 재검증.
- 팀원은 `SendMessage`로 직접 조율, 진행은 `TaskUpdate`로 공유.

> **배포:** Vercel 배포는 사용자가 직접 수행한다(에이전트는 배포하지 않음). 배포 전 게이트 = qa-verifier PASS + code-reviewer 차단 이슈 없음. 대문자 이미지 파일명 등 배포 함정은 qa-verifier가 점검.

> **이미지 자산 생성:** 페이지/섹션에 들어갈 **새 이미지를 Figma 연결로 생성**해야 하면 `ex-image-orchestrator`(이미지팀: figma-art-director·image-generator·image-qc-reviewer)에 위임한다. 그 팀이 `public/`에 자산을 저장하고 사용 가이드(import 경로·`sizes`·`alt`)를 넘기면, frontend-builder가 코드에 반영한다.

## Phase 3: 데이터 전달
- **태스크 기반**(조율) + **메시지 기반**(실시간) + **파일 기반**(산출물).
- 중간 산출물은 `_workspace/{phase}_{agent}_{artifact}.{ext}`(예: `01_design_review.md`, `02_copy_hero.md`). 최종 결과만 실제 소스에 반영, `_workspace/`는 감사용 보존.

## Phase 4: 에러 핸들링
- 에이전트 실패: 1회 재시도 → 재실패 시 결과 없이 진행하고 **보고서에 누락 명시**.
- 상충 데이터(예: 디자인 권고 vs 카피 길이): 삭제하지 말고 출처 병기 후 사용자/리더 판단.
- qa-verifier FAIL: 담당 에이전트에 원인·파일·라인 반환 → 수정 → 재검증.

## Phase 5: 마무리 & 진화
- 결과 종합 보고(변경 파일·검증 결과·남은 항목).
- 사용자에게 개선점·팀 구성 피드백 기회를 제공한다(강요 X). 반영 시 `CLAUDE.md` 변경 이력에 기록한다.

## 테스트 시나리오
**정상 흐름:** "Solution 페이지 히어로 카피를 다듬고 모바일 반응형까지 손봐줘"
→ Phase 0 초기 실행 → 팀(content-brand-writer · design-ux-reviewer · frontend-builder · qa-verifier) → 카피안+검토 → 구현 → 모바일/데스크톱 검증 → 보고.

**에러 흐름:** qa-verifier가 tsc 오류 발견 → frontend-builder에 파일·라인 반환 → 수정 → 재검증 PASS → 진행. 재시도 후에도 실패하면 누락 명시 후 나머지 보고.

> 신규 에이전트/스킬 추가나 하네스 재구성이 필요하면 `harness:harness` 스킬로 처리한다(이 오케스트레이터는 실행 조율 전용).
