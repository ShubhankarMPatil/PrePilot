from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.review import ReviewQuestion

from app.services.review_service import (
    ReviewService,
)

router = APIRouter(
    prefix="/review",
    tags=["Review"],
)


@router.get(
    "/test/{test_id}",
    response_model=list[ReviewQuestion],
)
def get_review(
    test_id: int,
    db: Session = Depends(get_db),
):

    return ReviewService.get_review(
        db=db,
        test_id=test_id,
    )