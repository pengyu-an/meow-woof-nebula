import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, QrCode, X, Sparkles, Gem, Coffee, Box, Package, Check } from 'lucide-react';
import { UserProfile } from '@/src/types';

interface ShopProps {
  userProfile?: UserProfile | null;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export function Shop({ userProfile, onUpdateProfile }: ShopProps) {
  const [selectedProduct, setSelectedProduct] = useState<{name: string, price: string, amount: string, callback?: () => void} | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePurchase = (productParams: {name: string, price: string, amount: string, callback?: () => void}) => {
    setSelectedProduct(productParams);
  };

  const discountRate = userProfile?.vipTier === 'yearly' ? 0.8 : userProfile?.vipTier === 'monthly' ? 0.9 : 1.0;

  const vipSubscriptions = [
    {
      name: '星云月卡',
      desc: '每日 3 条耳语 + 无限主页对话 + 星尘币购买 9 折',
      price: '9.9 元/月',
      amount: '9.9',
      highlight: false,
      tier: 'monthly' as const
    },
    {
      name: '星云年卡',
      desc: '月卡权益 + 星尘币购买 8 折 + 附赠限定星尘光环',
      price: '79 元/年',
      amount: '79',
      highlight: true,
      tier: 'yearly' as const
    },
    {
      name: '首月特惠',
      desc: '新用户专享',
      price: '1.9 元/首月',
      amount: '1.9',
      highlight: false,
      tier: 'monthly' as const
    }
  ];

  const coinPackages = [
    { name: '300 星尘币', extra: '无', price: `6元`, basePrice: 6, coins: 300 },
    { name: '900 星尘币', extra: '赠送 100 币', price: `18元`, basePrice: 18, coins: 1000 },
    { name: '1500 星尘币', extra: '赠送 250 币', price: `28元`, basePrice: 28, coins: 1750 },
    { name: '3400 星尘币', extra: '赠送 600 币', price: `68元`, basePrice: 68, coins: 4000 },
    { name: '6400 星尘币', extra: '赠送 1600 币', price: `128元`, basePrice: 128, coins: 8000 }
  ];

  const socialGifts = [
    { name: '一颗星尘', desc: '赠送后对方家园显示闪烁星尘', price: '50 星尘币', icon: '✨' },
    { name: '一束星光', desc: '对方宠物发光 10 秒，记录在耳语', price: '300 星尘币', icon: '💫' }
  ];

  const valueAddedServices = [
    { name: '纪念日视频包', price: '29.9 元/次', amount: '29.9' },
    { name: '小窝高级孪生', price: '19.9 元/次', amount: '19.9' }
  ];

  return (
    <div className="h-full bg-[#11131A] pt-0 pb-0 overflow-y-auto px-6 relative flex flex-col no-scrollbar">
      <div className="sticky top-0 left-0 right-0 pt-10 pb-6 pl-14 z-40 flex items-center mb-2 bg-gradient-to-b from-[#11131A] via-[#11131A]/80 to-transparent">
        <div className="flex items-center gap-3">
          <Gift size={24} className="text-yellow-400" />
          <h2 className="text-xl font-serif font-bold text-white drop-shadow-md">充值通道</h2>
        </div>
      </div>

      <div className="space-y-8 pb-20 mt-4">
        
        {/* 会员订阅 */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Gem size={16} className="text-purple-400" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/80">会员订阅 (人民币支付)</h3>
          </div>
          <div className="space-y-3">
            {vipSubscriptions.map((p, idx) => (
              <motion.div 
                key={idx}
                onClick={() => handlePurchase({
                    name: p.name, price: p.price, amount: p.amount, 
                    callback: () => {
                        if (onUpdateProfile && userProfile) {
                            onUpdateProfile({ ...userProfile, isVIP: true, vipTier: p.tier });
                            showToast('模拟开通会员成功！已解锁无限次主页对话！');
                        }
                    }
                })}
                className={`rounded-2xl p-4 border cursor-pointer active:scale-95 transition-transform backdrop-blur-md ${p.highlight ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-400/50 hover:from-purple-500/30 hover:to-indigo-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10'} relative`}
              >
                {p.highlight && (
                  <div className="absolute top-0 right-4 -translate-y-1/2 bg-purple-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                    推荐
                  </div>
                )}
                <div className="flex justify-between items-start mb-1 gap-4">
                  <h4 className={`text-sm font-bold ${p.highlight ? 'text-purple-300' : 'text-white'}`}>{p.name}</h4>
                  <span className="text-[11px] font-bold text-white/90 shrink-0">{p.price}</span>
                </div>
                <p className="text-[10px] text-white/50 leading-relaxed font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 星尘币充值 */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Sparkles size={16} className="text-yellow-400" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/80">星尘币充值 (汇率 1元=50币)</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {coinPackages.map((p, idx) => {
              const discountedPrice = (p.basePrice * discountRate).toFixed(2);
              return (
                <motion.div 
                  key={idx}
                  onClick={() => handlePurchase({
                    name: p.name, price: `￥${discountedPrice}`, amount: discountedPrice,
                    callback: () => {
                        if (onUpdateProfile && userProfile) {
                            onUpdateProfile({ ...userProfile, coins: userProfile.coins + p.coins });
                            showToast(`模拟充值成功！获得 ${p.coins} 星尘币。`);
                        }
                    }
                  })}
                  className="rounded-2xl p-4 bg-yellow-500/5 border border-yellow-500/20 hover:bg-yellow-500/10 cursor-pointer active:scale-95 transition-all text-center flex flex-col gap-1 relative overflow-hidden"
                >
                  {p.extra !== '无' && (
                    <div className="bg-yellow-500 text-yellow-950 text-[8px] font-bold px-2 py-0.5 self-center rounded-full mb-1">
                      {p.extra}
                    </div>
                  )}
                  <h4 className="text-sm font-bold text-yellow-300 mx-auto">{p.name}</h4>
                  <div className="text-xs text-white/60 line-through scale-90">￥{p.basePrice.toFixed(2)}</div>
                  <div className="text-lg font-bold text-white mt-auto">￥{discountedPrice}</div>
                  {discountRate < 1.0 && <span className="absolute bottom-1 left-2 text-[8px] text-purple-400">会员折扣</span>}
                </motion.div>
              );
            })}
          </div>
          <div className="mt-2 text-[10px] text-center text-white/40">*首充任意档位，所得币翻倍（暂未模拟）</div>
        </section>

        {/* 社交礼物 */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Coffee size={16} className="text-pink-400" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/80">社交礼物 (星尘币支付)</h3>
          </div>
          <div className="space-y-3">
            {socialGifts.map((p, idx) => (
              <motion.div 
                key={idx}
                onClick={() => {
                  if (userProfile && onUpdateProfile) {
                      const cost = parseInt(p.price);
                      if (userProfile.coins >= cost) {
                          const updatedGifts = { ...userProfile.gifts };
                          updatedGifts[p.name] = (updatedGifts[p.name] || 0) + 1;
                          onUpdateProfile({...userProfile, coins: userProfile.coins - cost, gifts: updatedGifts});
                          showToast(`购买成功！已将 ${p.name} 放入背包，可在星云之门送给其他宠物。`);
                      } else {
                          showToast('星尘币不足！');
                      }
                  }
                }}
                className="rounded-2xl p-3 bg-white/5 border border-white/10 flex items-center justify-between gap-3 cursor-pointer hover:bg-white/10 active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl bg-white/5 p-2 rounded-xl">{p.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <p className="text-[10px] text-white/50 leading-tight block max-w-[150px]">{p.desc}</p>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-yellow-400 shrink-0 border border-yellow-400/30 px-2 py-1 rounded-full bg-yellow-400/10">
                  {p.price}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 增值服务 */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Box size={16} className="text-blue-400" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/80">增值服务 (人民币支付)</h3>
          </div>
          <div className="space-y-3">
            {valueAddedServices.map((p, idx) => (
              <motion.div 
                key={idx}
                onClick={() => handlePurchase({
                  name: p.name, price: p.price, amount: p.amount,
                  callback: () => { showToast(`模拟购买 ${p.name} 成功！`); }
                })}
                className="rounded-2xl p-4 border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer active:scale-95 transition-all flex justify-between items-center"
              >
                <h4 className="text-sm font-bold text-white">{p.name}</h4>
                <div className="text-[11px] font-bold text-white/80">{p.price}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 实体周边 */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <Package size={16} className="text-orange-400" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/80">实体周边</h3>
          </div>
          <motion.div 
            className="rounded-2xl p-5 border border-white/5 bg-black/20 text-center"
          >
            <p className="text-xs text-white/60 leading-relaxed max-w-[250px] mx-auto">
              根据你的宠物，定制独一无二的星尘周边。<br/>
              星尘手作工坊 · 专属记忆系列<br/>（毛绒挂件、纪念相框、星尘手办）
            </p>
            <div className="mt-3 inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/40 border border-white/10">
              正在筹备中，敬请期待
            </div>
          </motion.div>
        </section>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-black/80 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full flex items-center justify-center shadow-2xl"
          >
            <div className="flex bg-white/10 p-1.5 rounded-full mr-3 text-green-400">
                <Check size={14} />
            </div>
            <span className="text-sm font-bold tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
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

              <button 
                onClick={() => {
                   if (selectedProduct.callback) selectedProduct.callback();
                   setSelectedProduct(null);
                }}
                className="mt-6 w-full py-3 bg-emerald-500/80 text-white text-sm font-bold rounded-2xl shadow-lg hover:bg-emerald-500 active:scale-95 transition-all border border-emerald-400/50 backdrop-blur-md"
              >
                模拟支付成功
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
