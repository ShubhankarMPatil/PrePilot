from pydantic import BaseModel


class ChallengeRequest(BaseModel):
    studentAnswer: str


class ChallengeResponse(BaseModel):

    questionValid: bool

    generatorAnswerValid: bool

    studentCorrect: bool

    derivedAnswer: str

    matchedOption: str | None

    confidence: float

    reasoning: str

    updatedScore: int | None = None