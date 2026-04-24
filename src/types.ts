export type PetStatus = 'happy' | 'itchy' | 'annoyed' | 'sick' | 'studying' | 'sleeping' | 'tired';

export interface Furniture {
  id: string;
  itemId: string;
  x: number;
  y: number;
}

export interface Environment {
  templateId: 'cloud' | 'starry' | 'forest';
  furniture: Furniture[];
}

export interface Story {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string; // e.g., 'dog', 'cat'
  breed?: string;
  encounterDate?: string;
  imageUrl: string;
  personality: string;
  happiness: number; // 0-100
  energy: number; // 0-100
  health: number; // 0-100
  lastInteraction: number; // timestamp
  outfitId?: string;
  environment: Environment;
  status: PetStatus;
  customTextureUrl?: string;
  referenceImages?: string[];
  stories?: Story[];
  ownerTitle: string;
  speakingStyle?: string;
  moodImages?: {
    normal: string;
    happy?: string;
    sleeping?: string;
    eating?: string;
  };
  nestImageUrl?: string;
  visualTraits?: {
    earType?: string;
    tailType?: string;
    primaryColor?: string;
  };
}

export interface Item {
  id: string;
  name: string;
  type: 'outfit' | 'furniture' | 'food';
  style?: 'warm' | 'modern' | 'pastoral';
  price: number;
  imageUrl: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  coins: number;
  inventory: string[]; // item IDs
  foodInventory?: Record<string, number>; // maps food id to quantity
  gifts?: Record<string, number>; // maps gift name to quantity for social gifts
  friends?: any[]; // For storing friends from NebulaGate
  isVIP?: boolean;
  vipTier?: 'none' | 'monthly' | 'yearly';
  dialogueRemaining?: number;
  dailyTasks?: {
    date: string;
    login: boolean;
    patCount: number;
    shareWhisper: boolean;
    stay30s: boolean;
    likeWhisperCount: number;
    receiveStarGiftCount: number;
    claimed: string[];
  };
}

export interface Mail {
  id: string;
  title: string;
  date: string;
  content: string;
  isNew: boolean;
  senderInfo?: any; // To store whisper sender info
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'pet';
  text: string;
  timestamp: number;
}

export interface DailyWhisper {
  id: string;
  date: string;
  text: string;
  imageUrl: string;
  likes: number;
}

export interface Landmark {
  id: string;
  name: string;
  cosmicConcept: string;
  lifeConcept: string;
  description: string;
  position: { x: number; y: number };
}

export interface CommunityEvent {
  id: string;
  locationId: string;
  type: 'quiz' | 'club' | 'rehab' | 'encounter';
  title: string;
  description: string;
  reward?: number;
}
