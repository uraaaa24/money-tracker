from typing import List
from fastapi import APIRouter, Depends
from requests import Session

from app.core.auth import get_current_user
from app.core.db import get_db
from app.schemas.expense import CreateExpenseRequest, ExpenseResponse
from app.services.expense_service import (
    delete_expense_by_user_id_and_expense_id,
    get_expenses_by_user_id,
    post_expense,
)


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
    expenses = get_expenses_by_user_id(db, user_id)

    return expenses


@router.post(
    "/expenses",
    tags=["expenses"],
    response_model=ExpenseResponse,
)
def create_expense(
    expense_data: CreateExpenseRequest,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    ユーザーの支出を作成する
    """
    data = expense_data.model_dump()
    data["user_id"] = user_id

    expense = post_expense(db, data)
    return expense


@router.delete(
    "/expenses/{expense_id}",
    tags=["expenses"],
    response_model=bool,
)
def delete_expense(
    expense_id: int,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    ユーザーの支出を削除する
    """
    result = delete_expense_by_user_id_and_expense_id(db, user_id, expense_id)
    return result
