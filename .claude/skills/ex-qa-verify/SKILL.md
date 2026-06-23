---
name: ex-qa-verify
description: EX 웹사이트 변경분의 빌드·타입·린트와 데스크톱/모바일 프리뷰 렌더, 경계면 정합성을 검증할 때 반드시 사용. "빌드 검증", "타입 체크", "린트", "프리뷰 확인", "모바일에서 확인", "스크린샷", "QA", "정상 동작하는지" 등에 트리거.
---

# EX QA·검증

"존재한다"가 아니라 **"빌드 통과 + 실제로 보인다 + 경계면이 맞물린다"**를 확인한다. 모듈 완성 직후마다 점진적으로 실행한다.

## 명령 실행 (cwd 주의)
cwd가 상위로 리셋되는 일이 있으므로 **항상 프로젝트 경로 prefix**:
```bash
cd /Users/ex/Documents/Claude-Projects/excorp-website && npx tsc --noEmit
cd /Users/ex/Documents/Claude-Projects/excorp-website && npx eslint <변경파일>
```
순서: `tsc --noEmit` → `eslint <변경파일>` → 라우팅/빌드 영향 시 `npm run build`. 텍스트·CSS 변경만이면 tsc+eslint로 충분.

## 프리뷰 생명주기 규율 (중요)
빌드 후 dev 서버를 재사용하면 삭제된 `.next`를 서빙해 **전 라우트 500**이 날 수 있다.
- 빌드/클린 후: **full stop → `lsof -ti tcp:3000 | xargs kill -9` → `rm -rf .next` → fresh `preview_start`**.
- **dev 서버 가동 중 `.next`를 지우지 않는다.**

## 반응형·렌더 검증
- `preview_resize`로 모바일(375)·데스크톱(1320) 양쪽.
- 헤드리스 스크린샷은 **페이지 상단만 신뢰** 가능 → 중간 섹션은 `preview_eval`로 대상 요소까지 `scrollTo(0, top-여백)` 후 캡처.
- 줄바꿈 검증: `getComputedStyle(br).display`(모바일 none / 데스크톱 block), `textContent`에 공백 보존 확인.
- `getClientRects().length`는 블록요소에서 1만 반환(라인 수 아님) — 라인 수는 스크린샷/높이로 확인.

## 경계면 교차 비교
API 응답 shape ↔ 프론트 훅, props 타입 ↔ 사용처, 이미지 경로 ↔ 실제 파일명(대소문자)을 **동시에** 읽어 불일치를 잡는다.

## 알려진 함정
- 전 라우트 500 → dev 서버 가동 중 `.next` 삭제. (위 규율로 해소)
- 배포 이미지 404 → `.JPG` 대문자 확장자/소문자 불일치.
- ESLint `react-hooks/set-state-in-effect` → 이펙트 내 동기 setState. rAF 래핑.

## 출력
`PASS/FAIL` + 증거(명령 출력 요약·스크린샷·eval 결과). FAIL이면 원인·파일·라인·재현 경로를 담당 에이전트에 돌려보낸다. 1회 재시도 후 재실패면 누락을 명시하고 진행.
