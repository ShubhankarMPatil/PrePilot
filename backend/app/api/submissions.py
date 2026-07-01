from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.submit_test import (
    SubmitTestRequest
)

from app.schemas.test_result import (
    TestResultResponse
)

from app.services.submission_service import (
    SubmissionService
)

router = APIRouter(
    tags=["Submissions"]
)

@router.post(
    "/tests/{test_id}/submit",
    response_model=
        TestResultResponse
)
def submit_test(
    test_id: int,
    payload: SubmitTestRequest,
    db: Session = Depends(get_db)
):

    print("Received submit_test request", {
        "test_id": test_id,
        "payload": payload.dict(),
    })

    try:
        result = (
            SubmissionService
            .submit_test(
                db,
                test_id,
                payload
            )
        )
        print("submit_test result", result)
        return result

    except ValueError as e:

        print("submit_test error", str(e))
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )