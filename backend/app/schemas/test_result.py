from pydantic import BaseModel


class TestResultResponse(BaseModel):
    score: int

    totalQuestions: int

    accuracy: float

    averageTime: float