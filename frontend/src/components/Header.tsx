import React from 'react';
import { 
  Sparkles, 
  Bell, 
  RefreshCw, 
  CheckCircle2, 
  Globe, 
  DollarSign, 
  CalendarClock,
  Zap
} from 'lucide-react';

interface Props {
  autopilotEnabled: boolean;
  onTriggerAutopilotNow: () => void;
  isAutopilotRunning: boolean;
  activeTabTitle: string;
}

export const Header: React.FC<Props> = ({
  autopilotEnabled,
  onTriggerAutopilotNow,
  isAutopilotRunning,
  activeTabTitle,
}) => {
  return (
    <header className="h-16 bg-[#14171d]/90 backdrop-blur border-b border-[#252a36] px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold text-white tracking-tight">
          {activeTabTitle}
        </h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60 hidden sm:inline-flex items-center gap-1.5">
          <Globe size={12} className="text-indigo-400" /> Cairo (GMT+3)
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Autopilot Trigger Button */}
        <button
          onClick={onTriggerAutopilotNow}
          disabled={isAutopilotRunning}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all disabled:opacity-60 cursor-pointer"
        >
          {isAutopilotRunning ? (
            <>
              <RefreshCw size={14} className="animate-spin text-white" />
              <span>Agent Creating Daily Drop...</span>
            </>
          ) : (
            <>
              <Zap size={14} className="fill-amber-300 text-amber-300" />
              <span>Run Daily Autopilot Now</span>
            </>
          )}
        </button>

        {/* Currency Pill */}
        <div className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-300 flex items-center gap-1">
          <span className="text-emerald-400 font-bold">EGP</span>
          <span className="text-slate-500 text-[10px]">Egyptian Pound</span>
        </div>

        {/* Demo Mode / Environment Tag */}
        <div className="px-2.5 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Fashion Agent</span>
        </div>
      </div>
    </header>
  );
};
