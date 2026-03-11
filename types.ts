export interface BotConfig {
  id: string;
  name: string;
  companyName: string;
  primaryColor: string;
  systemInstruction: string;
  welcomeMessage: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  STREAMING = 'STREAMING',
  ERROR = 'ERROR',
}