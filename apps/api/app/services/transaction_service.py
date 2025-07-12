from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.transaction import Transaction


def get_transactions_by_user_id(session: Session, user_id: str):
    """
    ユーザーIDを指定して、そのユーザーの支出を取得する
    """
    transactions = (
        session.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .order_by(desc(Transaction.date), desc(Transaction.created_at))
        .all()
    )

    return transactions


def post_transaction(
    session: Session,
    create_transaction_data: dict,
):
    """
    支出を作成する
    """
    transaction = Transaction(**create_transaction_data)
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


def delete_transaction_by_user_id_and_transaction_id(
    session: Session,
    user_id: str,
    transaction_id: int,
):
    """
    ユーザーIDと支出IDを指定して、その支出を削除する
    """
    transaction = (
        session.query(Transaction)
        .filter(
            Transaction.user_id == user_id,
            Transaction.id == transaction_id
        )
        .first()
    )

    if not transaction:
        return False

    session.delete(transaction)
    session.commit()
    return True


def put_transaction(
    session: Session,
    user_id: str,
    transaction_id: int,
    update_data: dict,
):
    """
    ユーザーIDと支出IDを指定して、その支出を更新する
    """
    transaction = (
        session.query(Transaction)
        .filter(
            Transaction.user_id == user_id,
            Transaction.id == transaction_id
        )
        .first()
    )

    if not transaction:
        return False

    for key, value in update_data.items():
        setattr(transaction, key, value)

    session.commit()
    session.refresh(transaction)
    return transaction
