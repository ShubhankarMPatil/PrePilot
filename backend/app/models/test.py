from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean

from app.db.base import Base


class Test(Base):
    __tablename__ = "tests"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(Integer)

    title = Column(String)

    topic = Column(String)

    difficulty = Column(String)

    total_questions = Column(Integer)

    status = Column(String)

    total_time_seconds = Column(Integer)

    submitted = Column(Boolean, default=False)