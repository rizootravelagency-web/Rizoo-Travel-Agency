import React, { useState } from 'react';
import { Job, Country, JobCategory } from '../../types';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  Eye,
  CheckCircle2,
  Flame,
  Star,
  Users,
  Calendar,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';
import { AdminVacancyModal } from './AdminVacancyModal';
import { CountryFlag } from '../common/CountryFlag';

interface AdminVacanciesProps {
  jobs: Job[];
  countries: Country[];
  categories: JobCategory[];
  onSaveJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onPreviewJobInApp: (job: Job) => void;
}

export const AdminVacancies: React.FC<AdminVacanciesProps> = ({
  jobs,
  countries,
  categories,
  onSaveJob,
  onDeleteJob,
  onPreviewJobInApp,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedJobForEdit, setSelectedJobForEdit] = useState<Job | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        job.title.toLowerCase().includes(q) ||
        job.employerName.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        job.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterCountry && job.countryId !== filterCountry) return false;
    if (filterStatus && job.publicationStatus !== filterStatus) return false;
    return true;
  });

  const handleDuplicate = (job: Job) => {
    const duplicated: Job = {
      ...job,
      id: 'RJ-JOB-' + Math.floor(100 + Math.random() * 900),
      title: `${job.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicationsCount: 0,
    };
    onSaveJob(duplicated);
  };

  const handleToggleUrgent = (job: Job) => {
    onSaveJob({ ...job, urgent: !job.urgent });
  };

  const handleToggleFeatured = (job: Job) => {
    onSaveJob({ ...job, featured: !job.featured });
  };

  const handleChangeStatus = (job: Job, newStatus: any) => {
    onSaveJob({ ...job, publicationStatus: newStatus });
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Top Header with Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Vacancy Postings & Recruitment Management
          </h1>
          <p className="text-xs text-slate-400">
            Create, edit, verify, and publish international job offers for Gulf & Europe
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedJobForEdit(null);
            setShowCreateModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search job title, employer, ID..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-400 font-medium"
        >
          <option value="">All Destination Countries</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-400 font-medium"
        >
          <option value="">All Publication Statuses</option>
          <option value="Published">Published (Active)</option>
          <option value="Draft">Draft</option>
          <option value="Expired">Expired</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Vacancy Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 bg-slate-900/90 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Job ID & Title</th>
                <th className="py-3 px-3">Country & Employer</th>
                <th className="py-3 px-3">Seats</th>
                <th className="py-3 px-3">Salary Package</th>
                <th className="py-3 px-3">Badges</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No vacancies found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-900/60 transition-colors">
                    {/* ID & Title */}
                    <td className="py-3 px-3">
                      <div className="font-mono text-[10px] text-amber-400 font-bold">{job.id}</div>
                      <div className="font-bold text-white max-w-xs truncate">{job.title}</div>
                      <div className="text-[11px] text-slate-500">{job.categoryName}</div>
                    </td>

                    {/* Country & Employer */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 font-semibold text-slate-200">
                        <span>{job.countryFlag}</span>
                        <span>{job.countryName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[160px]">{job.employerName}</div>
                    </td>

                    {/* Vacancy Seats */}
                    <td className="py-3 px-3">
                      <span className="font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {job.vacancyCount}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {job.applicationsCount || 0} applied
                      </div>
                    </td>

                    {/* Salary */}
                    <td className="py-3 px-3 font-semibold text-white">
                      <div>
                        {job.salaryAmount.toLocaleString()} {job.salaryCurrency}
                      </div>
                      <div className="text-[10px] text-slate-400">Duty: {job.dutyHours}</div>
                    </td>

                    {/* Badges Toggle */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleUrgent(job)}
                          className={`p-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                            job.urgent
                              ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                              : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                          title="Toggle Urgent"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleFeatured(job)}
                          className={`p-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                            job.featured
                              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Publication Status */}
                    <td className="py-3 px-3">
                      <select
                        value={job.publicationStatus}
                        onChange={(e) => handleChangeStatus(job, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold border outline-none bg-slate-900 cursor-pointer ${
                          job.publicationStatus === 'Published'
                            ? 'text-emerald-400 border-emerald-500/40'
                            : job.publicationStatus === 'Draft'
                            ? 'text-amber-400 border-amber-500/40'
                            : 'text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Expired">Expired</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onPreviewJobInApp(job)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                          title="Preview in Mobile View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedJobForEdit(job);
                            setShowCreateModal(true);
                          }}
                          className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-slate-800 cursor-pointer"
                          title="Edit Vacancy"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDuplicate(job)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 cursor-pointer"
                          title="Duplicate Vacancy"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete vacancy ${job.title} (${job.id})?`)) {
                              onDeleteJob(job.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                          title="Delete Vacancy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {showCreateModal && (
        <AdminVacancyModal
          initialJob={selectedJobForEdit}
          countries={countries}
          categories={categories}
          onClose={() => setShowCreateModal(false)}
          onSave={(savedJob) => {
            onSaveJob(savedJob);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};
