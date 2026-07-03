import type { Question } from "../../types/api";

type QuestionCardProps = {
  question: Question;
  answer: string;

  onAnswerChange: (answer: string) => void;
};

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
}: QuestionCardProps) {
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