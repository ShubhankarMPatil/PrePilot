import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import CalendarGrid from "../components/calendar/CalendarGrid";

import { getSessions } from "../api/sessions";
import type { Session } from "../types/api";

export default function Calendar() {
  const [sessions, setSessions] =
    useState<Session[]>([]);

  useEffect(() => {
    getSessions()
      .then(setSessions)
      .catch(console.error);
  }, []);

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Study Calendar
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CalendarGrid />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-4">
            Upcoming Sessions
          </h2>

          {sessions.length === 0 ? (
            <p className="text-gray-500">
              No sessions scheduled.
            </p>
          ) : (
            <ul className="space-y-2">
              {sessions.map((session) => (
                <li
                  key={session.id}
                  className="border-b pb-2"
                >
                  {session.topic}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppLayout>
  );
}