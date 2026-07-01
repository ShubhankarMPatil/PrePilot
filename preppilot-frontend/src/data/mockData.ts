export const dashboardData = {
  streak: 12,
  completion: 68,
  hoursStudied: 4,
  dailyGoal: 6,

  goals: [
    {
      id: 1,
      title: "Quantitative Aptitude",
      progress: 75,
    },
    {
      id: 2,
      title: "Logical Reasoning",
      progress: 52,
    },
    {
      id: 3,
      title: "Verbal Ability",
      progress: 89,
    },
  ],

  todayPlan: [
    "Solve 20 Quant questions",
    "Complete LRDI set",
    "Read Editorial",
  ],

  recentActivity: [
    "Completed Algebra Quiz",
    "Finished Mock Test #4",
    "Reviewed Incorrect Questions",
  ],
  motivation: "Small daily improvements lead to remarkable results.",
};

export const calendarData = {
  selectedDate: "2026-08-10",

  tasks: [
    "Quant Practice",
    "Mock Test",
    "Revision Session",
  ],
};

export const analyticsData = {
  weeklyHours: [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 4 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 6 },
    { day: "Sat", hours: 4 },
    { day: "Sun", hours: 2 },
  ],

  stats: {
    totalHours: 26,
    completedTasks: 47,
    streak: 12,
  },
};

export const settingsData = {
  profile: {
    name: "Shubhankar",
    targetExam: "CAT 2027",
  },

  preferences: {
    dailyGoal: 6,
    notifications: true,
  },
};

export const knowledgeBaseData = {
  documents: [
    {
      id: 1,
      name: "CAT_Arithmetic.pdf",
      status: "Indexed" as const,
    },
    {
      id: 2,
      name: "Geometry_Notes.pdf",
      status: "Processing" as const,
    },
    {
      id: 3,
      name: "LRDI_Set_Collection.pdf",
      status: "Failed" as const,
    },
  ],
};