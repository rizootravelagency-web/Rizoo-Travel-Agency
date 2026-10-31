import React, { useEffect, useState } from 'react';
import { Logo } from '../common/Logo';
import { Plane, Globe2, Briefcase, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 12;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6 select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top spacing */}
      <div className="pt-8 flex items-center gap-2 text-xs font-semibold text-blue-300 tracking-wider uppercase opacity-80">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        <span>Rizoo Travel Agency</span>
      </div>

      {/* Center Animated Logo & Branding */}
      <div className="flex flex-col items-center text-center max-w-sm px-4">
        {/* Big stylized glowing logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-800 to-slate-900 p-1 shadow-[0_10px_35px_rgba(29,78,216,0.4)] border-2 border-amber-400/40 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
            >
              <circle cx="24" cy="24" r="18" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.4" />
              <ellipse cx="24" cy="24" rx="9" ry="18" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.4" />
              <rect x="13" y="18" width="22" height="17" rx="3" fill="#1e3a8a" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M19 18V14C19 12.8954 19.8954 12 21 12H27C28.1046 12 29 12.8954 29 14V18" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="22.5" y="23" width="3" height="4" rx="1" fill="#fef08a" />
              <path d="M33 11L41 15L36 19L38 23L35 22L32 25L32 21L28 19L33 11Z" fill="#ffffff" />
            </svg>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute -inset-2 rounded-3xl border border-blue-400/30 animate-ping pointer-events-none" />
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white mb-1.5">
          RIZOO <span className="text-amber-400">JOB</span>
        </h1>

        <p className="text-sm font-semibold text-blue-200 tracking-wide uppercase mb-1">
          Your Career, Your Future
        </p>
        <p className="text-xs text-slate-300 font-normal">
          Find Your Dream Job Worldwide
        </p>

        {/* Feature Icons Mini Row */}
        <div className="flex items-center justify-center gap-6 mt-8 text-blue-300 text-xs">
          <div className="flex flex-col items-center gap-1">
            <Globe2 className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] text-slate-300">Gulf & Europe</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Briefcase className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] text-slate-300">Verified Jobs</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Plane className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] text-slate-300">Direct Visa</span>
          </div>
        </div>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xs pb-6 flex flex-col items-center">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-amber-500 transition-all duration-200 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[11px] text-slate-400 mt-2 font-medium">
          <span>Connecting to overseas vacancies...</span>
          <span className="text-amber-400 font-bold">{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};
