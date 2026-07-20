import React from "react";

export default function VerifiedSymbol() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.15em",
        height: "1.15em",
        verticalAlign: "middle",
        marginLeft: "4px",
        userSelect: "none",
      }}
    >
      <svg xmlns="http://w3.org" width="100%" height="100%" viewBox="0 0 48 48">
        <path d="M0 0h48v48H0z" fill="none" />
        <defs>
          <mask id="SVGKkdZ2csA">
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            >
              <path
                fill="#fff"
                stroke="#fff"
                d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"
              />
              <path stroke="#000" d="m17 24l5 5l10-10" />
            </g>
          </mask>
        </defs>
        <path fill="#0074f4" d="M0 0h48v48H0z" mask="url(#SVGKkdZ2csA)" />
      </svg>
    </span>
  );
}
