import React, { useState } from 'react';
import { Zap, Clock, ShieldAlert, CheckCircle2, Save } from 'lucide-react';
import { AutopilotConfig } from '../types';

interface Props {
  config: AutopilotConfig;
  onSave: (config: AutopilotConfig) => void;
}

export const AutomationRulesView: React.FC<Props> = ({ config, onSave }) => {
  const [form, setForm] = useState<AutopilotConfig>(config);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Zap size={20} className="text-amber-400" />
            Social Automation Rules &amp; Daily Schedule
          </h2>
          <p className="text-xs text-slate-400">
            Define daily posting time slots, autonomous publishing policies, and enforceable advertising safety limits.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Save size={14} /> {saved ? 'Rules Saved!' : 'Save Automation Rules'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Time Slots */}
        <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock size={15} className="text-indigo-400" />
            Optimal Daily Posting Time Slots (Cairo Local Time)
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            AI Agent automatically schedules daily drops at peak engagement hours for Egyptian fashion shoppers.
          </p>

          <div className="space-y-2">
            {[
              { slot: 'Slot 1: 10:30 AM', desc: 'Morning commute & coffee break — Image lookbook drop' },
              { slot: 'Slot 2: 03:00 PM', desc: 'Lunch peak — TikTok & Instagram Reel showcasing outfit fit' },
              { slot: 'Slot 3: 07:30 PM', desc: 'Evening commute — YouTube Shorts & Facebook video post' },
              { slot: 'Slot 4: 10:30 PM', desc: 'Late evening prime shopping — Telegram VIP offer broadcast' },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{s.slot}</span>
                <span className="text-[11px] text-slate-400">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Guardrails */}
        <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert size={15} className="text-rose-400" />
            Enforceable Spending &amp; Stock Guardrails
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Max Daily Ad Spend Limit (EGP)</label>
              <input
                type="number"
                value={form.maxDailyAdBudget}
                onChange={(e) => setForm({ ...form, maxDailyAdBudget: Number(e.target.value) })}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">Rule: Agent will never spend advertising money beyond this limit.</p>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Inventory Safety Threshold (Units)</label>
              <input
                type="number"
                value={form.safetyInventoryThreshold}
                onChange={(e) => setForm({ ...form, safetyInventoryThreshold: Number(e.target.value) })}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">Items below this stock count are excluded from automated promotions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
