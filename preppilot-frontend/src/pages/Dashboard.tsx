import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import ProgressCard from "../components/dashboard/ProgressCard";
import GoalCard from "../components/dashboard/GoalCard";
import Card from "../components/ui/Card";

import { getDashboard } from "../api/dashboard";
import { getGoals } from "../api/goals";
import { getAnalytics } from "../api/analytics";
import type { DashboardResponse } from "../types/api";
import type { GoalResponse } from "../types/api";
import type { AnalyticsResponse } from "../types/api";

import { dashboardData } from "../data/mockData";

export default function Dashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [goals, setGoals] =
    useState<GoalResponse | null>(null);

  const [analytics, setAnalytics] =
    useState<AnalyticsResponse | null>(null);

  useEffect(() => {
    getDashboard()
      .then((data) => {
        setDashboard(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getGoals()
      .then(setGoals)
      .catch(console.error);
  }, []);

  useEffect(() => {
    getAnalytics()
      .then(setAnalytics)
      .catch(console.error);
  }, []);

  if (!dashboard) {
    return (
      <AppLayout>
        <div>Loading Dashboard...</div>
      </AppLayout>
    );
  }

  if (!analytics) {
    return (
      <AppLayout>
        Loading Analytics...
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Welcome Back, {dashboard.userName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <h2 className="font-semibold mb-2">
            Today's Motivation
          </h2>

          <p className="text-gray-600">
            {dashboardData.motivation}
          </p>
        </Card>

        <ProgressCard
          title="Study Streak"
          value={`${dashboardData.streak} Days`}
        />

        <ProgressCard
          title="Completion"
          value={`${dashboardData.completion}%`}
        />

        <ProgressCard
          title="Daily Goal"
          value={`${dashboardData.hoursStudied}/${dashboardData.dailyGoal} hrs`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold mb-2">
            Exam Goal
          </h2>

          <p>{dashboard.exam}</p>

          <p className="text-sm text-gray-500 mt-2">
            Target Date: {dashboard.targetDate}
          </p>

          <h2 className="font-semibold mb-3 mt-4">
            Today's Study Plan
          </h2>

          <ul className="space-y-2">
            {dashboardData.todayPlan.map((task) => (
              <li key={task}>• {task}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-semibold mb-3">
            Recent Activity
          </h2>

          <ul className="space-y-2">
            {dashboardData.recentActivity.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-semibold mb-4">
            Daily Targets
          </h2>

          <p>
            Questions:
            {" "}
            {goals?.dailyQuestionsTarget}
          </p>

          <p>
            Study Hours:
            {" "}
            {goals?.dailyStudyHoursTarget}
          </p>

          <p>
            Sessions:
            {" "}
            {dashboard.totalSessions}
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold mb-4">
            Topic Breakdown
          </h2>

          {analytics.topicBreakdown.map((topic) => (
            <div
              key={topic.topic}
              className="flex justify-between py-2"
            >
              <span>
                {topic.topic}
              </span>

              <span>
                {topic.minutes} min
              </span>
            </div>
          ))}
        </Card>
      </div>
    </AppLayout>
  );
}