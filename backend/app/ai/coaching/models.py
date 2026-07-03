from pydantic import BaseModel


class CoachingInsight(BaseModel):

    summary: str

    strengths: list[str]

    weaknesses: list[str]

    recommendations: list[str]