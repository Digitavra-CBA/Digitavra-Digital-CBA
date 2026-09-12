// Ilustrasi table set-up (piring, napkin, gelas, cutlery) sebagai elemen
// visual khas hospitality — bagian dari identitas desain, bukan dekorasi generik.
export default function TableSettingHero({ className = "" }) {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ilustrasi table set-up restoran"
    >
      {/* meja */}
      <ellipse cx="210" cy="230" rx="170" ry="26" fill="#151d26" opacity="0.35" />

      {/* placemat */}
      <rect
        x="90" y="120" width="240" height="110" rx="10"
        fill="#2a3644" stroke="#c39a52" strokeOpacity="0.35"
        className="tablesetting-piece" style={{ animationDelay: "0ms" }}
      />

      {/* dinner plate */}
      <circle cx="210" cy="172" r="58" fill="#f5f1e8" className="tablesetting-piece" style={{ animationDelay: "120ms" }} />
      <circle cx="210" cy="172" r="42" fill="none" stroke="#c39a52" strokeWidth="1.5" opacity="0.55" className="tablesetting-piece" style={{ animationDelay: "160ms" }} />

      {/* folded napkin on plate */}
      <path
        d="M188 148 L232 148 L232 190 Q210 200 188 190 Z"
        fill="#e2eeed" opacity="0.9"
        className="tablesetting-piece" style={{ animationDelay: "260ms" }}
      />

      {/* fork - left */}
      <g className="tablesetting-piece" style={{ animationDelay: "340ms" }}>
        <rect x="118" y="140" width="8" height="66" rx="4" fill="#dce3e8" />
        <rect x="114" y="132" width="3" height="16" rx="1.5" fill="#dce3e8" />
        <rect x="120" y="132" width="3" height="16" rx="1.5" fill="#dce3e8" />
        <rect x="126" y="132" width="3" height="16" rx="1.5" fill="#dce3e8" />
      </g>

      {/* knife - right */}
      <g className="tablesetting-piece" style={{ animationDelay: "420ms" }}>
        <rect x="292" y="140" width="8" height="66" rx="4" fill="#dce3e8" />
        <path d="M292 140 Q300 132 300 148 L300 158 L292 158 Z" fill="#dce3e8" />
      </g>

      {/* wine glass */}
      <g className="tablesetting-piece" style={{ animationDelay: "520ms" }}>
        <path d="M314 118 Q314 142 296 142 Q278 142 278 118 L280 90 L312 90 Z" fill="none" stroke="#c39a52" strokeWidth="2" />
        <line x1="296" y1="142" x2="296" y2="168" stroke="#c39a52" strokeWidth="2" />
        <line x1="284" y1="168" x2="308" y2="168" stroke="#c39a52" strokeWidth="2" />
        <path d="M281 94 L311 94 Q308 118 296 118 Q284 118 281 94 Z" fill="#c39a52" opacity="0.35" className="tablesetting-gleam" />
      </g>

      {/* candle accent */}
      <g className="tablesetting-piece" style={{ animationDelay: "600ms" }}>
        <rect x="150" y="96" width="10" height="34" rx="3" fill="#f5f1e8" />
        <ellipse cx="155" cy="90" rx="5" ry="8" fill="#c39a52" className="tablesetting-gleam" />
      </g>
    </svg>
  );
}
