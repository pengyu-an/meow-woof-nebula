import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Send, Check, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { Starfield } from './Starfield';
import { generateWhisper } from '../services/geminiService';

interface Whisper {
  id: string;
  date: string;
  text: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  time: string;
}

interface WhisperProps {
  ownerTitle: string;
  petName: string;
  petType?: string; // Added to support generation
  personality?: string;
  isVIP?: boolean;
}

export function Whisper({ ownerTitle, petName, petType = '小狗', personality = '活泼', isVIP = false }: WhisperProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [whispers, setWhispers] = useState<Whisper[]>([
    {
      id: '1',
      date: '2026.04.20',
      text: `${ownerTitle}，我今天在玫瑰星云公园追到了一颗流星。在那之后，我还看到了一朵巨大的发光玫瑰，它开得比家里的任何花都要漂亮。`,
      imageUrl: 'https://picsum.photos/seed/nebula1/600/400',
      likes: 128,
      comments: [
        { id: 'c1', user: '喵汪星观察员', text: '好美的玫瑰！', time: '10分钟前' }
      ]
    },
    {
      id: '2',
      date: '2026.04.19',
      text: `${ownerTitle}，今天的重力窝特别暖和。我做了一个梦，梦见你在给我梳毛，梳得我肚皮痒痒的，忍不住翻了个跟头。`,
      imageUrl: 'https://picsum.photos/seed/nebula2/600/400',
      likes: 85,
      comments: []
    },
    {
      id: '3',
      date: '2026.04.18',
      text: `${ownerTitle}，在彗尾跑道跑了一整圈后，我出了一身的星尘汗。现在我正坐在极光眺望台上，看着你那里的方向呢，你感觉到了吗？`,
      imageUrl: 'https://picsum.photos/seed/nebula3/600/400',
      likes: 214,
      comments: []
    }
  ]);

  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);

  // Check whisper count today
  const today = new Date().toDateString();
  const getWhisperCount = () => {
      const stored = localStorage.getItem('wangxing_whisper_count') || "{}";
      const data = JSON.parse(stored);
      if (data.date !== today) return 0;
      return data.count || 0;
  };
  const incrementWhisperCount = () => {
      const current = getWhisperCount();
      localStorage.setItem('wangxing_whisper_count', JSON.stringify({
          date: today,
          count: current + 1
      }));
  };

  const handleLike = (id: string) => {
    setWhispers(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          likes: w.isLiked ? w.likes - 1 : w.likes + 1,
          isLiked: !w.isLiked
        };
      }
      return w;
    }));
  };

  const handleShare = (w: Whisper) => {
    // Try to use native share if available
    if (navigator.share) {
      navigator.share({
        title: '遥远太空的信号',
        text: w.text,
        url: window.location.href,
      }).catch(err => {
        if (err.name !== 'AbortError' && !err.message?.includes('canceled')) {
          console.error(err);
        }
      });
    } else {
      // Fallback: Copy to clipboard and show toast
      navigator.clipboard.writeText(`${w.text}\n\n遥远太空的信号 - ${w.date}`).then(() => {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2000);
      });
    }
  };

  const handleAddComment = (id: string) => {
    if (!commentText.trim()) return;
    
    setWhispers(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          comments: [
            ...w.comments,
            {
              id: Date.now().toString(),
              user: ownerTitle,
              text: commentText,
              time: '刚刚'
            }
          ]
        };
      }
      return w;
    }));
    setCommentText('');
    setActiveCommentId(null);
  };

  const handleGenerateWhisper = async () => {
    if (!isVIP && getWhisperCount() >= 1) {
        alert("非会员每日仅可获取1条耳语哦，订阅星云会员即可无限获取或每日专享更多条数！");
        return;
    }

    setIsGenerating(true);
    try {
      const text = await generateWhisper(petName, petType, personality, ownerTitle);
      if (text) {
        const newWhisper: Whisper = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
          text: text,
          imageUrl: `https://picsum.photos/seed/${encodeURIComponent(text.slice(0, 10))}/600/400`,
          likes: 0,
          comments: []
        };
        setWhispers([newWhisper, ...whispers]);
        incrementWhisperCount();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col pb-24 overflow-y-auto no-scrollbar relative w-full overflow-x-hidden bg-transparent">
      <Starfield count={50} />
      
      <div className="sticky top-0 left-0 right-0 pt-10 pb-6 pl-14 z-40 flex items-center pointer-events-none mb-4">
        <h2 className="text-xl font-serif font-bold text-white drop-shadow-md pointer-events-auto">耳语</h2>
      </div>

      <div className="max-w-[340px] mx-auto w-full px-4 flex flex-col gap-6 relative z-10">
        <header className="flex justify-between items-end mb-4 relative z-10">
          <div className="flex-1">
            <p className="text-white/60 font-medium text-sm">遥远太空的信号</p>
          </div>
          <div className="flex flex-col items-end gap-3 translate-y-2">
            <button 
              onClick={handleGenerateWhisper}
              disabled={isGenerating}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white transition-all shadow-xl active:scale-95 disabled:opacity-50 group",
                isGenerating && "bg-white/5"
              )}
            >
              {isGenerating ? (
                <RefreshCw size={16} className="animate-spin text-blue-300" />
              ) : (
                <Sparkles size={16} className="text-amber-300 group-hover:rotate-12 transition-transform" />
              )}
              <span className="text-[13px] font-bold tracking-wider">捕捉新信号</span>
            </button>
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </header>

        <div className="space-y-10 relative z-10">
          {whispers.map((w, idx) => (
          <motion.div 
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="bg-[#11131A]/80 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
              <div className="relative aspect-[3/2] overflow-hidden">
                <img 
                  src={w.imageUrl} 
                  alt="whisper" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-transparent opacity-100" />
                <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                  <p className="text-[10px] text-white/80 font-bold tracking-widest uppercase shadow-sm">{w.date}</p>
                </div>
              </div>
              
              <div className="p-8 space-y-6 relative z-10 w-full mt-[-20px] bg-transparent">
                <p className="text-lg text-white/90 font-medium leading-relaxed font-serif drop-shadow-sm">
                  {w.text}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex gap-6">
                    <button 
                      onClick={() => handleLike(w.id)}
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300 active:scale-125",
                        w.isLiked ? "text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "text-white/40 hover:text-rose-300"
                      )}
                    >
                      <motion.div
                        animate={w.isLiked ? { scale: [1, 1.4, 1] } : {}}
                      >
                        <Heart size={20} fill={w.isLiked ? "currentColor" : "none"} />
                      </motion.div>
                      <span className="text-xs font-bold font-mono">{w.likes}</span>
                    </button>
                    <button 
                      onClick={() => setActiveCommentId(activeCommentId === w.id ? null : w.id)}
                      className={cn(
                        "flex items-center gap-2 transition-colors",
                        activeCommentId === w.id ? "text-blue-300" : "text-white/40 hover:text-blue-200"
                      )}
                    >
                      <MessageCircle size={20} />
                      <span className="text-xs font-bold font-mono text-white/50">{w.comments.length}</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => handleShare(w)}
                    className="p-2 text-white/40 hover:text-white transition-colors active:scale-110"
                  >
                    <Share2 size={20} />
                  </button>
                </div>

                <AnimatePresence>
                  {activeCommentId === w.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-4">
                        {w.comments.map(c => (
                          <div key={c.id} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{c.user}</span>
                              <span className="text-[8px] text-white/30">{c.time}</span>
                            </div>
                            <p className="text-sm text-white bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                              {c.text}
                            </p>
                          </div>
                        ))}
                        <div className="relative flex items-center gap-2 bg-black/60 rounded-full px-4 py-2 border border-white/10">
                          <input 
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(w.id)}
                            placeholder="给远方的它留个言吧..."
                            className="bg-transparent border-none outline-none focus:ring-0 text-sm text-white placeholder:text-white/30 flex-1 py-1"
                          />
                          <button 
                            onClick={() => handleAddComment(w.id)}
                            className="p-1.5 bg-blue-500/80 text-white rounded-full hover:bg-blue-500 transition-colors shadow-lg"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="py-12 text-center relative z-10">
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] font-serif shadow-sm">- 所有的陪伴 都有回音 -</p>
      </div>
      </div>

      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-xl text-white rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-500/30"
          >
            <div className="bg-blue-500 rounded-full p-1 shadow-inner">
              <Check size={14} />
            </div>
            <span className="text-sm font-medium tracking-wide">复制成功 · 已生成分享卡片</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
