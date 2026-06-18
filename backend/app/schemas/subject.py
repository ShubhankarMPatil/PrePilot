from pydantic import BaseModel


class SubjectResponse(BaseModel):
    id: int
    name: str
    category: str