# 07. QA 검증 리포트 — 섹션 헤더 중앙 정렬 일관화

검증자: qa-verifier · 날짜: 2026-06-05
대상: `_workspace/07_layout_review.md` 규칙대로 10개 페이지 섹션 헤더 중앙 정렬 / 본문·예외 좌측 유지
스크린샷 경로: `_workspace/qa_shots/run07/`

---

## 0. 빌드·타입·린트 (전체 통과)

| 항목 | 명령 | 결과 |
|---|---|---|
| 클린 빌드 | `rm -rf .next && npm run build` | ✅ PASS — 39 페이지 정적 생성, 에러 없음 |
| 타입체크 | `npx tsc --noEmit` | ✅ PASS (exit 0) |
| 린트(전체 src) | `npx eslint "src/**/*.{ts,tsx}"` | ✅ PASS (exit 0, 경고 0) |

## 1. dev 렌더 — 전 라우트 200

`/solution /solution/virtual-production /product /product/aximmetry /product/moverse /product/retracker /xr-studio /careers /support /news` → 모두 **200**.

## 2. 페이지별 정렬 검증 (헤드리스 Chrome, reduced-motion, 데스크톱 1280 + 모바일 390)

검증 방식: 헤드리스 Chrome 캡처(상단~하단 구간 크롭) + 페이지 소스 직접 대조(`<div className="text-center">` 래퍼 + h2/lead `marginInline:"auto"` vs `lg:grid-cols-2` 2단·폼 무래퍼).

| 페이지 | 중앙 헤더(R1) | 본문 좌측(R2) | 예외 좌측(R3) | 판정 | 비고 |
|---|---|---|---|---|---|
| solution | §01 Approach·§02 Two Routes·§03 Capability 중앙 | 카드·CompareTable 좌측 | §04 stats 현행 중앙 | **PASS** | 데/모 캡처 확인 |
| solution/virtual-production | §02 Why·§03 Methods·§05 Process·§06 Use Cases 중앙 | 카드·step 좌측 | §01 What is VP·§04 EX VP 2단 좌측 유지 | **PASS** | §01/§04 좌측 확인(데/모) |
| product | §01 Why EX·§03 Compare·§04 Authorisation 중앙, §02 Lineup 헤더 중앙 | Lineup 행·CompareTable 좌측 | — | **PASS** | |
| product/aximmetry | §01~§07 헤더 중앙 | 카드·SpecTable·FAQ 좌측 | §08 EX × Aximmetry 2단 좌측 | **PASS** | stats band 현행 중앙 |
| product/moverse | §01~§08 헤더 중앙 | 카드·표·FAQ 좌측 | §09 EX × Moverse 2단 좌측 | **PASS** | 소스 대조 |
| product/retracker | §01~§08 헤더 중앙 | 카드·표·FAQ 좌측 | §09 EX × RETracker 2단 좌측 | **PASS** | 소스 대조 |
| xr-studio | §01~§06 헤더 중앙 | 카드·리스트·시설정보 좌측 | CTA card 현행 중앙 | **PASS** | |
| careers | §01~§07 헤더 중앙 | 값 리스트·포지션·step 좌측 | — | **PASS** | |
| support | §01 FAQ·§03 Downloads 헤더 중앙 | FAQ·다운로드 리스트 좌측 | §02 Technical Support 2단 좌측·§04 Quick Inquiry 폼 좌측 | **PASS** | §02/§04 좌측 확인 |
| news | §01 Archive 헤더 중앙 | 필터 칩·기사 그리드 좌측 | — | **PASS** | |

## 3. 세부 확인 결과

- **중앙 정렬**: 전 페이지 풀폭 헤더(SectionLabel + h2 + lead)가 중앙 정렬. `.seclabel`(inline-flex) 자동 중앙, h2/lead `marginInline:"auto"`. 메인 `SectionHead center`와 동일 방식 확인.
- **lead maxWidth**: 모든 lead `maxWidth`(40~44rem) 유지 — 풀폭으로 퍼지지 않고 중앙 블록 유지. 데스크톱·모바일 모두 정상.
- **본문 좌측**: 표(Compare/Spec)·카드 설명문·번호/체크 리스트·FAQ 아코디언·기사 그리드 모두 좌측 유지. 중앙으로 퍼지거나 깨지지 않음.
- **예외 좌측 유지 확인**:
  - VP §01 What is VP / §04 EX VP — `lg:grid-cols-2` 좌칼럼 헤더, `text-center` 없음 → 좌측. 모바일 단일컬럼에서도 좌측.
  - product/{aximmetry,moverse,retracker} 마지막 EX × {제품} — 2단 좌측.
  - support §02 Technical Support — 2단 좌측. §04 Quick Inquiry 폼 — 무래퍼 좌측.
  - work(WorkGallery)·about·stats band·xr-studio CTA·PageHero — 대상 외/현행 유지(미변경).
- **반응형**: 데스크톱 1280·모바일 390 양쪽에서 헤더 중앙·본문 좌측 정상. 가로 오버플로 없음. 모바일에서 중앙 헤더 lead가 maxWidth 내 정렬, 2단 인트로는 단일컬럼으로 좌측 스택.

## 4. 관찰 사항 (이번 작업 범위 외, 비차단)

- product/aximmetry 모바일에서 Quick spec bar는 `grid-cols-2`(모바일 2열)로 "Unlimited/Unreal" 등 긴 값이 빠듯하게 들어가나 `container-ex` 패딩 내라 뷰포트 오버플로 없음. 해당 stats band는 본 정렬 작업 대상이 아니며(현행 중앙 유지), 정렬 변경과 무관한 기존 레이아웃.

## 5. 결론

**전 10개 페이지 PASS.** 빌드/타입/린트 통과, 풀폭 섹션 헤더 중앙 정렬·본문 좌측 유지·예외(2단 인트로·폼·work) 좌측 고정 모두 규칙대로 적용됨. 데스크톱·모바일 레이아웃 깨짐/오버플로 없음. **이슈 없음.**
