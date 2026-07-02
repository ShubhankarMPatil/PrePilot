import { apiFetch } from "./client";
import type { KnowledgeDocument } from "../types/api";

const API_BASE_URL = "http://localhost:8000";

export async function getDocuments() {
  return apiFetch<KnowledgeDocument[]>(
    "/knowledge/documents"
  );
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/knowledge/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

export async function deleteDocument(id: number) {
  const response = await fetch(
    `${API_BASE_URL}/knowledge/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Delete failed");
  }
}