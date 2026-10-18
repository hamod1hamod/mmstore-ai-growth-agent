import { db } from '../config/firebase';
import { SocialPlatformConnectors } from '../publishers/connectors';
import { Post, SocialAccount, PlatformId } from '../types';

export class PublishingDispatcher {
  /**
   * Worker runs every 1-5 minutes to dispatch scheduled posts
   */
  static async processPendingJobs(): Promise<{ processedCount: number; errors: string[] }> {
    const now = Date.now();
    const errors: string[] = [];
    let processedCount = 0;

    // Fetch jobs ready to execute
    const jobsSnap = await db.collectionGroup('scheduledJobs')
      .where('status', '==', 'pending')
      .where('executeAt', '<=', now)
      .limit(20)
      .get();

    for (const jobDoc of jobsSnap.docs) {
      const job = jobDoc.data();
      const orgId = job.orgId;
      const postId = job.postId;

      try {
        const postRef = db.collection('organizations').doc(orgId).collection('posts').doc(postId);
        const postSnap = await postRef.get();

        if (!postSnap.exists) {
          await jobDoc.ref.update({ status: 'canceled', reason: 'Post not found' });
          continue;
        }

        const post = postSnap.data() as Post;

        if (post.status !== 'scheduled' && post.status !== 'approved') {
          await jobDoc.ref.update({ status: 'skipped', reason: `Post status is ${post.status}` });
          continue;
        }

        // Mark as publishing to lock job (concurrency protection)
        await postRef.update({ status: 'publishing' });
        await jobDoc.ref.update({ status: 'processing', startedAt: now });

        // Fetch connected social accounts for this organization
        const accountsSnap = await db.collection('organizations').doc(orgId).collection('socialAccounts').get();
        const accountsMap = new Map<PlatformId, SocialAccount>();
        accountsSnap.forEach(doc => {
          const acc = doc.data() as SocialAccount;
          accountsMap.set(acc.platform, acc);
        });

        // Publish to each target platform
        const results = [];
        let allSuccessful = true;

        for (const platform of post.platforms) {
          const account = accountsMap.get(platform);
          const result = await SocialPlatformConnectors.publish(post, platform, account);
          results.push(result);

          // Record individual publishing attempt log
          await db.collection('organizations').doc(orgId).collection('publishingAttempts').add({
            postId: post.id,
            platform,
            success: result.success,
            platformPostId: result.platformPostId || null,
            publishedUrl: result.publishedUrl || null,
            error: result.error || null,
            timestamp: Date.now(),
          });

          if (!result.success) {
            allSuccessful = false;
          }
        }

        if (allSuccessful) {
          await postRef.update({
            status: 'published',
            publishedAt: Date.now(),
            updatedAt: Date.now(),
          });
          await jobDoc.ref.update({ status: 'completed', completedAt: Date.now() });
          processedCount++;
        } else {
          const retryCount = (post.retryCount || 0) + 1;
          if (retryCount <= 3) {
            // Exponential backoff retry (5m, 15m, 45m)
            const nextAttempt = Date.now() + Math.pow(3, retryCount) * 5 * 60 * 1000;
            await postRef.update({
              status: 'scheduled',
              retryCount,
              failureReason: 'One or more platform publishes failed. Retrying.',
              updatedAt: Date.now(),
            });
            await jobDoc.ref.update({
              status: 'pending',
              executeAt: nextAttempt,
              retries: retryCount,
            });
          } else {
            await postRef.update({
              status: 'failed',
              failureReason: 'Max retries exceeded.',
              updatedAt: Date.now(),
            });
            await jobDoc.ref.update({ status: 'failed', failedAt: Date.now() });
          }
        }

      } catch (err: any) {
        console.error(`Error processing job ${jobDoc.id}:`, err);
        errors.push(`Job ${jobDoc.id}: ${err.message}`);
        await jobDoc.ref.update({ status: 'error', error: err.message });
      }
    }

    return { processedCount, errors };
  }
}
