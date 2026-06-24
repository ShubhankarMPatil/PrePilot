from pydantic import BaseModel


class TestResponse(BaseModel):
    id: int
    title: str
    topic: str
    difficulty: str
    total_questions: int
    status: str