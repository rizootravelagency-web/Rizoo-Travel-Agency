import React, { useState } from 'react';
import { AppNotification, Country, JobCategory } from '../../types';
import { Bell, Send, CheckCircle2, Users, Flame } from 'lucide-react';

interface AdminNotificationsProps {
  notifications: AppNotification[];
  countries: Country[];
  categories: JobCategory[];
  onBroadcastNotification: (notif: Omit<AppNotification, 'id' | 'createdAt'>) => void;
}

export const AdminNotifications: React.FC<AdminNotificationsProps> = ({
  notifications,
  countries,
  categories,
  onBroadcastNotification,
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AppNotification['type']>('urgent');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    onBroadcastNotification({
      title: title.trim(),
      message: message.trim(),
      type,
      read: false,
    });

    setSentSuccess(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-white">
          Push Notifications & Candidate Alert Dispatcher
        </h1>
        <p className="text-xs text-slate-400">
          Send real-time instant alerts directly to candidate notification feeds and mobile devices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Dispatch Form */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 h-fit space-y-3 text-xs">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-400" />
            <span>Broadcast Push Notification</span>
          </h3>

          {sentSuccess && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-xl flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Broadcast alert dispatched to candidates!</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Notification Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Urgent Demand: 50 Heavy Drivers for Jubail"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Alert Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
              >
                <option value="urgent">Urgent Vacancy Alert</option>
                <option value="interview">Interview Schedule Notice</option>
                <option value="vacancy">New Vacancy Published</option>
                <option value="announcement">Agency General Announcement</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Alert Message *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter alert message that candidates will read on their mobile devices..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Send Push Notification to All Users</span>
            </button>
          </form>
        </div>

        {/* History of Dispatched Notifications */}
        <div className="lg:col-span-2 space-y-3 text-xs">
          <div className="flex items-center justify-between text-slate-400 font-bold">
            <span>Broadcast History ({notifications.length})</span>
          </div>

          <div className="space-y-2.5">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white">{notif.title}</h4>
                    <span className="text-[10px] text-slate-500">
                      {new Date(notif.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
