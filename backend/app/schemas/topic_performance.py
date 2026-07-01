from pydantic import BaseModel


class TopicPerformance(
    BaseModel
):
    topic: str

    accuracy: float

    averageTime: float