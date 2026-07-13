export type GenerateTestRequest = {
  topic: string;
  difficulty: string;
  count: number;
  mode: "mcq" | "typed";
};

export type GenerateTestResponse = {
  testId: number;
  status: "generated";
  questionCount: number;
  estimatedTime: number;
  topic: string;
  difficulty: string;
};

export async function generateTest(
  payload: GenerateTestRequest
) {
  const response = await fetch(
    "http://localhost:8000/tests/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate test");
  }

  return response.json() as Promise<GenerateTestResponse>;
}