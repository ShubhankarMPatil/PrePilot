import { apiFetch } from "./client";
import type { Test } from "../types/api";

export async function getTests() {
  return apiFetch<Test[]>("/tests");
}