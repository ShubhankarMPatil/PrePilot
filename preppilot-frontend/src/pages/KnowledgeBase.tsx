import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

import {
  getDocuments,
  uploadDocument,
  deleteDocument,
} from "../api/Knowledge";

import type { KnowledgeDocument } from "../types/api";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<
    KnowledgeDocument[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  async function loadDocuments() {
    setLoading(true);

    try {
      const data =
        await getDocuments();

      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      await uploadDocument(file);

      await loadDocuments();

      alert(
        "Document uploaded successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Upload failed."
      );
    } finally {
      setUploading(false);

      e.target.value = "";
    }
  }

  async function handleDelete(
    id: number
  ) {
    if (
      !window.confirm(
        "Delete this document?"
      )
    )
      return;

    try {
      await deleteDocument(id);

      await loadDocuments();
    } catch (error) {
      console.error(error);
    }
  }

  function getStatusColor(
    status: KnowledgeDocument["status"]
  ) {
    switch (status) {
      case "indexed":
        return "text-green-600 bg-green-50";

      case "processing":
        return "text-blue-600 bg-blue-50";

      case "failed":
        return "text-red-600 bg-red-50";

      default:
        return "text-gray-600 bg-gray-50";
    }
  }

  function getStatusIcon(
    status: KnowledgeDocument["status"]
  ) {
    switch (status) {
      case "indexed":
        return "✓";

      case "processing":
        return "⏳";

      case "failed":
        return "✗";

      default:
        return "○";
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div>
          Loading Knowledge Base...
        </div>
      </AppLayout>
    );
  }

  const indexed =
    documents.filter(
      (d) =>
        d.status === "indexed"
    ).length;

  const processing =
    documents.filter(
      (d) =>
        d.status ===
        "processing"
    ).length;

  const failed =
    documents.filter(
      (d) =>
        d.status === "failed"
    ).length;

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

          <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
            <p className="text-gray-600 mb-2">
              📄 Click to upload
            </p>

            <p className="text-sm text-gray-500">
              PDF, DOCX, TXT
            </p>

            {uploading && (
              <p className="mt-3 text-blue-600">
                Uploading...
              </p>
            )}

            <input
              type="file"
              hidden
              onChange={
                handleUpload
              }
            />
          </label>
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
                {
                  documents.length
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Indexed
              </p>

              <p className="text-lg font-semibold text-green-600">
                {indexed}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Processing
              </p>

              <p className="text-lg font-semibold text-blue-600">
                {
                  processing
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Failed
              </p>

              <p className="text-lg font-semibold text-red-600">
                {failed}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold mb-4">
          Documents
        </h2>

        {documents.length ===
        0 ? (
          <p className="text-gray-500">
            No documents
            uploaded yet.
          </p>
        ) : (
          <div className="space-y-3">
            {documents.map(
              (doc) => (
                <div
                  key={
                    doc.id
                  }
                  className="flex justify-between items-center border rounded-lg p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {
                        doc.filename
                      }
                    </p>

                    <p className="text-sm text-gray-500">
                      {
                        doc.fileType
                      }
                    </p>

                    <p className="text-xs text-gray-400">
                      Uploaded{" "}
                      {
                        doc.uploadedAt
                      }
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        doc.status
                      )}`}
                    >
                      {getStatusIcon(
                        doc.status
                      )}{" "}
                      {
                        doc.status
                      }
                    </span>

                    <button
                      onClick={() =>
                        handleDelete(
                          doc.id
                        )
                      }
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </Card>
    </AppLayout>
  );
}