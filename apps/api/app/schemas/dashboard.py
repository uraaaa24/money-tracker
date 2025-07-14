from pydantic import BaseModel
from typing import List
from datetime import date


class MonthlySummary(BaseModel):
    total_income: float
    total_expense: float
    net_amount: float
    transaction_count: int


class CategorySummary(BaseModel):
    category_name: str
    amount: float
    percentage: float


class RecentTransaction(BaseModel):
    id: int
    type: str
    amount: float
    category_name: str
    date: date
    memo: str


class DashboardSummaryResponse(BaseModel):
    current_month: MonthlySummary
    previous_month: MonthlySummary
    top_expense_categories: List[CategorySummary]
    recent_transactions: List[RecentTransaction]