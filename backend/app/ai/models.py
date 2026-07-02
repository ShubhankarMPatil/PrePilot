from typing import Literal

from pydantic import BaseModel, Field


class GeneratedQuestion(BaseModel):
    question: str

    question_type: Literal["mcq", "typed"]

    options: list[str] = Field(default_factory=list)

    correct_answer: str

    explanation: str

    topic: str

    subtopic: str

    concepts: list[str] = Field(default_factory=list)

    difficulty: Literal["Easy", "Medium", "Hard"]

    estimated_time_seconds: int

    tags: list[str] = Field(default_factory=list)


class GeneratedQuestionSet(BaseModel):
    questions: list[GeneratedQuestion]