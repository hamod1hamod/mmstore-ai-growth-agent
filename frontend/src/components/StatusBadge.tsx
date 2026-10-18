import React from 'react';
import { PostStatus } from '../types';

interface Props {
  status: PostStatus | 'healthy' | 'token_expiring' | 'disconnected' | 'rate_limited';
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'published':
      case 'healthy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'publishing':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 animate-pulse';
      case 'awaiting_approval':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'failed':
      case 'disconnected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'token_expiring':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'draft':
      default:
        return 'bg-slate-700/30 text-slate-400 border-slate-700';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'published': return 'Published';
      case 'scheduled': return 'Scheduled';
      case 'publishing': return 'Publishing...';
      case 'awaiting_approval': return 'Approval Needed';
      case 'failed': return 'Failed';
      case 'healthy': return 'Active & Healthy';
      case 'token_expiring': return 'Token Expiring';
      case 'disconnected': return 'Disconnected';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {getLabel()}
    </span>
  );
};
