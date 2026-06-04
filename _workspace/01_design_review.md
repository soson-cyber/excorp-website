# XR Solution 미디어 레이아웃 설계 — design-ux-reviewer

대상: `src/app/solution/xr-solution/page.tsx` (8개 섹션)
범위: 미디어(이미지/영상) **자리·비율·배치만 확정**. 실제 자산은 추후, 지금은 브랜드 톤 플레이스홀더(`MediaBlank`)로 채운다. 구현은 frontend-builder.
기준: `DESIGN.md §0(다크)`·§4(card)·§5(layout)·§7(motion)·§9(responsive), 기존 컴포넌트(`card`, `container-ex`, `section--ink/surface/white`, `Reveal`).

---

## 0. 핵심 판단 (요약)

- **과밀 금지 원칙 적용**: 8개 섹션 전부에 미디어를 넣지 않는다. 정보 위계상 임팩트가 큰 **5곳**에만 선별 배치(Hero / §02 / §03 / §05 / §08). 나머지(§01·§04·§06·§07)는 "미디어 불필요" 또는 "텍스트·다이어그램 우선"으로 명시.
- **PageHero는 건드리지 않는다.** 공용 컴포넌트이고 다른 페이지(`/solution/*`, `/product/*`)가 공유한다. 영상은 **Hero 바로 아래 첫 섹션을 풀블리드 영상 밴드**로 둔다(신설 §00 띠). 이렇게 하면 PageHero의 오로라·그리드 톤과 자연스럽게 이어지면서 공용 컴포넌트 리스크 0.
- **§08 `section--glow` 메모**: 현재 §08에 `section--glow` 클래스가 붙어 있으나 globals.css에서 이미 시각 효과가 제거된 무력 클래스다(라인 2391~). 단색 배경 정책 위배는 아니지만 **죽은 클래스이므로 제거 권장**(별도 정리, 이번 미디어 작업 범위 밖).
- **플레이스홀더 그라데이션 허용 범위 확인**: 배경 글로우는 전 사이트 제거됨. `MediaBlank` 카드 **내부 한정** 미세 브랜드 그라데이션은 배경 정책 위배가 아니다(섹션 배경이 아니라 콘텐츠 자산 자리이므로). 단 `box-shadow` 네온 글로우는 금지(DESIGN.md §8) — 깊이는 보더로만.

---

## 1. MediaBlank 컴포넌트 API 제안

추후 `<video>`/`<img>`로 **자리만 교체**되도록, 비율 컨테이너 + 내부 라벨 구조를 고정한다. 신규 파일 `src/components/media/MediaBlank.tsx` 제안.

### Props

```ts
type MediaRatio = "16/9" | "16/10" | "4/3" | "1/1" | "3/2";
type MediaKind  = "video" | "image" | "diagram" | "logo";

interface MediaBlankProps {
  /** 자산이 무엇이 들어올지 사람이 읽는 한 줄 (예: "스튜디오 실사 — 와이드") */
  label: string;
  /** 보조 설명/캡션 (선택) — 촬영 가이드·예정 문구 */
  sublabel?: string;
  /** 비율. 미지정 시 "16/9" */
  ratio?: MediaRatio;
  /** 종류. 아이콘/문구/내부 톤 분기. 미지정 시 "image" */
  kind?: MediaKind;
  /** 추가 클래스 (그리드 span, 라운드 보정 등) */
  className?: string;
  /** 추후 교체 시 alt가 될 의미 텍스트(지금은 aria-label로 사용) */
  alt?: string;
}
```

### 다크 톤 스타일 방향 (DESIGN.md §0 정합)

- 컨테이너: `aspect-ratio: var(--ratio)` + `border-radius: 1rem`(카드와 동일 `rounded-2xl`) + `1px solid var(--color-border)` + `overflow:hidden`. **그림자/네온 글로우 없음** — 깊이는 보더로만.
- 채움: 카드 표면(`#161232`) 위에 **카드 내부 한정 미세 그라데이션** 허용.
  예: `background: radial-gradient(120% 90% at 50% 0%, rgba(94,46,192,.14), transparent 60%), var(--color-card)` — 핫퍼플 톤을 상단에서 아주 옅게. 이는 섹션 배경이 아니라 자산 자리이므로 단색 배경 정책과 무관.
- 중앙 라벨: `kind`별 미니 아이콘(▶ video / ◻ image / ⬡ diagram / ◇ logo, `aria-hidden`) + `label`(`text-faint`, mono eyebrow 톤) + `sublabel`(`text-[11px] text-faint`). 텍스트는 모두 `--color-faint #9094A9`(다크 AA) 이하로 내리지 않는다.
- 미세 그레인/도트는 추가하지 않는다(layout.tsx 전역 그레인이 이미 덮음).
- 모서리에 작은 모노 태그 `자산 예정` 또는 `시나리오`(§08 정직성 라벨) 표시 옵션.

### 추후 교체 동선

`MediaBlank`의 **비율 컨테이너만 유지**하고 내부만 교체하면 레이아웃 흔들림 0:

```tsx
// 영상 (Hero 밴드, §02 Before/After)
<video muted loop playsInline poster="/xr/hero-poster.jpg" className="h-full w-full object-cover">
  <source src="/xr/hero-loop.webm" type="video/webm" />
  <source src="/xr/hero-loop.mp4" type="video/mp4" />
</video>

// 이미지 (§05 스튜디오, §08 시나리오)
<Image src="/xr/studio.jpg" alt="하남 XR 스튜디오 실사" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
```

→ frontend-builder는 `MediaBlank`에 `as`/children 슬롯을 두지 말고, **동일 비율 래퍼**를 컴포넌트로 뽑아 `MediaBlank`와 실제 `<MediaFrame ratio>`가 같은 래퍼를 공유하게 한다(교체 시 비율·라운드·보더 일관).

---

## 2. 섹션별 결정 표

권장 미디어 배치 = **5곳**(Hero밴드·§02·§03·§05·§08). 나머지는 텍스트/다이어그램 우선.

| 섹션 | 미디어? | 비율 | 배치 | 모바일 동작 | 라벨 의도 |
|------|--------|------|------|------------|----------|
| **Hero 밴드 (신설 §00, Hero 바로 아래 첫 섹션 `section--ink`)** | **O** | 16/9 | **풀블리드 영상 밴드** (container-ex 안, 가로 꽉) | 16/9 유지, 1열. poster 우선·자동재생은 reduced-motion 시 정지 | `video` · "실시간 XR 프로덕션 루프 (촬영→트래킹→렌더→송출)" |
| §01 EXLINK이란? | 유지(기존 `vp-workflow.png`) | 891×557(≈16/10) | 좌우 2단(기존 유지) | 1열 스택(이미지 아래로), 기존과 동일 | 콘솔 실화면 **추가 자리 불필요** — 노드 워크플로 이미지로 충분. 과밀 방지 |
| §02 왜 통합인가 | **O** | 16/9 ×2 | **Before/After 2분할** (lead 아래, contrast 카드 위 or 카드 대체 검토) | 세로 2스택(Before→After), 각 16/9 | `image`/`diagram` · "분산형 셋업" vs "EXLINK 통합 셋업" 대비. 정보 위계 핵심 |
| §03 아키텍처 | **O** | 21/9 또는 16/6 (가로 와이드) | **파이프라인 노드 UI 아래** 풀폭 다이어그램 자리 | 모바일은 다이어그램을 **세로 흐름 이미지**로(또는 4/3 단순화). 노드 UI는 기존대로 세로 스택 | `diagram` · "전체 신호 흐름 / 결선 다이어그램". 노드 UI(개념)+다이어그램(실제 결선) 역할 분리 |
| §04 핵심 기능 | **X (텍스트 유지)** | — | 카드 6개 텍스트 그리드 유지 | 기존 1→2→3열 | 기능 카드에 16/10 미디어 넣으면 6장 더미가 과밀·산만. 아이콘조차 자산 부담. **미디어 불필요** |
| §05 시스템 구성(턴키) | **O** | 16/9 | SW/HW 2카드 **위에 풀폭 스튜디오 와이드** 1장 (헤더·lead 아래, 카드 그리드 앞) | 16/9 유지, 1열. 카드는 기존대로 2→1열 | `image` · "하남 XR 스튜디오 실사 — 턴키 구축 예시". 실사로 신뢰감 |
| §06 연결하는 기술 | **X (로고 자리 보류 권장)** | (16/9 로고 셀) | — | — | 파트너 로고 그리드는 매력적이나 **실제 로고 자산·사용 허가 확인 전까지 보류**. 더미 로고는 정직성·법적 리스크. 지금은 텍스트 카드 유지, "로고는 자산 확보 후"로 명시 |
| §07 도입 방식 | **X (미디어 불필요)** | — | 4단계 number 카드 유지 | 기존 1→2→4열 | 프로세스 정보 그래픽 자체가 콘텐츠. 사진 불필요 — **미디어 불필요** 확정 |
| §08 활용 분야 | **O** | 16/10 | **시나리오 썸네일 그리드** (useCases 6종 카드에 상단 썸네일 부착) | 1→2→3열, 각 16/10 유지 | `image` · 각 카드 상단에 16/10 + 모서리 **"활용 시나리오"** 정직성 라벨(실적 아님 명시). DESIGN.md §8 정직성 규칙 충족 |

### 배치 근거 보충

- **Hero 영상을 PageHero에 넣지 않는 이유**: PageHero는 `breadcrumb/tag/title/lead`만 받는 공용 컴포넌트(다른 솔루션·제품 페이지 공유). 영상 prop을 추가하면 모든 페이지 회귀 위험. → XR 페이지 전용으로 **Hero 아래 첫 섹션(`section--ink`)에 풀블리드 영상 밴드**를 두면 PageHero 무수정 + 톤 연속.
- **§02 Before/After**가 이 페이지의 "왜"를 시각적으로 가장 설득력 있게 전달 → 미디어 1순위.
- **§03 다이어그램**은 노드 UI(개념적 5단계)와 **역할이 다른** 실제 결선/신호 흐름. 둘을 합치지 말고 노드 UI 아래에 가로 다이어그램 자리.
- **§05 스튜디오 와이드**는 "턴키" 주장에 실물 근거. 1장만(과밀 방지).
- **§04·§07은 미디어가 오히려 노이즈** — 텍스트/번호 그래픽이 더 빠르게 읽힌다.
- **§06 로고는 보류** — 더미 파트너 로고는 정직성 위반 소지(DESIGN.md §8 "로고 날조 금지"). 실 자산·허가 확인 후 별도 진행.

---

## 3. 반응형 · 접근성 주의

### 반응형 (데스크톱/모바일 양 모드)
- **비율 유지**: `aspect-ratio`로 컨테이너를 고정해 모바일에서도 16/9·16/10 유지 → CLS 0. `<img>`/`<video>`는 `object-cover` + `fill`.
- **§02 Before/After**: 데스크톱 `md:grid-cols-2`, 모바일 세로 2스택(Before→화살표/라벨→After). DESIGN.md §9 "다이어그램 모바일 세로 흐름" 규칙 준수.
- **§03 가로 와이드 다이어그램**: 데스크톱 21/9, 모바일은 가로 다이어그램이 너무 작아짐 → **모바일 전용 세로 단순화 이미지**(`4/3`) 또는 가로 스크롤 금지. 노드 UI(기존)는 이미 `lg:flex-row` → 모바일 세로(`flex-col`)로 잘 동작하므로 그대로.
- **§08 썸네일**: 카드 그리드 기존 `sm:grid-cols-2 lg:grid-cols-3` 유지, 썸네일은 카드 폭 100%·16/10. 모바일 1열에서 6장 세로 — 길어지지만 허용(스캔 가능).
- 좁은 폭(<360px) 16/9 영상 밴드 좌우 여백은 `container-ex`(padding-inline 1.25rem) 안에서 처리.

### 접근성 (WCAG)
- **영상**: `<video muted loop playsInline>` + `poster`. **`prefers-reduced-motion: reduce` 시 자동재생 금지** → poster(정지 이미지)만 표시하거나 재생 버튼 제공. `aria-label`로 영상 내용 설명, 자막 불요(나레이션 없는 루프면 `role` 생략 가능).
- **이미지 `alt`**: 의미 있는 한국어 alt 필수. 장식적 그라데이션/플레이스홀더 채움은 `aria-hidden` + 빈 alt 금지(자산 들어오면 실 alt).
- **MediaBlank(플레이스홀더 단계)**: 콘텐츠 부재 상태이므로 `role="img"` + `aria-label="{label} (자산 준비 중)"`. 스크린리더가 "준비 중"임을 인지하게.
- **대비**: 플레이스홀더 라벨 텍스트는 `--color-faint #9094A9` 이상(다크 AA). 그 아래로 내리지 않는다.
- **다이어그램 §03**: 이미지 다이어그램은 핵심 정보를 텍스트로도 제공(현재 노드 UI 텍스트가 그 역할 — 다이어그램은 보조). 다이어그램만으로 신호 흐름을 전달하지 않도록 캡션 병기.
- **단색 배경 정책**: 섹션 배경에는 어떤 그라데이션/글로우도 추가하지 않음. 그라데이션은 `MediaBlank` 카드 **내부**로 한정 → 정책 위배 없음. `section--glow`(무력 클래스)는 별도 제거 권장.

---

## 4. frontend-builder 구현 지시 요약 (한 줄씩)

1. `src/components/media/MediaBlank.tsx` 신설 — props(`label, sublabel, ratio, kind, className, alt`), `aspect-ratio` 컨테이너 + `rounded-2xl` + `border-border`, 그림자/네온 글로우 없음.
2. `MediaBlank` 채움 = 카드 표면(`--color-card`) + **상단 핫퍼플 radial 미세 그라데이션**(카드 내부 한정), 중앙 `kind` 아이콘(`aria-hidden`)·`label`·`sublabel`, 라벨색 `--color-faint` 이상.
3. 추후 교체용 동일 비율 래퍼(`MediaFrame`)로 분리 — `MediaBlank`/실제 `<video>`/`<Image fill>`가 같은 비율·라운드·보더 공유.
4. **PageHero는 수정 금지.** XR 페이지 Hero 아래 **신설 §00 풀블리드 영상 밴드**(`section--ink`, 16/9 `kind="video"`) 추가.
5. §01 — 변경 없음(기존 `vp-workflow.png` 좌우 2단 유지, 추가 미디어 없음).
6. §02 — lead 아래 **Before/After 2분할**(`md:grid-cols-2`, 각 16/9 `MediaBlank`), 모바일 세로 스택. 기존 contrast 텍스트 카드는 그 아래 유지 또는 통합은 별도 판단.
7. §03 — 노드 UI **아래** 가로 와이드 다이어그램 자리(21/9 `kind="diagram"`), 모바일 4/3 단순화 변형.
8. §04 — 변경 없음(텍스트 카드 유지, 미디어 넣지 않음).
9. §05 — 헤더·lead 아래·SW/HW 카드 **앞**에 풀폭 스튜디오 와이드 1장(16/9 `kind="image"`).
10. §06 — 변경 없음(파트너 로고 자리 보류, 자산·허가 확보 후 별도 작업).
11. §07 — 변경 없음(미디어 불필요 확정).
12. §08 — useCases 6 카드 **상단에 16/10 썸네일** 부착(`MediaBlank kind="image"`), 모서리 **"활용 시나리오"** 모노 라벨로 정직성 표기.
13. 모든 영상: `muted loop playsInline poster` + `prefers-reduced-motion` 시 자동재생 정지(poster만). 모든 미디어 `Reveal`로 입장(기존 패턴) 가능하되 비율 컨테이너로 CLS 0 유지.
14. (별도/범위 밖) §08 `section--glow` 무력 클래스 제거 정리.
