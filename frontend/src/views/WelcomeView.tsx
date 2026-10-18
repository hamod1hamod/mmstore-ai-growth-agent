import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Share2, 
  ShieldCheck, 
  Layers,
  ChevronDown,
  ShoppingBag
} from 'lucide-react';

interface Props {
  onEnterDashboard: () => void;
}

export const WelcomeView: React.FC<Props> = ({ onEnterDashboard }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Monitor scroll position to drive dynamic video scaling and transform
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Taste-Skill art direction calculations
  const videoScale = Math.max(0.75, 1 - scrollY * 0.0004);
  const videoBorderRadius = Math.min(32, scrollY * 0.05);

  return (
    <div className="min-h-screen bg-[#08090b] text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-pink-600 to-amber-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-500/20">
            MM
          </div>
          <div>
            <span className="font-extrabold text-white text-sm tracking-widest uppercase">
              MMStore
            </span>
            <span className="text-[10px] text-indigo-400 font-mono ml-2 border border-indigo-500/30 px-1.5 py-0.5 rounded">
              AI GROWTH AGENT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnterDashboard}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-white/10 cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero Section with Cinematic Full-Bleed Video Background */}
      <section className="relative min-h-screen flex flex-col justify-end p-6 sm:p-12 pb-24 overflow-hidden">
        {/* Sticky Video Background Container with Scroll Scaling */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-100 ease-out flex items-center justify-center overflow-hidden"
          style={{
            transform: `scale(${videoScale}) translateY(${scrollY * 0.15}px)`,
            borderRadius: `${videoBorderRadius}px`,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
            src="https://assets.mixkit.co/videos/preview/mixkit-young-man-wearing-streetwear-in-the-city-43189-large.mp4"
          />
          {/* Subtle Film Grain & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#08090b]/80" />
        </div>

        {/* Video Floating Controls */}
        <div className="absolute top-24 right-6 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-all cursor-pointer"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Autonomous E-Commerce Growth Pilot • Cairo &amp; Alexandria</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[0.95]">
            DOMINATE SOCIAL MEDIA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300">
              WITHOUT LIFTING A FINGER.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-light">
            MMStore's AI Agent automatically shoots, edits, scripts, schedules, and posts daily 9:16 vertical Reels, TikToks, Shorts, and lookbooks across 10 social channels. Real fashion catalog inventory, real Egyptian Arabic dialect, real profit.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onEnterDashboard}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-pink-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl shadow-indigo-500/40 cursor-pointer transform hover:-translate-y-0.5 transition-all"
            >
              <span>Enter Agent Studio</span>
              <ArrowRight size={16} />
            </button>

            <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="text-emerald-400 font-bold">100% Autonomous</span>
              <span>•</span>
              <span>No Daily Manual Work Required</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[11px] text-slate-400 animate-bounce">
          <span>Scroll to explore video showcase</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* Section 2: Taste-Skill Editorial Streetwear Showcase */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase text-indigo-400 tracking-widest block mb-2">
              01 // THE CRAFT &amp; THE STREETS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              BUILT FOR CAIRO STREETWEAR.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-arabic" dir="rtl">
            مش مجرد بوستات عادية.. الذكاء الاصطناعي بيصمم ريلز 9:16 بتعرض تفاصيل الخياطة، الفيت الأوفر سايز، وخامات القطن المصري 100% بنبرة الشارع المصري الحقيقية.
          </p>
        </div>

        {/* Dual Video & Image Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 9:16 Reel Showcase */}
          <div className="rounded-3xl bg-[#14171d] border border-white/10 overflow-hidden relative group">
            <div className="aspect-[9/16] relative overflow-hidden bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-neon-room-41584-large.mp4"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] font-bold text-white uppercase">
                TikTok &amp; Reels
              </div>
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-xs font-bold text-white font-arabic" dir="rtl">
                  هودي ميلتون 450 جرام • تقفيل دبل 🔥
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  890 EGP • 6.87x ROAS
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Sneaker Macro Movement */}
          <div className="rounded-3xl bg-[#14171d] border border-white/10 overflow-hidden relative group">
            <div className="aspect-[9/16] relative overflow-hidden bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-adjusting-his-sneakers-43285-large.mp4"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] font-bold text-white uppercase">
                Sneaker Drop
              </div>
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 space-y-1">
                <div className="text-xs font-bold text-white font-arabic" dir="rtl">
                  سنيكرز فانتوم جلد طبيعي نعل خفيف 👟
                </div>
                <div className="text-[10px] text-pink-400 font-mono">
                  1,250 EGP • High Retention Hook
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Autonomous Strategy Engine */}
          <div className="rounded-3xl bg-gradient-to-b from-[#181d26] to-[#11141a] border border-indigo-500/30 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">
                THE 5-MINUTE DAILY AUTOPILOT
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your social accounts once. The agent monitors stock, crafts authentic Egyptian copy, builds video storyboards, and publishes at 10:30, 15:00, and 19:30 Cairo peak time automatically.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Zero Hallucinations (Real sizes &amp; stock)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck size={16} className="text-indigo-400 shrink-0" />
                <span>Strict Ad Spend Caps (Never spends without approval)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck size={16} className="text-pink-400 shrink-0" />
                <span>Bilingual Copywriting (العامية المصرية &amp; EN)</span>
              </div>

              <button
                onClick={onEnterDashboard}
                className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Enter Agent Dashboard</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-xs text-slate-500 font-mono">
        MMSTORE AI GROWTH AGENT • PRODUCTION SUITE • EGYPTIAN FASHION AUTOMATION
      </footer>
    </div>
  );
};
