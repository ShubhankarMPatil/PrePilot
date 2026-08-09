from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str = "sqlite:///./prepilot.db"

    LLM_PROVIDER: str = "gemini"  # or "openrouter"

    # Gemini
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.5-flash"

    # OpenRouter (optional when LLM_PROVIDER=gemini)
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = ""

    class Config:
        env_file = ".env",
        extra = "ignore"

    CHALLENGE_MODE: str = "single"

    @property
    def active_llm_model(self) -> str:
        if self.LLM_PROVIDER == "gemini":
            return self.GEMINI_MODEL
        return self.OPENROUTER_MODEL


settings = Settings()