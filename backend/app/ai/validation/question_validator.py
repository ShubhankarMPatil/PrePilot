from app.ai.models import GeneratedQuestionSet


class QuestionValidator:

    @staticmethod
    def validate(
        question_set: GeneratedQuestionSet
    ):

        for question in question_set.questions:

            if (
                question.question_type == "mcq"
            ):

                if len(question.options) != 4:
                    raise ValueError(
                        "MCQ must contain exactly 4 options."
                    )

                if (
                    question.correct_answer
                    not in question.options
                ):
                    raise ValueError(
                        "Correct answer is not one of the options."
                    )

                if (
                    len(set(question.options))
                    != 4
                ):
                    raise ValueError(
                        "Duplicate options detected."
                    )

            if (
                len(question.explanation.strip())
                < 20
            ):
                raise ValueError(
                    "Explanation too short."
                )

        return True