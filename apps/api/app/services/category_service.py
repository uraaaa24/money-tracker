from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.category import Category


def get_all_categories(session: AsyncSession, user_id: str):
    """
    カテゴリを全て取得する
    """
    stmt = (
        select(Category)
        .where((Category.user_id == user_id) | (Category.user_id.is_(None)))
        .order_by(Category.created_at.desc())
    )

    result = session.execute(stmt)
    categories = result.scalars().all()

    return categories
