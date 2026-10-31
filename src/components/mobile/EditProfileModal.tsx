import React, { useState } from 'react';
import { User } from '../../types';
import { X, Save, User as UserIcon } from 'lucide-react';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updated: User) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.state || '');
  const [education, setEducation] = useState(user.education || '');
  const [experience, setExperience] = useState(user.experience || '');
  const [skills, setSkills] = useState(user.skills?.join(', ') || '');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(user.profilePhotoUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.trim(),
      city: city.trim(),
      state: state.trim(),
      education: education.trim(),
      experience: experience.trim(),
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      profilePhotoUrl: profilePhotoUrl.trim(),
    };
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-black text-white">Edit Candidate Profile</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs overflow-y-auto max-h-[80vh]">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-700 font-bold mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Maharajganj"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Uttar Pradesh"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Education Level</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. 12th Pass / ITI Electrician"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Experience Summary</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 2 years warehouse & packing"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. Loading, Forklift, English"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Profile Photo URL (Optional)</label>
            <input
              type="url"
              value={profilePhotoUrl}
              onChange={(e) => setProfilePhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border text-slate-700 font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
