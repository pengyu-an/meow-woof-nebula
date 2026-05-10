import React from 'react';
import { Home, Compass, MessageSquareCode, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'nebula', icon: Compass, label: '星云之门' },
    { id: 'home', icon: Home, label: '星居' },
    { id: 'whisper', icon: MessageSquareCode, label: '耳语' },
    { id: 'memories', icon: Heart, label: '回忆' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0B0F19]/90 backdrop-blur-xl border-t border-white/10 flex justify-between items-center z-50 max-w-md mx-auto rounded-none shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] px-8 py-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all duration-500",
              isActive ? "text-blue-400 scale-110 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" : "text-white/40 hover:text-white/60"
            )}
          >
            <div className={cn(
              "p-3 rounded-[1.25rem] transition-all duration-500",
              isActive ? "bg-blue-500/10 shadow-inner" : "bg-transparent"
            )}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[10px] font-bold tracking-widest uppercase",
              isActive ? "text-blue-300" : "text-white/30"
            )}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
