import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, QrCode, X, Sparkles } from 'lucide-react';
import { UserProfile } from '@/src/types';

interface ShopProps {
  userProfile?: UserProfile | null;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export function Shop({ userProfile, onUpdateProfile }: ShopProps) {
  const [selectedProduct, setSelectedProduct] = useState<{name: string, price: string, amount: string} | null>(null);

  const products: { name: string; desc: string; price: string; amount: string; highlight?: boolean; customIcon?: React.ReactNode }[] = [
    {
      name: '100 星辰币',
      desc: '可以购买冻干等普通食物',
      price: '1.00元',
      amount: '1',
      customIcon: <Sparkles className="text-yellow-400" size={16} />
    },
    {
      name: '1000 星辰币',
      desc: '丰盛大餐，快速恢复宠物状态',
      price: '10.00元',
      amount: '10',
      highlight: true,
      customIcon: <Sparkles className="text-yellow-400" size={16} />
    },
    {
      name: '5000 星辰币',
      desc: '海量星辰币，无忧陪伴',
      price: '50.00元',
      amount: '50',
      customIcon: <Sparkles className="text-yellow-400" size={16} />
    },
    {
      name: '星云会员订阅',
      desc: '维持宠物星尘活跃度、每日动态、无限次写信',
      price: '9.9元/月 或 89元/年',
      amount: '9.9'
    },
    {
      name: '一键孪生高级版',
      desc: '多模态生成宠物真实相貌等',
      price: '59.00元',
      amount: '59'
    },
    {
      name: '时光相册扩展包',
      desc: '增加50张照片、10段视频存储上限',
      price: '19.00元',
      amount: '19'
    },
    {
      name: '星灵语音包',
      desc: '定制专属宠物叫声',
      price: '29.00元',
      amount: '29'
    }
  ];

  return (
    <div className="h-full bg-transparent pt-0 pb-0 overflow-y-auto px-6 relative flex flex-col">
      <div className="sticky top-0 left-0 right-0 pt-10 pb-6 pl-14 z-40 flex items-center mb-2 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <Gift size={24} className="text-yellow-400" />
          <h2 className="text-xl font-serif font-bold text-white drop-shadow-md">充值通道</h2>
        </div>
      </div>

      <div className="space-y-4 pb-20">
        <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-4 px-2">服务价目表</h3>
        
        {products.map((p, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedProduct(p)}
            className={`rounded-3xl p-5 border cursor-pointer active:scale-95 transition-transform backdrop-blur-md ${p.highlight ? 'bg-yellow-500/20 border-yellow-400/50 hover:bg-yellow-500/30' : 'bg-white/10 border-white/20 hover:bg-white/20'} relative`}
          >
            {p.highlight && (
              <div className="absolute top-0 right-4 -translate-y-1/2 bg-yellow-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md border border-yellow-300">
                热销
              </div>
            )}
            <div className="flex justify-between items-start mb-2 gap-4">
              <h4 className={`text-sm font-bold flex items-center gap-1 ${p.highlight ? 'text-yellow-300' : 'text-white'}`}>
                {p.customIcon}
                {p.name}
              </h4>
              <span className={`text-[11px] font-bold shrink-0 ${p.highlight ? 'text-yellow-400' : 'text-white/80'}`}>{p.price}</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border border-white/20"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white/60 hover:bg-white/20 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <QrCode size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">微信支付</h3>
                <p className="text-sm text-white/60">购买 {selectedProduct.name}</p>
                <div className="text-3xl font-bold text-emerald-400 mt-4 drop-shadow-md">
                  ￥{selectedProduct.amount}
                </div>
              </div>

              <div className="bg-white/90 p-4 border border-white/20 rounded-3xl flex justify-center items-center shadow-inner mb-6">
                 <img 
                   src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChatPay_Mock_${selectedProduct.amount}`} 
                   alt="WeChat Pay QR" 
                   className="w-48 h-48 object-contain"
                 />
              </div>
              
              <p className="text-[10px] text-center text-white/50">
                请使用微信“扫一扫”完成支付<br/>
                长按可保存二维码图片
              </p>

              {/* Just for mock experience, auto-credit if it's coins */}
              {selectedProduct.name.includes('星辰币') && (
                <button 
                  onClick={() => {
                    if (onUpdateProfile && userProfile) {
                      const coinsToAdd = parseInt(selectedProduct.name.split(' ')[0]);
                      onUpdateProfile({
                        ...userProfile,
                        coins: userProfile.coins + coinsToAdd
                      });
                      alert(`已成功充值 ${coinsToAdd} 星辰币 (此为模拟体验)`);
                      setSelectedProduct(null);
                    }
                  }}
                  className="mt-6 w-full py-3 bg-emerald-500/80 text-white text-sm font-bold rounded-2xl shadow-lg hover:bg-emerald-500 active:scale-95 transition-all border border-emerald-400/50 backdrop-blur-md"
                >
                  模拟支付成功 (获得星辰币)
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
