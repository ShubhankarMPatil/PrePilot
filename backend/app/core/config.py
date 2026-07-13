from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str = "sqlite:///./prepilot.db"

    OPENROUTER_API_KEY: str

    OPENROUTER_MODEL: str

    class Config:
        env_file = ".env",
        extra = "ignore"

    CHALLENGE_MODE: str


settings = Settings()