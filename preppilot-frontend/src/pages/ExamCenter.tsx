import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

import { getTests } from "../api/tests";
import { getQuestionsForTest } from "../api/questions";
import { submitTest } from "../api/testSubmission";

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import type {
  Test,
  Question,
  TestResult,
} from "../types/api";

export default function ExamCenter() {
  const [tests, setTests] =
    useState<Test[]>([]);

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [selectedTest, setSelectedTest] =
    useState<number | null>(null);

  const [answers, setAnswers] =
    useState<Record<number, string>>(
      {}
    );

  const navigate = useNavigate(); 

  const { testId } = useParams();

  const [result, setResult] =
    useState<TestResult | null>(
      null
    );

  const [testStartTime, setTestStartTime] =
    useState(Date.now());

  const totalTimeSeconds =
    Math.floor(
      (Date.now() -
        testStartTime) /
        1000
    );

  const [questionStartTimes,
    setQuestionStartTimes] =
    useState<Record<number, number>>(
      {}
    );

  useEffect(() => {
    if (!testId) return;

    loadTest(Number(testId));
  }, [testId]);

  useEffect(() => {
    getTests()
      .then((data) => {
        console.log("Loaded tests", data);
        setTests(data);
      })
      .catch((error) => {
        console.error("Failed to load tests", error);
      });
  }, []);

  async function loadTest(
    testId: number
  ) {
    try {
      const data =
        await getQuestionsForTest(
          testId
        );

      console.log("Loaded test questions", {
        testId,
        questions: data,
      });

      setSelectedTest(testId);
      setQuestions(data);
      setAnswers({});
      setResult(null);
      setTestStartTime(Date.now());
      setQuestionStartTimes({});
    } catch (error) {
      console.error("Failed to load test questions", error);
    }
  }

  function recordAnswer(
    questionId: number,
    answer: string
  ) {
    setQuestionStartTimes((prev) =>
      prev[questionId]
        ? prev
        : {
            ...prev,
            [questionId]: Date.now(),
          }
    );

    console.log("Recorded answer", {
      questionId,
      answer,
    });

    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }

  async function handleSubmit() {
    if (!selectedTest) {
      console.warn("handleSubmit aborted: no selectedTest");
      return;
    }

    const payload = {
      // totalTimeSeconds:
      //   Math.floor(
      //     (Date.now() -
      //       testStartTime) /
      //       1000
      //   ),

      answers: questions.map(
        (question) => ({
          questionId:
            question.id,

          answer:
            answers[
              question.id
            ] ?? "",

          timeTaken:
            questionStartTimes[
              question.id
            ]
              ? Math.floor(
                  (Date.now() -
                    questionStartTimes[
                      question.id
                    ]) /
                    1000
                )
              : 0,
        })
      ),
    };

    console.log("Submitting test", {
      selectedTest,
      payload,
    });

    try {
      const result =
        await submitTest(
          selectedTest,
          payload
        );

      navigate(`/results/${selectedTest}`);

      // console.log("submitTest response", result);

      // setResult(result);
    } catch (error) {
      console.error("submitTest failed", error);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Exam Center
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <Card>
            <h2 className="font-semibold mb-4">
              Available Tests
            </h2>

            <div className="space-y-3">
              {tests.map((test) => (
                <button
                  type="button"
                  key={test.id}
                  onClick={() =>
                    loadTest(
                      test.id
                    )
                  }
                  className="w-full text-left border rounded-lg p-3 hover:bg-gray-100 cursor-pointer transition"
                >
                  {test.title}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">
                Questions
              </h2>

              {selectedTest && (
                <span className="text-sm text-gray-600">
                  Time Elapsed:{" "}
                  {
                    totalTimeSeconds
                  }
                  s
                </span>
              )}
            </div>

            {!selectedTest && (
              <p>
                Select a test to
                begin.
              </p>
            )}

            {questions.map(
              (question) => (
                <div
                  key={
                    question.id
                  }
                  className="border rounded-lg p-4 mb-4"
                >
                  <p className="font-medium mb-4">
                    {
                      question.question_text
                    }
                  </p>

                  {question.question_type ===
                    "mcq" && (
                    <div className="space-y-2">
                      <button
                        onClick={() =>
                          recordAnswer(
                            question.id,
                            question.option_a ??
                              ""
                          )
                        }
                        className={`block w-full border rounded p-2 text-left ${
                          answers[
                            question.id
                          ] ===
                          question.option_a
                            ? "bg-gray-200"
                            : ""
                        }`}
                      >
                        {
                          question.option_a
                        }
                      </button>

                      <button
                        onClick={() =>
                          recordAnswer(
                            question.id,
                            question.option_b ??
                              ""
                          )
                        }
                        className={`block w-full border rounded p-2 text-left ${
                          answers[
                            question.id
                          ] ===
                          question.option_b
                            ? "bg-gray-200"
                            : ""
                        }`}
                      >
                        {
                          question.option_b
                        }
                      </button>

                      <button
                        onClick={() =>
                          recordAnswer(
                            question.id,
                            question.option_c ??
                              ""
                          )
                        }
                        className={`block w-full border rounded p-2 text-left ${
                          answers[
                            question.id
                          ] ===
                          question.option_c
                            ? "bg-gray-200"
                            : ""
                        }`}
                      >
                        {
                          question.option_c
                        }
                      </button>

                      <button
                        onClick={() =>
                          recordAnswer(
                            question.id,
                            question.option_d ??
                              ""
                          )
                        }
                        className={`block w-full border rounded p-2 text-left ${
                          answers[
                            question.id
                          ] ===
                          question.option_d
                            ? "bg-gray-200"
                            : ""
                        }`}
                      >
                        {
                          question.option_d
                        }
                      </button>
                    </div>
                  )}

                  {question.question_type ===
                    "typed" && (
                    <input
                      type="text"
                      placeholder="Enter answer"
                      value={
                        answers[
                          question.id
                        ] ?? ""
                      }
                      onChange={(
                        e
                      ) =>
                        recordAnswer(
                          question.id,
                          e.target
                            .value
                        )
                      }
                      className="border rounded p-2 w-full"
                    />
                  )}
                </div>
              )
            )}

            {selectedTest &&
              questions.length >
                0 && (
                <button
                  onClick={
                    handleSubmit
                  }
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Submit Test
                </button>
              )}
          </Card>
{/* 
          {result && (
            <Card>
              <h2 className="font-semibold mb-4">
                Test Result
              </h2>

              <p>
                Score:{" "}
                {
                  result.score
                }
              </p>

              <p>
                Accuracy:{" "}
                {
                  result.accuracy
                }
                %
              </p>

              <p>
                Average Time:{" "}
                {
                  result.averageTime
                }
                s
              </p>
            </Card>
          )} */}
        </div>
      </div>
    </AppLayout>
  );
}