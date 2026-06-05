---
name: ex-image-orchestrator
description: EX 웹사이트에 들어갈 이미지를 Figma와 연결해 생성하는 3인 이미지팀을 조율할 때 반드시 사용. Figma 원본에서 필요한 이미지 사양을 읽어(브리프) → GPT 이미지(OpenAI, 기본) 또는 Nano Banana(Gemini)로 생성 → 브랜드 QC → Figma 업로드 + public/ 저장까지 자동화한다. "홈페이지 이미지 만들어", "히어로 비주얼 생성", "Figma 이미지 채워넣어", "GPT 이미지", "섹션 배경/제품샷 이미지", "이미지 생성팀", 그리고 후속("다시 생성", "재생성", "이 이미지만 다시", "업데이트", "수정", "보완") 요청 시 트리거. 실제 코드 구현은 ex-web-orchestrator로, 하네스 재구성은 harness:harness로.
---

# EX 이미지 오케스트레이터

홈페이지 이미지를 **Figma 연결 → 생성 → 검증 → 납품**까지, 3인 **에이전트 팀**으로 조율한다. 모든 Agent 호출은 `model: "opus"`.

## 팀 구성원 (`.claude/agents/`)
| 에이전트 | subagent_type | 담당 스킬 | 역할 |
|---|---|---|---|
| figma-art-director | general-purpose | ex-figma-image-bridge | Figma 측정→브리프 / 완성본 업로드+public 저장 |
| image-generator | general-purpose | ex-image-generation | 브랜드 프롬프트 + Nano Banana 생성·재생성 |
| image-qc-reviewer | general-purpose | ex-image-qc | 브랜드·아티팩트·정직성 검수 게이트 |

**실행 모드: 에이전트 팀** (생성–검증 파이프라인 + 납품 루프). `TeamCreate` + `TaskCreate` + `SendMessage`로 자체 조율.

## Phase 0: 컨텍스트 확인 (실행 모드 판별)
1. **셋업 게이트(최우선):** image-generator가 첫 생성 전에 엔진 키·라이브러리를 확인한다 — **기본 GPT 이미지 = `OPENAI_API_KEY` + `openai`**, 대안 Gemini = `GEMINI_API_KEY` + `google-genai`. 가용 키가 하나도 없으면 `ex-image-generation` 스킬의 "1회 셋업"을 사용자에게 안내하고 **여기서 멈춘다**(키는 사용자만 발급 가능 — 추측 진행 금지). 둘 다 있으면 GPT 기본.
2. `_workspace_img/` 존재 여부:
   - 미존재 → **초기 실행**.
   - 존재 + 특정 이미지만 수정 요청 → **부분 재생성**(해당 id의 브리프·프롬프트만 재사용해 image-generator→QC만 재호출).
   - 존재 + 새 페이지/배치 → **새 실행**(기존 `_workspace_img/`를 `_workspace_img_prev/`로 이동 후 시작).

## Phase 1: 인테이크 & 팀 구성
1. 대상 범위 확인(기본 Home, 또는 사용자 지정 페이지/섹션). 이미지 수에 따라 팀 크기 결정(보통 3인 전원; 단일 이미지 빠른 수정은 generator+QC 2인).
2. `TeamCreate`로 팀 구성, `TaskCreate`로 이미지별 작업·의존(brief→gen→qc→deliver) 등록.
3. figma-art-director가 `01_briefs.json` 산출. **재사용 가능한 기존 자산은 생성 대상에서 제외**하고 사용자에게 알린다(불필요한 생성·비용 방지).

## Phase 2: 생성–검증 루프 (이미지별, 점진)
```
[Figma 인테이크]        [생성]              [검증 게이트]         [납품]
figma-art-director ─▶ image-generator ─▶ image-qc-reviewer ─┬─PASS─▶ figma-art-director
   (브리프)           (GPT/Gemini)         (브랜드/정직성)   │        (Figma 업로드 + public/)
                            ▲                                 │
                            └────────── FAIL: 수정 지시 ◀──────┘
```
- **점진 처리:** 이미지를 한 장씩 brief→gen→qc→deliver로 흘린다(배치 전체 생성 후 무더기 검수 금지). 독립 이미지는 병렬 가능.
- QC **FAIL** → image-generator가 직전 프롬프트 델타만 수정해 재생성 → 재검수. **HOLD**(미감 애매) → 사용자 확인. **2회 연속 FAIL** → art-director 브리프 재검토.
- PASS만 납품. 납품은 **public/ 저장 먼저(필수)**, 그다음 Figma 업로드.

## Phase 3: 데이터 전달
- **태스크 기반**(조율) + **메시지 기반**(실시간) + **파일 기반**(산출물).
- 작업 디렉토리: `_workspace_img/` — `01_briefs.json` · `02_prompts/{id}.txt` · `gen/{filename}` · `03_qc_{id}.md`. 최종 자산만 `public/`에 출력, `_workspace_img/`는 감사·재생성용 보존.

## Phase 4: 에러 핸들링
- **셋업 에러(스크립트 exit 2)**: 키·라이브러리 안내 후 중단. 진행하지 않는다.
- **생성 에러(exit 3)**: 모델 텍스트(거부/설명) 확인 → 프롬프트 완화 1회 재시도 → 재실패 시 누락 명시.
- **Figma rate limit**: 1회 재시도 → 실패 시 스크린샷 기반 추정 브리프 / public 저장만이라도 완료하고 누락 보고.
- 상충(브리프 vs QC 판정): 삭제하지 말고 출처 병기 후 사용자 판단.

## Phase 5: 마무리 & 진화
- 결과 종합 보고: 생성/재사용 이미지 목록, `public/` 경로, Figma 업로드 결과, frontend-builder용 사용 가이드(import 경로·`sizes`·`alt` 제안), 남은 항목·HOLD.
- frontend-builder가 코드에 반영해야 하면 ex-web-orchestrator로 핸드오프(이 팀은 자산까지, 코드 반영은 웹팀).
- 사용자에게 개선점·팀 구성 피드백 기회를 제공한다. 반영 시 `CLAUDE.md` 변경 이력에 기록.

## 다른 하네스와의 경계
- **코드 반영(컴포넌트에 이미지 삽입·레이아웃)** → `ex-web-orchestrator`(frontend-builder).
- **에이전트/스킬 추가·재구성** → `harness:harness`.
- 이 오케스트레이터는 **이미지 자산 생성·Figma 연결 전용**.

## 테스트 시나리오
**정상 흐름:** "홈페이지 히어로 이미지를 Figma 보고 새로 만들어줘."
→ Phase 0 셋업 게이트 통과(GPT 기본) → 초기 실행 → 팀 3인 → art-director가 Home `1:528` 측정·브리프(`home-hero` 16:9, ex-cube 레퍼런스) → generator가 GPT 이미지(gpt-image-1) 생성 → QC가 색·종횡비·아티팩트 검수 PASS → art-director가 `public/home-hero.png` 저장 + Figma 업로드 → 사용 가이드 보고.

**에러 흐름:** 엔진 키(`OPENAI_API_KEY`/`GEMINI_API_KEY`)가 하나도 없음 → Phase 0에서 셋업 안내 후 중단. / 생성물 배경이 흰색(브랜드 불일치) → QC FAIL "navy #0E0626로 재생성, 색 문장 앞으로" → generator 델타 수정 재생성 → 재검수 PASS → 진행.

> 신규 에이전트/스킬 추가나 하네스 재구성이 필요하면 `harness:harness` 스킬로 처리한다(이 오케스트레이터는 실행 조율 전용).
