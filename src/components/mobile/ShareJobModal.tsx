import React, { useState } from 'react';
import { Job } from '../../types';
import { X, Copy, Share2, Check, MessageCircle, Phone, Download } from 'lucide-react';
import { Logo } from '../common/Logo';
import { CountryFlag } from '../common/CountryFlag';

interface ShareJobModalProps {
  job: Job;
  onClose: () => void;
}

export const ShareJobModal: React.FC<ShareJobModalProps> = ({ job, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.origin + '?job=' + job.id;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `RIZOO JOB: ${job.title} in ${job.countryName}`,
        text: `Urgent Job Opening: ${job.title} in ${job.countryName}. Salary: ${job.salaryAmount} ${job.salaryCurrency}. Contact Rizoo Travel Agency: 7007303250`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black uppercase text-white">Share Vacancy Poster</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Flyer Preview Card */}
        <div className="p-5 space-y-4 text-xs">
          <div className="bg-gradient-to-br from-blue-900 to-slate-950 rounded-2xl p-4 text-white shadow-md border border-amber-400/30 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <Logo size="sm" variant="dark" showTagline={false} />
              <div className="text-[10px] text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                OFFICIAL VACANCY
              </div>
            </div>

            {/* Poster Thumbnail */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-800">
              <img
                src={job.posterImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'}
                alt={job.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-blue-200 font-bold text-[11px]">
                <CountryFlag countryName={job.countryName} flagEmoji={job.countryFlag} showName={true} />
                <span>• {job.city}</span>
              </div>
              <h4 className="text-base font-black text-white mt-0.5">{job.title}</h4>
              <p className="text-xs text-amber-400 font-black mt-1">
                Salary: {job.salaryAmount} {job.salaryCurrency} / {job.salaryPeriod} + Overtime
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <span>Recruiter: Rizoo Travel Agency</span>
              <span className="font-bold text-amber-300">Call: 7007303250</span>
            </div>
          </div>

          {/* Share Actions */}
          <div className="space-y-2">
            <button
              onClick={handleNativeShare}
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Vacancy Link & Poster</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Direct Link'}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out this overseas job vacancy on RIZOO JOB: ${job.title} in ${job.countryName}. Salary: ${job.salaryAmount} ${job.salaryCurrency}. Contact Rizoo Travel Agency: 7007303250`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
