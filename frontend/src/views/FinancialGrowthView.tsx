import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  PieChart,
  HelpCircle
} from 'lucide-react';
import { CampaignFinance, Product } from '../types';

interface Props {
  finances: CampaignFinance[];
  products: Product[];
}

export const FinancialGrowthView: React.FC<Props> = ({ finances, products }) => {
  const totalAttributedRevenue = finances.reduce((acc, f) => acc + f.attributedRevenue, 0);
  const totalAdSpend = finances.reduce((acc, f) => acc + f.adSpend, 0);
  const totalProductCost = finances.reduce((acc, f) => acc + f.productCost, 0);
  const totalShipping = finances.reduce((acc, f) => acc + f.shippingCost, 0);
  const totalDiscounts = finances.reduce((acc, f) => acc + f.discountsGiven, 0);
  const totalFees = finances.reduce((acc, f) => acc + f.processingFees, 0);
  const totalNetProfit = finances.reduce((acc, f) => acc + f.contributionProfit, 0);
  const blendedROAS = totalAdSpend > 0 ? (totalAttributedRevenue / totalAdSpend).toFixed(2) : '0';
  const totalOrders = finances.reduce((acc, f) => acc + f.ordersCount, 0);
  const blendedAOV = totalOrders > 0 ? Math.round(totalAttributedRevenue / totalOrders) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-400" />
            AI Financial Growth Engine (Profit &amp; ROAS)
          </h2>
          <p className="text-xs text-slate-400">
            Real e-commerce financial intelligence: True contribution profit, ROAS, CAC, and automated budget loss limits.
          </p>
        </div>

        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <span>Attribution Window:</span>
          <strong className="text-white">7-Day Click / 1-Day View</strong>
        </div>
      </div>

      {/* Top Level Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36]">
          <div className="text-xs text-slate-400 mb-1">Total Attributed Revenue</div>
          <div className="text-2xl font-black text-white">
            {totalAttributedRevenue.toLocaleString()} <span className="text-xs font-semibold text-slate-400">EGP</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400">
            {totalOrders} verified orders from social campaigns
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36]">
          <div className="text-xs text-slate-400 mb-1">Blended ROAS (Return On Ad Spend)</div>
          <div className="text-2xl font-black text-indigo-400">
            {blendedROAS}x
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Formula: Revenue / Ad Spend ({totalAdSpend.toLocaleString()} EGP)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36]">
          <div className="text-xs text-slate-400 mb-1">Net Contribution Profit</div>
          <div className="text-2xl font-black text-emerald-400">
            +{totalNetProfit.toLocaleString()} <span className="text-xs font-semibold text-slate-400">EGP</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400">
            Net margin: {totalAttributedRevenue > 0 ? ((totalNetProfit / totalAttributedRevenue) * 100).toFixed(1) : 0}% after all costs
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36]">
          <div className="text-xs text-slate-400 mb-1">Average Order Value (AOV)</div>
          <div className="text-2xl font-black text-white">
            {blendedAOV} <span className="text-xs font-semibold text-slate-400">EGP</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Average customer cart size
          </div>
        </div>
      </div>

      {/* Strategic AI Recommendations */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-indigo-950/30 border border-emerald-500/30 space-y-3">
        <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
          <Sparkles size={14} />
          AI Growth Recommendations &amp; Actionable Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              Scale Top Performer: French Terry Hoodie
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Achieved 6.87x ROAS with +32,787 EGP contribution profit. Inventory has 85 units left in stock. Recommendation: Authorize +20% ad budget scale.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-indigo-400" />
              Loss Guardrail &amp; Inventory Constraint
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Never spend ad budget automatically without owner approval. Multi-pocket cargo pants have 35 units remaining; cap daily spend at 300 EGP to prevent stockout.
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown Table by Campaign */}
      <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Campaign Profitability Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Campaign Name</th>
                <th className="pb-3 font-semibold">Revenue</th>
                <th className="pb-3 font-semibold">Ad Spend</th>
                <th className="pb-3 font-semibold">COGS</th>
                <th className="pb-3 font-semibold">Shipping</th>
                <th className="pb-3 font-semibold">Net Profit</th>
                <th className="pb-3 font-semibold">ROAS</th>
                <th className="pb-3 font-semibold">CAC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {finances.map((f) => (
                <tr key={f.campaignId} className="hover:bg-slate-800/20">
                  <td className="py-3 font-bold text-white">{f.campaignId}</td>
                  <td className="py-3 font-semibold text-slate-200">{f.attributedRevenue.toLocaleString()} EGP</td>
                  <td className="py-3 text-slate-400">{f.adSpend.toLocaleString()} EGP</td>
                  <td className="py-3 text-slate-400">{f.productCost.toLocaleString()} EGP</td>
                  <td className="py-3 text-slate-400">{f.shippingCost.toLocaleString()} EGP</td>
                  <td className="py-3 font-bold text-emerald-400">+{f.contributionProfit.toLocaleString()} EGP</td>
                  <td className="py-3 font-bold text-indigo-400">{f.roas}x</td>
                  <td className="py-3 text-slate-300">{f.cac} EGP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
