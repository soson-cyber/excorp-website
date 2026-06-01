# RETracker — `/product/retracker`

## 메타데이터
- **title**: RETracker — 6-DOF 마커리스 카메라 트래킹
- **description**: 천장 마커 없이 동작하는 6-DOF 마커리스 카메라 트래킹 RETracker. Bliss G2 센서 + Fizz 2 Pro 렌즈 인코더. 오차 <1cm/10m, 500fps IMU 퓨전, Unreal·Aximmetry 연동. EX 공식 한국 총판.

## 페이지 히어로
- **tag**: Korea Distributor
- **breadcrumb**: Home / Product / RETracker
- **title**: 천장 마커 없이, 카메라가 공간을 읽습니다.
- **lead**: 자체 vSLAM을 독립 연산하는 6-DOF 마커리스 카메라 트래킹. Bliss G2 센서와 Fizz 2 Pro 렌즈 인코더로 실사와 가상을 프레임 단위로 정합합니다.

## 한눈 사양 (Quick Spec)

| 수치 | 라벨 |
| --- | --- |
| <1cm/10m | 트래킹 정확도 |
| 500fps | IMU 센서 퓨전 |
| 6-DOF | 마커리스 트래킹 |
| Marker-less | 천장 마커 불필요 |

## 01 — Lineup · 두 가지 핵심 장치로 구성됩니다

### RETracker Bliss G2
- **역할**: Tracking Sensor
- 이미지: `/retracker-bliss.png`
- Intel Movidius Myriad X VPU로 자체 vSLAM을 독립 연산하는 6-DOF 마커리스 카메라 트래킹 센서. 천장 마커 없이 카메라의 위치·방향을 실시간 추적합니다.

### RETracker Fizz 2 Pro
- **역할**: Lens FIZ Encoder
- 이미지: `/retracker-fizz.png`
- 렌즈의 Focus·Iris·Zoom(FIZ) 값을 물리적으로 추출하는 인코더. 가상 스튜디오의 심도·시야각에 실시간 반영해 실사와 정합합니다.

여기에 Bliss Software가 더해져, 센서의 원시 공간 데이터를 Aximmetry·Unreal로 실시간 송출합니다.

## 02 — Key Features · 주요 특징

- **100% 마커리스** — 천장 마커가 필요 없는 마커리스 매핑. 공간 이동 범위 무제한.
- **초정밀 6-DOF** — 10m 이동 시 1cm 미만(<1cm) 오차, 초당 500fps IMU 센서 퓨전.
- **자체 vSLAM 독립 연산** — Intel Movidius Myriad X VPU가 디바이스에서 직접 공간을 매핑.
- **Jitter 제로 · 환경 적응** — Noise Rejection AI로 움직이는 물체를 필터링, 급격한 조명 변화에도 대응.
- **FIZ 렌즈 데이터 정합** — Fizz 2 Pro가 렌즈 메타데이터를 추출해 가상 환경 심도를 실시간 반영.
- **단일 USB-C · 핫슈 장착** — 케이블 하나로 전원·데이터를 해결, 표준 카메라 핫슈로 간편 장착.

## 03 — Specifications · 상세 사양

### Bliss G2 — Tracking Sensor

| 항목 | 값 |
| --- | --- |
| 프로세서 | Intel Movidius Myriad X VPU (자체 vSLAM 독립 연산) |
| AI 엔진 | High-Speed CNN Engine + SGBM 뎁스 엔진 |
| RGB 센서 | 13MP (H.265·JPEG 하드웨어 압축, HDR) |
| IMU | 9축 고속 IMU (가속도·자이로·지자계, Low-drift) |
| 정확도 / 속도 | 10m당 <1cm 오차 · 500fps IMU 퓨전 |
| 연결 / 마운트 | 단일 USB Type-C(전원+데이터)·UART · 표준 핫슈 |
| 프로토콜 | LiveLink Bliss · Free-D · OSC · FBX(with LTC) |
| 연동 엔진 | Unreal 4.27~5.x · Aximmetry · Blender · Ventuz |
| 부가 | HW Genlock 모듈 · WorldPose 자동 캘리브레이션 |

### Fizz 2 Pro — Lens FIZ Encoder

| 항목 | 값 |
| --- | --- |
| FIZ 데이터 | 렌즈 Focus·Iris·Zoom 물리 추출 → 심도·시야각 반영 |
| 프로토콜 | Unreal LiveLink · Free-D |
| 디스플레이 | 1.3″ OLED 스크린 |
| 규격 / 무게 | 155 × 80 × 42 mm · 0.353 kg |
| 전원 | 5V DC (USB Type-C) |
| I/O | 12-pin LEMO · BNC(Genlock) · RJ45 LAN · USB-C · USB-A |

### Bliss Software — Data Link

| 항목 | 값 |
| --- | --- |
| 역할 | Bliss G2 원시 공간 데이터를 엔진으로 송출 |
| 연동 | Aximmetry · Unreal Engine |
| 전송 | 방송 표준 Free-D 기반 실시간 로우 레이턴시 |

## 04 — Use Cases · 활용 분야

- 방송 가상 스튜디오
- Virtual Production
- ICVFX (LED 월)
- 라이브 · 중계

## 05 — FAQ · 도입 전 자주 묻는 질문

**Q. 마커나 트래킹 설비가 필요한가요?**
A. 필요 없습니다. Bliss G2는 천장 마커가 필요 없는 100% 마커리스 방식으로, 별도 설비 없이 카메라에 장착해 공간을 직접 매핑합니다. 이동 범위 제한도 없습니다.

**Q. 트래킹 정확도는 어느 정도인가요?**
A. 10m 이동 시 1cm 미만(<1cm)의 초정밀 오차이며, 초당 500fps IMU 센서 퓨전으로 핸드헬드·빠른 무빙에서도 안정적입니다.

**Q. Bliss와 Fizz는 어떻게 함께 쓰나요?**
A. Bliss G2가 카메라의 위치·방향(6-DOF)을 추적하고, Fizz 2 Pro가 렌즈의 Focus·Iris·Zoom 값을 추출해 가상 배경의 심도·시야각을 실사와 정합합니다.

**Q. 어떤 엔진과 연동되나요?**
A. Unreal Engine(4.27~5.x), Aximmetry, Blender, Ventuz와 호환되며 LiveLink Bliss·Free-D·OSC·FBX(with LTC) 프로토콜을 지원합니다.

## 06 — EX × RETracker

EX는 RETracker의 **공식 한국 총판**입니다.

하드웨어·소프트웨어 공급은 물론, 시스템 설치·보안 세팅·현장 교육을 포함한 통합 턴키로 도입 전 과정을 책임집니다.

- 도입 컨설팅
- 캘리브레이션
- 교육
- 기술 지원

- **CTA**: `도입 상담 →` → `/contact`
- **CTA**: `기술 사양서 요청 →` → `/support`

- 인증서 이미지: `/cert-retracker.png` (RETracker 공식 한국 총판 인증서 — Certificate of Excellence — EX Corporation)
- 캡션: RETracker Certificate of Excellence — EX Corporation

## CTA 배너 (Get in Touch)

- **제목**: XR 제작, 어디서부터 시작해야 할지 모르시겠다면?
- **본문**: 지금 바로 EX 전문가와 상담해보세요. 솔루션 도입부터 스튜디오 제작까지, 콘텐츠 제작의 모든 여정을 함께 설계합니다.
- **CTA**: `도입 상담 →` → `/contact`
- **CTA**: `스튜디오 둘러보기 →` → `/xr-studio`
- **CTA**: `자료 다운로드 →` → `/support`
