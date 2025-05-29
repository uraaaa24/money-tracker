from pydantic import BaseModel, Field

from app.common.enums.transaction_type import TransactionType


class Category(BaseModel):
    id: int = Field(..., description="カテゴリの一意なID")
    user_id: str | None = Field(None, description="Clerkユーザーの内部ID")
    name: str = Field(..., description="カテゴリ名")
    type: TransactionType = Field(..., description="支出の種類")

    class Config:
        orm_mode = True


class CreateCategoryRequest(BaseModel):
    user_id: str = Field(..., description="Clerkユーザーの内部ID")
    name: str = Field(..., description="カテゴリ名")
    type: TransactionType = Field(..., description="支出の種類")


class GetCategoryResponse(Category):
    pass
