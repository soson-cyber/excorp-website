---
name: ex-image-generation
description: EX 웹사이트용 이미지를 GPT 이미지(OpenAI gpt-image-1, 기본) 또는 Nano Banana(Gemini)로 생성할 때 반드시 사용. 이미지 브리프를 브랜드 정합(다크 퍼플·민트·핑크, 3D EX 큐브 모티프) 프롬프트로 번역하고 번들 스크립트로 생성·재생성한다. "이미지 생성", "히어로 비주얼 만들어", "GPT 이미지", "OpenAI 이미지", "gpt-image", "Nano Banana", "Gemini 이미지", "제품샷/배경 이미지 생성", 그리고 재생성·수정 요청 시 트리거. 실제 로고·인증서·특허는 생성하지 않는다(정직성).
---

# EX 이미지 생성 (Nano Banana / Gemini 2.5 Flash Image)

브리프 → 브랜드에 맞는 실제 이미지로 변환한다. image-generator 에이전트가 사용한다.

## 0. 엔진 선택
두 생성 엔진을 같은 CLI 계약(`--prompt --out --ref --aspect`)으로 쓴다. **기본 = GPT 이미지(OpenAI `gpt-image-1`)**.

| 엔진 | 스크립트 | 키 | 강점 |
|---|---|---|---|
| **GPT 이미지(기본)** | `scripts/openai_generate.py` | `OPENAI_API_KEY` | 프롬프트 충실도·구도 제어, `--background transparent`(투명 PNG), 일관 품질 |
| Nano Banana(Gemini) | `scripts/nanobanana_generate.py` | `GEMINI_API_KEY` | 레퍼런스 합성·자유 종횡비 |

- 사용자가 엔진을 지정하면 그것을, 아니면 **가용한 키가 있는 엔진**을 쓴다(둘 다 있으면 GPT).
- 어느 엔진이든 키 미설정이면 스크립트가 **exit 2**로 멈춘다 → 추측 진행 금지, 사용자에게 해당 키 셋업 요청.

## 1. 1회 셋업 (최초 1번, 사용자만 가능)
**키 등록 — 권장: 프로젝트 `.env.local`** (Notion 토큰과 같은 자리, 셸 프로파일 불필요). 두 생성 스크립트는 실행 시 cwd의 `.env.local`/`.env`를 자동 로드한다(이미 export된 환경변수가 우선). `.env.local`은 git에 커밋되지 않는다.
```bash
# /Users/ex_ceo/Documents/Claude/Projects/excorp-website/.env.local 에 추가
OPENAI_API_KEY=sk-...      # https://platform.openai.com/api-keys  (GPT 기본)
GEMINI_API_KEY=...         # https://aistudio.google.com/apikey   (Gemini 선택)
```
라이브러리 설치:
```bash
pip install openai pillow          # GPT 기본
pip install google-genai pillow    # Gemini 선택
```
> 대안(셸 영구 등록): `echo 'export OPENAI_API_KEY="sk-..."' >> ~/.zshrc && source ~/.zshrc`. 단 **본인 터미널에서만 export하면 Claude Code의 Bash 세션엔 전달되지 않는다** — `.env.local` 또는 `~/.zshrc`처럼 영속 위치에 둬야 한다.

## 2. 생성 명령
**GPT 이미지(기본):**
```bash
cd /Users/ex_ceo/Documents/Claude/Projects/excorp-website
python3 .claude/skills/ex-image-generation/scripts/openai_generate.py \
  --prompt "<아래 공식으로 만든 프롬프트>" \
  --out _workspace_img/gen/home-hero.png \
  --ref public/ex-cube.png \
  --aspect 16:9 \
  --quality high          # 필요 시 --background transparent (UI/투명 PNG)
```
**Nano Banana(Gemini):** 위에서 스크립트만 `nanobanana_generate.py`로 바꾸고 `--quality`/`--background` 생략.
```bash
python3 .claude/skills/ex-image-generation/scripts/nanobanana_generate.py \
  --prompt "..." --out _workspace_img/gen/home-hero.png --ref public/ex-cube.png --aspect 16:9
```
- `--ref` 반복 가능(브랜드 모티프·재질 일관성). GPT는 `--ref`가 있으면 `images.edit`로, 없으면 `images.generate`로 동작.
- **종횡비:** GPT는 `--aspect`를 지원 size(`1536x1024`·`1024x1024`·`1024x1536`)로 매핑하거나 `--size` 직접 지정. Gemini는 프롬프트 구도 지시로 합성.
- 성공 시 stdout `OK <path> <W>x<H>` → 이 치수를 QC에 함께 넘긴다.
- 사용한 **엔진·모델·최종 프롬프트·레퍼런스·종횡비**를 `_workspace_img/02_prompts/{id}.txt`에 남긴다(재현·재생성용).

## 3. 프롬프트 공식
브리프를 그대로 넣지 말고, 아래 6요소로 **번역**한다. 순서대로 한 문단:

1. **피사체+장면** — 무엇이, 무엇을 하고 있나(구체 명사). 예: "an isometric data-center rack glowing with XR pipeline nodes".
2. **구도·시점** — 카메라 각도, 중앙정렬, 여백. EX는 **중앙정렬** 레이아웃 → 피사체를 중앙에, 주변 네거티브 스페이스 확보(텍스트가 올라갈 자리).
3. **조명·분위기** — "moody dark studio lighting, volumetric haze, soft rim light".
4. **색 — 수치로 박는다** — `deep navy background (#0E0626 / #1A1D40), purple #5E2EC0 and electric mint #45F1E0 accents, magenta #D206EE highlights, cyan→purple→pink gradient glow`.
5. **재질·스타일** — "high-fidelity 3D render" 또는 "photorealistic studio photography", "subtle film grain, premium tech brand aesthetic".
6. **네거티브** — "no text, no logos, no watermark, no captions, no UI chrome, no people unless specified".

### 브랜드 스타일 블록 (모든 프롬프트에 붙이는 공통 꼬리표)
```
Brand: EX Corporation — premium dark product-led XR tech. Palette: navy #0E0626/#1A1D40 base,
purple #5E2EC0, mint #45F1E0, magenta #D206EE; cyan→purple→pink gradient energy.
Mood: cinematic, precise, real-time, high-tech. No baked-in text or logos.
```

### 모티프 가이드
- **3D EX 큐브/모놀리스** — Home·About 히어로의 핵심 모티프. `--ref public/ex-cube.png`로 잇는다. "floating glassy EX monolith cube, refractive edges, particle field".
- **실사 사진군** — 스튜디오·그린스크린·제품·모캡은 사진풍("photorealistic", 실제 장비 묘사). 시리즈는 같은 조명·레퍼런스로 통일.
- **추상 배경** — 섹션 배경은 텍스트 가독을 위해 저대비("subtle", "dark, low-contrast, generous negative space").

## 4. 종횡비·해상도
- 히어로/풀블리드 = `16:9`(또는 `21:9`), 카드/제품샷 = `4:3`·`1:1`, 모바일 세로 = `4:5`·`9:16`. 브리프 수치를 우선한다.
- Nano Banana는 정확한 픽셀 크기를 보장하지 않는다 → `--aspect`로 비율을 유도하고, 정밀 크기가 필요하면 생성 후 `sips`로 리사이즈·크롭(QC가 실측). 웹 흐림 방지를 위해 목표보다 크게 뽑아 다운스케일.

## 5. 재생성 전략 (QC FAIL 대응)
- **색 어긋남** → 색 수치 문장을 프롬프트 앞쪽으로 옮기고 강조. 레퍼런스로 톤 고정.
- **피사체 틀림** → 1번 피사체 묘사를 더 구체화, 모호어 제거.
- **아티팩트(깨진 글자·잉여 사지)** → 네거티브 강화("no text, no extra limbs"), 시드 바꿔 재생성.
- **종횡비 틀림** → `--aspect` 명시 + 필요 시 크롭.
- 직전 프롬프트(`02_prompts/{id}.txt`) 베이스로 **델타만** 수정한다. 처음부터 다시 쓰지 않는다.

## 6. 정직성 (반드시)
실제 파트너 로고(Aximmetry/Moverse/RETracker)·총판 인증서·특허 도면·기업명·구체 수치는 **생성 금지**. 그런 브리프는 거부하고 실제 파일(`public/cert-*.png`·`patent-*.jpg`) 사용을 요청한다. 글자가 필요한 비주얼은 이미지에 굽지 말고 프론트(HTML/CSS)에서 올린다 — 한글 깨짐·오타 위험.

## 테스트 프롬프트
- "Home 히어로용 떠다니는 3D EX 큐브 비주얼, 16:9, ex-cube.png 레퍼런스로." → 큐브 모티프 + 종횡비 + 레퍼런스 경로 확인.
- "XR Solution 활용분야 카드 3장(방송/패션/이벤트) 사진풍 배경, 같은 조명으로 통일." → 시리즈 일관성 전략 적용.
