from pydantic import BaseModel
from typing import Literal


class GenerateTestRequest(BaseModel):
    topic: str

    difficulty: Literal[
        "Easy",
        "Medium",
        "Hard",
    ]

    count: int

    mode: Literal[
        "mcq",
        "typed",
    ]


class GenerateTestResponse(BaseModel):
    testId: int

    status: str