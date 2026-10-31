import React from 'react';
import { CheckCircle2, Copy, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Application } from '../../types';

interface ApplicationSuccessModalProps {
  application: Application;
  onViewMyApplications: () => void;
  onClose: () => void;
}

export const ApplicationSuccessModal: React.FC<ApplicationSuccessModalProps> = ({
  application,
  onViewMyApplications,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(application.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md my-auto shadow-2xl border border-slate-200 overflow-hidden text-center p-6 space-y-4 animate-scale-up">
        {/* Animated Success Checkmark */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Application Submitted Successfully
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-2">
            Best of Luck, {application.applicantName.split(' ')[0]}!
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Your application for <span className="font-bold text-slate-800">{application.jobTitle}</span> has been securely registered with Rizoo Travel Agency.
          </p>
        </div>

        {/* Reference Code Box */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
            Application Reference Number
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-black tracking-wider text-blue-700 font-mono">
              {application.id}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Copy Reference ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && (
            <span className="text-[10px] text-emerald-600 font-bold block">
              Copied to clipboard!
            </span>
          )}
        </div>

        {/* Next Steps Card */}
        <div className="bg-blue-50/80 rounded-2xl p-3 text-left border border-blue-100 text-xs text-blue-950 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Next Steps in Selection:</span>
          </div>
          <p className="text-[11px] text-blue-800">
            1. Agency recruiters review your documents within 24-48 hours.
          </p>
          <p className="text-[11px] text-blue-800">
            2. You will receive an in-app alert when your Zoom or Client Interview is scheduled.
          </p>
          <p className="text-[11px] text-blue-800">
            3. Track live status anytime in <span className="font-bold">My Applications</span>.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onViewMyApplications}
            className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Track in My Applications</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
