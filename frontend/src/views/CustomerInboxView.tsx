import React, { useState } from 'react';
import { 
  Inbox, 
  Send, 
  Bot, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { CustomerConversation } from '../types';
import { PlatformIcon } from '../components/PlatformIcon';

interface Props {
  conversations: CustomerConversation[];
  onSendReply: (convoId: string, replyText: string) => void;
}

export const CustomerInboxView: React.FC<Props> = ({ conversations, onSendReply }) => {
  const [selectedConvo, setSelectedConvo] = useState<CustomerConversation>(conversations[0] || {} as CustomerConversation);
  const [replyText, setReplyText] = useState<string>(conversations[0]?.suggestedAiReplyArabic || '');

  const handleSelectConvo = (c: CustomerConversation) => {
    setSelectedConvo(c);
    setReplyText(c.suggestedAiReplyArabic || c.suggestedAiReplyEnglish || '');
  };

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSendReply(selectedConvo.id, replyText);
    alert('Reply sent successfully to customer!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Inbox size={20} className="text-violet-400" />
            Unified AI Customer Engagement Inbox
          </h2>
          <p className="text-xs text-slate-400">
            Multichannel comments &amp; DMs with automated intent detection, Egyptian Arabic responses, and mandatory human dispute escalation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            AI Auto-Responder: Active
          </span>
        </div>
      </div>

      {/* Main Inbox Layout (Two columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Conversations List (5 cols) */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Customer Inquiries ({conversations.length})
          </h3>

          <div className="space-y-2">
            {conversations.map((c) => {
              const isSelected = selectedConvo.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectConvo(c)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected 
                      ? 'bg-violet-950/30 border-violet-500 shadow-md shadow-violet-500/10' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={c.platform} size={15} />
                      <span className="text-xs font-bold text-white">{c.customerName}</span>
                    </div>
                    {c.needsHumanEscalation ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                        <AlertCircle size={10} /> Escalate to Human
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {c.intent.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2 font-arabic" dir="rtl">
                    {c.lastMessage}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversation Thread & Smart Reply (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#14171d] border border-[#252a36] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <PlatformIcon platform={selectedConvo.platform} size={20} />
              <div>
                <h4 className="text-xs font-bold text-white">{selectedConvo.customerName}</h4>
                <div className="text-[10px] text-slate-400">{selectedConvo.customerHandle}</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Intent: <strong className="text-slate-300">{selectedConvo.intent}</strong>
            </div>
          </div>

          {/* Customer Message Bubble */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
              <User size={13} className="text-indigo-400" /> Customer Message:
            </div>
            <p className="text-xs text-white leading-relaxed font-arabic" dir="rtl">
              {selectedConvo.lastMessage}
            </p>
          </div>

          {/* AI Recommended Egyptian Arabic Reply */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-pink-400" />
                Suggested Response (Egyptian Arabic &amp; English)
              </label>
              <button
                onClick={() => setReplyText(selectedConvo.suggestedAiReplyArabic || '')}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                Reset to AI Draft
              </button>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={5}
              dir="rtl"
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-arabic leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Escalation Policy Alert */}
          {selectedConvo.needsHumanEscalation && (
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
              <ShieldAlert size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Safety Rule Enforced:</strong>
                Sensitive complaints, delayed deliveries, and refunds require explicit human review before sending.
              </div>
            </div>
          )}

          {/* Send Reply Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleSend}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
            >
              <Send size={14} /> Send Reply to Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
