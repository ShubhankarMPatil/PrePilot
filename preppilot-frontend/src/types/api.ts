export type DashboardResponse = {
  userName: string;
  exam: string;
  targetDate: string;

  dailyQuestionsTarget: number;
  dailyStudyHoursTarget: number;

  totalSessions: number;
};

export type Session = {
  id: number;
  topic: string;
  duration_minutes: number;
  session_date: string;
};

export type GoalResponse = {
  dailyQuestionsTarget: number;
  dailyStudyHoursTarget: number;
};

export type Subject = {
  id: number;
  name: string;
  category: string;
};

export type TopicBreakdown = {
  topic: string;
  minutes: number;
};

export type AnalyticsResponse = {
  totalStudyMinutes: number;
  sessionsCompleted: number;
  topicBreakdown: TopicBreakdown[];
};

export type Test = {
  id: number;
  title: string;
};

export type Question = {
  id: number;
  question_text: string;

  question_type: "mcq" | "typed";

  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  question_order: number;
};

export type TestAnswer = {
  questionId: number;
  answer: string;
  timeTaken: number;
};

export type SubmitTestRequest = {
  totalTimeSeconds: number;
  answers: TestAnswer[];
};

export type TestResult = {
  score: number;
  totalQuestions: number;
  accuracy: number;
  averageTime: number;
};