import React from 'react';
import { Job } from '../../types';
import { CountryFlag } from '../common/CountryFlag';
import { Badge } from '../common/Badge';
import {
  Bookmark,
  Share2,
  Users,
  Clock,
  Utensils,
  Home,
  ChevronRight,
  Send,
  Video,
  FileCheck,
} from 'lucide-react';

interface VacancyCardProps {
  job: Job;
  isSaved: boolean;
  onSelect: (job: Job) => void;
  onApply: (job: Job) => void;
  onToggleSave: (jobId: string) => void;
  onShare: (job: Job) => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({
  job,
  isSaved,
  onSelect,
  onApply,
  onToggleSave,
  onShare,
}) => {
  const defaultPoster =
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';

  const posterSrc = job.posterImageUrl || defaultPoster;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
      {/* Top Poster Image with Overlays */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelect(job)}>
        <img
          src={posterSrc}
          alt={job.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultPoster;
          }}
        />

        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Top Badges (Urgent / Featured / Verified) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {job.urgent && <Badge type="urgent" text="URGENT" />}
            {job.featured && <Badge type="featured" text="FEATURED" />}
            {job.verificationStatus === 'Verified' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs">
                <FileCheck className="w-3 h-3" />
                <span>Verified Offer</span>
              </span>
            )}
          </div>

          {/* Save / Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-md ${
              isSaved
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900/60 text-white hover:bg-slate-900/90'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save vacancy'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Poster Info (Country & Employer Name) */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs border border-white/10 w-fit">
              <CountryFlag countryName={job.countryName} flagEmoji={job.countryFlag} showName={true} />
              <span className="text-slate-400">•</span>
              <span className="text-slate-300 text-[11px] font-medium">{job.city}</span>
            </div>
          </div>

          {/* Vacancy count badge */}
          <div className="flex items-center gap-1 bg-amber-400/90 text-slate-950 text-xs font-black px-2 py-0.5 rounded-md shadow-xs">
            <Users className="w-3 h-3" />
            <span>{job.vacancyCount} Seats</span>
          </div>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Employer & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
            <span className="truncate max-w-[65%] text-slate-600 font-semibold">{job.employerName}</span>
            <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
              {job.categoryName}
            </span>
          </div>

          {/* Job Title */}
          <h3
            onClick={() => onSelect(job)}
            className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors cursor-pointer line-clamp-1"
          >
            {job.title}
          </h3>

          {/* Key Job Package Metrics (Salary, Duty, Selection) */}
          <div className="mt-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1.5">
            {/* Salary Row */}
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Salary Package
              </span>
              <span className="text-base font-extrabold text-blue-700">
                {job.salaryAmount.toLocaleString()} {job.salaryCurrency}{' '}
                <span className="text-xs font-medium text-slate-500">/ {job.salaryPeriod}</span>
              </span>
            </div>

            {/* Overtime & Duty Hours */}
            <div className="flex items-center justify-between text-xs text-slate-700 pt-1 border-t border-slate-200/60">
              <div className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold">Duty: {job.dutyHours}</span>
              </div>
              <div className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                + Overtime Available
              </div>
            </div>
          </div>

          {/* Job Facilities Mini Badges */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              <Utensils className="w-3 h-3 text-emerald-600" />
              <span>{job.foodFacility.includes('Provided') ? 'Free Food' : 'Food Facility'}</span>
            </span>

            <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              <Home className="w-3 h-3 text-indigo-600" />
              <span>{job.accommodation.includes('Free') ? 'Free Room' : 'Accommodation'}</span>
            </span>

            <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              <Video className="w-3 h-3 text-purple-600" />
              <span>{job.selectionMethod}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Share Button */}
          <button
            onClick={() => onShare(job)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Share Vacancy"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* View Details */}
          <button
            onClick={() => onSelect(job)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Apply Now Primary CTA */}
          <button
            onClick={() => onApply(job)}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all transform active:scale-98 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
