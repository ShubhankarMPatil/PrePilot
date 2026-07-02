import instructor

from openai import OpenAI

from app.ai.models import GeneratedQuestionSet
from app.ai.prompts.question_generation import SYSTEM_PROMPT
from app.ai.settings import (
    OPENROUTER_API_KEY,
    OPENROUTER_MODEL,
)


class OpenRouterClient:

    def __init__(self):

        client = OpenAI(
            api_key=OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
        )

        self.client = instructor.from_openai(client)

    def generate_questions(
        self,
        user_prompt: str,
    ) -> GeneratedQuestionSet:

        response = self.client.chat.completions.create(
            model=OPENROUTER_MODEL,
            response_model=GeneratedQuestionSet,
            max_tokens=2000,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
        )

        return response