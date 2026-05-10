import React from 'react';
import { motion } from 'motion/react';
import { Mail, Settings, Package, Bell, Info, UserPlus } from 'lucide-react';
import { Mail as MailType } from '../types';

interface SystemMailProps {
  mails: MailType[];
  onAddFriend: (friend: any) => void;
  onMarkRead: (id: string) => void;
}

export function SystemMail({ mails, onAddFriend, onMarkRead }: SystemMailProps) {
  return (
    <div className="h-full bg-transparent pt-0 pb-0 overflow-y-auto px-6 relative flex flex-col no-scrollbar">
      <div className="sticky top-0 left-0 right-0 pt-10 pb-6 pl-14 z-40 flex items-center mb-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <Mail size={24} className="text-white" />
          <h2 className="text-xl font-serif font-bold text-white drop-shadow-md">系统邮件</h2>
        </div>
      </div>

      <div className="space-y-4 pb-20">
        {mails.map(mail => (
          <motion.div 
            key={mail.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`backdrop-blur-md rounded-3xl p-6 border shadow-sm relative overflow-hidden transition-all ${mail.isNew ? 'bg-white/10 border-white/30' : 'bg-black/20 border-white/10'}`}
            onClick={() => {
              if (mail.isNew) onMarkRead(mail.id);
            }}
          >
            {mail.isNew && (
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-400/20 flex items-start justify-end p-2 rounded-bl-3xl">
                <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)] animate-pulse" />
              </div>
            )}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-bold text-white">{mail.title}</h3>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{mail.date}</span>
            </div>
            
            {mail.senderInfo && (
              <div className="flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-2xl">
                <img src={mail.senderInfo.avatar} className="w-10 h-10 rounded-full border border-white/20" />
                <div className="flex-1">
                  <p className="text-xs text-white/60 mb-0.5">来自看星的人</p>
                  <p className="text-sm font-bold text-white">{mail.senderInfo.name}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddFriend(mail.senderInfo);
                  }}
                  className="flex items-center gap-1.5 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 px-3 py-1.5 rounded-full text-xs font-bold transition-colors border border-blue-500/30"
                >
                  <UserPlus size={14} /> 加为好友
                </button>
              </div>
            )}

            <p className="text-xs text-white/80 leading-relaxed">
              {mail.content}
            </p>
          </motion.div>
        ))}
        
        <div className="p-8 text-center text-white/40 flex flex-col items-center">
          <Info size={24} className="mb-2 opacity-50" />
          <p className="text-[10px] uppercase tracking-widest font-bold">没有更多邮件了</p>
        </div>
      </div>
    </div>
  );
}
