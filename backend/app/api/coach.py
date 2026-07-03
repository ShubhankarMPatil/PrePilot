from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.services.coaching_service import (
    CoachingService,
)

router = APIRouter(
    prefix="/coach",
    tags=["Coach"],
)


@router.get(
    "/test/{test_id}",
)
def get_coaching(
    test_id: int,
    db: Session = Depends(get_db),
):

    return CoachingService.generate_insight(
        db=db,
        test_id=test_id,
    )