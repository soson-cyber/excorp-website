import { ImageResponse } from "next/og";

export const alt = "EX Corporation — Real-time XR & Virtual Production Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImageEn() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            letterSpacing: 4,
            color: "#9aa0c0",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 99, background: "#d206ee" }} />
          EX CORPORATION
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 70,
            fontWeight: 800,
            lineHeight: 1.1,
            backgroundImage: "linear-gradient(115deg, #45f1e0, #5e2ec0 55%, #d206ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Expand Experiences Through Connected Technology
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#b6bad0" }}>
          All-in-One, Real-time XR Content Production Solution
        </div>
      </div>
    ),
    { ...size },
  );
}
