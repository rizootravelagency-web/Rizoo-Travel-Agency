import React, { useState, useMemo } from 'react';
import { Job, Country, JobCategory } from '../../types';
import { VacancyCard } from './VacancyCard';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  TrendingUp,
  MapPin,
  Check,
} from 'lucide-react';

interface SearchScreenProps {
  jobs: Job[];
  countries: Country[];
  categories: JobCategory[];
  savedJobIds: string[];
  initialKeyword?: string;
  initialCountry?: string;
  initialCategory?: string;
  initialSpecialFilter?: string; // 'urgent' | 'featured' | 'food' | 'overtime'
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onToggleSaveJob: (jobId: string) => void;
  onShareJob: (job: Job) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  jobs,
  countries,
  categories,
  savedJobIds,
  initialKeyword = '',
  initialCountry = '',
  initialCategory = '',
  initialSpecialFilter = '',
  onSelectJob,
  onApplyJob,
  onToggleSaveJob,
  onShareJob,
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minSalary, setMinSalary] = useState<number>(0);
  const [dutyFilter, setDutyFilter] = useState('');
  const [selectionMethod, setSelectionMethod] = useState('');
  const [foodOnly, setFoodOnly] = useState(initialSpecialFilter === 'food');
  const [overtimeOnly, setOvertimeOnly] = useState(initialSpecialFilter === 'overtime');
  const [urgentOnly, setUrgentOnly] = useState(initialSpecialFilter === 'urgent');
  const [featuredOnly, setFeaturedOnly] = useState(initialSpecialFilter === 'featured');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'salaryHigh' | 'salaryLow' | 'deadline'>('latest');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Recent search tags
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Saudi Warehouse',
    'Dubai Driver',
    'Europe Factory',
    'Qatar Electrician',
    'Hotel Waiter',
  ]);

  const handleApplyRecentSearch = (tag: string) => {
    setKeyword(tag);
  };

  const clearAllFilters = () => {
    setKeyword('');
    setSelectedCountry('');
    setSelectedCategory('');
    setMinSalary(0);
    setDutyFilter('');
    setSelectionMethod('');
    setFoodOnly(false);
    setOvertimeOnly(false);
    setUrgentOnly(false);
    setFeaturedOnly(false);
    setVerifiedOnly(false);
    setSortBy('latest');
  };

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Must be published
      if (job.publicationStatus !== 'Published') return false;

      // Keyword match
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matches =
          job.title.toLowerCase().includes(q) ||
          job.employerName.toLowerCase().includes(q) ||
          job.countryName.toLowerCase().includes(q) ||
          job.city.toLowerCase().includes(q) ||
          job.categoryName.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.selectionMethod.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Country match
      if (selectedCountry && job.countryId !== selectedCountry) {
        return false;
      }

      // Category match
      if (selectedCategory && job.categoryId !== selectedCategory) {
        return false;
      }

      // Salary minimum
      if (minSalary > 0 && job.salaryAmount < minSalary) {
        return false;
      }

      // Duty Hours
      if (dutyFilter && !job.dutyHours.toLowerCase().includes(dutyFilter.toLowerCase())) {
        return false;
      }

      // Selection Method
      if (selectionMethod && job.selectionMethod !== selectionMethod) {
        return false;
      }

      // Food Provided
      if (foodOnly && !job.foodFacility.toLowerCase().includes('provided') && !job.foodFacility.toLowerCase().includes('free') && !job.foodFacility.toLowerCase().includes('allowance')) {
        return false;
      }

      // Overtime
      if (overtimeOnly && (!job.overtimeDetails || job.overtimeDetails.toLowerCase().includes('no overtime'))) {
        return false;
      }

      // Urgent
      if (urgentOnly && !job.urgent) {
        return false;
      }

      // Featured
      if (featuredOnly && !job.featured) {
        return false;
      }

      // Verified
      if (verifiedOnly && job.verificationStatus !== 'Verified') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salaryHigh') return b.salaryAmount - a.salaryAmount;
      if (sortBy === 'salaryLow') return a.salaryAmount - b.salaryAmount;
      if (sortBy === 'deadline') {
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
      }
      // default 'latest'
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    jobs,
    keyword,
    selectedCountry,
    selectedCategory,
    minSalary,
    dutyFilter,
    selectionMethod,
    foodOnly,
    overtimeOnly,
    urgentOnly,
    featuredOnly,
    verifiedOnly,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedCountry ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (minSalary > 0 ? 1 : 0) +
    (dutyFilter ? 1 : 0) +
    (selectionMethod ? 1 : 0) +
    (foodOnly ? 1 : 0) +
    (overtimeOnly ? 1 : 0) +
    (urgentOnly ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  return (
    <div className="pb-24 max-w-7xl mx-auto px-3 sm:px-4 space-y-4">
      {/* Search Header Bar */}
      <div className="pt-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by job title, company, trade, country..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFiltersModal(true)}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-center shrink-0 cursor-pointer relative ${
              activeFilterCount > 0
                ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Filter Vacancies"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Recent Searches Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 text-xs text-slate-600">
          <span className="shrink-0 text-slate-400 text-[11px] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Popular:
          </span>
          {recentSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => handleApplyRecentSearch(tag)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors text-[11px] cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting & Filter Summary Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span className="font-bold text-slate-900">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'Vacancy Found' : 'Vacancies Found'}
        </span>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-blue-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold outline-none cursor-pointer"
          >
            <option value="latest">Latest First</option>
            <option value="salaryHigh">Salary: High to Low</option>
            <option value="salaryLow">Salary: Low to High</option>
            <option value="deadline">Expiring Soon</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/90 shadow-xs space-y-4 max-w-md mx-auto my-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              No Matching Vacancies Found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              We couldn't find any job matching your current search criteria. Try removing filters or searching for related keywords.
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
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

      {/* Advanced Filters Modal / Drawer */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Advanced Job Filters</h3>
                <span className="text-xs text-slate-500">Refine international vacancy requirements</span>
              </div>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Country Filter */}
              <div>
                <label className="block text-slate-800 font-bold mb-1.5">Destination Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none bg-white"
                >
                  <option value="">All Countries (Worldwide)</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name} ({c.region})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-slate-800 font-bold mb-1.5">Job Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none bg-white"
                >
                  <option value="">All Job Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selection Method */}
              <div>
                <label className="block text-slate-800 font-bold mb-1.5">Selection Method</label>
                <select
                  value={selectionMethod}
                  onChange={(e) => setSelectionMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none bg-white"
                >
                  <option value="">Any Selection Method</option>
                  <option value="Zoom Interview">Zoom Interview</option>
                  <option value="Direct Client Interview">Direct Client Interview</option>
                  <option value="CV Selection">CV Selection</option>
                  <option value="Trade Test">Trade Test</option>
                </select>
              </div>

              {/* Duty Hours Filter */}
              <div>
                <label className="block text-slate-800 font-bold mb-1.5">Duty Hours</label>
                <select
                  value={dutyFilter}
                  onChange={(e) => setDutyFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none bg-white"
                >
                  <option value="">Any Shift</option>
                  <option value="8 Hours">8 Hours Daily</option>
                  <option value="9 Hours">9 Hours Daily</option>
                  <option value="10 Hours">10 Hours Daily</option>
                </select>
              </div>

              {/* Toggle Switches */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <span className="font-bold text-slate-800">Urgent Requirements Only</span>
                  <input
                    type="checkbox"
                    checked={urgentOnly}
                    onChange={(e) => setUrgentOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <span className="font-bold text-slate-800">Featured Opportunities</span>
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <span className="font-bold text-slate-800">Free Food & Room Provided</span>
                  <input
                    type="checkbox"
                    checked={foodOnly}
                    onChange={(e) => setFoodOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <span className="font-bold text-slate-800">Overtime Available</span>
                  <input
                    type="checkbox"
                    checked={overtimeOnly}
                    onChange={(e) => setOvertimeOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <span className="font-bold text-slate-800">Verified Offers Only</span>
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setShowFiltersModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs hover:bg-blue-800 shadow-md cursor-pointer"
              >
                Show {filteredJobs.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
