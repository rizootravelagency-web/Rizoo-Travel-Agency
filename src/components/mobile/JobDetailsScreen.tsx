import React from 'react';
import { Job } from '../../types';
import { CountryFlag } from '../common/CountryFlag';
import { Badge } from '../common/Badge';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Phone,
  MessageCircle,
  Building2,
  Users,
  Clock,
  Utensils,
  Home,
  Bus,
  Shield,
  Calendar,
  Award,
  BookOpen,
  Globe,
  FileCheck2,
  Send,
  AlertTriangle,
  MapPin,
  CheckCircle,
} from 'lucide-react';

interface JobDetailsScreenProps {
  job: Job;
  isSaved: boolean;
  hasApplied: boolean;
  onBack: () => void;
  onApply: (job: Job) => void;
  onToggleSave: (jobId: string) => void;
  onShare: (job: Job) => void;
  onOpenContact: () => void;
}

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({
  job,
  isSaved,
  hasApplied,
  onBack,
  onApply,
  onToggleSave,
  onShare,
  onOpenContact,
}) => {
  const isExpired =
    job.publicationStatus === 'Expired' ||
    (job.applicationDeadline && new Date(job.applicationDeadline) < new Date());

  return (
    <div className="pb-28 max-w-4xl mx-auto px-3 sm:px-4 space-y-5 animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Vacancies</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSave(job.id)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title={isSaved ? 'Saved' : 'Save Vacancy'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => onShare(job)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Share Vacancy"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Vacancy Poster / Image Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-md border border-slate-200/90 aspect-[16/10] sm:aspect-[21/9]">
        <img
          src={job.posterImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'}
          alt={job.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {job.urgent && <Badge type="urgent" text="URGENT RECRUITMENT" />}
            {job.featured && <Badge type="featured" text="FEATURED" />}
            {job.verificationStatus === 'Verified' && <Badge type="verified" text="Rizoo Verified" />}
          </div>
          <div className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10 flex items-center gap-1.5">
            <CountryFlag countryName={job.countryName} flagEmoji={job.countryFlag} showName={true} />
          </div>
        </div>

        {/* Bottom Hero Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
            {job.categoryName} • {job.city}
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight text-white">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{job.employerName}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>{job.vacancyCount} Open Vacancies</span>
            </span>
          </div>
        </div>
      </div>

      {/* Additional Photos Gallery if Available */}
      {job.additionalImageUrls && job.additionalImageUrls.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Job & Work Site Photos ({job.additionalImageUrls.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {job.additionalImageUrls.map((url, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={url} alt={`Site preview ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Salary & Benefits Highlight Box */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-5 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-blue-200 tracking-wider">
              Monthly Salary Package
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              {job.salaryAmount.toLocaleString()} {job.salaryCurrency}{' '}
              <span className="text-sm font-medium text-blue-200">/ {job.salaryPeriod}</span>
            </div>
            <p className="text-xs text-amber-300 font-semibold mt-1">
              {job.overtimeDetails}
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-xs uppercase font-bold text-blue-200">
              Selection Method
            </span>
            <div className="text-sm font-black text-white mt-0.5 flex items-center sm:justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{job.selectionMethod}</span>
            </div>
            {job.interviewDate && (
              <p className="text-xs text-amber-300 font-medium mt-1">
                Interview: {new Date(job.interviewDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>
        </div>

        {/* 4 Essential Perks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 font-semibold mb-1">
              <Utensils className="w-4 h-4 text-emerald-300" />
              <span>Food</span>
            </div>
            <p className="text-white font-bold leading-tight">{job.foodFacility}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 font-semibold mb-1">
              <Home className="w-4 h-4 text-indigo-300" />
              <span>Room / Stay</span>
            </div>
            <p className="text-white font-bold leading-tight">{job.accommodation}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 font-semibold mb-1">
              <Bus className="w-4 h-4 text-amber-300" />
              <span>Transport</span>
            </div>
            <p className="text-white font-bold leading-tight">{job.transportation}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="flex items-center gap-1.5 text-blue-200 font-semibold mb-1">
              <Shield className="w-4 h-4 text-rose-300" />
              <span>Medical</span>
            </div>
            <p className="text-white font-bold leading-tight">{job.medicalInsurance}</p>
          </div>
        </div>
      </div>

      {/* Complete Terms & Conditions / Employment Contract Grid */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
          Employment Terms & Working Conditions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50">
            <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-semibold">Duty Hours & Shifts:</span>
              <p className="text-slate-900 font-bold">{job.dutyHours}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-semibold">Weekly Off / Holiday:</span>
              <p className="text-slate-900 font-bold">{job.weeklyHoliday}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50">
            <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-semibold">Contract Duration:</span>
              <p className="text-slate-900 font-bold">{job.contractDuration}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50">
            <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-semibold">Passport Category:</span>
              <p className="text-slate-900 font-bold">{job.passportRequirements}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-semibold">Educational Criteria:</span>
              <p className="text-slate-900 font-bold">{job.educationRequirements}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50">
            <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-semibold">Experience & Age:</span>
              <p className="text-slate-900 font-bold">
                {job.experienceRequirements} {job.ageRequirements ? `(Age: ${job.ageRequirements})` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Required Documents List */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
            Mandatory Documents for Application
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {job.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-900">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-2.5">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
          Role Description & Duties
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {job.description}
        </p>
      </div>

      {/* Recruitment Agency Credential & Verification Disclaimer */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-4 text-white space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-400" />
            <div>
              <h4 className="text-xs font-black uppercase text-amber-400">
                Recruitment Agency Credential
              </h4>
              <p className="text-xs text-white font-bold">Rizoo Travel Agency</p>
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Office Info
          </button>
        </div>

        <div className="text-[11px] text-slate-300 space-y-1 border-t border-white/10 pt-2">
          <p className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Dharampur Chauraha Se Pachrukhiya Bazar, Maharajganj, UP, India</span>
          </p>
          <p className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>Official Helpline: 7007303250</span>
          </p>
          <p className="text-[10px] text-slate-400 italic pt-1">
            Disclaimer: Vacancy contracts and visa requirements are validated directly with overseas clients. Never pay cash to unverified agents.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <a
            href="tel:7007303250"
            className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            title="Call Rizoo Agency"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href={`https://wa.me/917007303250?text=Hello%20Rizoo%20Travel%20Agency,%20I%20am%20interested%20in%20applying%20for%20${encodeURIComponent(job.title)}%20(${job.id})`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
            title="WhatsApp Agency"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        {/* Primary CTA Apply */}
        {isExpired ? (
          <div className="flex-1 py-3 px-4 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold text-center flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-500" />
            <span>Applications Closed for this Vacancy</span>
          </div>
        ) : hasApplied ? (
          <div className="flex-1 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Application Already Submitted</span>
          </div>
        ) : (
          <button
            onClick={() => onApply(job)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Apply for this Vacancy</span>
          </button>
        )}
      </div>
    </div>
  );
};
