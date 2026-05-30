/*
  Work — 도입 사례 / 활용 시나리오 데이터.
  ⚠️ 현재 항목은 실제 레퍼런스 확보 전의 "활용 시나리오"(scenario: true)다.
  결과 수치는 검증된 실적이 아니라 도입 시 기대 효과(예시)로 표기한다.
  실제 사례 확보 시 scenario를 false로 바꾸고 result를 검증값으로 교체.
  → 이후 Sanity CMS로 이관 가능 (이 파일이 스키마의 기준).
*/

export type WorkCase = {
  slug: string;
  category: "EXLINK 구축" | "스튜디오" | "버추얼 프로덕션";
  title: string;
  summary: string;
  image: string;
  sector: string;
  format: string;
  challenge: string;
  solution: string[];
  result: { v: string; l: string }[];
  stack: string[];
  featured?: boolean;
};

export const categories = ["전체", "EXLINK 구축", "스튜디오", "버추얼 프로덕션"] as const;

export const works: WorkCase[] = [
  {
    slug: "exlink-broadcast",
    category: "EXLINK 구축",
    title: "실시간 XR 방송 시스템 통합",
    summary: "멀티캠·트래킹·렌더·송출을 EXLINK로 통합한 실시간 XR 방송 구축 시나리오.",
    image: "/uc-broadcast.png",
    sector: "방송 · 중계",
    format: "라이브 방송",
    featured: true,
    challenge:
      "촬영·카메라 트래킹·가상 배경 렌더·송출 장비가 제각각이라, 매 현장마다 연동·동기화 셋업에 시간이 들고 이를 다룰 인력도 여러 명 필요합니다.",
    solution: [
      "EXLINK 단일 제어 흐름으로 촬영·트래킹·렌더·송출 통합",
      "멀티캠·트래킹 데이터 자동 동기화로 수동 보정 최소화",
      "라이브 송출과 동시 녹화로 생방송·아카이브 동시 확보",
    ],
    result: [
      { v: "4 → 1", l: "운영 인력" },
      { v: "−70%", l: "셋업 시간" },
      { v: "실시간", l: "현장 합성·완성" },
    ],
    stack: ["EXLINK", "Aximmetry", "RETracker"],
  },
  {
    slug: "exlink-conference",
    category: "EXLINK 구축",
    title: "실시간 크로마 합성 컨퍼런스",
    summary: "그린 크로마 + 실시간 트래킹으로 멀티 패널 컨퍼런스를 가상 무대에서 운영.",
    image: "/vp-chroma.png",
    sector: "컨퍼런스 · 행사",
    format: "라이브 · 멀티 패널",
    challenge:
      "다인 패널 행사를 위한 대형 세트 제작비와 설치 시간 부담이 크고, 무대 전환이 어렵습니다.",
    solution: [
      "대형 그린 크로마에서 가상 컨퍼런스 무대 실시간 합성",
      "카메라 트래킹 기반 입체 연출로 자연스러운 화면",
      "세션 전환 그래픽으로 무대 분위기 즉시 변경",
    ],
    result: [
      { v: "0", l: "물리 세트 제작" },
      { v: "다인", l: "패널 풀샷 대응" },
      { v: "즉시", l: "무대 전환" },
    ],
    stack: ["EXLINK", "EX Studio", "RETracker"],
  },
  {
    slug: "studio-ir",
    category: "스튜디오",
    title: "기업 IR 발표 영상 제작",
    summary: "그린 크로마 가상 무대에서 IR 발표 영상을 촬영과 동시에 완성.",
    image: "/studio.png",
    sector: "기업 IR",
    format: "IR-M",
    challenge:
      "투자 유치·분기 IR 발표 영상은 세트 제작과 후반 편집에 비용·일정 부담이 큽니다.",
    solution: [
      "기본 IR 배경 + 로고·CI 삽입으로 신뢰감 있는 가상 무대 구성",
      "PTZ·시네마 멀티캠으로 발표자 풀샷·클로즈업 동시 확보",
      "촬영과 동시에 합성·검수하여 후반 작업 최소화",
    ],
    result: [
      { v: "당일", l: "가편 전달" },
      { v: "절감", l: "세트 제작비" },
      { v: "택 1", l: "가상 배경 선택" },
    ],
    stack: ["EX Studio", "EXLINK"],
  },
  {
    slug: "studio-webinar",
    category: "스튜디오",
    title: "기업 웨비나 라이브",
    summary: "가상 배경·AR 그래픽과 라이브 송출로 몰입형 온라인 세션 운영.",
    image: "/uc-event.png",
    sector: "웨비나 · 세미나",
    format: "WEBI-M",
    challenge:
      "온라인 웨비나는 화면이 단조롭고, 라이브 송출·Q&A 진행의 안정성이 중요합니다.",
    solution: [
      "주제에 맞는 가상 배경과 AR 그래픽으로 몰입감 강화",
      "라이브 채팅 위젯·Q&A 자막을 화면에 실시간 합성",
      "YouTube·Zoom 등으로 안정적인 라이브 송출",
    ],
    result: [
      { v: "몰입형", l: "세션 화면" },
      { v: "실시간", l: "Q&A · 채팅" },
      { v: "동시", l: "다중 송출" },
    ],
    stack: ["EX Studio"],
  },
  {
    slug: "vp-fashion",
    category: "버추얼 프로덕션",
    title: "버추얼 패션 필름",
    summary: "가상 세트를 실시간 합성해 다양한 공간의 패션 콘텐츠를 한 스튜디오에서.",
    image: "/uc-fashion.png",
    sector: "패션 · 커머스",
    format: "Virtual Production",
    challenge:
      "다양한 공간 연출을 위해 로케이션 이동·세트 제작 비용이 크고 일정이 길어집니다.",
    solution: [
      "가상 세트를 실시간 합성해 한 공간에서 여러 룩 촬영",
      "카메라 트래킹 기반 입체 연출로 제품·룩을 돋보이게",
      "현장에서 결과를 확인하며 즉시 보정",
    ],
    result: [
      { v: "무한", l: "가상 공간" },
      { v: "1곳", l: "다공간 촬영" },
      { v: "현장", l: "즉시 확인" },
    ],
    stack: ["Aximmetry", "RETracker", "EX Studio"],
  },
  {
    slug: "vp-set",
    category: "버추얼 프로덕션",
    title: "언리얼 기반 가상 세트 제작",
    summary: "Unreal Engine 실시간 3D 세트를 구성해 방송·콘텐츠에 활용.",
    image: "/vp-set.png",
    sector: "버추얼 세트",
    format: "Virtual Production",
    challenge:
      "고품질 3D 가상 세트를 실시간으로 운용하려면 엔진·렌더·트래킹의 정밀한 연동이 필요합니다.",
    solution: [
      "Unreal Engine + Aximmetry로 실시간 3D 세트 구성",
      "정밀 카메라 트래킹으로 실사와 가상의 자연스러운 정합",
      "다양한 콘텐츠에 재사용 가능한 가상 세트 자산화",
    ],
    result: [
      { v: "실시간", l: "3D 렌더" },
      { v: "정밀", l: "카메라 트래킹" },
      { v: "재사용", l: "세트 자산" },
    ],
    stack: ["Aximmetry", "Unreal Engine", "RETracker"],
  },
];

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
