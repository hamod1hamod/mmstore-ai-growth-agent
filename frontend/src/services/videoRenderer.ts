import { VideoPlan, VideoStoryboardScene } from '../types';

export class VideoRendererService {
  /**
   * Generates a dynamic video plan for any product
   */
  static generateDefaultVideoPlan(productName: string, productTitleAr: string, price: number, currency: string, imageUrl: string): VideoPlan {
    const scenes: VideoStoryboardScene[] = [
      {
        sceneNumber: 1,
        durationSec: 3,
        visualPrompt: `⚡ زووم خاطف على تفاصيل الـ ${productTitleAr}`,
        onScreenTextArabic: `الستايل اللي هيغير شكل طقمك! 🔥`,
        onScreenTextEnglish: `Stop scrolling! Fresh drop from MMStore 🚀`,
        voiceoverScriptArabic: `شوف كواليتي الـ ${productTitleAr} الجديد من MMStore.`,
        voiceoverScriptEnglish: `Check out the all-new ${productName}.`,
        cameraMovement: 'zoom_in',
        productAngle: 'front',
      },
      {
        sceneNumber: 2,
        durationSec: 4,
        visualPrompt: 'لقطة ماكرو تقريبية على خامة القماش وتقفيل الخياطة المزدوج',
        onScreenTextArabic: 'قطن مصري 100% تقيل.. خامة تعيش معاك 🧵',
        onScreenTextEnglish: '100% Heavyweight Premium Cotton. Built to last.',
        voiceoverScriptArabic: 'خامة قطن مصري فاخرة، تقفيل خياطة متين وألوان ثابتة.',
        voiceoverScriptEnglish: 'Heavyweight construction, clean stitches, and true fit.',
        cameraMovement: 'slow_tilt',
        productAngle: 'macro_detail',
      },
      {
        sceneNumber: 3,
        durationSec: 4,
        visualPrompt: 'عرض الفيت الحقيقي على الجسم مع ستايل ستريت وير',
        onScreenTextArabic: 'الفيت أوفر سايز مظبوط على أي بنطلون وسنيكرز ✨',
        onScreenTextEnglish: 'Relaxed drop-shoulder silhouette for daily wear.',
        voiceoverScriptArabic: 'بيمشي معاك في كل خروجاتك، ستايل مريح وشياكة.',
        voiceoverScriptEnglish: 'Pairs easily with cargos, denim, or retro kicks.',
        cameraMovement: 'pan_right',
        productAngle: 'model_wear',
      },
      {
        sceneNumber: 4,
        durationSec: 4,
        visualPrompt: `لوحة MMStore الختامية مع كارت السعر ${price} ${currency}`,
        onScreenTextArabic: `السعر: ${price} ${currency} | شحن لجميع المحافظات والدفع بعد المعاينة 🚚`,
        onScreenTextEnglish: `Only ${price} ${currency} | Cash on delivery available`,
        voiceoverScriptArabic: 'اطلب دلوقتي من اللينك في البايو قبل نفاذ الكمية!',
        voiceoverScriptEnglish: 'Tap link in bio to shop now before stock runs out!',
        cameraMovement: 'static_hero',
        productAngle: 'flat_lay',
      }
    ];

    return {
      id: `vid_${Date.now()}`,
      orgId: 'default-mmstore',
      productId: 'prod_1',
      title: `${productName} — 9:16 Video Reel`,
      hook0to3s: {
        visualHook: `⚡ زووم خاطف على تفاصيل الـ ${productTitleAr}`,
        textOverlayArabic: 'الستايل اللي هيغير شكل طقمك! 🔥',
        textOverlayEnglish: 'Stop scrolling! Fresh drop from MMStore 🚀',
      },
      scenes,
      targetDurationSec: 15,
      aspectRatio: '9:16',
      musicMood: 'urban_hype',
      ctaArabic: 'اطلب دلوقتي من اللينك في البايو أو ابعتلنا مسج 📩',
      ctaEnglish: 'Tap the link in bio to shop now! ⚡',
      status: 'ready',
      createdAt: Date.now(),
    };
  }

  /**
   * Renders a live canvas preview frame
   */
  static renderFrameToCanvas(
    canvas: HTMLCanvasElement,
    scene: VideoStoryboardScene,
    image: HTMLImageElement | null,
    progress: number, // 0 to 1 in scene
    brandName = 'MMStore Egypt'
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#0d0f12');
    grad.addColorStop(0.5, '#161922');
    grad.addColorStop(1, '#08090b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw Image with Ken Burns / zoom effect
    if (image && image.complete && image.naturalWidth > 0) {
      ctx.save();
      const zoom = 1 + progress * 0.12;
      const targetW = width * zoom;
      const targetH = height * 0.65 * zoom;
      const offsetX = (width - targetW) / 2;
      const offsetY = (height * 0.45 - targetH) / 2;

      ctx.beginPath();
      ctx.roundRect(width * 0.05, height * 0.12, width * 0.9, height * 0.58, 24);
      ctx.clip();
      ctx.drawImage(image, offsetX + width * 0.05, offsetY + height * 0.12, targetW * 0.9, targetH);
      ctx.restore();
    }

    // Top Header Badge
    ctx.fillStyle = 'rgba(20, 23, 29, 0.85)';
    ctx.beginPath();
    ctx.roundRect(width * 0.08, height * 0.04, width * 0.84, 52, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`⚡ ${brandName}`, width * 0.12, height * 0.075);

    ctx.fillStyle = '#ec4899';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('9:16 REEL', width * 0.88, height * 0.075);

    // Bottom Animated Text Overlay (Egyptian Arabic + English)
    ctx.fillStyle = 'rgba(13, 15, 18, 0.92)';
    ctx.beginPath();
    ctx.roundRect(width * 0.06, height * 0.73, width * 0.88, height * 0.22, 24);
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arabic Caption (Large & Bold)
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px Cairo, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(scene.onScreenTextArabic, width * 0.5, height * 0.81);

    // English Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 18px Inter, sans-serif';
    ctx.fillText(scene.onScreenTextEnglish, width * 0.5, height * 0.86);

    // Call-to-action pill
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.roundRect(width * 0.2, height * 0.89, width * 0.6, 42, 21);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Cairo, sans-serif';
    ctx.fillText('🛒 اطلب الآن من البايو (Shop Now)', width * 0.5, height * 0.92);
  }
}
