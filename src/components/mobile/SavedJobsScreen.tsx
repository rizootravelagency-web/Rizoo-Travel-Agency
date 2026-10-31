import React from 'react';
import { Job } from '../../types';
import { VacancyCard } from './VacancyCard';
import { Bookmark, Sparkles } from 'lucide-react';

interface SavedJobsScreenProps {
  savedJobs: Job[];
  savedJobIds: string[];
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onToggleSaveJob: (jobId: string) => void;
  onShareJob: (job: Job) => void;
  onBrowseJobs: () => void;
}

export const SavedJobsScreen: React.FC<SavedJobsScreenProps> = ({
  savedJobs,
  savedJobIds,
  onSelectJob,
  onApplyJob,
  onToggleSaveJob,
  onShareJob,
  onBrowseJobs,
}) => {
  return (
    <div className="pb-24 max-w-7xl mx-auto px-3 sm:px-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>Saved Vacancies</span>
          </h1>
          <p className="text-xs text-slate-500">
            Bookmarked overseas opportunities saved for later review
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-full border border-amber-200">
          {savedJobs.length} Saved
        </span>
      </div>

      {/* Empty State */}
      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/90 shadow-xs space-y-4 max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              No Saved Vacancies Yet
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Tap the bookmark icon on any job card to save it here for fast access and future reference.
            </p>
          </div>
          <button
            onClick={onBrowseJobs}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Explore Vacancies
          </button>
        </div>
      ) : (
        /* Saved Jobs Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs.map((job) => (
            <VacancyCard
              key={job.id}
              job={job}
              isSaved={true}
              onSelect={onSelectJob}
              onApply={onApplyJob}
              onToggleSave={onToggleSaveJob}
              onShare={onShareJob}
            />
          ))}
        </div>
      )}
    </div>
  );
};
