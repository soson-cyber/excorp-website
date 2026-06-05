---
name: ex-figma-image-bridge
description: EX 웹사이트 이미지 파이프라인의 Figma 경계 작업에 반드시 사용. (인테이크) Figma 원본에서 홈페이지에 필요한 이미지의 노드·위치·크기·종횡비·주변 스타일을 읽어 구조화된 브리프를 만들고, (납품) 완성 이미지를 Figma 노드에 업로드하고 public/에 소문자 규칙으로 저장한다. "Figma에서 이미지 사양 읽어", "필요한 이미지 정리", "이미지 Figma에 올려/채워넣어", "public에 저장" 요청 시 트리거.
---

# EX Figma 이미지 브리지

figma-art-director 에이전트가 사용한다. Figma ↔ 이미지 파이프라인의 양 끝(인테이크·납품)을 담당한다.

## 기준 파일
- **권위 있는 비주얼 원본:** Figma `mTQJdHRUsAiZN93LvIXU4c` — Home nodeId `1:528`. (XR Solution `1:638`·VP `1:767`·Aximmetry `1:163`·Moverse `1:81`·RETracker `1:9`·XR Studio `1:878`·About `1:334`·Contact `1:463`, 모바일 `M_*` 1:1039~.)
- **와이어프레임(IA 참고):** `KnNSwLmFImkgYjhscBPiBs`. 비주얼 디테일은 원본 우선.
- **브랜드 토큰 단일 기준:** `DESIGN.md §0` + `globals.css @theme`. Figma 변수는 빈약 → 충돌 시 DESIGN.md.

## Figma 도구 로딩
Figma MCP 도구는 세션에 연결돼 있으나 스키마가 지연 로드된다. 쓰기 전에:
```
ToolSearch query "figma"
```
로 `get_design_context`·`get_screenshot`·`get_metadata`·`get_variable_defs`·`upload_assets`를 불러온다. 쓰기성 `use_figma` 호출 전에는 **반드시 `figma:figma-use` 스킬을 먼저 로드**한다(스킵 시 흔한 실패). 자산 업로드는 `upload_assets` 사용.

## A. 인테이크 — 브리프 만들기
1. 대상 페이지(기본 Home `1:528`) 프레임을 `get_metadata`로 읽어 자식 노드 트리·**실제 픽셀 크기**를 얻는다.
2. 이미지/플레이스홀더로 보이는 노드를 추린다(image fill 프레임, "image NN" 류 노드). ※Figma 노드명은 내용과 자주 불일치 → `get_screenshot`으로 **육안 확인 후 내용 기준으로** 라벨링한다.
3. 각 이미지의 주변 배경·인접 요소·들어갈 자리(텍스트 오버레이 유무)를 스크린샷으로 파악한다.
4. **재사용 체크:** `public/`에 이미 맞는 자산이 있으면 `reuse:true`로 표시하고 생성 대상에서 뺀다.
5. 브리프를 `_workspace_img/01_briefs.json`에 쓴다.

### 브리프 스키마 (이미지당 1객체)
```json
{
  "id": "home-hero",
  "purpose": "Home 히어로 배경 비주얼",
  "figma_node": "1:528 > Frame/Hero/bg",
  "placement": "풀블리드 배경, 중앙에 H1 오버레이",
  "width": 1920, "height": 1080, "aspect": "16:9",
  "subject": "떠다니는 3D EX 큐브 + 파티클 필드",
  "style_notes": "다크 navy, 시안→퍼플→핑크 글로우, 중앙 네거티브 스페이스 확보",
  "reference_assets": ["public/ex-cube.png"],
  "filename": "home-hero.png",
  "reuse": false
}
```
- `filename`은 **소문자·하이픈·내용 기반**. 대문자 확장자 금지(Vercel 404).
- `width/height`는 Figma 실측. `reference_assets`는 일관성용 기존 자산.

## B. 납품 — Figma 업로드 + public 저장
QC 통과 이미지를 받으면:
1. **public 저장(필수 먼저):** 이미지를 `public/{filename}`으로 복사. PNG(투명/UI)·JPG(사진) 적절. 대소문자·확장자 재확인.
2. **Figma 업로드:** `upload_assets`로 해당 노드 fill에 채운다(또는 프레임에 배치). 노드/링크 결과를 기록.
3. **frontend-builder용 가이드:** import 경로(`/{filename}`), 권장 `next/image` `sizes`·`priority`(히어로=priority), 대체 텍스트 제안을 보고.

> 업로드가 실패해도 `public/` 저장은 반드시 완료한다(코드용 자산이 끊기지 않게). Figma 누락은 보고에 명시.

## 정직성
실제 파트너 로고·인증서·특허는 생성 자산이 아니라 **실제 파일**(`public/cert-*.png`·`patent-*.jpg`)을 쓴다. 브리프에서 그런 항목은 `subject`에 "실제 파일 사용, 생성 금지"로 명시한다.

## 테스트 프롬프트
- "Home 페이지에서 새로 만들어야 할 이미지 목록 정리해줘." → `get_metadata`+스크린샷 → `01_briefs.json` 산출, 재사용 자산 분리 확인.
- "이 히어로 이미지 Figma에 올리고 public에도 저장해줘." → public 저장 우선 + upload_assets + frontend 가이드 확인.
