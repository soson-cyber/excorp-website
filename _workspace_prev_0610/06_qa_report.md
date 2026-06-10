# 06 · QA 검증 리포트 (qa-verifier)

검증일: 2026-06-05 · 대상: content-brand-writer 감사(`06_content_audit.md`) 기반 frontend-builder의 콘텐츠 텍스트 수정 11개 파일
변경 성격: **텍스트·metadata·JSON-LD 주소만** (레이아웃·CSS·구조 변경 없음 — `git diff`로 확인)

## 최종 판정: ✅ **PASS** — 거점 옛 표기 잔존 **0건**

---

## 변경 파일 확인 (git diff HEAD — 11개, 전부 텍스트)
`src/app/about/page.tsx` · `careers/page.tsx` · `xr-studio/page.tsx` · `product/page.tsx` · `product/aximmetry/page.tsx` · `product/moverse/page.tsx` · `product/retracker/page.tsx` · `solution/page.tsx` · `solution/virtual-production/page.tsx` · `src/lib/site.ts` · `src/app/layout.tsx`(JSON-LD 주소)
→ `globals.css`·컴포넌트 구조 **무변경**. 레이아웃 회귀 가능성 없음.

## 항목 1 — 빌드·타입·린트

| 검사 | 명령 | 결과 |
|---|---|---|
| 빌드 | `rm -rf .next && npm run build` | ✅ PASS — 39 페이지 정적 생성, TS 통과 |
| 타입 | `npx tsc --noEmit` | ✅ PASS (exit 0) |
| 린트 | `npx eslint src` (전체) | ✅ PASS (exit 0, 0 warning) |

## 항목 2 — 거점 옛 표기 잔존 grep (렌더 HTML 기준)

dev 서버 기동 → 9개 페이지 전부 HTTP **200** 확인 후, 렌더 HTML에서 본문(visible body) + head/metadata + JSON-LD를 분리 추출해 grep.

대상 페이지: about · careers · xr-studio · product · product/moverse · product/retracker · solution · solution/virtual-production · product/aximmetry

| 색출 표기 | 본문 노출 | head/metadata | 판정 |
|---|---|---|---|
| `판교` | 0 | 0 | ✅ |
| `본사` | 0 | 0 | ✅ |
| `Headquarters` | 0 | 0 | ✅ |
| `EX Studio`(단독, 'EX XR Studio' 제외) | 0 | 0 | ✅ |
| `Korea Distributor` | 0 | 0 | ✅ |
| `합리적인 가격` | 0 | 0 | ✅ |

**전 페이지·전 표기 잔존 0건.**

### 정상 노출 라벨 확인 (본문)
- `EX AI Office` — 9/9 페이지 노출 ✅
- `EX XR Studio` — 9/9 페이지 노출 (xr-studio ×4: PageHero lead "직접 EX XR Studio에서…", §01 h2 "EX XR Studio가 다른 이유" 등) ✅
- `Distributor`(영문 라벨) — product ×2 / moverse ×1 / retracker ×1 노출, `Korea Distributor`로의 혼용 없음 ✅
- `Certified Reseller` — aximmetry ×1 / product ×1 노출 ✅

### JSON-LD 주소 (layout.tsx, 전역 Organization)
수정 전: `판교로 289번길 20, 스타트업캠퍼스 2동 5층 / 성남시 분당구 / 13488`
수정 후(렌더 확인): **`금토동 327, 스타트업스퀘어 B동 3층` / `성남시 수정구` / `461380`**
→ 렌더 HTML에서 `금토동`·`성남시 수정구`·`미사대로` 노출 확인, `판교`·`본사`·`Headquarters` 0건. ✅

## 항목 3 — 헤드리스 Chrome 스폿 점검 (reduced-motion, 데스크톱 1320 + 모바일 390)

Google Chrome `--headless --force-prefers-reduced-motion`로 about·careers·xr-studio·product/aximmetry 캡처.

| 스크린샷 | 경로 |
|---|---|
| about (D/M) | `_workspace/qa_shots/06_about_desktop.png` · `06_about_mobile.png` |
| careers (D/M) | `_workspace/qa_shots/06_careers_desktop.png` · `06_careers_mobile.png` |
| xr-studio (D/M) | `_workspace/qa_shots/06_xrstudio_desktop.png` · `06_xrstudio_mobile.png` |
| aximmetry (D/M) | `_workspace/qa_shots/06_aximmetry_desktop.png` · `06_aximmetry_mobile.png` |

**관찰:**
- 데스크톱 4종 — 히어로·헤딩·본문 텍스트 깨짐/오버플로 없음. 수정 문구 육안 확인:
  - xr-studio: "EX XR Studio가 다른 이유" (옛 "EX Studio" 정정 반영) ✅
  - aximmetry: PageHero "Unreal Engine의 비주얼을, 방송 현장에서." (옛 "합리적인 가격에" 교체 반영) ✅
- 모바일 4종 — 콘텐츠 정상 렌더. 우측 가장자리 약간 잘림은 **헤드리스 Chrome의 모바일 뷰포트 미에뮬레이션(스크롤바 거터) 아티팩트**이며, 본 변경은 CSS·레이아웃 무수정이고 모바일 레이아웃은 이전 QA(02/03/04)에서 검증됨 → 신규 회귀 아님.

## 항목 4 — dev 종료
`pkill -f "next dev"` + `lsof -ti tcp:3000 | xargs kill -9` → 포트 3000 해제 확인. ✅

---

## 요약
- **PASS.** 빌드·tsc·eslint(전체 src) 통과.
- 거점 옛 표기(`판교`/`본사`/`Headquarters`/단독 `EX Studio`/`Korea Distributor`/`합리적인 가격`) **렌더 HTML 잔존 0건** — 본문·metadata·JSON-LD 모두.
- 정상 라벨(`EX AI Office`/`EX XR Studio`/`Distributor`/`Certified Reseller`) 정상 노출.
- JSON-LD Organization 주소 → 금토동(EX AI Office)·수정구로 정정 반영.
- 스크린샷상 텍스트 깨짐·레이아웃 이상 없음(모바일 잘림은 캡처 아티팩트).
- **코드 미수정.**
