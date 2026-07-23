// 사이트 절대 URL 단일 출처 — JsonLd.tsx·layout.tsx 메타데이터가 이 상수를 import해 정합 유지.
export const SITE_URL = "https://excorp.kr";

export const site = {
  name: "EX Corporation",
  nameKo: "이엑스 주식회사",
  slogan: "현장에서 연결해 온 기술로, 더 쉽게 쓰는 XR 시스템을 만듭니다",
  brandSlogan: "EXpand EXperiences",
  subTitle: "Real-time XR Content Production Solution",
  mission:
    "AI와 XR 기술을 연결하여, 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다.",
  missionEn:
    "We connect AI and XR to create new content experiences where the physical and virtual converge.",
  social: {
    instagram: "https://www.instagram.com/excorp_kr",
    facebook: "https://www.facebook.com/EXCorp.Story",
    youtube: "https://www.youtube.com/@excorp_kr",
  },
  contact: {
    tel: "031-699-8228",
    fax: "031-624-4258",
    email: "contact@excorp.kr",
    careersEmail: "careers@excorp.kr",
  },
} as const;

// JSON-LD sameAs 단일 출처 — Organization 스키마(layout.tsx)가 이 배열을 import해 정합 유지.
// site.social을 그대로 반영(채널 추가/변경 시 한 곳만 고치면 SEO 마크업까지 동기화).
export const sameAs: string[] = [
  site.social.instagram,
  site.social.facebook,
  site.social.youtube,
];

export type NavChild = { label: string; href: string; tag?: string; desc?: string };
export type NavFeatured = {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
};
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  featured?: NavFeatured;
};

export const nav: NavItem[] = [
  {
    label: "Solution",
    href: "/solution",
    children: [
      {
        label: "XR Solution",
        href: "/solution/xr-solution",
        tag: "EX Original",
        desc: "현실과 가상을 실시간으로 연결하는 통합 XR 솔루션, EXLINK",
      },
      {
        label: "Virtual Production",
        href: "/solution/virtual-production",
        tag: "Methodology",
        desc: "카메라·배경 합성·라이브 연출이 동시에 일어나는 영상 제작 기법",
      },
    ],
    featured: {
      eyebrow: "EX ORIGINAL",
      title: "EXLINK",
      desc: "현실과 가상을 실시간으로 잇는 통합 XR 솔루션",
      cta: "솔루션 보기",
      href: "/solution/xr-solution",
    },
  },
  {
    label: "Product",
    href: "/product",
    children: [
      {
        label: "Aximmetry",
        href: "/product/aximmetry",
        tag: "Certified Reseller",
        desc: "실시간 3D 그래픽 & 버추얼 프로덕션 플랫폼",
      },
      {
        label: "Moverse AI",
        href: "/product/moverse",
        tag: "Distributor",
        desc: "센서 없이 동작하는 AI 마커리스 모션캡처",
      },
      {
        label: "RETracker",
        href: "/product/retracker",
        tag: "Distributor",
        desc: "6-DOF 마커리스 카메라 트래킹: Bliss / Fizz",
      },
    ],
    featured: {
      eyebrow: "PARTNER PRODUCTS",
      title: "검증된 글로벌 XR 도구",
      desc: "EX가 직접 연결·조율하는 파트너 제품군",
      cta: "제품 전체 보기",
      href: "/product",
    },
  },
  { label: "XR Studio", href: "/xr-studio" },
  { label: "Work", href: "/work" },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About EX", href: "/about", desc: "회사 소개 · 미션 · 비전" },
      { label: "News & Insight", href: "/news", desc: "EX의 소식과 인사이트" },
      { label: "Career", href: "/careers", desc: "함께할 동료를 찾습니다" },
    ],
    featured: {
      eyebrow: "ABOUT EX",
      title: "경험을 확장하다",
      desc: "기술의 연결로 새로운 콘텐츠 경험을 만드는 사람들",
      cta: "회사 소개",
      href: "/about",
    },
  },
];

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Solution",
    links: [
      { label: "XR Solution", href: "/solution" },
      { label: "Virtual Production", href: "/solution/virtual-production" },
      { label: "EXLINK", href: "/solution/xr-solution" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Aximmetry", href: "/product/aximmetry" },
      { label: "Moverse AI", href: "/product/moverse" },
      { label: "RETracker", href: "/product/retracker" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About EX", href: "/about" },
      { label: "News & Insight", href: "/news" },
      { label: "Career", href: "/careers" },
      { label: "Work", href: "/work" },
      { label: "XR Studio", href: "/xr-studio" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
    ],
  },
];

export const locations = [
  {
    kind: "Office",
    name: "EX AI Office",
    address: "경기 성남시 수정구 금토동 327, 스타트업스퀘어 B동 3층",
    addressEn: "3F, Startup Square Bldg. B, 327 Geumto-dong, Sujeong-gu, Seongnam-si, Gyeonggi-do",
    zip: "13453",
    tel: "",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.23887135524865!2d127.08808015886281!3d37.40626673180439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca7e58fc36133%3A0xe090d373b7efb886!2z7YyQ6rWQIOygnDPthYztgazrhbjrsLjrpqw!5e0!3m2!1sko!2skr!4v1780550418546!5m2!1sko!2skr",
  },
  {
    kind: "Studio",
    name: "EX XR Studio",
    address: "경기도 하남시 미사대로 540, 현대한강미사2차 B동 530호",
    addressEn: "Bldg. B #530, Hyundai Hangang Misa 2-cha, 540 Misa-daero, Hanam-si, Gyeonggi-do",
    zip: "12925",
    tel: "031-699-8228",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d447.62520046666424!2d127.20495414112324!3d37.55764676843624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb164b0039633%3A0xc0297acc8ec1fec0!2z6rK96riw64-EIO2VmOuCqOyLnCDrr7jsgqzrjIDroZwgNTQw!5e0!3m2!1sko!2skr!4v1780549494747!5m2!1sko!2skr",
  },
] as const;

export const partners = [
  { name: "Aximmetry", badge: "Certified Reseller" },
  { name: "Moverse AI", badge: "Distributor" },
  { name: "RETracker", badge: "Distributor" },
  { name: "NVIDIA", badge: "Inception" },
  { name: "Epic Games", badge: "Unreal" },
] as const;
