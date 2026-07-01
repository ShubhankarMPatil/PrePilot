import { apiFetch } from "./client";
import type { TestResult } from "../types/api";

export async function getResult(
  testId: number
) {
  return apiFetch<TestResult>(
    `/results/test/${testId}`
  );
}