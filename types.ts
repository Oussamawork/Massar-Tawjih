export type Language = 'en' | 'fr' | 'ar';

export interface TraitScores {
  analytical: number;
  creative: number;
  social: number;
  independent: number;
  structured: number;
  flexible: number;
  practical: number;
  conceptual: number;
}

export interface Option {
  label: string;
  scoreChange: Partial<TraitScores>;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export type Sender = 'bot' | 'user';

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  isTyping?: boolean;
}

// Gemini Response Schema Types
export interface CareerContext {
  clusterName: string;
  explanation: string;
  whyItFits: string;
  roles: string[];
  moroccanEducationPath: string;
}

export interface AnalysisResult {
  profileSummary: string;
  topClusters: CareerContext[];
  encouragement: string;
}

// UI Translations
export interface UITranslation {
  welcome1: string;
  welcome2: string;
  startBtn: string;
  startUserMsg: string;
  analyzing: string;
  analyzingDots: string;
  profileTitle: string;
  whoYouAre: string;
  suggestedAreas: string;
  whyFits: string;
  exampleRoles: string;
  educationMorocco: string;
  footerDisclaimer: string;
  restartBtn: string;
  errorMsg: string;
  tryAgain: string;
}
