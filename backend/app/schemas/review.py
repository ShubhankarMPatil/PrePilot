from pydantic import BaseModel


class ReviewQuestionResponse(
    BaseModel
):
    questionId: int

    question: str

    userAnswer: str

    correctAnswer: str

    isCorrect: bool

    timeTaken: int

    explanation: str