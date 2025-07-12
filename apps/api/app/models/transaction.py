from app.common.enums import TransactionType
from app.core.db import Base
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    Float,
    String,
    Date,
    DateTime,
    Enum as SAEnum,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    memo = Column(String, nullable=True)
    type = Column(
        SAEnum(TransactionType), nullable=False, default=TransactionType.expense.value
    )
    amount = Column(Float, nullable=False)
    category_id = Column(
        Integer, ForeignKey("categories.id"), nullable=False, index=True
    )
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

    category = relationship("Category", back_populates="transactions")
