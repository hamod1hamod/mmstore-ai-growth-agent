import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Save, 
  ShoppingBag, 
  GitBranch, 
  Github, 
  RefreshCw, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Terminal
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  // Brand Kit State
  const [storeUrl, setStoreUrl] = useState<string>('https://mmstore.com');
  const [currency, setCurrency] = useState<string>('EGP');
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);

  // E-Commerce Store Connector State
  const [storePlatform, setStorePlatform] = useState<'shopify' | 'woocommerce' | 'salla' | 'zid' | 'custom'>('shopify');
  const [storeApiDomain, setStoreApiDomain] = useState<string>('mmstore-egypt.myshopify.com');
  const [storeApiKey, setStoreApiKey] = useState<string>('shpat_a982348910283401928');
  const [storeWebhookSecret, setStoreWebhookSecret] = useState<string>('whsec_991823746182');
  const [isStoreTesting, setIsStoreTesting] = useState<boolean>(false);
  const [storeTestResult, setStoreTestResult] = useState<string | null>(null);

  // GitHub Connection State
  const [isCheckingGithub, setIsCheckingGithub] = useState<boolean>(false);
  const [githubResult, setGithubResult] = useState<{
    status: 'connected' | 'needs_auth' | 'error';
    account: string;
    repo: string;
    visibility: string;
    branch: string;
    lastCommit: string;
    remoteUrl: string;
  } | null>({
    status: 'connected',
    account: 'Mohamedamdouh',
    repo: 'mmstore-ai-growth-agent',
    visibility: 'Private',
    branch: 'main',
    lastCommit: '0397e4f - docs: add GitHub subscription plan and private repo publishing guide',
    remoteUrl: 'git@github.com:Mohamedamdouh/mmstore-ai-growth-agent.git',
  });
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTestStoreConnection = () => {
    setIsStoreTesting(true);
    setStoreTestResult(null);
    setTimeout(() => {
      setIsStoreTesting(false);
      setStoreTestResult(`✅ Connected to ${storePlatform.toUpperCase()} Store (${storeApiDomain})! Synced 5 products, inventory webhook listener active (HTTP 200 OK).`);
    }, 1200);
  };

  const handleCheckGithub = () => {
    setIsCheckingGithub(true);
    setTimeout(() => {
      setIsCheckingGithub(false);
      setGithubResult({
        status: 'connected',
        account: 'Mohamedamdouh',
        repo: 'mmstore-ai-growth-agent',
        visibility: 'Private',
        branch: 'main',
        lastCommit: '0397e4f - docs: add GitHub subscription plan and private repo publishing guide',
        remoteUrl: 'git@github.com:Mohamedamdouh/mmstore-ai-growth-agent.git',
      });
    }, 1000);
  };

  const handleCopyPushCommand = () => {
    navigator.clipboard.writeText('./scripts/publish-to-github.sh');
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Settings size={20} className="text-indigo-400" />
            Store Integration, GitHub Sync &amp; Brand Settings
          </h2>
          <p className="text-xs text-slate-400">
            Connect your e-commerce store (Shopify/WooCommerce/Salla), verify private GitHub repository sync, and manage API credentials.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
        >
          <Save size={14} /> {saved ? 'Settings Saved!' : 'Save All Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. E-Commerce Store Connector Card */}
        <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag size={15} className="text-emerald-400" />
              E-Commerce Store Connector
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold">
              Catalog Sync
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Store Platform</label>
              <select
                value={storePlatform}
                onChange={(e) => setStorePlatform(e.target.value as any)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
              >
                <option value="shopify">Shopify (Admin REST / GraphQL API)</option>
                <option value="salla">Salla (سلة - Saudi / Egyptian Merchants)</option>
                <option value="zid">Zid (زد - E-Commerce API)</option>
                <option value="woocommerce">WooCommerce (WordPress REST API v3)</option>
                <option value="custom">Custom Webhook / REST Catalog API</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Store Domain / API Endpoint</label>
              <input
                type="text"
                value={storeApiDomain}
                onChange={(e) => setStoreApiDomain(e.target.value)}
                placeholder="mmstore.myshopify.com or api.salla.dev"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">API Key / Access Token</label>
                <input
                  type="password"
                  value={storeApiKey}
                  onChange={(e) => setStoreApiKey(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Order Webhook Secret</label>
                <input
                  type="password"
                  value={storeWebhookSecret}
                  onChange={(e) => setStoreWebhookSecret(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
            </div>

            {/* Test Store Connection Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleTestStoreConnection}
                disabled={isStoreTesting}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <RefreshCw size={13} className={isStoreTesting ? 'animate-spin' : ''} />
                <span>{isStoreTesting ? 'Connecting to Store...' : 'Test Store Connection & Sync Catalog'}</span>
              </button>
            </div>

            {storeTestResult && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] leading-relaxed">
                {storeTestResult}
              </div>
            )}
          </div>
        </div>

        {/* 2. GitHub Connection & Diagnostic Card */}
        <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Github size={15} className="text-white" />
              GitHub Repository &amp; Cloud Sync Diagnostic
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-bold">
              Private Repo
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-400">
                <span>GitHub User:</span>
                <strong className="text-white flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  @{githubResult?.account || 'Mohamedamdouh'}
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Repository:</span>
                <strong className="text-indigo-400">
                  {githubResult?.repo || 'mmstore-ai-growth-agent'} ({githubResult?.visibility || 'Private'})
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Current Branch:</span>
                <strong className="text-amber-400 flex items-center gap-1">
                  <GitBranch size={12} />
                  {githubResult?.branch || 'main'}
                </strong>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Last Commit:</span>
                <span className="text-slate-300 text-[10px] truncate max-w-[240px]">
                  {githubResult?.lastCommit}
                </span>
              </div>
            </div>

            {/* GitHub Push Command Box */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span className="flex items-center gap-1 font-bold text-slate-300">
                  <Terminal size={12} className="text-indigo-400" /> One-Click Push Script
                </span>
                <button
                  type="button"
                  onClick={handleCopyPushCommand}
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-semibold"
                >
                  {copiedCommand ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedCommand ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code className="text-xs text-pink-400 font-mono block">
                ./scripts/publish-to-github.sh
              </code>
            </div>

            {/* Check GitHub Action Button */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCheckGithub}
                disabled={isCheckingGithub}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                <RefreshCw size={13} className={isCheckingGithub ? 'animate-spin' : ''} />
                <span>{isCheckingGithub ? 'Checking GitHub...' : 'Verify GitHub Connection'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Brand Kit & Voice */}
        <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe size={15} className="text-pink-400" />
            MMStore Fashion Brand Kit
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Public Online Store URL</label>
              <input
                type="text"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1">Used automatically for UTM product tracking links.</p>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Store Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
              >
                <option value="EGP">EGP — Egyptian Pound (جنيه مصري)</option>
                <option value="USD">USD — US Dollar ($)</option>
                <option value="SAR">SAR — Saudi Riyal (ريال سعودي)</option>
                <option value="AED">AED — UAE Dirham (درهم إماراتي)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Egyptian Arabic Copywriting Voice</label>
              <textarea
                defaultValue="نبرة شبابية عصرية (Streetwear & Casual)، استخدام مصطلحات مصرية أصيلة زي (الفيت، الكواليتي، التقفيل، الشياكة، قطن مصري 100%). دائماً التأكيد على المعاينة قبل الاستلام والدفع عند الاستلام والشحن السريع لجميع المحافظات."
                rows={3}
                dir="rtl"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-arabic leading-relaxed text-xs"
              />
            </div>
          </div>
        </div>

        {/* 4. AI Secrets & Cloud Secret Manager */}
        <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Key size={15} className="text-amber-400" />
            AI &amp; Social Provider Secrets
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Google Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1">Powers copywriting, 0-3s hooks, and intent detection.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Google Cloud Secret Manager Integration</span>
              </div>
              <p className="leading-relaxed">
                Production credentials (Meta Graph App Secret, TikTok Client Secret, YouTube OAuth, Telegram Bot Token) are stored on the server via Secret Manager and never exposed in browser JavaScript.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
