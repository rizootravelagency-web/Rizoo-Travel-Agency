import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  showTagline = true,
  className = '',
}) => {
  const iconSize = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const taglineSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  const isDarkBg = variant === 'dark' || variant === 'white';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon: Combined Briefcase, Globe, and Airplane */}
      <div
        className={`${iconSize} relative rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-0.5 shadow-md flex items-center justify-center shrink-0 border border-amber-400/30 overflow-hidden group`}
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.25),transparent_70%)]" />

        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Globe Grid */}
          <circle cx="24" cy="24" r="18" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.4" />
          <ellipse cx="24" cy="24" rx="9" ry="18" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="6" y1="24" x2="42" y2="24" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Briefcase Base */}
          <rect
            x="13"
            y="18"
            width="22"
            height="17"
            rx="3"
            fill="url(#briefcaseGrad)"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          {/* Briefcase Handle */}
          <path
            d="M19 18V14C19 12.8954 19.8954 12 21 12H27C28.1046 12 29 12.8954 29 14V18"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Briefcase Center Lock */}
          <rect x="22.5" y="23" width="3" height="4" rx="1" fill="#fef08a" />
          <line x1="13" y1="25" x2="35" y2="25" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.6" />

          {/* Airplane Swooshing Across Globe */}
          <path
            d="M33 11L41 15L36 19L38 23L35 22L32 25L32 21L28 19L33 11Z"
            fill="#ffffff"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"
          />

          <defs>
            <linearGradient id="briefcaseGrad" x1="13" y1="18" x2="35" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e3a8a" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${titleSize} ${
              isDarkBg ? 'text-white' : 'text-slate-900'
            }`}
          >
            RIZOO <span className="text-amber-500 font-extrabold">JOB</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-1 py-0.2 bg-amber-400/20 text-amber-600 rounded border border-amber-400/30">
            PRO
          </span>
        </div>

        {showTagline && (
          <span
            className={`font-medium tracking-wide ${taglineSize} ${
              isDarkBg ? 'text-blue-200/80' : 'text-slate-500'
            }`}
          >
            Your Career, Your Future
          </span>
        )}
      </div>
    </div>
  );
};
