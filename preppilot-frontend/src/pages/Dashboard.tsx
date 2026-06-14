import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

export default function Dashboard() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <h3 className="text-sm text-gray-500">
            Study Streak
          </h3>

          <p className="text-3xl font-bold mt-2">
            12 Days
          </p>
        </Card>

        <Card>
          <h3 className="text-sm text-gray-500">
            Completion
          </h3>

          <p className="text-3xl font-bold mt-2">
            68%
          </p>
        </Card>

        <Card>
          <h3 className="text-sm text-gray-500">
            Daily Goal
          </h3>

          <p className="text-3xl font-bold mt-2">
            4 / 6 hrs
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}