import React from 'react';
import { ShieldCheck, UserCheck, Lock, History, User } from 'lucide-react';
import { AuditLog } from '../types';

export const TeamPermissionsView: React.FC = () => {
  const members = [
    { name: 'Mohamed Mahmoud', email: 'owner@mmstore.com', role: 'owner', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { name: 'Sarah Adel', email: 'marketing@mmstore.com', role: 'marketer', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { name: 'Kareem Nabil', email: 'designer@mmstore.com', role: 'editor', badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
    { name: 'Tarek Ezzat', email: 'analyst@mmstore.com', role: 'analyst', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: 'log_1',
      orgId: 'default-mmstore',
      userId: 'system_autopilot',
      action: 'DAILY_AUTOPILOT_RUN',
      entityType: 'autopilot',
      entityId: 'run_2026-10-18',
      details: { postsGenerated: 4, mode: 'autonomous' },
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'log_2',
      orgId: 'default-mmstore',
      userId: 'owner@mmstore.com',
      action: 'AUTOPILOT_CONFIG_UPDATED',
      entityType: 'autopilot',
      entityId: 'config_main',
      details: { requireApproval: false, targetPlatforms: 6 },
      timestamp: Date.now() - 7200000,
    },
    {
      id: 'log_3',
      orgId: 'default-mmstore',
      userId: 'system_publisher',
      action: 'POST_PUBLISHED',
      entityType: 'post',
      entityId: 'post_102',
      details: { platform: 'tiktok', publishId: 'tt_6991048' },
      timestamp: Date.now() - 43200000,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <ShieldCheck size={20} className="text-emerald-400" />
          Team Roles &amp; Immutable Audit Trail
        </h2>
        <p className="text-xs text-slate-400">
          Multi-tenant access control (Owner, Admin, Marketer, Analyst, Editor) and tamper-proof audit logging.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Members List (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <UserCheck size={15} className="text-indigo-400" />
            Active Team Members
          </h3>

          <div className="space-y-2.5">
            {members.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{m.name}</div>
                    <div className="text-[10px] text-slate-400">{m.email}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${m.badge}`}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Immutable Audit Log Table (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <History size={15} className="text-pink-400" />
              Immutable Audit Log
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Protected by Firestore Rules</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-400">{log.action}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Actor: <strong className="text-white">{log.userId}</strong> • Entity: {log.entityType} ({log.entityId})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
