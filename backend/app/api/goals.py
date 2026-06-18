from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.goal import GoalResponse

from app.services.goal_service import GoalService

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)


@router.get(
    "/",
    response_model=GoalResponse
)
def get_goals(
    db: Session = Depends(get_db)
):
    return GoalService.get_goals(db)