import { ImageResponse } from "next/og";

// XR Live 링크 미리보기 — 브랜드 카드(대표 승인 2026-10-01, 스펙 07 W3).
// 고객 행사 화면은 쓰지 않는다(사용 허락 CF-10 확인 전). 허락을 받으면 신한 무대 화면으로 바꾼다.
// 구성은 루트 (ko)/opengraph-image.tsx를 따른다. 한글 글리프는 next/og가 글꼴을 받아 그린다(루트와 같은 방식).
export const alt = "XR Live Presentation · XR 가상공간에서 라이브 영상을 만듭니다.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(60% 80% at 25% 30%, #2a1666 0%, #0f1129 60%, #0f1129 100%)",
          color: "#f4f5fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, letterSpacing: 4, color: "#9aa0c0" }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: "#d206ee" }} />
          EX CORPORATION
        </div>
        <div style={{ marginTop: 44, fontSize: 30, letterSpacing: 2, color: "#c4b5fd" }}>XR Live Presentation · TALK SHOW</div>
        <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", fontSize: 72, fontWeight: 800, lineHeight: 1.15 }}>
          <span
            style={{
              backgroundImage: "linear-gradient(115deg, #45f1e0, #5e2ec0 55%, #d206ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            XR 가상공간
          </span>
          <span>에서 라이브 영상을</span>
          <span>만듭니다.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
