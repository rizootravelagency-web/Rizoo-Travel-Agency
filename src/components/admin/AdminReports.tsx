import React, { useState } from 'react';
import { Job, Application, User } from '../../types';
import { Download, BarChart3, Calendar, FileSpreadsheet, Briefcase, Users, CheckCircle } from 'lucide-react';

interface AdminReportsProps {
  jobs: Job[];
  applications: Application[];
  users: User[];
}

export const AdminReports: React.FC<AdminReportsProps> = ({ jobs, applications, users }) => {
  const [reportType, setReportType] = useState<'vacancies' | 'applications' | 'interviews' | 'users'>('applications');

  const handleExportCurrentReport = () => {
    let headers: string[] = [];
    let rows: string[][] = [];
    let filename = `RizooJob_${reportType}_Report_${new Date().toISOString().slice(0, 10)}.csv`;

    if (reportType === 'applications') {
      headers = ['ID', 'Candidate', 'Phone', 'Job Title', 'Country', 'Status', 'Date', 'Interview Details'];
      rows = applications.map((a) => [
        a.id,
        `"${a.applicantName.replace(/"/g, '""')}"`,
        `"${a.mobileNumber}"`,
        `"${a.jobTitle.replace(/"/g, '""')}"`,
        `"${a.countryName}"`,
        a.applicationStatus,
        a.submittedAt.slice(0, 10),
        `"${a.interviewDetails ? `${a.interviewDetails.date} at ${a.interviewDetails.time} (${a.interviewDetails.type})` : 'None'}"`,
      ]);
    } else if (reportType === 'vacancies') {
      headers = ['Job ID', 'Title', 'Country', 'Employer', 'Category', 'Vacancies', 'Salary', 'Currency', 'Duty', 'Status', 'Applications'];
      rows = jobs.map((j) => [
        j.id,
        `"${j.title.replace(/"/g, '""')}"`,
        `"${j.countryName}"`,
        `"${j.employerName.replace(/"/g, '""')}"`,
        `"${j.categoryName}"`,
        String(j.vacancyCount),
        String(j.salaryAmount),
        j.salaryCurrency,
        `"${j.dutyHours}"`,
        j.publicationStatus,
        String(j.applicationsCount || 0),
      ]);
    } else if (reportType === 'interviews') {
      headers = ['App ID', 'Candidate', 'Phone', 'Job Title', 'Interview Date', 'Time', 'Type', 'Meeting Link'];
      const interviewApps = applications.filter((a) => a.interviewDetails);
      rows = interviewApps.map((a) => [
        a.id,
        `"${a.applicantName.replace(/"/g, '""')}"`,
        `"${a.mobileNumber}"`,
        `"${a.jobTitle.replace(/"/g, '""')}"`,
        a.interviewDetails!.date,
        `"${a.interviewDetails!.time}"`,
        a.interviewDetails!.type,
        `"${a.interviewDetails!.meetingLinkOrLocation}"`,
      ]);
    } else {
      headers = ['User ID', 'Full Name', 'Phone', 'Email', 'City', 'State', 'Education', 'Status', 'Registered'];
      rows = users.map((u) => [
        u.id,
        `"${u.fullName.replace(/"/g, '""')}"`,
        `"${u.mobileNumber}"`,
        `"${u.email}"`,
        `"${u.city || ''}"`,
        `"${u.state || ''}"`,
        `"${u.education || ''}"`,
        u.status,
        u.registeredAt.slice(0, 10),
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Reports & Operational Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Export comprehensive recruitment dossiers and statistical summaries in spreadsheet CSV format
          </p>
        </div>

        <button
          onClick={handleExportCurrentReport}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Download Current Report (CSV)</span>
        </button>
      </div>

      {/* Report Type Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
        <button
          onClick={() => setReportType('applications')}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            reportType === 'applications'
              ? 'bg-blue-600/30 border-blue-500 text-white'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 mb-1 text-blue-400" />
          <div>Applications Report</div>
          <div className="text-[10px] text-slate-400">{applications.length} Records</div>
        </button>

        <button
          onClick={() => setReportType('vacancies')}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            reportType === 'vacancies'
              ? 'bg-blue-600/30 border-blue-500 text-white'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4 mb-1 text-amber-400" />
          <div>Vacancies Breakdown</div>
          <div className="text-[10px] text-slate-400">{jobs.length} Postings</div>
        </button>

        <button
          onClick={() => setReportType('interviews')}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            reportType === 'interviews'
              ? 'bg-blue-600/30 border-blue-500 text-white'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4 mb-1 text-purple-400" />
          <div>Upcoming Interviews</div>
          <div className="text-[10px] text-slate-400">
            {applications.filter((a) => a.interviewDetails).length} Candidates
          </div>
        </button>

        <button
          onClick={() => setReportType('users')}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            reportType === 'users'
              ? 'bg-blue-600/30 border-blue-500 text-white'
              : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 mb-1 text-emerald-400" />
          <div>Candidate Registrations</div>
          <div className="text-[10px] text-slate-400">{users.length} Candidates</div>
        </button>
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl text-xs text-slate-300 space-y-2">
        <h4 className="font-bold text-white flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Export Compliance & Data Sanitation Guarantee</span>
        </h4>
        <p className="text-slate-400">
          Generated CSV reports exclude candidate passwords, private authentication tokens, and internal confidential administrative encryption keys. Data is formatted in standard UTF-8 for Excel, Google Sheets, and LibreOffice Calc.
        </p>
      </div>
    </div>
  );
};
