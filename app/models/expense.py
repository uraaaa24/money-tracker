from app.core.db import Base
from sqlalchemy import Column, Integer, Float, String, Date, DateTime, Enum
from sqlalchemy.sql import func
from app.schemas.expense import CategoryType


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    amount = Column(Float, nullable=False)
    category = Column(Enum(CategoryType), nullable=False)
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
