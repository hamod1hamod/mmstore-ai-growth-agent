import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Calendar, 
  Wand2, 
  Tag, 
  Layers, 
  ShoppingBag, 
  Upload, 
  Film, 
  Image as ImageIcon, 
  Clock,
  Play,
  RotateCcw,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Product, Post, PlatformId, ContentFormat } from '../types';
import { PlatformIcon } from '../components/PlatformIcon';

interface Props {
  products: Product[];
  onSchedulePost: (post: Post) => void;
  onPublishNow: (post: Post, platform: PlatformId) => void;
}

export const ContentStudioView: React.FC<Props> = ({
  products,
  onSchedulePost,
  onPublishNow,
}) => {
  // Mode: 'catalog' (Product-to-content) vs 'upload' (Custom user video/photo upload)
  const [studioMode, setStudioMode] = useState<'catalog' | 'upload'>('catalog');

  // Catalog generation state
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || {} as Product);
  const [selectedTheme, setSelectedTheme] = useState<'new_drop' | 'offer_sale' | 'lifestyle_styling' | 'customer_fav'>('new_drop');
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>('reel');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(['instagram', 'tiktok', 'facebook', 'youtube', 'telegram']);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Upload Custom Media State
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string>('');
  const [uploadedMediaType, setUploadedMediaType] = useState<'video' | 'image'>('video');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('My Custom Video Drop');

  // Scheduling Date-Time state
  // Default to 3 hours from now formatted for datetime-local
  const defaultScheduleTime = new Date(Date.now() + 3 * 3600000).toISOString().slice(0, 16);
  const [scheduledDateTime, setScheduledDateTime] = useState<string>(defaultScheduleTime);

  // Editable bilingual copy
  const [captionArabic, setCaptionArabic] = useState<string>(
    `الستايل اللي هيغير شكل طقمك وصل أخيراً! 🔥\n\n👕 الموديل: ${products[0]?.titleArabic}\n💰 السعر: ${products[0]?.basePrice} EGP فقط (سعر المصنع الحقيقي)\n📏 المقاسات المتوفرة: ${products[0]?.variants.map(v => v.size).join(', ')}\n🎨 الألوان: أسود، بيج، رمادي\n🚚 متاح شحن سريع ومعاينة قبل الاستلام لجميع محافظات مصر!\n\n👇 للطلب السريع: اضغط على الرابط أسفل البوست أو ابعتلنا مسج على الخاص!`
  );

  const [captionEnglish, setCaptionEnglish] = useState<string>(
    `Elevate your streetwear rotation with the latest ${products[0]?.name}! 🔥\n\n▪️ Price: ${products[0]?.basePrice} EGP\n▪️ Available Sizes: ${products[0]?.variants.map(v => v.size).join(', ')}\n▪️ 100% Premium Egyptian Combed Cotton\n▪️ Fast shipping with cash on delivery available.\n\n👉 Order online now via link in bio!`
  );

  const [hashtags, setHashtags] = useState<string[]>([
    '#MMStore',
    '#StreetwearEgypt',
    '#CairoFashion',
    '#AlexFashion',
    '#ملابس_شبابية',
    '#سنيكرز_مصر',
    '#OOTD_Egypt'
  ]);

  // Handle local user file upload (Video or Image)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUploadedMediaUrl(url);
    setUploadedFileName(file.name);

    if (file.type.startsWith('video/')) {
      setUploadedMediaType('video');
      setSelectedFormat('reel');
    } else {
      setUploadedMediaType('image');
      setSelectedFormat('photo');
    }
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    regenerateContent(prod, selectedTheme);
  };

  const regenerateContent = (prod: Product, theme: string) => {
    const sizes = prod.variants.map(v => v.size).join(', ');
    const colors = Array.from(new Set(prod.variants.map(v => v.color))).join(', ');
    
    let arHook = `الستايل اللي كل الناس بتسأل عليه متوفر دلوقتي في MMStore! 🔥`;
    if (theme === 'offer_sale') arHook = `⚡ فرصة متتعوضش! خصم إضافي على الشحن لفترة محدودة على ${prod.titleArabic}!`;
    if (theme === 'lifestyle_styling') arHook = `شياكة كل يوم وفيت مريح بيمشي على أي ستايل.. ${prod.titleArabic} 💯`;

    setCaptionArabic(
      `${arHook}\n\n👕 الموديل: ${prod.titleArabic}\n💰 السعر: ${prod.basePrice} EGP\n📏 المقاسات: ${sizes}\n🎨 الألوان: ${colors}\n🚚 متاح شحن سريع ومعاينة قبل الاستلام لجميع محافظات مصر!\n\n👇 اطلب دلوقتي من الرابط أسفل البوست!`
    );

    setCaptionEnglish(
      `Fresh drop: ${prod.name} ⚡\n\n▪️ Price: ${prod.basePrice} EGP\n▪️ Sizes: ${sizes}\n▪️ Colors: ${colors}\n▪️ Premium Quality & Authentic Fit\n\n👉 Tap link in bio to shop now!`
    );
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Schedule or Publish Post
  const handleSavePost = (publishImmediate = false) => {
    const targetTimestamp = publishImmediate 
      ? Date.now() 
      : new Date(scheduledDateTime).getTime() || (Date.now() + 3600000);

    const mediaList = studioMode === 'upload' && uploadedMediaUrl
      ? [uploadedMediaUrl]
      : selectedProduct.images;

    const postTitle = studioMode === 'upload' 
      ? customTitle 
      : `${selectedProduct.name} - ${selectedTheme.toUpperCase()}`;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      orgId: selectedProduct.orgId || 'default-mmstore',
      productId: studioMode === 'catalog' ? selectedProduct.id : undefined,
      title: postTitle,
      captionArabic,
      captionEnglish,
      hashtags,
      platforms: selectedPlatforms,
      format: selectedFormat,
      aspectRatio: selectedFormat === 'reel' ? '9:16' : '1:1',
      mediaUrls: mediaList,
      productUrl: selectedProduct.productUrl || 'https://mmstore.com',
      utmParams: {
        utm_source: 'content_studio',
        utm_medium: selectedFormat,
        utm_campaign: 'fashion_drop',
      },
      status: publishImmediate ? 'published' : 'scheduled',
      scheduledTime: targetTimestamp,
      publishedAt: publishImmediate ? Date.now() : undefined,
      idempotencyKey: `user_${Date.now()}`,
      retryCount: 0,
      autoGenerated: false,
      requiresHumanApproval: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (publishImmediate) {
      onPublishNow(newPost, selectedPlatforms[0]);
    } else {
      onSchedulePost(newPost);
      alert(`✅ Post successfully scheduled for ${new Date(targetTimestamp).toLocaleString()} across ${selectedPlatforms.join(', ')}!`);
    }
  };

  // Quick Preset Helper for Time Management
  const setQuickTimePreset = (hoursFromNow: number) => {
    const date = new Date(Date.now() + hoursFromNow * 3600000);
    setScheduledDateTime(date.toISOString().slice(0, 16));
  };

  return (
    <div className="space-y-6">
      {/* Studio Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Sparkles size={20} className="text-pink-400" />
            Social Content &amp; Media Studio
          </h2>
          <p className="text-xs text-slate-400">
            Generate posts from catalog products OR upload your own videos/images and manage exact sharing times.
          </p>
        </div>

        {/* Mode Toggle: Catalog vs Custom Upload */}
        <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
          <button
            onClick={() => setStudioMode('catalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              studioMode === 'catalog' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag size={13} />
            <span>Catalog Generator</span>
          </button>
          <button
            onClick={() => setStudioMode('upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              studioMode === 'upload' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload size={13} />
            <span>Upload My Video / Photo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Source & Target Platforms (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {studioMode === 'upload' ? (
            /* Upload Custom Video/Image Card */
            <div className="p-5 rounded-2xl bg-[#14171d] border border-pink-500/30 space-y-4 shadow-xl">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Film size={15} className="text-pink-400" />
                Upload Your Video or Photo
              </h3>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-slate-700 hover:border-pink-500 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-slate-950/60 text-center">
                <Upload size={24} className="text-pink-400" />
                <span className="text-xs font-bold text-white">Click or drag &amp; drop to upload</span>
                <span className="text-[10px] text-slate-400">Supports MP4, MOV, WebM, JPG, PNG (Up to 500MB)</span>
                <input 
                  type="file" 
                  accept="video/*,image/*" 
                  onChange={handleFileUpload}
                  className="hidden" 
                />
              </label>

              {/* Uploaded File Live Preview */}
              {uploadedMediaUrl && (
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span>Preview: <strong className="text-white">{uploadedFileName}</strong></span>
                    <span className="text-pink-400 uppercase font-bold text-[10px]">{uploadedMediaType}</span>
                  </div>

                  <div className="rounded-xl overflow-hidden bg-black max-h-56 flex items-center justify-center border border-slate-800">
                    {uploadedMediaType === 'video' ? (
                      <video 
                        src={uploadedMediaUrl} 
                        controls 
                        className="w-full h-full max-h-56 object-contain"
                      />
                    ) : (
                      <img 
                        src={uploadedMediaUrl} 
                        alt="Uploaded preview" 
                        className="w-full h-full max-h-56 object-contain"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Custom Title Input */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Post Title / Internal Label</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          ) : (
            /* Catalog Selection Card */
            <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag size={14} className="text-indigo-400" />
                Select Product from Catalog
              </h3>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {products.map((prod) => {
                  const isSelected = selectedProduct.id === prod.id;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className={`p-2.5 rounded-lg border transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected 
                          ? 'bg-indigo-600/15 border-indigo-500 text-white' 
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <img 
                        src={prod.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200'} 
                        alt={prod.name}
                        className="w-11 h-11 rounded object-cover shrink-0 bg-slate-800"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate">{prod.name}</div>
                        <div className="text-[10px] text-emerald-400 font-bold">{prod.basePrice} EGP • {prod.totalStock} in stock</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Target Platforms Selector */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 size={14} className="text-cyan-400" />
              Target Social Media Channels
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {(['instagram', 'tiktok', 'facebook', 'youtube', 'telegram', 'x', 'pinterest', 'whatsapp'] as PlatformId[]).map((p) => {
                const active = selectedPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      const updated = active ? selectedPlatforms.filter(x => x !== p) : [...selectedPlatforms, p];
                      setSelectedPlatforms(updated);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
                      active 
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <PlatformIcon platform={p} size={14} />
                    <span className="capitalize">{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Management & Scheduling Picker */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} />
                Manage Share Date &amp; Time
              </h4>
              <span className="text-[10px] text-slate-400">Cairo Time (GMT+3)</span>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Pick Exact Date &amp; Time:</label>
              <input
                type="datetime-local"
                value={scheduledDateTime}
                onChange={(e) => setScheduledDateTime(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] text-slate-400">Quick Cairo Peak Hour Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setQuickTimePreset(3)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 cursor-pointer"
                >
                  In 3 Hours (Peak)
                </button>
                <button
                  type="button"
                  onClick={() => setQuickTimePreset(7)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 cursor-pointer"
                >
                  Tonight 08:30 PM
                </button>
                <button
                  type="button"
                  onClick={() => setQuickTimePreset(24)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 cursor-pointer"
                >
                  Tomorrow Morning
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bilingual Copywriting & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Action Buttons Header */}
          <div className="flex items-center justify-end gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => handleSavePost(false)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Calendar size={14} /> Schedule for Chosen Time
            </button>
            <button
              onClick={() => handleSavePost(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Share2 size={14} /> Publish Immediately
            </button>
          </div>

          {/* Egyptian Arabic Copywriter Card */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                العامية المصرية (Egyptian Arabic Caption)
              </span>
              <button
                onClick={() => handleCopy(captionArabic, 'ar')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
              >
                {copiedField === 'ar' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedField === 'ar' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <textarea
              value={captionArabic}
              onChange={(e) => setCaptionArabic(e.target.value)}
              rows={6}
              dir="rtl"
              className="w-full p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs font-arabic leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* English Copy Card */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                English Caption
              </span>
              <button
                onClick={() => handleCopy(captionEnglish, 'en')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
              >
                {copiedField === 'en' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedField === 'en' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <textarea
              value={captionEnglish}
              onChange={(e) => setCaptionEnglish(e.target.value)}
              rows={5}
              className="w-full p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-100 text-xs font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Hashtag Editor */}
          <div className="p-4 rounded-xl bg-[#14171d] border border-[#252a36] space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Tag size={13} className="text-cyan-400" />
              Fashion Hashtags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {hashtags.map((h, i) => (
                <span key={i} className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
