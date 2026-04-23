import React from 'react';
import { motion } from 'motion/react';
import { Mail, Settings, Package, Bell, Info } from 'lucide-react';

export function SystemMail() {
  const mails = [
    {
      id: 1,
      title: '欢迎来到星云家园',
      date: '刚刚',
      content: '亲爱的旅人，欢迎来到星云纪元。在这里，所有的思念都将化为璀璨的星尘。我们为你准备了500星币作为见面礼，祝你在星居度过愉快的时光。',
      isNew: true
    },
    {
      id: 2,
      title: '系统更新公告 v2.0',
      date: '1天前',
      content: '本次更新优化了宠物交互逻辑，新增了星尘记忆墙功能。你现在可以更方便地上传照片和记录故事了。',
      isNew: false
    }
  ];

  return (
    <div className="h-full bg-transparent pt-0 pb-0 overflow-y-auto px-6 relative flex flex-col">
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
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-sm relative overflow-hidden"
          >
            {mail.isNew && (
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-400/20 flex items-start justify-end p-2 rounded-bl-3xl">
                <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
              </div>
            )}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-bold text-white">{mail.title}</h3>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{mail.date}</span>
            </div>
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
