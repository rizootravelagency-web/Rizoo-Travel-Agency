import React, { useState } from 'react';
import { User } from '../../types';
import {
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  FileText,
  Bell,
  Shield,
  HelpCircle,
  FileCheck,
  LogOut,
  Trash2,
  Edit3,
  Award,
  Briefcase,
  ChevronRight,
  ExternalLink,
  Lock,
  ShieldCheck,
} from 'lucide-react';

interface ProfileScreenProps {
  currentUser: User | null;
  onEditProfile: () => void;
  onOpenSupport: () => void;
  onOpenAgencyContact: () => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'about') => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onOpenLoginModal: () => void;
  onOpenAdmin?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentUser,
  onEditProfile,
  onOpenSupport,
  onOpenAgencyContact,
  onOpenPolicy,
  onLogout,
  onDeleteAccount,
  onOpenLoginModal,
  onOpenAdmin,
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPersonalData = () => {
    setDownloading(true);
    setTimeout(() => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentUser, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `RizooJob_Profile_${currentUser?.fullName?.replace(/\s+/g, '_') || 'user'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setDownloading(false);
    }, 600);
  };

  if (!currentUser) {
    return (
      <div className="pb-24 max-w-md mx-auto px-4 pt-10 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
          <UserIcon className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">Sign in to RIZOO JOB</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your application tracking history, upload resumes, and receive instant interview alerts.
          </p>
        </div>
        <button
          onClick={onOpenLoginModal}
          className="w-full py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
        >
          Login or Register Account
        </button>
      </div>
    );
  }

  return (
    <div className="pb-28 max-w-3xl mx-auto px-3 sm:px-4 space-y-4">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-5 text-white shadow-lg border border-amber-400/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            {currentUser.profilePhotoUrl ? (
              <img
                src={currentUser.profilePhotoUrl}
                alt={currentUser.fullName}
                className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-black text-2xl flex items-center justify-center border-2 border-amber-400">
                {currentUser.fullName.charAt(0)}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>

          {/* User Bio */}
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-lg sm:text-xl font-black text-white">
                  {currentUser.fullName}
                </h1>
                <p className="text-xs text-amber-300 font-medium">
                  {currentUser.education || 'Job Seeker'} • {currentUser.city || 'Maharajganj'}, {currentUser.state || 'UP'}
                </p>
              </div>

              <button
                onClick={onEditProfile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors cursor-pointer mx-auto sm:mx-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentUser.mobileNumber}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentUser.email}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Agency Administrator Access Card */}
      {onOpenAdmin && (
        <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl p-4 text-slate-950 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-amber-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-black tracking-wider text-slate-900/80">
                Agency Staff & Recruiter
              </div>
              <h3 className="text-sm font-black text-slate-950 leading-tight">
                Rizoo Agency Admin Panel
              </h3>
              <p className="text-[11px] text-slate-900 font-medium">
                Manage vacancies, review candidate applications, schedule Zoom interviews
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAdmin}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs shadow-md shrink-0 flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
          >
            <span>Open Admin Dashboard</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      )}

      {/* Qualifications & Trade Experience */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
          Professional Qualifications & Bio-Data
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold">Highest Education</span>
            <span className="text-slate-900 font-bold">{currentUser.education || '12th Pass'}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold">Experience History</span>
            <span className="text-slate-900 font-bold">{currentUser.experience || '2 Years Verified Experience'}</span>
          </div>
        </div>

        {/* Skills Tag Pills */}
        {currentUser.skills && currentUser.skills.length > 0 && (
          <div>
            <span className="text-slate-500 block text-[11px] font-bold mb-1.5">Trade Skills:</span>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attached Resume */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
          <div className="flex items-center gap-2 text-emerald-950 font-bold">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Resume: {currentUser.resumeFileName || 'Rehan_Khan_CV_2026.pdf'}</span>
          </div>
          <button
            onClick={() => alert(`Opening attached document: ${currentUser.resumeFileName || 'Resume.pdf'}`)}
            className="text-emerald-700 font-black hover:underline text-[11px] cursor-pointer"
          >
            Preview Document
          </button>
        </div>
      </div>

      {/* Support & Agency Office Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs">
        <button
          onClick={onOpenAgencyContact}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Rizoo Travel Agency Helpline</h4>
              <p className="text-slate-500 text-[11px]">Dharampur Chauraha, Maharajganj (7007303250)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={onOpenSupport}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Help, FAQs & Report Issue</h4>
              <p className="text-slate-500 text-[11px]">Frequently asked questions & ticket submissions</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Policies, Export & Account Management */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs">
        <button
          onClick={() => onOpenPolicy('about')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 text-slate-700 font-semibold">
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span>About RIZOO JOB & Rizoo Travel Agency</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => onOpenPolicy('privacy')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 text-slate-700 font-semibold">
            <Shield className="w-4 h-4 text-slate-500" />
            <span>Privacy Policy & Document Protection</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => onOpenPolicy('terms')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 text-slate-700 font-semibold">
            <FileCheck className="w-4 h-4 text-slate-500" />
            <span>Terms of Service & Candidate Transparency</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={handleDownloadPersonalData}
          disabled={downloading}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 text-slate-700 font-semibold">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{downloading ? 'Preparing File...' : 'Download My Profile Data (JSON)'}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to log out of RIZOO JOB?')) {
              onLogout();
            }
          }}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left cursor-pointer text-slate-700 font-semibold"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Log Out</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => {
            if (confirm('Warning: This will permanently delete your account, applications, and saved documents. Proceed?')) {
              onDeleteAccount();
            }
          }}
          className="w-full p-3.5 flex items-center justify-between hover:bg-rose-50 transition-colors text-left cursor-pointer text-rose-600 font-semibold"
        >
          <div className="flex items-center gap-3">
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span>Delete Account & Erase Personal Records</span>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400" />
        </button>
      </div>

      {/* Discrete Agency Staff Access */}
      {onOpenAdmin && (
        <div className="pt-2 text-center">
          <button
            onClick={onOpenAdmin}
            className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            Agency Recruiter Portal (Access via URL: <code className="text-slate-500 font-mono">?admin=true</code>)
          </button>
        </div>
      )}
    </div>
  );
};
