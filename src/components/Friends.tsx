import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, MessageSquare, ArrowLeft, Send } from 'lucide-react';

interface FriendsProps {
  friends?: any[];
}

export function Friends({ friends = [] }: FriendsProps) {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistories, setChatHistories] = useState<Record<string, {sender: 'me', text: string, time: string}[]>>({
    '1': [],
    '2': []
  });
  
  const mockFriends = [
    { id: '1', name: '云端猫咪', lastSeen: '刚才在玫瑰星云', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cat1&backgroundColor=b6e3f4' },
    { id: '2', name: '小狗旺财', lastSeen: '2小时前在极光台', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dog1&backgroundColor=b6e3f4' },
    { id: '3', name: '银河领航员', lastSeen: '30分钟前在黑洞视界', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=c0aede' },
    { id: '4', name: '星空流浪者', lastSeen: '5小时前在猎户座', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&backgroundColor=ffdfbf' },
    { id: '5', name: '月球居民', lastSeen: '1天前在静海', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden&backgroundColor=d1d4f9' }
  ];

  const displayFriends = [...friends, ...mockFriends.filter(m => !friends.some((f: any) => f.id === m.id))];

  const handleSendFriendMessage = () => {
    if (!chatMessage.trim() || !activeChat) return;
    setChatHistories(prev => ({
      ...prev,
      [activeChat]: [
        ...(prev[activeChat] || []),
        { sender: 'me', text: chatMessage.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    }));
    setChatMessage('');
  };

  return (
    <div className="h-full bg-transparent pt-0 pb-0 overflow-y-auto px-6 relative flex flex-col">
      <div className="sticky top-0 left-0 right-0 pt-10 pb-6 pl-14 z-40 flex items-center pointer-events-none">
        <h2 className="text-xl font-serif font-bold text-white flex items-center gap-3 drop-shadow-md pointer-events-auto">
          <Users size={24} className="text-white" /> 看星的人
        </h2>
      </div>

      <div className="space-y-6 flex-1 pb-32">
        {!activeChat ? (
          <div className="space-y-4">
            {displayFriends.map(friend => (
              <div 
                key={friend.id}
                className="bg-white/10 backdrop-blur-md rounded-[2rem] p-4 border border-white/20 shadow-sm flex items-center justify-between hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setActiveChat(friend.id)}
              >
                <div className="flex items-center gap-4">
                  <img src={friend.avatar} alt="avatar" className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 object-cover image-pixelated" />
                  <div>
                    <p className="font-bold text-sm text-white">{friend.name}</p>
                    <p className="text-[10px] text-white/50 mt-1">{friend.lastSeen || '刚刚'}</p>
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-full text-white/70">
                  <MessageSquare size={16} />
                </div>
              </div>
            ))}
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-[2rem] text-center">
              <p className="text-xs text-white/50">在星云之门遇到的小伙伴会出现在这里</p>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md h-[60vh] rounded-[2rem] border border-white/20 shadow-lg flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-black/10">
              <button onClick={() => setActiveChat(null)} className="p-2 -ml-2 text-white/60 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </button>
              <img src={mockFriends.find(f => f.id === activeChat)?.avatar} className="w-8 h-8 rounded-xl bg-white/10 border border-white/20" />
              <p className="font-bold text-sm text-white drop-shadow-md">
                 {mockFriends.find(f => f.id === activeChat)?.name}
              </p>
            </div>
            <div className="flex-1 p-4 bg-transparent overflow-y-auto space-y-4">
              <div className="text-center text-[10px] text-white/40 my-4 uppercase tracking-widest font-bold">你们成为了看星伙伴</div>
              {(chatHistories[activeChat] || []).map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-end"
                >
                  <div className="bg-indigo-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-md border border-indigo-400/30 relative">
                    {msg.text}
                    <span className="absolute -bottom-4 right-1 text-[8px] text-white/40">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-3 bg-black/20 border-t border-white/10 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="发送消息..." 
                className="flex-1 bg-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/10 text-white placeholder:text-white/40"
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendFriendMessage()}
              />
              <button 
                onClick={handleSendFriendMessage}
                className="p-2 w-9 h-9 flex items-center justify-center bg-indigo-500/80 text-white rounded-full shadow-md hover:bg-indigo-400 transition-colors border border-indigo-400/50"
              >
                <Send size={14} className="translate-x-[1px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
