import { Landmark } from './types';

export const LANDMARKS: Landmark[] = [
  {
    id: '1',
    name: '玫瑰星云公园',
    cosmicConcept: '玫瑰星云 (NGC 2237)',
    lifeConcept: '公园散步、追蝴蝶、闻花',
    description: '星云中的玫瑰花瓣飘落，宠物们在花丛间追逐嬉戏。',
    position: { x: 400, y: 500 }
  },
  {
    id: '2',
    name: '彗尾跑道',
    cosmicConcept: '彗星的尾巴',
    lifeConcept: '运动场、跑道、竞速',
    description: '沿着彗尾奔跑，留下闪亮的光迹，比谁跑得最快。',
    position: { x: 650, y: 200 }
  },
  {
    id: '3',
    name: '星尘澡堂',
    cosmicConcept: '星际尘埃云',
    lifeConcept: '洗澡、梳毛、SPA',
    description: '星尘如细雨般洒落，宠物在里面打滚、抖毛，洗去疲惫。',
    position: { x: 750, y: 350 }
  },
  {
    id: '4',
    name: '重力窝',
    cosmicConcept: '引力阱（重力井）',
    lifeConcept: '猫窝、狗窝、午睡区',
    description: '温暖的重力场，像主人的怀抱，宠物蜷缩在里面打盹。',
    position: { x: 300, y: 700 }
  },
  {
    id: '5',
    name: '双星食堂',
    cosmicConcept: '双星系统',
    lifeConcept: '喂食、分享零食',
    description: '两颗星星像两个食盆，宠物可以约朋友一起来吃。',
    position: { x: 600, y: 550 }
  },
  {
    id: '6',
    name: '星屑剧场',
    cosmicConcept: '行星环',
    lifeConcept: '表演、社交、围观',
    description: '宠物们在星环上追逐、打滚，其他宠物当观众。',
    position: { x: 900, y: 150 }
  },
  {
    id: '7',
    name: '极光眺望台',
    cosmicConcept: '极光',
    lifeConcept: '观景台、看日出日落',
    description: '安静地坐在极光下，看星云流转，想主人。',
    position: { x: 150, y: 850 }
  }
];

export const PERSONALITY_TAGS = ['活泼', '安静', '懒', '爱干净', '贪吃', '胆小'];
export const OWNER_TITLES = ['妈妈', '爸爸', '姐姐', '哥哥', '主人'];
export const SPEAKING_STYLES = ['ta是主子', 'ta是小暖男', 'ta是粘人小宝宝'];

export const DOG_BREEDS = ['金毛', '拉布拉多', '柯基', '柴犬', '边牧', '哈士奇', '贵宾', '田园犬', '萨摩耶', '阿拉斯加', '博美', '比熊', '瑞典牧羊犬', '其他'];
export const CAT_BREEDS = ['美短', '英短', '布偶', '暹罗', '橘猫', '三花', '玄猫', '奶牛猫', '波斯猫', '缅因猫', '孟加拉豹猫', '无毛猫', '其他'];

export const FEED_OPTIONS = [
  { id: 'rainbow-bean', name: '彩虹星豆', cost: 12, effectText: '轻微闪光', icon: '✨' },
  { id: 'stardust-cookie', name: '星尘饼干', cost: 24, effectText: '高兴转圈', icon: '🍪' },
  { id: 'nebula-jelly', name: '星云果冻', cost: 36, effectText: '打嗝冒泡泡', icon: '🍮' },
  { id: 'galaxy-fish', name: '银河小鱼干', cost: 48, effectText: '舔嘴冒爱心', icon: '🐟' },
  { id: 'comet-meat', name: '彗星肉干', cost: 48, effectText: '蹦跳摇尾巴', icon: '🍖' },
  { id: 'moonlight-candy', name: '月光奶糖', cost: 60, effectText: '打哈欠慵懒', icon: '🍬' },
  { id: 'aurora-smoothie', name: '极光冰沙', cost: 72, effectText: '发光10秒', icon: '🍧' },
  { id: 'meteor-skewer', name: '流星肉串', cost: 84, effectText: '追尾巴转圈', icon: '🍢' },
  { id: 'star-energy', name: '星核能量块', cost: 96, effectText: '浑身带电', icon: '⚡' },
  { id: 'stardust-cake', name: '星尘蛋糕', cost: 120, effectText: '戴小生日帽', icon: '🎂' }
];

export const DRESSUP_OPTIONS = [
  { id: 'halo', name: '星尘光环', cost: 200, effectText: '头顶发光光环', icon: '🔆' },
  { id: 'trail', name: '流光尾迹', cost: 320, effectText: '走动留存光带', icon: '💫' },
  { id: 'stars', name: '小星星环绕', cost: 520, effectText: '四周星星闪烁', icon: '✨' },
  { id: 'cape', name: '极光披风', cost: 750, effectText: '背后极光流转', icon: '🧥' },
  { id: 'giftpack', name: '星尘装扮礼包', cost: 1314, effectText: '全套光效叠加', icon: '🎁' }
];
