from datetime import date, datetime
from fastapi import APIRouter, Depends
from requests import Session

from app.core.auth import get_current_user
from app.core.db import get_db
from app.schemas.common import ListResponse
from app.schemas.expense import ExpenseResponse
from app.services.expense_service import get_expenses_by_user_id

dummy_data = ExpenseResponse(
    id=1,
    user_id=123,
    amount=1500.50,
    category="food",
    note="ランチ代",
    date=date(2025, 4, 5),
    created_at=datetime(2025, 4, 5, 12, 30, 0),
    updated_at=datetime(2025, 4, 5, 12, 45, 0),
)

router = APIRouter()


@router.get(
    "/expenses",
    tags=["expenses"],
    response_model=ListResponse[ExpenseResponse],
)
async def get_expenses(user: str=Depends(get_current_user),db: Session = Depends(get_db)):
    """
    ユーザーの支出を取得する
    """
    user_id = user
    expenses = get_expenses_by_user_id(db, user_id)

    return {"items": [dummy_data]}
    # return expenses
