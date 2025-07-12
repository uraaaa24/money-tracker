from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Database
    DATABASE_URL: str

    # Clerk Authentication
    CLERK_ISSUER: str
    CLERK_JWKS_URL: str
    CLERK_SECRET_KEY: str

    # Application
    DEBUG: bool = False

    # Legacy Supabase settings (unused but may exist in env)
    SUPABASE_URL: str | None = None
    SUPABASE_SERVICE_KEY: str | None = None


settings = Settings()
