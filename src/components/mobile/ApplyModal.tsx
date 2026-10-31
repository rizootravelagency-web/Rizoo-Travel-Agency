import React, { useState } from 'react';
import { Job, Application, User } from '../../types';
import { CountryFlag } from '../common/CountryFlag';
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Send,
  Save,
  Lock,
} from 'lucide-react';

interface ApplyModalProps {
  job: Job;
  currentUser: User | null;
  onClose: () => void;
  onSubmit: (appData: Omit<Application, 'id' | 'submittedAt' | 'updatedAt' | 'applicationStatus'>) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  currentUser,
  onClose,
  onSubmit,
}) => {
  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [mobileNumber, setMobileNumber] = useState(currentUser?.mobileNumber || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [dob, setDob] = useState('1998-05-12');
  const [currentCity, setCurrentCity] = useState(currentUser?.city || 'Maharajganj');
  const [state, setState] = useState(currentUser?.state || 'Uttar Pradesh');
  const [nationality, setNationality] = useState('Indian');
  const [passportAvailable, setPassportAvailable] = useState<'Yes' | 'No' | 'In Process'>('Yes');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiryDate, setPassportExpiryDate] = useState('2031-06-15');
  const [education, setEducation] = useState(currentUser?.education || '12th Pass (Intermediate)');
  const [workExperience, setWorkExperience] = useState(currentUser?.experience || '2 Years Related Trade Experience');
  const [skills, setSkills] = useState(currentUser?.skills?.join(', ') || 'Material Handling, Quality Inspection');
  const [resumeFileName, setResumeFileName] = useState(currentUser?.resumeFileName || 'Candidate_Resume_BioData.pdf');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full legal name as per passport/ID.');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile contact number.');
      return;
    }
    if (!consentAccepted) {
      setErrorMsg('You must accept the data verification and recruitment consent.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({
        jobId: job.id,
        jobTitle: job.title,
        countryName: job.countryName,
        countryFlag: job.countryFlag,
        employerName: job.employerName,
        userId: currentUser?.id || 'guest-' + Date.now(),
        applicantName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim(),
        dob,
        currentCity: currentCity.trim(),
        state: state.trim(),
        nationality,
        passportAvailable,
        passportNumber: passportNumber.trim() || undefined,
        passportExpiryDate: passportAvailable === 'Yes' ? passportExpiryDate : undefined,
        education,
        workExperience,
        skills,
        preferredJob: job.title,
        preferredCountry: job.countryName,
        resumeFileName,
        additionalInfo: additionalInfo.trim(),
        consentAccepted: true,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold uppercase tracking-wider mb-0.5">
              <span>Overseas Employment Application</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white line-clamp-1">
              Apply: {job.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
              <CountryFlag countryName={job.countryName} flagEmoji={job.countryFlag} showName={true} />
              <span>•</span>
              <span className="text-amber-400 font-semibold">{job.salaryAmount} {job.salaryCurrency}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Privacy Note */}
          <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-start gap-2.5 text-blue-950">
            <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold">Recruitment Privacy Guarantee: </span>
              Your contact details and uploaded documents are encrypted and shared only with Rizoo Travel Agency and verified overseas sponsors. We never publish your private documents.
            </div>
          </div>

          {/* Personal Information Group */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-100">
              1. Candidate Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Full Name (as per Passport/ID) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mohd Rehan Khan"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 7007303250"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. candidate@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Current City
                </label>
                <input
                  type="text"
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  placeholder="e.g. Maharajganj / Gorakhpur"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Uttar Pradesh"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Passport & Travel Readiness */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-100">
              2. Passport & Overseas Readiness
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Passport Status *
                </label>
                <select
                  value={passportAvailable}
                  onChange={(e) => setPassportAvailable(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium bg-white"
                >
                  <option value="Yes">Yes, Valid Passport Ready</option>
                  <option value="In Process">Applied / In Process</option>
                  <option value="No">No Passport Yet</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Passport Number (Optional)
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. Z1234567"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Passport Expiry Date
                </label>
                <input
                  type="date"
                  value={passportExpiryDate}
                  onChange={(e) => setPassportExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Experience & Qualifications */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-100">
              3. Qualifications & Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Highest Education
                </label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium bg-white"
                >
                  <option value="10th Pass (High School)">10th Pass (High School)</option>
                  <option value="12th Pass (Intermediate)">12th Pass (Intermediate)</option>
                  <option value="ITI / Trade Technical Certificate">ITI / Trade Technical Certificate</option>
                  <option value="Diploma in Engineering">Diploma in Engineering</option>
                  <option value="Graduate (B.A / B.Com / B.Sc / B.Tech)">Graduate</option>
                  <option value="Basic Literacy / Non-Matric">Basic Literacy / Non-Matric</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Relevant Work Experience
                </label>
                <input
                  type="text"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  placeholder="e.g. 2 years warehouse loading / ITI certified"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">
                  Key Skills & Trade Competencies
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Forklift, Driving, Pipe Welding, English speaking"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload / Document Attachment */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2 pb-1 border-b border-slate-100">
              4. Bio-Data / Resume Document
            </h3>

            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-4 text-center bg-slate-50 transition-colors">
              <input
                type="file"
                id="resumeFileInput"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="resumeFileInput" className="cursor-pointer flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 text-xs">
                  {resumeFileName ? resumeFileName : 'Click to Upload Resume or Bio-Data'}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Supports PDF, DOC, DOCX, JPG (Max 10MB)
                </span>
              </label>

              {resumeFileName && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[11px] font-semibold border border-emerald-200">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Attached: {resumeFileName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Additional Notes / Availability
            </label>
            <textarea
              rows={2}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g. Ready for interview immediately, Indian heavy license holder..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-slate-900 font-medium resize-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 mt-0.5 shrink-0"
              />
              <span className="text-[11px] text-slate-600 leading-normal">
                I hereby declare that all details provided are truthful. I authorize Rizoo Travel Agency to review my documents and present my profile to the foreign employer for visa & employment processing.
              </span>
            </label>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-black shadow-md flex items-center gap-2 transition-transform active:scale-98 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
