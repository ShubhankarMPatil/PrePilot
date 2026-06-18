from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.session import (
    StudySessionResponse,
    CreateStudySessionRequest
)

from app.services.session_service import SessionService

router = APIRouter(
    prefix="/sessions",
    tags=["Sessions"]
)


@router.get(
    "/",
    response_model=list[StudySessionResponse]
)
def get_sessions(
    db: Session = Depends(get_db)
):
    return SessionService.get_sessions(db)


@router.post(
    "/",
    response_model=StudySessionResponse
)
def create_session(
    payload: CreateStudySessionRequest,
    db: Session = Depends(get_db)
):

    return SessionService.create_session(
        db=db,
        user_id=1,
        topic=payload.topic,
        duration_minutes=payload.duration_minutes,
        session_date=payload.session_date
    )