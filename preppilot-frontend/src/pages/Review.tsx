export type ReviewQuestion = {
  questionId: number;

  question: string;

  userAnswer: string;

  correctAnswer: string;

  isCorrect: boolean;

  timeTaken: number;

  explanation: string;
};