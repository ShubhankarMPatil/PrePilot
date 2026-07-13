from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Text

from sqlalchemy.sql import func

from app.db.base import Base


class QuestionChallenge(Base):

    __tablename__ = "question_challenges"

    id = Column(
        Integer,
        primary_key=True,
    )

    question_id = Column(
        Integer,
        ForeignKey("questions.id"),
    )

    test_id = Column(
        Integer,
        ForeignKey("tests.id"),
    )

    student_answer = Column(
        Text,
    )

    derived_answer = Column(
        Text,
    )

    verdict = Column(
        Text,
    )

    reasoning = Column(
        Text,
    )

    confidence = Column(
        Float,
    )

    resolved = Column(
        Boolean,
        default=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )