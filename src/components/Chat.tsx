import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, Pet } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface ChatProps {
  pet: Pet;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isTyping?: boolean;
}

export function Chat({ pet, messages, onSendMessage, isTyping }: ChatProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  // Only keep the recent messages to keep the screen uncluttered (e.g. 1 round)
  const displayMessages = messages.slice(-2);

  return (
    <div className="flex flex-col h-full bg-transparent w-full">
      <div className="flex flex-col flex-1 max-w-[260px] mx-auto w-full">
        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 px-2 pb-2 space-y-4 overflow-y-auto"
        >
          <div className="flex flex-col justify-start gap-4 min-h-full">
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
            placeholder={`今天去哪玩儿啦...`}
            className="flex-1 w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-[11px] font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-white/60 shadow-lg"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-transparent border border-white/40 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all shadow-lg active:scale-95 disabled:opacity-30 flex items-center justify-center text-[11px] shrink-0"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
