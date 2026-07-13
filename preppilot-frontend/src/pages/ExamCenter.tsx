import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import QuestionCard from "../components/exam/QuestionCard";

import { getTests } from "../api/tests";
import { getQuestionsForTest } from "../api/questions";
import { submitTest } from "../api/testSubmission";
import { challengeQuestion } from "../api/challenge";

import type {
  Question,
  Test,
  ExamAnswer,
  ChallengeState,
} from "../types/api";


export default function ExamCenter() {
  const navigate = useNavigate();

  const { testId } = useParams();

  const [tests, setTests] =
    useState<Test[]>([]);

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [selectedTest, setSelectedTest] =
    useState<number | null>(null);

  const [currentQuestionIndex,
    setCurrentQuestionIndex] =
    useState(0);

  const [isSubmitting,
  setIsSubmitting] =
  useState(false);

  const [examState,
    setExamState] =
    useState<
      Record<number, ExamAnswer>
    >({});

  const currentQuestion =
    questions[currentQuestionIndex];

  const [challengeState,
    setChallengeState] =
    useState<
      Record<number, ChallengeState>
    >({});

  const challengeLoading =
    challengeState[
      currentQuestion?.id ?? -1
    ]?.loading ?? false;

  const [testStartTime,
    setTestStartTime] =
    useState(Date.now());

  const [elapsedTime,
    setElapsedTime] =
    useState(0);

  const questionEnteredAt =
    useRef(Date.now());

  const pausedDurationRef =
    useRef(0);

  const challengePauseStartedAt =
    useRef<number | null>(null);

  useEffect(() => {
    if (challengeLoading) return;

    const interval =
      window.setInterval(() => {
        setElapsedTime(
          Math.floor(
            (Date.now() -
              testStartTime -
              pausedDurationRef.current) /
              1000
          )
        );
      }, 1000);

    return () =>
      window.clearInterval(interval);
  }, [testStartTime, challengeLoading]);

  useEffect(() => {
    if (!testId) return;

    loadTest(Number(testId));
  }, [testId]);

  useEffect(() => {
    getTests()
      .then(setTests)
      .catch(console.error);
  }, []);

  async function loadTest(
    id: number
  ) {
    try {
      const data =
        await getQuestionsForTest(
          id
        );

      setSelectedTest(id);

      setQuestions(data);

      setCurrentQuestionIndex(0);

      setExamState({});

      setTestStartTime(Date.now());

      pausedDurationRef.current = 0;
      challengePauseStartedAt.current =
        null;

      questionEnteredAt.current =
        Date.now();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!currentQuestion) return;

    questionEnteredAt.current =
      Date.now();

    setExamState((prev) => {
      const existing =
        prev[currentQuestion.id];

      return {
        ...prev,

        [currentQuestion.id]:
          existing ?? {
            questionId:
              currentQuestion.id,

            answer: "",

            timeTakenSeconds: 0,

            visitCount: 1,
          },
      };
    });
  }, [currentQuestionIndex, questions]);

  function finishCurrentQuestionTimer() {
    if (!currentQuestion)
      return;

    const elapsed =
      (Date.now() -
        questionEnteredAt.current) /
      1000;

    setExamState((prev) => {
      const existing =
        prev[currentQuestion.id];

      if (!existing)
        return prev;

      return {
        ...prev,

        [currentQuestion.id]: {
          ...existing,

          timeTakenSeconds:
            existing.timeTakenSeconds +
            elapsed,
        },
      };
    });
  }

  function goToQuestion(
    index: number
  ) {
    if (
      index < 0 ||
      index >= questions.length
    )
      return;

    finishCurrentQuestionTimer();

    const nextQuestion =
      questions[index];

    setExamState((prev) => {
      const existing =
        prev[nextQuestion.id];

      return {
        ...prev,

        [nextQuestion.id]:
          existing
            ? {
                ...existing,

                visitCount:
                  existing.visitCount +
                  1,
              }
            : {
                questionId:
                  nextQuestion.id,

                answer: "",

                visitCount: 1,

                timeTakenSeconds: 0,
              },
      };
    });

    questionEnteredAt.current =
      Date.now();

    setCurrentQuestionIndex(index);
  }

  function recordAnswer(
    answer: string
  ) {
    if (!currentQuestion)
      return;

    setExamState((prev) => ({
      ...prev,

      [currentQuestion.id]: {
        ...(prev[
          currentQuestion.id
        ] ?? {
          questionId:
            currentQuestion.id,

          visitCount: 1,

          timeTakenSeconds: 0,
        }),

        answer,
      },
    }));
  }

  function resumeChallengeTimers() {
    if (
      challengePauseStartedAt.current !==
      null
    ) {
      pausedDurationRef.current +=
        Date.now() -
        challengePauseStartedAt.current;
      challengePauseStartedAt.current =
        null;
    }

    questionEnteredAt.current =
      Date.now();
  }

  async function handleSubmit() {
    if (!selectedTest || !currentQuestion)
      return;

    if (isSubmitting)
      return;

    setIsSubmitting(true);

    const elapsed =
      (Date.now() -
        questionEnteredAt.current) /
      1000;

    const finalExamState = {
      ...examState,

      [currentQuestion.id]: {
        ...examState[currentQuestion.id],

        timeTakenSeconds:
          (examState[currentQuestion.id]
            ?.timeTakenSeconds ??
            0) + elapsed,
      },
    };

    const payload = {
      answers:
        Object.values(
          finalExamState
        ).map((answer) => ({
          questionId:
            answer.questionId,

          answer:
            answer.answer,

          timeTaken:
            Math.round(
              answer.timeTakenSeconds
            ),

          visitCount:
            answer.visitCount,
        })),
    };

    try {
      await submitTest(
        selectedTest,
        payload
      );

      navigate(
        `/results/${selectedTest}`
      );
    } catch (error) {
      console.error(error);
    }

    finally {
      setIsSubmitting(false);
    }
  }

  async function handleChallenge() {
    if (!currentQuestion)
      return;

    const current =
      examState[currentQuestion.id];

    if (!current?.answer || challengeLoading)
      return;

    finishCurrentQuestionTimer();
    challengePauseStartedAt.current =
      Date.now();

    setChallengeState((prev) => ({
      ...prev,

      [currentQuestion.id]: {
        loading: true,

        completed: false,

        failed: false,
      },
    }));

    try {
      const result =
        await challengeQuestion(
          currentQuestion.id,
          current.answer
        );

      resumeChallengeTimers();

      setExamState((prev) => ({
        ...prev,

        [currentQuestion.id]: {
          ...(prev[currentQuestion.id] ?? {
            questionId:
              currentQuestion.id,

            answer: current.answer,

            visitCount: 1,

            timeTakenSeconds: 0,
          }),

          updatedScore:
            result?.updatedScore,
        },
      }));

      setChallengeState((prev) => ({
        ...prev,

        [currentQuestion.id]: {
          loading: false,

          completed: true,

          failed: false,

          result,

          challenge: {
            challenged: true,

            status:
              result?.updatedScore !==
              undefined
                ? "accepted"
                : "rejected",

            derivedAnswer:
              result?.derivedAnswer ?? "",

            reasoning:
              result?.reasoning ?? "",

            confidence:
              result?.confidence ?? 0,
          },
        },
      }));
    } catch (error) {
      console.error(error);

      resumeChallengeTimers();

      setChallengeState((prev) => ({
        ...prev,

        [currentQuestion.id]: {
          loading: false,

          completed: false,

          failed: true,

          errorMessage:
            "Challenge failed. Please try again.",
        },
      }));
    }
  }

  return (
    <AppLayout>
      {challengeLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-8 py-6 text-center shadow-xl">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
            <p className="font-semibold text-gray-900">
              PrepPilot is independently reviewing this question...
            </p>
            <p className="mt-2 text-sm text-gray-600">
              This usually takes a few seconds.
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">
        Exam Center
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          <Card>
            <h2 className="font-semibold mb-4">
              Available Tests
            </h2>

            <div className="space-y-3">
              {tests.map((test) => (
                <button
                  key={test.id}
                  type="button"
                  onClick={() =>
                    loadTest(test.id)
                  }
                  className={`w-full rounded-lg border p-3 text-left transition ${
                    selectedTest === test.id
                      ? "bg-gray-200 border-gray-400"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {test.title}
                </button>
              ))}
            </div>
          </Card>

          {questions.length > 0 && (
            <Card>
              <h2 className="font-semibold mb-4">
                Question Navigator
              </h2>

              <div className="grid grid-cols-5 gap-2">
                {questions.map(
                  (
                    question,
                    index
                  ) => {
                    const state =
                      examState[
                        question.id
                      ];

                    const isCurrent =
                      index ===
                      currentQuestionIndex;

                    const isAnswered =
                      !!state?.answer;

                    return (
                      <button
                        key={
                          question.id
                        }
                        type="button"
                        disabled={challengeLoading}
                        onClick={() =>
                          goToQuestion(
                            index
                          )
                        }
                        className={`rounded border p-2 text-sm transition ${
                          isCurrent
                            ? "bg-blue-600 text-white border-blue-600"
                            : isAnswered
                            ? "bg-green-100 border-green-300"
                            : "hover:bg-gray-100"
                        } ${challengeLoading ? "cursor-not-allowed opacity-50" : ""}`}
                      >
                        {index + 1}
                      </button>
                    );
                  }
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Question Area */}
        <div className="col-span-2">
          <Card>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Questions
                </h2>

                {currentQuestion && (
                  <p className="text-sm text-gray-500 mt-1">
                    Question{" "}
                    {currentQuestionIndex +
                      1}{" "}
                    of{" "}
                    {
                      questions.length
                    }
                  </p>
                )}
              </div>

              {selectedTest && (
                <span className="text-sm text-gray-600">
                  Time Elapsed:{" "}
                  {elapsedTime}s
                </span>
              )}
            </div>

            {!selectedTest && (
              <p>
                Select a test to
                begin.
              </p>
            )}

            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                answer={
                  examState[
                    currentQuestion.id
                  ]?.answer ?? ""
                }
                onAnswerChange={
                  recordAnswer
                }
                onChallenge={
                  handleChallenge
                }
                challengeState={
                  challengeState[
                    currentQuestion.id
                  ]
                }
              />
            )}

            {questions.length >
              0 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    goToQuestion(
                      currentQuestionIndex -
                        1
                    )
                  }
                  disabled={
                    currentQuestionIndex ===
                    0 || challengeLoading
                  }
                  className="rounded border px-4 py-2 disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() =>
                    goToQuestion(
                      currentQuestionIndex +
                        1
                    )
                  }
                  disabled={
                    currentQuestionIndex ===
                    questions.length -
                      1 ||
                    challengeLoading
                  }
                  className="rounded border px-4 py-2 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {selectedTest &&
              questions.length >
                0 && (
                <div className="mt-8 border-t pt-6">
                  <button
                    type="button"
                    disabled={isSubmitting || challengeLoading}
                    onClick={handleSubmit}
                    className="rounded bg-black px-6 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Test"}
                  </button>
                </div>
              )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}