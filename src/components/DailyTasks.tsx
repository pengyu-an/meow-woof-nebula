import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Gift, Sparkles } from 'lucide-react';
import { UserProfile } from '@/src/types';

interface DailyTasksProps {
  onClose: () => void;
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function DailyTasks({ onClose, userProfile, onUpdateProfile }: DailyTasksProps) {
  const [tasks, setTasks] = useState(userProfile?.dailyTasks || {
    date: new Date().toDateString(),
    login: true,
    patCount: 0,
    shareWhisper: false,
    stay30s: false,
    likeWhisperCount: 0,
    receiveStarGiftCount: 0,
    claimed: []
  });

  useEffect(() => {
    // If it's a new day, reset tasks
    const today = new Date().toDateString();
    if (!userProfile?.dailyTasks || userProfile.dailyTasks.date !== today) {
        const newTasks = {
            date: today,
            login: true,
            patCount: 0,
            shareWhisper: false,
            stay30s: false,
            likeWhisperCount: 0,
            receiveStarGiftCount: 0,
            claimed: []
        };
        setTasks(newTasks);
        if (userProfile) {
            onUpdateProfile({ ...userProfile, dailyTasks: newTasks });
        }
    } else {
        setTasks(userProfile.dailyTasks);
    }
  }, [userProfile]);

  const taskList = [
    { id: 'login', name: '登录家园', get reward() { return 5; }, get current() { return tasks.login ? 1 : 0; }, max: 1 },
    { id: 'patCount', name: '点击默影互动', reward: 1, get current() { return tasks.patCount; }, max: 3, perAction: true },
    { id: 'shareWhisper', name: '分享耳语', get reward() { return 15; }, get current() { return tasks.shareWhisper ? 1 : 0; }, max: 1 },
    { id: 'stay30s', name: '在星云宇宙中停留 30 秒', get reward() { return 2; }, get current() { return tasks.stay30s ? 10 : 0; }, max: 10, perAction: true },
    { id: 'likeWhisperCount', name: '给他人耳语点赞', reward: 1, get current() { return tasks.likeWhisperCount; }, max: 10, perAction: true },
    { id: 'receiveStarGiftCount', name: '收到“一颗星尘”礼物', reward: 2, get current() { return tasks.receiveStarGiftCount; }, max: 5, perAction: true },
  ];

  const handleClaim = (taskId: string, rewardValue: number, claimTimes = 1) => {
    if (!userProfile) return;
    
    let newClaimed = [...tasks.claimed];
    for (let i = 0; i < claimTimes; i++) {
        newClaimed.push(taskId);
    }
    const newTasks = { ...tasks, claimed: newClaimed };
    
    onUpdateProfile({
        ...userProfile,
        coins: userProfile.coins + rewardValue,
        dailyTasks: newTasks
    });
    setTasks(newTasks);
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={onClose}
    >
        <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#11131A] p-6 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col gap-4 w-full max-w-sm relative"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-400">
                      <Gift size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg">星尘币免费获取</h3>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 bg-white/10 rounded-full text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
            
            <p className="text-xs text-white/50 mb-2 py-2 px-3 bg-white/5 rounded-xl border border-white/5">
              每日任务最多获取 <span className="text-yellow-400 font-bold">63</span> 星尘币。（部分任务功能目前为模拟记录状态）
            </p>

            <div className="flex flex-col gap-3 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
                {taskList.map(t => {
                    const progress = Math.min(t.current, t.max);
                    const isCompleted = progress >= t.max;
                    const claimedAmount = tasks.claimed.filter(c => c === t.id).length;
                    const claimableUnits = t.perAction ? (progress - claimedAmount) : (isCompleted && claimedAmount === 0 ? 1 : 0);
                    const totalRewardToClaim = claimableUnits * t.reward;
                    const canClaim = claimableUnits > 0;
                    const completelyClaimed = t.perAction ? claimedAmount >= t.max : claimedAmount > 0;

                    return (
                        <div key={t.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-sm font-bold text-white tracking-wide">{t.name}</h4>
                                    <div className="text-[10px] text-yellow-300/80 font-bold mt-1 flex items-center gap-1">
                                      <Sparkles size={10} /> +{t.perAction ? `${t.reward}/次 (最高${t.reward*t.max})` : t.reward} 
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-white/40 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                                    {progress} / {t.max}
                                </div>
                            </div>
                            
                            {/* Action Row */}
                            <div className="flex justify-between items-center mt-1">
                                <div className="flex-1 mr-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300" 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(progress / t.max) * 100}%` }}
                                    />
                                </div>
                                
                                {completelyClaimed ? (
                                    <button disabled className="px-4 py-1.5 bg-white/5 text-white/30 rounded-full text-xs font-bold border border-white/10 cursor-not-allowed">
                                        已领取
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleClaim(t.id, totalRewardToClaim, claimableUnits)}
                                        disabled={!canClaim}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-md
                                            ${canClaim ? 'bg-yellow-500 hover:bg-yellow-400 text-yellow-950 active:scale-95' 
                                                       : 'bg-white/10 text-white/40 cursor-not-allowed'}
                                        `}
                                    >
                                        {canClaim ? (claimableUnits > 1 ? `领取 (+${totalRewardToClaim})` : '领取') : '未完成'}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    </motion.div>
  );
}
