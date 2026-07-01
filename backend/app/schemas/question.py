from pydantic import BaseModel, ConfigDict

class QuestionResponse(BaseModel):
    
    model_config = ConfigDict(from_attributes=True)

    id: int

    question_text: str

    question_type: str

    option_a: str | None = None
    option_b: str | None = None
    option_c: str | None = None
    option_d: str | None = None

    question_order: int

    topic: str