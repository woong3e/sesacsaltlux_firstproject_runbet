const iconPaths = {
  brand: (
    <path d="m7.1 7.1 1.3-3.3 4.1-1.1 3.1 1.5.5 3.3-2.4 1.9-2.2-1.2 1.3-1.8-1.7-.7-1 2.7 1.6 3.2 3.8-1.4 3.2 1.7.3 4.2-2.6 3.1-5.7 1.3-5.9-1.1L3 16.2l1.8-5.9 2.3-3.2Z" />
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
      <path d="M10 21h4M12 2V1" />
    </>
  ),
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="12" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4M12 15v3" />
    </>
  ),
  settings: (
    <>
      <path d="m9 3 1-1h4l1 3 3 1 3 1v4l-2 2-1 3v3l-4 2-2-2-3-1-3 1-2-3 1-3-1-3-2-2 2-3h4l1-2Z" />
      <circle cx="12" cy="11" r="3" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="6" width="11" height="15" rx="2" />
      <path d="M15 6V3H5v14h3M11 2h3v5h-3z" />
    </>
  ),
  link: (
    <>
      <path d="m10 7 3-3a5 5 0 0 1 7 7l-4 4m-2 2-3 3a5 5 0 0 1-7-7l4-4M8 16l8-8" />
    </>
  ),
  message: (
    <path d="M21 11a9 8 0 0 1-9 8H8l-5 3 1-6a8 8 0 0 1-1-5 9 8 0 0 1 18 0Z" />
  ),
  runner: (
    <>
      <circle cx="15" cy="4" r="2" />
      <path d="m7 9 4-3 4 3 4 1m-7-2-3 6 5 3 1 5M9 14l-3 5H2m9-8 4 3 4-1" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="3" />
      <path d="M8 3v4m8-4v4M4 11h16m-11 4h2m2 0h2" />
    </>
  ),
  home: (
    <path d="m2 10 10-8 10 8h-3v11h-5v-7h-4v7H5V10H2Z" fill="currentColor" />
  ),
  challenge: (
    <>
      <ellipse
        cx="6.5"
        cy="6.5"
        rx="3"
        ry="4"
        transform="rotate(-35 6.5 6.5)"
      />
      <ellipse
        cx="17.5"
        cy="6.5"
        rx="3"
        ry="4"
        transform="rotate(35 17.5 6.5)"
      />
      <path d="m9 10 9 11M15 10 6 21m-1-4 4 3m6-3 4 3" />
    </>
  ),
  record: (
    <>
      <path d="m12 2 8 4v13l-8 3-8-3V6l8-4Z" />
      <path d="M10 8h4m-2 0v8m-2 0h4" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M3 21v-2a9 6 0 0 1 18 0v2H3Z" />
    </>
  ),
};

type IconProps = {
  name: keyof typeof iconPaths;
  className?: string;
};

export function Icon({ name, className = "size-6" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name]}
    </svg>
  );
}
