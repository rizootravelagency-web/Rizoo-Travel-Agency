import React from 'react';
import { Job, Application, User } from '../../types';
import {
  Briefcase,
  Users,
  FileSpreadsheet,
  Clock,
  Video,
  CheckCircle,
  XCircle,
  TrendingUp,
  Globe,
  Flame,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

interface AdminDashboardProps {
  jobs: Job[];
  applications: Application[];
  users: User[];
  onNavigateTab: (tab: any) => void;
  onSelectApplication: (app: Application) => void;
  onSelectJob: (job: Job) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  jobs,
  applications,
  users,
  onNavigateTab,
  onSelectApplication,
  onSelectJob,
}) => {
  // Real calculations
  const totalVacancies = jobs.length;
  const publishedVacancies = jobs.filter((j) => j.publicationStatus === 'Published').length;
  const draftVacancies = jobs.filter((j) => j.publicationStatus === 'Draft').length;
  const urgentVacancies = jobs.filter((j) => j.urgent).length;

  const totalApplications = applications.length;
  const pendingApplications = applications.filter(
    (a) => a.applicationStatus === 'Submitted' || a.applicationStatus === 'Under Review'
  ).length;
  const shortlistedApplications = applications.filter((a) => a.applicationStatus === 'Shortlisted').length;
  const interviewsScheduled = applications.filter((a) => a.applicationStatus === 'Interview Scheduled').length;
  const selectedCandidates = applications.filter((a) => a.applicationStatus === 'Selected').length;
  const rejectedApplications = applications.filter((a) => a.applicationStatus === 'Rejected').length;

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'Active').length;

  // Country breakdown
  const countryCounts = jobs.reduce((acc, job) => {
    acc[job.countryName] = (acc[job.countryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-900 to-slate-950 p-5 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            RIZOO JOB Recruitment Administration
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Operations & Live Analytics Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time overseas recruitment tracking, applicant verification, and interview pipeline.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigateTab('vacancies')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Briefcase className="w-4 h-4" />
            <span>Post New Vacancy</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Vacancies */}
        <div
          onClick={() => onNavigateTab('vacancies')}
          className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl cursor-pointer hover:border-blue-500 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Total Vacancies</span>
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{totalVacancies}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{publishedVacancies} Active</span>
            <span>•</span>
            <span className="text-rose-400 font-bold">{urgentVacancies} Urgent</span>
          </div>
        </div>

        {/* Total Applications */}
        <div
          onClick={() => onNavigateTab('applications')}
          className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl cursor-pointer hover:border-amber-500 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Total Applications</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{totalApplications}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
            <span className="text-amber-400 font-bold">{pendingApplications} In Review</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">{selectedCandidates} Selected</span>
          </div>
        </div>

        {/* Scheduled Interviews */}
        <div
          onClick={() => onNavigateTab('applications')}
          className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl cursor-pointer hover:border-purple-500 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Interviews Scheduled</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{interviewsScheduled}</div>
          <div className="text-[11px] text-purple-300 font-medium mt-1">
            Zoom & Direct Client camps active
          </div>
        </div>

        {/* Registered Users */}
        <div
          onClick={() => onNavigateTab('users')}
          className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl cursor-pointer hover:border-emerald-500 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Registered Job Seekers</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">{totalUsers}</div>
          <div className="text-[11px] text-emerald-300 font-medium mt-1">
            {activeUsers} Active candidate profiles
          </div>
        </div>
      </div>

      {/* Two Column Layout: Application Status Breakdown & Country Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Status Breakdown */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-black text-white">Application Pipeline Status</h3>
            <span className="text-xs text-slate-400 font-semibold">{totalApplications} Total</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Submitted / Under Review</span>
              </span>
              <span className="font-bold text-white">{pendingApplications}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>Shortlisted by Recruiter</span>
              </span>
              <span className="font-bold text-white">{shortlistedApplications}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Interview Scheduled (Zoom / Client)</span>
              </span>
              <span className="font-bold text-white">{interviewsScheduled}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Selected Candidates (Visa Process)</span>
              </span>
              <span className="font-bold text-white">{selectedCandidates}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Rejected / On Hold</span>
              </span>
              <span className="font-bold text-white">{rejectedApplications}</span>
            </div>
          </div>
        </div>

        {/* Vacancies by Country Distribution */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-black text-white">Vacancies by Destination Country</h3>
            <span className="text-xs text-slate-400 font-semibold">{totalVacancies} Listings</span>
          </div>

          <div className="space-y-2 text-xs">
            {Object.entries(countryCounts).map(([country, count]) => {
              const pct = Math.round((count / (totalVacancies || 1)) * 100);
              return (
                <div key={country} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">{country}</span>
                    <span className="font-bold text-amber-400">{count} jobs ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-amber-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Applications Activity Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div>
            <h3 className="text-sm font-black text-white">Latest Candidate Submissions</h3>
            <p className="text-xs text-slate-400">Incoming applications awaiting review</p>
          </div>
          <button
            onClick={() => onNavigateTab('applications')}
            className="text-xs font-bold text-blue-400 hover:underline cursor-pointer"
          >
            View All Applications →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 bg-slate-900 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Reference ID</th>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Job Title & Country</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Submitted</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                    {app.id}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-white">{app.applicantName}</div>
                    <div className="text-[11px] text-slate-400">{app.mobileNumber}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-slate-200">{app.jobTitle}</div>
                    <div className="text-[11px] text-slate-400">{app.countryName}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        app.applicationStatus === 'Selected'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : app.applicationStatus === 'Interview Scheduled'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {new Date(app.submittedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onSelectApplication(app)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
