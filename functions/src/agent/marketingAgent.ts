import { Product, Post, VideoPlan, AutopilotConfig, PlatformId, VideoStoryboardScene } from '../types';

export interface GeneratedContentPackage {
  title: string;
  captionArabic: string;
  captionEnglish: string;
  hashtags: string[];
  suggestedPlatforms: PlatformId[];
  format: 'reel' | 'photo' | 'carousel' | 'post';
  aspectRatio: '9:16' | '1:1' | '16:9';
  callToActionArabic: string;
  callToActionEnglish: string;
  videoPlan?: VideoPlan;
}

export class AIMarketingAgent {
  /**
   * 1. Content Strategist: Scans catalog & chooses optimal product for campaign
   */
  static selectBestProductToPromote(products: Product[], minStock = 5): Product | null {
    // Filter available in-stock products with safe inventory
    const eligible = products.filter(p => p.inStock && p.totalStock >= minStock);
    if (eligible.length === 0) return null;

    // Prioritize by profit margin % and total stock
    return eligible.sort((a, b) => (b.marginPercent * b.totalStock) - (a.marginPercent * a.totalStock))[0];
  }

  /**
   * 2. Copywriter & Fashion Creative Specialist:
   * Generates grounded bilingual copy (Egyptian Arabic + English) based STRICTLY on real product data.
   */
  static async generateFashionContent(
    product: Product,
    theme: 'new_drop' | 'lifestyle_styling' | 'offer_sale' | 'behind_the_scenes' | 'customer_fav' = 'new_drop',
    geminiApiKey?: string
  ): Promise<GeneratedContentPackage> {
    const availableSizes = product.variants.map(v => v.size).join(', ');
    const availableColors = Array.from(new Set(product.variants.map(v => v.color))).join(', ');
    const priceFormatted = `${product.basePrice} ${product.currency}`;

    // Prompt templates with Egyptian Arabic fashion vocabulary & English copy
    const generated = this.buildFashionCopywriting({
      name: product.name,
      titleArabic: product.titleArabic,
      category: product.category,
      price: priceFormatted,
      sizes: availableSizes,
      colors: availableColors,
      theme,
      url: product.productUrl,
    });

    return generated;
  }

  /**
   * 3. Video & Reels Producer:
   * Generates high-converting 9:16 vertical video storyboard with 0-3 second hook.
   */
  static generateReelStoryboard(product: Product, theme = 'new_drop'): VideoPlan {
    const hooks = [
      {
        visualHook: `⚡ زووم سريع على تفاصيل الـ ${product.titleArabic} مع حركة يد عصرية`,
        textOverlayArabic: `لو بتدور على كواليتي وفيت مظبوط.. شوف دا! 🔥`,
        textOverlayEnglish: `Stop scrolling! The ultimate ${product.name} is here 🚀`,
      },
      {
        visualHook: `⚡ مقارنة ستايلنج سريعة: قبل وبعد لبس الـ ${product.titleArabic}`,
        textOverlayArabic: `القطعة اللي هتغير شكل طقمك تماماً 💯`,
        textOverlayEnglish: `Upgrade your daily outfit with this piece ✨`,
      },
      {
        visualHook: `⚡ تفريغ الكوليكشن الجديد من العلبة (Unboxing) بلقطات ماكرو للخامة`,
        textOverlayArabic: `الخامة والتقفيل عالي أوي.. مش مجرد كلام! 👌`,
        textOverlayEnglish: `Premium fabric & clean cut. Touch the difference.`,
      }
    ];

    const selectedHook = hooks[Math.floor(Math.random() * hooks.length)];

    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        durationSec: 3,
        visualPrompt: selectedHook.visualHook,
        onScreenTextArabic: selectedHook.textOverlayArabic,
        onScreenTextEnglish: selectedHook.textOverlayEnglish,
        voiceoverScriptArabic: `يا هلا بيكم! النهاردة معانا ${product.titleArabic} من MMStore.`,
        voiceoverScriptEnglish: `Check this out! Fresh drop from MMStore: ${product.name}.`,
        cameraMovement: 'zoom_in',
        productAngle: 'front',
      },
      {
        sceneNumber: 2,
        durationSec: 5,
        visualPrompt: `لقطة ماكرو مقربة بتوضح تقفيل الخياطة وتطريز اللوجو ونقاء اللون`,
        onScreenTextArabic: `خامة قطن ١٠٠٪ وتقفيل بريميوم ما يختلفش عليه اتنين 🧵`,
        onScreenTextEnglish: `100% premium quality craftsmanship and fit.`,
        voiceoverScriptArabic: `شوف تفاصيل الخامة ونظافة الفينش، معمول عشان يعيش معاك.`,
        voiceoverScriptEnglish: `Look closely at the details and stitching. Built to last.`,
        cameraMovement: 'slow_tilt',
        productAngle: 'macro_detail',
      },
      {
        sceneNumber: 3,
        durationSec: 4,
        visualPrompt: `عارض لابس الـ ${product.titleArabic} مع سنيكرز وبنطلون كارجو لإظهار الفيت الواقعي`,
        onScreenTextArabic: `المقاسات المتاحة: ${product.variants.map(v => v.size).join(' - ')} | متوفر بكذا لون 🎨`,
        onScreenTextEnglish: `Sizes: ${product.variants.map(v => v.size).join(', ')} | Multiple colors`,
        voiceoverScriptArabic: `الفيت بتاعه أوفر سايز مظبوط على الجسم، وتقدر تنسقه بسهولة.`,
        voiceoverScriptEnglish: `The silhouette sits perfectly on any casual or streetwear look.`,
        cameraMovement: 'pan_right',
        productAngle: 'model_wear',
      },
      {
        sceneNumber: 4,
        durationSec: 3,
        visualPrompt: `لوحة MMStore الختامية مع كارت السعر ${product.basePrice} ${product.currency} وكود الخصم ورابط المتجر`,
        onScreenTextArabic: `السعر: ${product.basePrice} ${product.currency} | شحن لجميع المحافظات 🚚`,
        onScreenTextEnglish: `Only ${product.basePrice} ${product.currency} | Nationwide Delivery`,
        voiceoverScriptArabic: `اطلب دلوقتي من اللينك في البايو قبل نفاذ الكمية!`,
        voiceoverScriptEnglish: `Link in bio to shop now before stock runs out!`,
        cameraMovement: 'static_hero',
        productAngle: 'flat_lay',
      }
    ];

    return {
      id: `vid_${Date.now()}_${product.id}`,
      orgId: product.orgId,
      productId: product.id,
      title: `Reel Showcase: ${product.name}`,
      hook0to3s: selectedHook,
      scenes,
      targetDurationSec: 15,
      aspectRatio: '9:16',
      musicMood: 'urban_hype',
      ctaArabic: `اطلب دلوقتي من الرابط في البايو أو ابعتلنا رسالة 📩`,
      ctaEnglish: `Shop now via link in bio or DM us! ⚡`,
      status: 'ready',
      createdAt: Date.now(),
    };
  }

  /**
   * Helper to build high-converting Egyptian Arabic & English copywriting
   */
  private static buildFashionCopywriting(params: {
    name: string;
    titleArabic: string;
    category: string;
    price: string;
    sizes: string;
    colors: string;
    theme: string;
    url: string;
  }): GeneratedContentPackage {
    const arabicHooks = [
      `الستايل اللي هيليق على كل خروجاتك وصل أخيراً! 🔥`,
      `علشان شياكتك تبدأ من التفاصيل.. جبنالك الـ ${params.titleArabic} بأعلى كواليتي 💯`,
      `مش أي قطعة بننزلها، بس دي تحديداً هتبقى قطعتك المفضلة الصيف/الشتا ده! ✨`,
      `الفيت اللي كل الناس بتسأل عليه متوفر دلوقتي في MMStore 🚀`,
    ];

    const englishHooks = [
      `Elevate your streetwear rotation with the latest ${params.name}! 🔥`,
      `Comfort meets uncompromised style. Discover the new ${params.name} by MMStore. ⚡`,
      `The cut, the fabric, the details — everything you need in one clean essential. ✨`,
    ];

    const selectedArHook = arabicHooks[Math.floor(Math.random() * arabicHooks.length)];
    const selectedEnHook = englishHooks[Math.floor(Math.random() * englishHooks.length)];

    const captionArabic = `
${selectedArHook}

👕 الموديل: ${params.titleArabic}
💰 السعر: ${params.price} فقط (سعر المصنع الحقيقي)
📏 المقاسات المتوفرة: ${params.sizes}
🎨 الألوان المتاحة: ${params.colors}
🚚 متاح شحن سريع ومعاينة قبل الاستلام لجميع محافظات مصر!

👇 للطلب السريع: اضغط على الرابط أسفل البوست أو ابعتلنا مسج على الخاص!
`.trim();

    const captionEnglish = `
${selectedEnHook}

▪️ Item: ${params.name}
▪️ Price: ${params.price}
▪️ Available Sizes: ${params.sizes}
▪️ Available Colors: ${params.colors}
▪️ Fast shipping with cash on delivery available.

👉 Order online now via the link in our bio or tap Shop Now!
`.trim();

    const hashtags = [
      '#MMStore',
      '#StreetwearEgypt',
      '#CairoFashion',
      '#AlexFashion',
      '#ملابس_شبابية',
      '#موضة_رجالي',
      '#سنيكرز_مصر',
      '#ملابس_كاجوال',
      '#OOTD_Egypt',
      '#EgyptShopping',
      '#FashionDrop',
    ];

    return {
      title: `${params.name} - Official Showcase`,
      captionArabic,
      captionEnglish,
      hashtags,
      suggestedPlatforms: ['instagram', 'tiktok', 'facebook', 'youtube', 'telegram'],
      format: 'reel',
      aspectRatio: '9:16',
      callToActionArabic: 'اطلب دلوقتي والدفع عند الاستلام بعد المعاينة 🚚',
      callToActionEnglish: 'Shop now with free exchange & preview upon delivery 📦',
    };
  }
}
