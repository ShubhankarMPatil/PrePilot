import { apiFetch } from "./client";
import type { CoachInsight } from "../types/api";


export async function getCoachInsight(
  testId: number
) {
  return apiFetch<CoachInsight>(
    `/coach/test/${testId}`
  );
}