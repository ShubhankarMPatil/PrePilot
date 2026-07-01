from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.services.result_service import (
    ResultService
)

from app.schemas.result import (
    ResultResponse
)

router = APIRouter(
    prefix="/results",
    tags=["Results"]
)

@router.get(
    "/test/{test_id}",
    response_model=ResultResponse
)
def get_results(
    test_id: int,
    db: Session = Depends(get_db)
):

    return (
        ResultService
        .get_test_results(
            db,
            test_id
        )
    )