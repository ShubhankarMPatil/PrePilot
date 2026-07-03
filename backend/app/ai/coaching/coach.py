from app.ai.client.openrouter import OpenRouterClient

from app.ai.coaching.models import (
    CoachingInsight,
)

from app.ai.coaching.prompts import (
    SYSTEM_PROMPT,
    build_prompt,
)


class Coach:

    def __init__(self):

        self.client = OpenRouterClient()

    def generate(
        self,
        result,
        attempts,
    ) -> CoachingInsight:

        return self.client.generate(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=build_prompt(
                result,
                attempts,
            ),
            response_model=CoachingInsight,
        )