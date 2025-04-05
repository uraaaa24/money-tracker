from typing import Optional
from pydantic import BaseModel, Field
from datetime import date as Date, datetime

from app.schemas.category import CategoryType


class ExpenseResponse(BaseModel):
    id: int = Field(..., description="支出の一意なID")
    user_id: int = Field(..., description="Clerkユーザーの内部ID")
    amount: float = Field(..., gt=0, description="支出の金額（円）")
    category: CategoryType = Field(
        ..., description="支出のカテゴリ（例: food, shopping）"
    )
    note: Optional[str] = Field(None, description="任意のメモや説明")
    date: Date = Field(..., description="支出が発生した日付")
    created_at: datetime = Field(..., description="レコード作成日時")
    updated_at: datetime = Field(..., description="レコード最終更新日時")
