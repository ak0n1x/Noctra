type NoctraLogoProps = {
  compact?: boolean;
  className?: string;
};

export function NoctraLogo({ compact = false, className = "" }: NoctraLogoProps) {
  return (
    <span className={`brand-lockup ${compact ? "brand-lockup-compact" : ""} ${className}`.trim()}>
      <span aria-hidden="true" className="brand-mark">
        <svg viewBox="0 0 40 40" fill="none">
          <defs>
            <linearGradient
              id="noctra-mark-gradient"
              x1="3"
              y1="4"
              x2="37"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#42E5C3" />
              <stop offset=".52" stopColor="#529EEA" />
              <stop offset="1" stopColor="#8A72FF" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#noctra-mark-gradient)" />
          <circle cx="20" cy="20" r="8.2" stroke="#07111A" strokeWidth="4.2" />
          <circle cx="20" cy="20" r="13.2" stroke="white" strokeOpacity=".2" strokeWidth=".8" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-word">
          Noctra<span>.</span>
        </span>
      )}
    </span>
  );
}
