import React, { useState } from 'react';
import { Job, Country, JobCategory, VerificationStatus, PublicationStatus } from '../../types';
import { X, Save, Eye, Upload, Plus, Trash2, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VacancyCard } from '../mobile/VacancyCard';

interface AdminVacancyModalProps {
  initialJob?: Job | null;
  countries: Country[];
  categories: JobCategory[];
  onClose: () => void;
  onSave: (job: Job) => void;
}

export const AdminVacancyModal: React.FC<AdminVacancyModalProps> = ({
  initialJob,
  countries,
  categories,
  onClose,
  onSave,
}) => {
  const isEditing = !!initialJob;

  const [title, setTitle] = useState(initialJob?.title || '');
  const [countryId, setCountryId] = useState(initialJob?.countryId || 'sa');
  const [city, setCity] = useState(initialJob?.city || 'Riyadh');
  const [employerName, setEmployerName] = useState(initialJob?.employerName || '');
  const [employerDetails, setEmployerDetails] = useState(initialJob?.employerDetails || '');
  const [categoryId, setCategoryId] = useState(initialJob?.categoryId || 'wh-labour');
  const [vacancyCount, setVacancyCount] = useState(initialJob?.vacancyCount || 50);
  const [salaryAmount, setSalaryAmount] = useState(initialJob?.salaryAmount || 1500);
  const [salaryCurrency, setSalaryCurrency] = useState(initialJob?.salaryCurrency || 'SAR');
  const [salaryPeriod, setSalaryPeriod] = useState<Job['salaryPeriod']>(initialJob?.salaryPeriod || 'Month');
  const [overtimeDetails, setOvertimeDetails] = useState(initialJob?.overtimeDetails || '2-3 Hours Daily / 1.5x Overtime Rate');
  const [foodFacility, setFoodFacility] = useState(initialJob?.foodFacility || 'Free Food / Allowance Provided');
  const [accommodation, setAccommodation] = useState(initialJob?.accommodation || 'Free Company Accommodation');
  const [transportation, setTransportation] = useState(initialJob?.transportation || 'Free Company Transport');
  const [medicalInsurance, setMedicalInsurance] = useState(initialJob?.medicalInsurance || 'Provided as per labor law');
  const [dutyHours, setDutyHours] = useState(initialJob?.dutyHours || '8 Hours');
  const [weeklyHoliday, setWeeklyHoliday] = useState(initialJob?.weeklyHoliday || '1 Day (Friday)');
  const [contractDuration, setContractDuration] = useState(initialJob?.contractDuration || '2 Years (Renewable)');
  const [experienceRequirements, setExperienceRequirements] = useState(initialJob?.experienceRequirements || 'Minimum 1 year relevant trade experience');
  const [educationRequirements, setEducationRequirements] = useState(initialJob?.educationRequirements || 'High School / 10th Pass');
  const [languageRequirements, setLanguageRequirements] = useState(initialJob?.languageRequirements || 'Basic English or Hindi');
  const [ageRequirements, setAgeRequirements] = useState(initialJob?.ageRequirements || '21 - 38 Years');
  const [passportRequirements, setPassportRequirements] = useState<Job['passportRequirements']>(
    initialJob?.passportRequirements || 'ECR & ECNR both accepted'
  );
  const [selectionMethod, setSelectionMethod] = useState<Job['selectionMethod']>(
    initialJob?.selectionMethod || 'Zoom Interview'
  );
  const [requiredDocsText, setRequiredDocsText] = useState(
    initialJob?.requiredDocuments.join(', ') || 'Passport Copy, Updated Bio-Data, 8 Photos with White Background'
  );
  const [description, setDescription] = useState(initialJob?.description || '');
  const [posterImageUrl, setPosterImageUrl] = useState(
    initialJob?.posterImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  );
  const [additionalImagesText, setAdditionalImagesText] = useState(
    initialJob?.additionalImageUrls.join('\n') || ''
  );
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(
    initialJob?.verificationStatus || 'Verified'
  );
  const [publicationStatus, setPublicationStatus] = useState<PublicationStatus>(
    initialJob?.publicationStatus || 'Published'
  );
  const [featured, setFeatured] = useState(initialJob?.featured || false);
  const [urgent, setUrgent] = useState(initialJob?.urgent || false);
  const [applicationDeadline, setApplicationDeadline] = useState(
    initialJob?.applicationDeadline || '2026-11-30'
  );
  const [interviewDate, setInterviewDate] = useState(initialJob?.interviewDate || '2026-11-15');

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill currency when country changes
  const handleCountryChange = (id: string) => {
    setCountryId(id);
    const found = countries.find((c) => c.id === id);
    if (found && found.currency) {
      setSalaryCurrency(found.currency);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPosterImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter job title.');
      return;
    }
    if (!employerName.trim()) {
      setErrorMsg('Please enter employer name.');
      return;
    }

    const selectedCountryObj = countries.find((c) => c.id === countryId);
    const selectedCategoryObj = categories.find((c) => c.id === categoryId);

    const jobToSave: Job = {
      id: initialJob ? initialJob.id : 'RJ-JOB-' + Math.floor(100 + Math.random() * 900),
      title: title.trim(),
      countryId,
      countryName: selectedCountryObj?.name || 'Saudi Arabia',
      countryFlag: selectedCountryObj?.flag || '🇸🇦',
      city: city.trim(),
      employerName: employerName.trim(),
      employerDetails: employerDetails.trim(),
      categoryId,
      categoryName: selectedCategoryObj?.name || 'Skilled Jobs',
      vacancyCount: Number(vacancyCount) || 1,
      salaryAmount: Number(salaryAmount) || 1000,
      salaryCurrency,
      salaryPeriod,
      overtimeDetails: overtimeDetails.trim(),
      foodFacility: foodFacility.trim(),
      accommodation: accommodation.trim(),
      transportation: transportation.trim(),
      medicalInsurance: medicalInsurance.trim(),
      dutyHours: dutyHours.trim(),
      weeklyHoliday: weeklyHoliday.trim(),
      contractDuration: contractDuration.trim(),
      experienceRequirements: experienceRequirements.trim(),
      educationRequirements: educationRequirements.trim(),
      languageRequirements: languageRequirements.trim(),
      ageRequirements: ageRequirements.trim(),
      passportRequirements,
      selectionMethod,
      requiredDocuments: requiredDocsText.split(',').map((d) => d.trim()).filter(Boolean),
      description: description.trim(),
      posterImageUrl: posterImageUrl.trim(),
      additionalImageUrls: additionalImagesText
        .split('\n')
        .map((u) => u.trim())
        .filter(Boolean),
      verificationStatus,
      publicationStatus,
      featured,
      urgent,
      createdAt: initialJob?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicationDeadline,
      interviewDate: interviewDate || undefined,
      createdBy: initialJob?.createdBy || 'Rizoo Agency Administrator',
      viewsCount: initialJob?.viewsCount || 0,
      applicationsCount: initialJob?.applicationsCount || 0,
    };

    onSave(jobToSave);
  };

  // Build temporary object for preview
  const currentPreviewJob: Job = {
    id: initialJob?.id || 'PREVIEW-101',
    title: title || 'Job Title Preview',
    countryId,
    countryName: countries.find((c) => c.id === countryId)?.name || 'Saudi Arabia',
    countryFlag: countries.find((c) => c.id === countryId)?.flag || '🇸🇦',
    city: city || 'Riyadh',
    employerName: employerName || 'Employer Name LLC',
    categoryId,
    categoryName: categories.find((c) => c.id === categoryId)?.name || 'General Category',
    vacancyCount: Number(vacancyCount) || 50,
    salaryAmount: Number(salaryAmount) || 1500,
    salaryCurrency,
    salaryPeriod,
    overtimeDetails,
    foodFacility,
    accommodation,
    transportation,
    medicalInsurance,
    dutyHours,
    weeklyHoliday,
    contractDuration,
    experienceRequirements,
    educationRequirements,
    languageRequirements,
    passportRequirements,
    selectionMethod,
    requiredDocuments: requiredDocsText.split(',').map((d) => d.trim()).filter(Boolean),
    description,
    posterImageUrl,
    additionalImageUrls: [],
    verificationStatus,
    publicationStatus,
    featured,
    urgent,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    applicationDeadline,
    createdBy: 'Admin',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl my-auto shadow-2xl text-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-amber-400">
              VACANCY MANAGEMENT MODULE
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              {isEditing ? `Edit Vacancy: ${initialJob.title}` : 'Publish New Overseas Vacancy'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Live Card Preview</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Body with All 35 Form Fields */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-300 font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Job Identity & Destination */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-1 border-b border-slate-800">
              1. Vacancy Title, Employer & Country
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Warehouse Labour & Material Handler"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Destination Country *
                </label>
                <select
                  value={countryId}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Destination City / Region
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Riyadh & Dammam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Employer / Sponsoring Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  placeholder="e.g. Al-Marai Logistics Group KSA"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Job Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Compensation, Currency & Vacancies Count */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-1 border-b border-slate-800">
              2. Salary Package, Currency & Overtime Policy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Number of Vacant Seats *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={vacancyCount}
                  onChange={(e) => setVacancyCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Basic Salary Amount *
                </label>
                <input
                  type="number"
                  required
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 font-bold text-amber-300"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Salary Currency
                </label>
                <input
                  type="text"
                  value={salaryCurrency}
                  onChange={(e) => setSalaryCurrency(e.target.value.toUpperCase())}
                  placeholder="SAR, AED, EUR..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Payment Period
                </label>
                <select
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  <option value="Month">Per Month</option>
                  <option value="Hour">Per Hour</option>
                  <option value="Year">Per Year</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-slate-300 font-bold mb-1">
                  Overtime Terms & Earning Potential
                </label>
                <input
                  type="text"
                  value={overtimeDetails}
                  onChange={(e) => setOvertimeDetails(e.target.value)}
                  placeholder="e.g. 2-3 Hours Daily / 1.5x Overtime Rate"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Facilities, Duty Hours & Contract */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-1 border-b border-slate-800">
              3. Food, Accommodation, Transportation & Contract Terms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Food Facility
                </label>
                <input
                  type="text"
                  value={foodFacility}
                  onChange={(e) => setFoodFacility(e.target.value)}
                  placeholder="e.g. Free 3 Meals / 300 SAR Allowance"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Accommodation
                </label>
                <input
                  type="text"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  placeholder="e.g. Free Company Accommodation"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Transportation & Medical
                </label>
                <input
                  type="text"
                  value={transportation}
                  onChange={(e) => setTransportation(e.target.value)}
                  placeholder="e.g. Free Company Transport"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Duty Hours & Shift
                </label>
                <input
                  type="text"
                  value={dutyHours}
                  onChange={(e) => setDutyHours(e.target.value)}
                  placeholder="e.g. 8 Hours Daily"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Weekly Holiday
                </label>
                <input
                  type="text"
                  value={weeklyHoliday}
                  onChange={(e) => setWeeklyHoliday(e.target.value)}
                  placeholder="e.g. 1 Day (Friday Off)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Employment Contract Duration
                </label>
                <input
                  type="text"
                  value={contractDuration}
                  onChange={(e) => setContractDuration(e.target.value)}
                  placeholder="e.g. 2 Years (Renewable with Ticket)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Eligibility Criteria & Selection */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-1 border-b border-slate-800">
              4. Selection Method, Passport Criteria & Qualifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Selection Method *
                </label>
                <select
                  value={selectionMethod}
                  onChange={(e) => setSelectionMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  <option value="Zoom Interview">Zoom Interview</option>
                  <option value="Direct Client Interview">Direct Client Interview</option>
                  <option value="CV Selection">CV Selection</option>
                  <option value="Trade Test">Trade Test</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Passport Category
                </label>
                <select
                  value={passportRequirements}
                  onChange={(e) => setPassportRequirements(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  <option value="ECR & ECNR both accepted">ECR & ECNR both accepted</option>
                  <option value="ECNR Only">ECNR Only</option>
                  <option value="Valid for at least 1 year">Valid for at least 1 year</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Interview Camp Date
                </label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Experience Requirements
                </label>
                <input
                  type="text"
                  value={experienceRequirements}
                  onChange={(e) => setExperienceRequirements(e.target.value)}
                  placeholder="e.g. 1-2 years warehouse experience"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Education Requirements
                </label>
                <input
                  type="text"
                  value={educationRequirements}
                  onChange={(e) => setEducationRequirements(e.target.value)}
                  placeholder="e.g. 10th Pass / High School"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Age Range
                </label>
                <input
                  type="text"
                  value={ageRequirements}
                  onChange={(e) => setAgeRequirements(e.target.value)}
                  placeholder="e.g. 21 - 38 Years"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-slate-300 font-bold mb-1">
                  Mandatory Required Documents (comma separated)
                </label>
                <input
                  type="text"
                  value={requiredDocsText}
                  onChange={(e) => setRequiredDocsText(e.target.value)}
                  placeholder="Passport Copy, Resume, White Background Photos, PCC"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Posters & Photographs Upload */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-1 border-b border-slate-800">
              5. Vacancy Poster & Job Photographs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Main Vacancy Poster URL or File Upload *
                </label>
                <input
                  type="text"
                  required
                  value={posterImageUrl}
                  onChange={(e) => setPosterImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 mb-2"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="adminPosterUpload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="adminPosterUpload"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload Poster Image</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Additional Work Site Photos (one per line)
                </label>
                <textarea
                  rows={3}
                  value={additionalImagesText}
                  onChange={(e) => setAdditionalImagesText(e.target.value)}
                  placeholder="https://image1.jpg&#10;https://image2.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Description & Status Controls */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-1 border-b border-slate-800">
              6. Detailed Description, Verification & Publishing Status
            </h3>

            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Full Job Description & Duties
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed explanation of daily work, safety protocols, visa speed..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Verification Status
                </label>
                <select
                  value={verificationStatus}
                  onChange={(e) => setVerificationStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  <option value="Verified">Verified (Accredited by Rizoo)</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Needs More Information">Needs More Information</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Publication Status
                </label>
                <select
                  value={publicationStatus}
                  onChange={(e) => setPublicationStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  <option value="Published">Published (Live in App)</option>
                  <option value="Draft">Draft (Hidden from candidates)</option>
                  <option value="Expired">Expired</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Application Deadline Date
                </label>
                <input
                  type="date"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Checkboxes for Urgent & Featured */}
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600"
                />
                <span>Mark as URGENT RECRUITMENT</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-200">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500"
                />
                <span>Mark as FEATURED VACANCY</span>
              </label>
            </div>
          </div>

          {/* Modal Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{isEditing ? 'Save Changes' : 'Publish Overseas Vacancy'}</span>
            </button>
          </div>
        </form>

        {/* Live Preview Modal Overlay */}
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4">
            <div className="bg-white rounded-3xl p-4 max-w-sm w-full space-y-3">
              <div className="flex items-center justify-between text-slate-900 border-b pb-2">
                <span className="font-bold text-xs">Card Live Preview in Candidate App</span>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <VacancyCard
                job={currentPreviewJob}
                isSaved={false}
                onSelect={() => {}}
                onApply={() => {}}
                onToggleSave={() => {}}
                onShare={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
