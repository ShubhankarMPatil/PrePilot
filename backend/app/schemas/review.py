from pydantic import BaseModel

class ChallengeReview(BaseModel):

    challenged: bool

    status: str

    derivedAnswer: str

    reasoning: str

    confidence: float

    scoreChange: int


class ReviewQuestion(BaseModel):

    questionId: int

    question: str

    userAnswer: str

    correctAnswer: str

    isCorrect: bool

    timeTaken: int

    explanation: str

    challenge: ChallengeReview | None = None