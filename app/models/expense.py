from app.core.db import Base
from enum import StrEnum
from sqlalchemy import Column, Integer, Float, String, Date, DateTime, Enum as SAEnum
from sqlalchemy.sql import func


class CategoryType(StrEnum):
    food = "food"
    transportation = "transportation"
    entertainment = "entertainment"
    utilities = "utilities"
    health = "health"
    education = "education"


class TransactionType(StrEnum):
    expense = "expense"
    income = "income"


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    name = Column(String, nullable=True)
    type = Column(
        SAEnum(TransactionType),
        nullable=False,
        default=TransactionType.expense.value,
    )
    amount = Column(Float, nullable=False)
    category = Column(SAEnum(CategoryType), nullable=False)
    note = Column(String, nullable=True)
    date = Column(Date, nullable=False)
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
