DC   := docker compose
APP  := web 
DB	 := db       
MIG  := migrator 

.PHONY: up down build logs sh revision migrate downgrade test reset-db

# -------- Docker Compose --------
# コンテナ起動
up:
	$(DC) up -d --build

# コンテナ停止
down:
	$(DC) down

# コンテナビルド
build:
	$(DC) build

# dbに接続
connect-db:
	$(DC) exec $(DB) psql -U postgres

# -------- Alembic --------
# 自動差分から新リビジョン作成
revision:
	$(DC) run --rm $(MIG) revision --autogenerate -m "$$(date +'%Y%m%d')_change"

# 最新リビジョンにアップグレード
migrate:
	$(DC) run --rm $(MIG) upgrade head

# 1 つ前にロールバック
downgrade:
	$(DC) run --rm $(MIG) downgrade -1

# DB ボリュームを消して初期化
reset-db:
	$(DC) down -v
	$(DC) up -d db
	$(MAKE) migrate


# -------- pytest --------
test:
	$(DC) run --rm $(APP) pytest -q
