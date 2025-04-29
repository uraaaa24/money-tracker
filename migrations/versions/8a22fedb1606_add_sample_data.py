"""add sample data

Revision ID: 8a22fedb1606
Revises: 6a37b5e31a17
Create Date: 2025-04-13 01:31:19.306430

"""

from typing import Sequence, Union
import datetime

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "8a22fedb1606"
down_revision: Union[str, None] = "6a37b5e31a17"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema: サンプルデータを追加する"""

    # Alembic で bulk_insert を利用するためにテーブルオブジェクトを定義
    expenses_table = sa.table(
        "expenses",
        sa.column("id", sa.Integer),
        sa.column("user_id", sa.String),
        sa.column("amount", sa.Float),
        # category カラムは Enum 型ですが、ここでは文字列を直接挿入します。
        # ※本来の Enum 定義に合わせた文字列（例："FOOD", "TRAVEL", "ENTERTAINMENT" 等）を指定してください。
        sa.column("category", sa.String),
        sa.column("note", sa.String),
        sa.column("date", sa.Date),
        sa.column("created_at", sa.DateTime(timezone=True)),
        sa.column("updated_at", sa.DateTime(timezone=True)),
    )

    # サンプルデータを bulk_insert により挿入
    op.bulk_insert(
        expenses_table,
        [
            {
                # 自動採番の場合は id は指定しなくてもよいです
                "user_id": "test_user_1",
                "amount": 15.50,
                "category": "food",  # CategoryType の値に合わせる
                "note": "Lunch at restaurant",
                "date": datetime.date(2025, 4, 12),
                "created_at": datetime.datetime(2025, 4, 12, 12, 0, 0),
                "updated_at": datetime.datetime(2025, 4, 12, 12, 0, 0),
            },
            {
                "user_id": "test_user_1",
                "amount": 40.00,
                "category": "transport",
                "note": "Train ticket",
                "date": datetime.date(2025, 4, 11),
                "created_at": datetime.datetime(2025, 4, 11, 9, 30, 0),
                "updated_at": datetime.datetime(2025, 4, 11, 9, 30, 0),
            },
            {
                "user_id": "test_user_2",
                "amount": 60.00,
                "category": "shopping",
                "note": "Movie tickets",
                "date": datetime.date(2025, 4, 10),
                "created_at": datetime.datetime(2025, 4, 10, 20, 15, 0),
                "updated_at": datetime.datetime(2025, 4, 10, 20, 15, 0),
            },
        ],
    )


def downgrade() -> None:
    """Downgrade schema: サンプルデータを削除する"""

    # サンプルデータを user_id と category によって削除する例
    op.execute(
        sa.text(
            """
            DELETE FROM expenses
            WHERE (user_id = 'test_user_1' AND category IN ('food', 'transport'))
               OR (user_id = 'test_user_2' AND category = 'shopping')
            """
        )
    )
