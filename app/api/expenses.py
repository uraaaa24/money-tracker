from datetime import date, datetime
from typing import List
from fastapi import APIRouter, Depends
from requests import Session

from app.core.auth import get_current_user
from app.core.db import get_db
from app.schemas.common import ListResponse
from app.schemas.expense import ExpenseResponse
from app.services.expense_service import get_expenses_by_user_id


router = APIRouter()


@router.get(
    "/expenses",
    tags=["expenses"],
    response_model=List[ExpenseResponse],
)
def get_expenses(user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    ユーザーの支出を取得する
    """
    user_id = user
    expenses = get_expenses_by_user_id(db, "test_user_1")

    return expenses
