from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.db import get_db, engine
from app.models import expense
from app.api import expenses

# TODO: alembicを使う
expense.Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(expenses.router)


@app.get("/", tags=["health"])
def read_root():
    """
    ヘルスチェック用のエンドポイント
    """
    return {"Hello": "World"}


@app.get("/db-test", tags=["health"])
def test_db(db: Session = Depends(get_db)):
    """
    データベース接続テスト用のエンドポイント
    """
    try:
        db.execute(text("SELECT 1"))
        return {"message": "Database connection successful!"}
    except Exception as e:
        return {"message": f"Database connection failed: {str(e)}"}

@app.get("/auth-test", tags=["health"])
def test_auth(current_user = Depends(get_current_user)):
    """
    認証テスト用のエンドポイント
    """
    return {"message": "Authentication successful!", "user": current_user}
