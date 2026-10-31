import React, { useState, useEffect } from 'react';
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
} from './types';
import { StorageService } from './services/storage';

// Common Components
import { Header } from './components/common/Header';
import { BottomNav, TabType } from './components/common/BottomNav';

// Mobile Screens & Modals
import { SplashScreen } from './components/mobile/SplashScreen';
import { Onboarding } from './components/mobile/Onboarding';
import { HomeScreen } from './components/mobile/HomeScreen';
import { JobDetailsScreen } from './components/mobile/JobDetailsScreen';
import { SearchScreen } from './components/mobile/SearchScreen';
import { SavedJobsScreen } from './components/mobile/SavedJobsScreen';
import { MyApplicationsScreen } from './components/mobile/MyApplicationsScreen';
import { ProfileScreen } from './components/mobile/ProfileScreen';
import { CountryJobsScreen } from './components/mobile/CountryJobsScreen';
import { CategoryJobsScreen } from './components/mobile/CategoryJobsScreen';
import { ApplyModal } from './components/mobile/ApplyModal';
import { ApplicationSuccessModal } from './components/mobile/ApplicationSuccessModal';
import { NotificationsScreen } from './components/mobile/NotificationsScreen';
import { SupportScreen } from './components/mobile/SupportScreen';
import { AgencyContactModal } from './components/mobile/AgencyContactModal';
import { ShareJobModal } from './components/mobile/ShareJobModal';
import { LoginRegisterModal } from './components/mobile/LoginRegisterModal';
import { EditProfileModal } from './components/mobile/EditProfileModal';
import { PolicyModal } from './components/mobile/PolicyModal';

// Admin Components (Completely Standalone Portal)
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminVacancies } from './components/admin/AdminVacancies';
import { AdminApplications } from './components/admin/AdminApplications';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminCountriesCategories } from './components/admin/AdminCountriesCategories';
import { AdminBannersAnnouncements } from './components/admin/AdminBannersAnnouncements';
import { AdminNotifications } from './components/admin/AdminNotifications';
import { AdminSupport } from './components/admin/AdminSupport';
import { AdminReports } from './components/admin/AdminReports';
import { AdminStaffRoles } from './components/admin/AdminStaffRoles';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminAuditLogs } from './components/admin/AdminAuditLogs';

export default function App() {
  // Database Initialized State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<AppSettings>(StorageService.getSettings());
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  // Auth Sessions
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  // App Flow State
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [viewMode, setViewMode] = useState<'candidate' | 'admin'>('candidate');

  // Candidate Navigation
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);

  // Search Screen Parameters passed from Home
  const [searchParams, setSearchParams] = useState<{
    keyword?: string;
    country?: string;
    category?: string;
    specialFilter?: string;
  }>({});

  // Active Modals
  const [jobToApply, setJobToApply] = useState<Job | null>(null);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);
  const [jobToShare, setJobToShare] = useState<Job | null>(null);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'about' | null>(null);

  // Admin Active Tab
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Check URL on mount and whenever popstate changes
  useEffect(() => {
    StorageService.init();
    setJobs(StorageService.getJobs());
    setApplications(StorageService.getApplications());
    setUsers(StorageService.getUsers());
    setCountries(StorageService.getCountries());
    setCategories(StorageService.getCategories());
    setBanners(StorageService.getBanners());
    setAnnouncements(StorageService.getAnnouncements());
    setNotifications(StorageService.getNotifications());
    setSupportTickets(StorageService.getTickets());
    setAuditLogs(StorageService.getAuditLogs());
    setSettings(StorageService.getSettings());
    setAdminUsers(StorageService.getAdminUsers());
    setCurrentUser(StorageService.getCurrentUser());
    setCurrentAdmin(StorageService.getCurrentAdmin());
    setSavedJobIds(StorageService.getSavedJobIds());

    const checkAdminUrl = () => {
      if (typeof window !== 'undefined') {
        const hasAdminParam =
          window.location.search.includes('admin') ||
          window.location.hash.includes('admin') ||
          window.location.pathname.startsWith('/admin');
        if (hasAdminParam) {
          setViewMode('admin');
        } else {
          setViewMode('candidate');
        }
      }
    };

    checkAdminUrl();
    window.addEventListener('popstate', checkAdminUrl);

    const onboardingDone = StorageService.isOnboardingDone();
    if (!onboardingDone) {
      setShowOnboarding(true);
    }

    return () => window.removeEventListener('popstate', checkAdminUrl);
  }, []);

  const navigateToAdmin = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '?admin=true');
    }
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCustomerApp = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', window.location.pathname);
    }
    setViewMode('candidate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state to local storage when changed
  const handleSaveJob = (job: Job) => {
    StorageService.saveJob(job);
    const updated = StorageService.getJobs();
    setJobs(updated);
    StorageService.addAuditLog({
      adminEmail: currentAdmin?.email || 'admin@rizoojob.com',
      adminRole: currentAdmin?.role || 'Super Admin',
      action: 'SAVE_VACANCY',
      targetType: 'Job',
      targetId: job.id,
      details: `Saved vacancy ${job.title} (${job.countryName})`,
    });
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleDeleteJob = (jobId: string) => {
    StorageService.deleteJob(jobId);
    setJobs(StorageService.getJobs());
    StorageService.addAuditLog({
      adminEmail: currentAdmin?.email || 'admin@rizoojob.com',
      adminRole: currentAdmin?.role || 'Super Admin',
      action: 'DELETE_VACANCY',
      targetType: 'Job',
      targetId: jobId,
      details: `Deleted vacancy ID ${jobId}`,
    });
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleToggleSaveJob = (jobId: string) => {
    const isNowSaved = StorageService.toggleSavedJob(jobId);
    setSavedJobIds(StorageService.getSavedJobIds());
  };

  const handleApplySubmission = (
    appData: Omit<Application, 'id' | 'submittedAt' | 'updatedAt' | 'applicationStatus'>
  ) => {
    const newRefId = `RJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: Application = {
      ...appData,
      id: newRefId,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicationStatus: 'Submitted',
    };

    StorageService.saveApplication(newApp);
    setApplications(StorageService.getApplications());
    setJobs(StorageService.getJobs());

    // Add In-App notification
    StorageService.addNotification({
      userId: newApp.userId,
      title: 'Application Received: ' + newApp.jobTitle,
      message: `Your application (${newRefId}) has been successfully submitted to Rizoo Travel Agency.`,
      type: 'application',
      relatedJobId: newApp.jobId,
      relatedApplicationId: newRefId,
      read: false,
    });
    setNotifications(StorageService.getNotifications());

    setJobToApply(null);
    setSubmittedApp(newApp);
  };

  const handleUpdateApplication = (updated: Application) => {
    StorageService.saveApplication(updated);
    setApplications(StorageService.getApplications());
    StorageService.addAuditLog({
      adminEmail: currentAdmin?.email || 'admin@rizoojob.com',
      adminRole: currentAdmin?.role || 'Super Admin',
      action: 'UPDATE_APPLICATION_STATUS',
      targetType: 'Application',
      targetId: updated.id,
      details: `Updated ${updated.applicantName} status to ${updated.applicationStatus}`,
    });
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleWithdrawApplication = (appId: string) => {
    const app = applications.find((a) => a.id === appId);
    if (app) {
      const updated: Application = {
        ...app,
        applicationStatus: 'Withdrawn',
        updatedAt: new Date().toISOString(),
      };
      StorageService.saveApplication(updated);
      setApplications(StorageService.getApplications());
    }
  };

  const handleSendCandidateNotification = (userId: string, title: string, message: string) => {
    StorageService.addNotification({
      userId,
      title,
      message,
      type: 'application',
      read: false,
    });
    setNotifications(StorageService.getNotifications());
  };

  const handleBroadcastNotification = (notif: Omit<AppNotification, 'id' | 'createdAt'>) => {
    StorageService.addNotification(notif);
    setNotifications(StorageService.getNotifications());
    StorageService.addAuditLog({
      adminEmail: currentAdmin?.email || 'admin@rizoojob.com',
      adminRole: currentAdmin?.role || 'Super Admin',
      action: 'BROADCAST_NOTIFICATION',
      targetType: 'Notification',
      targetId: 'broadcast',
      details: `Dispatched push broadcast: "${notif.title}"`,
    });
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleSaveCountries = (newCountries: Country[]) => {
    StorageService.saveCountries(newCountries);
    setCountries(newCountries);
  };

  const handleSaveCategories = (newCategories: JobCategory[]) => {
    StorageService.saveCategories(newCategories);
    setCategories(newCategories);
  };

  const handleSaveBanners = (newBanners: Banner[]) => {
    StorageService.saveBanners(newBanners);
    setBanners(newBanners);
  };

  const handleSaveAnnouncements = (newAnnouncements: Announcement[]) => {
    StorageService.saveAnnouncements(newAnnouncements);
    setAnnouncements(newAnnouncements);
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    StorageService.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleSaveAdminUsers = (newAdmins: AdminUser[]) => {
    StorageService.saveAdminUsers(newAdmins);
    setAdminUsers(newAdmins);
  };

  const handleUpdateTicket = (ticket: SupportTicket) => {
    StorageService.saveTicket(ticket);
    setSupportTickets(StorageService.getTickets());
  };

  const handleCreateTicket = (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: 'TCK-' + Math.floor(100 + Math.random() * 900),
      createdAt: new Date().toISOString(),
      status: 'Open',
    };
    StorageService.saveTicket(newTicket);
    setSupportTickets(StorageService.getTickets());
  };

  const handleUserLogin = (user: User) => {
    StorageService.setCurrentUser(user);
    StorageService.saveUser(user);
    setCurrentUser(user);
    setUsers(StorageService.getUsers());
    setShowLoginModal(false);
  };

  const handleUserLogout = () => {
    StorageService.setCurrentUser(null);
    setCurrentUser(null);
  };

  const handleDeleteAccount = () => {
    if (currentUser) {
      handleUserLogout();
    }
  };

  const handleAdminLogin = (admin: AdminUser) => {
    StorageService.setCurrentAdmin(admin);
    setCurrentAdmin(admin);
  };

  const handleAdminLogout = () => {
    StorageService.setCurrentAdmin(null);
    setCurrentAdmin(null);
    navigateToCustomerApp();
  };

  const handleFinishSplash = () => {
    setShowSplash(false);
  };

  const handleFinishOnboarding = () => {
    StorageService.setOnboardingDone(true);
    setShowOnboarding(false);
  };

  const handleNavigateSearch = (
    query?: string,
    filterCountry?: string,
    filterCategory?: string,
    specialFilter?: string
  ) => {
    setSearchParams({
      keyword: query,
      country: filterCountry,
      category: filterCategory,
      specialFilter,
    });
    setSelectedJob(null);
    setSelectedCountry(null);
    setSelectedCategory(null);
    setCurrentTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const userApplications = currentUser
    ? applications.filter((a) => a.userId === currentUser.id)
    : [];
  const savedJobsList = jobs.filter((j) => savedJobIds.includes(j.id));
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const pendingApplicationsCount = applications.filter(
    (a) => a.applicationStatus === 'Submitted' || a.applicationStatus === 'Under Review'
  ).length;
  const openTicketsCount = supportTickets.filter((t) => t.status === 'Open').length;

  // Initial Splash Screen
  if (showSplash) {
    return <SplashScreen onFinish={handleFinishSplash} />;
  }

  // First-time Onboarding Carousel
  if (showOnboarding) {
    return <Onboarding onComplete={handleFinishOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 
        ====================================================================
        STANDALONE SEPARATE ADMIN PORTAL (Accessed strictly via ?admin=true or /admin)
        ====================================================================
      */}
      {viewMode === 'admin' ? (
        !currentAdmin ? (
          <AdminLogin
            onLoginSuccess={handleAdminLogin}
            onBackToApp={navigateToCustomerApp}
          />
        ) : (
          <AdminLayout
            currentTab={adminTab}
            onChangeTab={setAdminTab}
            adminUser={currentAdmin}
            onLogout={handleAdminLogout}
            onSwitchToMobileApp={navigateToCustomerApp}
            pendingApplicationsCount={pendingApplicationsCount}
            openTicketsCount={openTicketsCount}
          >
            {adminTab === 'dashboard' && (
              <AdminDashboard
                jobs={jobs}
                applications={applications}
                users={users}
                onNavigateTab={setAdminTab}
                onSelectApplication={(app) => {
                  setAdminTab('applications');
                }}
                onSelectJob={(job) => {
                  setAdminTab('vacancies');
                }}
              />
            )}

            {adminTab === 'vacancies' && (
              <AdminVacancies
                jobs={jobs}
                countries={countries}
                categories={categories}
                onSaveJob={handleSaveJob}
                onDeleteJob={handleDeleteJob}
                onPreviewJobInApp={(job) => {
                  setSelectedJob(job);
                  navigateToCustomerApp();
                }}
              />
            )}

            {adminTab === 'applications' && (
              <AdminApplications
                applications={applications}
                jobs={jobs}
                onUpdateApplication={handleUpdateApplication}
                onSendCandidateNotification={handleSendCandidateNotification}
              />
            )}

            {adminTab === 'users' && (
              <AdminUsers
                users={users}
                onUpdateUser={(updatedUser) => {
                  StorageService.saveUser(updatedUser);
                  setUsers(StorageService.getUsers());
                }}
              />
            )}

            {adminTab === 'countries' && (
              <AdminCountriesCategories
                countries={countries}
                categories={categories}
                onSaveCountries={handleSaveCountries}
                onSaveCategories={handleSaveCategories}
              />
            )}

            {adminTab === 'categories' && (
              <AdminCountriesCategories
                countries={countries}
                categories={categories}
                onSaveCountries={handleSaveCountries}
                onSaveCategories={handleSaveCategories}
              />
            )}

            {adminTab === 'banners' && (
              <AdminBannersAnnouncements
                banners={banners}
                announcements={announcements}
                onSaveBanners={handleSaveBanners}
                onSaveAnnouncements={handleSaveAnnouncements}
              />
            )}

            {adminTab === 'announcements' && (
              <AdminBannersAnnouncements
                banners={banners}
                announcements={announcements}
                onSaveBanners={handleSaveBanners}
                onSaveAnnouncements={handleSaveAnnouncements}
              />
            )}

            {adminTab === 'notifications' && (
              <AdminNotifications
                notifications={notifications}
                countries={countries}
                categories={categories}
                onBroadcastNotification={handleBroadcastNotification}
              />
            )}

            {adminTab === 'support' && (
              <AdminSupport
                tickets={supportTickets}
                onUpdateTicket={handleUpdateTicket}
              />
            )}

            {adminTab === 'reports' && (
              <AdminReports
                jobs={jobs}
                applications={applications}
                users={users}
              />
            )}

            {adminTab === 'admins' && (
              <AdminStaffRoles
                adminUsers={adminUsers}
                onSaveAdminUsers={handleSaveAdminUsers}
              />
            )}

            {adminTab === 'audit' && <AdminAuditLogs logs={auditLogs} />}

            {adminTab === 'settings' && (
              <AdminSettings
                settings={settings}
                onSaveSettings={handleSaveSettings}
              />
            )}
          </AdminLayout>
        )
      ) : (
        /* 
          ====================================================================
          100% PURE CUSTOMER JOB SEEKER APPLICATION (NO ADMIN BUTTONS/UI)
          ====================================================================
        */
        <div className="min-h-screen flex flex-col bg-slate-50">
          {/* Customer Header */}
          <Header
            currentUser={currentUser}
            unreadCount={unreadNotificationsCount}
            onOpenNotifications={() => setShowNotificationsModal(true)}
            onOpenProfile={() => setCurrentTab('profile')}
            onOpenContactModal={() => setShowContactModal(true)}
            onOpenLoginModal={() => setShowLoginModal(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1">
            {/* If looking at a full Job Details Screen */}
            {selectedJob ? (
              <JobDetailsScreen
                job={selectedJob}
                isSaved={savedJobIds.includes(selectedJob.id)}
                hasApplied={applications.some(
                  (a) => a.jobId === selectedJob.id && a.userId === currentUser?.id
                )}
                onBack={() => setSelectedJob(null)}
                onApply={(job) => {
                  setJobToApply(job);
                }}
                onToggleSave={handleToggleSaveJob}
                onShare={(job) => setJobToShare(job)}
                onOpenContact={() => setShowContactModal(true)}
              />
            ) : selectedCountry ? (
              /* If looking at a Country Jobs page */
              <CountryJobsScreen
                country={selectedCountry}
                jobs={jobs}
                savedJobIds={savedJobIds}
                onBack={() => setSelectedCountry(null)}
                onSelectJob={setSelectedJob}
                onApplyJob={(job) => setJobToApply(job)}
                onToggleSaveJob={handleToggleSaveJob}
                onShareJob={(job) => setJobToShare(job)}
              />
            ) : selectedCategory ? (
              /* If looking at a Category Jobs page */
              <CategoryJobsScreen
                category={selectedCategory}
                jobs={jobs}
                savedJobIds={savedJobIds}
                onBack={() => setSelectedCategory(null)}
                onSelectJob={setSelectedJob}
                onApplyJob={(job) => setJobToApply(job)}
                onToggleSaveJob={handleToggleSaveJob}
                onShareJob={(job) => setJobToShare(job)}
              />
            ) : (
              /* Tab Screens */
              <>
                {currentTab === 'home' && (
                  <HomeScreen
                    jobs={jobs}
                    countries={countries}
                    categories={categories}
                    banners={banners}
                    announcements={announcements}
                    savedJobIds={savedJobIds}
                    currentUser={currentUser}
                    onSelectJob={setSelectedJob}
                    onApplyJob={(job) => setJobToApply(job)}
                    onToggleSaveJob={handleToggleSaveJob}
                    onShareJob={(job) => setJobToShare(job)}
                    onNavigateSearch={handleNavigateSearch}
                    onSelectCountry={setSelectedCountry}
                    onSelectCategory={setSelectedCategory}
                    onOpenContactModal={() => setShowContactModal(true)}
                  />
                )}

                {currentTab === 'search' && (
                  <SearchScreen
                    jobs={jobs}
                    countries={countries}
                    categories={categories}
                    savedJobIds={savedJobIds}
                    initialKeyword={searchParams.keyword}
                    initialCountry={searchParams.country}
                    initialCategory={searchParams.category}
                    initialSpecialFilter={searchParams.specialFilter}
                    onSelectJob={setSelectedJob}
                    onApplyJob={(job) => setJobToApply(job)}
                    onToggleSaveJob={handleToggleSaveJob}
                    onShareJob={(job) => setJobToShare(job)}
                  />
                )}

                {currentTab === 'saved' && (
                  <SavedJobsScreen
                    savedJobs={savedJobsList}
                    savedJobIds={savedJobIds}
                    onSelectJob={setSelectedJob}
                    onApplyJob={(job) => setJobToApply(job)}
                    onToggleSaveJob={handleToggleSaveJob}
                    onShareJob={(job) => setJobToShare(job)}
                    onBrowseJobs={() => {
                      setCurrentTab('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

                {currentTab === 'applications' && (
                  <MyApplicationsScreen
                    applications={userApplications}
                    onSelectApplication={() => {}}
                    onWithdrawApplication={handleWithdrawApplication}
                    onBrowseJobs={() => {
                      setCurrentTab('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

                {currentTab === 'profile' && (
                  <ProfileScreen
                    currentUser={currentUser}
                    onEditProfile={() => setShowEditProfileModal(true)}
                    onOpenSupport={() => setShowSupportModal(true)}
                    onOpenAgencyContact={() => setShowContactModal(true)}
                    onOpenPolicy={(type) => setPolicyType(type)}
                    onLogout={handleUserLogout}
                    onDeleteAccount={handleDeleteAccount}
                    onOpenLoginModal={() => setShowLoginModal(true)}
                    onOpenAdmin={navigateToAdmin}
                  />
                )}
              </>
            )}
          </main>

          {/* Candidate Bottom 5-Tab Navigation Bar */}
          {!selectedJob && (
            <BottomNav
              currentTab={currentTab}
              onChangeTab={(tab) => {
                setSelectedJob(null);
                setSelectedCountry(null);
                setSelectedCategory(null);
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              savedCount={savedJobIds.length}
              applicationsCount={userApplications.length}
            />
          )}
        </div>
      )}

      {/* MODALS */}

      {/* Job Application Form Modal */}
      {jobToApply && (
        <ApplyModal
          job={jobToApply}
          currentUser={currentUser}
          onClose={() => setJobToApply(null)}
          onSubmit={handleApplySubmission}
        />
      )}

      {/* Application Success Confirmation Modal */}
      {submittedApp && (
        <ApplicationSuccessModal
          application={submittedApp}
          onViewMyApplications={() => {
            setSubmittedApp(null);
            setCurrentTab('applications');
          }}
          onClose={() => setSubmittedApp(null)}
        />
      )}

      {/* Notifications Drawer */}
      {showNotificationsModal && (
        <NotificationsScreen
          notifications={notifications}
          onMarkAllAsRead={() => {
            const updated = notifications.map((n) => ({ ...n, read: true }));
            StorageService.saveNotifications(updated);
            setNotifications(updated);
          }}
          onSelectNotification={(notif) => {
            if (notif.relatedJobId) {
              const j = jobs.find((x) => x.id === notif.relatedJobId);
              if (j) setSelectedJob(j);
            } else if (notif.relatedApplicationId) {
              setCurrentTab('applications');
            }
            setShowNotificationsModal(false);
          }}
          onClose={() => setShowNotificationsModal(false)}
        />
      )}

      {/* Customer Support Modal */}
      {showSupportModal && (
        <SupportScreen
          currentUser={currentUser}
          onClose={() => setShowSupportModal(false)}
          onSubmitTicket={handleCreateTicket}
          onOpenAgencyContact={() => {
            setShowSupportModal(false);
            setShowContactModal(true);
          }}
        />
      )}

      {/* Rizoo Travel Agency Contact Modal */}
      {showContactModal && (
        <AgencyContactModal onClose={() => setShowContactModal(false)} />
      )}

      {/* Share Job Modal */}
      {jobToShare && (
        <ShareJobModal job={jobToShare} onClose={() => setJobToShare(null)} />
      )}

      {/* Login & Register Modal */}
      {showLoginModal && (
        <LoginRegisterModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleUserLogin}
        />
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && currentUser && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setShowEditProfileModal(false)}
          onSave={(updated) => {
            StorageService.setCurrentUser(updated);
            StorageService.saveUser(updated);
            setCurrentUser(updated);
            setUsers(StorageService.getUsers());
            setShowEditProfileModal(false);
          }}
        />
      )}

      {/* Policy, Terms & About Modal */}
      {policyType && (
        <PolicyModal type={policyType} onClose={() => setPolicyType(null)} />
      )}
    </div>
  );
}
