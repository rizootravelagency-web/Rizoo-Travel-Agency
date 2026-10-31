import React from 'react';
import { JobCategory, Job } from '../../types';
import { VacancyCard } from './VacancyCard';
import { ArrowLeft, Layers } from 'lucide-react';

interface CategoryJobsScreenProps {
  category: JobCategory;
  jobs: Job[];
  savedJobIds: string[];
  onBack: () => void;
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onToggleSaveJob: (jobId: string) => void;
  onShareJob: (job: Job) => void;
}

export const CategoryJobsScreen: React.FC<CategoryJobsScreenProps> = ({
  category,
  jobs,
  savedJobIds,
  onBack,
  onSelectJob,
  onApplyJob,
  onToggleSaveJob,
  onShareJob,
}) => {
  const categoryJobs = jobs.filter(
    (j) => j.categoryId === category.id && j.publicationStatus === 'Published'
  );

  return (
    <div className="pb-24 max-w-7xl mx-auto px-3 sm:px-4 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>{category.name} Vacancies</span>
          </h1>
          <p className="text-xs text-slate-500">
            {categoryJobs.length} active international positions available
          </p>
        </div>
      </div>

      {categoryJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-xs space-y-3 max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Active Vacancies for {category.name}
          </h3>
          <p className="text-xs text-slate-500">
            New recruitment demands are updated regularly. Contact Rizoo Travel Agency at 7007303250 to check for upcoming interviews.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Explore Other Categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryJobs.map((job) => (
            <VacancyCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
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
