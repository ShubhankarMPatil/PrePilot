from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from app.db.base import Base


class Goal(Base):
    __tablename__ = "goals"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    daily_questions_target = Column(Integer)

    daily_study_hours_target = Column(Integer)