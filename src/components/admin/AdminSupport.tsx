import React, { useState } from 'react';
import { SupportTicket } from '../../types';
import { HelpCircle, CheckCircle2, MessageSquare, Send, X, Clock } from 'lucide-react';

interface AdminSupportProps {
  tickets: SupportTicket[];
  onUpdateTicket: (ticket: SupportTicket) => void;
}

export const AdminSupport: React.FC<AdminSupportProps> = ({ tickets, onUpdateTicket }) => {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [ticketStatus, setTicketStatus] = useState<SupportTicket['status']>('Resolved');

  const openTicket = (t: SupportTicket) => {
    setSelectedTicket(t);
    setReplyText(t.adminReply || '');
    setTicketStatus(t.status);
  };

  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    onUpdateTicket({
      ...selectedTicket,
      adminReply: replyText.trim(),
      status: ticketStatus,
      resolvedAt: ticketStatus === 'Resolved' || ticketStatus === 'Closed' ? new Date().toISOString() : undefined,
    });

    setSelectedTicket(null);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-white">
          Candidate Inquiries & Support Tickets
        </h1>
        <p className="text-xs text-slate-400">
          Respond to candidate questions, verify reported vacancy issues, and assist overseas applicants
        </p>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 bg-slate-900/90 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Ticket ID</th>
                <th className="py-3 px-3">Candidate & Contact</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Query Summary</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No support inquiries filed.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">{t.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{t.userName}</div>
                      <div className="text-[11px] text-slate-400">{t.userPhone}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-300">{t.category}</td>
                    <td className="py-3 px-3 text-slate-300 max-w-xs truncate">{t.description}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'Resolved'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : t.status === 'In Progress'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {new Date(t.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => openTicket(t)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
                      >
                        Reply
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold">{selectedTicket.id}</span>
                <h3 className="text-base font-black text-white">{selectedTicket.category}</h3>
                <span className="text-xs text-slate-400">
                  From: {selectedTicket.userName} ({selectedTicket.userPhone})
                </span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-slate-400 block">Candidate Message:</span>
              <p>{selectedTicket.description}</p>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Update Status</label>
                <select
                  value={ticketStatus}
                  onChange={(e) => setTicketStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold outline-none"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Official Administrative Reply
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter assistance instructions or document confirmation for candidate..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Ticket Reply</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
