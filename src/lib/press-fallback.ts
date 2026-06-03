/**
 * 보도자료 fallback — Notion(WEBSITE_NEWS) 미연결·미설정·일시 장애 시 사용.
 * 평상시에는 news/page.tsx가 Notion에서 읽어 이 값을 대체한다(Notion이 SSoT).
 */
export type PressItem = {
  cat: "보도자료";
  year: string;
  title: string;
  excerpt?: string;
  href?: string;
  featured?: boolean;
};

export const pressFallback: PressItem[] = [
  {
    cat: "보도자료",
    year: "2026",
    title: "이엑스, 중기부 TIPS 선정 — AI 기반 XR 제작 솔루션 고도화",
    excerpt:
      "중소벤처기업부 TIPS에 선정되어 2년간 R&D를 통해 XR·버추얼 프로덕션의 셋업·운영·합성 과정을 자동화·표준화하는 기술 고도화에 나섭니다. (VentureSquare)",
    href: "https://www.venturesquare.net/1082328/",
    featured: true,
  },
  {
    cat: "보도자료",
    year: "2026",
    title: "이엑스 손승오 대표 인터뷰 — “수십억짜리 세트를 버튼 하나로”",
    excerpt:
      "17년 방송 경력의 손승오 대표가 분산된 XR 장비를 하나로 통합해 버추얼 프로덕션의 문턱을 낮추는 ‘XR 대중화’ 비전을 밝혔습니다. (VentureSquare 인터뷰)",
    href: "https://www.venturesquare.net/1080286/",
  },
  {
    cat: "보도자료",
    year: "2025",
    title: "이엑스, AI Content Festival 2025서 마커리스 모션캡처 시연",
    excerpt:
      "특수 수트·마커 없이 카메라 비전과 AI로 움직임을 추출하는 마커리스 모션캡처를 실시간 렌더링과 결합해 시연했습니다. (산업일보)",
    href: "https://kidd.co.kr/news/244207",
  },
  {
    cat: "보도자료",
    year: "2024",
    title: "Moverse AI 공식 한국 총판 계약 체결",
    excerpt: "마커리스 AI 모션캡처 Moverse의 국내 공식 총판으로서 도입·기술 지원을 본격화합니다.",
    href: "https://www.getnews.co.kr/news/articleView.html?idxno=705765",
  },
  {
    cat: "보도자료",
    year: "2024",
    title: "[인터뷰] XR 기술로 현실을 확장하다 — 이엑스",
    excerpt:
      "자체 EXLINK 플랫폼을 중심으로 VR·AR·MR 콘텐츠 제작을 혁신하는 XR 스타트업으로 이엑스를 조명했습니다. (아이뉴스24)",
    href: "https://www.inews24.com/view/1785934",
  },
  {
    cat: "보도자료",
    year: "2023",
    title: "성균관대 · 중앙대 · 계원예술대 산학 MOU 체결",
    href: "https://www.kgnews.co.kr/news/article.html?no=766073",
  },
  { cat: "보도자료", year: "2023", title: "Rassi Engineering(RETracker) 공식 한국 총판 계약" },
  { cat: "보도자료", year: "2023", title: "Aximmetry 공식 인증 리셀러 선정" },
  { cat: "보도자료", year: "2023", title: "경기 하남 XR 스튜디오 오픈" },
  {
    cat: "보도자료",
    year: "2022",
    title: "Korea Metaverse Festival 2022서 실시간 XR 제작 솔루션 시연",
    excerpt:
      "역대 최대 규모 메타버스 전시회(COEX)에서 AR 스튜디오·아바타 변환 등 실시간 XR 콘텐츠 제작 솔루션을 선보였습니다. (정보통신신문)",
    href: "https://www.koit.co.kr/news/articleView.html?idxno=104368",
  },
];
