from pydantic import BaseModel


class AnswerSubmission(BaseModel):
    questionId: int

    answer: str

    timeTaken: int


class SubmitTestRequest(BaseModel):
    totalTimeSeconds: int

    answers: list[AnswerSubmission]