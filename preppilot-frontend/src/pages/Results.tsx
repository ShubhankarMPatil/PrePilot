import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

import { getResult } from "../api/results";

import type { TestResult } from "../types/api";

export default function Results() {
  const { testId } = useParams();

  const [result, setResult] =
    useState<TestResult | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadResult() {
      if (!testId) return;

      try {
        const data =
          await getResult(
            Number(testId)
          );

        setResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, [testId]);

  if (loading) {
    return (
      <AppLayout>
        Loading Results...
      </AppLayout>
    );
  }

  if (!result) {
    return (
      <AppLayout>
        Failed to load results.
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Results
      </h1>

      <Card>
        <div className="space-y-3">
          <p>
            <strong>Score:</strong>{" "}
            {result.score} /{" "}
            {result.totalQuestions}
          </p>

          <p>
            <strong>Accuracy:</strong>{" "}
            {result.accuracy}%
          </p>

          <p>
            <strong>Average Time:</strong>{" "}
            {result.averageTime}s
          </p>

          <Link
            to={`/review/${testId}`}
            className="inline-block mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Review Test
          </Link>
        </div>
      </Card>
    </AppLayout>
  );
}