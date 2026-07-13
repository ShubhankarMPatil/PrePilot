import instructor

from openai import OpenAI

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

    def generate(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        response_model,
        temperature: float = 0.7,
    ):

        return self.client.chat.completions.create(

            model=OPENROUTER_MODEL,

            response_model=response_model,

            max_tokens=2500,

            temperature=0.5,

            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
        )

    def generate_questions(
        self,
        user_prompt,
        response_model,
        system_prompt,
    ):

        return self.generate(
            system_prompt=system_prompt,
            user_prompt=user_prompt,
            response_model=response_model,
        )