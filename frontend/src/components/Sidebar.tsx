import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Sparkles, 
  Video, 
  Calendar, 
  Share2, 
  Target, 
  BarChart3, 
  TrendingUp, 
  Inbox, 
  ShoppingBag, 
  Zap, 
  Bell, 
  ShieldCheck, 
  Settings,
  CreditCard,
  Flame,
  CheckCircle2,
  Clock,
  Film
} from 'lucide-react';

export type NavTab = 
  | 'welcome'
  | 'overview'
  | 'agent'
  | 'content-studio'
  | 'video-studio'
  | 'calendar'
  | 'accounts'
  | 'campaigns'
  | 'analytics'
  | 'financials'
  | 'inbox'
  | 'catalog'
  | 'automation'
  | 'notifications'
  | 'team'
  | 'settings'
  | 'subscription';

interface Props {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  autopilotEnabled: boolean;
  onToggleAutopilot: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  autopilotEnabled,
  onToggleAutopilot,
  unreadCount = 2,
}) => {
  const navItems = [
    { id: 'welcome', label: '0. Welcome Film (Taste)', icon: Film, badge: 'Film' },
    { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
    { id: 'agent', label: '2. AI Marketing Agent', icon: Bot, badge: 'Auto' },
    { id: 'content-studio', label: '3. Content Studio', icon: Sparkles },
    { id: 'video-studio', label: '4. Video & Reels Studio', icon: Video, badge: '9:16' },
    { id: 'calendar', label: '5. Social Calendar', icon: Calendar },
    { id: 'accounts', label: '6. Social Accounts', icon: Share2 },
    { id: 'campaigns', label: '7. Campaigns', icon: Target },
    { id: 'analytics', label: '8. Analytics', icon: BarChart3 },
    { id: 'financials', label: '9. Financial Growth', icon: TrendingUp, badge: 'ROAS' },
    { id: 'inbox', label: '10. Customer Inbox', icon: Inbox, badgeCount: 3 },
    { id: 'catalog', label: '11. Product Catalog', icon: ShoppingBag },
    { id: 'automation', label: '12. Automation Rules', icon: Zap },
    { id: 'notifications', label: '13. Notifications', icon: Bell, badgeCount: unreadCount },
    { id: 'team', label: '14. Team & Permissions', icon: ShieldCheck },
    { id: 'settings', label: '15. Store & GitHub Sync', icon: Settings },
    { id: 'subscription', label: '16. Subscription & GitHub Plan', icon: CreditCard, badge: 'PRO' },
  ];

  return (
    <aside className="w-64 bg-[#14171d] border-r border-[#252a36] flex flex-col h-screen select-none shrink-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#252a36]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-black text-white text-lg tracking-wider">
            MM
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm tracking-wide flex items-center gap-1.5">
              MMStore AI
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                PRO
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Fashion Growth Agent</p>
          </div>
        </div>

        {/* Master Autopilot Toggle Pill */}
        <div className={`mt-4 p-3 rounded-xl border transition-all ${
          autopilotEnabled 
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
            : 'bg-slate-900/60 border-slate-700/60 text-slate-400'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${autopilotEnabled ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
              <span className="text-xs font-bold tracking-tight">Daily Autopilot</span>
            </div>
            <button
              onClick={onToggleAutopilot}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                autopilotEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  autopilotEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <p className="text-[11px] mt-1.5 text-slate-400 leading-tight">
            {autopilotEnabled 
              ? '⚡ Active: Creating & posting daily reels/posts across 6 channels' 
              : '⏸️ Paused: Click toggle to enable autonomous daily posting'}
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon size={16} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                  {item.badge}
                </span>
              )}
              {item.badgeCount && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-pink-500/30 text-pink-300 font-bold">
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Store Info */}
      <div className="p-3 border-t border-[#252a36] bg-[#0f1116] text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="truncate font-medium">MMStore Egypt (EGP)</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">v1.0.0</span>
      </div>
    </aside>
  );
};
