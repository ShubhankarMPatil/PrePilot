import { apiFetch } from "./client";

import type {
  Session,
} from "../types/api";

export async function getSessions() {
  return apiFetch<Session[]>(
    "/sessions"
  );
}