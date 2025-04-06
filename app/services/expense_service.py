from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import desc, select

from app.models.expense import Expense



async def get_expenses_by_user_id(session: AsyncSession, user_id: int):
  """
    ユーザーIDを指定して、そのユーザーの支出を取得する
  """

  stmt = (
    select(Expense)
    .where(Expense.user_id == user_id)
    .order_by(desc(Expense.date), desc(Expense.created_at))
  )

  result = await session.execute(stmt)
  expenses = result.scalars().all()



  return expenses
