import React from 'react';
import { PlatformId } from '../types';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Send, 
  MessageSquare, 
  Twitter, 
  Linkedin,
  Ghost,
  Pin
} from 'lucide-react';

interface Props {
  platform: PlatformId;
  className?: string;
  size?: number;
}

export const PlatformIcon: React.FC<Props> = ({ platform, className = '', size = 18 }) => {
  switch (platform) {
    case 'instagram':
      return <Instagram size={size} className={`text-pink-500 ${className}`} />;
    case 'tiktok':
      return (
        <span className={`font-black text-xs px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 ${className}`}>
          TT
        </span>
      );
    case 'facebook':
      return <Facebook size={size} className={`text-blue-500 ${className}`} />;
    case 'youtube':
      return <Youtube size={size} className={`text-red-500 ${className}`} />;
    case 'telegram':
      return <Send size={size} className={`text-sky-400 ${className}`} />;
    case 'whatsapp':
      return <MessageSquare size={size} className={`text-emerald-400 ${className}`} />;
    case 'x':
      return <Twitter size={size} className={`text-slate-200 ${className}`} />;
    case 'pinterest':
      return <Pin size={size} className={`text-rose-500 ${className}`} />;
    case 'linkedin':
      return <Linkedin size={size} className={`text-blue-400 ${className}`} />;
    case 'snapchat':
      return <Ghost size={size} className={`text-yellow-400 ${className}`} />;
    default:
      return <MessageSquare size={size} className={className} />;
  }
};
