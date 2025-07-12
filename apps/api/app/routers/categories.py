from typing import List
from fastapi import APIRouter, Depends
from requests import Session

from app.core.auth import get_current_user
from app.core.db import get_db
from app.schemas.category import GetCategoryResponse
from app.services.category_service import get_all_categories


router = APIRouter()


@router.get(
    "/categories",
    tags=["categories"],
    response_model=List[GetCategoryResponse],
)
def get_categories(
    user: str = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    ユーザーのカテゴリを取得する
    """
    user_id = user
    categories = get_all_categories(db, user_id)

    return categories
