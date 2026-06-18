import AppLayout from "../components/layout/AppLayout";

import SettingCard from "../components/settings/SettingCard";

import { settingsData } from "../data/mockData";

export default function Settings() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <SettingCard
          label="Name"
          value={settingsData.profile.name}
        />

        <SettingCard
          label="Target Exam"
          value={settingsData.profile.targetExam}
        />

        <SettingCard
          label="Daily Goal"
          value={`${settingsData.preferences.dailyGoal} hrs`}
        />

        <SettingCard
          label="Notifications"
          value={
            settingsData.preferences.notifications
              ? "Enabled"
              : "Disabled"
          }
        />
      </div>
    </AppLayout>
  );
}