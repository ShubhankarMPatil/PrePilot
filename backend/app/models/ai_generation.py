from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.sql import func

from app.db.base import Base


class AIGeneration(Base):
    __tablename__ = "ai_generations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    feature = Column(
        String,
        nullable=False
    )

    provider = Column(
        String,
        nullable=False
    )

    model = Column(
        String,
        nullable=False
    )

    prompt_version = Column(
        String,
        nullable=False
    )

    duration_ms = Column(
        Integer,
        nullable=False
    )

    success = Column(
        Boolean,
        default=True
    )

    error = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )