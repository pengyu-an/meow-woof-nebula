import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Info, Tag, Calendar, Sparkles, Settings } from 'lucide-react';
import { Pet, Story } from '../types';
import { cn } from '../lib/utils';
import { PERSONALITY_TAGS, OWNER_TITLES, SPEAKING_STYLES, DOG_BREEDS, CAT_BREEDS } from '../constants';

interface BasicInfoProps {
  pet: Pet;
  isGenerating: boolean;
  onUpdatePet: (data: { 
    name: string; 
    type: string; 
    breed?: string;
    encounterDate?: string;
    images: string[]; 
    stories: Story[]; 
    ownerTitle: string; 
    personality: string; 
    speakingStyle: string 
  }) => Promise<void>;
}

export function BasicInfo({ pet, isGenerating, onUpdatePet }: BasicInfoProps) {
  const [formData, setFormData] = useState({
    name: pet.name,
    type: pet.type,
    breed: pet.breed || '',
    encounterDate: pet.encounterDate || '',
    personality: pet.personality,
    ownerTitle: pet.ownerTitle,
    speakingStyle: pet.speakingStyle || '温柔',
    images: pet.referenceImages || [],
    stories: pet.stories || []
  });

  const handleSave = async () => {
    await onUpdatePet(formData);
  };

  return (
    <div className="h-full bg-transparent pt-0 pb-0 overflow-y-auto px-6 relative flex flex-col">
      <header className="sticky top-0 left-0 right-0 pt-10 pb-6 pl-14 z-40 flex justify-between items-center pointer-events-none mb-2">
        <div className="flex items-center gap-3 pointer-events-auto">
          <Settings size={24} className="text-white" />
          <h2 className="text-xl font-serif font-bold text-white drop-shadow-md">基础设定</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={isGenerating}
          className="p-3 bg-white/20 text-white border border-white/30 rounded-full shadow-lg hover:bg-white/30 disabled:opacity-50 transition-all active:scale-95 backdrop-blur-md pointer-events-auto"
        >
          {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
        </button>
      </header>

      <div className="pb-20 space-y-6">
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 shadow-lg space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Info size={12} /> 关于它的名字
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-white/30 outline-none transition-all font-medium text-white placeholder:text-white/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3">它的性格</label>
              <select
                value={formData.personality}
                onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-white/30 outline-none transition-all text-sm font-medium text-white appearance-none"
              >
                {PERSONALITY_TAGS.map(tag => (
                  <option key={tag} value={tag} className="text-black">{tag}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3">它如何称呼我</label>
              <select
                value={formData.ownerTitle}
                onChange={(e) => setFormData({ ...formData, ownerTitle: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-white/30 outline-none transition-all text-sm font-medium text-white appearance-none"
              >
                {OWNER_TITLES.map(title => (
                  <option key={title} value={title} className="text-black">{title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3">相处模式</label>
            <div className="grid grid-cols-3 gap-2">
              {SPEAKING_STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => setFormData({ ...formData, speakingStyle: style })}
                  className={cn(
                    "py-3 rounded-2xl border transition-all text-[10px] font-bold uppercase tracking-widest",
                    formData.speakingStyle === style 
                      ? "border-white/60 bg-white/20 text-white shadow-sm backdrop-blur-md" 
                      : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3">宠物种类</label>
            <div className="grid grid-cols-2 gap-4">
              {['小狗', '小猫'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData({ ...formData, type: t })}
                  className={cn(
                    "py-4 rounded-2xl border transition-all font-bold text-sm",
                    formData.type === t ? "border-white/60 bg-white/20 text-white shadow-sm backdrop-blur-md" : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Tag size={12} /> 它的品种
              </label>
              <select
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-white/30 outline-none transition-all text-sm font-medium text-white appearance-none"
              >
                <option value="" className="text-black">未知品种</option>
                {(formData.type === '小狗' ? DOG_BREEDS : CAT_BREEDS).map(b => (
                  <option key={b} value={b} className="text-black">{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-white/70 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Calendar size={12} /> 相遇日期
              </label>
              <input
                type="date"
                value={formData.encounterDate}
                onChange={(e) => setFormData({ ...formData, encounterDate: e.target.value })}
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-white/30 outline-none transition-all text-sm font-medium text-white appearance-none [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-2xl text-white shadow-sm border border-white/20">
            <Sparkles size={24} />
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-medium">
            修改这类信息可能会触发星尘宠物形象的重新生成，请确保这是你想要的回忆形象。
          </p>
        </div>
      </div>
    </div>
  );
}
