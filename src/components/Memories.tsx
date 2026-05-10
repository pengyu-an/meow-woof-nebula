import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Plus, Trash2, Heart, BookOpen, Save } from 'lucide-react';
import { Pet, Story } from '../types';

interface MemoriesProps {
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

export function Memories({ pet, isGenerating, onUpdatePet }: MemoriesProps) {
  const [images, setImages] = useState<string[]>(pet.referenceImages || []);
  const [stories, setStories] = useState<Story[]>(pet.stories || []);

  const [newStory, setNewStory] = useState({ title: '', content: '' });
  const [showStoryForm, setShowStoryForm] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 5) {
      alert("为了保证存储性能，参考图片最多只能上传 5 张哦。");
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    await onUpdatePet({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      encounterDate: pet.encounterDate,
      personality: pet.personality,
      ownerTitle: pet.ownerTitle,
      speakingStyle: pet.speakingStyle || '温柔',
      images,
      stories
    });
  };

  const addStory = () => {
    if (!newStory.title || !newStory.content) return;
    const story: Story = {
      id: Date.now().toString(),
      title: newStory.title,
      content: newStory.content,
      date: new Date().toLocaleDateString()
    };
    setStories(prev => [story, ...prev]);
    setNewStory({ title: '', content: '' });
    setShowStoryForm(false);
  };

  const removeStory = (id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="h-full bg-transparent pt-0 pb-0 overflow-y-auto px-6 relative flex flex-col">
      <header className="sticky top-0 left-0 right-0 pt-10 pb-6 pl-14 z-40 flex justify-between items-center pointer-events-none mb-2">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-3 drop-shadow-md pointer-events-auto">
          <Camera size={24} className="text-white" /> 珍贵回忆
        </h2>
        <button
          onClick={handleSave}
          disabled={isGenerating}
          className="p-3 bg-white/20 text-white rounded-full shadow-lg hover:bg-white/30 backdrop-blur-md disabled:opacity-50 transition-all active:scale-95 border border-white/20 pointer-events-auto"
        >
          {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
        </button>
      </header>

      <div className="flex-1 space-y-6 pb-20">
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-bold text-white/70 uppercase tracking-widest">照片墙</h3>
            <span className="text-[10px] font-bold text-white bg-white/20 px-3 py-1 rounded-full">
              {images.length} 张图片
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <motion.div
                layout
                key={idx}
                className="relative aspect-square rounded-2xl overflow-hidden border border-sepia-50 group shadow-sm"
              >
                <img src={img} alt="preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
            <label className="aspect-square rounded-2xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 hover:border-white/60 hover:text-white/80 hover:bg-white/10 transition-all cursor-pointer group">
              <Plus size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold mt-2 uppercase tracking-tighter">添加照片</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center px-2 pt-4">
          <h3 className="text-[10px] font-bold text-white/70 uppercase tracking-widest">宠物往事卡片</h3>
          <button 
            onClick={() => setShowStoryForm(!showStoryForm)}
            className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
          >
            <Plus size={16} />
          </button>
        </div>

        {showStoryForm && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 shadow-inner space-y-4"
          >
            <input 
              type="text" 
              placeholder="故事标题 (如: 第一次回家)" 
              value={newStory.title}
              onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
              className="w-full bg-white/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-white/50 outline-none text-white placeholder:text-white/50"
            />
            <textarea 
              placeholder="记录下那段珍贵的时光..." 
              value={newStory.content}
              onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
              className="w-full h-32 bg-white/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-white/50 outline-none resize-none text-white placeholder:text-white/50"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowStoryForm(false)} className="px-4 py-2 text-xs text-white/70 font-bold uppercase hover:text-white">取消</button>
              <button onClick={addStory} className="px-6 py-2 bg-white/20 text-white border border-white/30 rounded-full text-xs font-bold uppercase shadow-md active:scale-95 transition-all hover:bg-white/30">记录</button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {stories.map((story) => (
            <motion.div 
              layout
              key={story.id} 
              className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 shadow-sm relative group"
            >
              <button 
                onClick={() => removeStory(story.id)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
              <span className="text-[9px] font-bold text-white/50 uppercase tracking-tighter mb-1 block">{story.date}</span>
              <h4 className="text-sm font-bold text-white mb-2">{story.title}</h4>
              <p className="text-xs text-white/80 leading-relaxed transition-colors">{story.content}</p>
            </motion.div>
          ))}

          {stories.length === 0 && (
            <div className="p-12 text-center space-y-4">
               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto text-white/40">
                  <BookOpen size={32} />
               </div>
               <p className="text-xs text-white/50">目前还没有记录它的故事。<br/>点击右上角的 + 开始记录吧。</p>
            </div>
          )}
        </div>

        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 border-dashed flex flex-col items-center text-center gap-4 mt-6">
          <Heart size={24} className="text-pink-400/80" />
          <p className="text-xs text-white/60 italic font-serif">
            “所有的思念都在这里，从未消失。”
          </p>
        </div>
      </div>
    </div>
  );
}
