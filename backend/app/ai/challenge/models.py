from pydantic import BaseModel


class ChallengeContext(BaseModel):

    question: str

    options: list[str]

    stored_answer: str

    student_answer: str


class ChallengeVerdict(BaseModel):

    question_valid: bool

    generator_answer_valid: bool

    student_correct: bool

    derived_answer: str

    matched_option: str | None

    confidence: float

    reasoning: str