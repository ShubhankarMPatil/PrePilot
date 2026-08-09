# from app.ai.client.openrouter import OpenRouterClient

from app.ai.coaching.models import (
    CoachingInsight,
)

from app.ai.coaching.prompts import (
    SYSTEM_PROMPT,
    build_prompt,
)

from app.ai.client.factory import get_llm

class Coach:

    def __init__(self):

        self.client = get_llm()

    def generate(
        self,
        context,
    ) -> CoachingInsight:

        return self.client.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=build_prompt(context),
            response_model=CoachingInsight,
        )