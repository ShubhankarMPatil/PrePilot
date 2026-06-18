import { apiFetch } from "./client";

import type {
  DashboardResponse,
} from "../types/api";

export async function getDashboard() {
  return apiFetch<DashboardResponse>(
    "/dashboard"
  );
} 