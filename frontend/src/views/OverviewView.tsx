import React from 'react';
import { 
  TrendingUp, 
  Eye, 
  ShoppingBag, 
  DollarSign, 
  Share2, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Flame,
  Zap,
  Play
} from 'lucide-react';
import { Product, Post, SocialAccount, CampaignFinance } from '../types';
import { PlatformIcon } from '../components/PlatformIcon';
import { StatusBadge } from '../components/StatusBadge';

interface Props {
  products: Product[];
  posts: Post[];
  accounts: SocialAccount[];
  finances: CampaignFinance[];
  autopilotEnabled: boolean;
  onNavigate: (tab: any) => void;
  onTriggerAutopilot: () => void;
}

export const OverviewView: React.FC<Props> = ({
  products,
  posts,
  accounts,
  finances,
  autopilotEnabled,
  onNavigate,
  onTriggerAutopilot,
}) => {
  const publishedPosts = posts.filter(p => p.status === 'published');
  const scheduledPosts = posts.filter(p => p.status === 'scheduled');

  const totalAttributedRev = finances.reduce((acc, f) => acc + f.attributedRevenue, 0);
  const totalNetProfit = finances.reduce((acc, f) => acc + f.contributionProfit, 0);
  const totalAdSpend = finances.reduce((acc, f) => acc + f.adSpend, 0);
  const blendedROAS = totalAdSpend > 0 ? (totalAttributedRev / totalAdSpend).toFixed(2) : '0';
  const totalViews = publishedPosts.reduce((acc, p) => acc + (p.metrics?.views || 0), 0);

  return (
    <div className="space-y-6">
      {/* Autopilot Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-pink-950/40 border border-indigo-500/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Zap size={13} className="text-amber-400 fill-amber-400" />
              <span>Autonomous Social Media Pilot</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              MMStore AI Marketing Control Center
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Automated daily fashion campaigns for T-shirts, hoodies, sneakers & street style across <strong className="text-white">TikTok, Instagram, Facebook, YouTube, Telegram & X</strong> without manual effort.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('agent')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Sparkles size={14} /> Agent Settings
            </button>
            <button
              onClick={() => onNavigate('content-studio')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
            >
              Create Post
            </button>
          </div>
        </div>

        {/* Live Status Sub-strip */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${autopilotEnabled ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
            <span>Mode: <strong className={autopilotEnabled ? 'text-emerald-400' : 'text-slate-400'}>{autopilotEnabled ? 'Autonomous Daily Posting (Active)' : 'Manual Review Mode'}</strong></span>
          </div>
          <div>
            Connected Channels: <strong className="text-slate-200">{accounts.filter(a => a.connected).length} / {accounts.length} Active</strong>
          </div>
          <div>
            Next Scheduled Slot: <strong className="text-indigo-300">Today at 18:00 (Cairo Peak Time)</strong>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attributed Revenue */}
        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Attributed Revenue</span>
            <DollarSign size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {totalAttributedRev.toLocaleString()} <span className="text-xs font-semibold text-slate-400">EGP</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+28.4% from social attribution</span>
          </div>
        </div>

        {/* Blended ROAS */}
        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Blended ROAS</span>
            <TrendingUp size={16} className="text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {blendedROAS}x
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Ad Spend: <strong className="text-slate-200">{totalAdSpend.toLocaleString()} EGP</strong>
          </div>
        </div>

        {/* Net Contribution Profit */}
        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Net Contribution Profit</span>
            <ShoppingBag size={16} className="text-pink-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            +{totalNetProfit.toLocaleString()} <span className="text-xs font-semibold text-slate-400">EGP</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            After COGS, shipping & ad costs
          </div>
        </div>

        {/* Total Video Views & Reach */}
        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Social Video Views</span>
            <Eye size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {(totalViews / 1000).toFixed(1)}k
          </div>
          <div className="mt-2 text-[11px] text-cyan-400 flex items-center gap-1">
            <span>Reels, TikTok & Shorts impressions</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Today's Publishing Stream & Channel Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scheduled & Recent Posts (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar size={16} className="text-indigo-400" />
              Automated Publishing Stream
            </h3>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              Open Full Calendar <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {posts.slice(0, 4).map((post) => (
              <div 
                key={post.id}
                className="p-3.5 rounded-xl bg-[#14171d] border border-[#252a36] hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-800 shrink-0 relative group">
                    <img 
                      src={post.mediaUrls[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300'} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} className="text-white fill-white" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{post.title}</h4>
                      <StatusBadge status={post.status} />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 font-arabic" dir="rtl">
                      {post.captionArabic}
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                      <span className="capitalize font-medium text-slate-400">{post.format} ({post.aspectRatio})</span>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        {post.platforms.map(pl => (
                          <PlatformIcon key={pl} platform={pl} size={13} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  {post.metrics && (
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">{(post.metrics.views / 1000).toFixed(1)}k views</div>
                      <div className="text-[10px] text-emerald-400 font-medium">+{post.metrics.conversions} orders</div>
                    </div>
                  )}
                  <button
                    onClick={() => onNavigate('content-studio')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Channels & Quick Stats (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Share2 size={16} className="text-pink-400" />
              Connected Channels
            </h3>
            <button
              onClick={() => onNavigate('accounts')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              Manage
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-3">
            {accounts.slice(0, 6).map((acc) => (
              <div key={acc.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60 last:border-0">
                <div className="flex items-center gap-2.5">
                  <PlatformIcon platform={acc.platform} size={16} />
                  <div>
                    <div className="font-semibold text-slate-200">{acc.accountName}</div>
                    <div className="text-[10px] text-slate-500">{acc.username}</div>
                  </div>
                </div>
                <StatusBadge status={acc.status} />
              </div>
            ))}
          </div>

          {/* Catalog Snapshot */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">Catalog Inventory Health</span>
              <span className="text-[10px] text-emerald-400 font-bold">100% In Stock</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              AI Agent is actively monitoring {products.length} fashion products. High-margin items with &gt;5 stock are prioritized for daily drops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
