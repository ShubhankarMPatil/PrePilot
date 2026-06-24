import { apiFetch } from "./client";
import type { Question } from "../types/api";

export async function getQuestionsForTest(
  testId: number
) {
  return apiFetch<Question[]>(
    `/questions/test/${testId}`
  );
}