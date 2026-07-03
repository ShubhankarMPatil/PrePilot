import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

import { getResult } from "../api/results";

import type { TestResult } from "../types/api";

import { getCoachInsight } from "../api/coach";

import type {CoachInsight} from "../types/api";

export default async function Results() {
  const { testId } = useParams();

  const [result, setResult] =
    useState<TestResult | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [coach, setCoach] =
    useState<CoachInsight | null>(null);

  const [coachLoading, setCoachLoading] =
    useState(true);

  useEffect(() => {
    async function loadResult() {
      if (!testId) return;

      try {
        const [resultData, coachData] =
          await Promise.all([
            getResult(Number(testId)),
            getCoachInsight(Number(testId)),
          ]);

        setResult(resultData);
        setCoach(coachData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setCoachLoading(false);
      }
    }

    loadResult();
  }, [testId]);

  if (loading) {
    return (
      <AppLayout>
        <Card>
          <div className="space-y-3">
            <div className="h-8 w-48 rounded bg-gray-200 animate-pulse" />
            <div className="h-5 w-full rounded bg-gray-200 animate-pulse" />
            <div className="h-5 w-2/3 rounded bg-gray-200 animate-pulse" />
          </div>
        </Card>
      </AppLayout>
    );
  }

  try {
    const insight =
      await getCoachInsight(
        Number(testId)
      );

    setCoach(insight);
  } catch (error) {
    console.error(error);
  } finally {
    setCoachLoading(false);
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

      {coachLoading && (
        <div className="space-y-4 mt-6">
          <Card>
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </Card>

          <Card>
            <div className="h-24 bg-gray-200 rounded animate-pulse" />
          </Card>

          <Card>
            <div className="h-24 bg-gray-200 rounded animate-pulse" />
          </Card>
        </div>
      )}

      {coach && (
        <div className="space-y-6 mt-6">

          <Card>
            <h2 className="font-semibold mb-3">
              Summary
            </h2>

            <p>{coach.summary}</p>
          </Card>

          <Card>
            <h2 className="font-semibold mb-3 text-green-600">
              Strengths
            </h2>

            <ul className="list-disc pl-5 space-y-1">
              {coach.strengths.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </Card>

          <Card>
            <h2 className="font-semibold mb-3 text-red-600">
              Weaknesses
            </h2>

            <ul className="list-disc pl-5 space-y-1">
              {coach.weaknesses.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </Card>

          <Card>
            <h2 className="font-semibold mb-3">
              Recommendations
            </h2>

            <ul className="list-disc pl-5 space-y-1">
              {coach.recommendations.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </Card>

        </div>
      )}

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