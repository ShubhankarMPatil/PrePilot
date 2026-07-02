from pydantic import BaseModel


class SubmittedAnswer(
    BaseModel
):

    questionId: int

    answer: str

    timeTaken: int


class SubmitTestRequest(
    BaseModel
):

    answers: list[
        SubmittedAnswer
    ]