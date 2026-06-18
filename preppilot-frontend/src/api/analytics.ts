import { apiFetch } from "./client";

import type {
  AnalyticsResponse,
} from "../types/api";

export async function getAnalytics() {
  return apiFetch<AnalyticsResponse>(
    "/analytics"
  );
}