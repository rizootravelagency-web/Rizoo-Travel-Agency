import React, { useState } from 'react';
import { AppSettings } from '../../types';
import { Settings, Save, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';

interface AdminSettingsProps {
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-white">
          System Configuration & Agency Settings
        </h1>
        <p className="text-xs text-slate-400">
          Update agency phone numbers, physical address, disclaimer texts, and platform parameters
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" />
          <span>System settings updated and synchronized across all client mobile devices!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-950/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Application Brand Name</label>
            <input
              type="text"
              required
              value={formData.appName}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Brand Owner / Agency Name</label>
            <input
              type="text"
              required
              value={formData.agencyName}
              onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Helpline Phone Number</label>
            <input
              type="text"
              required
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              placeholder="7007303250"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">WhatsApp Business Contact</label>
            <input
              type="text"
              required
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="+917007303250"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none focus:border-amber-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-bold mb-1">Registered Physical Address</label>
            <input
              type="text"
              required
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              placeholder="Dharampur Chauraha Se Pachrukhiya Bazar, Maharajganj, Uttar Pradesh, India"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium outline-none focus:border-amber-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-bold mb-1">Support Email Address</label>
            <input
              type="email"
              required
              value={formData.supportEmail}
              onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
              placeholder="rizootravelagency@gmail.com"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium outline-none focus:border-amber-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-bold mb-1">Legal Candidate Disclaimer Text</label>
            <textarea
              rows={3}
              value={formData.disclaimerText}
              onChange={(e) => setFormData({ ...formData, disclaimerText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium outline-none focus:border-amber-400 resize-none"
            />
          </div>
        </div>

        {/* Toggle Maintenance Mode */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="font-bold text-white block">Maintenance Mode</span>
            <span className="text-[11px] text-slate-400">
              When enabled, candidate users will see a scheduled maintenance notice.
            </span>
          </div>
          <input
            type="checkbox"
            checked={formData.maintenanceMode}
            onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
            className="w-5 h-5 rounded text-blue-600"
          />
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Save System Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
