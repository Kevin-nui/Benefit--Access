const BADGES = [
  {
    label: "Secure & Private",
    icon: (
      <svg
        viewBox="0 0 56 56"
        fill="none"
        className="h-12 w-12"
        aria-hidden="true"
      >
        <path
          d="M28 4L8 12V28C8 39.05 16.8 49.38 28 52C39.2 49.38 48 39.05 48 28V12L28 4Z"
          stroke="white"
          strokeWidth="2.5"
        />
        <rect
          x="20"
          y="25"
          width="16"
          height="14"
          rx="2"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M24 25V21C24 18.79 25.79 17 28 17C30.21 17 32 18.79 32 21V25"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="28" cy="31" r="2" fill="white" />
        <line
          x1="28"
          y1="33"
          x2="28"
          y2="36"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Free Access",
    icon: (
      <svg
        viewBox="0 0 56 56"
        fill="none"
        className="h-12 w-12"
        aria-hidden="true"
      >
        <circle cx="28" cy="28" r="24" stroke="white" strokeWidth="2.5" />
        <circle
          cx="28"
          cy="28"
          r="18"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M28 18V30M24 22V30M32 22V30M20 30C20 34.42 23.58 38 28 38C32.42 38 36 34.42 36 30H20Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-10 pb-6 pt-2 md:hidden">
      {BADGES.map(({ label, icon }) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          {icon}
          <span className=" font-body text-sm font-bold text-white drop-shadow">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
