# Figma 자산 추출 — Aximmetry 제품 페이지

- fileKey: `mTQJdHRUsAiZN93LvIXU4c`
- 대상 프레임: `1:163` "Product-Aximmetry" (데스크톱 1920x5107)
- 처리: `sips -Z 1600` 리사이즈 → JPEG(품질 80) → `public/` 저장
- 페이지 코드는 수정하지 않음. 아래 "권장 배치"는 매핑 제안일 뿐임.
- 채택 16개 / 총 용량 약 3.0 MB (개당 127–300 KB)

## 매니페스트 (채택)

| 저장파일(public/) | 원본 nodeId | 내용 설명(1줄) | 권장 배치 | 비율 |
|---|---|---|---|---|
| aximmetry-fig-showcase.jpg | 1:168 | 좌측 그린스크린 원본 + 우측 합성된 "Beauty & Joy" 가상 스튜디오 (before/after) | §01 Showcase | 16:9 |
| aximmetry-fig-news.jpg | 1:186 | 좌측 숲 AR 배경 + 우측 그린스크린 진행자 (뉴스/날씨형 합성) | §01 Showcase / §06 방송·뉴스 | 16:9 |
| aximmetry-fig-node-editor.jpg | 1:234 | Aximmetry 노드 에디터(노드 그래프) 작업 화면 | §02 노드에디터 | 16:9 |
| aximmetry-fig-compositor.jpg | 1:241 | Aximmetry 컴포지터/레이어 패널 + 하단 프리뷰 UI | §02 노드에디터 / §04 Features | 16:9 |
| aximmetry-fig-chroma.jpg | 1:206 | 그린스크린 앞 방송용 카메라 클로즈업 (크로마키 촬영) | §04 Features (크로마키) | 16:9 |
| aximmetry-fig-ar.jpg | 1:172 | 가상 스튜디오 + 떠 있는 막대그래프/실루엣 (AR 데이터 비주얼) | §06 AR / §04 Features | 1:1 |
| aximmetry-fig-ar-car.jpg | 1:213 | 사무실 바닥 위 F1 레이스카 AR 배치 | §06 AR | 16:9 |
| aximmetry-fig-xr.jpg | 1:171 | 가상 토크쇼 스튜디오를 걷는 인물 (XR 가상 세트) | §06 XR | 16:9 |
| aximmetry-fig-xr-character.jpg | 1:806 | 사이버펑크 거리 + 그린스크린 가상 캐릭터 합성 | §06 XR | 16:9 |
| aximmetry-fig-studio-bts.jpg | 1:227 | 가상 스튜디오 제작 현장 비하인드(모니터·카메라·출연자) | §06 라이브 / §04 Features | 16:9 |
| aximmetry-fig-greenscreen-studio.jpg | 1:715 | 실제 그린스크린 스튜디오 + 촬영 스태프·카메라 | §06 라이브 / §01 Showcase | 16:9 |
| aximmetry-fig-event-stage.jpg | 1:700 | 대형 다크 버추얼 스튜디오 "2022 R&D" 이벤트 무대 | §06 라이브·이벤트 | 16:9 |
| aximmetry-fig-live-conference.jpg | 1:723 | 신한 스퀘어브릿지 컨퍼런스 라이브(패널 + LED 배경) | §06 라이브·방송 | 16:9 |
| aximmetry-fig-festival-ar.jpg | 1:735 | 야외 록페스티벌 무대 + AR 캐릭터 미디어아트 | §06 라이브(이벤트·미디어아트) | 16:9 |
| aximmetry-fig-festival-led.jpg | 1:742 | 인천 록페스티벌 LED 무대 + AR 미디어아트(분수·꽃) | §06 라이브(이벤트·미디어아트) | 16:9 |
| aximmetry-fig-fashion.jpg | 1:689 | 블루 패딩 겨울 패션 룩북(가상 배경 합성) | §06 Use Cases(패션) | 16:9 |

## 버린 노드 (사유)

| nodeId | 사유 |
|---|---|
| 1:173 | `public/aximmetry-hero.png`와 **완전 동일**(md5 6b10175d…). 이미 존재 → 스킵 |
| 1:177 | 1:173 / aximmetry-hero.png와 **완전 동일**(md5 동일). 중복 → 스킵 |
| 1:199 | 물병 든 남성 클로즈업 — 범용 스톡 영상 느낌, Aximmetry 합성/가상스튜디오와 무관 → 제외 |
| 1:220 | CAM1/2/3 스위처 버튼 그리드 UI — 저해상도 아이콘성, 콘텐츠 가치 낮음 → 제외 |
| 1:825 | Retracker Fizz 렌즈 데이터 인터페이스 다이어그램 — **Retracker 제품**으로 Aximmetry 페이지와 무관 → 제외 |

## 비고
- `aximmetry-hero.png`(기존) = 노드 1:173/1:177 원본. 신규 자산과 별개로 유지.
- `aximmetry-vp.jpg`, `cert-aximmetry.png`(기존)와 명백한 중복은 발견되지 않음(이번 채택분과 내용 상이).
- 인증서(§ 인증) 후보였던 1:186은 실제로는 "숲 AR + 그린스크린 진행자" 합성이라 인증서 아님 → news/showcase로 분류.
