from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from app.db.base import Base


class QuestionAttempt(Base):
    __tablename__ = "question_attempts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    question_id = Column(
        Integer,
        ForeignKey("questions.id")
    )

    user_id = Column(Integer)

    user_answer = Column(String)

    is_correct = Column(Boolean)

    time_taken_seconds = Column(Integer)