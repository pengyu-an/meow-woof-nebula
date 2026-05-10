import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, Pet } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { Sparkles } from 'lucide-react';

interface ChatProps {
  pet: Pet;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isTyping?: boolean;
  dialogueRemaining?: number;
  isVIP?: boolean;
}

export function Chat({ pet, messages, onSendMessage, isTyping, dialogueRemaining = 0, isVIP = false }: ChatProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    if (!isVIP && dialogueRemaining <= 0) return;
    onSendMessage(input);
    setInput('');
  };

  // Only keep the recent messages to keep the screen uncluttered (e.g. 1 round)
  const displayMessages = messages.slice(-2);
  
  const isExhausted = !isVIP && dialogueRemaining <= 0;

  return (
    <div className="flex flex-col h-full bg-transparent w-full">
      <div className="flex flex-col flex-1 max-w-[260px] mx-auto w-full relative">
        {!isVIP && (
             <div className="absolute top-2 left-0 right-0 flex justify-center z-10 pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/80 border border-white/10 flex items-center gap-1.5 shadow-sm">
                    <Sparkles size={10} className="text-blue-300" />
                    今日星尘回响剩余：<span className="font-bold text-white">{dialogueRemaining}</span> 次
                </div>
             </div>
        )}

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 px-2 pb-2 space-y-4 overflow-y-auto"
        >
          <div className="flex flex-col justify-start gap-4 min-h-full pt-10">
            {displayMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex w-full",
                  msg.sender === 'user' ? "justify-end" : "justify-center"
                )}
              >
                {msg.sender === 'user' ? (
                  <div className="bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-white font-medium shadow-md leading-relaxed rounded-full text-[11px] max-w-[90%]">
                    {msg.text}
                  </div>
                ) : (
                  <div className="relative w-full flex flex-col items-center">
                    {/* Speech bubble style for Pet */}
                    <div className="px-5 py-3 rounded-[2rem] border border-white/30 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white text-[12px] font-bold tracking-wide flex flex-col items-center w-full text-center">
                      {msg.text}
                    </div>
                    {/* Bubble tail bubbles */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                      <span className="w-2 h-2 rounded-full border border-white/30 bg-white/10" />
                      <span className="w-1 h-1 rounded-full border border-white/30 bg-white/10" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-2 w-full"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="pb-6 pt-2 flex gap-2 items-center justify-center relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isExhausted}
            placeholder={isExhausted ? "星尘已沉睡，喂食零食可唤醒" : "今天去哪玩儿啦..."}
            className={cn(
              "flex-1 w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-[11px] font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-white/60 shadow-lg",
              isExhausted && "bg-black/20 border-white/10 text-white/50"
            )}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isExhausted}
            className="px-4 py-2 bg-transparent border border-white/40 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:border-white/10 flex items-center justify-center text-[11px] shrink-0"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
