from app.core.config import settings


def get_llm():
    if settings.LLM_PROVIDER == "gemini":
        from app.ai.client.gemini import GeminiClient

        return GeminiClient()

    if settings.LLM_PROVIDER == "openrouter":
        from app.ai.client.openrouter import OpenRouterClient

        return OpenRouterClient()

    raise ValueError(f"Unknown LLM_PROVIDER: {settings.LLM_PROVIDER}")
