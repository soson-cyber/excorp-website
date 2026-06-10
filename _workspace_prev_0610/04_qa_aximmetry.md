# QA 검증 — /product/aximmetry 재구성

**판정: PASS (이슈 1건 — 정보성/디자인 판단 필요, 차단 아님)**
검증일: 2026-06-05 · 대상: `src/app/product/aximmetry/page.tsx`, `src/components/ui/MediaBlank.tsx`

---

## 1. 빌드·타입·린트

| 항목 | 명령 | 결과 |
|------|------|------|
| 타입 | `rm -rf .next && npx tsc --noEmit` | PASS (exit 0) |
| 린트 | `npx eslint src/app/product/aximmetry/page.tsx src/components/ui/MediaBlank.tsx` | PASS (exit 0, 0 warning) |
| 빌드 | `npm run build` | PASS (exit 0, ✓ Compiled successfully, `/product/aximmetry` 정적 프리렌더 ○) |

## 2. 렌더 검증 (헤드리스 Chrome, prefers-reduced-motion 강제)

- 데스크톱 1280 / 모바일 390 양쪽 전체 캡처 (CDP `captureBeyondViewport`, 점진 스크롤로 lazy 이미지 강제 로드).
- 데스크톱 scrollHeight=11612, 모바일 scrollHeight=13986.

### 이미지 로드 상태 (CDP, `img.complete` + naturalWidth)
| 이미지 | 위치 | complete | natural |
|--------|------|----------|---------|
| aximmetry-hero.png | §01 Showcase | True | 1140×642 |
| vp-workflow.png | §02 Why (노드엔진) | True | 556×301 |
| vp-chroma.png | §04 Features (크로마키) | True | 1440×810 |
| aximmetry-vp.jpg | §07 Use Case 1 | True | 1600×1600 |
| cert-aximmetry.png | §10 인증서 | True | 900×637 |

→ 전 이미지 `complete=True`, naturalWidth>0. 깨짐·0높이 없음. `public/`에 5개 파일 모두 실존 확인.

## 3. 항목별 확인

- **§02 노드엔진 (vp-workflow.png)**: 정상 표시, 16/9 컨테이너 object-cover, 하단 캡션 "노드 기반 자체 엔진 — 실제 그래프 편집 화면" 노출. PASS
- **§04 크로마키 (vp-chroma.png)**: 그린스크린 합성 현장 정상 표시, 16/9, 캡션 "방송급 자체 크로마키 — 실시간 합성 현장" 노출. PASS
- **§07 Use Cases**: 카드 5개 = 실사 1(방송 가상 스튜디오, aximmetry-vp.jpg, 라벨 캡션 노출) + placeholder 4(뉴스·XR·AR·라이브, image 글리프 + "활용 시나리오" 모노 태그). 16/10 썸네일. PASS
- **§01 쇼케이스 / §10 인증서**: 두 이미지 유지·정상 표시 + 캡션. PASS
- **glow 제거**: 전 `<section>` `background-image: none` (CDP getComputedStyle). §02·§10 모두 단색 배경, `section--glow` 시각효과 부활 없음. PASS
- **단색 배경 유지**: 모든 섹션 단색(rgb(14,6,38) 또는 rgb(20,17,44)), 그라데이션 없음. PASS
- **데스크톱·모바일 레이아웃·제목 줄바꿈**: 히어로/§03 제목 줄바꿈 자연스러움, 모바일 단일컬럼 스택 정상, 오버플로 없음. PASS

## 4. 이슈 (비차단 — 디자인 판단 권고)

**[INFO] 인접 비-surface 섹션 간 톤 차이 없음 (§03↔§05, §06↔§07, §09↔§10)**

`globals.css` L613-622에서 `.section--white` 와 `.section--ink` 가 **둘 다 `var(--color-hero)` = rgb(14,6,38)** 로 동일 색이다(다크 리맵 결과). 실제 교차는 surface↔비-surface 하나뿐.
재배정된 톤 순서: §01 ink, §02 surface, §03 white, §05 ink, §04 surface, §06 white, §07 ink, §08 surface, §09 white, §10 ink.
→ §03→§05 / §06→§07 / §09→§10 경계는 동일 rgb(14,6,38)이라 **섹션 패딩 외엔 톤 단차가 보이지 않음**(연속 다크 밴드로 읽힘). CDP 좌측마진 색 스캔으로 확인.

- 판단: 이는 frontend-builder 재구성이 만든 신규 버그가 아니라 **테마 자체(white≡ink)의 구조적 한계**다. 깨짐·오버플로·glow 부활은 아니며, 카드/테이블이 시각적 경계를 제공해 화면상 치명적이지 않음.
- 권고: 인접 비-surface 충돌 3곳을 완전히 없애려면 톤 순서를 surface↔ink로 엄격 교차(white 미사용)하거나 `--color-hero`와 별도 `--color-card`톤을 white에 부여하는 디자인 결정 필요. **차단 사유는 아님.**

## 5. 스크린샷 경로 (`_workspace/`)
- 데스크톱 전체(상/하 반): `d_top.png`, `d_bot.png` · 밴드: `dt_1~3.png`, `db_1~3.png`
- §07 그리드 클로즈업: `uc_grid.png`
- 모바일 전체(상/하 반): `m_1.png`, `m_2.png` · 밴드: `m1_1~3.png`, `m2_1~3.png`

dev 서버 종료 완료.
