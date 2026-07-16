# EX Website Analytics Measurement Specification

- 상태: **명세만 승인 대기**
- 적용 범위: 공개 웹사이트의 익명 전환 퍼널
- 기본 원칙: 이 PR에서는 추적 코드를 활성화하지 않는다.
- 활성화 조건: 측정 도구·동의 방식·보유 기간을 승인하고 개인정보 처리방침을 먼저 갱신한다.

## 1. 목적

다음 질문에 필요한 최소 데이터만 수집한다.

1. 어떤 공개 페이지와 CTA가 문의를 시작하게 하는가?
2. 문의 폼에서 어느 단계의 이탈이 큰가?
3. 캠페인별 문의 완료율은 어떻게 다른가?
4. 배포 전후 전환율이 실제로 개선됐는가?

페이지뷰 수 자체를 성과로 보지 않는다. 최종 기준은 유효 문의 완료율과 문의 품질이며, 영업 결과는 Notion의 승인된 운영 원장에서 별도로 판단한다.

## 2. 이벤트

| 이벤트 | 발생 시점 | 필수 속성 | 비고 |
|---|---|---|---|
| `cta_click` | 주요 문의·상담 CTA 선택 | `locale`, `source_page`, `cta_id` | 링크 이동 전 1회 |
| `contact_form_start` | 문의 폼의 첫 필드 변경 | `locale`, `source_page`, `inquiry_type` | 세션당 1회 |
| `contact_form_submit` | 클라이언트 검증 통과 후 제출 시도 | `locale`, `source_page`, `inquiry_type`, `campaign_id` | 성공과 구분 |
| `contact_form_success` | 서버가 문의 저장 성공을 응답 | `locale`, `source_page`, `inquiry_type`, `campaign_id` | 핵심 전환 |
| `contact_form_error` | 검증 또는 서버 저장 실패 | `locale`, `source_page`, `inquiry_type`, `error_code` | 자유 텍스트 금지 |
| `content_download` | 승인된 자료 다운로드 시작 | `locale`, `source_page`, `content_id`, `campaign_id` | 자료 공개 후 사용 |

## 3. 허용 속성

| 속성 | 형식 | 예시 | 제한 |
|---|---|---|---|
| `locale` | enum | `ko`, `en` | 두 값만 허용 |
| `source_page` | canonical path | `/solution/xr-solution` | query string과 fragment 제거 |
| `cta_id` | 사전 등록 ID | `hero_contact`, `solution_demo` | 화면 문구를 직접 보내지 않음 |
| `inquiry_type` | enum | `solution`, `studio`, `demo`, `materials`, `support`, `general` | 공개 폼 유형과 매핑 |
| `campaign_id` | 정규화 문자열 | `2026_q3_xr` | 최대 64자, 영숫자·`_`·`-`만 허용 |
| `content_id` | 사전 등록 ID | `xr_checklist_v1` | 파일명·사용자 입력 금지 |
| `error_code` | enum | `validation`, `rate_limited`, `persistence`, `network` | 응답 본문·예외 메시지 금지 |

## 4. 수집 금지 데이터

분석 이벤트에는 **이름, 이메일, 전화, 회사, 문의 본문**을 절대 포함하지 않는다.

추가 금지 항목:

- IP 주소를 애플리케이션 이벤트 속성으로 저장
- 전체 URL의 query string 또는 fragment
- 브라우저 fingerprint
- 광고 식별자나 로그인되지 않은 방문자의 영구 user ID
- Notion 문의 레코드 ID
- 서버 오류 원문, stack trace, 자유 입력값

URL 파라미터를 사용하는 경우 허용된 캠페인 키만 정규화하고, 이벤트 전송 후 원문은 보존하지 않는다.

## 5. 동의·보유·접근

- 마케팅 분석 도구를 활성화하기 전에 개인정보 처리방침에 도구, 목적, 수집 항목, 보유 기간, 거부 방법을 반영한다.
- 법무·운영 승인이 끝나기 전에는 현재의 기본 Cloudflare 집계 외 신규 추적을 켜지 않는다.
- 기본 제안 보유 기간은 6개월이며, 더 긴 기간은 별도 근거와 승인이 필요하다.
- 이벤트 조회 권한은 웹 운영 책임자와 승인된 마케팅 담당자로 제한한다.
- 원시 이벤트를 일반 Chat, 공개 문서, EXi 또는 직원 공용 채널로 전달하지 않는다.

## 6. 퍼널 계산

```text
CTA 전환율 = unique contact_form_start / unique cta_click
제출 완료율 = unique contact_form_success / unique contact_form_submit
문의 완료율 = unique contact_form_success / unique eligible sessions
오류율 = contact_form_error / contact_form_submit
```

동일 세션의 중복 클릭을 분모에서 반복 집계하지 않는다. 캠페인·locale·source_page별 표본이 너무 작으면 개인 식별 위험을 피하기 위해 외부 공유용 세부 분해를 하지 않는다.

## 7. 활성화 전 Acceptance Gate

- [ ] 개인정보 처리방침 갱신 승인
- [ ] 분석 도구와 데이터 처리 위치 승인
- [ ] 이벤트 허용 목록의 자동 테스트
- [ ] 금지 데이터가 payload에 포함되지 않는 테스트
- [ ] 개발·preview 환경의 데이터가 production과 분리됨
- [ ] `contact_form_success`는 서버 저장 성공 후에만 발생
- [ ] 브라우저 추적 차단 시 문의 기능이 정상 동작
- [ ] 6개월 삭제 또는 집계 절차 검증
- [ ] 운영 배포 전 사람 승인

## 8. Rollback

분석 코드 활성화 후 정책 위반, 중복 집계, 성능 저하 또는 문의 기능 장애가 발견되면 이벤트 전송을 feature flag로 즉시 중단한다. 문의 폼과 Notion 저장 경로는 분석 도구와 독립적으로 유지해야 한다.
