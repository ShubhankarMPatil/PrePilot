import { apiFetch } from "./client";

import type {
  ChallengeResponse,
} from "../types/api";

export async function challengeQuestion(
  questionId: number,
  studentAnswer: string
) {
  return apiFetch<ChallengeResponse>(
    `/questions/${questionId}/challenge`,
    {
      method: "POST",
      body: JSON.stringify({
        studentAnswer,
      }),
    }
  );
}