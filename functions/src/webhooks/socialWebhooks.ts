import { db } from '../config/firebase';
import { CustomerConversation, PlatformId } from '../types';

export class SocialWebhookHandler {
  /**
   * Processes inbound webhook message/comment from social platform
   */
  static async processInboundMessage(payload: {
    orgId: string;
    platform: PlatformId;
    senderId: string;
    senderName: string;
    senderHandle: string;
    messageText: string;
  }): Promise<{ status: string; intent: string; replyGenerated?: string }> {
    const { orgId, platform, senderId, senderName, senderHandle, messageText } = payload;
    const textLower = messageText.toLowerCase();

    // 1. Detect Intent
    let intent: CustomerConversation['intent'] = 'general';
    let needsHumanEscalation = false;
    let sentiment: CustomerConversation['sentiment'] = 'neutral';

    if (textLower.includes('سعر') || textLower.includes('بكام') || textLower.includes('price') || textLower.includes('how much') || textLower.includes('cost')) {
      intent = 'purchase_inquiry';
      sentiment = 'positive';
    } else if (textLower.includes('مقاس') || textLower.includes('size') || textLower.includes('fit') || textLower.includes('طول') || textLower.includes('وزن')) {
      intent = 'size_fit_question';
      sentiment = 'neutral';
    } else if (textLower.includes('متوفر') || textLower.includes('متاح') || textLower.includes('stock') || textLower.includes('available')) {
      intent = 'stock_check';
      sentiment = 'positive';
    } else if (textLower.includes('استرجاع') || textLower.includes('فلوس') || textLower.includes('مشكلة') || textLower.includes('مكسور') || textLower.includes('تأخير') || textLower.includes('refund') || textLower.includes('scam') || textLower.includes('complaint')) {
      intent = 'complaint_refund';
      sentiment = 'urgent';
      needsHumanEscalation = true; // Rule: Sensitive complaints MUST be escalated to human
    }

    // 2. Draft Smart Response
    let suggestedAiReplyArabic = '';
    let suggestedAiReplyEnglish = '';

    if (intent === 'purchase_inquiry') {
      suggestedAiReplyArabic = `أهلاً بيك يا فندم! 🌟 الأسعار موضحة على كل قطعة، وتقدر تشوف كل التفاصيل مع كود الخصم من الرابط: mmstore.com/shop. متاح دفع عند الاستلام بعد المعاينة!`;
      suggestedAiReplyEnglish = `Hello! Thanks for reaching out. You can check all prices and available offers directly at mmstore.com/shop with cash on delivery available.`;
    } else if (intent === 'size_fit_question') {
      suggestedAiReplyArabic = `يا هلا! مقاساتنا مظبوطة جداً (Standard Fit). لو حابب تتأكد، ابعتلنا طولك ووزنك التقريبي ونقولك أفضل مقاس بالظبط 👌`;
      suggestedAiReplyEnglish = `Hey! Our sizes run true to size. Send us your approximate height and weight, and we'll gladly recommend the perfect fit.`;
    } else if (intent === 'stock_check') {
      suggestedAiReplyArabic = `مرحباً بيك! الموديل متاح حالياً بجميع المقاسات والألوان، بس الكميات محدودة. تقدر تطلبه مباشرة من البايو عشان تحجز قطعتك 🔥`;
      suggestedAiReplyEnglish = `Hi! Yes, this piece is currently in stock, but selling fast. Grab yours today from the link in our bio!`;
    } else if (intent === 'complaint_refund') {
      suggestedAiReplyArabic = `نعتذر جداً عن أي إزعاج يا فندم! حقك علينا، ومسؤول خدمة العملاء هيتواصل معاك فوراً لحل المشكلة فوراً. يرجى تزويدنا برقم الأوردر ورقم الموبايل.`;
      suggestedAiReplyEnglish = `We are truly sorry for the inconvenience. Our customer success team has been notified and is stepping in right now to make this right. Please share your order ID and phone number.`;
    }

    // 3. Save or update conversation in Firestore
    const convoId = `conv_${platform}_${senderId}`;
    const convoRef = db.collection('organizations').doc(orgId).collection('customerConversations').doc(convoId);

    const convoData: CustomerConversation = {
      id: convoId,
      orgId,
      platform,
      customerName: senderName || 'Instagram User',
      customerHandle: senderHandle || '@shopper',
      customerId: senderId,
      lastMessage: messageText,
      lastMessageAt: Date.now(),
      unreadCount: 1,
      intent,
      sentiment,
      needsHumanEscalation,
      status: needsHumanEscalation ? 'pending' : 'open',
      suggestedAiReplyArabic,
      suggestedAiReplyEnglish,
    };

    await convoRef.set(convoData, { merge: true });

    return {
      status: 'success',
      intent,
      replyGenerated: suggestedAiReplyArabic,
    };
  }
}
