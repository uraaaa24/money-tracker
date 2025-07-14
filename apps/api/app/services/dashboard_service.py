from sqlalchemy.orm import Session
from sqlalchemy import func, desc, and_
from datetime import date
from typing import List

from app.models.transaction import Transaction
from app.models.category import Category
from app.schemas.dashboard import (
    DashboardSummaryResponse,
    MonthlySummary,
    CategorySummary,
    RecentTransaction,
)


def get_month_start_end(target_date: date) -> tuple[date, date]:
    """指定された日付の月の開始日と終了日を取得"""
    start_date = target_date.replace(day=1)
    if target_date.month == 12:
        end_date = date(target_date.year + 1, 1, 1)
    else:
        end_date = date(target_date.year, target_date.month + 1, 1)
    return start_date, end_date


def get_monthly_summary(session: Session, user_id: str, start_date: date, end_date: date) -> MonthlySummary:
    """月次サマリーを取得"""
    # 収入の合計
    income_total = (
        session.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(
            and_(
                Transaction.user_id == user_id,
                Transaction.type == "income",
                Transaction.date >= start_date,
                Transaction.date < end_date,
            )
        )
        .scalar()
    ) or 0

    # 支出の合計
    expense_total = (
        session.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(
            and_(
                Transaction.user_id == user_id,
                Transaction.type == "expense",
                Transaction.date >= start_date,
                Transaction.date < end_date,
            )
        )
        .scalar()
    ) or 0

    # 取引数
    transaction_count = (
        session.query(func.count(Transaction.id))
        .filter(
            and_(
                Transaction.user_id == user_id,
                Transaction.date >= start_date,
                Transaction.date < end_date,
            )
        )
        .scalar()
    ) or 0

    return MonthlySummary(
        total_income=float(income_total),
        total_expense=float(expense_total),
        net_amount=float(income_total - expense_total),
        transaction_count=transaction_count,
    )


def get_top_expense_categories(session: Session, user_id: str, start_date: date, end_date: date) -> List[CategorySummary]:
    """支出上位カテゴリを取得"""
    results = (
        session.query(
            Category.name,
            func.sum(Transaction.amount).label("total_amount")
        )
        .join(Transaction, Transaction.category_id == Category.id)
        .filter(
            and_(
                Transaction.user_id == user_id,
                Transaction.type == "expense",
                Transaction.date >= start_date,
                Transaction.date < end_date,
            )
        )
        .group_by(Category.id, Category.name)
        .order_by(desc("total_amount"))
        .limit(5)
        .all()
    )

    # 全支出の合計を取得して割合を計算
    total_expense = sum(result.total_amount for result in results)
    
    categories = []
    for result in results:
        percentage = (result.total_amount / total_expense * 100) if total_expense > 0 else 0
        categories.append(
            CategorySummary(
                category_name=result.name,
                amount=float(result.total_amount),
                percentage=round(percentage, 1),
            )
        )

    return categories


def get_recent_transactions(session: Session, user_id: str, limit: int = 5) -> List[RecentTransaction]:
    """最近の取引を取得"""
    results = (
        session.query(Transaction, Category.name)
        .join(Category, Transaction.category_id == Category.id)
        .filter(Transaction.user_id == user_id)
        .order_by(desc(Transaction.date), desc(Transaction.created_at))
        .limit(limit)
        .all()
    )

    transactions = []
    for transaction, category_name in results:
        transactions.append(
            RecentTransaction(
                id=transaction.id,
                type=transaction.type,
                amount=float(transaction.amount),
                category_name=category_name,
                date=transaction.date,
                memo=transaction.memo or "",
            )
        )

    return transactions


def get_dashboard_summary(session: Session, user_id: str) -> DashboardSummaryResponse:
    """ダッシュボードサマリーを取得"""
    today = date.today()
    
    # 今月の範囲
    current_start, current_end = get_month_start_end(today)
    
    # 先月の範囲
    if today.month == 1:
        prev_month_date = date(today.year - 1, 12, 1)
    else:
        prev_month_date = date(today.year, today.month - 1, 1)
    prev_start, prev_end = get_month_start_end(prev_month_date)

    # データを取得
    current_month = get_monthly_summary(session, user_id, current_start, current_end)
    previous_month = get_monthly_summary(session, user_id, prev_start, prev_end)
    top_categories = get_top_expense_categories(session, user_id, current_start, current_end)
    recent_transactions = get_recent_transactions(session, user_id)

    return DashboardSummaryResponse(
        current_month=current_month,
        previous_month=previous_month,
        top_expense_categories=top_categories,
        recent_transactions=recent_transactions,
    )