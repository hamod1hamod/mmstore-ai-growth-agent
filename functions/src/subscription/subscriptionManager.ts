import { db } from '../config/firebase';
import { SubscriptionPlan, SubscriptionTier, OrgSubscription, PlanLimits } from '../types';

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    id: 'plan_free',
    tier: 'free',
    name: 'Community Starter',
    description: 'Basic social scheduling for hobby fashion stores testing the waters.',
    priceUsd: 0,
    priceEgp: 0,
    billingPeriod: 'monthly',
    features: [
      '1 Connected Social Account',
      '1 Scheduled Post / Day',
      'Basic Bilingual Caption Generator',
      'Standard 480p Video Preview',
      'Community Documentation Support',
    ],
    limits: {
      maxChannels: 1,
      maxDailyPosts: 1,
      maxVideoDurationSec: 15,
      customerAiInbox: false,
      roasAttribution: false,
      dedicatedIp: false,
      teamSeats: 1,
      customBranding: false,
    },
  },
  starter: {
    id: 'plan_starter',
    tier: 'starter',
    name: 'Starter Growth',
    description: 'Automate daily drops for growing fashion brands expanding to 3 channels.',
    priceUsd: 29,
    priceEgp: 850,
    billingPeriod: 'monthly',
    features: [
      '3 Connected Social Accounts (Instagram, TikTok, FB)',
      '3 Daily Autopilot Posts / Day',
      'Egyptian Arabic & English Copywriting',
      '9:16 Vertical Reel Storyboards',
      '720p HD Canvas Video Export',
      'Standard UTM Conversion Tracking',
      '2 Team Member Seats',
    ],
    limits: {
      maxChannels: 3,
      maxDailyPosts: 3,
      maxVideoDurationSec: 30,
      customerAiInbox: false,
      roasAttribution: true,
      dedicatedIp: false,
      teamSeats: 2,
      customBranding: false,
    },
    githubMarketplacePlanId: 1001,
  },
  growth: {
    id: 'plan_growth',
    tier: 'growth',
    name: 'Pro Autopilot Scale',
    description: 'Full autonomous marketing engine with customer AI inbox & ROAS analytics.',
    priceUsd: 79,
    priceEgp: 2400,
    billingPeriod: 'monthly',
    popular: true,
    features: [
      'All 10 Social Media Channels Supported',
      'Unlimited Autonomous Daily Posts',
      '0-3s Viral Retention Hook Engine',
      'Full 1080x1920 Full HD Video Rendering',
      'AI Customer Engagement Inbox (Arabic/English)',
      'Real Contribution Profit & ROAS Engine',
      'Loss Guardrails & Stockout Alerts',
      '5 Team Member Seats & RBAC',
      'Priority Cloud Scheduler Queue',
    ],
    limits: {
      maxChannels: 10,
      maxDailyPosts: 999,
      maxVideoDurationSec: 90,
      customerAiInbox: true,
      roasAttribution: true,
      dedicatedIp: false,
      teamSeats: 5,
      customBranding: true,
    },
    githubMarketplacePlanId: 1002,
  },
  pro: {
    id: 'plan_pro',
    tier: 'pro',
    name: 'Pro Autopilot Scale',
    description: 'Full autonomous marketing engine with customer AI inbox & ROAS analytics.',
    priceUsd: 79,
    priceEgp: 2400,
    billingPeriod: 'monthly',
    popular: true,
    features: [
      'All 10 Social Media Channels Supported',
      'Unlimited Autonomous Daily Posts',
      '0-3s Viral Retention Hook Engine',
      'Full 1080x1920 Full HD Video Rendering',
      'AI Customer Engagement Inbox (Arabic/English)',
      'Real Contribution Profit & ROAS Engine',
      'Loss Guardrails & Stockout Alerts',
      '5 Team Member Seats & RBAC',
      'Priority Cloud Scheduler Queue',
    ],
    limits: {
      maxChannels: 10,
      maxDailyPosts: 999,
      maxVideoDurationSec: 90,
      customerAiInbox: true,
      roasAttribution: true,
      dedicatedIp: false,
      teamSeats: 5,
      customBranding: true,
    },
    githubMarketplacePlanId: 1002,
  },
  enterprise: {
    id: 'plan_enterprise',
    tier: 'enterprise',
    name: 'Enterprise Fashion VIP',
    description: 'Custom fine-tuned brand voice, dedicated IP, multi-brand and white-label support.',
    priceUsd: 199,
    priceEgp: 6000,
    billingPeriod: 'monthly',
    features: [
      'Unlimited Social Accounts & Brands',
      'Custom Fine-Tuned Egyptian Arabic Voice Model',
      'Dedicated Social Publishing IP Address',
      'Human-in-the-loop Escalation SLA (15-min)',
      'Unlimited Team Seats & Audit Trail Export',
      'Dedicated Account Strategist & Setup',
      'Custom E-Commerce ERP & POS Webhook Sync',
    ],
    limits: {
      maxChannels: 999,
      maxDailyPosts: 999,
      maxVideoDurationSec: 600,
      customerAiInbox: true,
      roasAttribution: true,
      dedicatedIp: true,
      teamSeats: 999,
      customBranding: true,
    },
    githubMarketplacePlanId: 1003,
  },
};

export class SubscriptionManager {
  /**
   * Fetches active organization subscription or returns default starter
   */
  static async getSubscription(orgId: string): Promise<OrgSubscription> {
    const docSnap = await db.collection('organizations').doc(orgId).collection('brandSettings').doc('subscription').get();
    if (docSnap.exists) {
      return docSnap.data() as OrgSubscription;
    }

    // Default Pro active plan for immediate production testing
    const defaultSub: OrgSubscription = {
      orgId,
      tier: 'growth',
      status: 'active',
      currentPeriodEnd: Date.now() + 30 * 86400000,
      githubUser: 'Mohamedamdouh',
      usageThisMonth: {
        postsPublished: 18,
        videoSecondsRendered: 270,
        aiCopyGenerations: 45,
      },
    };

    return defaultSub;
  }

  /**
   * Verifies if organization has quota to perform a requested action
   */
  static async checkQuota(orgId: string, action: 'add_channel' | 'daily_post' | 'render_video'): Promise<{ allowed: boolean; reason?: string }> {
    const sub = await this.getSubscription(orgId);
    const plan = SUBSCRIPTION_PLANS[sub.tier] || SUBSCRIPTION_PLANS.starter;

    if (sub.status !== 'active' && sub.status !== 'trialing') {
      return { allowed: false, reason: `Subscription is currently ${sub.status}. Please update billing.` };
    }

    if (action === 'daily_post' && sub.usageThisMonth.postsPublished >= plan.limits.maxDailyPosts * 30) {
      return { allowed: false, reason: `Monthly post allowance reached for ${plan.name}. Upgrade to Pro for unlimited posts.` };
    }

    return { allowed: true };
  }

  /**
   * Handles inbound GitHub Marketplace Webhook events:
   * event: 'marketplace_purchase' -> action: 'purchased', 'cancelled', 'changed'
   */
  static async processGitHubMarketplaceEvent(event: any): Promise<{ success: boolean; orgId?: string; tier?: SubscriptionTier }> {
    const action = event.action; // 'purchased' | 'cancelled' | 'changed'
    const marketplacePurchase = event.marketplace_purchase;
    const account = marketplacePurchase?.account;
    const planId = marketplacePurchase?.plan?.id;

    console.log(`[GITHUB MARKETPLACE] Event: ${action} for ${account?.login}`);

    // Map GitHub plan ID to subscription tier
    let tier: SubscriptionTier = 'starter';
    if (planId === 1002) tier = 'growth';
    if (planId === 1003) tier = 'enterprise';

    const orgId = account?.login ? `org_gh_${account.login}` : 'default-mmstore';

    const subData: Partial<OrgSubscription> = {
      orgId,
      tier: action === 'cancelled' ? 'free' : tier,
      status: action === 'cancelled' ? 'canceled' : 'active',
      githubUser: account?.login,
      githubSubscriptionId: marketplacePurchase?.id,
      currentPeriodEnd: Date.now() + 30 * 86400000,
    };

    await db.collection('organizations').doc(orgId).collection('brandSettings').doc('subscription').set(subData, { merge: true });

    return { success: true, orgId, tier: subData.tier };
  }
}
