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
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}