import re


class AnswerNormalizer:

    @staticmethod
    def normalize(answer: str | None) -> str:

        if answer is None:
            return ""

        answer = answer.strip().lower()

        answer = re.sub(
            r"\s+",
            " ",
            answer,
        )

        return answer