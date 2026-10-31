import React from 'react';
import { X, ShieldCheck, FileText, Building2, MapPin, Phone } from 'lucide-react';
import { Logo } from '../common/Logo';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'about';
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === 'privacy' && <ShieldCheck className="w-5 h-5 text-amber-400" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-amber-400" />}
            {type === 'about' && <Building2 className="w-5 h-5 text-amber-400" />}
            <h3 className="text-sm font-black text-white">
              {type === 'privacy' && 'Privacy Policy & Data Protection'}
              {type === 'terms' && 'Terms and Conditions'}
              {type === 'about' && 'About RIZOO JOB & Rizoo Travel Agency'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3.5 text-xs text-slate-700 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p className="font-bold text-slate-900">
                1. Data Collection & Purpose
              </p>
              <p>
                RIZOO JOB collects your name, contact phone number, email address, passport readiness status, educational background, and resume strictly for evaluating suitability for overseas employment vacancies.
              </p>
              <p className="font-bold text-slate-900">
                2. Protection of Sensitive Documents
              </p>
              <p>
                Passport numbers, trade certificates, and resumes are protected with strict access control. They are never published publicly, sold to advertisers, or indexed on search engines. Only authorized recruitment officers at Rizoo Travel Agency and verified overseas employers access applicant submissions.
              </p>
              <p className="font-bold text-slate-900">
                3. Candidate Data Rights
              </p>
              <p>
                You may at any time request an export of your personal data file or submit an account deletion request directly from your profile settings.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p className="font-bold text-slate-900">
                1. Vacancy Authenticity & Disclaimers
              </p>
              <p>
                Vacancies listed on RIZOO JOB reflect authorized demands received from verified companies in the Kingdom of Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, and European employers. All salary packages and contract terms are subject to final client trade tests and embassy medical tests.
              </p>
              <p className="font-bold text-slate-900">
                2. Warning Against Middlemen & Frauds
              </p>
              <p>
                Rizoo Travel Agency never authorizes independent unverified agents to collect cash deposits. Always confirm interviews and demand letters directly through our official helpline: 7007303250.
              </p>
              <p className="font-bold text-slate-900">
                3. Application Submissions
              </p>
              <p>
                Submitting an application does not guarantee overseas visa issuance. Selection is determined by foreign client interviews, trade qualification tests, and statutory government immigration clearances.
              </p>
            </>
          )}

          {type === 'about' && (
            <>
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                <Logo size="md" showTagline={true} />
              </div>

              <p className="font-bold text-slate-900">
                Leading Overseas Recruitment Partner
              </p>
              <p>
                RIZOO JOB is the official digital recruitment platform operated by <span className="font-bold text-slate-900">Rizoo Travel Agency</span>. We specialize in connecting aspiring workers, skilled tradesmen, drivers, hotel staff, and professionals from India with trusted overseas employers in the Gulf region and Europe.
              </p>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 font-medium">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <MapPin className="w-4 h-4 text-blue-700" />
                  <span>Physical Office Location:</span>
                </div>
                <p className="text-slate-600 pl-6 text-[11px]">
                  Dharampur Chauraha Se Pachrukhiya Bazar, Maharajganj, Uttar Pradesh, India
                </p>
                <div className="flex items-center gap-2 text-slate-900 font-bold pt-1">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Direct Contact: 7007303250</span>
                </div>
              </div>

              <p>
                Our mission is to provide 100% transparent recruitment, eliminate fraudulent middleman practices, and ensure every job seeker receives fair wages, legal work permits, and safe accommodation overseas.
              </p>
            </>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
