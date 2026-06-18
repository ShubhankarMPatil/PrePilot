from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.dashboard import DashboardResponse

from app.services.dashboard_service import DashboardService

router = APIRouter()


@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def get_dashboard(
    db: Session = Depends(get_db)
):

    data = DashboardService.get_dashboard_data(db)

    return DashboardResponse(**data)