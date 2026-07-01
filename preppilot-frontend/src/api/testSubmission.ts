import { API_BASE_URL } from "./client";

import type {
  SubmitTestRequest,
  TestResult,
} from "../types/api";

export async function submitTest(
  testId: number,
  payload: SubmitTestRequest
) {
  console.log("submitTest called", {
    testId,
    payload,
  });

  const response = await fetch(
    `${API_BASE_URL}/tests/${testId}/submit`,
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