from enum import StrEnum
from pydantic import BaseModel, Field
from datetime import date as Date, datetime

from app.common.enums import TransactionType


class CategoryType(StrEnum):
    food = "food"
    transportation = "transportation"
    entertainment = "entertainment"
    utilities = "utilities"
    health = "health"
    education = "education"


class TransactionResponse(BaseModel):
    id: int = Field(..., description="支出の一意なID")
    user_id: str = Field(..., description="Clerkユーザーの内部ID")
    memo: str | None = Field(None, description="支出のメモ")
    type: TransactionType = Field(
        TransactionType.expense.value, description="支出の種類（デフォルトはexpense）"
    )
    amount: float = Field(..., gt=0, description="支出の金額（円）")
    category: CategoryType = Field(
        ..., description="支出のカテゴリ（例: food, shopping）"
    )
    date: Date = Field(..., description="支出が発生した日付")
    created_at: datetime = Field(..., description="レコード作成日時")
    updated_at: datetime = Field(..., description="レコード最終更新日時")


class CreateTransactionRequest(BaseModel):
    user_id: str | None = Field(None, exclude=True)
    memo: str | None = Field(None, description="支出のメモ")
    type: TransactionType = Field(
        TransactionType.expense, description="支出の種類（デフォルトはexpense）"
    )
    amount: float = Field(..., gt=0, description="支出の金額（円）")
    category: CategoryType = Field(
        ..., description="支出のカテゴリ（例: food, shopping）"
    )
    date: Date = Field(..., description="支出が発生した日付")


class UpdateTransactionRequest(CreateTransactionRequest):
    pass
