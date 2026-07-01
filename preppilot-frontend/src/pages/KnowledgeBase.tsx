import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

import type { Document } from "../types/api";
import { knowledgeBaseData } from "../data/mockData";

export default function KnowledgeBase() {
  const [documents, setDocuments] =
    useState<Document[]>([]);
  
  const [loading, setLoading] =
    useState<boolean>(true);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setDocuments(knowledgeBaseData.documents);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Indexed":
        return "text-green-600 bg-green-50";
      case "Processing":
        return "text-yellow-600 bg-yellow-50";
      case "Failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Indexed":
        return "✓";
      case "Processing":
        return "⏳";
      case "Failed":
        return "✗";
      default:
        return "○";
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div>Loading Knowledge Base...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Knowledge Base
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h2 className="font-semibold mb-4">
            Upload Document
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
            <p className="text-gray-600 mb-2">
              Drop your documents here
            </p>
            <p className="text-sm text-gray-500">
              or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Supported: PDF, DOCX, TXT
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-4">
            Upload Status
          </h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">
                Total Documents
              </p>
              <p className="text-2xl font-bold">
                {documents.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Indexed
              </p>
              <p className="text-lg font-semibold text-green-600">
                {documents.filter(
                  (d) => d.status === "Indexed"
                ).length}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Processing
              </p>
              <p className="text-lg font-semibold text-yellow-600">
                {documents.filter(
                  (d) => d.status === "Processing"
                ).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold mb-4">
          Indexed Documents
        </h2>

        {documents.length === 0 ? (
          <p className="text-gray-500">
            No documents uploaded yet
          </p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-lg">📄</span>
                  <span className="font-medium">
                    {doc.name}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                    doc.status
                  )}`}
                >
                  <span>{getStatusIcon(doc.status)}</span>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </AppLayout>
  );
}