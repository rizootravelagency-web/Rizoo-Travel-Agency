import React from 'react';
import { AuditLog } from '../../types';
import { History, Shield, Clock } from 'lucide-react';

interface AdminAuditLogsProps {
  logs: AuditLog[];
}

export const AdminAuditLogs: React.FC<AdminAuditLogsProps> = ({ logs }) => {
  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-white">
          System Security & Audit Activity Logs
        </h1>
        <p className="text-xs text-slate-400">
          Immutable audit record of all administrative actions, vacancy updates, status modifications, and document access
        </p>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 bg-slate-900/90 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Administrator</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Action Type</th>
                <th className="py-3 px-3">Target Entity</th>
                <th className="py-3 px-3">Operation Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No administrative audit events recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>

                    <td className="py-3 px-3 font-bold text-white">{log.adminEmail}</td>

                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        {log.adminRole}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-blue-400 text-[11px]">
                      {log.action}
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-300">
                      {log.targetType} ({log.targetId})
                    </td>

                    <td className="py-3 px-3 text-slate-300 max-w-sm truncate">
                      {log.details}
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
