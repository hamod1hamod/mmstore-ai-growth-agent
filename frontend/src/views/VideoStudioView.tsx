import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Music, 
  Sliders, 
  Download, 
  Share2, 
  Layers,
  ChevronRight,
  Tv,
  CheckCircle2
} from 'lucide-react';
import { Product, VideoPlan, VideoStoryboardScene } from '../types';
import { VideoRendererService } from '../services/videoRenderer';

interface Props {
  products: Product[];
  onExportVideo?: (plan: VideoPlan) => void;
}

export const VideoStudioView: React.FC<Props> = ({ products, onExportVideo }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || {} as Product);
  const [videoPlan, setVideoPlan] = useState<VideoPlan>(() => 
    VideoRendererService.generateDefaultVideoPlan(
      products[0]?.name || 'MM Streetwear',
      products[0]?.titleArabic || 'تيشيرت أوفر سايز',
      products[0]?.basePrice || 480,
      products[0]?.currency || 'EGP',
      products[0]?.images[0] || ''
    )
  );

  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 1
  const [selectedMusic, setSelectedMusic] = useState<string>('urban_hype');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load product image for canvas rendering
  useEffect(() => {
    if (selectedProduct.images && selectedProduct.images.length > 0) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = selectedProduct.images[0];
      img.onload = () => {
        imageRef.current = img;
        renderCanvas();
      };
    }
  }, [selectedProduct]);

  // Handle live canvas preview playback
  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    const sceneDurationMs = (videoPlan.scenes[activeSceneIndex]?.durationSec || 3) * 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(elapsed / sceneDurationMs, 1);

      setProgress(currentProgress);
      renderCanvas(currentProgress);

      if (currentProgress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        // Move to next scene or loop
        if (activeSceneIndex < videoPlan.scenes.length - 1) {
          setActiveSceneIndex(prev => prev + 1);
          startTime = null;
          animId = requestAnimationFrame(animate);
        } else {
          setIsPlaying(false);
          setProgress(1);
        }
      }
    };

    if (isPlaying) {
      animId = requestAnimationFrame(animate);
    } else {
      renderCanvas(progress);
    }

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, activeSceneIndex, videoPlan]);

  const renderCanvas = (prog = progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = videoPlan.scenes[activeSceneIndex] || videoPlan.scenes[0];
    VideoRendererService.renderFrameToCanvas(canvas, scene, imageRef.current, prog, 'MMStore Egypt');
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    const plan = VideoRendererService.generateDefaultVideoPlan(
      prod.name,
      prod.titleArabic,
      prod.basePrice,
      prod.currency,
      prod.images[0] || ''
    );
    setVideoPlan(plan);
    setActiveSceneIndex(0);
    setProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Video size={20} className="text-pink-400" />
            AI Video & Reels Studio (9:16 Vertical)
          </h2>
          <p className="text-xs text-slate-400">
            Generate viral short-form videos with 0-3s attention-grabbing hooks, animated subtitles, and music for TikTok, Instagram Reels & YouTube Shorts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              alert('Video rendering job queued! Canvas renderer is assembling high-res MP4 sequence.');
              onExportVideo?.(videoPlan);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-pink-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} /> Export 9:16 Reel (1080x1920)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive 9:16 Canvas Live Preview (5 cols) */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-[#14171d] border border-[#252a36] flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Tv size={14} className="text-indigo-400" />
              Live 9:16 Reel Player
            </span>
            <span className="text-[11px] font-mono text-pink-400">
              Scene {activeSceneIndex + 1} of {videoPlan.scenes.length}
            </span>
          </div>

          {/* HTML5 Canvas container maintaining exact 9:16 vertical aspect ratio */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-indigo-500/40 bg-black">
            <canvas
              ref={canvasRef}
              width={720}
              height={1280}
              className="w-full h-full object-cover"
            />

            {/* Overlay Play/Pause Button on Hover */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer shadow-xl"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="translate-x-0.5 fill-white" />}
            </button>

            {/* Scene progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/50">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Player controls */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => {
                setActiveSceneIndex(0);
                setProgress(0);
                setIsPlaying(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={12} /> Replay
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 flex items-center gap-1.5 cursor-pointer"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? 'Pause' : 'Play Preview'}</span>
            </button>
          </div>
        </div>

        {/* Right: Storyboard Scene Sequencer & Hooks (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 0-3s Viral Hook Selector */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles size={14} />
                Viral 0–3s Hook (First 3 Seconds)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Retention Optimizer</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs space-y-1">
              <div className="font-bold text-white font-arabic text-sm" dir="rtl">
                {videoPlan.hook0to3s.textOverlayArabic}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {videoPlan.hook0to3s.textOverlayEnglish}
              </div>
            </div>
          </div>

          {/* Scene by Scene Storyboard List */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers size={14} className="text-indigo-400" />
              Scene-by-Scene Shot List ({videoPlan.scenes.length} Scenes • 15 Seconds Total)
            </h3>

            <div className="space-y-2.5">
              {videoPlan.scenes.map((scene, idx) => {
                const isActive = activeSceneIndex === idx;
                return (
                  <div
                    key={scene.sceneNumber}
                    onClick={() => {
                      setActiveSceneIndex(idx);
                      setProgress(0);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-950/30 border-indigo-500 text-white shadow-sm' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {scene.sceneNumber}
                        </span>
                        <span>Scene {scene.sceneNumber}: {scene.durationSec}s ({scene.cameraMovement})</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {scene.productAngle}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-1">
                      📸 Visual: {scene.visualPrompt}
                    </p>

                    <div className="text-xs font-semibold text-slate-200 font-arabic" dir="rtl">
                      « {scene.onScreenTextArabic} »
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sound & Music Track Selector */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Music size={14} className="text-emerald-400" />
              Trending Audio Track & Voiceover Mood
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'urban_hype', label: '🔥 Urban Hype Drill' },
                { id: 'luxury_smooth', label: '✨ Luxury Aesthetic' },
                { id: 'upbeat_trending', label: '🚀 Upbeat Street' },
                { id: 'cairo_beat', label: '🇪🇬 Egyptian Trap' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMusic(m.id)}
                  className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left cursor-pointer ${
                    selectedMusic === m.id 
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
