# 06 · 콘텐츠 재검수 리포트 (content-brand-writer)

검수일: 2026-06-05 · 대상: 13개 페이지 콘텐츠 텍스트 (privacy/terms 제외)
기준: `HomeClean.tsx`·`Hero.tsx`·`solution/xr-solution` 톤 + `CLAUDE.md`·`DESIGN.md` + 과제 정직성 스펙
**감사 전용 — 코드 미수정.**

## 심각도 범례
- 🔴 정직성/사실오류 (즉시 수정)
- 🟠 일관성 (라벨·용어·표기 불일치)
- 🟡 톤/문구 (합니다체·클리셰·번역투)
- 🟢 nit (오타·미세 다듬기)

## 검수 기준 메모 (중요)
- **거점 SSoT는 `src/lib/site.ts`의 `locations`다**: `EX AI Office` — 경기 성남시 수정구 금토동 327, 스타트업스퀘어 B동 3층 / `EX XR Studio` — 경기도 하남시 미사대로 540. 과제 스펙과 일치. **옛 표기(본사·판교 스타트업캠퍼스·HQ·Headquarters·"EX Studio" 단독)는 모두 색출 대상.**
- ⚠️ `.claude/skills/ex-brand-copy/SKILL.md`와 `CLAUDE.md`의 "거점: HQ 판교 / Studio 하남" 문구는 **구버전**이며 site.ts·과제 스펙과 충돌한다. 본 감사는 site.ts·과제 스펙을 기준으로 판정한다. (→ 별도 스킬/문서 동기화 필요. 본 리포트 범위 밖.)
- 영문 총판 라벨: site.ts·home·xr-solution = **`Distributor`**. product 인덱스·moverse·retracker PageHero = **`Korea Distributor`**. 한 가지로 통일 필요(아래 🟠 다수).

---

## 1. `src/app/solution/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟡 | PageHero title (L42) | `현장에 맞는 최적의 XR 환경을 구성합니다.` | `현장에 맞는 XR 환경을 구성합니다.` | "최적의"는 근거 없는 최상급 형용사. 레퍼런스(xr-solution PageHero)는 형용사 없이 동작 중심. 유지하려면 무방하나 절제 권고. |
| 🟠 | §01 Approach h2 (L70) | `자체 기술과 글로벌 파트너, 양손 전략으로 모든 현장에 대응합니다.` | `자체 기술과 글로벌 파트너, 두 축으로 모든 현장에 대응합니다.` | "양손 전략"은 번역투/모호. "두 축"이 사이트 용어와 정합. |
| 🟢 | §01 lead (L73) | `…VP 제작에 필요한 모든 자산을 보유하고 있습니다.` | `…VP 제작에 필요한 자산을 보유하고 있습니다.` | "모든…자산"은 과장 소지. "모든 현장에 대응"과 중복 강조. |
| 🟢 | §03 capability tech (L25) | `Unreal Engine · Aximmetry` | (유지) | 사실 정합 OK — 합성·렌더 단계 매핑 정확. |

**정직성:** proof 수치(6+ 특허·3 파트너·3 MOU·4 인증)는 About 연혁과 교차 검증됨 — 특허 6건·파트너 3사·MOU 3교(성균관/중앙/계원)·인증류 일치. **이상 없음.**
**라벨:** EXLINK="EX 자체 개발 통합 XR 솔루션" 정확. 파트너 제품 직접 명명 없음. **이상 없음.**

---

## 2. `src/app/solution/virtual-production/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟠 | §03 methods 태그 (L24-25) | `tag: "EX 강점"` / `tag: "EX 핵심"` | 둘 중 하나로 통일 (예: 둘 다 `EX 강점`) | 같은 섹션 내 의미 거의 동일한 태그가 2종 — 라벨 일관성. |
| 🟡 | §04 lead (L154) | `대형 그린 크로마(W10×D7×H4)와…` | `대형 그린 크로마(W10m×D7m×H4m)와…` | xr-studio·about은 단위(m) 표기. 표기 통일 + 정합. |
| 🟢 | benefits (L18) | `무한한 배경 · 세트비 절감` | (유지 가능) | "무한한"은 가상배경 맥락상 허용 범위. nit. |

**정직성:** "촬영이 곧 완성", "후반 작업 최소화" 등은 기법 설명이라 수치 날조 아님. useCases는 분야 나열(시나리오 성격) — 가짜 실적 없음. **이상 없음.**
**라벨:** exPoints에서 "검증된 파트너 기술 연결 — Aximmetry · Moverse AI · RETracker를 프로젝트에 맞게 결합" = EX가 연결·공급 톤 정확. **이상 없음.**

---

## 3. `src/app/product/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟠 | lineup badge (L34, L40) | `badge: "Korea Distributor"` (Moverse·RETracker) | `badge: "Distributor"` | site.ts·home·xr-solution이 모두 `Distributor`. 같은 사이트에서 영문 라벨 1종 통일. (또는 전 사이트를 "Korea Distributor"로 통일 — 단 한쪽으로) |
| 🟠 | compare "EX 자격" (L51) | `["공식 인증 리셀러", "공식 한국 총판", "공식 한국 총판"]` | (유지) — 단 badge 영문과 한글 라벨의 정합만 맞추면 OK | 한글 라벨은 정확. 영문 badge와의 혼용만 정리. |
| 🟢 | §04 h2 (L160) | `공식 총판·리셀러 인증` | `공식 리셀러·총판 인증` | 제품 라인업 순서(Aximmetry=리셀러 먼저)와 동일 어순으로. nit. |

**정직성:** metadata·hero 모두 "EX가 한국에서 공식 공급/책임" 톤 정확. 인증서 3종(cert-*.png)은 실제 자산 참조. **이상 없음.**
**라벨 종합:** Aximmetry=Certified Reseller 정확. Moverse/RETracker=총판 정확. **영문 badge "Korea Distributor"만 통일 대상(🟠).**

---

## 4. `src/app/product/aximmetry/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟡 | PageHero title (L91) | `Unreal Engine의 힘, 합리적인 가격에.` | `Unreal Engine의 비주얼을, 방송 현장에서.` (예시) | "합리적인 가격에"는 가격 근거 없는 마케팅 클레임 + Broadcast & Film Edition(최상위 구성) 포지셔닝과 상충. 가격 소구 대신 가치 소구 권고. |
| 🟢 | §02 lead (L143) | `…세 가지가 한 플랫폼에 모였습니다.` | (유지) | 톤 양호. |
| 🟢 | BAM Award 표기 (L46) | `BAM Award 2023 Create 수상` | (유지, 단 제조사 수상임을 명확히) | Aximmetry 제품 수상이며 EX 실적 아님 — 현재 features 카드 맥락상 제품 기능 설명이라 오인 소지 낮음. 유지 가능. |

**정직성/사실 정합:** ✅ **Broadcast & Film Edition만 공급** 명시 일관(metadata·§03·§05·FAQ). 타 에디션·무료체험 언급 **없음**. DE(Dual Engine) 설명 정확. "공식 인증 리셀러" 라벨 일관. **핵심 정합 통과.**
**라벨:** PageHero tag="Certified Reseller", §10 "EX는 Aximmetry 공식 인증 리셀러입니다" 정확.

---

## 5. `src/app/product/moverse/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟠 | PageHero tag (L127) | `tag="Korea Distributor"` | `tag="Distributor"` | site.ts/home 영문 라벨과 통일(🟠 공통 이슈). 한글 §09 "공식 한국 총판"은 정확하니 유지. |
| 🟢 | features "산업용 AI 뎁스 비전" (L52) | `4 TOPS 온디바이스 연산·12MP·150° 초광각·IP65…` | (유지) | §05 사양표와 수치 일치. 사실 정합 OK. |

**정직성/사실 정합:** ✅ 모든 수치(4 TOPS, 12MP, 150°, IP65, 4→16대, 4m×4m~10m×10m)가 §05 SpecTable과 교차 일치. "제품 사양이며, EX는 공식 한국 총판으로서 도입·기술지원을 담당" 디스클레이머 명확. **통과.**
**라벨:** §09 "EX는 Moverse의 공식 한국 총판입니다" 정확. 영문 tag만 통일 대상.

---

## 6. `src/app/product/retracker/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟠 | PageHero tag (L141) | `tag="Korea Distributor"` | `tag="Distributor"` | 공통 영문 라벨 통일(🟠). |
| 🟢 | site.ts 메가메뉴 desc (참고) | `실시간 6DoF 고정밀 광학 트래킹` | `6-DOF 마커리스 카메라 트래킹` | site.ts L81 메뉴 설명이 "광학 트래킹"인데 제품 핵심은 **마커리스 vSLAM**. 페이지 본문과 용어 정합(메뉴 카피라 참고용). |

**정직성/사실 정합:** ✅ 정확도 수치에 **"(제조사 사양 기준)"** 라벨 일관 부착(whyPoints·features·FAQ). <1cm/10m·500fps·6-DOF가 §05 SpecTable과 일치. "EX 공식 한국 총판" 디스클레이머 명확. **통과 — 모범 사례.**

---

## 7. `src/app/xr-studio/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🔴 | PageHero lead (L62) · §01 h2 (L77) 등 본문 다수 | `하남 EX Studio는…` / `EX Studio가 다른 이유` | `하남 EX XR Studio는…` / `EX XR Studio가 다른 이유` | **거점 정식 명칭은 `EX XR Studio`**(site.ts·과제 스펙). 본문 전반이 "EX Studio"로 축약돼 거점명 불일치. metadata(L15)는 "EX XR 스튜디오"로 맞음 → 본문만 정합 필요. |
| 🟡 | CTA h2 (L199) | `목적에 맞는 최적의 구성을 제안해 드립니다.` | `목적에 맞는 구성을 제안해 드립니다.` | "최적의" 최상급 절제(solution과 동일 패턴). |
| 🟢 | facilitySpecs (L52) | `시네마 카메라(4.6K) + PTZ 멀티카메라` | (유지) | 시설 스펙 — 실측 자료 전제. 정합 OK. |

**정직성:** ✅ CTA가 **"견적 문의/맞춤 견적"** 으로 일관(과제 정직성 스펙: 스튜디오=견적 문의만). 가짜 실적·수치 없음. 배경 프리셋은 상품 구성이라 OK. **명칭(🔴) 외 통과.**

---

## 8. `src/app/work/page.tsx` (+ `WorkGallery.tsx` · `lib/work.ts`)

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟢 | metadata (work.ts·page) | `활용 시나리오 / 기대 효과 / 실제 도입 사례는 순차 업데이트` | (유지) | 정직성 라벨링 모범. |
| 🟢 | work.ts stack (L70, L92 등) | `"EX Studio"` (스택 칩) | `"EX XR Studio"` 검토 | 거점명 일관성. 단 스택 칩은 약칭 허용 여지 — 우선순위 낮음. |

**정직성:** ✅ **모범 사례.** WorkGallery 하단 고정 문구 "현재 항목은 활용 시나리오입니다 · 실제 도입 사례는 순차 업데이트됩니다", 카드 CTA "시나리오 보기", work.ts 주석(scenario 표기·기대효과 예시)까지 일관. 결과 수치(4→1, −70% 등)는 시나리오 맥락 안 + 실제 고객사명 없음. **통과.**

---

## 9. `src/app/about/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🔴 | metadata description (L14) | `…판교 본사·하남 XR 스튜디오를 소개합니다.` | `…성남 EX AI Office·하남 EX XR Studio를 소개합니다.` | **옛 표기 "판교 본사" 잔존.** SSoT(site.ts locations)는 EX AI Office(성남 금토동). §05 Locations 본문은 site.ts에서 렌더되어 정확하므로 metadata만 어긋남. |
| 🟡 | whyEx (L21) | `문화기술과 엔터테인먼트를 연결하는 깊은 이해` | `문화기술과 엔터테인먼트를 잇는 전문성` | "깊은 이해"는 추상 형용. desc("콘텐츠와 기술을 잇는 전문성")와 중복 — 헤드라인을 구체화. |
| 🟢 | history 2026 (L39) | `중소벤처기업부 TIPS 선정 — AI 기반 XR 제작 솔루션 R&D` | (사실 확인 후 유지) | 실적 주장 — 사실이면 OK. 검증 책임 표기 불필요(공식 선정). |

**정직성:** ✅ 특허 6건(특허번호 명시)·인증·연혁·MOU 모두 구체·검증 가능 형태. 가짜 고객사 없음. **metadata 거점명(🔴) 외 통과.**
**라벨:** §01 미션/비전 톤 양호(합니다체). PageHero title "EXpansion of EXperience." 브랜드 슬로건 정합.

---

## 10. `src/app/careers/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🔴 | metadata (L14) | `…판교·하남의 일하는 공간…` | `…성남·하남의 일하는 공간…` | 옛 표기 "판교" 잔존. 거점은 성남(EX AI Office)·하남. |
| 🔴 | spaces (L47) | `label: "판교 HQ"` | `label: "성남 오피스"` 또는 `"EX AI Office"` | **옛 표기 "판교 HQ" 잔존** — 과제 스펙이 명시 색출 대상으로 지목한 "HQ" 표기. site.ts는 EX AI Office(성남 금토동). |
| 🔴 | §03 Spaces lead (L142) | `판교 본사와 하남 스튜디오 — 우리가 매일 만들고 어울리는 곳입니다.` | `성남 오피스와 하남 스튜디오 — 우리가 매일 만들고 어울리는 곳입니다.` | "판교 본사" 옛 표기 잔존. |
| 🟢 | env (L61) | `워라밸 존중` / `가족 같은 회사보다 가족을 지킬 수 있는 회사` | (유지) | 의도된 대조 카피 — 채용 톤상 효과적. 클리셰 아님. |

**정직성:** ✅ 가치/문화 카피는 내부 가치 서술이라 날조 무관. Open Positions "상시 지원/순차 공개" 정직. **거점 표기(🔴 3건) 외 통과.**
**참고:** spaces 중 판교/라운지는 `real:false`(MediaBlank 플레이스홀더)라 실제 사진 주장 아님 — 라벨명만 수정하면 됨.

---

## 11. `src/app/support/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟢 | downloads (L53) | `도입 케이스 스터디` (PDF, "준비 중") | `도입 가이드` 또는 유지 | "케이스 스터디"는 실제 사례 뉘앙스 — 단 전 항목 "준비 중" 상태라 날조 아님. Work의 "활용 시나리오" 톤과 맞추려면 명칭 검토. |
| 🟢 | FAQ "비개발자도…" (L37) | `EXLINK는 단일 제어 UI를 제공해…` | (유지) | xr-solution "운영자 1인 중심 제어 UI"와 정합. OK. |

**정직성:** ✅ 핫라인·이메일은 site.ts 실제 연락처. 자료실 전 항목 "준비 중" 명시. **이상 없음.**
**라벨:** EXLINK="자체 솔루션" 톤 정확.

---

## 12. `src/app/news/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟢 | 전체 | PageHero/Archive/뉴스레터 | (유지) | 합니다체·톤 양호. fallback(pressFallback) 콘텐츠는 별도 파일이므로 본 감사 범위 밖(필요 시 추가 점검). |

**정직성:** ✅ 보도자료는 Notion/실제 fallback 연동 — 페이지 자체 카피에 날조 없음. **이상 없음.**
> 참고: `src/lib/press-fallback.ts`의 보도자료 제목/요약은 실제 배포 자료 여부 확인 권고(본 감사 13개 대상 외).

---

## 13. `src/app/contact/page.tsx`

| 심각도 | 위치 | 현재 문구 | → 수정 제안 | 근거 |
|---|---|---|---|---|
| 🟢 | inquiries Studio (L18) | `EX XR Studio 콘텐츠 제작 협의` | (유지 — 정확) | 여기선 "EX XR Studio" 정식명 사용 ✅. xr-studio 본문이 이쪽에 맞춰야 함(역참조). |
| 🟢 | 전체 | 연락처·주소 | (유지) | locations·contact 모두 site.ts에서 렌더 → 거점 정확. 회신 SLA "영업일 1~2일" 구체적·정직. |

**정직성/거점:** ✅ **모범.** 주소·전화·이메일·팩스 모두 SSoT 연동, EX AI Office/EX XR Studio 정식명 노출. **이상 없음.**

---

## 부록 A · 공유 컴포넌트 (전 페이지 영향)

| 심각도 | 파일/위치 | 현재 | → 수정 | 근거 |
|---|---|---|---|---|
| 🟢 | `CtaBanner.tsx` h2 (L12) | `XR 제작, 어디서부터 시작해야 할지 모르시겠다면?` | (유지) | 톤·CTA(도입 상담/스튜디오/자료) 양호. 전 페이지 일관. |
| 🟠 | `site.ts` nav Moverse/RETracker tag (L75, L80) | `tag: "Distributor"` | (이 값이 기준) | 이 메가메뉴 라벨이 `Distributor` → product/moverse/retracker의 `Korea Distributor`를 이쪽으로 통일 권고. |
| 🟢 | `site.ts` RETracker desc (L81) | `실시간 6DoF 고정밀 광학 트래킹` | `6-DOF 마커리스 카메라 트래킹` | 제품 본문 용어(마커리스 vSLAM)와 정합. |

---

## 그룹별 적용 우선순위

**A그룹 (solution·product 인덱스 + VP) — 먼저**
- product 인덱스 영문 badge `Korea Distributor → Distributor` 통일 (🟠)
- solution: "최적의/양손 전략/모든 자산" 절제 (🟡)
- VP: methods 태그 1종 통일, 크로마 치수 단위(m) 표기 (🟠/🟡)

**B그룹 (제품 3종)**
- moverse·retracker PageHero tag `Korea Distributor → Distributor` (🟠)
- aximmetry PageHero "합리적인 가격에" 가치 소구로 교체 (🟡)
- (사실 정합·에디션·총판/리셀러 라벨은 이미 모범 — 유지)

**C그룹 (company·studio·work·support·news·contact)**
- **xr-studio 본문 "EX Studio → EX XR Studio" 정식명 정합 (🔴)**
- **about metadata "판교 본사 → 성남 EX AI Office" (🔴)**
- **careers metadata·spaces·§03 lead "판교/판교 HQ/판교 본사 → 성남·성남 오피스/EX AI Office" (🔴 ×3)**
- about whyEx "깊은 이해" 구체화 (🟡)

---

## 🔴 정직성/사실오류 총정리 (즉시 수정 — 모두 "거점 옛 표기 잔존")

| # | 페이지 | 위치 | 현재 | → 수정 |
|---|---|---|---|---|
| 1 | xr-studio | PageHero lead·§01 h2 등 본문 다수 | `EX Studio` | `EX XR Studio` |
| 2 | about | metadata description | `판교 본사·하남 XR 스튜디오` | `성남 EX AI Office·하남 EX XR Studio` |
| 3 | careers | metadata | `판교·하남의 일하는 공간` | `성남·하남의 일하는 공간` |
| 4 | careers | spaces label | `판교 HQ` | `성남 오피스`(또는 `EX AI Office`) |
| 5 | careers | §03 Spaces lead | `판교 본사와 하남 스튜디오` | `성남 오피스와 하남 스튜디오` |

> 본문에 노출되는 거점/연락처는 대부분 `site.ts`에서 렌더되어 정확하다. **🔴는 전부 페이지에 하드코딩된 metadata/라벨/축약명**이며, 실제 주소·전화·이메일 날조나 가짜 고객사·실적은 **발견되지 않음.** 활용 사례=시나리오, 수치=기대효과(예시), 스튜디오=견적 문의, 파트너=리셀러/총판 디스클레이머는 전 페이지에서 정확히 지켜지고 있다.

## 🟠 일관성 핵심
- 영문 총판 라벨 2종 혼용: `Distributor`(site.ts·home·xr-solution) vs `Korea Distributor`(product 인덱스·moverse·retracker PageHero) → **`Distributor`로 통일 권고.**
- VP methods 태그 `EX 강점` vs `EX 핵심` 혼용.
- RETracker 메뉴 desc "광학 트래킹" vs 본문 "마커리스 vSLAM" 용어 불일치.

## 페이지별 수정 건수 요약

| 페이지 | 🔴 | 🟠 | 🟡 | 🟢 | 비고 |
|---|---|---|---|---|---|
| solution | 0 | 1 | 1 | 2 | 정직성 이상 없음 |
| solution/virtual-production | 0 | 1 | 1 | 1 | 이상 없음 |
| product | 0 | 2 | 0 | 1 | 라벨 통일만 |
| product/aximmetry | 0 | 0 | 1 | 2 | 에디션·총판 라벨 모범 |
| product/moverse | 0 | 1 | 0 | 1 | 사실 정합 모범 |
| product/retracker | 0 | 1 | 0 | 1 | 사실 정합 모범 |
| xr-studio | 1 | 0 | 1 | 1 | 거점명 정합 필요 |
| work | 0 | 0 | 0 | 2 | 정직성 모범 |
| about | 1 | 0 | 1 | 1 | metadata 거점명 |
| careers | 3 | 0 | 0 | 1 | 거점 옛 표기 집중 |
| support | 0 | 0 | 0 | 2 | 이상 없음 |
| news | 0 | 0 | 0 | 1 | 이상 없음 (fallback 별도) |
| contact | 0 | 0 | 0 | 2 | 거점 표기 모범 |
| (공유) site.ts·CtaBanner | 0 | 2 | 0 | 2 | 라벨 SSoT 정리 |
| **합계** | **5** | **8** | **6** | **20** | |
