import React, { useState } from 'react';
import { Settings, Key, Globe, Sparkles, ShieldCheck, Check, Save } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [storeUrl, setStoreUrl] = useState<string>('https://mmstore.com');
  const [currency, setCurrency] = useState<string>('EGP');
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Settings size={20} className="text-indigo-400" />
            Brand Kit, Voice &amp; API Integrations
          </h2>
          <p className="text-xs text-slate-400">
            Configure MMStore brand identity, Egyptian Arabic voice guidelines, Google Gemini model, and secure API credentials.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Save size={14} /> {saved ? 'Settings Saved!' : 'Save Brand Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Kit Card */}
        <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe size={15} className="text-pink-400" />
            MMStore Fashion Brand Kit
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Online Store URL</label>
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
              <label className="text-slate-300 font-semibold block mb-1">Egyptian Arabic Copywriting Guidelines</label>
              <textarea
                defaultValue="نبرة شبابية عصرية (Streetwear & Casual)، استخدام كلمات مصرية مألوفة زي (الفيت، الكواليتي، التقفيل، الشياكة، خامة قطن 100%). دائماً التأكيد على المعاينة قبل الاستلام والدفع عند الاستلام."
                rows={3}
                dir="rtl"
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-arabic leading-relaxed text-xs"
              />
            </div>
          </div>
        </div>

        {/* API Credentials Card */}
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
