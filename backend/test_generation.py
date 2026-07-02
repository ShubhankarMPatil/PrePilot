from pprint import pprint

from app.ai.generation.question_generator import (
    QuestionGenerator,
)


generator = QuestionGenerator()

result = generator.generate(
    topic="Percentages",
    difficulty="Medium",
    count=3,
    mode="mcq",
)

print()

print("=" * 60)

print("Generated Questions")

print("=" * 60)

for i, question in enumerate(result.questions, start=1):

    print()

    print(f"Question {i}")

    print(question.question)

    print()

    pprint(question.options)

    print()

    print("Answer:")

    print(question.correct_answer)

    print()

    print("Explanation:")

    print(question.explanation)