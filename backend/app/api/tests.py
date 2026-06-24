from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.services.test_service import TestService
from app.services.submission_service import SubmissionService

from app.schemas.test import TestResponse
from app.schemas.submit_test import SubmitTestRequest
from app.schemas.test_result import TestResultResponse

router = APIRouter(
    prefix="/tests",
    tags=["Tests"]
)

@router.get(
    "/",
    response_model=list[TestResponse]
)
def get_tests(
    db: Session = Depends(get_db)
):

    return TestService.get_tests(db)

@router.get(
    "/{test_id}",
    response_model=TestResponse
)
def get_test(
    test_id: int,
    db: Session = Depends(get_db)
):

    return TestService.get_test(
        db,
        test_id
    )

@router.post(
    "/{test_id}/submit",
    response_model=TestResultResponse
)
def submit_test(
    test_id: int,
    payload: SubmitTestRequest,
    db: Session = Depends(get_db)
):
    return SubmissionService.submit_test(
        db,
        test_id,
        payload
    )