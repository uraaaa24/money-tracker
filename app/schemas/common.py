from typing import Generic, TypeVar
from pydantic import BaseModel, Field
from typing import List

T = TypeVar("T")


class ListResponse(BaseModel, Generic[T]):
    """Generic response model for list endpoints."""

    items: List[T] = Field(..., description="取得したデータのリスト")
