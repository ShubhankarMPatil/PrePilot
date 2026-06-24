import { apiFetch } from "./client";

import type {
  SubmitTestRequest,
  TestResult,
} from "../types/api";

export async function submitTest(
  testId: number,
  payload: SubmitTestRequest
) {
  const response = await fetch(
    `http://localhost:3000/tests/${testId}/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Submit failed: ${response.status}`
    );
  }

  return response.json() as Promise<TestResult>;
}