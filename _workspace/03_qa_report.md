# QA 검증 리포트 — 미디어 6개 페이지 (A그룹 신규 §00 / B그룹 API 통일)

검증일: 2026-06-04 · 검증자: qa-verifier · 도구: 헤드리스 Chrome(`--headless --disable-gpu --hide-scrollbars --force-prefers-reduced-motion --virtual-time-budget=7000`)

## 1. 빌드·타입·린트 (전부 PASS)
| 항목 | 명령 | 결과 |
|------|------|------|
| Build | `rm -rf .next && npm run build` | PASS — 전 라우트 prerender 성공, 에러 0 |
| Types | `npx tsc --noEmit` | PASS — exit 0 |
| Lint | `npx eslint <6 페이지 + MediaBlank.tsx>` | PASS — exit 0, 경고 0 |

dev 서버: 6개 경로 모두 HTTP 200 확인 후 스크린샷, 종료(`pkill -f "next dev"` + port 3000 clear).

## 2. 경로별 렌더 판정

### A그룹 — 신규 §00 미디어 밴드
| 경로 | 판정 | 근거 |
|------|------|------|
| `/solution` §00 16/9 video | **PASS** | 다크 플레이스홀더 정상. play 글리프 + 레티클 틱 + "촬영 → 트래킹 → 렌더 → 송출 · 영상 준비 중" 라벨. 비율 유지, 0높이·깨짐·오버플로 없음. 섹션 배경 단색(글로우 없음). 데스크톱·모바일 OK. |
| `/product` §00 16/9 image | **PASS** | 다크 image 플레이스홀더. "버추얼 프로덕션 핵심 제품군" + "Aximmetry · Moverse AI · RETracker · 자산 준비 중" 라벨. 비율 유지, 단색 배경. 데스크톱·모바일 OK. |
| `/solution/virtual-production` §03 16/9 video | **PASS** | "REAL-TIME COMPOSITING" 태그 + play 글리프 + "실시간 합성 데모" + "크로마 → 가상 배경 합성 루프 · 영상 준비 중". 비율 유지, 깨짐 없음. §02 기존 그린스크린 실사 이미지도 정상. |

### B그룹 — API 통일 회귀 점검 (기존 미디어 깨짐·소멸 없음)
| 경로 | 판정 | 근거 |
|------|------|------|
| `/product/moverse` §01 | **PASS** | "CAPTURE PREVIEW" 태그 16/9 video 플레이스홀더 정상("캡처 프리뷰 준비 중" / "Moverse 마커리스 모션캡처 — 자료 준비 중"). 비율·라벨 유지, 깨짐·소멸 없음. 하위 섹션(왜 Moverse·구성·주요 기능·상세 사양·활용 분야) 단색 정상. |
| `/xr-studio` §03 프리셋·§06 영상/갤러리 | **PASS** | §03 배경 프리셋 4/3 image 카드 8종 정상(각 태그·image 글리프·"프리뷰 준비 중"). §06 "촬영 샘플 영상" 16/9 video + 갤러리 16/9 image 정상. 히어로 그린스크린 실사 유지. 비율·라벨 유지. |
| `/careers` §03 | **PASS** | "기술이 만들어지는 공간" 실사 1 + 4/3 image 플레이스홀더 2종("사진 준비 중") 정상. 히어로 실사·하위 섹션 모두 정상. 비율·라벨 유지. |

## 3. 정직성 라벨 / 배경 / 반응형
- **정직성 라벨**: 전 페이지에서 "준비 중"·"준비 예정"·"활용 시나리오"류 라벨 노출 확인 (영상 준비 중 / 자산 준비 중 / 프리뷰 준비 중 / 사진 준비 중 등). PASS.
- **섹션 배경 단색**: 신규/기존 미디어 밴드 모두 섹션 배경은 단색 다크 유지. 글로우 부활 없음. MediaBlank `ratio` 방식의 카드 상단 한정 미세 핫퍼플 radial은 자산 자리 한정(섹션 배경 아님)으로 정책 허용 범위. PASS.
- **데스크톱(1280) 레이아웃·제목 줄바꿈**: 6개 페이지 전부 정상. 제목 줄바꿈·그리드·카드 정렬 OK. PASS.
- **모바일(390) 미디어 밴드**: 신규/기존 MediaBlank 모두 full-width·비율 유지로 정상 스택. PASS.

## 4. 발견 이슈 (비차단 · 변경 범위 밖)
**[INFO] PageHero 대형 타이틀 모바일 우측 클리핑** — 변경 대상 아님, 회귀 아님.
- 현상: `/product`·`/solution` 등 PageHero 사용 페이지에서 모바일(375·390) 히어로 H1·리드 텍스트 우측 끝이 잘림(예: "책임집니다"→"책임집니", 리드 우측 1~2자 컷).
- 원인: 공용 `src/components/page/PageHero.tsx`의 H1 `text-[clamp(2.75rem,6vw,5.25rem)]` + `text-center` + 섹션 `overflow-hidden`. 좁은 폭에서 긴 한글 타이틀이 컨테이너 패딩을 초과하나 `break-keep`/word-break 미적용. 가로 스크롤바는 생기지 않음(문서 오버플로 아님, 시각적 클리핑).
- 범위: frontend-builder가 이번에 변경한 §00 MediaBlank 밴드·B그룹 API 통일과 **무관**. git 워킹트리상 `PageHero.tsx` 미변경(6개 page.tsx만 수정). 직전 QA(`02_qa_report.md` L43)에도 동일 사항이 기존 동작·비차단으로 기록됨.
- 권고: 별건으로 PageHero에 모바일 폰트 floor 하향 또는 `word-break`/`text-pretty` 보정 검토(이번 작업 차단 사유 아님).

## 5. 종합 판정: **PASS**
대상 6개 페이지의 신규 §00 미디어 밴드·VP §03 데모·B그룹 기존 미디어 모두 빌드/타입/린트 통과 + 데스크톱·모바일에서 다크 플레이스홀더로 정상 렌더(비율·라벨·단색 배경 유지, 깨짐·소멸·오버플로 없음). MediaBlank 신규 API 통일 후 B그룹 회귀 없음.

## 6. 스크린샷 경로 (`_workspace/qa_shots/`)
- A그룹 데스크톱: `solution_d.png` · `product_d.png` · `vp_d.png` · VP §03 크롭 `vp_s03_demo.png`
- A그룹 모바일: `solution_m.png` · `product_m.png` · `vp_m.png`
- B그룹 데스크톱(풀): `moverse_tall_d.png` · `xrstudio_tall_d.png` · `careers_tall_d.png` / 크롭 `moverse_s01.png` · `xrstudio_video.png` · `xrstudio_s06.png` · `careers_s03.png`
- B그룹 모바일: `moverse_m.png` · `xrstudio_m.png` · `careers_m.png`
- PageHero 클리핑 증거: `product_375_crop.png` · `solution_m_top.png`
