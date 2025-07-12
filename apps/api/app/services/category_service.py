from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.category import Category


def get_all_categories(session: Session, user_id: str):
    """
    カテゴリを全て取得する
    """
    categories = (
        session.query(Category)
        .filter((Category.user_id == user_id) | (Category.user_id.is_(None)))
        .order_by(Category.created_at.desc())
        .all()
    )

    return categories
