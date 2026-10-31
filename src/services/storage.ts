import {
  Job,
  Application,
  User,
  Country,
  JobCategory,
  Banner,
  Announcement,
  AppNotification,
  SupportTicket,
  AuditLog,
  AppSettings,
  AdminUser,
} from '../types';

const STORAGE_KEYS = {
  JOBS: 'rizoo_jobs_v1',
  APPLICATIONS: 'rizoo_applications_v1',
  USERS: 'rizoo_users_v1',
  CURRENT_USER: 'rizoo_current_user_v1',
  SAVED_JOBS: 'rizoo_saved_jobs_v1',
  COUNTRIES: 'rizoo_countries_v1',
  CATEGORIES: 'rizoo_categories_v1',
  BANNERS: 'rizoo_banners_v1',
  ANNOUNCEMENTS: 'rizoo_announcements_v1',
  NOTIFICATIONS: 'rizoo_notifications_v1',
  SUPPORT_TICKETS: 'rizoo_support_tickets_v1',
  AUDIT_LOGS: 'rizoo_audit_logs_v1',
  SETTINGS: 'rizoo_settings_v1',
  ADMIN_USERS: 'rizoo_admin_users_v1',
  CURRENT_ADMIN: 'rizoo_current_admin_v1',
  ONBOARDING_DONE: 'rizoo_onboarding_done_v1',
  ADMIN_PASSWORD: 'rizoo_admin_password_v1',
};

// Seed Countries
export const INITIAL_COUNTRIES: Country[] = [
  { id: 'sa', name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', region: 'Gulf', active: true, popular: true, currency: 'SAR' },
  { id: 'ae', name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', region: 'Gulf', active: true, popular: true, currency: 'AED' },
  { id: 'qa', name: 'Qatar', code: 'QA', flag: '🇶🇦', region: 'Gulf', active: true, popular: true, currency: 'QAR' },
  { id: 'kw', name: 'Kuwait', code: 'KW', flag: '🇰🇼', region: 'Gulf', active: true, popular: true, currency: 'KWD' },
  { id: 'om', name: 'Oman', code: 'OM', flag: '🇴🇲', region: 'Gulf', active: true, popular: true, currency: 'OMR' },
  { id: 'bh', name: 'Bahrain', code: 'BH', flag: '🇧🇭', region: 'Gulf', active: true, popular: true, currency: 'BHD' },
  { id: 'ro', name: 'Romania', code: 'RO', flag: '🇷🇴', region: 'Europe', active: true, popular: true, currency: 'EUR' },
  { id: 'hr', name: 'Croatia', code: 'HR', flag: '🇭🇷', region: 'Europe', active: true, popular: true, currency: 'EUR' },
  { id: 'pl', name: 'Poland', code: 'PL', flag: '🇵🇱', region: 'Europe', active: true, popular: true, currency: 'EUR' },
  { id: 'de', name: 'Germany', code: 'DE', flag: '🇩🇪', region: 'Europe', active: true, popular: true, currency: 'EUR' },
  { id: 'it', name: 'Italy', code: 'IT', flag: '🇮🇹', region: 'Europe', active: true, popular: false, currency: 'EUR' },
  { id: 'pt', name: 'Portugal', code: 'PT', flag: '🇵🇹', region: 'Europe', active: true, popular: false, currency: 'EUR' },
  { id: 'my', name: 'Malaysia', code: 'MY', flag: '🇲🇾', region: 'Asia', active: true, popular: true, currency: 'MYR' },
  { id: 'sg', name: 'Singapore', code: 'SG', flag: '🇸🇬', region: 'Asia', active: true, popular: true, currency: 'SGD' },
  { id: 'in', name: 'India', code: 'IN', flag: '🇮🇳', region: 'Asia', active: true, popular: false, currency: 'INR' },
];

// Seed Categories
export const INITIAL_CATEGORIES: JobCategory[] = [
  { id: 'wh-labour', name: 'Warehouse Labour', iconName: 'Package', active: true, jobCount: 4 },
  { id: 'driver-heavy', name: 'Heavy Vehicle Driver', iconName: 'Truck', active: true, jobCount: 3 },
  { id: 'driver-light', name: 'Light Vehicle Driver', iconName: 'Car', active: true, jobCount: 3 },
  { id: 'bike-rider', name: 'Bike Rider / Delivery', iconName: 'Bike', active: true, jobCount: 2 },
  { id: 'electrician', name: 'Electrician', iconName: 'Zap', active: true, jobCount: 2 },
  { id: 'plumber', name: 'Plumber', iconName: 'Wrench', active: true, jobCount: 2 },
  { id: 'welder', name: 'Welder', iconName: 'Flame', active: true, jobCount: 2 },
  { id: 'technician', name: 'Technician', iconName: 'Cpu', active: true, jobCount: 3 },
  { id: 'mechanic', name: 'Mechanic', iconName: 'Settings', active: true, jobCount: 1 },
  { id: 'hotel-staff', name: 'Hotel Staff', iconName: 'Building', active: true, jobCount: 3 },
  { id: 'restaurant-staff', name: 'Restaurant Staff', iconName: 'Utensils', active: true, jobCount: 2 },
  { id: 'cook', name: 'Cook', iconName: 'Coffee', active: true, jobCount: 2 },
  { id: 'waiter', name: 'Waiter', iconName: 'GlassWater', active: true, jobCount: 2 },
  { id: 'housekeeping', name: 'Housekeeping', iconName: 'Sparkles', active: true, jobCount: 2 },
  { id: 'security-guard', name: 'Security Guard', iconName: 'Shield', active: true, jobCount: 2 },
  { id: 'construction', name: 'Construction Worker', iconName: 'HardHat', active: true, jobCount: 3 },
  { id: 'helper', name: 'Helper', iconName: 'UserCheck', active: true, jobCount: 2 },
  { id: 'cleaner', name: 'Cleaner', iconName: 'Brush', active: true, jobCount: 1 },
  { id: 'factory-worker', name: 'Factory Worker', iconName: 'Factory', active: true, jobCount: 3 },
  { id: 'office-assistant', name: 'Office Assistant', iconName: 'Briefcase', active: true, jobCount: 1 },
  { id: 'accountant', name: 'Accountant', iconName: 'Calculator', active: true, jobCount: 1 },
  { id: 'engineer', name: 'Engineer', iconName: 'Compass', active: true, jobCount: 1 },
  { id: 'healthcare', name: 'Healthcare', iconName: 'HeartPulse', active: true, jobCount: 1 },
  { id: 'it-jobs', name: 'IT Jobs', iconName: 'Monitor', active: true, jobCount: 1 },
  { id: 'salesman', name: 'Salesman', iconName: 'ShoppingBag', active: true, jobCount: 1 },
  { id: 'skilled', name: 'Skilled Jobs', iconName: 'Award', active: true, jobCount: 4 },
  { id: 'unskilled', name: 'Unskilled Jobs', iconName: 'Users', active: true, jobCount: 5 },
];

// Seed Jobs with High-Definition Vacancy Posters & Complete Real Details
export const INITIAL_JOBS: Job[] = [
  {
    id: 'RJ-JOB-101',
    title: 'Warehouse Labour & Material Handler',
    countryId: 'sa',
    countryName: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    city: 'Riyadh & Dammam',
    employerName: 'Al-Marai Logistics Group KSA',
    employerDetails: 'Leading supply chain & logistics company in the GCC region with modern automated warehouses.',
    categoryId: 'wh-labour',
    categoryName: 'Warehouse Labour',
    vacancyCount: 100,
    salaryAmount: 1300,
    salaryCurrency: 'SAR',
    salaryPeriod: 'Month',
    overtimeDetails: 'Overtime 2-3 hours daily available (1.5x basic rate). Average monthly earning 1700 - 1900 SAR.',
    foodFacility: 'Provided by Company or Food Allowance 300 SAR',
    accommodation: 'Free Company Accommodation with AC & Wi-Fi',
    transportation: 'Free Company Bus to and from work site',
    medicalInsurance: 'Provided as per Saudi Labor Law (Class A Insurance)',
    dutyHours: '8 Hours Daily',
    weeklyHoliday: '1 Day (Friday)',
    contractDuration: '2 Years (Renewable with return ticket)',
    experienceRequirements: 'Freshers or 1+ year warehouse/loading experience. Able to lift boxes and operate hand pallet.',
    educationRequirements: 'Minimum 10th Pass / High School',
    languageRequirements: 'Basic English or Hindi (Arabic is a plus)',
    ageRequirements: '21 - 38 Years',
    passportRequirements: 'ECR & ECNR both accepted',
    selectionMethod: 'Zoom Interview',
    requiredDocuments: ['Valid Passport (Min 1.5 yrs validity)', 'Updated Bio-Data / Resume', 'White Background Photos (8 copies)', 'Police Clearance Certificate (PCC)'],
    description: 'Urgent requirement for Al-Marai Logistics Group in Riyadh. Candidate will manage loading, unloading, barcode scanning, packing, and pallet organizing in central FMCG warehouse. Fast visa processing and immediate deployment within 25 days.',
    posterImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: true,
    urgent: true,
    createdAt: '2026-10-25T10:00:00Z',
    updatedAt: '2026-10-30T14:30:00Z',
    applicationDeadline: '2026-11-20',
    interviewDate: '2026-11-10',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 1420,
    applicationsCount: 48,
  },
  {
    id: 'RJ-JOB-102',
    title: 'Hotel Waiter & Food Servers',
    countryId: 'ae',
    countryName: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    city: 'Dubai Marina & Downtown',
    employerName: 'Grand Hyatt & Luxury Resorts Dubai',
    employerDetails: '5-Star premier international hospitality chain operating across Dubai and Abu Dhabi.',
    categoryId: 'waiter',
    categoryName: 'Waiter',
    vacancyCount: 45,
    salaryAmount: 1800,
    salaryCurrency: 'AED',
    salaryPeriod: 'Month',
    overtimeDetails: 'Tips & service charges shared monthly + paid overtime during banquet events.',
    foodFacility: '3 Duty Meals Provided daily in Hotel Cafeteria',
    accommodation: 'Free luxury shared staff accommodation with gym and swimming pool',
    transportation: 'Free Air-Conditioned Shuttle bus',
    medicalInsurance: 'Comprehensive UAE Health Insurance covered 100%',
    dutyHours: '9 Hours (including 1 hr break)',
    weeklyHoliday: '1 Day Rotational Off',
    contractDuration: '2 Years (Renewable + Annual paid vacation with flight ticket)',
    experienceRequirements: 'Minimum 1 year in restaurant, banquet, or hotel dining service. Pleasant grooming and posture.',
    educationRequirements: '12th Pass or Hotel Management Certificate',
    languageRequirements: 'Good spoken English is mandatory. Hindi / Arabic helpful.',
    ageRequirements: '20 - 32 Years',
    passportRequirements: 'ECNR Only',
    selectionMethod: 'Direct Client Interview',
    requiredDocuments: ['Passport Copy', 'Full-length Professional Photo in formal suit', 'Hospitality Resume', 'Experience Certificate'],
    description: 'Prestigious hospitality hiring for Grand Hyatt Dubai. Front-of-house food servers, taking orders, serving international guests with top etiquette. Excellent career progression, monthly tips averaging 600-1000 AED extra, free uniform and laundry.',
    posterImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: true,
    urgent: false,
    createdAt: '2026-10-27T08:00:00Z',
    updatedAt: '2026-10-31T09:15:00Z',
    applicationDeadline: '2026-11-25',
    interviewDate: '2026-11-12',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 2150,
    applicationsCount: 72,
  },
  {
    id: 'RJ-JOB-103',
    title: 'Heavy Trailer & Trailer Dump Driver',
    countryId: 'sa',
    countryName: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    city: 'Jubail & Yanbu Industrial',
    employerName: 'Bin Laden Transport & Contracting',
    employerDetails: 'One of the largest heavy transport and infrastructure conglomerates in the Kingdom.',
    categoryId: 'driver-heavy',
    categoryName: 'Heavy Vehicle Driver',
    vacancyCount: 35,
    salaryAmount: 2400,
    salaryCurrency: 'SAR',
    salaryPeriod: 'Month',
    overtimeDetails: 'Trip allowances + Overtime. Drivers earn 3000 to 3600 SAR monthly with trip bonuses.',
    foodFacility: 'Self Cooking facility in camp or 300 SAR Food Allowance',
    accommodation: 'Free Company Camp with modern kitchen and cooling facilities',
    transportation: 'Provided by company',
    medicalInsurance: 'Company Medical Card provided',
    dutyHours: '8 Hours (Overtime for long trips)',
    weeklyHoliday: '1 Day Off',
    contractDuration: '2 Years',
    experienceRequirements: 'Must have Valid or Expired Saudi Heavy Driving License OR GCC Heavy License.',
    educationRequirements: 'Basic Education / Able to read road signs and GPS',
    languageRequirements: 'Basic Arabic or Hindi',
    ageRequirements: '24 - 45 Years',
    passportRequirements: 'ECR & ECNR both accepted',
    selectionMethod: 'Trade Test',
    requiredDocuments: ['Original GCC License / Saudi License copy', 'Indian Heavy Driving License', 'Passport Copy', 'Driving Experience Certificate'],
    description: 'Urgent demand for Heavy Drivers for Mercedes Actros and Volvo 40-ton trailers. Driving routes between Jubail, Dammam, and Riyadh. Immediate visa issuance and flight from Mumbai / Lucknow / Delhi.',
    posterImageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: false,
    urgent: true,
    createdAt: '2026-10-24T12:00:00Z',
    updatedAt: '2026-10-30T16:00:00Z',
    applicationDeadline: '2026-11-15',
    interviewDate: '2026-11-08',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 1890,
    applicationsCount: 39,
  },
  {
    id: 'RJ-JOB-104',
    title: 'Industrial & Building Electrician',
    countryId: 'qa',
    countryName: 'Qatar',
    countryFlag: '🇶🇦',
    city: 'Doha & Lusail City',
    employerName: 'Al-Jaber Engineering W.L.L',
    employerDetails: 'Grade A Main Contractor executing luxury commercial high-rises and metro substations.',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    vacancyCount: 30,
    salaryAmount: 1600,
    salaryCurrency: 'QAR',
    salaryPeriod: 'Month',
    overtimeDetails: 'Compulsory 2 hours overtime daily guaranteed (1.25x - 1.5x rate). Expected monthly: 2100 QAR.',
    foodFacility: 'Free Mess Food (Breakfast, Lunch & Dinner provided by catering)',
    accommodation: 'Free AC Accommodation with laundry facilities',
    transportation: 'Free Company Transportation',
    medicalInsurance: 'Hamad Health Card covered by company',
    dutyHours: '8 Hours + 2 Hours Overtime',
    weeklyHoliday: 'Friday Off',
    contractDuration: '2 Years',
    experienceRequirements: 'Minimum 2 years experience in conduit piping, cable pulling, DB termination, and lighting circuits.',
    educationRequirements: 'ITI Electrician or 10th Pass with trade practical experience',
    languageRequirements: 'Basic English or Hindi',
    ageRequirements: '22 - 40 Years',
    passportRequirements: 'ECR & ECNR both accepted',
    selectionMethod: 'Client Interview & Trade Test',
    requiredDocuments: ['ITI Certificate / Diploma', 'Trade Test Report if any', 'Experience letter', 'Passport (Min 2 years valid)'],
    description: 'Recruitment camp for Doha metro residential towers project. Cable laying, DB dressing, panel board wiring, conduit installation. Free mess food with Indian cooks. No hidden charges, employment visa provided.',
    posterImageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: true,
    urgent: true,
    createdAt: '2026-10-26T11:00:00Z',
    updatedAt: '2026-10-31T05:00:00Z',
    applicationDeadline: '2026-11-18',
    interviewDate: '2026-11-11',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 1630,
    applicationsCount: 42,
  },
  {
    id: 'RJ-JOB-105',
    title: 'Food Packaging & Warehouse Worker (Europe)',
    countryId: 'ro',
    countryName: 'Romania',
    countryFlag: '🇷🇴',
    city: 'Bucharest & Cluj-Napoca',
    employerName: 'Transylvania Agro-Food Processing SA',
    employerDetails: 'European Union registered food production and export facility supplying supermarkets across Europe.',
    categoryId: 'factory-worker',
    categoryName: 'Factory Worker',
    vacancyCount: 50,
    salaryAmount: 750,
    salaryCurrency: 'EUR',
    salaryPeriod: 'Month',
    overtimeDetails: 'Overtime 20-30 hours per month at 150% rate. Net monthly take-home 900 - 1050 EUR (~80,000 to 95,000 INR).',
    foodFacility: '1 Hot meal provided on duty + 150 EUR monthly food voucher',
    accommodation: 'Clean European standard apartments (2-3 persons per room, heating, Wi-Fi)',
    transportation: 'Subsidized metro / tram pass or company bus',
    medicalInsurance: 'Full Romanian National Health Insurance (CNAS) & EU Blue Card eligibility after residency',
    dutyHours: '8 Hours (Monday to Friday)',
    weeklyHoliday: 'Saturday & Sunday (2 Days Weekend)',
    contractDuration: '2 Years Work Permit (Extendable, Pathway to EU Permanent Residency)',
    experienceRequirements: 'No prior experience required; on-the-job training in hygienic food packaging provided.',
    educationRequirements: '10th / 12th Pass',
    languageRequirements: 'Basic conversational English is beneficial',
    ageRequirements: '21 - 42 Years',
    passportRequirements: 'Valid Passport for at least 3 years',
    selectionMethod: 'CV Selection & Video Introduction',
    requiredDocuments: ['Apostilled Police Clearance Certificate', 'Passport copy with all stamped pages', 'Medical Fitness Certificate', 'CV in Europass format'],
    description: 'Golden opportunity for legal employment in the European Union (Romania). Automatic Schengen mobility rights, 2-year work permit with legal contract, salary paid in Euros directly to European bank account. Ideal for hard-working candidates seeking European career growth.',
    posterImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: true,
    urgent: false,
    createdAt: '2026-10-22T09:00:00Z',
    updatedAt: '2026-10-30T10:00:00Z',
    applicationDeadline: '2026-11-30',
    interviewDate: '2026-11-15',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 3410,
    applicationsCount: 115,
  },
  {
    id: 'RJ-JOB-106',
    title: 'Food Delivery Bike Rider',
    countryId: 'ae',
    countryName: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    city: 'Dubai & Sharjah',
    employerName: 'Talabat & Deliveroo Logistics Partner',
    employerDetails: 'Premier delivery fleet operator providing bikes, fuel, insurance, and visa sponsorship in UAE.',
    categoryId: 'bike-rider',
    categoryName: 'Bike Rider / Delivery',
    vacancyCount: 80,
    salaryAmount: 2500,
    salaryCurrency: 'AED',
    salaryPeriod: 'Month',
    overtimeDetails: 'Commission per delivery (7-9 AED per order above target). Top riders earn 3500 - 4500 AED monthly.',
    foodFacility: 'Self Cooking facilities in shared hostel',
    accommodation: 'Company accommodation available or 500 AED HRA',
    transportation: 'Company provides motorcycle, petrol card, helmet, and maintenance',
    medicalInsurance: 'Accident insurance and medical coverage fully provided',
    dutyHours: 'Flexible 10 Hours shift',
    weeklyHoliday: '1 Day Flexible Off',
    contractDuration: '2 Years Visa',
    experienceRequirements: 'Valid Indian 2-Wheeler Driving License (min 1 yr old). UAE motorcycle license training provided.',
    educationRequirements: 'Minimum 10th Pass, must be able to use smartphone GPS apps',
    languageRequirements: 'Basic English & Hindi',
    ageRequirements: '21 - 35 Years',
    passportRequirements: 'ECR & ECNR both accepted',
    selectionMethod: 'CV Selection & Phone Verification',
    requiredDocuments: ['Indian Motorcycle Driving License', 'Passport Copy', 'Aadhaar Card', 'Passport size photographs'],
    description: 'High earning potential in Dubai for dynamic bike riders! Free motorcycle provided with full fuel and maintenance covered. Quick 2-year employment visa with Emirates ID. Riders earn up to 4500 AED with commissions.',
    posterImageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: false,
    urgent: true,
    createdAt: '2026-10-28T14:00:00Z',
    updatedAt: '2026-10-31T06:30:00Z',
    applicationDeadline: '2026-11-20',
    interviewDate: '2026-11-09',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 2890,
    applicationsCount: 88,
  },
  {
    id: 'RJ-JOB-107',
    title: 'MIG / TIG Welder & Pipe Fabricator',
    countryId: 'kw',
    countryName: 'Kuwait',
    countryFlag: '🇰🇼',
    city: 'Shuaiba & Ahmadi Oil Sector',
    employerName: 'Kuwait National Petroleum Service Co.',
    employerDetails: 'Specialized oilfield service provider handling pipeline fabrication and refinery maintenance.',
    categoryId: 'welder',
    categoryName: 'Welder',
    vacancyCount: 25,
    salaryAmount: 210,
    salaryCurrency: 'KWD',
    salaryPeriod: 'Month',
    overtimeDetails: 'High overtime in refinery shutdowns (regularly 40-50 hours/mo). Earn up to 280-320 KWD.',
    foodFacility: 'Free Food provided in camp mess',
    accommodation: 'Free AC Company Accommodation',
    transportation: 'Free Air-Conditioned Transportation',
    medicalInsurance: 'Kuwait Ministry of Health Card Provided',
    dutyHours: '8 Hours Daily',
    weeklyHoliday: 'Friday Off',
    contractDuration: '2 Years',
    experienceRequirements: 'Minimum 3 years in 6G Pipe Welding or TIG/ARC welding in refinery or shipyard.',
    educationRequirements: 'ITI Welder or Trade Certification',
    languageRequirements: 'Hindi or Basic English',
    ageRequirements: '23 - 44 Years',
    passportRequirements: 'ECR & ECNR both accepted',
    selectionMethod: 'Trade Test (Plate & Pipe 6G)',
    requiredDocuments: ['Welder Qualification Test (WQR) certificates', 'Experience certificates', 'Passport', 'Photos'],
    description: 'Direct recruitment for Kuwait Oil and Gas maintenance project. Candidates must pass 6G TIG and ARC pipe welding test. Free food, free accommodation, visa and ticket provided. High savings opportunity with strong Kuwaiti Dinar currency value.',
    posterImageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: false,
    urgent: false,
    createdAt: '2026-10-23T15:00:00Z',
    updatedAt: '2026-10-29T12:00:00Z',
    applicationDeadline: '2026-11-22',
    interviewDate: '2026-11-14',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 1470,
    applicationsCount: 31,
  },
  {
    id: 'RJ-JOB-108',
    title: 'Hospitality Housekeeping & Cleaning Specialist',
    countryId: 'hr',
    countryName: 'Croatia',
    countryFlag: '🇭🇷',
    city: 'Dubrovnik & Split Coast',
    employerName: 'Adriatic Coastal Hotels Group d.d.',
    employerDetails: 'Premier Mediterranean seaside boutique resort chain welcoming international travelers.',
    categoryId: 'housekeeping',
    categoryName: 'Housekeeping',
    vacancyCount: 35,
    salaryAmount: 850,
    salaryCurrency: 'EUR',
    salaryPeriod: 'Month',
    overtimeDetails: 'Paid overtime during peak season with bonuses. Tips distributed weekly.',
    foodFacility: 'Free 3 Meals daily in resort staff restaurant',
    accommodation: 'Free modern staff villa near the beach (max 2 per room)',
    transportation: 'Walking distance to resort or free bicycle/pass provided',
    medicalInsurance: 'Croatia National Health (HZZO) full coverage',
    dutyHours: '8 Hours (Rotational shifts)',
    weeklyHoliday: '1-2 Days Off per week',
    contractDuration: '1-2 Years Renewable Work Permit',
    experienceRequirements: 'Minimum 6 months in housekeeping, room cleaning, or facility maintenance.',
    educationRequirements: '10th Pass or 12th Pass',
    languageRequirements: 'Basic conversational English',
    ageRequirements: '21 - 40 Years',
    passportRequirements: 'Passport with at least 2.5 years remaining',
    selectionMethod: 'Zoom Interview',
    requiredDocuments: ['Police Clearance Certificate', 'Passport Copy', 'CV with references', 'Medical Report'],
    description: 'Work in one of the most picturesque coastal regions of Europe (Croatia, Schengen Zone). Free food and beachfront staff accommodation, friendly international team, legally registered Croatian contract with social security and pension contribution.',
    posterImageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: true,
    urgent: true,
    createdAt: '2026-10-29T10:00:00Z',
    updatedAt: '2026-10-31T07:00:00Z',
    applicationDeadline: '2026-11-28',
    interviewDate: '2026-11-16',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 2310,
    applicationsCount: 64,
  },
  {
    id: 'RJ-JOB-109',
    title: 'Construction Helper & Mason',
    countryId: 'om',
    countryName: 'Oman',
    countryFlag: '🇴🇲',
    city: 'Muscat & Salalah',
    employerName: 'Galfar Engineering & Contracting SAOG',
    employerDetails: 'Largest multi-disciplinary engineering and construction company in the Sultanate of Oman.',
    categoryId: 'construction',
    categoryName: 'Construction Worker',
    vacancyCount: 60,
    salaryAmount: 140,
    salaryCurrency: 'OMR',
    salaryPeriod: 'Month',
    overtimeDetails: 'Overtime 2 hours daily + Friday duty options. Total earning 180 - 210 OMR (~39,000 to 45,000 INR).',
    foodFacility: 'Free Mess Food (Indian North/South meals)',
    accommodation: 'Free AC Labor Camp with recreation area',
    transportation: 'Free Company Buses',
    medicalInsurance: 'Provided free by company',
    dutyHours: '8 Hours + Overtime',
    weeklyHoliday: 'Friday Off',
    contractDuration: '2 Years',
    experienceRequirements: 'Freshers or experienced construction helpers, block work, plastering, shuttering assistance.',
    educationRequirements: 'No formal educational requirement',
    languageRequirements: 'Hindi / Bhojpuri / Bengali / Urdu',
    ageRequirements: '20 - 42 Years',
    passportRequirements: 'ECR & ECNR both accepted',
    selectionMethod: 'CV Selection',
    requiredDocuments: ['Valid Passport', 'Passport Size Photos', 'Aadhaar Card'],
    description: 'Direct visa demand for Galfar Oman. Commercial township project in Muscat. Zero service cheating, salary deposited on 1st of every month into Bank Muscat account, free air ticket provided by company.',
    posterImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: false,
    urgent: false,
    createdAt: '2026-10-21T07:00:00Z',
    updatedAt: '2026-10-29T11:00:00Z',
    applicationDeadline: '2026-11-19',
    interviewDate: '2026-11-05',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 1120,
    applicationsCount: 28,
  },
  {
    id: 'RJ-JOB-110',
    title: 'Light Vehicle (Car & Van) Driver',
    countryId: 'qa',
    countryName: 'Qatar',
    countryFlag: '🇶🇦',
    city: 'Doha City',
    employerName: 'Karwa & Al-Maha Limousine Services',
    employerDetails: 'Premier transport partner for corporate executives, airport transfers, and private families.',
    categoryId: 'driver-light',
    categoryName: 'Light Vehicle Driver',
    vacancyCount: 40,
    salaryAmount: 1900,
    salaryCurrency: 'QAR',
    salaryPeriod: 'Month',
    overtimeDetails: 'Duty tips + trip bonuses. Drivers average 2500 - 3000 QAR monthly.',
    foodFacility: 'Food Allowance 300 QAR included or Mess facility',
    accommodation: 'Free Company Accommodation',
    transportation: 'Company Vehicle Provided',
    medicalInsurance: 'Hamad Medical Corporation Card',
    dutyHours: '9 Hours',
    weeklyHoliday: '1 Day Off',
    contractDuration: '2 Years',
    experienceRequirements: 'Valid Qatar Driving License OR Valid Indian Driving License (min 2 years old).',
    educationRequirements: '10th Pass, must be able to use Google Maps / Waze',
    languageRequirements: 'Basic English & Hindi',
    ageRequirements: '23 - 42 Years',
    passportRequirements: 'ECR & ECNR both accepted',
    selectionMethod: 'Driving Test & Client Interview',
    requiredDocuments: ['Original Driving License', 'Passport Copy', 'Experience Letter', 'Photos'],
    description: 'Chauffeur and airport pickup driver positions for Al-Maha Doha. Driving modern Toyota Camry and Innova vehicles. Clean driving record required, courteous personality, free uniform provided.',
    posterImageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    additionalImageUrls: [],
    verificationStatus: 'Verified',
    publicationStatus: 'Published',
    featured: true,
    urgent: false,
    createdAt: '2026-10-27T13:00:00Z',
    updatedAt: '2026-10-31T04:00:00Z',
    applicationDeadline: '2026-11-24',
    interviewDate: '2026-11-13',
    createdBy: 'Rizoo Travel Agency Admin',
    viewsCount: 1940,
    applicationsCount: 52,
  }
];

// Seed Applications
export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'RJ-2026-8921',
    jobId: 'RJ-JOB-101',
    jobTitle: 'Warehouse Labour & Material Handler',
    countryName: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    employerName: 'Al-Marai Logistics Group KSA',
    userId: 'user-demo-1',
    applicantName: 'Mohd Rehan Khan',
    mobileNumber: '9839123456',
    email: 'rehan.khan98@gmail.com',
    dob: '1998-06-15',
    currentCity: 'Maharajganj',
    state: 'Uttar Pradesh',
    nationality: 'Indian',
    passportAvailable: 'Yes',
    passportNumber: 'Z5849102',
    passportExpiryDate: '2031-08-20',
    education: '12th Pass (Intermediate)',
    workExperience: '2 years warehouse helper in Gorakhpur wholesale market',
    skills: 'Loading, Pallet Jack handling, basic inventory counting',
    preferredJob: 'Warehouse Labour',
    preferredCountry: 'Saudi Arabia',
    resumeFileName: 'Rehan_Khan_CV_2026.pdf',
    resumeDataUrl: '',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    additionalInfo: 'Available for immediate departure. Valid passport ready.',
    applicationStatus: 'Interview Scheduled',
    submittedAt: '2026-10-26T14:20:00Z',
    updatedAt: '2026-10-29T10:00:00Z',
    interviewDetails: {
      date: '2026-11-10',
      time: '11:30 AM IST',
      type: 'Zoom',
      meetingLinkOrLocation: 'https://zoom.us/j/8839210492?pwd=RIZOOJOB',
      instructions: 'Please be dressed in a neat collared shirt. Keep your original passport and 12th marksheet ready for video inspection.',
    },
    publicRemarks: 'Your application has been shortlisted by the recruitment team. Please join the Zoom meeting 10 minutes prior to scheduled time.',
    internalNotes: 'Strong physical build, polite communication. Recommended for final selection.',
    consentAccepted: true,
  },
  {
    id: 'RJ-2026-9044',
    jobId: 'RJ-JOB-102',
    jobTitle: 'Hotel Waiter & Food Servers',
    countryName: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    employerName: 'Grand Hyatt & Luxury Resorts Dubai',
    userId: 'user-demo-1',
    applicantName: 'Mohd Rehan Khan',
    mobileNumber: '9839123456',
    email: 'rehan.khan98@gmail.com',
    dob: '1998-06-15',
    currentCity: 'Maharajganj',
    state: 'Uttar Pradesh',
    nationality: 'Indian',
    passportAvailable: 'Yes',
    passportNumber: 'Z5849102',
    passportExpiryDate: '2031-08-20',
    education: '12th Pass (Intermediate)',
    workExperience: '1 year server at local banquet hall',
    skills: 'Table serving, English speaking, polite communication',
    preferredJob: 'Waiter',
    preferredCountry: 'United Arab Emirates',
    resumeFileName: 'Rehan_Khan_CV_2026.pdf',
    applicationStatus: 'Under Review',
    submittedAt: '2026-10-28T09:10:00Z',
    updatedAt: '2026-10-29T11:00:00Z',
    publicRemarks: 'Application documents received and forwarded to HR client team for assessment.',
    internalNotes: 'Check English fluency test score before client interview.',
    consentAccepted: true,
  },
  {
    id: 'RJ-2026-7812',
    jobId: 'RJ-JOB-105',
    jobTitle: 'Food Packaging & Warehouse Worker (Europe)',
    countryName: 'Romania',
    countryFlag: '🇷🇴',
    employerName: 'Transylvania Agro-Food Processing SA',
    userId: 'user-sample-2',
    applicantName: 'Amit Kumar Verma',
    mobileNumber: '9792001122',
    email: 'amit.verma89@yahoo.com',
    dob: '1994-03-22',
    currentCity: 'Lucknow',
    state: 'Uttar Pradesh',
    nationality: 'Indian',
    passportAvailable: 'Yes',
    passportNumber: 'M2938172',
    passportExpiryDate: '2030-05-14',
    education: 'Graduate (B.A)',
    workExperience: '3 years factory packing experience in food industry',
    skills: 'Conveyor packaging, quality inspection, machine operations',
    preferredJob: 'Factory Worker',
    preferredCountry: 'Romania',
    resumeFileName: 'Amit_Verma_Europass_CV.pdf',
    applicationStatus: 'Selected',
    submittedAt: '2026-10-23T11:00:00Z',
    updatedAt: '2026-10-30T16:00:00Z',
    publicRemarks: 'Congratulations! You have been selected for the Romanian Food Packaging project. Your work permit application has been submitted to the Romanian Immigration Bureau.',
    internalNotes: 'Work permit filing in progress. Expected permit receipt in 45 days.',
    consentAccepted: true,
  }
];

// Seed Banners
export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'b-1',
    title: 'Urgent Gulf Recruitment 2026',
    subtitle: '100+ Warehouse & Logistics Jobs in Saudi Arabia (Immediate Visa)',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    targetCategoryOrCountry: 'sa',
    badgeText: 'HOT DEMAND',
    active: true,
    order: 1,
  },
  {
    id: 'b-2',
    title: 'Europe Work Permit Opportunities',
    subtitle: 'Romania & Croatia 2-Year Legal Contracts with High Savings in Euros',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    targetCategoryOrCountry: 'ro',
    badgeText: 'EU WORK PERMIT',
    active: true,
    order: 2,
  },
  {
    id: 'b-3',
    title: 'Dubai Hospitality & Delivery Jobs',
    subtitle: 'Earn up to 4500 AED with Company Bike & Free Food/Accommodation',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    targetCategoryOrCountry: 'ae',
    badgeText: 'FREE TICKETS',
    active: true,
    order: 3,
  }
];

// Seed Announcements
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Client Interview Camp: Saudi Arabia Warehouse Project',
    description: 'Direct Zoom & Trade interviews for Al-Marai Logistics Group will be held on 10th November 2026 at Rizoo Travel Agency, Maharajganj office. Please bring your original passport and 8 white background photographs.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-10-30T10:00:00Z',
    expiryDate: '2026-11-12',
    active: true,
    priority: 'High',
  },
  {
    id: 'anc-2',
    title: 'Important Notice on Police Clearance Certificate (PCC)',
    description: 'All candidates applying for Europe (Romania, Poland, Croatia) must apply for their PCC at the nearest Passport Seva Kendra at least 4 weeks in advance for apostille attestation.',
    publishedAt: '2026-10-28T12:00:00Z',
    active: true,
    priority: 'Normal',
  },
  {
    id: 'anc-3',
    title: 'Beware of Fraudulent Agents — Genuine Rizoo Job Transparency',
    description: 'Rizoo Travel Agency never charges any registration fees for searching jobs on our app. Verify all vacancy letters only through our official helpline 7007303250.',
    publishedAt: '2026-10-25T08:00:00Z',
    active: true,
    priority: 'High',
  }
];

// Seed Notifications
export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Interview Scheduled for Saudi Warehouse Project',
    message: 'Your Zoom interview for Warehouse Labour is confirmed for 10 Nov at 11:30 AM IST. Check My Applications for full details.',
    type: 'interview',
    relatedJobId: 'RJ-JOB-101',
    relatedApplicationId: 'RJ-2026-8921',
    createdAt: '2026-10-29T10:00:00Z',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'New Urgent Vacancy Published: 80 Bike Riders in Dubai',
    message: 'Earn 2500 - 4500 AED with company bike and fuel. Applications close soon!',
    type: 'urgent',
    relatedJobId: 'RJ-JOB-106',
    createdAt: '2026-10-28T14:05:00Z',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Application Status Updated: Grand Hyatt Dubai',
    message: 'Your application RJ-2026-9044 is now Under Review with the employer.',
    type: 'application',
    relatedJobId: 'RJ-JOB-102',
    relatedApplicationId: 'RJ-2026-9044',
    createdAt: '2026-10-29T11:00:00Z',
    read: true,
  }
];

// Seed App Settings
export const INITIAL_SETTINGS: AppSettings = {
  appName: 'RIZOO JOB',
  agencyName: 'Rizoo Travel Agency',
  contactNumber: '7007303250',
  whatsappNumber: '+917007303250',
  officeAddress: 'Dharampur Chauraha Se Pachrukhiya Bazar, Maharajganj, Uttar Pradesh, India',
  supportEmail: 'rizootravelagency@gmail.com',
  defaultCountry: 'sa',
  defaultCurrency: 'SAR',
  maintenanceMode: false,
  disclaimerText: 'Rizoo Travel Agency provides transparent and verified recruitment assistance. Employment visas and contracts are issued directly by accredited overseas employers in compliance with government regulations. We advise all candidates to verify job offers before making financial decisions.',
  autoExpireDays: 60,
  requirePassportForApply: false,
  allowJobResubmission: false,
};

// Seed Admin Users
export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@rizoojob.com',
    role: 'Super Admin',
    fullName: 'Rizoo Agency Master Admin',
    lastLogin: '2026-10-31T07:00:00Z',
    active: true,
  },
  {
    id: 'admin-2',
    username: 'recruiter',
    email: 'recruiter@rizoojob.com',
    role: 'Vacancy Manager',
    fullName: 'Overseas Vacancy Coordinator',
    lastLogin: '2026-10-30T15:30:00Z',
    active: true,
  }
];

// Seed Support Tickets
export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-501',
    userId: 'user-demo-1',
    userName: 'Mohd Rehan Khan',
    userPhone: '7007303250',
    userEmail: 'rehan.khan98@gmail.com',
    category: 'Application Query',
    relatedJobId: 'RJ-JOB-101',
    relatedJobTitle: 'Warehouse Labour & Material Handler',
    description: 'Sir, I have applied for the Saudi warehouse vacancy. Can I bring my police clearance certificate on the interview day?',
    status: 'Resolved',
    createdAt: '2026-10-27T16:00:00Z',
    adminReply: 'Yes Rehan, please bring your PCC along with 8 passport photos on the interview day.',
    resolvedAt: '2026-10-28T10:00:00Z',
  }
];

// Seed Audit Logs
export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    adminEmail: 'admin@rizoojob.com',
    adminRole: 'Super Admin',
    action: 'PUBLISH_VACANCY',
    targetType: 'Job',
    targetId: 'RJ-JOB-101',
    timestamp: '2026-10-25T10:00:00Z',
    details: 'Published Saudi Warehouse Labour (100 vacancies) with Verified badge',
  },
  {
    id: 'log-2',
    adminEmail: 'admin@rizoojob.com',
    adminRole: 'Super Admin',
    action: 'SCHEDULE_INTERVIEW',
    targetType: 'Application',
    targetId: 'RJ-2026-8921',
    timestamp: '2026-10-29T10:00:00Z',
    details: 'Scheduled Zoom interview for Mohd Rehan Khan on 10-Nov-2026',
  }
];

// Seed Demo User
export const INITIAL_USER: User = {
  id: 'user-demo-1',
  fullName: 'Mohd Rehan Khan',
  mobileNumber: '9839123456',
  email: 'rehan.khan98@gmail.com',
  preferredCategory: 'wh-labour',
  preferredCountry: 'sa',
  preferredSalaryRange: '1200 - 2000 SAR',
  city: 'Maharajganj',
  state: 'Uttar Pradesh',
  education: '12th Pass (Intermediate)',
  experience: '2 Years Warehouse and Material Handling',
  skills: ['Pallet Jack', 'Packing', 'Loading', 'Inventory Counting'],
  profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  resumeFileName: 'Rehan_Khan_CV_2026.pdf',
  registeredAt: '2026-10-20T12:00:00Z',
  status: 'Active',
  notificationSettings: {
    enabled: true,
    urgentJobs: true,
    preferredCountriesOnly: false,
    applicationUpdates: true,
  }
};

export class StorageService {
  private static get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch {
      return defaultValue;
    }
  }

  private static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save to localStorage (${key})`, e);
    }
  }

  // Initialize all storage with default seeds if empty
  public static init(): void {
    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
      this.set(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      this.set(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUNTRIES)) {
      this.set(STORAGE_KEYS.COUNTRIES, INITIAL_COUNTRIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      this.set(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BANNERS)) {
      this.set(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
      this.set(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      this.set(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      this.set(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_USERS)) {
      this.set(STORAGE_KEYS.ADMIN_USERS, INITIAL_ADMIN_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUPPORT_TICKETS)) {
      this.set(STORAGE_KEYS.SUPPORT_TICKETS, INITIAL_TICKETS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
      this.set(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.set(STORAGE_KEYS.USERS, [INITIAL_USER]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_JOBS)) {
      this.set(STORAGE_KEYS.SAVED_JOBS, ['RJ-JOB-101', 'RJ-JOB-105']);
    }
  }

  // Jobs CRUD
  public static getJobs(): Job[] {
    this.init();
    return this.get<Job[]>(STORAGE_KEYS.JOBS, INITIAL_JOBS);
  }

  public static getJobById(id: string): Job | undefined {
    return this.getJobs().find((j) => j.id === id);
  }

  public static saveJob(job: Job): void {
    const jobs = this.getJobs();
    const index = jobs.findIndex((j) => j.id === job.id);
    if (index >= 0) {
      jobs[index] = { ...job, updatedAt: new Date().toISOString() };
    } else {
      jobs.unshift({
        ...job,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    this.set(STORAGE_KEYS.JOBS, jobs);
  }

  public static deleteJob(id: string): void {
    const jobs = this.getJobs().filter((j) => j.id !== id);
    this.set(STORAGE_KEYS.JOBS, jobs);
  }

  // Applications CRUD
  public static getApplications(): Application[] {
    this.init();
    return this.get<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }

  public static getApplicationsByUserId(userId: string): Application[] {
    return this.getApplications().filter((a) => a.userId === userId);
  }

  public static saveApplication(application: Application): void {
    const apps = this.getApplications();
    const index = apps.findIndex((a) => a.id === application.id);
    if (index >= 0) {
      apps[index] = { ...application, updatedAt: new Date().toISOString() };
    } else {
      apps.unshift({
        ...application,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      // Increment applications count on job
      const jobs = this.getJobs();
      const jobIdx = jobs.findIndex((j) => j.id === application.jobId);
      if (jobIdx >= 0) {
        jobs[jobIdx].applicationsCount = (jobs[jobIdx].applicationsCount || 0) + 1;
        this.set(STORAGE_KEYS.JOBS, jobs);
      }
    }
    this.set(STORAGE_KEYS.APPLICATIONS, apps);
  }

  public static deleteApplication(id: string): void {
    const apps = this.getApplications().filter((a) => a.id !== id);
    this.set(STORAGE_KEYS.APPLICATIONS, apps);
  }

  // Users
  public static getUsers(): User[] {
    this.init();
    return this.get<User[]>(STORAGE_KEYS.USERS, [INITIAL_USER]);
  }

  public static saveUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.unshift(user);
    }
    this.set(STORAGE_KEYS.USERS, users);
  }

  // Current User Session
  public static getCurrentUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_USER);
  }

  public static setCurrentUser(user: User | null): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  // Saved Jobs
  public static getSavedJobIds(): string[] {
    return this.get<string[]>(STORAGE_KEYS.SAVED_JOBS, ['RJ-JOB-101', 'RJ-JOB-105']);
  }

  public static toggleSavedJob(jobId: string): boolean {
    const saved = this.getSavedJobIds();
    const exists = saved.includes(jobId);
    let updated: string[];
    if (exists) {
      updated = saved.filter((id) => id !== jobId);
    } else {
      updated = [jobId, ...saved];
    }
    this.set(STORAGE_KEYS.SAVED_JOBS, updated);
    return !exists;
  }

  // Countries & Categories
  public static getCountries(): Country[] {
    return this.get<Country[]>(STORAGE_KEYS.COUNTRIES, INITIAL_COUNTRIES);
  }

  public static saveCountries(countries: Country[]): void {
    this.set(STORAGE_KEYS.COUNTRIES, countries);
  }

  public static getCategories(): JobCategory[] {
    return this.get<JobCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  public static saveCategories(categories: JobCategory[]): void {
    this.set(STORAGE_KEYS.CATEGORIES, categories);
  }

  // Banners & Announcements
  public static getBanners(): Banner[] {
    return this.get<Banner[]>(STORAGE_KEYS.BANNERS, INITIAL_BANNERS);
  }

  public static saveBanners(banners: Banner[]): void {
    this.set(STORAGE_KEYS.BANNERS, banners);
  }

  public static getAnnouncements(): Announcement[] {
    return this.get<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }

  public static saveAnnouncements(announcements: Announcement[]): void {
    this.set(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
  }

  // Notifications
  public static getNotifications(): AppNotification[] {
    return this.get<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  public static saveNotifications(notifications: AppNotification[]): void {
    this.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  public static addNotification(notif: Omit<AppNotification, 'id' | 'createdAt'>): void {
    const list = this.getNotifications();
    const newNotif: AppNotification = {
      ...notif,
      id: 'notif-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    list.unshift(newNotif);
    this.set(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  // Support Tickets
  public static getTickets(): SupportTicket[] {
    return this.get<SupportTicket[]>(STORAGE_KEYS.SUPPORT_TICKETS, INITIAL_TICKETS);
  }

  public static saveTicket(ticket: SupportTicket): void {
    const tickets = this.getTickets();
    const idx = tickets.findIndex((t) => t.id === ticket.id);
    if (idx >= 0) {
      tickets[idx] = ticket;
    } else {
      tickets.unshift(ticket);
    }
    this.set(STORAGE_KEYS.SUPPORT_TICKETS, tickets);
  }

  // Audit Logs
  public static getAuditLogs(): AuditLog[] {
    return this.get<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  public static addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      ...log,
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    this.set(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 500));
  }

  // Settings
  public static getSettings(): AppSettings {
    return this.get<AppSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  public static saveSettings(settings: AppSettings): void {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  // Admin Session
  public static getCurrentAdmin(): AdminUser | null {
    return this.get<AdminUser | null>(STORAGE_KEYS.CURRENT_ADMIN, null);
  }

  public static setCurrentAdmin(admin: AdminUser | null): void {
    this.set(STORAGE_KEYS.CURRENT_ADMIN, admin);
  }

  public static getAdminPassword(): string {
    return this.get<string>(STORAGE_KEYS.ADMIN_PASSWORD, 'RizooAdmin2026!');
  }

  public static setAdminPassword(password: string): void {
    this.set(STORAGE_KEYS.ADMIN_PASSWORD, password);
  }

  public static getAdminUsers(): AdminUser[] {
    return this.get<AdminUser[]>(STORAGE_KEYS.ADMIN_USERS, INITIAL_ADMIN_USERS);
  }

  public static saveAdminUsers(admins: AdminUser[]): void {
    this.set(STORAGE_KEYS.ADMIN_USERS, admins);
  }

  // Onboarding
  public static isOnboardingDone(): boolean {
    return this.get<boolean>(STORAGE_KEYS.ONBOARDING_DONE, false);
  }

  public static setOnboardingDone(done: boolean): void {
    this.set(STORAGE_KEYS.ONBOARDING_DONE, done);
  }

  // Reset to initial seed
  public static resetToInitialData(): void {
    localStorage.clear();
    this.init();
  }
}
