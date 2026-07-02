from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.services.test_service import TestService

from app.schemas.test import TestResponse

from app.schemas.generate_test import (
    GenerateTestRequest,
    GenerateTestResponse,
)

from app.services.test_generation_service import (
    TestGenerationService,
)

from app.schemas.submit_test import (
    SubmitTestRequest,
)

from app.services.evaluation_service import (
    EvaluationService,
)

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
    "/generate",
    response_model=GenerateTestResponse,
)
def generate_test(
    payload: GenerateTestRequest,
    db: Session = Depends(get_db),
):

    test_id = TestGenerationService.generate_test(
        db=db,
        topic=payload.topic,
        difficulty=payload.difficulty,
        count=payload.count,
        mode=payload.mode,
    )

    return GenerateTestResponse(
        testId=test_id,
        status="generated",
    )

@router.post(
    "/{test_id}/submit",
)
def submit_test(
    test_id: int,
    payload: SubmitTestRequest,
    db: Session = Depends(get_db),
):

    return EvaluationService.evaluate(

        db=db,

        test_id=test_id,

        answers=payload.answers,
    )