import { apiFetch } from "./client";

import type {
  ReviewQuestion,
} from "../types/api";

export async function getReview(
  testId: number
) {
  return apiFetch<ReviewQuestion[]>(
    `/review/test/${testId}`
  );
}