from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.db import get_db
from app.schemas.transaction import (
    CreateTransactionRequest,
    TransactionResponse,
    UpdateTransactionRequest,
)
from app.services.transaction_service import (
    delete_transaction_by_user_id_and_transaction_id,
    get_transactions_by_user_id,
    post_transaction,
    put_transaction,
)


router = APIRouter()


@router.get(
    "/transactions",
    tags=["transactions"],
    response_model=List[TransactionResponse],
)
def get_transaction(
    user: str = Depends(get_current_user), db: Session = Depends(get_db)
):
    """
    ユーザーの支出を取得する
    """
    user_id = user
    transaction = get_transactions_by_user_id(db, user_id)

    return transaction


@router.post(
    "/transactions",
    tags=["transactions"],
    response_model=TransactionResponse,
)
def create_transaction(
    transaction_data: CreateTransactionRequest,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    ユーザーの支出を作成する
    """
    data = transaction_data.model_dump()
    data["user_id"] = user_id

    transaction = post_transaction(db, data)
    return transaction


@router.delete(
    "/transactions/{transaction_id}",
    tags=["transactions"],
    response_model=bool,
)
def delete_transaction(
    transaction_id: int,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    ユーザーの支出を削除する
    """
    result = delete_transaction_by_user_id_and_transaction_id(
        db, user_id, transaction_id
    )
    return result


@router.put(
    "/transactions/{transaction_id}",
    tags=["transactions"],
    response_model=TransactionResponse,
)
def update_transaction(
    transaction_id: int,
    transaction_data: UpdateTransactionRequest,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    ユーザーの支出を更新する
    """
    data = transaction_data.model_dump()
    data["user_id"] = user_id

    transaction = put_transaction(db, user_id, transaction_id, data)
    return transaction
