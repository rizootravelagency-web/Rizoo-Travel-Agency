import React, { useState } from 'react';
import { Job, Country, JobCategory, Banner, Announcement, User } from '../../types';
import { VacancyCard } from './VacancyCard';
import {
  Search,
  Flame,
  Star,
  Globe2,
  Layers,
  Utensils,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';

interface HomeScreenProps {
  jobs: Job[];
  countries: Country[];
  categories: JobCategory[];
  banners: Banner[];
  announcements: Announcement[];
  savedJobIds: string[];
  currentUser: User | null;
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onToggleSaveJob: (jobId: string) => void;
  onShareJob: (job: Job) => void;
  onNavigateSearch: (initialQuery?: string, filterCountry?: string, filterCategory?: string, specialFilter?: string) => void;
  onSelectCountry: (country: Country) => void;
  onSelectCategory: (category: JobCategory) => void;
  onOpenContactModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  jobs,
  countries,
  categories,
  banners,
  announcements,
  savedJobIds,
  currentUser,
  onSelectJob,
  onApplyJob,
  onToggleSaveJob,
  onShareJob,
  onNavigateSearch,
  onSelectCountry,
  onSelectCategory,
  onOpenContactModal,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Filter published vacancies only
  const publishedJobs = jobs.filter((j) => j.publicationStatus === 'Published');

  // Filter sections
  const urgentJobs = publishedJobs.filter((j) => j.urgent);
  const featuredJobs = publishedJobs.filter((j) => j.featured);
  const foodAccommJobs = publishedJobs.filter(
    (j) =>
      j.foodFacility.toLowerCase().includes('free') ||
      j.foodFacility.toLowerCase().includes('provided') ||
      j.accommodation.toLowerCase().includes('free')
  );
  const overtimeJobs = publishedJobs.filter(
    (j) => j.overtimeDetails && !j.overtimeDetails.toLowerCase().includes('no')
  );
  const activeBanners = banners.filter((b) => b.active);
  const activeAnnouncements = announcements.filter((a) => a.active);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      onNavigateSearch(searchKeyword.trim());
    } else {
      onNavigateSearch();
    }
  };

  return (
    <div className="space-y-6 pb-24 max-w-7xl mx-auto px-3 sm:px-4">
      {/* Search Bar & Hero Welcome */}
      <div className="pt-2">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-lg relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1 text-xs text-amber-300 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {currentUser
                  ? `Welcome, ${currentUser.fullName.split(' ')[0]}`
                  : 'Welcome to RIZOO JOB'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-3">
              Find Your Dream Job Worldwide
            </h1>

            {/* Main Interactive Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative mt-2">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search job title, company, country, skill..."
                className="w-full pl-11 pr-24 py-3 rounded-2xl bg-white text-slate-900 text-sm placeholder-slate-400 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Quick Destination Pill Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 text-[11px] font-semibold text-blue-100">
              <span className="shrink-0 text-slate-300">Quick:</span>
              <button
                type="button"
                onClick={() => onNavigateSearch('', 'sa')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-colors cursor-pointer"
              >
                🇸🇦 Saudi Arabia
              </button>
              <button
                type="button"
                onClick={() => onNavigateSearch('', 'ae')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-colors cursor-pointer"
              >
                🇦🇪 Dubai / UAE
              </button>
              <button
                type="button"
                onClick={() => onNavigateSearch('', 'ro')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-colors cursor-pointer"
              >
                🇷🇴 Europe (Romania)
              </button>
              <button
                type="button"
                onClick={() => onNavigateSearch('', 'qa')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-colors cursor-pointer"
              >
                🇶🇦 Qatar
              </button>
              <button
                type="button"
                onClick={() => onNavigateSearch('', 'kw')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs transition-colors cursor-pointer"
              >
                🇰🇼 Kuwait
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Marquee / Notice Banner */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-3 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed flex-1">
            <span className="font-extrabold uppercase tracking-wide text-amber-800">
              Notice:{' '}
            </span>
            <span className="font-semibold">{activeAnnouncements[0].title}</span> —{' '}
            <span className="text-amber-800 font-normal">
              {activeAnnouncements[0].description}
            </span>
          </div>
        </div>
      )}

      {/* Promotional Banners Carousel */}
      {activeBanners.length > 0 && (
        <div className="relative rounded-2xl overflow-hidden shadow-sm group">
          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full bg-slate-900">
            <img
              src={activeBanners[activeBannerIndex]?.imageUrl}
              alt={activeBanners[activeBannerIndex]?.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent flex flex-col justify-center p-4 sm:p-6 text-white">
              {activeBanners[activeBannerIndex]?.badgeText && (
                <span className="w-fit px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500 text-slate-950 mb-1.5">
                  {activeBanners[activeBannerIndex].badgeText}
                </span>
              )}
              <h2 className="text-base sm:text-xl font-black max-w-md line-clamp-1">
                {activeBanners[activeBannerIndex]?.title}
              </h2>
              <p className="text-xs text-blue-200 max-w-sm line-clamp-2 mt-0.5 font-medium">
                {activeBanners[activeBannerIndex]?.subtitle}
              </p>
              <button
                onClick={() => onNavigateSearch()}
                className="mt-3 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs w-fit shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Opportunities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Banner Dot pagination */}
          {activeBanners.length > 1 && (
            <div className="absolute bottom-2 right-4 flex items-center gap-1.5">
              {activeBanners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBannerIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeBannerIndex ? 'w-5 bg-amber-400' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Explore by Country (Cards Row) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-blue-700" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Jobs by Country
            </h2>
          </div>
          <button
            onClick={() => onNavigateSearch()}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {countries.slice(0, 6).map((c) => {
            const count = publishedJobs.filter((j) => j.countryId === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCountry(c)}
                className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="text-2xl mb-1.5">{c.flag}</div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {count} {count === 1 ? 'Job' : 'Jobs'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Urgent Requirements Section */}
      {urgentJobs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-rose-100 rounded-lg text-rose-600">
                <Flame className="w-4 h-4 fill-rose-600" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Urgent Requirements
                </h2>
                <p className="text-[11px] text-slate-500">Fast visa & immediate deployment</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateSearch('', '', '', 'urgent')}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
            >
              <span>See All ({urgentJobs.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urgentJobs.slice(0, 3).map((job) => (
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
        </div>
      )}

      {/* Explore by Job Category */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-700" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Popular Job Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigateSearch()}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
          >
            <span>All Categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.slice(0, 10).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="shrink-0 px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Jobs Section */}
      {featuredJobs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded-lg text-amber-700">
                <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Featured Opportunities
                </h2>
                <p className="text-[11px] text-slate-500">High salary packages & top employers</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateSearch()}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredJobs.slice(0, 3).map((job) => (
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
        </div>
      )}

      {/* High Benefit Filter Rows (Food & Accommodation & Overtime) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jobs with Food & Accommodation */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-blue-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Jobs with Free Food & Room
              </h3>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
              {foodAccommJobs.length} Available
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Save 100% of your earnings with company-provided meal and hostel accommodation.
          </p>
          <button
            onClick={() => onNavigateSearch('', '', '', 'food')}
            className="w-full py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Browse Free Food & Room Jobs
          </button>
        </div>

        {/* Jobs with High Overtime */}
        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border border-amber-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Jobs with Daily Overtime
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-200">
              {overtimeJobs.length} Available
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Earn 30% to 50% extra above base salary with daily regular overtime shifts.
          </p>
          <button
            onClick={() => onNavigateSearch('', '', '', 'overtime')}
            className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Browse Overtime Jobs
          </button>
        </div>
      </div>

      {/* Latest Vacancies (All published) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-blue-700" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Latest Vacancy Openings
              </h2>
              <p className="text-[11px] text-slate-500">Updated directly from overseas clients</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateSearch()}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All ({publishedJobs.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedJobs.map((job) => (
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
      </div>

      {/* Rizoo Travel Agency Official Contact Box */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-amber-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Official Recruitment Office
              </span>
            </div>
            <h3 className="text-lg font-black">Rizoo Travel Agency</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Dharampur Chauraha Se Pachrukhiya Bazar, Maharajganj, Uttar Pradesh, India</span>
            </p>
            <p className="text-xs text-amber-300 mt-1.5 font-bold">
              Helpdesk Contact: 7007303250
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href="tel:7007303250"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call 7007303250</span>
            </a>
            <a
              href="https://wa.me/917007303250?text=Hello%20Rizoo%20Travel%20Agency,%20I%20am%20interested%20in%20overseas%20job%20vacancies."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Application Advice / Tips */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/90 text-xs text-slate-600 space-y-1.5">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <span>💡 Job Seeker Application Advice</span>
        </h4>
        <p>• Keep your original passport with at least 18 months validity before applying for Gulf/Europe jobs.</p>
        <p>• Ensure white background passport-size photographs are ready for embassy medical clearance.</p>
        <p>• Avoid paying unauthorized middlemen. Rizoo Travel Agency conducts official interviews.</p>
      </div>
    </div>
  );
};
