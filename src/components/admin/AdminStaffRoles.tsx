import React, { useState } from 'react';
import { AdminUser } from '../../types';
import { ShieldCheck, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface AdminStaffRolesProps {
  adminUsers: AdminUser[];
  onSaveAdminUsers: (users: AdminUser[]) => void;
}

export const AdminStaffRoles: React.FC<AdminStaffRolesProps> = ({ adminUsers, onSaveAdminUsers }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<AdminUser['role']>('Vacancy Manager');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;

    const newAdmin: AdminUser = {
      id: 'admin-' + Date.now(),
      username: username.trim() || email.split('@')[0],
      email: email.trim(),
      fullName: fullName.trim(),
      role,
      active: true,
    };

    onSaveAdminUsers([...adminUsers, newAdmin]);
    setUsername('');
    setEmail('');
    setFullName('');
  };

  const handleToggle = (id: string) => {
    onSaveAdminUsers(adminUsers.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-white">
          Administrator Staff & Role-Based Permissions
        </h1>
        <p className="text-xs text-slate-400">
          Manage recruitment officers, application managers, and super admin access levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Create Staff Form */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 h-fit space-y-3 text-xs">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Recruitment Officer</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Full Staff Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tariq Ahmad"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Official Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@rizoojob.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">System Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 font-bold"
              >
                <option value="Super Admin">Super Admin (Full System Access)</option>
                <option value="Vacancy Manager">Vacancy Manager (Post & Edit Vacancies)</option>
                <option value="Application Manager">Application Manager (Screen & Interview)</option>
                <option value="Support Staff">Support Staff (Helpdesk & Tickets)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Add Authorized Admin
            </button>
          </form>
        </div>

        {/* Staff List */}
        <div className="lg:col-span-2 space-y-2.5 text-xs">
          {adminUsers.map((a) => (
            <div
              key={a.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{a.fullName}</h4>
                  <div className="text-[11px] text-slate-400">
                    {a.email} • <span className="text-amber-400 font-bold">{a.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle(a.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                    a.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {a.active ? 'Active' : 'Disabled'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
