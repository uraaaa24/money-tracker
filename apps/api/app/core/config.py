import os
from dotenv import load_dotenv


load_dotenv()


class Settings:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

    CLERK_ISSUER = os.getenv("CLERK_ISSUER")
    CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")
    CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

    DATABASE_URL = os.getenv("DATABASE_URL")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() in ["true", "1", "yes"]


settings = Settings()
