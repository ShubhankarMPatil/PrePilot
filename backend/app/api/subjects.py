from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.subject import SubjectResponse

from app.services.subject_service import SubjectService

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


@router.get(
    "/",
    response_model=list[SubjectResponse]
)
def get_subjects(
    db: Session = Depends(get_db)
):
    return SubjectService.get_subjects(db)