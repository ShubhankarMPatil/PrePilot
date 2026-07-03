from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.sql import func

from app.db.base import Base


class AIInsight(Base):

    __tablename__ = "ai_insights"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        nullable=False,
    )

    test_id = Column(
        Integer,
        ForeignKey("tests.id"),
        nullable=False,
    )

    summary = Column(
        Text,
        nullable=False,
    )

    strengths = Column(
        Text,
        nullable=False,
    )

    weaknesses = Column(
        Text,
        nullable=False,
    )

    recommendations = Column(
        Text,
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )