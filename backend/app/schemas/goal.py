from pydantic import BaseModel


class GoalResponse(BaseModel):
    dailyQuestionsTarget: int
    dailyStudyHoursTarget: int