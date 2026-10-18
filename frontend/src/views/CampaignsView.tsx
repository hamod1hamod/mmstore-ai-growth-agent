import React from 'react';
import { Target, Sparkles, Plus, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import { CampaignFinance } from '../types';

interface Props {
  finances: CampaignFinance[];
}

export const CampaignsView: React.FC<Props> = ({ finances }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Target size={20} className="text-pink-400" />
            Marketing Campaigns &amp; Growth Experiments
          </h2>
          <p className="text-xs text-slate-400">
            Goal-driven fashion campaigns: New drops, seasonal collections, flash promotions, and A/B creative testing.
          </p>
        </div>

        <button
          onClick={() => alert('New Campaign Wizard opened!')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus size={14} /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {finances.map((c) => (
          <div key={c.campaignId} className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white capitalize">{c.campaignId.replace(/_/g, ' ')}</h3>
                <span className="text-[11px] text-slate-400">Goal: Profitable E-commerce Conversion</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Active &amp; Scaling
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div>
                <div className="text-[10px] text-slate-400">ROAS</div>
                <div className="text-base font-black text-indigo-400">{c.roas}x</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Revenue</div>
                <div className="text-base font-black text-white">{c.attributedRevenue.toLocaleString()} EGP</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Net Profit</div>
                <div className="text-base font-black text-emerald-400">+{c.contributionProfit.toLocaleString()} EGP</div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-400">
              {c.assumptionNotes.map((note, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
