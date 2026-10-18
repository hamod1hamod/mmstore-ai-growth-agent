import { CampaignFinance, Product } from '../types';

export interface FinancialMetricSummary {
  totalAttributedRevenue: number;
  totalAdSpend: number;
  totalProductCost: number;
  totalShippingCost: number;
  totalDiscounts: number;
  totalNetProfit: number;
  blendedROAS: number;
  blendedCAC: number;
  blendedConversionRate: number;
  blendedAOV: number;
  totalOrders: number;
  actionableInsights: string[];
}

export class FinancialGrowthEngine {
  /**
   * Calculates comprehensive e-commerce financial metrics
   */
  static calculateCampaignProfitability(raw: {
    campaignId: string;
    orgId: string;
    attributedRevenue: number;
    adSpend: number;
    productCost: number;
    shippingCost: number;
    discountsGiven: number;
    processingFees: number;
    ordersCount: number;
    newCustomersCount: number;
    totalLinkClicks: number;
  }): CampaignFinance {
    const contributionProfit = 
      raw.attributedRevenue - 
      raw.productCost - 
      raw.shippingCost - 
      raw.discountsGiven - 
      raw.processingFees - 
      raw.adSpend;

    const roas = raw.adSpend > 0 ? Number((raw.attributedRevenue / raw.adSpend).toFixed(2)) : 0;
    const cac = raw.newCustomersCount > 0 ? Number((raw.adSpend / raw.newCustomersCount).toFixed(2)) : 0;
    const conversionRate = raw.totalLinkClicks > 0 ? Number(((raw.ordersCount / raw.totalLinkClicks) * 100).toFixed(2)) : 0;
    const averageOrderValue = raw.ordersCount > 0 ? Number((raw.attributedRevenue / raw.ordersCount).toFixed(2)) : 0;

    const assumptionNotes = [
      'ROAS = Attributed revenue / Advertising spend',
      'Net Contribution Profit = Attributed Revenue - COGS - Shipping - Discounts - Gateway Fees - Ad Spend',
      'Attribution window: 7-day click / 1-day view via UTM tags and e-commerce order webhooks',
    ];

    return {
      campaignId: raw.campaignId,
      orgId: raw.orgId,
      attributedRevenue: raw.attributedRevenue,
      adSpend: raw.adSpend,
      productCost: raw.productCost,
      shippingCost: raw.shippingCost,
      discountsGiven: raw.discountsGiven,
      processingFees: raw.processingFees,
      contributionProfit,
      roas,
      cac,
      conversionRate,
      averageOrderValue,
      ordersCount: raw.ordersCount,
      assumptionNotes,
    };
  }

  /**
   * Generates strategic growth recommendations based on real margin & inventory
   */
  static generateGrowthRecommendations(
    finances: CampaignFinance[],
    products: Product[]
  ): string[] {
    const insights: string[] = [];

    // Analyze high performers
    const highRoas = finances.filter(f => f.roas >= 4.0 && f.contributionProfit > 0);
    if (highRoas.length > 0) {
      insights.push(`🚀 Campaign '${highRoas[0].campaignId}' is printing profit (ROAS: ${highRoas[0].roas}x, Net Profit: ${highRoas[0].contributionProfit.toLocaleString()} EGP). Safe to scale budget by 20%.`);
    }

    // Flag loss makers
    const lossMakers = finances.filter(f => f.adSpend > 200 && f.contributionProfit < 0);
    if (lossMakers.length > 0) {
      insights.push(`⚠️ Caution: Campaign '${lossMakers[0].campaignId}' has negative contribution profit (${lossMakers[0].contributionProfit.toLocaleString()} EGP). Recommend refreshing creative hook or pausing ad spend.`);
    }

    // Check inventory bottlenecks
    const lowStockHighMargin = products.filter(p => p.inStock && p.totalStock < 8 && p.marginPercent > 50);
    if (lowStockHighMargin.length > 0) {
      insights.push(`📦 Inventory alert: '${lowStockHighMargin[0].name}' has high profit margin (${lowStockHighMargin[0].marginPercent}%) but only ${lowStockHighMargin[0].totalStock} units left. Restock before scaling campaigns.`);
    }

    return insights;
  }
}
