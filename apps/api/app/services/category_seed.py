from sqlalchemy.orm import Session
from app.models.category import Category

DEFAULT_CATEGORIES = {
    "income": [
        "Salary & Bonus",
        "Side Job & Freelance", 
        "Investment & Returns",
        "Pension & Benefits",
        "Refunds & Cashback",
        "Other Income"
    ],
    "expense": [
        # Fixed costs
        "Housing & Rent",
        "Utilities", 
        "Internet & Phone",
        "Insurance",
        "Taxes & Pension",
        
        # Variable costs
        "Food & Groceries",
        "Transportation",
        "Household Items",
        "Clothing & Beauty",
        "Healthcare",
        "Education & Learning",
        "Entertainment & Hobbies",
        "Social & Dining Out",
        "Childcare",
        "Other Expenses"
    ]
}

def seed_default_categories(db: Session):
    """
    デフォルトカテゴリをシードする
    既存のグローバルカテゴリ（user_id=None）は削除して再作成
    """
    # 既存のグローバルカテゴリを削除
    db.query(Category).filter(Category.user_id.is_(None)).delete()
    
    # 新しいカテゴリを作成
    for category_type, names in DEFAULT_CATEGORIES.items():
        for name in names:
            category = Category(
                name=name,
                type=category_type,
                user_id=None  # グローバルカテゴリ
            )
            db.add(category)
    
    db.commit()
    
def ensure_default_categories_exist(db: Session):
    """
    デフォルトカテゴリが存在しない場合のみシードする
    """
    existing_count = db.query(Category).filter(Category.user_id.is_(None)).count()
    
    if existing_count == 0:
        seed_default_categories(db)
        print(f"Seeded {len(DEFAULT_CATEGORIES['income']) + len(DEFAULT_CATEGORIES['expense'])} default categories")
    else:
        print(f"Default categories already exist ({existing_count} categories)")

def get_category_by_name_and_type(db: Session, name: str, category_type: str) -> Category:
    """
    名前と種別でカテゴリを取得（グローバルカテゴリから）
    """
    return db.query(Category).filter(
        Category.name == name,
        Category.type == category_type,
        Category.user_id.is_(None)
    ).first()