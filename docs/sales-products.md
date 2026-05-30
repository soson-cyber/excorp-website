# 이엑스 주식회사 — 판매 제품 상세 정보 (1차 자료)

> 출처: `이엑스주식회사_판매제품상세정보정리.pdf` (사내 1차 규격서, Version 1·2).
> 웹사이트 제품/솔루션 페이지 사양의 **1차 기준(source of truth)**. 수치·모델명은 이 문서를 따른다.

## 공급자 자격 / 제공 형태
- **자격**: 한국 공식 총판(Exclusive Distributor) 및 공식 인증 리셀러(Certified Reseller)
- **제공 형태**: 하드웨어 + 소프트웨어 + 시스템 설치 + 보안 세팅 + 현장 교육을 포함한 **통합 턴키(Turn-key)**

---

## 🟥 PART 1. EX-LINK 솔루션 (올인원 버추얼 프로덕션 시스템)
카메라 트래킹 · 실시간 그래픽 합성 · 미디어 서버를 하나로 통합해 고품질 가상 환경 스튜디오를 구축.

### 1-1. 소프트웨어
**① Aximmetry (Broadcast & Film Edition)** — 실시간 3D 그래픽 합성 및 버추얼 스튜디오 컴포저
- 렌더링/엔진: 네이티브 Aximmetry 3D 엔진 + Unreal Engine 완벽 호환(플러그인 내장); 최대 8K 실시간 렌더링; DLSS · Ray Tracing · RTXGI(실시간 전역 조명); 10-bit·HDR 입출력, 색공간/감마 처리; 실시간 그림자·반사·굴절 및 Light Wrap
- 크로마키/제어: 최고급 자체 내장 크로마키어 + 3D Clean Plate; 코딩 없는 노드(Node) 기반 그래픽 UI
- 입출력/프로토콜: 무제한 SDI·NDI·SMPTE 2110(NMOS)·SRT I/O; SDI 타임코드 + 하드웨어 젠록; Free-D 네이티브 + MOS(뉴스룸) 프로토콜
- 확장성: 다중 PC 분산 렌더링(Renderer Node) + 멀티 GPU 동기화

**② REtracker Bliss Software** — 트래킹 데이터 연동/전송
- Bliss G2 센서의 원시 공간 데이터를 Aximmetry/Unreal로 송출; 방송 표준 Free-D 기반 실시간 로우 레이턴시 전송

### 1-2. 하드웨어
**① Media Server (커스텀 워크스테이션)** — 고해상도 실시간 영상 처리
- CPU: AMD 라이젠9 9950X3D / 메인보드: ASUS ProArt X870 / GPU: NVIDIA RTX 5090 32GB
- RAM: 128GB(32GB×4) / SSD: 4TB(M.2 2TB×2) / 캡처보드: Blackmagic DeckLink 8K Pro G2
- 파워: 마이크로닉스 Classic II 1300W 80+ 플래티넘 ATX3.1 / 섀시: 4U 랙케이스 / 쿨링: DEEPCOOL AG620
- OS: Windows 11 Pro / 네트워크: 10Gbps CAT.7 SFTP

**② REtracker Bliss G2** — 6-DOF 마커리스 카메라 트래킹 센서
- 프로세서: Intel Movidius Myriad X VPU(자체 vSLAM 독립 연산) + High-Speed CNN Engine + SGBM 뎁스 엔진
- RGB: 13MP(H.265/JPEG 하드웨어 압축, HDR) / IMU: 9축 고속(저드리프트)
- 속도/정확도: 초당 500 FPS IMU 센서 퓨전 / 10m 이동 시 1cm 미만(<1cm) 오차
- 마커리스: 천장 마커 불필요 100% 마커리스 매핑, 공간 이동 무제한
- 안정성: Noise Rejection AI(움직이는 물체 필터링), 급격한 조명 변화 대응, Jitter 제로
- I/O: 단일 USB Type-C(전원+데이터), UART / 마운트: 표준 카메라 핫슈
- 프로토콜: LiveLink Bliss · Free-D · OSC · FBX(with LTC) / 엔진: Unreal(4.27~5.x) · Aximmetry · Blender · Ventuz
- 부가: 하드웨어 Genlock 모듈, WorldPose 카메라 높이/위치 자동 캘리브레이션

**③ REtracker Fizz 2 Pro** — 렌즈 데이터(FIZ) 인코더
- 렌즈 Focus·Iris·Zoom 물리 추출 → 가상 환경 심도/시야각 실시간 반영
- 프로토콜: Unreal LiveLink · Free-D
- 규격: 155×80×42mm / 0.353kg / 1.3" OLED / 5V DC(USB-C)
- I/O: 12-pin LEMO(렌즈데이터) · BNC(Genlock Sync) · RJ45 LAN(10/100) · USB-C(전원/펌웨어) · USB-A(HID/Indimark III)

---

## 🟦 PART 2. Moverse 솔루션 (마커리스 AI 모션캡처)
전용 수트/마커 없이 AI 비전 카메라 + 로컬 네트워크만으로 다수 인원을 캡처하는 차세대 모션캡처.

### 2-1. 소프트웨어
**① Moverse AI Motion Capture System** — AI 스켈레톤 추출 및 모션 데이터 변환
- 보안/구동: 클라우드 차단 100% 로컬 연산(On-Premise) — 공공/국방 망분리 대응
- 편의성: 마커·수트 불필요(일반인 즉시 사용, 캘리브레이션 제로화)
- 확장성: 최소 4대 ~ 최대 16대+ 다중 카메라 / 캡처 볼륨 4m×4m ~ 10m×10m+
- 연동: Unreal Engine 등 주요 3D 솔루션으로 Low-Latency 다이렉트 스트리밍

### 2-2. 하드웨어
**① Luxonis OAK-D W PoE** — 초광각 산업용 AI 뎁스 비전 카메라
- 연산: 4 TOPS(1.4 TOPS RVC2 NN 포함) 온디바이스 / 16GB eMMC
- Color: 12MP(4032×3040) SONY IMX378(AF 8cm~∞) / Stereo Depth: 1MP(1280×800)×2 OmniVision OV9282
- FOV: 150° DFOV 초광각 / 프레임: 최대 60~120 FPS(H.264/H.265/MJPEG HW 인코딩)
- 깊이: 75mm Baseline, 최적 40cm~6m(오차 <2%) / IMU: BMI270 6축
- 연결: 산업용 M12 PoE(기가비트, 802.3af Class3) + M8 I/O / 내구: IP65 방수방진 알루미늄 + Gorilla Glass
- 규격: 111×40×31.3mm / 184g (1/4" 삼각대 + VESA)

**② Intel-based Desktop & Network Switch Hub** — 로컬 AI 연산 서버
- 역할: 다중 카메라 비전 데이터 취합 → Moverse AI 3D 좌표 병합 연산
- CPU: Intel Core i5/i7/i9+ / GPU: NVIDIA RTX 3000~5000 시리즈+ / 네트워크: 기가비트 PoE+ 스위치 허브

---

## 페이지 매핑
- `/product/aximmetry` ← Aximmetry Broadcast & Film Edition (Reseller)
- `/product/retracker` ← REtracker Bliss G2 + Fizz 2 Pro + Bliss Software (Distributor)
- `/product/moverse` ← Moverse AI + Luxonis OAK-D W PoE + 연산 서버 (Distributor)
- `/solution/xr-solution` (EXLINK) ← 위 SW/HW를 통합한 턴키 시스템(미디어서버 포함)
