import React, { useState } from 'react';
import { Banner, Announcement } from '../../types';
import { Plus, Image, Megaphone, Trash2, CheckCircle2 } from 'lucide-react';

interface AdminBannersAnnouncementsProps {
  banners: Banner[];
  announcements: Announcement[];
  onSaveBanners: (banners: Banner[]) => void;
  onSaveAnnouncements: (announcements: Announcement[]) => void;
}

export const AdminBannersAnnouncements: React.FC<AdminBannersAnnouncementsProps> = ({
  banners,
  announcements,
  onSaveBanners,
  onSaveAnnouncements,
}) => {
  const [activeTab, setActiveTab] = useState<'banners' | 'announcements'>('banners');

  // New Banner State
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerBadge, setBannerBadge] = useState('HOT RECRUITMENT');

  // New Announcement State
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDesc, setAnnouncementDesc] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState<'High' | 'Normal'>('High');

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim() || !bannerImageUrl.trim()) return;

    const newBanner: Banner = {
      id: 'b-' + Date.now(),
      title: bannerTitle.trim(),
      subtitle: bannerSubtitle.trim(),
      imageUrl: bannerImageUrl.trim(),
      badgeText: bannerBadge.trim(),
      active: true,
      order: banners.length + 1,
    };

    onSaveBanners([newBanner, ...banners]);
    setBannerTitle('');
    setBannerSubtitle('');
    setBannerImageUrl('');
  };

  const handleToggleBanner = (id: string) => {
    onSaveBanners(banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Delete promotional banner?')) {
      onSaveBanners(banners.filter((b) => b.id !== id));
    }
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementDesc.trim()) return;

    const newAnc: Announcement = {
      id: 'anc-' + Date.now(),
      title: announcementTitle.trim(),
      description: announcementDesc.trim(),
      publishedAt: new Date().toISOString(),
      active: true,
      priority: announcementPriority,
    };

    onSaveAnnouncements([newAnc, ...announcements]);
    setAnnouncementTitle('');
    setAnnouncementDesc('');
  };

  const handleToggleAnnouncement = (id: string) => {
    onSaveAnnouncements(announcements.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Delete announcement notice?')) {
      onSaveAnnouncements(announcements.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Promotional Banners & Public Announcements
          </h1>
          <p className="text-xs text-slate-400">
            Publish home screen carousels and urgent recruitment notices to all candidate screens
          </p>
        </div>

        <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'banners' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Banners ({banners.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'announcements' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Announcements ({announcements.length})
          </button>
        </div>
      </div>

      {activeTab === 'banners' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Create Banner Form */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 h-fit space-y-3 text-xs">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Create Home Screen Banner</span>
            </h3>

            <form onSubmit={handleAddBanner} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Banner Headline *</label>
                <input
                  type="text"
                  required
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  placeholder="e.g. Urgent Gulf Recruitment 2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Subtitle / Description</label>
                <input
                  type="text"
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  placeholder="e.g. 100+ Warehouse & Logistics Jobs in Saudi Arabia"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={bannerBadge}
                  onChange={(e) => setBannerBadge(e.target.value)}
                  placeholder="e.g. IMMEDIATE VISA"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={bannerImageUrl}
                  onChange={(e) => setBannerImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Publish Promotional Banner
              </button>
            </form>
          </div>

          {/* Banners List */}
          <div className="lg:col-span-2 space-y-3">
            {banners.map((b) => (
              <div
                key={b.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="w-24 h-16 rounded-xl object-cover shrink-0 border border-slate-700"
                  />
                  <div>
                    {b.badgeText && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                        {b.badgeText}
                      </span>
                    )}
                    <h4 className="font-bold text-white text-sm mt-1">{b.title}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">{b.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleBanner(b.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                      b.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {b.active ? 'Active' : 'Disabled'}
                  </button>

                  <button
                    onClick={() => handleDeleteBanner(b.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Announcements Tab */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Create Announcement */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 h-fit space-y-3 text-xs">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Broadcast Announcement</span>
            </h3>

            <form onSubmit={handleAddAnnouncement} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Headline / Notice Title *</label>
                <input
                  type="text"
                  required
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="e.g. Client Interview Camp on 10th November"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Priority</label>
                <select
                  value={announcementPriority}
                  onChange={(e) => setAnnouncementPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  <option value="High">High Priority (Urgent Notice)</option>
                  <option value="Normal">Normal Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Announcement Message *</label>
                <textarea
                  required
                  rows={4}
                  value={announcementDesc}
                  onChange={(e) => setAnnouncementDesc(e.target.value)}
                  placeholder="Details of documents to carry, venue timing, dress code..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Post Public Announcement
              </button>
            </form>
          </div>

          {/* Announcements List */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        a.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {a.priority} Priority
                    </span>
                    <span className="text-slate-500 text-[10px]">
                      {new Date(a.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{a.title}</h4>
                  <p className="text-slate-400 mt-1 leading-relaxed">{a.description}</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleToggleAnnouncement(a.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                      a.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {a.active ? 'Active' : 'Archived'}
                  </button>

                  <button
                    onClick={() => handleDeleteAnnouncement(a.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
