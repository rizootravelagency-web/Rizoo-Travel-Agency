import React from 'react';
import { Logo } from './Logo';
import { Bell, Phone, ShieldCheck, User as UserIcon } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  currentUser: User | null;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenContactModal: () => void;
  onOpenLoginModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  unreadCount,
  onOpenNotifications,
  onOpenProfile,
  onOpenContactModal,
  onOpenLoginModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro banner for agency contact & trust badge */}
      <div className="bg-slate-900 text-slate-200 px-3 py-1.5 text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-amber-400 font-bold">Rizoo Travel Agency</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300">Overseas Job Portal</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenContactModal}
            className="flex items-center gap-1 text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
            title="Call Agency: 7007303250"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold">7007303250</span>
          </button>
        </div>
      </div>

      {/* Main Customer Header bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size="md" showTagline={true} />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Contact Button */}
          <button
            onClick={onOpenContactModal}
            className="hidden xs:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Help Desk</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-xs">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* User Profile / Login */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              {currentUser.profilePhotoUrl ? (
                <img
                  src={currentUser.profilePhotoUrl}
                  alt={currentUser.fullName}
                  className="w-7 h-7 rounded-full object-cover border border-blue-500"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.fullName.charAt(0)}
                </div>
              )}
              <span className="text-xs font-semibold text-slate-800 max-w-[90px] truncate hidden sm:inline">
                {currentUser.fullName.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
