import React, { useState } from 'react';
import { 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { SocialAccount, PlatformId, PlatformCapability } from '../types';
import { PlatformIcon } from '../components/PlatformIcon';
import { StatusBadge } from '../components/StatusBadge';

interface Props {
  accounts: SocialAccount[];
  onToggleAccount: (accountId: string) => void;
}

export const SocialAccountsView: React.FC<Props> = ({ accounts, onToggleAccount }) => {
  const [selectedAccount, setSelectedAccount] = useState<SocialAccount>(accounts[0] || {} as SocialAccount);
  const [copied, setCopied] = useState(false);

  // Platform capabilities table
  const platformCaps: Record<PlatformId, {
    name: string;
    directPublish: boolean;
    supportsReels: boolean;
    formats: string;
    limit: string;
  }> = {
    instagram: { name: 'Instagram Graph API', directPublish: true, supportsReels: true, formats: 'Reels, Carousels, Photos, Stories', limit: '2,200 chars • 90s Reels' },
    tiktok: { name: 'TikTok Content Posting v2', directPublish: true, supportsReels: true, formats: 'Vertical Videos (9:16)', limit: '2,200 chars • 10m Video' },
    facebook: { name: 'Facebook Pages Graph API', directPublish: true, supportsReels: true, formats: 'Reels, Feed Posts, Videos, Photos', limit: '63,000 chars' },
    youtube: { name: 'YouTube Data API v3', directPublish: true, supportsReels: true, formats: 'Shorts (<=60s 9:16), Long-form', limit: '5,000 chars' },
    telegram: { name: 'Telegram Bot API', directPublish: true, supportsReels: true, formats: 'Photos, Videos, Channel Broadcasts with CTA', limit: '4,096 chars' },
    x: { name: 'X / Twitter API v2', directPublish: true, supportsReels: false, formats: 'Tweets, Images, Videos', limit: '280 chars' },
    pinterest: { name: 'Pinterest API v5', directPublish: true, supportsReels: false, formats: 'Pins, Idea Pins', limit: '500 chars' },
    whatsapp: { name: 'WhatsApp Cloud API', directPublish: true, supportsReels: false, formats: 'Catalog Messages, Customer Chat', limit: '1,024 chars' },
    linkedin: { name: 'LinkedIn Community API', directPublish: true, supportsReels: false, formats: 'Company Posts, Media', limit: '3,000 chars' },
    snapchat: { name: 'Snapchat Marketing', directPublish: false, supportsReels: true, formats: 'Stories, Spotlight (Manual Package)', limit: '250 chars' },
  };

  const handleCopyInstructions = () => {
    const text = `
[MMSTORE MANUAL PUBLISH PACKAGE]
Platform: ${selectedAccount.platform.toUpperCase()}
1. Download media asset from MMStore media library.
2. Open ${selectedAccount.platform} app / Business Suite.
3. Paste verified bilingual caption with product link.
4. Publish and mark completed in MMStore.
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Share2 size={20} className="text-indigo-400" />
            Social Media Platform Integrations & Registry
          </h2>
          <p className="text-xs text-slate-400">
            Official OAuth connectors, API capability matrix, automated direct publishing, and clear manual publishing workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">
            Active Channels: <strong className="text-emerald-400">{accounts.filter(a => a.connected).length} Connected</strong>
          </span>
        </div>
      </div>

      {/* Accounts List & Capability Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Connected Accounts List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Configured Social Channels</h3>
          
          <div className="space-y-2.5">
            {accounts.map((acc) => {
              const isSelected = selectedAccount.id === acc.id;
              const cap = platformCaps[acc.platform] || { name: acc.platform, directPublish: true, formats: 'Standard' };

              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccount(acc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected 
                      ? 'bg-indigo-950/30 border-indigo-500 shadow-md shadow-indigo-500/10' 
                      : 'bg-[#14171d] border-[#252a36] hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                      <PlatformIcon platform={acc.platform} size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{acc.accountName}</h4>
                        <StatusBadge status={acc.status} />
                      </div>
                      <div className="text-[11px] text-slate-400">{acc.username}</div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                        <span>{cap.name}</span>
                        <span>•</span>
                        <span className={cap.directPublish ? 'text-emerald-400' : 'text-amber-400'}>
                          {cap.directPublish ? 'Direct API Publish' : 'Manual Fallback Ready'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleAccount(acc.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        acc.connected 
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {acc.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capability Matrix & Manual Publish Fallback (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <PlatformIcon platform={selectedAccount.platform} size={22} />
            <div>
              <h3 className="text-xs font-bold text-white">{selectedAccount.accountName}</h3>
              <p className="text-[10px] text-slate-400">{selectedAccount.platform.toUpperCase()} Capabilities</p>
            </div>
          </div>

          {/* Capability breakdown */}
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Publishing Method:</span>
                <strong className={platformCaps[selectedAccount.platform]?.directPublish ? 'text-emerald-400' : 'text-amber-400'}>
                  {platformCaps[selectedAccount.platform]?.directPublish ? 'Direct Automated API' : 'Manual Package Fallback'}
                </strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Supports Reels / Shorts:</span>
                <strong className="text-white">
                  {platformCaps[selectedAccount.platform]?.supportsReels ? 'Yes (9:16 Vertical)' : 'No'}
                </strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Supported Media:</span>
                <strong className="text-slate-200">
                  {platformCaps[selectedAccount.platform]?.formats}
                </strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Limits:</span>
                <strong className="text-slate-200">
                  {platformCaps[selectedAccount.platform]?.limit}
                </strong>
              </div>
            </div>

            {/* Manual Publishing Workflow Card */}
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Info size={14} />
                  Prepared Manual Workflow
                </span>
                <button
                  onClick={handleCopyInstructions}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                When direct publishing is restricted by account level, the AI automatically prepares the formatted high-res media, bilingual caption, product links, and hashtags ready to paste.
              </p>
            </div>

            {/* Token Security Note */}
            <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-1">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>Tokens and OAuth refresh secrets are strictly encrypted server-side in Secret Manager.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
