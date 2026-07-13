import type { Question } from "../../types/api";
import type {ChallengeState,} from "../../types/api";

type QuestionCardProps = {
  question: Question;

  answer: string;

  onAnswerChange: (
    answer: string
  ) => void;

  onChallenge: () => void;

  challengeState?:
    ChallengeState;
};

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onChallenge,
  challengeState,
}: QuestionCardProps) {
  const isChallengeAccepted = Boolean(
    challengeState?.result?.updatedScore !== undefined
  );

  const isChallengeCompleted = Boolean(challengeState?.completed);
  const challengeFailed = Boolean(challengeState?.failed);

  return (
    <div className="border rounded-lg p-4 mb-4">
      <p className="font-medium mb-4">
        {question.question_text}
      </p>

      {question.question_type === "mcq" && (
        <div className="space-y-2">
          <OptionButton
            text={question.option_a ?? ""}
            selected={answer === question.option_a}
            onClick={() =>
              onAnswerChange(question.option_a ?? "")
            }
          />

          <OptionButton
            text={question.option_b ?? ""}
            selected={answer === question.option_b}
            onClick={() =>
              onAnswerChange(question.option_b ?? "")
            }
          />

          <OptionButton
            text={question.option_c ?? ""}
            selected={answer === question.option_c}
            onClick={() =>
              onAnswerChange(question.option_c ?? "")
            }
          />

          <OptionButton
            text={question.option_d ?? ""}
            selected={answer === question.option_d}
            onClick={() =>
              onAnswerChange(question.option_d ?? "")
            }
          />
        </div>
      )}

      {question.question_type === "typed" && (
        <input
          type="text"
          value={answer}
          placeholder="Enter answer"
          onChange={(e) =>
            onAnswerChange(e.target.value)
          }
          className="border rounded p-2 w-full"
        />
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={onChallenge}
          disabled={
            !answer ||
            challengeState?.loading ||
            isChallengeCompleted ||
            challengeFailed
          }
          className="rounded border px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {challengeState?.loading
            ? "PrepPilot is reviewing..."
            : challengeState?.completed
            ? "Challenge Submitted"
            : challengeFailed
            ? "Try Again"
            : "⚠ Challenge Question"}
        </button>

        {challengeFailed && (
          <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4">
            <h3 className="font-semibold mb-2">Challenge failed.</h3>
            <p className="text-sm">Please try again.</p>
          </div>
        )}

        {challengeState?.completed && challengeState.result && (
          <div
            className={`mt-4 rounded-lg border p-4 ${
              isChallengeAccepted
                ? "border-green-300 bg-green-50"
                : "border-yellow-300 bg-yellow-50"
            }`}
          >
            <h3 className="font-semibold mb-2">
              {isChallengeAccepted
                ? "✓ Challenge Accepted"
                : "Challenge Rejected"}
            </h3>

            <p className="text-sm mb-2">
              {isChallengeAccepted
                ? "The independent review found an issue with the original grading. Your score has been updated automatically."
                : "The independent review agrees with the original grading. No score changes were made."}
            </p>

            <p className="text-sm mb-2">{challengeState.result.reasoning}</p>

            <p className="text-sm">
              Independent Answer: {challengeState.result.derivedAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type OptionButtonProps = {
  text: string;

  selected: boolean;

  onClick: () => void;
};

function OptionButton({
  text,
  selected,
  onClick,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full border rounded p-2 text-left transition ${
        selected
          ? "bg-gray-200 border-gray-400"
          : "hover:bg-gray-100"
      }`}
    >
      {text}
    </button>
  );
}