from pydantic import BaseModel, Field

from app.common.enums.transaction_type import TransactionType


class CategoryBrief(BaseModel):
    """Transaction レスポンスで使う *簡易カテゴリ情報*"""

    id: int = Field(..., description="カテゴリ ID")
    name: str = Field(..., description="カテゴリ名")

    model_config = {"from_attributes": True}


class Category(BaseModel):
    id: int = Field(..., description="カテゴリの一意なID")
    user_id: str | None = Field(None, description="Clerkユーザーの内部ID")
    name: str = Field(..., description="カテゴリ名")
    type: TransactionType = Field(
        ..., description="支出の種類", example=TransactionType.expense.value
    )

    model_config = {"from_attributes": True}


# ------- レスポンス -------


# ------- リクエスト -------
class CreateCategoryRequest(BaseModel):
    user_id: str = Field(..., description="Clerkユーザーの内部ID")
    name: str = Field(..., description="カテゴリ名")
    type: TransactionType = Field(..., description="支出の種類")


class GetCategoryResponse(Category):
    pass
