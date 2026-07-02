from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from app.db.base import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    test_id = Column(
        Integer,
        ForeignKey("tests.id")
    )

    question_text = Column(String)

    question_type = Column(String)

    option_a = Column(String)
    option_b = Column(String)
    option_c = Column(String)
    option_d = Column(String)

    correct_answer = Column(String)

    explanation = Column(String)

    question_order = Column(Integer)

    topic = Column(String)

    subtopic = Column(String)

    difficulty = Column(String)

    estimated_time_seconds = Column(Integer, default=90)

    tags = Column(String)