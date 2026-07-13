import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

import { getReview } from "../api/review";

import type {
  ReviewQuestion,
} from "../types/api";

export default function Review() {
  const { testId } = useParams();

  const [questions, setQuestions] =
    useState<ReviewQuestion[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadReview() {
      if (!testId) return;

      try {
        const data =
          await getReview(
            Number(testId)
          );

        setQuestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadReview();
  }, [testId]);

  if (loading) {
    return (
      <AppLayout>
        Loading Review...
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Review
      </h1>

      <div className="space-y-4">
        {questions.map((q) => (
          <Card key={q.questionId}>
            <p className="font-semibold mb-3">
              {q.question}
            </p>

            <p>
              <strong>Your Answer:</strong>{" "}
              {q.userAnswer}
            </p>

            <p>
              <strong>Correct Answer:</strong>{" "}
              {q.correctAnswer}
            </p>

            <p
              className={
                q.isCorrect
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {q.isCorrect
                ? "Correct"
                : "Incorrect"}
            </p>

            <p>
              <strong>Time Taken:</strong>{" "}
              {q.timeTaken}s
            </p>

            <p className="mt-3 text-gray-700">
              <strong>Explanation:</strong>{" "}
              {q.explanation}
            </p>
            {q.challenge && (
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
                  ⚖ Challenged
                </span>

                <span
                  className={`ml-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    q.challenge.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {q.challenge.status === "accepted"
                    ? "✅ Accepted"
                    : "❌ Rejected"}
                </span>
              </div>
            )}
            {q.challenge && (
              <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                <h3 className="mb-4 font-semibold">
                  Challenge Review
                </h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Status:</strong>{" "}
                    {q.challenge.status}
                  </p>

                  <p>
                    <strong>Independent Answer:</strong>{" "}
                    {q.challenge.derivedAnswer}
                  </p>

                  <p>
                    <strong>Confidence:</strong>{" "}
                    {(q.challenge.confidence * 100).toFixed(1)}%
                  </p>

                  <p>
                    <strong>Score Adjustment:</strong>{" "}
                    {q.challenge.scoreChange > 0
                      ? `+${q.challenge.scoreChange}`
                      : "0"}
                  </p>

                  <div>
                    <strong>Reasoning</strong>

                    <p className="mt-1 text-gray-700">
                      {q.challenge.reasoning}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}