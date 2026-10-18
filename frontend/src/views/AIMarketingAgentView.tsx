import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Layers, 
  PenTool, 
  Video, 
  Send, 
  BarChart, 
  ShieldAlert, 
  MessageSquare,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Zap,
  Sliders
} from 'lucide-react';
import { AutopilotConfig, PlatformId } from '../types';
import { PlatformIcon } from '../components/PlatformIcon';

interface Props {
  autopilotConfig: AutopilotConfig;
  onUpdateConfig: (newConfig: AutopilotConfig) => void;
  onRunAutopilotNow: () => void;
  isRunning: boolean;
}

export const AIMarketingAgentView: React.FC<Props> = ({
  autopilotConfig,
  onUpdateConfig,
  onRunAutopilotNow,
  isRunning,
}) => {
  const [config, setConfig] = useState<AutopilotConfig>(autopilotConfig);
  const [selectedAgent, setSelectedAgent] = useState<string>('strategist');

  const agents = [
    {
      id: 'strategist',
      name: 'Content Strategist Agent',
      role: 'Catalog & Inventory Intelligence',
      status: 'Active',
      icon: Layers,
      color: 'text-indigo-400',
      description: 'Scans MMStore inventory, detects high-margin fashion pieces (T-shirts, hoodies, sneakers), and formulates daily campaign angles.',
      lastAction: 'Selected MM French Terry Hoodie for today (Margin: 57.3%, Stock: 85 units).',
    },
    {
      id: 'copywriter',
      name: 'Bilingual Copywriting Specialist',
      role: 'Egyptian Arabic & English Copy',
      status: 'Active',
      icon: PenTool,
      color: 'text-pink-400',
      description: 'Generates high-converting streetwear copy in authentic Egyptian Arabic (العامية المصرية) and English. Strictly grounded in real product specs.',
      lastAction: 'Drafted 3 hooks with local Cairo slang and verified cash-on-delivery inspection CTA.',
    },
    {
      id: 'creative',
      name: 'Creative & Video Reels Producer',
      role: '9:16 Vertical Video & Storyboards',
      status: 'Active',
      icon: Video,
      color: 'text-cyan-400',
      description: 'Generates 0-3 second viral hooks, scene-by-scene shot lists, macro fabric zoom prompts, and styled music moods for TikTok, Reels & Shorts.',
      lastAction: 'Composed 15s storyboard with drop-shoulder fit check & retro kicks pairing.',
    },
    {
      id: 'publisher',
      name: 'Publishing Coordinator',
      role: 'Multi-Channel Dispatcher',
      status: 'Active',
      icon: Send,
      color: 'text-emerald-400',
      description: 'Handles OAuth tokens, scheduling queues, idempotency tokens, and dispatches to Instagram, TikTok, Facebook, YouTube, Telegram & X.',
      lastAction: 'Queued 4 posts for scheduled peak hours (10:30, 15:00, 19:30, 22:30 Cairo time).',
    },
    {
      id: 'analytics',
      name: 'Performance & ROAS Analyst',
      role: 'E-commerce Sales Attribution',
      status: 'Active',
      icon: BarChart,
      color: 'text-amber-400',
      description: 'Computes true ROAS, customer acquisition costs, net contribution profit, and monitors UTM conversion events.',
      lastAction: 'Calculated 6.87x ROAS on Hoodie launch campaign (+32,787 EGP net profit).',
    },
    {
      id: 'engagement',
      name: 'Customer Engagement Assistant',
      role: 'Comment & DM Auto-Responder',
      status: 'Active',
      icon: MessageSquare,
      color: 'text-violet-400',
      description: 'Provides instant Egyptian Arabic replies for size queries and pricing. Automatically routes disputes and refund requests to human agents.',
      lastAction: 'Responded to sizing inquiry on Instagram and flagged order #MM4091 for priority human support.',
    },
  ];

  const handleTogglePlatform = (platform: PlatformId) => {
    const exists = config.targetPlatforms.includes(platform);
    const updated = exists 
      ? config.targetPlatforms.filter(p => p !== platform)
      : [...config.targetPlatforms, platform];
    const newConf = { ...config, targetPlatforms: updated };
    setConfig(newConf);
    onUpdateConfig(newConf);
  };

  const handleSaveConfig = () => {
    onUpdateConfig(config);
  };

  return (
    <div className="space-y-6">
      {/* Autopilot Control Banner */}
      <div className="p-6 rounded-2xl bg-[#14171d] border border-[#252a36] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Bot size={22} className="text-indigo-400" />
            <h2 className="text-lg font-black text-white">Autonomous Agent Coordinator</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              config.enabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
            }`}>
              {config.enabled ? 'Autopilot Active (Daily Run)' : 'Paused'}
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Coordinates 6 specialized AI sub-agents to manage content creation, video generation, scheduled publishing, and customer engagement automatically.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRunAutopilotNow}
            disabled={isRunning}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RotateCcw size={14} className="animate-spin" />
                <span>Running Agent Workflow...</span>
              </>
            ) : (
              <>
                <Zap size={14} className="fill-amber-300 text-amber-300" />
                <span>Trigger Agent Cycle Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub-Agents Interactive Grid */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-pink-400" />
          Specialized Sub-Agent Network
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((ag) => {
            const Icon = ag.icon;
            const isSelected = selectedAgent === ag.id;
            return (
              <div
                key={ag.id}
                onClick={() => setSelectedAgent(ag.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#181d26] border-indigo-500/50 shadow-md shadow-indigo-500/10' 
                    : 'bg-[#14171d] border-[#252a36] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg bg-slate-800/80 ${ag.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{ag.name}</h4>
                      <p className="text-[10px] text-slate-400">{ag.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {ag.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {ag.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400">
                  <strong className="text-slate-300">Latest Action:</strong> {ag.lastAction}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Autopilot Settings & Policy Guardrails */}
      <div className="p-6 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sliders size={16} className="text-indigo-400" />
          Autopilot Rules & Safety Guardrails
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Target Platforms */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Target Platforms for Daily Drop</label>
            <div className="grid grid-cols-2 gap-2">
              {(['instagram', 'tiktok', 'facebook', 'youtube', 'telegram', 'x'] as PlatformId[]).map((pl) => {
                const active = config.targetPlatforms.includes(pl);
                return (
                  <button
                    key={pl}
                    type="button"
                    onClick={() => handleTogglePlatform(pl)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      active 
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <PlatformIcon platform={pl} size={14} />
                    <span className="capitalize">{pl}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Post Frequency & Mode */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Daily Post Volume</label>
              <select
                value={config.dailyPostCount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const updated = { ...config, dailyPostCount: val };
                  setConfig(updated);
                  onUpdateConfig(updated);
                }}
                className="w-full mt-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={2}>2 Posts / Day (Standard)</option>
                <option value={3}>3 Posts / Day (Recommended: 1 Reel, 1 Carousel, 1 Post)</option>
                <option value={4}>4 Posts / Day (High Growth Fashion)</option>
                <option value={6}>6 Posts / Day (Aggressive Multi-Platform)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Publishing Mode</label>
              <select
                value={config.requireApproval ? 'approval' : 'autonomous'}
                onChange={(e) => {
                  const val = e.target.value === 'approval';
                  const updated = { ...config, requireApproval: val };
                  setConfig(updated);
                  onUpdateConfig(updated);
                }}
                className="w-full mt-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="autonomous">Fully Autonomous (Post without manual interaction)</option>
                <option value="approval">Human Review (Require owner approval before publishing)</option>
              </select>
            </div>
          </div>

          {/* Language & Tone */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Fashion Brand Voice</label>
              <select
                value={config.tone}
                onChange={(e) => {
                  const updated = { ...config, tone: e.target.value as any };
                  setConfig(updated);
                  onUpdateConfig(updated);
                }}
                className="w-full mt-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="streetwear_hype">Streetwear & Hype (العامية المصرية الشبابية)</option>
                <option value="casual_friendly">Casual Friendly (أسلوب مريح وودود)</option>
                <option value="premium_fashion">Premium Luxury (أنيق ورسمي)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Safety Inventory Threshold</label>
              <input
                type="number"
                value={config.safetyInventoryThreshold}
                onChange={(e) => {
                  const updated = { ...config, safetyInventoryThreshold: Number(e.target.value) };
                  setConfig(updated);
                  onUpdateConfig(updated);
                }}
                className="w-full mt-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                min={1}
                max={50}
              />
              <p className="text-[10px] text-slate-500 mt-1">Never promote items with fewer than {config.safetyInventoryThreshold} units in stock.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
