import time
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from app.core.db import engine, Base
from app.models import expense  # 必要なモデルを全てインポート

def wait_for_db(timeout=60, interval=5):
    """
    DB 接続が可能になるまで待機する関数。
    timeout 秒以内に接続できなければ例外を投げる。
    """
    start_time = time.time()
    while True:
        try:
            # エンジンを使って接続を試みる
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            print("データベースに接続できました。")
            break
        except OperationalError:
            elapsed = time.time() - start_time
            if elapsed >= timeout:
                raise Exception("データベースへの接続がタイムアウトしました。")
            print("データベースに接続できません。{}秒待機します...".format(interval))
            time.sleep(interval)

def create_tables():
    """定義済みのモデルに基づいてテーブルを作成する。"""
    Base.metadata.create_all(bind=engine)
    print("テーブルの作成が完了しました。")

if __name__ == "__main__":
    wait_for_db()
    create_tables()
