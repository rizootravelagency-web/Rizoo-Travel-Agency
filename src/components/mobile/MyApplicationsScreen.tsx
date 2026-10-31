import React, { useState } from 'react';
import { Application, ApplicationStatus } from '../../types';
import { CountryFlag } from '../common/CountryFlag';
import { Badge } from '../common/Badge';
import {
  FileText,
  Calendar,
  Clock,
  Video,
  ChevronRight,
  ExternalLink,
  Ban,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface MyApplicationsScreenProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
  onWithdrawApplication: (appId: string) => void;
  onBrowseJobs: () => void;
}

export const MyApplicationsScreen: React.FC<MyApplicationsScreenProps> = ({
  applications,
  onSelectApplication,
  onWithdrawApplication,
  onBrowseJobs,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAppModal, setSelectedAppModal] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    if (filterStatus === 'all') return true;
    return app.applicationStatus === filterStatus;
  });

  const getStatusStepIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'Submitted':
        return 1;
      case 'Under Review':
        return 2;
      case 'Shortlisted':
        return 3;
      case 'Interview Scheduled':
        return 4;
      case 'Selected':
        return 5;
      case 'Rejected':
      case 'On Hold':
      case 'Withdrawn':
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="pb-24 max-w-4xl mx-auto px-3 sm:px-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            My Job Applications
          </h1>
          <p className="text-xs text-slate-500">
            Track interview dates, selection progress, and visa application status
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-bold">
          {['all', 'Submitted', 'Under Review', 'Interview Scheduled', 'Selected'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-full capitalize whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {st === 'all' ? `All (${applications.length})` : st}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/90 shadow-xs space-y-4 max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              No Applications Found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              You haven't submitted any applications under this category yet. Explore international vacancies and apply in seconds.
            </p>
          </div>
          <button
            onClick={onBrowseJobs}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            Browse Verified Vacancies
          </button>
        </div>
      ) : (
        /* Applications List */
        <div className="space-y-3.5">
          {filteredApps.map((app) => {
            const stepIdx = getStatusStepIndex(app.applicationStatus);
            const canWithdraw =
              app.applicationStatus === 'Submitted' ||
              app.applicationStatus === 'Under Review';

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                {/* Top Row: Ref ID + Status Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      {app.id}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(app.submittedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <Badge type="status" text={app.applicationStatus} />
                </div>

                {/* Job Title & Country */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {app.jobTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Employer: {app.employerName}
                    </p>
                  </div>
                  <div className="pt-1 sm:pt-0">
                    <CountryFlag countryName={app.countryName} flagEmoji={app.countryFlag} showName={true} />
                  </div>
                </div>

                {/* Status Progress Step Indicator */}
                <div className="py-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-1.5 px-1">
                    <span className={stepIdx >= 1 ? 'text-blue-700' : ''}>1. Applied</span>
                    <span className={stepIdx >= 2 ? 'text-blue-700' : ''}>2. Screening</span>
                    <span className={stepIdx >= 3 ? 'text-blue-700' : ''}>3. Shortlist</span>
                    <span className={stepIdx >= 4 ? 'text-blue-700' : ''}>4. Interview</span>
                    <span className={stepIdx >= 5 ? 'text-emerald-600' : ''}>5. Selected</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        app.applicationStatus === 'Selected'
                          ? 'bg-emerald-500'
                          : app.applicationStatus === 'Rejected'
                          ? 'bg-rose-500'
                          : 'bg-blue-600'
                      }`}
                      style={{ width: `${(stepIdx / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Interview Notification Banner if Scheduled */}
                {app.interviewDetails && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/90 flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Video className="w-4 h-4 text-amber-600" />
                        <span>Interview Scheduled: {app.interviewDetails.type}</span>
                      </div>
                      <span className="font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {app.interviewDetails.date} at {app.interviewDetails.time}
                      </span>
                    </div>
                    {app.interviewDetails.instructions && (
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Instructions: {app.interviewDetails.instructions}
                      </p>
                    )}
                    {app.interviewDetails.meetingLinkOrLocation && (
                      <div className="pt-1">
                        <a
                          href={app.interviewDetails.meetingLinkOrLocation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Join Meeting / View Interview Location</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Public Remarks by Recruitment Office */}
                {app.publicRemarks && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900">Agency Remark: </span>
                    <span>{app.publicRemarks}</span>
                  </div>
                )}

                {/* Actions Bottom Bar */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedAppModal(app)}
                    className="font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Submission Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {canWithdraw && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to withdraw this application?')) {
                          onWithdrawApplication(app.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer font-medium text-[11px]"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Withdraw</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details View Modal */}
      {selectedAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Application File</span>
                <h3 className="text-base font-black text-slate-900">{selectedAppModal.jobTitle}</h3>
                <span className="text-xs font-mono font-bold text-blue-700">{selectedAppModal.id}</span>
              </div>
              <button
                onClick={() => setSelectedAppModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px]">Candidate Name</span>
                  <span className="font-bold">{selectedAppModal.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mobile Number</span>
                  <span className="font-bold">{selectedAppModal.mobileNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Location</span>
                  <span className="font-bold">{selectedAppModal.currentCity}, {selectedAppModal.state}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Passport Ready</span>
                  <span className="font-bold">{selectedAppModal.passportAvailable}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Education</span>
                  <span className="font-bold">{selectedAppModal.education}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Resume Attached</span>
                  <span className="font-bold">{selectedAppModal.resumeFileName || 'Default Profile CV'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block mb-0.5">Experience & Trade Skills:</span>
                <p className="bg-slate-50 p-2 rounded-lg">{selectedAppModal.workExperience} — {selectedAppModal.skills}</p>
              </div>

              {selectedAppModal.additionalInfo && (
                <div>
                  <span className="text-slate-500 font-bold block mb-0.5">Applicant Notes:</span>
                  <p className="bg-slate-50 p-2 rounded-lg">{selectedAppModal.additionalInfo}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedAppModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close Application Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
