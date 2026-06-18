from pydantic import BaseModel


class TopicBreakdown(BaseModel):
    topic: str
    minutes: int


class AnalyticsResponse(BaseModel):
    totalStudyMinutes: int
    sessionsCompleted: int
    topicBreakdown: list[TopicBreakdown]