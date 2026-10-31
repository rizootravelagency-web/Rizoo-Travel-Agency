import React from 'react';
import { AppNotification } from '../../types';
import { Bell, CheckCheck, Video, Send, Flame, Sparkles, X, ChevronRight } from 'lucide-react';

interface NotificationsScreenProps {
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: AppNotification) => void;
  onClose: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  onClose,
}) => {
  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'interview':
        return <Video className="w-5 h-5 text-amber-500" />;
      case 'urgent':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'application':
        return <Send className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-indigo-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-black text-white">Notifications Center</h3>
              <span className="text-[10px] text-slate-300">
                {unreadCount > 0 ? `${unreadCount} unread updates` : 'All caught up'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] font-bold text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No notifications yet. You will receive alerts when applications update.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onSelectNotification(notif)}
                className={`pt-3 first:pt-0 pb-3 flex items-start gap-3 cursor-pointer rounded-xl p-2 transition-colors ${
                  !notif.read ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                }`}
              >
                <div className="p-2 rounded-xl bg-white border border-slate-200 shrink-0 shadow-xs">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-bold ${
                        !notif.read ? 'text-blue-900 font-extrabold' : 'text-slate-900'
                      }`}
                    >
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
