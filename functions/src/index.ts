import { onRequest, onCall, HttpsError } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { db } from './config/firebase';
import { AutopilotService } from './cron/autopilotCron';
import { PublishingDispatcher } from './cron/publishingDispatcher';
import { AIMarketingAgent } from './agent/marketingAgent';
import { SocialPlatformConnectors } from './publishers/connectors';
import { SocialWebhookHandler } from './webhooks/socialWebhooks';
import { FinancialGrowthEngine } from './analytics/financials';
import { SubscriptionManager, SUBSCRIPTION_PLANS } from './subscription/subscriptionManager';
import { Product, Post, PlatformId } from './types';

/**
 * 1. Daily Autopilot Cloud Scheduler Trigger
 * Fires every day at 06:00 AM UTC (08:00 AM Cairo time)
 * Automatically scans inventory, generates reels & posts, and schedules/publishes them.
 */
export const dailyAutopilotSchedule = onSchedule('every day 06:00', async (event) => {
  console.log('[CRON] Running daily scheduled autopilot...');
  const orgsSnap = await db.collection('organizations').get();
  for (const orgDoc of orgsSnap.docs) {
    try {
      await AutopilotService.runDailyAutopilot(orgDoc.id);
    } catch (err) {
      console.error(`Autopilot failed for org ${orgDoc.id}:`, err);
    }
  }
});

/**
 * HTTP Trigger for triggering daily autopilot on demand or from UI
 */
export const triggerAutopilotNow = onRequest({ cors: true }, async (req, res) => {
  const orgId = (req.query.orgId as string) || (req.body?.orgId as string) || 'default-mmstore';
  try {
    const result = await AutopilotService.runDailyAutopilot(orgId);
    res.status(200).json({ success: true, ...result });
  } catch (err: any) {
    console.error('Trigger autopilot error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 2. Background Publishing Dispatcher
 * Runs every 5 minutes to dispatch scheduled posts to social platform APIs
 */
export const processScheduledPostsCron = onSchedule('every 5 minutes', async (event) => {
  await PublishingDispatcher.processPendingJobs();
});

export const triggerPublishingDispatcherNow = onRequest({ cors: true }, async (req, res) => {
  try {
    const result = await PublishingDispatcher.processPendingJobs();
    res.status(200).json({ success: true, ...result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 3. Callable: AI Content Generation (Product-to-Content in Egyptian Arabic & English)
 */
export const generateAIContent = onCall(async (request) => {
  const { product, theme } = request.data as { product: Product; theme?: any };
  if (!product) {
    throw new HttpsError('invalid-argument', 'Product data is required.');
  }

  const generated = await AIMarketingAgent.generateFashionContent(product, theme);
  const videoPlan = AIMarketingAgent.generateReelStoryboard(product, theme);

  return {
    ...generated,
    videoPlan,
  };
});

/**
 * 4. Callable: Publish Post Now
 */
export const publishPostNow = onCall(async (request) => {
  const { post, platform } = request.data as { post: Post; platform: PlatformId };
  if (!post || !platform) {
    throw new HttpsError('invalid-argument', 'Post and platform are required.');
  }

  // Fetch account if available
  let account;
  if (post.orgId) {
    const accSnap = await db.collection('organizations').doc(post.orgId)
      .collection('socialAccounts')
      .where('platform', '==', platform)
      .limit(1)
      .get();
    if (!accSnap.empty) {
      account = accSnap.docs[0].data() as any;
    }
  }

  const result = await SocialPlatformConnectors.publish(post, platform, account);
  return result;
});

/**
 * 5. Inbound Social Webhooks (Meta, TikTok, WhatsApp)
 */
export const socialWebhook = onRequest({ cors: true }, async (req, res) => {
  // Verification challenge for Meta Webhooks
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === (process.env.META_WEBHOOK_VERIFY_TOKEN || 'mmstore_secure_token')) {
      res.status(200).send(challenge);
      return;
    }
    res.status(403).send('Forbidden verification token');
    return;
  }

  // Inbound messages / comments
  try {
    const payload = req.body;
    const orgId = (req.query.orgId as string) || 'default-mmstore';
    
    // Example format extraction from Meta / TikTok webhook
    const messageText = payload.entry?.[0]?.messaging?.[0]?.message?.text || payload.text || 'Inquiry regarding product';
    const senderId = payload.entry?.[0]?.messaging?.[0]?.sender?.id || payload.senderId || `user_${Date.now()}`;
    const platform = (payload.platform as PlatformId) || 'instagram';

    const result = await SocialWebhookHandler.processInboundMessage({
      orgId,
      platform,
      senderId,
      senderName: payload.senderName || 'Shopper',
      senderHandle: payload.senderHandle || '@shopper',
      messageText,
    });

    res.status(200).json(result);
  } catch (err: any) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 6. Financial Profitability & Attribution Ingestion
 */
export const ingestOrderAndAttribute = onRequest({ cors: true }, async (req, res) => {
  try {
    const { order, orgId = 'default-mmstore' } = req.body;
    if (!order) {
      res.status(400).json({ error: 'Order is required' });
      return;
    }

    // Save order
    const orderId = order.id || `ord_${Date.now()}`;
    await db.collection('organizations').doc(orgId).collection('orders').doc(orderId).set({
      ...order,
      id: orderId,
      orgId,
      createdAt: Date.now(),
    });

    res.status(200).json({ success: true, orderId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * 7. GitHub Marketplace Webhook Endpoint
 * Ingests purchase, upgrade, downgrade, and cancellation events from GitHub
 */
export const githubMarketplaceWebhook = onRequest({ cors: true }, async (req, res) => {
  try {
    const signature = req.headers['x-hub-signature-256'] as string;
    const event = req.body;

    console.log('[GITHUB WEBHOOK] Received event:', req.headers['x-github-event']);

    const result = await SubscriptionManager.processGitHubMarketplaceEvent(event);
    res.status(200).json(result);
  } catch (err: any) {
    console.error('GitHub marketplace webhook error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 8. Callable: Get Subscription & Quota Usage
 */
export const getSubscriptionPlan = onCall(async (request) => {
  const orgId = (request.data?.orgId as string) || 'default-mmstore';
  const sub = await SubscriptionManager.getSubscription(orgId);
  const plan = SUBSCRIPTION_PLANS[sub.tier];
  return { subscription: sub, plan, allPlans: Object.values(SUBSCRIPTION_PLANS) };
});

/**
 * General Health Check
 */
export const health = onRequest({ cors: true }, (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'MMStore AI Growth Agent Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    capabilities: [
      'daily_autopilot_cron',
      'multi_platform_publishing',
      'egyptian_arabic_copywriting',
      'reels_storyboard_engine',
      'roas_attribution_calculator',
      'customer_inbox_ai',
    ]
  });
});
