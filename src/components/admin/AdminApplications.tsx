import React, { useState } from 'react';
import { Application, ApplicationStatus, Job } from '../../types';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  Video,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Eye,
  Lock,
} from 'lucide-react';
import { CountryFlag } from '../common/CountryFlag';

interface AdminApplicationsProps {
  applications: Application[];
  jobs: Job[];
  onUpdateApplication: (updated: Application) => void;
  onSendCandidateNotification: (userId: string, title: string, message: string) => void;
}

export const AdminApplications: React.FC<AdminApplicationsProps> = ({
  applications,
  jobs,
  onUpdateApplication,
  onSendCandidateNotification,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterJobId, setFilterJobId] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Edit / Interview State for selected application
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Submitted');
  const [publicRemarks, setPublicRemarks] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  // Interview schedule inputs
  const [scheduleInterview, setScheduleInterview] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2026-11-12');
  const [interviewTime, setInterviewTime] = useState('11:00 AM IST');
  const [interviewType, setInterviewType] = useState<'Zoom' | 'Google Meet' | 'In-Person Client Interview' | 'Phone Call'>('Zoom');
  const [meetingLink, setMeetingLink] = useState('https://zoom.us/j/8839210492?pwd=RIZOOJOB');
  const [instructions, setInstructions] = useState('Please wear formal attire and keep your original passport ready for camera verification.');

  const openAppDetails = (app: Application) => {
    setSelectedApp(app);
    setNewStatus(app.applicationStatus);
    setPublicRemarks(app.publicRemarks || '');
    setInternalNotes(app.internalNotes || '');
    if (app.interviewDetails) {
      setScheduleInterview(true);
      setInterviewDate(app.interviewDetails.date);
      setInterviewTime(app.interviewDetails.time);
      setInterviewType(app.interviewDetails.type);
      setMeetingLink(app.interviewDetails.meetingLinkOrLocation);
      setInstructions(app.interviewDetails.instructions);
    } else {
      setScheduleInterview(false);
    }
  };

  const handleSaveAppChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const updated: Application = {
      ...selectedApp,
      applicationStatus: newStatus,
      publicRemarks: publicRemarks.trim(),
      internalNotes: internalNotes.trim(),
      updatedAt: new Date().toISOString(),
      interviewDetails:
        scheduleInterview || newStatus === 'Interview Scheduled'
          ? {
              date: interviewDate,
              time: interviewTime,
              type: interviewType,
              meetingLinkOrLocation: meetingLink.trim(),
              instructions: instructions.trim(),
            }
          : undefined,
    };

    onUpdateApplication(updated);

    // Notify candidate
    onSendCandidateNotification(
      updated.userId,
      `Application Status Update: ${newStatus}`,
      `Your application for ${updated.jobTitle} (${updated.id}) has been updated to ${newStatus}.${
        scheduleInterview ? ` Interview scheduled on ${interviewDate} at ${interviewTime}.` : ''
      }`
    );

    setSelectedApp(null);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'Application ID',
      'Applicant Name',
      'Phone Number',
      'Email',
      'Job Title',
      'Country',
      'Status',
      'City',
      'Passport Status',
      'Submitted Date',
    ];

    const rows = filteredApplications.map((a) => [
      a.id,
      `"${a.applicantName.replace(/"/g, '""')}"`,
      `"${a.mobileNumber}"`,
      `"${a.email}"`,
      `"${a.jobTitle.replace(/"/g, '""')}"`,
      `"${a.countryName}"`,
      a.applicationStatus,
      `"${a.currentCity}"`,
      a.passportAvailable,
      a.submittedAt.slice(0, 10),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RizooJob_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        app.id.toLowerCase().includes(q) ||
        app.applicantName.toLowerCase().includes(q) ||
        app.mobileNumber.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterStatus && app.applicationStatus !== filterStatus) return false;
    if (filterJobId && app.jobId !== filterJobId) return false;
    return true;
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Top Header with CSV Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Candidate Application Pipeline
          </h1>
          <p className="text-xs text-slate-400">
            Review submissions, schedule Zoom interviews, add internal evaluations & update statuses
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Applications (CSV)</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate name, mobile, Ref ID..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-400 font-medium"
        >
          <option value="">All Application Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
          <option value="On Hold">On Hold</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>

        <select
          value={filterJobId}
          onChange={(e) => setFilterJobId(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-400 font-medium"
        >
          <option value="">Filter by Vacancy Offer</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title} ({j.countryName})
            </option>
          ))}
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 bg-slate-900/90 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Reference ID</th>
                <th className="py-3 px-3">Candidate Details</th>
                <th className="py-3 px-3">Target Vacancy</th>
                <th className="py-3 px-3">Passport & City</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-3">Submitted</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No candidate applications found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">
                      {app.id}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{app.applicantName}</div>
                      <div className="text-[11px] text-slate-400">{app.mobileNumber}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-200 max-w-xs truncate">{app.jobTitle}</div>
                      <div className="text-[11px] text-slate-400">{app.countryName}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-300">
                        Passport: {app.passportAvailable}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {app.currentCity}, {app.state}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          app.applicationStatus === 'Selected'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : app.applicationStatus === 'Interview Scheduled'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : app.applicationStatus === 'Shortlisted'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : app.applicationStatus === 'Rejected'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {app.applicationStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-400">
                      {new Date(app.submittedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => openAppDetails(app)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Review & Interview Management Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl my-auto shadow-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Top */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  {selectedApp.id}
                </span>
                <h3 className="text-base font-black text-white">
                  Review Candidate: {selectedApp.applicantName}
                </h3>
                <span className="text-xs text-slate-400">
                  Applying for: {selectedApp.jobTitle} ({selectedApp.countryName})
                </span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveAppChanges} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {/* Candidate Info Grid */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">Mobile / WhatsApp</span>
                  <span className="font-bold text-white">{selectedApp.mobileNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">Email</span>
                  <span className="font-bold text-white">{selectedApp.email || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">Location</span>
                  <span className="font-bold text-white">{selectedApp.currentCity}, {selectedApp.state}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">Passport Status</span>
                  <span className="font-bold text-amber-300">{selectedApp.passportAvailable}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">Passport Number</span>
                  <span className="font-mono font-bold text-white">{selectedApp.passportNumber || 'Confidential/Optional'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-bold">Education</span>
                  <span className="font-bold text-white">{selectedApp.education}</span>
                </div>
              </div>

              {/* Work Experience & Skills */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block font-bold text-[11px]">Trade Experience & Skills:</span>
                <p className="text-slate-200">{selectedApp.workExperience}</p>
                <p className="text-amber-300 text-[11px]">Skills: {selectedApp.skills}</p>
              </div>

              {/* Resume Document Link */}
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-blue-200">
                    Resume Document: {selectedApp.resumeFileName || 'Candidate_BioData.pdf'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Reviewing candidate document: ${selectedApp.resumeFileName || 'Resume.pdf'}`)}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] cursor-pointer"
                >
                  View Document
                </button>
              </div>

              {/* Status Update Dropdown */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Update Application Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => {
                    const st = e.target.value as ApplicationStatus;
                    setNewStatus(st);
                    if (st === 'Interview Scheduled') setScheduleInterview(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-400"
                >
                  <option value="Submitted">Submitted (Initial Stage)</option>
                  <option value="Under Review">Under Review (Document Screening)</option>
                  <option value="Shortlisted">Shortlisted for Client Consideration</option>
                  <option value="Interview Scheduled">Interview Scheduled (Zoom / Trade Camp)</option>
                  <option value="Selected">Selected by Employer (Visa Filing)</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              {/* Schedule Interview Sub-Panel */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                <label className="flex items-center justify-between cursor-pointer font-bold text-amber-300">
                  <span className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-amber-400" />
                    <span>Schedule / Manage Interview Details</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={scheduleInterview}
                    onChange={(e) => setScheduleInterview(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                </label>

                {scheduleInterview && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Interview Date</label>
                      <input
                        type="date"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Time (with Timezone)</label>
                      <input
                        type="text"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                        placeholder="e.g. 11:30 AM IST"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Interview Type</label>
                      <select
                        value={interviewType}
                        onChange={(e) => setInterviewType(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                      >
                        <option value="Zoom">Zoom Video Interview</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="In-Person Client Interview">In-Person at Maharajganj Office</option>
                        <option value="Phone Call">Direct Telephonic Interview</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Meeting Link / Address</label>
                      <input
                        type="text"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="https://zoom.us/..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none font-mono text-[11px]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 font-bold mb-1">Candidate Instructions</label>
                      <input
                        type="text"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Keep original passport ready, wear formal collared shirt..."
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Public Remarks for Candidate */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Public Remarks (Visible to Candidate on My Applications screen)
                </label>
                <input
                  type="text"
                  value={publicRemarks}
                  onChange={(e) => setPublicRemarks(e.target.value)}
                  placeholder="e.g. Your application has been approved for client Zoom interview on 12-Nov."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              {/* Internal Notes (Never exposed to candidate) */}
              <div className="p-3 bg-slate-950/90 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 font-bold mb-1">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Internal Recruiter Notes (Strictly Confidential)</span>
                </div>
                <textarea
                  rows={2}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Enter private evaluation notes, trade score, visa remarks..."
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 outline-none focus:border-amber-400 resize-none text-[11px]"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Save Status & Notify Candidate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
