"""update categories with Japanese-friendly names

Revision ID: update_categories_jp
Revises: a1b502b91aed
Create Date: 2025-01-14 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime, timezone

# revision identifiers
revision = 'update_categories_jp'
down_revision = 'a1b502b91aed'
branch_labels = None
depends_on = None

def upgrade():
    # Create mapping of old category names to new categories
    old_to_new_mapping = {
        'Food': 'Food & Groceries',
        'Transportation': 'Transportation', 
        'entertainment': 'Entertainment & Hobbies',
        'utilities': 'Utilities',
        'health': 'Healthcare',
        'education': 'Education & Learning',
        'Salary': 'Salary & Bonus',
        'Additional income': 'Other Income'
    }
    
    # Insert new categories first
    categories_data = [
        # Income categories
        {'name': 'Salary & Bonus', 'type': 'income'},
        {'name': 'Side Job & Freelance', 'type': 'income'},
        {'name': 'Investment & Returns', 'type': 'income'},
        {'name': 'Pension & Benefits', 'type': 'income'},
        {'name': 'Refunds & Cashback', 'type': 'income'},
        {'name': 'Other Income', 'type': 'income'},
        
        # Expense categories (Fixed costs)
        {'name': 'Housing & Rent', 'type': 'expense'},
        {'name': 'Utilities', 'type': 'expense'},
        {'name': 'Internet & Phone', 'type': 'expense'},
        {'name': 'Insurance', 'type': 'expense'},
        {'name': 'Taxes & Pension', 'type': 'expense'},
        
        # Expense categories (Variable costs)
        {'name': 'Food & Groceries', 'type': 'expense'},
        {'name': 'Transportation', 'type': 'expense'},
        {'name': 'Household Items', 'type': 'expense'},
        {'name': 'Clothing & Beauty', 'type': 'expense'},
        {'name': 'Healthcare', 'type': 'expense'},
        {'name': 'Education & Learning', 'type': 'expense'},
        {'name': 'Entertainment & Hobbies', 'type': 'expense'},
        {'name': 'Social & Dining Out', 'type': 'expense'},
        {'name': 'Childcare', 'type': 'expense'},
        {'name': 'Other Expenses', 'type': 'expense'},
    ]
    
    connection = op.get_bind()
    current_time = datetime.now(timezone.utc)
    
    # Insert new categories and get their IDs (skip if already exists)
    new_category_ids = {}
    for category in categories_data:
        # Check if category already exists
        existing = connection.execute(
            sa.text("SELECT id FROM categories WHERE name = :name AND type = :type"),
            {'name': category['name'], 'type': category['type']}
        ).fetchone()
        
        if existing:
            new_category_ids[category['name']] = existing[0]
        else:
            result = connection.execute(
                sa.text("""
                    INSERT INTO categories (name, type, user_id, created_at, updated_at)
                    VALUES (:name, :type, NULL, :created_at, :updated_at)
                    RETURNING id
                """),
                {
                    'name': category['name'],
                    'type': category['type'],
                    'created_at': current_time,
                    'updated_at': current_time
                }
            )
            new_id = result.fetchone()[0]
            new_category_ids[category['name']] = new_id
    
    # Update existing transactions to use new category IDs
    for old_name, new_name in old_to_new_mapping.items():
        if new_name in new_category_ids:
            connection.execute(
                sa.text("""
                    UPDATE transactions 
                    SET category_id = :new_id 
                    WHERE category_id IN (
                        SELECT id FROM categories WHERE name = :old_name
                    )
                """),
                {
                    'new_id': new_category_ids[new_name],
                    'old_name': old_name
                }
            )
    
    # For any remaining unmapped transactions, use 'Other Expenses' for expenses and 'Other Income' for income
    connection.execute(
        sa.text("""
            UPDATE transactions 
            SET category_id = :other_expenses_id
            WHERE type = 'expense' AND category_id NOT IN (
                SELECT id FROM categories WHERE name IN :new_names
            )
        """),
        {
            'other_expenses_id': new_category_ids['Other Expenses'],
            'new_names': tuple(new_category_ids.keys())
        }
    )
    
    connection.execute(
        sa.text("""
            UPDATE transactions 
            SET category_id = :other_income_id
            WHERE type = 'income' AND category_id NOT IN (
                SELECT id FROM categories WHERE name IN :new_names
            )
        """),
        {
            'other_income_id': new_category_ids['Other Income'],
            'new_names': tuple(new_category_ids.keys())
        }
    )
    
    # Finally, delete old categories that are no longer used
    connection.execute(
        sa.text("""
            DELETE FROM categories 
            WHERE id NOT IN (
                SELECT DISTINCT category_id FROM transactions
            )
        """)
    )

def downgrade():
    # ダウングレード時は元に戻す（簡易版）
    op.execute("DELETE FROM categories")
    
    # 元のカテゴリを復元
    old_categories = [
        {'name': 'Salary', 'type': 'income'},
        {'name': 'Additional income', 'type': 'income'},
        {'name': 'Food', 'type': 'expense'},
        {'name': 'Transportation', 'type': 'expense'},
        {'name': 'entertainment', 'type': 'expense'},
        {'name': 'utilities', 'type': 'expense'},
        {'name': 'health', 'type': 'expense'},
        {'name': 'education', 'type': 'expense'},
    ]
    
    connection = op.get_bind()
    current_time = datetime.now(timezone.utc)
    
    for category in old_categories:
        connection.execute(
            sa.text("""
                INSERT INTO categories (name, type, user_id, created_at, updated_at)
                VALUES (:name, :type, NULL, :created_at, :updated_at)
            """),
            {
                'name': category['name'],
                'type': category['type'],
                'created_at': current_time,
                'updated_at': current_time
            }
        )