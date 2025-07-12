FROM python:3.11-slim

WORKDIR /app

# 必要なパッケージをインストール
RUN pip install pipenv

# Pipenvファイルをコピー
COPY Pipfile Pipfile.lock ./

# 依存関係をインストール
RUN pipenv install --system --deploy

# アプリケーションファイルをコピー
COPY . .

# サーバ起動
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
