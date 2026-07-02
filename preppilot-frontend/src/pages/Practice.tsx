import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";

import { generateTest } from "../api/Practice";

export default function Practice() {
    const [topic, setTopic] =
        useState("Percentages");

    const [difficulty, setDifficulty] =
        useState("Medium");

    const [mode, setMode] =
        useState<"mcq" | "typed">("mcq");

    const [count, setCount] =
        useState(10);

    const [errorMessage, setErrorMessage] =
    useState("");

    const navigate = useNavigate();

    async function handleGenerate() {
        try {
            const response = await generateTest({
                topic,
                difficulty,
                count,
                mode,
            });

            navigate(`/exam/${response.testId}`);

        } catch (error) {
            console.error(error);

            setErrorMessage(
                "Couldn't generate a test right now. Please try again."
            );
        }
    }

    return (
        <AppLayout>
        <h1 className="text-3xl font-bold mb-6">
            Practice
        </h1>

        <Card>
            <div className="space-y-4">

            <div>
                <label>Topic</label>

                <input
                value={topic}
                onChange={(e) =>
                    setTopic(e.target.value)
                }
                className="border rounded w-full p-2"
                />
            </div>

            <div>
                <label>Difficulty</label>

                <select
                value={difficulty}
                onChange={(e) =>
                    setDifficulty(e.target.value)
                }
                className="border rounded w-full p-2"
                >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
                </select>
            </div>

            <div>
                <label>Mode</label>

                <select
                value={mode}
                onChange={(e) =>
                    setMode(
                    e.target.value as
                        | "mcq"
                        | "typed"
                    )
                }
                className="border rounded w-full p-2"
                >
                <option value="mcq">
                    MCQ
                </option>

                <option value="typed">
                    Typed
                </option>
                </select>
            </div>

            <div>
                <label>
                Number of Questions
                </label>

                <input
                type="number"
                value={count}
                onChange={(e) =>
                    setCount(
                    Number(e.target.value)
                    )
                }
                className="border rounded w-full p-2"
                />
            </div>

            {errorMessage && (
            <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
                {errorMessage}
            </p>
            )}

            <button
                onClick={handleGenerate}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Generate Practice Test
            </button>

            </div>
        </Card>
        </AppLayout>
    );
}