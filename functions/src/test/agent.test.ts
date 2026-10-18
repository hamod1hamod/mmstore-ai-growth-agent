import assert from 'node:assert';
import { test } from 'node:test';
import { FinancialGrowthEngine } from '../analytics/financials';
import { AIMarketingAgent } from '../agent/marketingAgent';
import { getPlatformCapability, PLATFORM_REGISTRY } from '../publishers/platformRegistry';
import { Product } from '../types';

test('FinancialGrowthEngine calculates accurate contribution profit and ROAS', () => {
  const result = FinancialGrowthEngine.calculateCampaignProfitability({
    campaignId: 'hoodie_campaign',
    orgId: 'org_test',
    attributedRevenue: 10000,
    adSpend: 2000,
    productCost: 4000,
    shippingCost: 500,
    discountsGiven: 300,
    processingFees: 200,
    ordersCount: 20,
    newCustomersCount: 15,
    totalLinkClicks: 400,
  });

  // Net Contribution Profit = 10000 - 4000 - 500 - 300 - 200 - 2000 = 3000
  assert.strictEqual(result.contributionProfit, 3000);
  // ROAS = 10000 / 2000 = 5.0
  assert.strictEqual(result.roas, 5.0);
  // CAC = 2000 / 15 = 133.33
  assert.strictEqual(result.cac, 133.33);
  // AOV = 10000 / 20 = 500
  assert.strictEqual(result.averageOrderValue, 500);
  // Conversion Rate = (20 / 400) * 100 = 5.0%
  assert.strictEqual(result.conversionRate, 5.0);
});

test('AIMarketingAgent selects eligible high-margin product and respects inventory threshold', () => {
  const testProducts: Product[] = [
    {
      id: 'p1',
      orgId: 'test',
      name: 'Low Stock Tee',
      titleArabic: 'تيشيرت قليل المخزون',
      description: 'Test',
      descriptionArabic: 'تجربة',
      category: 't-shirts',
      tags: [],
      basePrice: 300,
      currency: 'EGP',
      images: [],
      productUrl: 'https://example.com/p1',
      variants: [],
      totalStock: 2, // Below safety threshold of 5
      inStock: true,
      featured: false,
      marginPercent: 60,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'p2',
      orgId: 'test',
      name: 'High Margin Hoodie',
      titleArabic: 'هودي فاخر',
      description: 'Test',
      descriptionArabic: 'تجربة',
      category: 'hoodies',
      tags: [],
      basePrice: 800,
      currency: 'EGP',
      images: [],
      productUrl: 'https://example.com/p2',
      variants: [],
      totalStock: 50, // Healthy stock
      inStock: true,
      featured: true,
      marginPercent: 55,
      createdAt: 0,
      updatedAt: 0,
    }
  ];

  const selected = AIMarketingAgent.selectBestProductToPromote(testProducts, 5);
  assert.ok(selected);
  assert.strictEqual(selected?.id, 'p2');
});

test('Platform capability registry verifies Instagram and TikTok support 9:16 Reels', () => {
  const ig = getPlatformCapability('instagram');
  assert.strictEqual(ig.supportsReels, true);
  assert.strictEqual(ig.supportsDirectPublish, true);

  const tt = getPlatformCapability('tiktok');
  assert.strictEqual(tt.supportsReels, true);
  assert.strictEqual(tt.maxVideoDurationSec, 600);
});
