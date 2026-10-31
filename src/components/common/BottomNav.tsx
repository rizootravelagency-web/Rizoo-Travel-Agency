import React from 'react';
import { Home, Search, Bookmark, ClipboardList, User } from 'lucide-react';

export type TabType = 'home' | 'search' | 'saved' | 'applications' | 'profile';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
  savedCount: number;
  applicationsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onChangeTab,
  savedCount,
  applicationsCount,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'search' as TabType, label: 'Search', icon: Search },
    {
      id: 'saved' as TabType,
      label: 'Saved',
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    {
      id: 'applications' as TabType,
      label: 'My Jobs',
      icon: ClipboardList,
      badge: applicationsCount > 0 ? applicationsCount : undefined,
    },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 max-w-lg md:max-w-xl lg:max-w-4xl mx-auto rounded-t-2xl sm:rounded-t-none">
      <div className="grid grid-cols-5 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1 transition-all duration-200 rounded-xl cursor-pointer ${
                isActive
                  ? 'text-blue-700 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'stroke-[2.5px] text-blue-700' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 leading-tight tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 bg-blue-700 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
