from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.services.question_service import QuestionService

from app.schemas.question import QuestionResponse

router = APIRouter(
    prefix="/questions",
    tags=["Questions"]
)

@router.get(
    "/test/{test_id}",
    response_model=list[QuestionResponse]
)
def get_questions(
    test_id: int,
    db: Session = Depends(get_db)
):

    return QuestionService.get_test_questions(
        db,
        test_id
    )