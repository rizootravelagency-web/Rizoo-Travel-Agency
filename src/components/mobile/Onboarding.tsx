import React, { useState } from 'react';
import { Globe, ShieldCheck, Send, ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Explore Jobs Worldwide',
      subtitle: 'Overseas Employment with Top Employers',
      description:
        'Discover authentic vacancies across Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, and European destinations like Romania, Croatia, and Poland.',
      icon: Globe,
      color: 'from-blue-600 to-indigo-700',
      tag: 'INTERNATIONAL OPPORTUNITIES',
      extra: (
        <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xs">
          {['🇸🇦 Saudi Arabia', '🇦🇪 Dubai / UAE', '🇶🇦 Qatar', '🇰🇼 Kuwait', '🇷🇴 Romania', '🇭🇷 Croatia'].map((c) => (
            <span
              key={c}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-xs"
            >
              {c}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Find Verified Opportunities',
      subtitle: 'Complete Transparency & Real Details',
      description:
        'View authentic recruitment posters, detailed salary packages in local currency, overtime rules, duty hours, free food, and company-provided accommodation info.',
      icon: ShieldCheck,
      color: 'from-amber-600 to-amber-700',
      tag: 'RIZOO TRAVEL AGENCY CERTIFIED',
      extra: (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-left text-xs space-y-1.5 mt-3 max-w-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <Check className="w-4 h-4 text-emerald-400" /> Genuine Job Posters & Photos
          </div>
          <div className="flex items-center gap-2 text-white">
            <Check className="w-4 h-4 text-emerald-400" /> Transparent Overtime & Food Info
          </div>
          <div className="flex items-center gap-2 text-white">
            <Check className="w-4 h-4 text-emerald-400" /> Client & Zoom Interview Camp Updates
          </div>
        </div>
      ),
    },
    {
      title: 'Apply for Your Dream Job',
      subtitle: 'Fast, Paperless Application Tracking',
      description:
        'Submit your application with your resume and experience details in seconds. Get an instant reference tracking number and receive real-time interview updates.',
      icon: Send,
      color: 'from-emerald-600 to-teal-700',
      tag: 'FAST APPLICATION PROCESS',
      extra: (
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 mt-3 text-xs">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div className="text-left">
            <p className="font-bold text-white">Instant Reference Code</p>
            <p className="text-slate-300 text-[11px]">Track Interview Status & Visa Updates</p>
          </div>
        </div>
      ),
    },
  ];

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950 text-white p-6 overflow-hidden">
      {/* Top Header with Skip Button */}
      <div className="flex items-center justify-between pt-4">
        <span className="text-xs font-bold tracking-widest uppercase text-amber-400">
          RIZOO JOB
        </span>
        {!isLast && (
          <button
            onClick={onComplete}
            className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            Skip
          </button>
        )}
      </div>

      {/* Main Slide Content */}
      <div className="flex flex-col items-center text-center my-auto px-2 max-w-sm mx-auto">
        {/* Animated Badge Icon Container */}
        <div
          className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} p-5 flex items-center justify-center shadow-xl shadow-blue-900/30 border border-white/20 mb-6 transform transition-all duration-300`}
        >
          <Icon className="w-12 h-12 text-white" />
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
          {step.tag}
        </span>

        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          {step.title}
        </h2>
        <h3 className="text-sm font-semibold text-blue-200 mb-3">
          {step.subtitle}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          {step.description}
        </p>

        {step.extra}
      </div>

      {/* Bottom Step Indicator & Buttons */}
      <div className="pb-4 flex flex-col gap-5 max-w-sm mx-auto w-full">
        {/* Dots indicator */}
        <div className="flex justify-center items-center gap-2">
          {steps.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-amber-400'
                  : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer border border-blue-400/30"
        >
          <span>{isLast ? 'Get Started Now' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
