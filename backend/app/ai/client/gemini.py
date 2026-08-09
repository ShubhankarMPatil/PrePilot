import instructor
from instructor import Mode
from app.core.config import settings


class GeminiClient:
    def __init__(self):
        self.client = instructor.from_provider(
            f"google/{settings.GEMINI_MODEL}",
            api_key=settings.GEMINI_API_KEY,
            mode=Mode.JSON,
        )

    def generate(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        response_model,
        temperature: float = 0.7,
    ):
        return self.client.create(
            response_model=response_model,
            max_tokens=8000,
            temperature=temperature,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )

    def generate_questions(self, user_prompt, response_model, system_prompt):
        return self.generate(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            response_model=response_model,
        )