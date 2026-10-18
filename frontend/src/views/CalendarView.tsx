import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Share2, 
  Plus, 
  RotateCw, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';
import { Post, PlatformId, PostStatus } from '../types';
import { PlatformIcon } from '../components/PlatformIcon';
import { StatusBadge } from '../components/StatusBadge';

interface Props {
  posts: Post[];
  onRetryPost: (postId: string) => void;
  onApprovePost: (postId: string) => void;
}

export const CalendarView: React.FC<Props> = ({ posts, onRetryPost, onApprovePost }) => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedPost, setSelectedPost] = useState<Post | null>(posts[0] || null);
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPosts = posts.filter(p => {
    if (filterPlatform !== 'all' && !p.platforms.includes(filterPlatform as PlatformId)) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <CalendarIcon size={20} className="text-indigo-400" />
            Smart Social Media Calendar
          </h2>
          <p className="text-xs text-slate-400">
            Interactive schedule with automated publishing queue, idempotency protection, and instant retry.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle */}
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
            {(['day', 'week', 'month'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  viewMode === mode 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Filter Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All States</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="awaiting_approval">Awaiting Approval</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 p-4 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">This Week's Publishing Schedule</span>
              <span className="text-[11px] text-slate-400">({filteredPosts.length} posts queued)</span>
            </div>
            <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
              <Clock size={13} /> Automatic Idempotency Guard (Active)
            </div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredPosts.map((post) => {
              const isSelected = selectedPost?.id === post.id;
              const date = new Date(post.scheduledTime);
              const timeFormatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected 
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-indigo-400 flex items-center gap-1">
                      <Clock size={11} /> {timeFormatted}
                    </span>
                    <StatusBadge status={post.status} />
                  </div>

                  <div className="flex items-start gap-2.5">
                    <img 
                      src={post.mediaUrls[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200'} 
                      alt="" 
                      className="w-12 h-12 rounded object-cover shrink-0 bg-slate-800"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">{post.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 font-arabic" dir="rtl">
                        {post.captionArabic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      {post.platforms.map(pl => (
                        <PlatformIcon key={pl} platform={pl} size={12} />
                      ))}
                    </div>
                    <span className="capitalize font-mono">{post.format} ({post.aspectRatio})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post Inspector / Editor Drawer (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          {selectedPost ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Post Details</h3>
                <StatusBadge status={selectedPost.status} />
              </div>

              {/* Media Preview */}
              <div className="rounded-xl overflow-hidden bg-black aspect-video relative group">
                <img 
                  src={selectedPost.mediaUrls[0]} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white">
                  {selectedPost.format.toUpperCase()} • {selectedPost.aspectRatio}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white">{selectedPost.title}</h4>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-arabic leading-relaxed text-slate-200" dir="rtl">
                  {selectedPost.captionArabic}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono leading-relaxed text-slate-400">
                  {selectedPost.captionEnglish}
                </div>
              </div>

              {/* Idempotency & Metadata */}
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] space-y-1 text-slate-400 font-mono">
                <div>Idempotency Key: <span className="text-slate-300">{selectedPost.idempotencyKey}</span></div>
                <div>Retries: <span className="text-slate-300">{selectedPost.retryCount} / 3</span></div>
                <div>Target Channels: <span className="text-indigo-400">{selectedPost.platforms.join(', ')}</span></div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                {selectedPost.status === 'awaiting_approval' && (
                  <button
                    onClick={() => onApprovePost(selectedPost.id)}
                    className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 size={13} /> Approve Post
                  </button>
                )}
                {selectedPost.status === 'failed' && (
                  <button
                    onClick={() => onRetryPost(selectedPost.id)}
                    className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCw size={13} /> Retry Post
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">
              Select a scheduled post to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
