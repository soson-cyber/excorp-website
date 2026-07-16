# EX Website 승인형 릴리스 Runbook

이 문서는 GitHub Actions가 검증한 단일 아티팩트를 사람 승인 후 Cloudflare production에 배포하는 절차다.

## 안전 원칙

- PR 검증을 통과하지 않은 커밋은 운영 배포 금지.
- 자동 production 배포 금지. `Production Release`의 수동 실행만 허용한다.
- GitHub `production` Environment의 required reviewer 승인 전에는 deploy job을 실행하지 않는다.
- Preview와 production 자격 증명을 분리하고 값은 GitHub Environment secrets에만 저장한다.
- 운영 배포 후 smoke 검증이 실패하면 신규 변경을 추가하지 말고 즉시 rollback을 판단한다.

## 최초 1회 GitHub 설정

### 1. `main` branch protection

Repository Settings에서 다음을 적용한다.

- Require a pull request before merging
- Require status checks before merging
  - `Website CI / verify`
  - `Security CI / verify`
- Require conversation resolution
- Require linear history
- Block force pushes
- Block branch deletion

현재 승인자가 한 명뿐이라면 PR approval count를 강제로 1로 두지 않는다. 본인이 만든 PR을 본인이 승인할 수 없어 운영이 정지할 수 있다. `CODEOWNERS`는 현재 저장소 소유권만 표시하며, 두 번째 승인자가 지정된 뒤 Code Owner 승인과 최소 1명 승인을 추가한다.

Dependabot은 npm과 GitHub Actions 업데이트 PR을 매주 만들지만 자동 병합하지 않는다. 일반 코드 PR과 같은 필수 검사를 통과한 뒤 검토한다.

### 2. `production` Environment

- Environment 이름을 정확히 `production`으로 만든다.
- Required reviewer를 지정한다.
- Deployment branch policy를 `main`으로 제한한다.
- 두 번째 승인자가 생기기 전에는 `Prevent self-review`를 켜지 않는다.
- 최소 권한 Cloudflare 배포 및 cache purge 자격 증명을 Environment secrets로 등록한다.
- 설정과 reviewer 동작을 확인한 뒤 Environment variable `PRODUCTION_RELEASE_ENABLED=true`를 추가한다.

Environment가 실수로 자동 생성되어도 위 변수가 없으면 워크플로가 fail-closed로 중단된다.

## 정상 배포

1. 대상 PR이 `main`에 병합되고 required checks가 모두 성공했는지 확인한다.
2. Actions의 `Production Release`에서 `Run workflow`를 선택한다.
3. 최신 `main`을 배포할 때 `commit_sha`는 비워둔다.
4. verify job이 선택된 커밋을 고정하고 lint, typecheck, boundary tests, Cloudflare build를 실행한다.
5. GitHub Environment 승인 화면에서 커밋 SHA와 변경 내역을 확인하고 승인한다.
6. deploy job은 검증 단계가 업로드한 동일 `.open-next` 아티팩트만 배포한다.
7. cache purge와 `/`, `/en`, `/contact`, `/sitemap.xml` smoke 검증이 성공했는지 확인한다.
8. GitHub Deployments 기록과 Actions URL을 릴리스 증거로 보존한다.

## Rollback

1. 마지막으로 정상 동작한 `main` 커밋의 **전체 40자 SHA**를 확인한다.
2. `Production Release`를 다시 수동 실행하면서 `commit_sha`에 해당 SHA를 입력한다.
3. 워크플로가 그 SHA가 현재 `main` 이력의 ancestor인지 검증한다.
4. required reviewer가 rollback 대상 SHA를 확인하고 승인한다.
5. 배포 후 동일 smoke 검증을 확인한다.
6. 원인 변경은 별도 PR에서 수정한다. rollback 과정에서 main을 force-push하지 않는다.

## 중단 조건

다음 중 하나면 승인하지 않는다.

- required check 실패
- 선택된 SHA가 main 이력에 없음
- production Environment gate 또는 자격 증명 미구성
- 검증 아티팩트와 배포 SHA 불일치
- cache purge 실패
- 문의 저장 경계나 공개 Notion 읽기 경계 변경이 포함됐지만 별도 검토가 없음
