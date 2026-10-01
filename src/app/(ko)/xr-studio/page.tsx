import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ControlledVideo } from "@/components/ui/ControlledVideo";
import { site, locations } from "@/lib/site";
import { JsonLd, breadcrumbLd, localBusinessLd, faqPageLd } from "@/components/seo/JsonLd";

/*
  XR Studio · XR Live Presentation 상품 페이지 (공개). 2026-10-01 /xr-live에서 옮겼다(스펙 10).
  - 주소: /xr-studio. 옛 주소 /xr-live와 xr-live.excorp.kr은 301로 넘긴다(next.config.ts · middleware.ts).
  - 장소 대관은 하지 않는다. 맞춤 제작은 Premium Contents로 받는다(대표 결정 2026-10-01).
  - 레이아웃 근거: Claude Design 핸드오프 `XR Live Page.dc.html` (2026-09-11 검토본).
    설계본의 인라인 hex는 사이트 토큰 var(--color-*)로 치환했다. 값은 25종 전수 일치를 확인했다.
    카드 제목은 설계본에서 div였고 여기서는 h3으로 복원했다(접근성).
  - 구성·문안 근거: 대표 정리판 v2(2026-10-01). 현재 레이아웃에 D3 문안을 넣고 대표가 직접 고쳤다.
    스펙·문안 부록: _workspace/xr-live-redesign/07_implementation_spec.md · 07_spec_copy_appendix.md.
    화면 문안은 부록과 글자 단위로 같다(scripts/xr-live-integrity.test.mjs · 렌더 대조 스크립트).
  - 확정 사실(대표): 4회 1,990만원(2026-10-01 조정, 이전 2,000만원) · 단편 600만원(둘 다 VAT 별도) · 4K 촬영 · 4K UHD 마스터.
  - Premium 판매가는 화면에 쓰지 않는다(대표 지시 2026-09-12). "견적"으로 둔다.
  - 내부 자료 금지: 원가·이익·협상 방어선은 어떤 형태로도 노출하지 않는다.
*/

// 검색·링크 미리보기(스펙 10 §2.3, 2026-10-01). /xr-live를 /xr-studio로 옮기며 공개(검색 허용)로 바꿨다.
// 제목에는 (ko) 레이아웃 꼬리 "| EX Corporation"이 붙는다. openGraph·twitter는 부모 값을 통째로 덮어쓰므로 필드를 모두 적는다.
const TITLE = "하남 XR 스튜디오 · XR Live Presentation · XR 가상공간 라이브 영상 제작";
const FULL_TITLE = `${TITLE} | EX Corporation`;
const DESCRIPTION =
  "원고와 발표자료를 보내주시면, 기획부터 포스트 프로덕션까지 EX가 하나의 흐름으로 연결합니다. 라이브가 끝나면 영상도 납품합니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { type: "website", locale: "ko_KR", url: "/xr-studio", siteName: "EX Corporation", title: FULL_TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: FULL_TITLE, description: DESCRIPTION },
  alternates: { canonical: "/xr-studio", languages: { "ko-KR": "/xr-studio", "en-US": "/en/xr-studio", "x-default": "/xr-studio" } },
};

// 문의 연결(대표 승인 2026-10-01). 구성·견적은 "스튜디오 제작", 과업지시서 초안은 "자료 요청"으로 보낸다.
// topic은 문의 폼이 출처 표시·완료 문구에 쓴다(src/lib/contact-topics.ts). 방문 예약은 현행 그대로다.
const CONTACT = {
  quote: `/contact?type=${encodeURIComponent("스튜디오 제작")}&topic=xr-live#form`,
  brief: `/contact?type=${encodeURIComponent("자료 요청")}&topic=xr-live-brief#form`,
  demo: `/contact?type=${encodeURIComponent("시연·쇼룸 방문")}#form`,
};

// 스튜디오(스펙 10 §3.1, 2026-10-01) — 옛 XR Studio 페이지의 시설 스펙과 사진을 옮겼다. 주소는 site.ts 한 곳에서 온다.
// "(충분한 카메라 후퇴 공간)"은 전문 용어라 뺐다. 카메라는 스튜디오 장비이고, 상품 구성은 가격 구간 비교표가 말한다.
const studioLoc = locations.find((l) => l.kind === "Studio")!;
const studioSpecs: [string, string][] = [
  ["크로마 무대", "W 10m × D 7m × H 4m (약 70㎡) 호리존"],
  ["스튜디오 면적", "약 210㎡"],
  ["카메라", "시네마 카메라(4.6K) + PTZ 멀티카메라"],
  ["렌즈", "시네마 줌 20–55mm / 50–125mm"],
  ["위치", studioLoc.address.split(",")[0]],
];
// 대체 텍스트는 사진에 보이는 것만 쓴다(옛 문구의 "DeckLink 8K 카메라"는 사실과 달라 옮기지 않았다).
const studioShots = [
  { src: "/studio-control.webp", label: "실시간 송출 · 제어", alt: "그린 크로마 무대 앞의 송출·제어 자리. 모니터에 실시간 합성 프로그램 화면이 떠 있다." },
  { src: "/studio-prep.webp", label: "메이크업 · 대기 공간", alt: "링라이트 거울이 달린 메이크업 자리와 의류 행거, 탈의 부스가 있는 대기 공간." },
];

// 흐름 칩 — 라이브 한 번에서 나오는 결과물 순서(대표 정리 2026-10-01). 편수는 가격 카드에만 쓴다
// (Premium은 숏폼 6편이라 칩에 편수를 쓰면 상품마다 달라진다).
const flow = ["라이브", "롱폼 영상", "숏폼 영상", "4K UHD 마스터"];

// 가격 — 대표 확정(2026-09-10), 4회는 1,990만원으로 조정(대표 지시 2026-10-01). VAT 별도.
// 카드 라벨 STANDARD · 상품 이름 XR Live Broadcast Package·단편(대표 10~12차 수정 2026-10-01).
// Package는 정본 상품설계서의 4회 상품 이름이다.
// 이름은 640px 미만에서 18px로 줄여 360 폭까지 한 줄(대표 13차 수정, 실측: 20.8px면 289px라 390 카드 284px를 넘친다).
const plans = [
  {
    name: "XR Live Broadcast Package",
    price: "1,990만원",
    stats: [
      { v: "4회", l: "회차" },
      { v: "4편", l: "롱폼 영상" },
      { v: "8편", l: "숏폼 영상" },
    ],
    rows: [
      ["계약 기간", "6개월"],
      ["라이브", "회당 60분"],
      ["프로덕션", "회당 최대 4시간"],
    ] as [string, string][],
  },
  {
    name: "XR Live Broadcast 단편",
    price: "600만원",
    stats: [
      { v: "1회", l: "회차" },
      { v: "1편", l: "롱폼 영상" },
      { v: "2편", l: "숏폼 영상" },
    ],
    rows: [
      ["계약 기간", "1개월"],
      ["라이브", "60분"],
      ["프로덕션", "최대 4시간"],
    ] as [string, string][],
  },
];

// 전체 사양 비교(가격 카드 아래 접힘) — 열 이름은 가격 카드 이름의 끝말과 같게 Package · 단편 · Premium(대표 12차 수정),
// 촬영 당일 시간은 카드와 같은 "프로덕션"으로 쓴다(대표 정리 2026-10-01).
const compareCols = ["Package", "단편", "Premium"];
const compare: [string, string, string, string][] = [
  ["프로덕션", "회당 최대 4시간", "최대 4시간", "최대 5시간"],
  ["카메라", "고정 1대 + 트래킹 1대", "고정 1대 + 트래킹 1대", "고정 2대 + 트래킹 2대"],
  ["자막", "국문", "국문", "국문 + 영문"],
  ["수정", "각 단계 1회", "각 단계 1회", "각 단계 2회"],
  ["출연", "고객 측 직접 발표", "고객 측 직접 발표", "고객 측 발표 + 전문 MC 1인"],
];
const included = [
  "콘텐츠 구조화, 스토리보드·큐시트·프롬프터 원고",
  "브랜드 톤 디자인과 정보 시각화 그래픽",
  "스튜디오·조명·음향·프롬프터·XR 시스템 운영",
  "헤어·메이크업",
  "라이브 채널 송출",
  "4K 촬영과 4K UHD 마스터",
  "국문 자막(또는 SRT 파일)과 배포용 H.264 MP4",
  "납품 산출물의 기간·횟수·채널 제한 없는 이용",
];

// BEFORE / AFTER — BEFORE는 설명문과 도식만 둔다(대표 지시 2026-09-30). 경쟁사 실명은 쓰지 않는다.
// AFTER 카드는 공간·구도·Live-to-Post 3장이다(대표 정리 2026-10-01). 캡션은 화면의 출처를 밝힌다.
// 대표 2차 수정(2026-10-01): 구도 카드 2번째 컷 교체, Live-to-Post 마지막 문장 삭제, 비교 줄 STANDARD.
// 대표 7차 수정(2026-10-01): 공간 = 신한 스퀘어브릿지 무대(브랜드 로고를 띄운 화면), 구도 = 토크쇼 와이드 + 클로즈업(같은 대담 2컷).
// 기본 사양(대표 확인 2026-09-29): 가상공간 프리셋 · 카메라 고정 1대(가상 카메라 연출) + 트래킹 1대.
// 구도 카드는 같은 행사 화면 2컷을 좌우로 놓는다(shots 2장 → 아래 JSX의 전용 마크업, Media는 넓히지 않는다).
type Shot = { src: string; alt: string; pos?: string };
const after: { axis: string; title: string; desc: string; caption: string; shots: Shot[] }[] = [
  {
    axis: "공간",
    title: "브랜드 톤을 입힌 가상공간",
    desc: "가상공간 프리셋 하나를 골라 컬러와 로고, 그래픽을 입힙니다. 공간 속 화면과 사인물도 브랜드에 맞춥니다. Premium은 전용 가상공간을 새로 만듭니다.",
    caption: "제작 사례 · 신한 스퀘어브릿지 2021",
    shots: [
      {
        src: "/ref-shinhan-s2bridge.webp",
        alt: "신한 스퀘어브릿지 스타트업 콘퍼런스의 가상 무대. 3면 대형 화면에 행사명과 신한 스퀘어브릿지, One Shinhan 로고를 띄웠고, 발표자가 무대에 서 있다.",
      },
    ],
  },
  {
    axis: "구도",
    title: "장면마다 바뀌는 카메라 앵글",
    desc: "고정 카메라와 트래킹 카메라로 촬영합니다. 고정 카메라 영상은 가상 카메라로 앵글을 바꿉니다. 트래킹 카메라가 움직이면 가상공간도 같은 시점으로 움직입니다.",
    caption: "같은 대담 화면 2컷 · 「스퀘어 토크」",
    shots: [
      // 반쪽 칸에 사람이 가운데 오도록 보이는 위치를 옮긴다(대표 8차 수정): 와이드 = 두 사람 사이, 클로즈업 = 얼굴.
      {
        src: "/ref-squaretalk-wide.webp",
        alt: "가상 갤러리 세트에서 진행자와 출연자가 마주 앉아 대담하는 장면을 넓게 잡은 화면",
        pos: "object-[58%_50%]",
      },
      {
        src: "/ref-squaretalk-close.webp",
        alt: "같은 대담에서 출연자를 가까이 잡은 장면. 오른쪽 위에 「스퀘어 토크」 로고가 있다.",
        pos: "object-[35%_50%]",
      },
    ],
  },
  {
    axis: "Live-to-Post",
    title: "라이브 자산을 포스트 프로덕션으로 그대로 이어받습니다.",
    desc: "라이브에 쓴 영상·음향·그래픽을 타임코드 기준으로 포스트 프로덕션에 연결합니다. 라이브와 포스트 프로덕션을 EX가 함께 맡습니다.",
    caption: "제작 사례 · 「행복한 부모되기」 강연",
    shots: [
      {
        src: "/ref-happy-parents.webp",
        alt: "발표자가 창과 식물로 꾸민 가상공간의 의자에 앉아 강연하는 합성 화면. 오른쪽에 인용 문구 그래픽, 아래에 자막이 있다.",
      },
    ],
  },
];

// 활용 사례 4종 — 가상공간 프리셋 렌더(대표 정리 2026-10-01: 제목 = 공간 이름, 설명 = 어울리는 발표).
// 실제 발표 현장 사진이 아니므로 칸마다 "예시 렌더"를 단다(정직성).
// 세미나실은 원본(studio-bg-03)의 가장자리 흰 띠를 잘라 낸 16:9 사본, 키노트 홀·LED 스테이지는 대표가 준 새 렌더(3840×2160 → 1600×900).
// 셋 다 XR Studio 페이지(국문·영문)와 함께 쓴다(대표 13차 수정).
const useCases = [
  { set: "키노트 홀", fit: "기업·기관 발표", img: "/studio-preset-keynote.webp" },
  { set: "가든 라운지", fit: "인터뷰·커뮤니케이션", img: "/studio-bg-01.jpg" },
  { set: "세미나실", fit: "교육·온라인 설명회", img: "/studio-preset-seminar.webp" },
  { set: "LED 스테이지", fit: "신제품·서비스 발표", img: "/studio-preset-led-stage.webp" },
];

// 산출물·규격 — 담당자가 과업지시서에 그대로 옮겨 쓰는 자리다. 표기를 바꾸지 않는다.
const deliverables = [
  "실시간 프로그램 송출 1회",
  "다시보기 영상(롱폼) 1편",
  "짧은 영상(Shortform) 2편",
  "4K UHD 프로그램 마스터",
  "국문 자막 또는 SRT 파일",
  "배포용 H.264 MP4",
  "검수 확인용 파일",
  "납품 파일 목록",
];

const specs: [string, string][] = [
  ["촬영 원본 영상", "4K"],
  ["촬영 원본 음향", "48kHz / 32bit Float"],
  ["편집 타임라인", "4K UHD"],
  ["프로그램 마스터", "4K UHD / 3840×2160"],
  ["프레임레이트", "29.97p (사전 협의로 변경 가능)"],
  ["배포용 포맷", "H.264 MP4"],
  ["색 규격", "Rec.709"],
  ["음향 규격", "48kHz Stereo"],
];

const review: [string, string][] = [
  ["공통 디자인·스토리보드", "1회"],
  ["포스트 프로덕션", "1회"],
  ["오탈자·기술적 오류", "수정 횟수 제외"],
];

const retention: [string, string][] = [
  ["촬영 원본", "촬영일로부터 6개월"],
  ["프로젝트·편집 소스·최종본", "납품일로부터 1년"],
];

// 별도 협의 — 추정가격이 수의계약 한도를 전부 쓰므로 별건 계약임을 반드시 밝힌다.
const extras = [
  "전문 MC·아나운서",
  "배우·모델 섭외",
  "외국어 번역·더빙·자막",
  "수어 통역",
  "AI 이미지·영상 신규 제작",
  "신규 3D·복잡한 VFX",
  "맞춤 XR 가상공간",
  "외부 로케이션·출장",
  "기본 라이브 시간 초과",
  "기본 회차 초과",
  "숏폼 영상 추가",
  "Interactive Web·발표자료 연동",
  "촬영 원본 전체 납품",
  "편집 프로젝트·개별 그래픽 원본 양도",
];

// 별도 협의 항목 가운데 Premium에 기본 포함되는 것 — 칩 안에 민트색으로 적는다(대표 3차 수정 2026-10-01).
// 일부만 포함되면 포함되는 부분만 쓴다(Premium 사양: 전문 MC 1인 · 국문 + 영문 자막 · 맞춤 가상공간 + 신규 3D).
const premiumIncluded: Record<string, string> = {
  "전문 MC·아나운서": "Premium: MC 1인",
  "외국어 번역·더빙·자막": "Premium: 영문 자막",
  "신규 3D·복잡한 VFX": "Premium: 신규 3D",
  "맞춤 XR 가상공간": "Premium 포함",
};

// 고객 준비 자료 — FAQ "무엇을 보내면 되나요?"의 답이 된다(상품설계서 §1 고객 제공 자료).
const clientInputs = ["원고 또는 발표자료", "기관·기업 CI·BI와 로고", "정책·사업·성과 기초자료와 데이터", "사진·영상", "기타 참고자료"];

// Premium Contents — 이전(9월) 구간 그대로 유지(대표 지시 2026-10-01). 판매가는 쓰지 않는다(대표 지시 2026-09-12).
const premium: [string, string][] = [
  ["회차", "1회"],
  ["라이브", "90분"],
  ["프로덕션", "5시간"],
  ["출연", "고객 측 발표 + 전문 MC 1인"],
  ["디자인", "전용 콘셉트 신규 개발"],
  ["XR", "맞춤 가상공간 + 신규 3D"],
  ["롱폼 영상", "1편 + 챕터 분리본"],
  ["숏폼 영상", "6편"],
  ["자막", "국문 + 영문"],
  ["수정", "각 단계 2회"],
  ["계약 기간", "2개월"],
];

// FAQ — 대표 정리 2026-10-01. 발주 안내와 겹치는 문항(수정·영상 이용)은 뺐다.
// VAT 포함 금액은 가격 카드(plans)의 1.1배다. 가격을 바꾸면 이 답도 바꾼다(소스 가드가 확인한다).
const faqs: { q: string; a: string }[] = [
  {
    q: "홍보영상 제작이나 중계와 무엇이 다른가요?",
    a: "한 번의 발표로 라이브와 영상을 함께 만듭니다. 라이브에 쓴 영상과 그래픽을 그대로 편집해 롱폼 영상과 숏폼 영상으로 납품합니다.",
  },
  {
    q: "발표자는 스튜디오에 몇 시간 있어야 하나요?",
    a: "촬영 당일 최대 4시간입니다. 헤어·메이크업과 발표자 리허설, 라이브를 합친 시간입니다. Premium은 MC 리허설이 더해져 최대 5시간입니다. 기술 셋업과 기술 리허설은 EX가 미리 마칩니다. 발표자는 EX가 만든 프롬프터 원고를 보며 발표합니다.",
  },
  {
    q: "일정은 어떻게 정하나요?",
    a: "회차별 날짜는 계약 뒤 협의해 정합니다. 자료는 회차 실시 예정일 3주 전까지 받습니다.",
  },
  { q: "무엇을 보내면 되나요?", a: `${clientInputs.join(", ")}입니다.` },
  {
    q: "VAT를 포함하면 얼마인가요?",
    a: "VAT를 포함하면 단편 660만원, Package 2,189만원입니다. Premium은 견적 때 함께 안내합니다. 예산이 총액 기준이면 상담 때 먼저 알려 주세요.",
  },
  // 스튜디오 문항(스펙 10 §3.2) — 위치·주차·사전 시연은 옛 XR Studio 공개 문구, 출장 촬영·복장은 대표 결정(D6·D7).
  {
    q: "스튜디오는 어디에 있고, 주차가 되나요?",
    a: `${studioLoc.address}(${studioLoc.name})입니다. 무료로 주차하실 수 있습니다.`,
  },
  {
    q: "계약 전에 스튜디오를 볼 수 있나요?",
    a: "네. 방문을 예약하시면 하남 스튜디오에서 가상 무대를 무료로 시연해 드립니다. 멀리 계시면 화상 데모로 진행합니다.",
  },
  { q: "출장 촬영도 되나요?", a: "스튜디오 촬영이 기본입니다. 출장 촬영은 별도 협의로 진행합니다." },
  { q: "촬영 날 어떤 옷을 입으면 되나요?", a: "초록색 옷은 피해 주세요. 크로마키 무대라 초록색이 배경과 함께 지워집니다." },
];

/* 반복 UI — 설계본의 칩·행 패턴.
   칩 묶음은 목록으로 마크업한다. 한 덩어리 span이면 낭독 시 항목 수를 셀 수 없다
   (별도 협의 14개가 한 문장으로 들린다). 테두리 알파는 설계본의 .12다. */
const ChipList = ({ items, label, notes }: { items: readonly string[]; label: string; notes?: Record<string, string> }) => (
  <ul className="flex flex-wrap gap-2" aria-label={label}>
    {items.map((it) => (
      <li
        key={it}
        className={`rounded-full border bg-card px-4 py-2 text-sm text-fg ${
          notes?.[it] ? "border-mint/45" : "border-[rgba(255,255,255,.12)]"
        }`}
      >
        {it}
        {notes?.[it] && (
          <>
            {" "}
            <span className="ml-1 text-[13px] font-semibold text-mint">{notes[it]}</span>
          </>
        )}
      </li>
    ))}
  </ul>
);

/* 16:9 이미지 자리. 자산이 없으면 "이미지 준비 중" 자리표시를 그린다(배포 전 반드시 채운다). */
const Media = ({ src, alt, label, sizes }: { src?: string; alt: string; label: string; sizes: string }) => (
  <div className="relative aspect-video w-full overflow-hidden bg-card">
    {src ? (
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    ) : (
      <div
        role="img"
        aria-label={`${label} (이미지 준비 중)`}
        className="absolute inset-0 grid place-items-center"
        style={{ backgroundImage: "radial-gradient(120% 90% at 50% 0%, rgba(94, 46, 192, 0.18), transparent 60%)" }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">이미지 준비 중</span>
      </div>
    )}
  </div>
);

/* 이미지 칸 왼쪽 위 표시 — "구성 예시"(받는 것 틀·구도 카드), "예시 렌더"(활용 사례).
   실제 발표 화면이 아님을 밝히는 자리라 빼지 않는다(정직성). 한글이라 13px 이상. */
const ShotTag = ({ children }: { children: string }) => (
  <span className="pointer-events-none absolute left-2 top-2 z-[2] rounded-[7px] border border-border-strong bg-bg/70 px-2 py-[3px] text-[13px] font-semibold leading-[1.3] text-fg">
    {children}
  </span>
);

/* 이름-값 한 쌍. 호출부가 <dl>을 연다 — 규격표(specs·premium)와 같은 시맨틱으로 통일. */
const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between gap-4 border-t border-border py-3 text-sm">
    {/* 항목 이름은 한 줄로 둔다(390에서 "크로마 / 무대"로 갈라지지 않게, 스펙 10 §3.1). 값 칸이 나머지 폭을 쓴다. */}
    <dt className="shrink-0 whitespace-nowrap text-faint">{k}</dt>
    {/* 값이 두 줄로 넘어가도 다른 값처럼 오른쪽에 붙인다(최종 검토 Minor 1, 대표 선택 2026-10-01). */}
    <dd className="text-right font-medium text-fg">{v}</dd>
  </div>
);

/* 캡션 라벨. 아래 블록의 제목 구실을 하는 자리는 as="h3"으로 승격한다(§06은 항목이
   40개라 제목 탐색이 없으면 선형 낭독만 남는다). h3의 기본 굵기는 font-normal로 상쇄. */
const Cap = ({ children, as: Tag = "span" }: { children: React.ReactNode; as?: "span" | "h3" }) => (
  <Tag className="font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-lav">{children}</Tag>
);

/* 토글 — 발주 정보·사양 비교·FAQ가 같이 쓴다. 사이트 키트 .faq-item(details/summary, 스크립트 없음).
   제목 아래 요약 한 줄은 닫힌 상태에서도 보여 무엇이 들어 있는지 알 수 있다(FAQ는 질문만 두고 요약을 생략한다).
   + 아이콘은 열리면 45° 돌아 ×가 된다. */
/* light = FAQ 질문용(대표 지시 2026-10-01): 굵게 쓰지 않고 한 단계 작게(20px → 18px). 발주 안내·사양 비교 토글은 굵은 제목 그대로. */
const Toggle = ({ title, summary, children, light = false }: { title: string; summary?: string; children: React.ReactNode; light?: boolean }) => (
  <details className="faq-item">
    <summary>
      <span className="min-w-0">
        <span className={light ? "block text-lg font-normal leading-[1.4] text-fg" : "block text-xl font-semibold leading-[1.3] text-fg"}>{title}</span>
        {summary && <span className="mt-1.5 block text-pretty text-[15px] font-normal leading-relaxed text-muted">{summary}</span>}
      </span>
      <span className="q-icon" aria-hidden="true">
        +
      </span>
    </summary>
    <div className="px-1 pb-10 pt-2">{children}</div>
  </details>
);

export default function XrStudioPage() {
  return (
    // .xrlive — 이 페이지에만 설계본 타입 스케일·섹션 패딩을 적용하는 스코프.
    // 사이트 키트(.section/.h2/.container-ex)는 전역 그대로 두고 여기서만 되돌린다.
    <div className="xrlive">
      {/* 구조화 데이터(스펙 10 §2.4) — 화면에 보이는 정보만 넣는다. 이동 경로는 화면에 따로 그리지 않는다. */}
      <JsonLd
        schema={[
          breadcrumbLd([{ name: "XR Studio", path: "/xr-studio" }]),
          localBusinessLd({ name: studioLoc.name, address: studioLoc.address, zip: studioLoc.zip, tel: studioLoc.tel || site.contact.tel, region: "경기도", locality: "하남시", path: "/xr-studio", image: "/xr-live-studio.webp", geo: { lat: 37.5576, lng: 127.205 } }),
          faqPageLd(faqs),
        ]}
      />
      <PageHero
        tag="XR Live Presentation · TALK SHOW"
        titleTone="plain"
        title={
          <>
            <span className="text-gradient-ex-bright">XR 가상공간</span>에서 라이브 영상을 만듭니다.
          </>
        }
        lead={
          <>
            원고와 발표자료를 보내주시면, 기획부터 포스트 프로덕션까지
            <br />
            EX가 하나의 흐름으로 연결합니다.
          </>
        }
      >
        {/* 흐름 칩 — 설계본은 히어로 안, 리드 아래 40px, 중앙 정렬이다. 화살표는 칩 뒤에 온다. */}
        <ol className="xrflow" aria-label="제작 흐름">
          {flow.map((f, i) => (
            <li key={f} className="xrflow__item">
              <span className="xrflow__chip">{f}</span>
              {i < flow.length - 1 && (
                <span className="xrflow__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        {/* 첫 화면 버튼은 구성·견적 1개(대표 지시 2026-10-01). 과업지시서 초안 버튼은 마지막 CTA에만 둔다. */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={CONTACT.quote} variant="primary">
            구성·견적 문의 <span aria-hidden="true">→</span>
          </Button>
        </div>
      </PageHero>

      {/* BEFORE — 일반 웨비나. AFTER와 같은 3축을 같은 순서로 대응한다.
          이 페이지의 섹션 라벨은 전부 번호 없이 쓴다(대표 지시 2026-09-29). */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel>BEFORE</SectionLabel>
          <h2 className="h2 h2--xr" style={{ marginTop: 20, maxWidth: "26ch" }}>
            발표 내용은 달라도,
            <br />
            웨비나 화면은 비슷해 보입니다.
          </h2>
          <p className="lead" style={{ maxWidth: "44rem" }}>
            장소도 카메라도 내용도 다른데 결과는 같습니다.
          </p>
          {/* 서로 다른 기업의 웨비나 4편에서 배치만 옮긴 도식(대표 선택 2026-09-30). 스크린샷을 쓰지 않는다 —
              다른 회사 방송 화면이라 저작권·비방 광고 위험이 있다. 원본 좌표·생성 스크립트는 _workspace/xr-live-brochure/before-webinar. */}
          {/* 도식은 가운데 정렬, 최대 960px(대표 지시 2026-10-01). 4차의 80%(973px)와 같은 크기이고,
              좁은 화면은 칸 전체 폭이다. 도식 속 글자(13px 기준)가 너무 작아지지 않게 더 줄이지 않는다. */}
          <figure className="mx-auto mt-11 max-w-[60rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/before-webinar-layout.svg"
              alt="서로 다른 기업의 웨비나 화면 4개를 옮긴 도식. 발표자료의 내용은 모두 다르지만, 네 화면 모두 발표자 창과 발표자료가 나뉜 같은 배치다."
              width={1292}
              height={732}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      {/* AFTER — 공간·구도·Live-to-Post 3장(대표 정리 2026-10-01). 1024px 미만에서는 1열로 쌓는다.
          하단 비교 줄은 표준(프리셋 + 브랜드 톤)과 Premium(전용 공간 신규)의 경계를 밝힌다. */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel>AFTER</SectionLabel>
          <h2 className="h2 h2--xr" style={{ marginTop: 20, maxWidth: "26ch" }}>
            글로벌 기업의 키노트처럼,
            <br />
            브랜드가 보이는 화면을 만듭니다.
          </h2>
          <p className="lead" style={{ maxWidth: "44rem" }}>
            가상공간은 콘셉트에 맞게, 카메라는 연출에 맞게 XR로 구현합니다.
          </p>
          <ul className="mt-11 grid gap-5 lg:grid-cols-3">
            {after.map((a) => (
              <li key={a.axis} className="card flex flex-col overflow-hidden" style={{ padding: 0 }}>
                {a.shots.length === 1 ? (
                  <Media
                    src={a.shots[0].src}
                    alt={a.shots[0].alt}
                    label={`${a.axis} 합성 화면`}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden bg-card">
                    <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                      {a.shots.map((s) => (
                        <div key={s.src} className="relative overflow-hidden">
                          <Image
                            src={s.src}
                            alt={s.alt}
                            fill
                            sizes="(min-width: 1024px) 17vw, 50vw"
                            className={`object-cover ${s.pos ?? ""}`}
                          />
                        </div>
                      ))}
                    </div>
                    <ShotTag>구성 예시</ShotTag>
                  </div>
                )}
                <div style={{ padding: 28 }}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-mint">{a.axis}</span>
                  <h3 className="mt-3.5 text-xl font-semibold leading-[1.3] text-fg">{a.title}</h3>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted">{a.desc}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-faint">{a.caption}</p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-border pt-6 text-sm sm:grid-cols-2">
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
              <dt lang="en" className="font-semibold text-fg">
                STANDARD
              </dt>
              <dd className="text-muted">가상공간 프리셋 선택 + 브랜드 톤</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
              <dt lang="en" className="font-semibold text-fg">
                Premium
              </dt>
              <dd className="text-muted">전용 가상공간 신규 제작 + 신규 3D</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* USE CASES — 가상공간 프리셋 렌더 4종(대표 정리 2026-10-01: 제목 = 공간 이름, 설명 = 어울리는 발표).
          실제 발표 현장이 아니므로 칸마다 "예시 렌더"를 단다(각주는 대표 3차 수정으로 삭제). 4·2·1열 어디서도 고아 카드가 없다. */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel>USE CASES</SectionLabel>
          <h2 className="h2 h2--xr" style={{ marginTop: 20, maxWidth: "26ch" }}>
            발표 주제마다 공간이 달라집니다.
          </h2>
          <p className="lead" style={{ maxWidth: "44rem" }}>
            기업·기관 발표부터 신제품 발표까지 콘셉트에 맞는 가상공간에서 진행합니다.
          </p>
          {/* 4열 전환점을 1280px로 둔다. lg(1024)에서 4열이면 이미지가 221px까지 줄어
              3D 실내 장면의 유형 구분이 안 된다. 4장이라 4·2·1열 어디서도 고아 카드가 없다. */}
          <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {useCases.map((u) => (
              <li key={u.set}>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
                  <Image
                    src={u.img}
                    alt={`${u.set}. 하남 EX XR Studio의 XR 가상공간 렌더`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <ShotTag>예시 렌더</ShotTag>
                </div>
                <h3 className="mt-3.5 text-[15px] font-semibold leading-[1.3] text-fg">{u.set}</h3>
                <p className="mt-1 text-xs text-faint">{u.fit}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRICING — 두 상품 비교 카드. BEFORE/AFTER로 범주를 먼저 바꾼 뒤 가격을 보여준다(대표 결정 Q5). */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel>PRICING</SectionLabel>
          <h2 className="h2 h2--xr" style={{ marginTop: 20, maxWidth: "26ch" }}>
            예산에 맞는 구성을 고르실 수 있습니다.
          </h2>
          <div className="mt-11 grid gap-5 lg:grid-cols-2">
            {plans.map((p) => (
              <div key={p.name} className="card flex flex-col gap-7" style={{ padding: 32 }}>
                <div>
                  <span lang="en" className="font-mono text-xs uppercase tracking-[0.12em] text-lav">
                    STANDARD
                  </span>
                  <h3 className="mt-1.5 text-[1.125rem] font-semibold leading-[1.2] text-fg sm:text-[clamp(1.3rem,1.9vw,1.75rem)]">
                    {p.name}
                  </h3>
                </div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[clamp(2.4rem,4.2vw,3.75rem)] font-bold leading-none tracking-tight text-fg">{p.price}</span>
                  <span className="text-sm text-faint">VAT 별도</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {p.stats.map((s) => (
                    <div key={s.l} className="border-l border-[rgba(255,255,255,.12)] pl-3.5">
                      <p className="text-2xl font-bold leading-none text-fg">{s.v}</p>
                      <p className="mt-1.5 text-xs text-faint">{s.l}</p>
                    </div>
                  ))}
                </div>
                <dl className="flex flex-col border-b border-border">
                  {p.rows.map(([k, v]) => (
                    <Row key={k} k={k} v={v} />
                  ))}
                </dl>
              </div>
            ))}
          </div>
          {/* 전체 사양 비교(대표 메모 2026-10-01: 가격 카드 아래 접힘). 390px에서도 값 칸이 두 줄을 넘지 않게
              모바일은 13px·칸 좌우 여백 6px로 줄인다. */}
          <div className="mt-8">
            <Toggle title="전체 사양 비교 펼치기" summary="프로덕션 · 카메라 · 자막 · 수정 · 출연 · 모든 상품에 포함">
              <table className="w-full border-collapse text-left text-[13px] sm:text-sm">
                <caption className="sr-only">Package · 단편 · Premium 사양 비교</caption>
                <thead>
                  <tr>
                    <th scope="col" className="border-t border-border px-1.5 py-2.5 font-medium text-faint sm:px-3">
                      항목
                    </th>
                    {compareCols.map((c) => (
                      <th key={c} scope="col" className="border-t border-border px-1.5 py-2.5 font-medium text-faint sm:px-3">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.map(([k, ...vals]) => (
                    <tr key={k}>
                      <th scope="row" className="whitespace-nowrap border-t border-border px-1.5 py-2.5 align-top font-medium text-faint sm:px-3">
                        {k}
                      </th>
                      {vals.map((v, i) => (
                        <td key={compareCols[i]} className="border-t border-border px-1.5 py-2.5 align-top text-fg sm:px-3">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="mt-8 text-[17px] font-semibold text-fg">모든 상품에 포함</h3>
              <ul className="mt-3 grid gap-x-7 gap-y-1.5 md:grid-cols-2">
                {included.map((it) => (
                  <li
                    key={it}
                    className="relative pl-4 text-sm leading-[1.6] text-muted before:absolute before:left-1 before:text-lav before:content-['·']"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </Toggle>
          </div>
          {/* CTA 1개(대표 지시 2026-10-01): 카드마다 있던 "일정·진행 상담" 2개를 합쳤다. 둘 다 같은 견적 폼이었다.
              카드를 보고, 필요하면 사양을 비교한 뒤 문의하는 순서로 구간 끝에 둔다. */}
          <div className="mt-10 flex">
            <Button href={CONTACT.quote} variant="primary">
              구성·견적 문의 <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* REFERENCES — 사례 영상 1편(대표 14차 수정 2026-10-01: 카드 4장 삭제). 화면에 들어오면 소리 없이 반복 재생하고,
          동작 줄이기 설정이면 정지 화면만 보인다(ControlledVideo). 원본 xrlive.mp4(27.8MB·20Mbps)는 웹용 3.5MB로 다시 인코딩했다. */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel>REFERENCES</SectionLabel>
          <h2 className="h2 h2--xr" style={{ marginTop: 20, maxWidth: "26ch" }}>
            XR 웨비나·발표 제작 사례
          </h2>
          <div className="card relative mt-11 aspect-video overflow-hidden" style={{ padding: 0 }}>
            <ControlledVideo
              src="/xr-live-reel.mp4"
              poster="/xr-live-reel-poster.webp"
              label="XR 웨비나·발표 제작 사례 영상"
              playLabel="영상 재생"
              pauseLabel="영상 일시정지"
            />
          </div>
        </div>
      </section>

      {/* STUDIO — 전체 화면에서 제목이 2줄이 되도록 글 칸을 넓혔다(1:1.5 → 1:1.2, 대표 3차 수정 2026-10-01). */}
      <section className="section section--surface">
        <div className="container-ex grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-x-12">
          <div>
            <SectionLabel>STUDIO</SectionLabel>
            <h2 className="h2 h2--xr" style={{ marginTop: 20 }}>
              {/* 스튜디오 이름이 두 줄로 갈라지지 않게 묶는다(대표 3차 수정: 전체 화면 2줄). */}
              <span className="whitespace-nowrap">하남 EX XR Studio에서</span> 촬영합니다.
            </h2>
            <p className="lead">
              카메라부터 XR 시스템까지 한 스튜디오에 갖췄습니다. 스튜디오로 방문해 실제 결과를 보실 수 있습니다.
            </p>
            {/* 스튜디오 사양(스펙 10 §3.1) — 가격 카드와 같은 Row(dt/dd) 형식. */}
            <dl className="mt-8 flex flex-col border-b border-border" aria-label="스튜디오 사양">
              {studioSpecs.map(([k, v]) => (
                <Row key={k} k={k} v={v} />
              ))}
            </dl>
            <Button href={CONTACT.demo} variant="glow" className="mt-8">
              스튜디오 방문 예약 <span aria-hidden="true">→</span>
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <figure className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
              <Image
                src="/xr-live-studio.webp"
                alt="하남 EX XR Studio의 그린 크로마 무대. 천장 조명 그리드 아래에 카메라와 카메라 크레인, 모니터, 조명이 놓여 있다."
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <span
                lang="en"
                className="pointer-events-none absolute left-3.5 top-3.5 rounded-lg border border-[rgba(255,255,255,.24)] bg-bg/70 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg"
              >
                HANAM XR STUDIO
              </span>
            </figure>
            {/* 작은 사진 2장(스펙 10 §3.1) — 16:9 사본(운영 서버는 이미지를 줄이지 않는다). */}
            <ul className="grid grid-cols-2 gap-3" aria-label="스튜디오 사진">
              {studioShots.map((s) => (
                <li key={s.src}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
                  </div>
                  <p className="mt-2 text-xs text-faint">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOR BUYERS — 발주 정보 토글 3개(대표 선택 2026-10-01, 3차 수정으로 이용·송출 범위 삭제: 산출물·규격 / 수정·검수·보관 / 별도 협의).
          제작 과정·수행 역량·발주 담당자 안내 토글은 뺐다. 고객 준비 자료는 FAQ로 옮겼다.
          사이트 키트 .faq-item(details/summary)이라 스크립트 없이 동작하고, 기본은 모두 닫힘. 닫힌 내용도 HTML에 남는다.
          펼친 안의 카드·표·칩은 기존 레이아웃 그대로다. */}
      <section className="section section--ink">
        <div className="container-ex">
          <SectionLabel>FOR BUYERS</SectionLabel>
          <h2 className="h2 h2--xr" style={{ marginTop: 20, maxWidth: "26ch" }}>
            필요한 정보를 한곳에 모았습니다.
          </h2>
          <p className="lead" style={{ maxWidth: "44rem" }}>
            필요한 항목만 펼쳐 보세요.
          </p>
          <div className="mt-11">
            <Toggle title="산출물과 기술 규격" summary={`회차별 ${deliverables.length}종 · 4K UHD 프로그램 마스터 · H.264 MP4`}>
              <div className="grid items-start gap-5 lg:grid-cols-2">
                <div className="card" style={{ padding: 32 }}>
                  <Cap as="h3">회차별 산출물 8종</Cap>
                  <ol className="mt-4 flex flex-col">
                    {deliverables.map((d, i) => (
                      <li key={d} className="grid grid-cols-[32px_1fr] gap-3 border-t border-border py-3 text-[15px] leading-6">
                        <span className="text-[13px] leading-6 text-faint">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-medium text-fg">{d}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="card" style={{ padding: 32 }}>
                  <Cap as="h3">기술 규격</Cap>
                  <dl className="mt-4 flex flex-col">
                    {specs.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[1fr_1.3fr] gap-3 border-t border-border py-3 text-[15px] leading-6">
                        <dt className="text-faint">{k}</dt>
                        <dd className="font-medium text-fg">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Toggle>
            <Toggle title="수정·검수와 데이터 보관" summary="단계별 수정 1회 · 원본 6개월 · 소스·최종본 1년">
              <div className="grid items-start gap-5 lg:grid-cols-2">
                <div className="card" style={{ padding: 28 }}>
                  <Cap as="h3">수정 및 검수</Cap>
                  <dl className="mt-4 flex flex-col">
                    {review.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-t border-border py-3 text-sm">
                        <dt className="text-muted">{k}</dt>
                        <dd className="font-semibold text-fg">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-pretty text-[13px] leading-relaxed text-faint">
                    고객 의견은 단계별 취합본으로 받습니다. 승인한 단계를 크게 바꾸면 별도로 협의합니다.
                  </p>
                  <p className="mt-1 text-pretty text-[13px] leading-relaxed text-faint">Premium은 두 단계 모두 2회입니다.</p>
                </div>
                <div className="card" style={{ padding: 28 }}>
                  <Cap as="h3">데이터 보관</Cap>
                  <dl className="mt-4 flex flex-col">
                    {retention.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-t border-border py-3 text-sm">
                        <dt className="text-muted">{k}</dt>
                        <dd className="font-semibold text-fg">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-pretty text-[13px] leading-relaxed text-faint">
                    보관 기간이 지난 자료를 남겨야 하면 기간이 끝나기 전에 협의합니다.
                  </p>
                </div>
              </div>
            </Toggle>
            <Toggle title="별도 협의 항목" summary={`기본 구성 밖 ${extras.length}개 항목 · 별건 계약`}>
              <div>
                <p className="max-w-[44rem] text-pretty text-[15px] leading-relaxed text-muted">
                  기본 구성에 포함되지 않는 항목입니다. 필요하시면 범위와 금액을 협의해 정합니다.
                </p>
                <div className="mt-5">
                  <ChipList items={extras} label="별도 협의 항목" notes={premiumIncluded} />
                </div>
                <p className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,.24)] px-5 py-3.5 text-base font-semibold text-fg">
                  <span className="inline-block h-0.5 w-7 bg-lav" aria-hidden="true" />
                  별도 협의 항목은 별건 계약으로 진행합니다.
                </p>
              </div>
            </Toggle>
          </div>
        </div>
      </section>

      {/* PREMIUM CONTENTS — Live Presentation과 다른 상품이므로 블록을 분리한다.
          이전(9월) 구간 그대로다(대표 지시 2026-10-01). 문의 버튼 주소만 상품용 문의 흐름(W2)으로 바뀌었다. */}
      <section
        className="section border-t border-border-strong"
        style={{ background: "var(--color-footer)" }}
      >
        <div className="container-ex grid items-start gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-x-16">
          <div>
            <SectionLabel tone="mint">PREMIUM CONTENTS</SectionLabel>
            <h2 className="h2 h2--xr" style={{ marginTop: 20 }}>
              Premium Contents
            </h2>
            <p className="lead">브랜드 전용 가상공간을 새로 만드는 1회 상품입니다.</p>
            {/* 판매가 비노출 — 연출과 요구사항에 따라 구성이 달라져 고정가를 걸지 않는다
                (대표 지시 2026-09-12). 정가는 상품설계서 v4에 그대로 둔다. */}
            <p className="mt-6 max-w-[34rem] text-pretty text-[15px] leading-relaxed text-muted">
              연출과 요구사항에 따라 구성이 달라집니다. 내용을 확인한 뒤 견적을 드립니다.
            </p>
            {/* 구간 버튼은 대표 지시(2026-10-01, CTA 정리)로 뺐다. 문의는 FAQ 다음 마지막 CTA가 받는다. */}
          </div>
          <div className="card" style={{ padding: 32 }}>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-mint">사양</span>
            <dl className="mt-4 grid gap-x-8 lg:grid-cols-2">
              {premium.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-3 border-t border-border py-3 text-sm">
                  <dt className="text-faint">{k}</dt>
                  <dd className="font-medium text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FAQ — 대표 정리 2026-10-01. 질문만 두고 요약 줄은 없다. 화면 제목은 라벨뿐이라
          보조기기용 h2를 둔다(제목 탐색에서 FAQ가 빠지지 않게). */}
      <section className="section section--surface">
        <div className="container-ex">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="sr-only">자주 묻는 질문</h2>
          <div className="mt-8">
            {faqs.map((f) => (
              <Toggle key={f.q} title={f.q} light>
                <p className="max-w-[52rem] text-pretty text-[15px] leading-relaxed text-muted">{f.a}</p>
              </Toggle>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--ink section--glow">
        <div className="container-ex">
          {/* 설계본의 CTA는 페이지 유일의 발광 초점 블록이다. 홈과 같은 .ctacard를 쓴다
              (평면 .card로 두면 앞의 카드 20여 장과 구분되지 않아 결론부가 사라진다). */}
          <div className="ctacard">
            <span lang="en" className="cta-ey">
              <span className="cta-bar" aria-hidden="true" />
              START A PROJECT
            </span>
            <h2 className="h2 max-w-2xl" style={{ marginTop: 22, marginInline: "auto" }}>
              다음 발표를 영상 콘텐츠로 남기세요.
            </h2>
            <p className="mx-auto mt-4 max-w-[34rem] text-[17px] text-footer-link">
              주제와 회차, 예산을 알려주시면 구성안과 견적을 회신합니다. 발주 서류가 필요하시면 과업지시서 초안도 함께 드립니다.
            </p>
            <div className="mt-[34px] flex flex-wrap justify-center gap-3">
              <Button href={CONTACT.quote} variant="primary">
                구성·견적 문의 <span aria-hidden="true">→</span>
              </Button>
              <Button href={CONTACT.brief} variant="secondary">
                과업지시서 초안 받기 <span aria-hidden="true">→</span>
              </Button>
            </div>
            {/* 전화 — 번호 단일 출처는 site.contact.tel. 탭 타깃 44px. */}
            <p className="mt-5 text-sm text-footer-link">
              전화{" "}
              <a
                href={`tel:${site.contact.tel.replace(/-/g, "")}`}
                className="inline-flex min-h-11 items-center font-medium text-fg underline-offset-4 hover:underline"
              >
                {site.contact.tel}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
