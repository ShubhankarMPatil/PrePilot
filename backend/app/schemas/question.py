from pydantic import BaseModel


class QuestionResponse(BaseModel):
    id: int

    question_text: str

    question_type: str

    option_a: str | None = None
    option_b: str | None = None
    option_c: str | None = None
    option_d: str | None = None

    question_order: int