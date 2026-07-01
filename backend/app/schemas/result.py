from pydantic import BaseModel


class ResultResponse(BaseModel):
    score: int

    totalQuestions: int

    accuracy: float

    averageTime: float