import AppLayout from "../components/layout/AppLayout";

import StatCard from "../components/analytics/StatCard";
import StudyHoursChart from "../components/analytics/StudyHoursChart";

import { analyticsData } from "../data/mockData";

export default function Analytics() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Hours"
          value={analyticsData.stats.totalHours}
        />

        <StatCard
          title="Tasks Completed"
          value={analyticsData.stats.completedTasks}
        />

        <StatCard
          title="Current Streak"
          value={`${analyticsData.stats.streak} Days`}
        />
      </div>

      <StudyHoursChart
        data={analyticsData.weeklyHours}
      />
    </AppLayout>
  );
}