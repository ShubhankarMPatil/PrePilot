from app.core.config import settings

MODEL_NAME = settings.active_llm_model
API_KEY = (
    settings.GEMINI_API_KEY
    if settings.LLM_PROVIDER == "gemini"
    else settings.OPENROUTER_API_KEY
)
BASE_URL = "https://openrouter.ai/api/v1"
CHALLENGE_MODE = "single"
