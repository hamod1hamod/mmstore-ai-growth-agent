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
  Sliders,
  HeartHandshake,
  Sun,
  Sunrise,
  Moon,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  CalendarCheck2
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
  const [config, setConfig] = useState<AutopilotConfig>({
    ...autopilotConfig,
    automationMode: autopilotConfig.automationMode || 'friendly_companion',
    friendlyMorningHour: autopilotConfig.friendlyMorningHour || '10:30 AM',
    friendlyAfternoonHour: autopilotConfig.friendlyAfternoonHour || '03:00 PM',
    friendlyEveningHour: autopilotConfig.friendlyEveningHour || '08:30 PM',
  });
  const [selectedAgent, setSelectedAgent] = useState<string>('strategist');
  const [copiedDailyDrop, setCopiedDailyDrop] = useState<number | null>(null);

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
      lastAction: 'Queued 3 daily drops for peak Cairo hours (10:30 AM, 03:00 PM, 08:30 PM).',
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

  // Friendly daily routine drops
  const dailyDrops = [
    {
      id: 1,
      titleArabic: 'دروب الصباح — شياكة الخروج والجامعة ☀️',
      timeLabel: config.friendlyMorningHour || '10:30 AM',
      productName: 'تيشيرت بوكسي قطن 260 جرام (Vintage Cream)',
      productPrice: '480 EGP',
      icon: Sunrise,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      caption: `الستايل اللي هيغير شكل طقمك وصل أخيراً! 🔥 تيشيرت بوكسي قطن مصري 100% تقيل، فيت أوفر سايز مظبوط. متاح شحن سريع ومعاينة قبل الاستلام! 🚚 اطلب دلوقتي من الرابط في البايو أو ابعت مسج خاص #MMStore #StreetwearEgypt`,
      status: 'Ready (جاهز للشير)',
      channels: ['instagram', 'tiktok', 'facebook'],
    },
    {
      id: 2,
      titleArabic: 'بطل اليوم — أكتر سنيكرز مطلوب ومريح 👟',
      timeLabel: config.friendlyAfternoonHour || '03:00 PM',
      productName: 'سنيكرز فانتوم جلد طبيعي نعل طبي مريح',
      productPrice: '1,250 EGP',
      icon: Sun,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      caption: `راحة طول اليوم مع شياكة ملهاش حل! 👟 سنيكرز فانتوم جلد طبيعي متوفر بمقاسات 41 لـ 45. الشحن لباب بيتك والدفع بعد المعاينة عشان تضمن حقك 💯 احجز مقاسك دلوقتي #سنيكرز_مصر #MMStore`,
      status: 'Scheduled (مجدول تلقائياً)',
      channels: ['instagram', 'tiktok', 'whatsapp', 'telegram'],
    },
    {
      id: 3,
      titleArabic: 'سهرة وسرعة الحجز — إلحق قبل نفاذ المقاسات 🌙',
      timeLabel: config.friendlyEveningHour || '08:30 PM',
      productName: 'هودي ميلتون 450 جرام مبطن (Pitch Black)',
      productPrice: '890 EGP',
      icon: Moon,
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      caption: `السهرة محتاجة هودي يسد معاك! 🔥 هودي ميلتون تقيل 450 جرام قطن فاخر، تقفيل خياطة دبل وألوان ثابتة بعد الغسيل. باقي قطع محدودة في المخزن! ⏳ اطلب مقاسك فوراً #MMStore #CairoFashion`,
      status: 'Scheduled (مجدول تلقائياً)',
      channels: ['instagram', 'tiktok', 'facebook', 'youtube'],
    },
  ];

  const handleShareDrop = (drop: typeof dailyDrops[0]) => {
    navigator.clipboard.writeText(drop.caption);
    setCopiedDailyDrop(drop.id);
    setTimeout(() => setCopiedDailyDrop(null), 2500);

    // Open Instagram web or app intent
    window.open('https://instagram.com/', '_blank');
  };

  const handleTogglePlatform = (platform: PlatformId) => {
    const exists = config.targetPlatforms.includes(platform);
    const updated = exists 
      ? config.targetPlatforms.filter(p => p !== platform)
      : [...config.targetPlatforms, platform];
    const newConf = { ...config, targetPlatforms: updated };
    setConfig(newConf);
    onUpdateConfig(newConf);
  };

  const handleModeChange = (mode: 'friendly_companion' | 'hands_free_autopilot' | 'review_first') => {
    const newConf: AutopilotConfig = {
      ...config,
      automationMode: mode,
      requireApproval: mode === 'review_first',
    };
    setConfig(newConf);
    onUpdateConfig(newConf);
  };

  return (
    <div className="space-y-6">
      {/* 1. Warm Greeting & Friendly Companion Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181d26] via-[#161a22] to-[#14171d] border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xl">☕</span>
            <h2 className="text-lg font-black text-white">
              صباح الفل يا محمد! وكيلك الودود جاهز لليوم
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              أوتوميشن نشط ومريح
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-arabic" dir="rtl">
            أنا جهزتلك الـ 3 دروبات بتوع النهاردة بالعامية المصرية وعملت فحص كامل للمخزون عشان نتأكد إن المقاسات متوفرة. تقدر تشير أي دروب بضغطة زر واحدة على حساباتك الشخصية (@hamod1hamod)، أو تسيب الوكيل ينشرهم أوتوماتيك في أوقات الذروة!
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onRunAutopilotNow}
            disabled={isRunning}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer disabled:opacity-50 transition-all"
          >
            {isRunning ? (
              <>
                <RotateCcw size={14} className="animate-spin" />
                <span>الوكيل يجهز دروب جديد...</span>
              </>
            ) : (
              <>
                <Zap size={14} className="fill-white" />
                <span>تشغيل دورة المحتوى الآن ⚡</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Friendly Automation Mode Switcher */}
      <div className="p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <HeartHandshake size={18} className="text-pink-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              اختر أسلوب الأوتوميشن المفضل لك (Friendly Automation Mode)
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">سهل ومناسب لحسابك الشخصي</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mode 1: Friendly Companion (Recommended) */}
          <div 
            onClick={() => handleModeChange('friendly_companion')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
              config.automationMode === 'friendly_companion'
                ? 'bg-gradient-to-b from-indigo-950/40 to-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <HeartHandshake size={15} className="text-cyan-400" />
                الرفيق الودود (Friendly Companion)
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                أفضل خيار لشخصي
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-arabic" dir="rtl">
              الوكيل يجهز كل البوستات والفيديوهات يومياً، وعند الميعاد يبعتلك تنبيه وتضغط زرار واحد يفتحلك التطبيق والكابشن منسوخ جاهز للصق في 5 ثواني!
            </p>
          </div>

          {/* Mode 2: Hands-Free Autopilot */}
          <div 
            onClick={() => handleModeChange('hands_free_autopilot')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
              config.automationMode === 'hands_free_autopilot'
                ? 'bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-500 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Zap size={15} className="text-emerald-400" />
                الطيار الآلي الكامل (100% Autopilot)
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                تلقائي بالكامل
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-arabic" dir="rtl">
              النشر شغال في الخلفية بدون أي لمسة منك لقنوات البيزنس والـ APIs وبوتات تليجرام في المواعيد المحددة.
            </p>
          </div>

          {/* Mode 3: Review First */}
          <div 
            onClick={() => handleModeChange('review_first')}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2 ${
              config.automationMode === 'review_first'
                ? 'bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock size={15} className="text-amber-400" />
                المراجعة أولاً (Review &amp; Approve)
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                تحكم يدوي
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-arabic" dir="rtl">
              الوكيل يصنع المحتوى ويضعه في قائمة الانتظار، تدخل تضغط "اعتماد" قبل أن يتم النشر الفعلي.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Today's Friendly Routine Timeline (3 Daily Drops) */}
      <div className="p-6 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CalendarCheck2 size={18} className="text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              جدول النشر اليومي الودود (Today's Daily Drops Routine)
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            بتوقيت القاهرة (Cairo Time GMT+3) • مخصص لملابس MMStore
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyDrops.map((drop) => {
            const Icon = drop.icon;
            const isCopied = copiedDailyDrop === drop.id;

            return (
              <div 
                key={drop.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3 relative group hover:border-slate-700 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${drop.badgeColor}`}>
                      <Icon size={12} />
                      <span>{drop.timeLabel}</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">{drop.status}</span>
                  </div>

                  <h4 className="text-xs font-extrabold text-white leading-tight font-arabic" dir="rtl">
                    {drop.titleArabic}
                  </h4>

                  <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1">
                    <span className="truncate">{drop.productName}</span>
                    <span className="text-emerald-400 font-mono font-bold shrink-0">{drop.productPrice}</span>
                  </div>

                  {/* Caption preview box */}
                  <div className="p-2.5 rounded-lg bg-black/50 border border-slate-800 text-[10px] text-slate-400 font-arabic line-clamp-3 leading-relaxed" dir="rtl">
                    {drop.caption}
                  </div>
                </div>

                {/* 1-Click Action for User */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => handleShareDrop(drop)}
                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-95 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all"
                  >
                    <Smartphone size={13} />
                    <span>{isCopied ? 'تم النسخ وجاري فتح التطبيق!' : 'شير لحسابك الشخصي (1-Click)'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Sub-Agents Interactive Network */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-pink-400" />
          فريق الوكلاء الفرعيين (Specialized Sub-Agent Network)
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

      {/* 5. Autopilot Rules & Friendly Daily Hours Configuration */}
      <div className="p-6 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sliders size={16} className="text-indigo-400" />
          تخصيص مواعيد النشر اليومية الودودة
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Daily Drop Hours */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">أوقات النشر اليومية المفضلة (Cairo Time)</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sunrise size={13} className="text-amber-400" />
                  دروب الصباح:
                </span>
                <input
                  type="text"
                  value={config.friendlyMorningHour || '10:30 AM'}
                  onChange={(e) => {
                    const updated = { ...config, friendlyMorningHour: e.target.value };
                    setConfig(updated);
                    onUpdateConfig(updated);
                  }}
                  className="w-24 p-1 rounded bg-slate-950 border border-slate-700 text-center font-mono text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sun size={13} className="text-indigo-400" />
                  دروب بعد الظهر:
                </span>
                <input
                  type="text"
                  value={config.friendlyAfternoonHour || '03:00 PM'}
                  onChange={(e) => {
                    const updated = { ...config, friendlyAfternoonHour: e.target.value };
                    setConfig(updated);
                    onUpdateConfig(updated);
                  }}
                  className="w-24 p-1 rounded bg-slate-950 border border-slate-700 text-center font-mono text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Moon size={13} className="text-pink-400" />
                  دروب المساء والسهرة:
                </span>
                <input
                  type="text"
                  value={config.friendlyEveningHour || '08:30 PM'}
                  onChange={(e) => {
                    const updated = { ...config, friendlyEveningHour: e.target.value };
                    setConfig(updated);
                    onUpdateConfig(updated);
                  }}
                  className="w-24 p-1 rounded bg-slate-950 border border-slate-700 text-center font-mono text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Tone & Brand Voice */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">نبرة الحديث وصوت البراند</label>
            <select
              value={config.tone}
              onChange={(e) => {
                const updated = { ...config, tone: e.target.value as any };
                setConfig(updated);
                onUpdateConfig(updated);
              }}
              className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
            >
              <option value="streetwear_hype">Streetwear &amp; Hype (العامية المصرية الشبابية)</option>
              <option value="casual_friendly">Casual Friendly (أسلوب مريح وودود ومحبوب)</option>
              <option value="premium_fashion">Premium Luxury (فخم وأنيق)</option>
              <option value="direct_offer">Direct Offer (عروض وخصومات مباشرة وسريعة)</option>
            </select>
            <p className="text-[10px] text-slate-400 leading-relaxed font-arabic" dir="rtl">
              الوكيل بيكتب الكابشن بنبرة شبابية مصرية تبرز خامة القطن المصري والدفع عند المعاينة لكسب ثقة الزبون.
            </p>
          </div>

          {/* Target Platforms */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">المنصات المستهدفة للروتين اليومي</label>
            <div className="grid grid-cols-2 gap-2">
              {(['instagram', 'tiktok', 'facebook', 'youtube', 'telegram', 'whatsapp'] as PlatformId[]).map((pl) => {
                const active = config.targetPlatforms.includes(pl);
                return (
                  <button
                    key={pl}
                    type="button"
                    onClick={() => handleTogglePlatform(pl)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      active 
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold' 
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
        </div>
      </div>
    </div>
  );
};
