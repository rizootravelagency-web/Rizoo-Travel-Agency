import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { AdminUser } from '../../types';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileSpreadsheet,
  Globe,
  Layers,
  Image,
  Megaphone,
  Bell,
  HelpCircle,
  BarChart3,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'vacancies'
  | 'applications'
  | 'users'
  | 'countries'
  | 'categories'
  | 'banners'
  | 'announcements'
  | 'notifications'
  | 'support'
  | 'reports'
  | 'admins'
  | 'audit'
  | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onChangeTab: (tab: AdminTab) => void;
  adminUser: AdminUser;
  onLogout: () => void;
  onSwitchToMobileApp: () => void;
  pendingApplicationsCount: number;
  openTicketsCount: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onChangeTab,
  adminUser,
  onLogout,
  onSwitchToMobileApp,
  pendingApplicationsCount,
  openTicketsCount,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vacancies' as AdminTab, label: 'Manage Vacancies', icon: Briefcase },
    {
      id: 'applications' as AdminTab,
      label: 'Applications',
      icon: FileSpreadsheet,
      badge: pendingApplicationsCount > 0 ? pendingApplicationsCount : undefined,
    },
    { id: 'users' as AdminTab, label: 'Registered Users', icon: Users },
    { id: 'countries' as AdminTab, label: 'Countries & Flags', icon: Globe },
    { id: 'categories' as AdminTab, label: 'Job Categories', icon: Layers },
    { id: 'banners' as AdminTab, label: 'Home Banners', icon: Image },
    { id: 'announcements' as AdminTab, label: 'Announcements', icon: Megaphone },
    { id: 'notifications' as AdminTab, label: 'Push Notifications', icon: Bell },
    {
      id: 'support' as AdminTab,
      label: 'Support Tickets',
      icon: HelpCircle,
      badge: openTicketsCount > 0 ? openTicketsCount : undefined,
    },
    { id: 'reports' as AdminTab, label: 'Reports & Export', icon: BarChart3 },
    { id: 'admins' as AdminTab, label: 'Admin Staff & Roles', icon: ShieldCheck },
    { id: 'audit' as AdminTab, label: 'Audit Activity Logs', icon: History },
    { id: 'settings' as AdminTab, label: 'System Settings', icon: Settings },
  ];

  const handleSelectTab = (tab: AdminTab) => {
    onChangeTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Logo size="sm" variant="dark" showTagline={false} />
          <span className="hidden sm:inline-block text-[10px] font-black tracking-widest uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
            ADMIN CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Switch to User App */}
          <button
            onClick={onSwitchToMobileApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 text-xs font-bold transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Mobile App</span>
            <span className="sm:hidden">App</span>
          </button>

          {/* Admin User Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
              A
            </div>
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-white truncate max-w-[120px]">
                {adminUser.fullName.split(' ')[0]}
              </span>
              <span className="text-[10px] text-amber-400 font-medium">
                {adminUser.role}
              </span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0 top-14' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Menu items list */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Agency Location Micro Card */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/60 text-[10px] text-slate-400">
            <div className="font-bold text-amber-400">Rizoo Travel Agency</div>
            <div className="truncate">Maharajganj, Uttar Pradesh</div>
            <div className="text-slate-500 mt-0.5">Helpline: 7007303250</div>
          </div>
        </aside>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
