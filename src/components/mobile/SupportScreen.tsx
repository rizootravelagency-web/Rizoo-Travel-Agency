import React, { useState } from 'react';
import { SupportTicket, User } from '../../types';
import {
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Send,
  X,
  CheckCircle2,
  Phone,
  ShieldCheck,
} from 'lucide-react';

interface SupportScreenProps {
  currentUser: User | null;
  onClose: () => void;
  onSubmitTicket: (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => void;
  onOpenAgencyContact: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  currentUser,
  onClose,
  onSubmitTicket,
  onOpenAgencyContact,
}) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'ticket'>('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [category, setCategory] = useState<SupportTicket['category']>('Application Query');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How do I know if a job vacancy on RIZOO JOB is genuine?',
      a: 'All vacancies published on RIZOO JOB are validated directly by Rizoo Travel Agency in Maharajganj with verified employers across Gulf countries (Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain) and Europe. Look for the "Verified" green badge on each card.',
    },
    {
      q: 'Do I have to pay any advance fee for registering on RIZOO JOB?',
      a: 'No. Searching jobs, viewing vacancy posters, and submitting applications on RIZOO JOB is 100% free. Rizoo Travel Agency does not take unauthorized advance payments for merely submitting an application.',
    },
    {
      q: 'What documents are required for Gulf / Europe visa processing?',
      a: 'You will need a valid passport (minimum 18 months validity remaining), 8 white-background photographs, updated resume/bio-data, trade certificates (for skilled jobs like welders/electricians), and a Police Clearance Certificate (PCC) for European positions.',
    },
    {
      q: 'How does the Zoom or Client Interview work?',
      a: 'Once your application is shortlisted by the overseas client, you will receive an in-app notification with the date, time, and meeting link. You can also visit our Maharajganj recruitment office for trade test preparation.',
    },
    {
      q: 'Where is Rizoo Travel Agency located?',
      a: 'Our registered office is at Dharampur Chauraha Se Pachrukhiya Bazar, Maharajganj, Uttar Pradesh, India. Contact: 7007303250.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmitTicket({
      userId: currentUser?.id || 'guest-user',
      userName: currentUser?.fullName || 'Job Seeker',
      userPhone: currentUser?.mobileNumber || '7007303250',
      userEmail: currentUser?.email || 'seeker@example.com',
      category,
      description: description.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-black text-white">Help & Candidate Support</h3>
              <p className="text-[10px] text-slate-300">Rizoo Travel Agency Helpdesk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'faq' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'ticket' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Submit Query / Report Vacancy
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto text-xs space-y-4">
          {activeTab === 'faq' ? (
            <div className="space-y-2.5">
              {faqs.map((faq, i) => {
                const isExp = expandedFaq === i;
                return (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExp ? null : i)}
                      className="w-full p-3.5 flex items-center justify-between text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isExp ? <ChevronUp className="w-4 h-4 text-blue-700 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isExp && (
                      <div className="px-3.5 pb-3.5 text-slate-600 leading-relaxed text-[11px] border-t border-slate-100 pt-2 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-2">
                <button
                  onClick={onOpenAgencyContact}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call Maharajganj Helpdesk: 7007303250</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Support Ticket Created</h4>
                  <p className="text-slate-500 text-xs">
                    Our candidate assistance team will review your inquiry and follow up shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Issue Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none bg-white"
                    >
                      <option value="Application Query">Application Query</option>
                      <option value="Vacancy Report">Report a Vacancy Error</option>
                      <option value="Suspicious Recruitment">Report Fraudulent / Suspicious Activity</option>
                      <option value="Visa & Document Question">Visa & Document Processing</option>
                      <option value="Other">Other Help</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Description / Inquiry Details</label>
                    <textarea
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide details of your question or report..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium outline-none focus:border-blue-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Support Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
