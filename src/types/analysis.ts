export interface AnalysisFeedback {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  nextTopics: string[];
}

export interface ChallengeData {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  hints: string[];
  language: string;
  completed?: boolean;
}

export interface AnalysisResult {
  submission: {
    id: string;
    language: string;
    score: number;
    createdAt: Date;
  };
  feedback: AnalysisFeedback;
  challenge: ChallengeData;
}