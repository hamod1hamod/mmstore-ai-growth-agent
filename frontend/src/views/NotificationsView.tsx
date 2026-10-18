import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Clock, Zap } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const notifications = [
    {
      id: '1',
      title: 'Daily Autopilot Run Completed',
      message: 'Successfully generated and scheduled 4 fashion posts across Instagram, TikTok, Facebook, and Telegram.',
      type: 'success',
      time: '15 minutes ago',
    },
    {
      id: '2',
      title: 'Post Published: French Terry Signature Hoodie',
      message: 'Video Reel was published successfully to Instagram & TikTok (ID: ig_1784140582).',
      type: 'success',
      time: '2 hours ago',
    },
    {
      id: '3',
      title: 'Customer Escalation Flagged',
      message: 'Customer Mohamed Salah requested order tracking assistance. Flagged for priority human review.',
      type: 'warning',
      time: '3 hours ago',
    },
    {
      id: '4',
      title: 'Inventory Alert: Phantom Sneakers Low Stock',
      message: 'Size 45 has only 6 units remaining. Excluded from heavy promotional scaling.',
      type: 'info',
      time: '5 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Bell size={20} className="text-pink-400" />
          System Notifications &amp; Activity Stream
        </h2>
        <p className="text-xs text-slate-400">
          Real-time alerts for automated publishing, customer escalations, and inventory status.
        </p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] flex items-start gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${
              n.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
              n.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'
            }`}>
              {n.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{n.title}</h4>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                  <Clock size={10} /> {n.time}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
