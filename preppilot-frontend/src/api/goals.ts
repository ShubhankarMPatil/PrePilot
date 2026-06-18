import { apiFetch } from "./client";

import type {
  GoalResponse,
} from "../types/api";

export async function getGoals() {
  return apiFetch<GoalResponse>(
    "/goals"
  );
}