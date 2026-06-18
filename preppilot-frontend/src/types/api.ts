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