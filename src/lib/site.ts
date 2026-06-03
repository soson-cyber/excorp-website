export const site = {
  name: "EX Corporation",
  nameKo: "이엑스 주식회사",
  slogan: "기술의 연결로 경험을 확장하다",
  brandSlogan: "EXpand EXperiences",
  subTitle: "All-in-One, Real-time XR Content Production Solution",
  mission:
    "AI와 XR 기술을 연결하여, 현실과 가상이 융합되는 새로운 콘텐츠 경험을 만듭니다.",
  social: {
    instagram: "https://instagram.com/ex.studio",
  },
  contact: {
    tel: "031-699-8228",
    fax: "031-624-4258",
    email: "contact@excorp.kr",
    careersEmail: "careers@excorp.kr",
  },
} as const;

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
      desc: "현실과 가상을 실시간으로 잇는 올인원 XR 솔루션",
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
        tag: "Reseller",
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
        desc: "실시간 6DoF 고정밀 광학 트래킹 — Bliss / Fizz",
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
      { label: "XR Solution", href: "/solution/xr-solution" },
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
    kind: "HQ",
    name: "본사 (Headquarters)",
    address: "경기도 성남시 분당구 판교로 289번길 20, 스타트업캠퍼스 2동 5층",
    zip: "13488",
    tel: "",
  },
  {
    kind: "Studio",
    name: "EX XR Studio",
    address: "경기도 하남시 미사대로 540, 현대한강미사2차 B동 530호",
    zip: "12925",
    tel: "031-699-8228",
  },
] as const;

export const partners = [
  { name: "Aximmetry", badge: "Reseller" },
  { name: "Moverse AI", badge: "Distributor" },
  { name: "RETracker", badge: "Distributor" },
  { name: "NVIDIA", badge: "Inception" },
  { name: "Epic Games", badge: "Unreal" },
] as const;
