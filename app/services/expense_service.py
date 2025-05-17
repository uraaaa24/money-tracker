from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import desc, select

from app.models.expense import Expense


def get_expenses_by_user_id(session: AsyncSession, user_id: str):
    """
    ユーザーIDを指定して、そのユーザーの支出を取得する
    """

    stmt = (
        select(Expense)
        .where(Expense.user_id == user_id)
        .order_by(desc(Expense.date), desc(Expense.created_at))
    )

    result = session.execute(stmt)
    expenses = result.scalars().all()

    return expenses


def post_expense(
    session: AsyncSession,
    create_expense_data: dict,
):
    """
    支出を作成する
    """
    expense = Expense(**create_expense_data)
    session.add(expense)
    session.commit()
    session.refresh(expense)
    return expense


def delete_expense_by_user_id_and_expense_id(
    session: AsyncSession,
    user_id: str,
    expense_id: int,
):
    """
    ユーザーIDと支出IDを指定して、その支出を削除する
    """
    stmt = select(Expense).where(Expense.user_id == user_id, Expense.id == expense_id)
    result = session.execute(stmt)
    expense = result.scalars().first()

    if not expense:
        return False

    session.delete(expense)
    session.commit()
    return True


def put_expense(
    session: AsyncSession,
    user_id: str,
    expense_id: int,
    update_data: dict,
):
    """
    ユーザーIDと支出IDを指定して、その支出を更新する
    """
    stmt = select(Expense).where(Expense.user_id == user_id, Expense.id == expense_id)
    result = session.execute(stmt)
    expense = result.scalars().first()

    if not expense:
        return False

    for key, value in update_data.items():
        setattr(expense, key, value)

    session.commit()
    session.refresh(expense)
    return expense
