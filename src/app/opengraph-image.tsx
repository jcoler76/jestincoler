import { ImageResponse } from "next/og";

export const alt = "Jestin Coler — AI Solutions Architect & Data Systems Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const ink = "#15140f";
  const cream = "#f6f5f1";
  const green = "#00b865";
  const muted = "#9a978d";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ink,
          color: cream,
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 30, color: muted, display: "flex" }}>
            <span>jestin</span>
            <span style={{ color: green }}>.</span>
            <span>coler</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 80,
              background: "#4a7e80",
              border: `2px solid ${cream}`,
              color: cream,
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            JC
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -1,
            maxWidth: 960,
          }}
        >
          I build AI systems that do real work
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: muted }}>
            Next.js · Claude · RAG · autonomous agents · TypeScript
          </div>
          <div
            style={{
              display: "flex",
              width: 130,
              height: 5,
              background: green,
              borderRadius: 3,
              marginTop: 26,
              marginBottom: 26,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontSize: 30, color: cream }}>jestincoler.com</div>
            <div style={{ display: "flex", fontSize: 24, color: muted }}>
              AI Solutions Architect & Data Systems Builder
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
