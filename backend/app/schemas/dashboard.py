from pydantic import BaseModel


class DashboardResponse(BaseModel):
    userName: str
    exam: str
    targetDate: str

    dailyQuestionsTarget: int
    dailyStudyHoursTarget: int

    totalSessions: int