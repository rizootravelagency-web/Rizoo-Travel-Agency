import React from 'react';
import { X, Phone, MessageCircle, MapPin, Mail, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { Logo } from '../common/Logo';

interface AgencyContactModalProps {
  onClose: () => void;
}

export const AgencyContactModal: React.FC<AgencyContactModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-black uppercase text-amber-400 tracking-wider">
                Recruitment Head Office
              </h3>
              <p className="text-base font-black text-white">Rizoo Travel Agency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Address Box */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>Office Address:</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed font-medium pl-6">
              Dharampur Chauraha Se Pachrukhiya Bazar, Maharajganj, Uttar Pradesh, India
            </p>
          </div>

          {/* Action Call & WhatsApp Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href="tel:7007303250"
              className="py-3 px-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-center flex flex-col items-center justify-center gap-1 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              <span>Call 7007303250</span>
            </a>

            <a
              href="https://wa.me/917007303250?text=Hello%20Rizoo%20Travel%20Agency,%20I%20am%20calling%20regarding%20overseas%20job%20vacancies."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center flex flex-col items-center justify-center gap-1 shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Office Details Grid */}
          <div className="space-y-2 text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-500">Phone Helpline:</span>
              <span className="font-bold text-slate-900">7007303250</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-500">Official Email:</span>
              <span className="font-bold text-slate-900">rizootravelagency@gmail.com</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="font-semibold text-slate-500">Office Working Hours:</span>
              <span className="font-bold text-slate-900">10:00 AM – 7:00 PM (Mon-Sat)</span>
            </div>
          </div>

          {/* Map & Transparency Notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 leading-relaxed text-[11px]">
            <span className="font-bold">Walk-in Verification & Candidate Interviews: </span>
            Candidates are welcome to visit our Maharajganj office with original passport documents for live interview preparation and document attestation.
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Contact Window
          </button>
        </div>
      </div>
    </div>
  );
};
