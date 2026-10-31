import React, { useState } from 'react';
import { User } from '../../types';
import { Users, Search, ShieldCheck, ShieldAlert, Ban, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

interface AdminUsersProps {
  users: User[];
  onUpdateUser: (user: User) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ users, onUpdateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((u) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(q) ||
      u.mobileNumber.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.city && u.city.toLowerCase().includes(q))
    );
  });

  const handleToggleStatus = (u: User) => {
    const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
    if (confirm(`Are you sure you want to mark ${u.fullName} as ${nextStatus}?`)) {
      onUpdateUser({ ...u, status: nextStatus });
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Registered Job Seekers & User Accounts
          </h1>
          <p className="text-xs text-slate-400">
            View verified candidates, application records, and manage access privileges
          </p>
        </div>

        <div className="relative max-w-xs w-full text-xs">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by name, phone, city..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 bg-slate-900/90 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Candidate</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Location & Education</th>
                <th className="py-3 px-3">Trade Experience</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Registered</th>
                <th className="py-3 px-3 text-right">Access Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No registered candidates found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{u.fullName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{u.id}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 font-semibold text-slate-200">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <span>{u.mobileNumber}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-slate-300 font-medium">
                        {u.city || 'Maharajganj'}, {u.state || 'UP'}
                      </div>
                      <div className="text-[11px] text-slate-500">{u.education || '12th Pass'}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-slate-300 font-medium max-w-xs truncate">
                        {u.experience || 'Verified Trade Experience'}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-400">
                      {new Date(u.registeredAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          u.status === 'Active'
                            ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        }`}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Restore'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
