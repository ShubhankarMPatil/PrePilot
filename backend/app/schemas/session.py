from pydantic import BaseModel


class StudySessionResponse(BaseModel):
    id: int
    topic: str
    duration_minutes: int
    session_date: str


class CreateStudySessionRequest(BaseModel):
    topic: str
    duration_minutes: int
    session_date: str