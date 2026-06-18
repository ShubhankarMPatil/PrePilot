import { apiFetch } from "./client";

import type {
  Subject,
} from "../types/api";

export async function getSubjects() {
  return apiFetch<Subject[]>(
    "/subjects"
  );
}