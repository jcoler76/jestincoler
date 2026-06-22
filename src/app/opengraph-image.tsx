import { ImageResponse } from "next/og";

export const alt = "Jestin Coler — AI Solutions Architect & Data Systems Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f5f1",
          color: "#15140f",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 30, color: "#6f6c63", display: "flex" }}>
          <span>jestin</span>
          <span style={{ color: "#00b865" }}>.</span>
          <span>coler</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.05, maxWidth: 920, display: "flex" }}>
            I build AI systems that do real work
          </div>
          <div style={{ fontSize: 28, color: "#6f6c63", marginTop: 28, display: "flex" }}>
            AI Solutions Architect & Data Systems Builder · jestincoler.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
