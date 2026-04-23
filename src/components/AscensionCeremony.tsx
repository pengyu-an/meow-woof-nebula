import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Camera, Sparkles, Heart, Trash2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { PERSONALITY_TAGS, OWNER_TITLES, SPEAKING_STYLES } from '../constants';
import { Starfield } from './Starfield';

interface AscensionCeremonyProps {
  onComplete: (data: any) => void;
  isGenerating?: boolean;
}

export function AscensionCeremony({ onComplete, isGenerating }: AscensionCeremonyProps) {
  const [step, setStep] = useState<'form' | 'animation'>('form');
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    type: '小狗' as '小狗' | '小猫',
    personality: ['活泼'],
    ownerTitle: '主人',
    speakingStyle: ['温柔'],
    images: [] as string[],
    nestImage: undefined as string | undefined,
  });

  const togglePersonality = (tag: string) => {
    setFormData(prev => {
      const isSelected = prev.personality.includes(tag);
      const updated = isSelected 
        ? prev.personality.filter(t => t !== tag)
        : [...prev.personality, tag];
      return { ...prev, personality: updated };
    });
  };

  const toggleSpeakingStyle = (style: string) => {
    setFormData(prev => {
      const isSelected = prev.speakingStyle.includes(style);
      const updated = isSelected 
        ? prev.speakingStyle.filter(s => s !== style)
        : [...prev.speakingStyle, style];
      return { ...prev, speakingStyle: updated };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'images' | 'nestImage') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'images') {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string].slice(0, 3)
          }));
        };
        reader.readAsDataURL(file);
      });
    } else {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, nestImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const startAscension = () => {
    if (!formData.name || formData.images.length === 0) return;
    setStep('animation');
    // Automatically trigger onComplete when animation starts to begin AI generation in background
    onComplete(formData);
  };

  // Helper to wait for text and then signal true completion
  React.useEffect(() => {
    if (step === 'animation') {
      // Line 1: 0.5 + 1.5 = 2s
      // Line 2: 2.5 + 1.5 = 4s
      // Line 3: 4.5 + 1.5 = 6s
      // Line 4: 6.5 + 2 = 8.5s
      // Transition at 8.5s + 1s = 9.5s
      const timer = setTimeout(() => {
        const transitionEvent = new CustomEvent('ceremonyAnimationComplete');
        window.dispatchEvent(transitionEvent);
      }, 9500); 
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step === 'animation') {
    return (
      <div className="fixed inset-0 z-[100] bg-[#020208] flex flex-col items-center justify-center overflow-hidden">
        <Starfield count={150} />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-60" />
        
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Photos disintegrating */}
          <div className="relative w-64 h-64">
            <AnimatePresence>
              {!isGenerating && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ 
                    scale: [1, 1.2, 0.8], 
                    opacity: [1, 0.8, 0],
                    filter: ['blur(0px)', 'blur(10px)', 'blur(40px)']
                  }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shadow-white/10"
                >
                  <img src={formData.images[0]} className="w-full h-full object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Particles rising */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 200 - 100, 
                  y: 100, 
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  y: -400, 
                  opacity: [0, 1, 1, 0],
                  x: (Math.random() * 200 - 100) + (Math.sin(i) * 50),
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 1.5, 
                  delay: 0.3 + Math.random() * 1,
                  repeat: Infinity 
                }}
                className="absolute w-2 h-2 bg-blue-200 rounded-full blur-[2px] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              />
            ))}
          </div>

          {step === 'animation' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center pt-20 text-center px-8 z-20 pointer-events-none"
            >
              <div className="text-blue-100 font-medium tracking-[0.1em] italic text-sm space-y-7 leading-loose max-w-sm">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.5 }}>
                  ta并非真的离开，只是卸下了地球的重力。
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1.5 }}>
                  微小的光点，正从你掌心升起，<br/>羽化成星，奔赴光年之外的归途。
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5, duration: 1.5 }}>
                  在喵汪星云里，ta不再有衰老与病痛，<br/>只有永远轻盈的奔跑、永远温暖的打盹。
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.5, duration: 2 }}>
                  而当夜深人静，你抬头看见星光——<br/>那是ta在宇宙深处，用另一种方式，轻轻说：<br/><span className="text-4xl font-serif font-bold tracking-widest mt-6 inline-block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">我还在。</span>
                </motion.p>
              </div>

              {/* Progress UI BELOW text - Integrated into flow for precise spacing */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="flex flex-col items-center gap-3 mt-10"
              >
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" className="fill-none stroke-blue-900/30 stroke-[8]" />
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      className="fill-none stroke-blue-400 stroke-[8]" 
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 8.5, ease: "linear" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-blue-300 animate-pulse" size={16} />
                  </div>
                </div>
                <p className="text-[10px] tracking-[0.2em] text-blue-200/80 font-bold uppercase">ta的星尘正在飞向喵汪宇宙...</p>
              </motion.div>
            </motion.div>
          )}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="absolute top-1/3 w-40 h-40 bg-blue-400/20 rounded-full blur-[60px]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#050510] overflow-y-auto no-scrollbar relative">
      <Starfield count={100} />
      
      {/* Background HD Universe */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative p-8 pt-12 space-y-10 pb-32 z-10">
        <header className="text-center space-y-2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 bg-blue-500/10 rounded-[2rem] text-blue-400 mb-4 border border-blue-500/20 backdrop-blur-md"
          >
            <Sparkles size={40} />
          </motion.div>
          <h1 className="text-3xl font-serif font-bold text-white drop-shadow-md">升星仪式</h1>
          <p className="text-blue-200/60 font-medium tracking-wide">在喵汪星，所有的告别都是为了再次相遇</p>
        </header>

        <section className="space-y-8">
          {/* Images */}
          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-blue-300/60 uppercase tracking-widest ml-1">上传照片 (1-3张)</label>
            <div className="grid grid-cols-3 gap-3">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group shadow-xl">
                  <img src={img} alt="pet" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white"
                  >
                    <Plus size={14} className="rotate-45" />
                  </button>
                </div>
              ))}
              {formData.images.length < 3 && (
                <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/30 hover:border-blue-400/50 hover:text-blue-400 hover:bg-blue-400/5 transition-all cursor-pointer bg-white/5 backdrop-blur-sm">
                  <Camera size={24} />
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, 'images')} />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-blue-300/60 uppercase tracking-widest ml-1">宠物名字</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/40 outline-none transition-all font-medium backdrop-blur-md placeholder:text-white/20"
                placeholder="它叫什么？"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-blue-300/60 uppercase tracking-widest ml-1">品种</label>
              <input 
                type="text" 
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500/40 outline-none transition-all font-medium backdrop-blur-md placeholder:text-white/20"
                placeholder="金毛/英短等"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-blue-300/60 uppercase tracking-widest ml-1">它是...</label>
            <div className="grid grid-cols-2 gap-4">
              {['小狗', '小猫'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData({ ...formData, type: t as any })}
                  className={cn(
                    "py-4 rounded-2xl border-2 transition-all font-bold text-sm backdrop-blur-md",
                    formData.type === t ? "border-blue-500/50 bg-blue-500/20 text-white shadow-lg shadow-blue-500/10" : "border-white/5 bg-white/5 text-white/40 hover:bg-white/10"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-blue-300/60 uppercase tracking-widest ml-1">性格标签 (多选)</label>
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => togglePersonality(tag)}
                  className={cn(
                    "px-6 py-2.5 rounded-full border-2 transition-all font-bold text-xs uppercase tracking-widest backdrop-blur-md",
                    formData.personality.includes(tag) ? "bg-indigo-500/60 border-indigo-400/50 text-white shadow-lg" : "border-white/5 bg-white/5 text-white/40 hover:bg-white/10"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-blue-300/60 uppercase tracking-widest ml-1">如何称呼您？</label>
            <div className="flex flex-wrap gap-2">
              {OWNER_TITLES.map((title) => (
                <button
                  key={title}
                  onClick={() => setFormData({ ...formData, ownerTitle: title })}
                  className={cn(
                    "px-6 py-2.5 rounded-full border-2 transition-all font-bold text-xs uppercase tracking-widest backdrop-blur-md",
                    formData.ownerTitle === title ? "bg-blue-500/60 border-blue-400/50 text-white shadow-lg" : "border-white/5 bg-white/5 text-white/40 hover:bg-white/10"
                  )}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold text-blue-300/60 uppercase tracking-widest ml-1">相处模式 (多选)</label>
            <div className="flex flex-wrap gap-2">
              {SPEAKING_STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleSpeakingStyle(style)}
                  className={cn(
                    "px-6 py-2.5 rounded-full border-2 transition-all font-bold text-xs uppercase tracking-widest backdrop-blur-md",
                    formData.speakingStyle.includes(style) ? "bg-purple-500/60 border-purple-400/50 text-white shadow-lg" : "border-white/5 bg-white/5 text-white/40 hover:bg-white/10"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 space-y-4 shadow-xl">
            <label className="block text-[10px] font-bold text-blue-200/40 uppercase tracking-widest text-center">它生前最喜欢的小窝或角落 (可选)</label>
            {!formData.nestImage ? (
              <label className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white/30 shadow-inner border border-white/10 cursor-pointer mx-auto transition-transform hover:scale-105 active:scale-95 hover:bg-white/20">
                <Plus size={32} />
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'nestImage')} />
              </label>
            ) : (
              <div className="relative w-24 h-24 mx-auto group">
                <img src={formData.nestImage} className="w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl" />
                <button 
                  onClick={() => setFormData({ ...formData, nestImage: undefined })}
                  className="absolute -top-1 -right-1 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus size={14} className="rotate-45" />
                </button>
              </div>
            )}
            <p className="text-[10px] text-blue-200/30 text-center font-medium italic">上传该照片，系统将为您生成更亲切的家园背景</p>
          </div>
        </section>

        <button 
          onClick={startAscension}
          disabled={!formData.name || formData.images.length === 0}
          className="w-full bg-blue-600/80 text-white py-6 rounded-3xl font-bold shadow-2xl shadow-blue-900/20 border border-blue-400/30 hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-30 active:scale-95 backdrop-blur-sm"
        >
          开启升星仪式 <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
