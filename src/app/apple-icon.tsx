import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the Brisk "B" mark on ink. iOS applies its own corner mask. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07080C",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#F4F1EA"
            fillRule="evenodd"
            d="M16 14h18c8.3 0 13.5 4.1 13.5 10.4 0 3.6-1.7 6.3-4.6 7.9 4 1.5 6.3 4.7 6.3 9.1C49.2 48.3 43.6 52 35.2 52H16V14Zm9.5 7.8v7.6h7.3c3 0 4.7-1.4 4.7-3.8s-1.7-3.8-4.7-3.8h-7.3Zm0 14.9v7.5h8.6c3.3 0 5.1-1.4 5.1-3.8 0-2.3-1.8-3.7-5.1-3.7h-8.6Z"
          />
          <circle cx="52" cy="52" r="5.5" fill="#FF9F4D" />
        </svg>
      </div>
    ),
    size,
  );
}
