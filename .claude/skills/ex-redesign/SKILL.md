---
name: ex-redesign
description: EX 웹사이트 전면 UI·UX 리디자인 프로그램(감사→전략→디자인 방향 3안→선택안 상세설계·개발전달)을 수행할 때 반드시 사용. "리디자인", "재설계", "UI/UX 개선", "디자인 방향/시안/목업 뽑아줘", "홈 개편안", "IA 재검토", "디자인 감사" 요청과 그 후속("방향 2로 진행", "감사 다시", "목업 수정", "선택안 상세화", "개발 전달 문서") 요청 시 트리거. 개별 컴포넌트의 구현 레벨 검토는 ex-design-ux-review, 실제 코드 구현은 ex-frontend-implementation/ex-web-orchestrator가 담당한다.
---

# EX 리디자인 프로그램

담당 에이전트: `redesign-director` (model: opus). 브리프 전문은 `references/redesign-brief.md`,
**카피·메시지 거버넌스는 `references/copy-governance.md` — 브리프보다 우선하며 모든 Phase 시작 전에 읽는다.**

## Phase 0: 컨텍스트 확인

1. `references/copy-governance.md`를 읽는다 (확정 카피·금지어·유지 결정·현재 기준선).
2. `_workspace/redesign/` 존재 확인:
   - 없음 → 초기 실행 (Phase 1부터)
   - 있음 + 부분 수정 요청 → 해당 Phase 산출물만 갱신
   - 있음 + 새 브리프/방향 전환 → 기존을 `_workspace/redesign_prev/`로 이동 후 새 실행
3. 프리뷰 서버 확인(launch.json `ex-web`). 감사 대상 = 프리뷰(미배포 수정 반영). 운영 excorp.kr은 참고.
4. 사용자가 특정 Phase를 지목하면 해당 Phase로 직행하되, 선행 산출물이 없으면 먼저 만든다.

## Phase 1: 감사 (Audit)

브리프 §작업 절차 1~3을 따른다. 요점:

- **캡처:** Desktop 1440 / Tablet 768 / Mobile 390. 주요 10개 상태(홈 첫 화면·내비/모바일 메뉴·홈 섹션·Solution+EXLINK·Product+상세·Studio·Work·Company(/about)·문의 흐름·KO/EN 전환). 각 캡처에 페이지·뷰포트·확인일 기록.
  - 알려진 한계: 이 환경의 스크린샷은 페이지 상단만 신뢰 가능(중단 섹션 스테일 프레임). 중단은 렌더 DOM/텍스트 분석으로 대체하고 산출물에 명시한다. 실기기 확인 필요 항목은 별도 표기.
- **평가 축:** 브랜드·메시지(※ 슬로건 기준은 거버넌스 §1의 신규 문장) / 정보구조 / 사용자 흐름 / 신뢰 / UI·시각 / 인터랙션 / 접근성(WCAG 2.2 AA).
- **문제 표:** `| ID | 화면·단계 | 문제 | 사용자 영향 | 사업 영향 | 근거 | 우선순위(P0~P3) | 권장 조치 |` — 구조 문제와 시각 다듬기를 구분.
- 산출: `_workspace/redesign/phase1_audit.md` (+ 캡처는 `_workspace/redesign/captures/`).

## Phase 2: 전략 (Strategy)

- 재설계 원칙 / 핵심 사용자·과업(브리프의 8개 질문) / IA 재검토(브리프의 시작 가설을 검증하되, 거버넌스 §5 기준선과 §3 Work 게이트를 존중) / 페이지별 역할 / 목적별 전환 흐름(CTA 5종: 도입 상담·시연 요청·스튜디오 방문/제작·소개서 요청·기술지원 — "문의하기" 단일화 금지) / 콘텐츠 전략 / 필요한 실제 자산 목록.
- 산출: `phase2_strategy.md`.

## Phase 3: 디자인 방향 3안 (Directions) — 게이트

- **서로 충분히 다른 3안** (정보 밀도·내러티브·시각 언어·인터랙션이 달라야 함. 색 변형 금지).
- 각 안: 방향명·핵심 콘셉트·브랜드 인상·색 체계·타이포·이미지 전략·인터랙션 원칙·홈 주요 섹션·장점·위험·EX 적합 이유.
- 각 안의 Desktop Home / Mobile Home / EXLINK 핵심 화면 목업 — HTML 프로토타입(권장, `captures/direction{n}/`) 또는 정적 이미지.
- 시각 방향 원칙(브리프 §시각 방향): 방송 제어실의 정밀함, 네온·글래스모피즘·무의미 파티클 금지, 다크면 대비 확보, 실제 시스템·스튜디오·사람 중심 자산.
- 추천안과 이유를 명시하고 **대표 선택을 요청한다. 선택 전에는 전 페이지 구현 금지.**
- 산출: `phase3_directions.md` + 목업.

## Phase 4: 선택안 상세설계 (선택 후에만)

- 13개 화면 설계(브리프 §선택 방향 상세 설계 목록: Home~Consultation Form + Loading/Empty/Error/Success). 화면마다 목적·대상·핵심 메시지·콘텐츠 순서·CTA·인터랙션·반응형·접근성 명시.
- 디자인 시스템(토큰·타이포·간격·그리드·컴포넌트 상태), 모션 원칙(`prefers-reduced-motion`), 성능 기준(Core Web Vitals), 카피 변경표(원문 vs 수정안 + 이유 — 거버넌스 §1·§2 준수).
- 개발 전달: 페이지별 구조·컴포넌트 목록·인터랙션 명세·에셋 목록·분석 이벤트 제안·구현 우선순위 → `ex-web-orchestrator`(frontend-builder)로 인계.
- 산출: `phase4_screens.md` `phase4_design-system.md` `phase4_handoff.md`.

## 협업 라우팅

- 구현 레벨 세부 검토(토큰 일탈·반응형 버그) → `design-ux-reviewer` + `ex-design-ux-review`
- 카피 신규/수정 문안 → `content-brand-writer` + `ex-brand-copy` (+ writing-quality-editor)
- 뷰포트 캡처·빌드 검증 → `qa-verifier` + `ex-qa-verify`
- 프로덕션 구현 → `ex-web-orchestrator`

## 에러 핸들링

- 캡처 실패 → DOM/텍스트 분석 대체 + 산출물에 한계 명시. 접근 불가 페이지 → "확인 불가 항목"으로 보고.
- 브리프·거버넌스 충돌, 사이트 실콘텐츠·회사 맥락 충돌 → 임의 수정 금지, 충돌 표로 대표에 보고.
- 자산 부재(로고 SVG·실사 등) → 요청 목록(최대 5개)에 올리고, 없이도 가능한 감사부터 진행.

## 테스트 시나리오

- 정상: "리디자인 진행해" → Phase 0 확인 → Phase 1 감사 산출 → P0~P3 보고 → Phase 2~3 → 3안 제시 + 선택 요청 → 선택 후 Phase 4.
- 에러: 프리뷰 다운 → ex-web 재기동 시도, 실패 시 운영 사이트로 감사하되 "미배포 수정 미반영" 경고를 모든 산출물에 표기.
- 후속: "방향 2로 상세 진행" → phase3_directions.md 확인 → Phase 4만 실행.
