from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.challenge import (
    ChallengeRequest,
    ChallengeResponse,
)

from app.services.challenge_service import (
    ChallengeService,
)

router = APIRouter(
    prefix="/questions",
    tags=["Challenge"],
)


@router.post(
    "/{question_id}/challenge",
    response_model=ChallengeResponse,
)
def challenge_question(

    question_id: int,

    payload: ChallengeRequest,

    db: Session = Depends(get_db),
):

    return ChallengeService.challenge(

        db=db,

        question_id=question_id,

        student_answer=payload.studentAnswer,
    )