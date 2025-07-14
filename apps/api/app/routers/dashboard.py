from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.db import get_db
from app.schemas.dashboard import DashboardSummaryResponse
from app.services.dashboard_service import get_dashboard_summary

router = APIRouter()


@router.get(
    "/dashboard/summary",
    tags=["dashboard"],
    response_model=DashboardSummaryResponse,
)
def get_dashboard_summary_endpoint(
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    ダッシュボードサマリーを取得する
    """
    summary = get_dashboard_summary(db, user_id)
    return summary