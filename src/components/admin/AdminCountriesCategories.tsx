import React, { useState } from 'react';
import { Country, JobCategory } from '../../types';
import { Plus, Globe, Layers, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';

interface AdminCountriesCategoriesProps {
  countries: Country[];
  categories: JobCategory[];
  onSaveCountries: (countries: Country[]) => void;
  onSaveCategories: (categories: JobCategory[]) => void;
}

export const AdminCountriesCategories: React.FC<AdminCountriesCategoriesProps> = ({
  countries,
  categories,
  onSaveCountries,
  onSaveCategories,
}) => {
  const [activeTab, setActiveTab] = useState<'countries' | 'categories'>('countries');

  // New Country Form State
  const [newCountryName, setNewCountryName] = useState('');
  const [newCountryFlag, setNewCountryFlag] = useState('🌐');
  const [newCountryRegion, setNewCountryRegion] = useState<'Gulf' | 'Europe' | 'Asia' | 'Other'>('Gulf');
  const [newCountryCurrency, setNewCountryCurrency] = useState('SAR');

  // New Category Form State
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountryName.trim()) return;

    const newCountry: Country = {
      id: newCountryName.toLowerCase().replace(/\s+/g, '-').slice(0, 10),
      name: newCountryName.trim(),
      code: newCountryName.slice(0, 2).toUpperCase(),
      flag: newCountryFlag.trim() || '🌐',
      region: newCountryRegion,
      active: true,
      popular: true,
      currency: newCountryCurrency.trim() || 'USD',
    };

    onSaveCountries([...countries, newCountry]);
    setNewCountryName('');
  };

  const handleToggleCountry = (id: string) => {
    const updated = countries.map((c) => (c.id === id ? { ...c, active: !c.active } : c));
    onSaveCountries(updated);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const newCat: JobCategory = {
      id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
      name: newCategoryName.trim(),
      iconName: 'Briefcase',
      active: true,
      jobCount: 0,
    };

    onSaveCategories([...categories, newCat]);
    setNewCategoryName('');
  };

  const handleToggleCategory = (id: string) => {
    const updated = categories.map((cat) => (cat.id === id ? { ...cat, active: !cat.active } : cat));
    onSaveCategories(updated);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Country & Job Category Setup
          </h1>
          <p className="text-xs text-slate-400">
            Configure destination territories, flags, currencies, and occupational trades
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('countries')}
            className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'countries'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Countries ({countries.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Job Categories ({categories.length})
          </button>
        </div>
      </div>

      {activeTab === 'countries' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Country Form */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 h-fit space-y-3 text-xs">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Destination Country</span>
            </h3>

            <form onSubmit={handleAddCountry} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Country Name *</label>
                <input
                  type="text"
                  required
                  value={newCountryName}
                  onChange={(e) => setNewCountryName(e.target.value)}
                  placeholder="e.g. Ireland"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Flag Emoji</label>
                  <input
                    type="text"
                    value={newCountryFlag}
                    onChange={(e) => setNewCountryFlag(e.target.value)}
                    placeholder="🇮🇪"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 text-center text-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Currency</label>
                  <input
                    type="text"
                    value={newCountryCurrency}
                    onChange={(e) => setNewCountryCurrency(e.target.value.toUpperCase())}
                    placeholder="EUR"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400 uppercase font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Region Category</label>
                <select
                  value={newCountryRegion}
                  onChange={(e) => setNewCountryRegion(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                >
                  <option value="Gulf">Gulf (Middle East)</option>
                  <option value="Europe">Europe (Schengen / EU)</option>
                  <option value="Asia">Asia (Malaysia / Singapore)</option>
                  <option value="Other">Other Global</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Add Country to Directory
              </button>
            </form>
          </div>

          {/* Countries List */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {countries.map((c) => (
              <div
                key={c.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{c.name}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {c.region} • Currency: {c.currency}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleCountry(c.id)}
                  className={`px-3 py-1 rounded-xl font-bold text-[11px] cursor-pointer ${
                    c.active
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {c.active ? 'Active' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Categories Tab */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Add Category Form */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 h-fit space-y-3 text-xs">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Job Category</span>
            </h3>

            <form onSubmit={handleAddCategory} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Solar Technician"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Add Category
              </button>
            </form>
          </div>

          {/* Categories Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between"
              >
                <div className="truncate pr-2">
                  <h4 className="font-bold text-white truncate">{cat.name}</h4>
                  <span className="text-[10px] text-slate-400">
                    {cat.jobCount || 0} Vacancies
                  </span>
                </div>

                <button
                  onClick={() => handleToggleCategory(cat.id)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer shrink-0 ${
                    cat.active
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {cat.active ? 'Active' : 'Off'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
