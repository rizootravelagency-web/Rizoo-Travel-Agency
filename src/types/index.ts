export type VerificationStatus = 'Pending Review' | 'Reviewed' | 'Verified' | 'Rejected' | 'Needs More Information';

export type PublicationStatus = 'Draft' | 'Published' | 'Unpublished' | 'Archived' | 'Expired';

export type ApplicationStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Selected'
  | 'Rejected'
  | 'On Hold'
  | 'Withdrawn';

export interface Job {
  id: string;
  title: string;
  countryId: string;
  countryName: string;
  countryFlag: string;
  city: string;
  employerName: string;
  employerDetails?: string;
  categoryId: string;
  categoryName: string;
  vacancyCount: number;
  salaryAmount: number;
  salaryCurrency: string; // SAR, AED, QAR, KWD, OMR, EUR, INR, USD
  salaryPeriod: 'Month' | 'Hour' | 'Year';
  overtimeDetails: string; // e.g. "2-3 Hours Daily / 1.5x Rate" or "As per company policy"
  foodFacility: string; // "Provided by Company" | "Food Allowance (300 SAR)" | "Self"
  accommodation: string; // "Free Company Accommodation" | "Allowance Provided" | "Self"
  transportation: string; // "Free Company Transport" | "Self"
  medicalInsurance: string; // "Provided as per labor law"
  dutyHours: string; // "8 Hours", "9 Hours", "10 Hours"
  weeklyHoliday: string; // "1 Day (Friday)", "Friday & Saturday"
  contractDuration: string; // "2 Years (Renewable)"
  experienceRequirements: string; // e.g. "Min 1-2 years experience required"
  educationRequirements: string; // "High School / 10th Pass", "ITI / Diploma", etc.
  languageRequirements: string; // "Basic English / Hindi / Arabic"
  ageRequirements?: string; // "21 - 38 Years"
  passportRequirements: 'ECR & ECNR both accepted' | 'ECNR Only' | 'Valid for at least 1 year' | (string & {});
  selectionMethod: 'CV Selection' | 'Zoom Interview' | 'Direct Client Interview' | 'Trade Test' | (string & {});
  requiredDocuments: string[]; // ["Passport Copy", "Updated Resume", "Experience Certificate", "Photo with white background"]
  description: string;
  posterImageUrl: string;
  additionalImageUrls: string[];
  verificationStatus: VerificationStatus;
  publicationStatus: PublicationStatus;
  featured: boolean;
  urgent: boolean;
  createdAt: string;
  updatedAt: string;
  applicationDeadline: string;
  interviewDate?: string;
  createdBy: string;
  viewsCount?: number;
  applicationsCount?: number;
}

export interface Application {
  id: string; // e.g. "RJ-2026-8921"
  jobId: string;
  jobTitle: string;
  countryName: string;
  countryFlag: string;
  employerName: string;
  userId: string;
  applicantName: string;
  mobileNumber: string;
  email: string;
  dob: string;
  currentCity: string;
  state: string;
  nationality: string;
  passportAvailable: 'Yes' | 'No' | 'In Process';
  passportNumber?: string;
  passportExpiryDate?: string;
  education: string;
  workExperience: string;
  skills: string;
  preferredJob: string;
  preferredCountry: string;
  resumeFileName?: string;
  resumeDataUrl?: string;
  profilePhotoUrl?: string;
  additionalInfo?: string;
  applicationStatus: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  interviewDetails?: {
    date: string;
    time: string;
    type: 'Zoom' | 'Google Meet' | 'In-Person Client Interview' | 'Phone Call';
    meetingLinkOrLocation: string;
    instructions: string;
  };
  publicRemarks?: string;
  internalNotes?: string;
  consentAccepted: boolean;
}

export interface User {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredCategory?: string;
  preferredCountry?: string;
  preferredSalaryRange?: string;
  city?: string;
  state?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  profilePhotoUrl?: string;
  resumeFileName?: string;
  registeredAt: string;
  status: 'Active' | 'Suspended';
  notificationSettings?: {
    enabled: boolean;
    urgentJobs: boolean;
    preferredCountriesOnly: boolean;
    applicationUpdates: boolean;
  };
}

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: 'Gulf' | 'Europe' | 'Asia' | 'Other';
  active: boolean;
  popular: boolean;
  currency: string;
}

export interface JobCategory {
  id: string;
  name: string;
  iconName: string;
  active: boolean;
  jobCount?: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  targetCategoryOrCountry?: string;
  badgeText?: string;
  active: boolean;
  order: number;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  publishedAt: string;
  expiryDate?: string;
  active: boolean;
  priority: 'High' | 'Normal';
}

export interface AppNotification {
  id: string;
  userId?: string; // empty = global broadcast
  title: string;
  message: string;
  type: 'vacancy' | 'application' | 'interview' | 'announcement' | 'urgent';
  relatedJobId?: string;
  relatedApplicationId?: string;
  createdAt: string;
  read: boolean;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  category: 'Application Query' | 'Vacancy Report' | 'Suspicious Recruitment' | 'Visa & Document Question' | 'Other';
  relatedJobId?: string;
  relatedJobTitle?: string;
  description: string;
  attachmentName?: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  adminReply?: string;
  resolvedAt?: string;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  adminRole: string;
  action: string;
  targetType: 'Job' | 'Application' | 'User' | 'Country' | 'Category' | 'Settings' | 'Notification';
  targetId: string;
  timestamp: string;
  details: string;
}

export interface AppSettings {
  appName: string;
  agencyName: string;
  contactNumber: string;
  whatsappNumber: string;
  officeAddress: string;
  supportEmail: string;
  defaultCountry: string;
  defaultCurrency: string;
  maintenanceMode: boolean;
  disclaimerText: string;
  autoExpireDays: number;
  requirePassportForApply: boolean;
  allowJobResubmission: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'Super Admin' | 'Vacancy Manager' | 'Application Manager' | 'Support Staff';
  fullName: string;
  lastLogin?: string;
  active: boolean;
}
