from app.ai.challenge.models import (
    ChallengeVerdict,
)

from app.ai.challenge.prompts import (
    CHALLENGE_SYSTEM_PROMPT,
    build_prompt,
)

# from app.ai.client.openrouter import (
#     OpenRouterClient,
# )

from app.ai.client.factory import get_llm

from app.core.config import settings


class SingleCallStrategy:

    def __init__(self):

        self.client = get_llm()

    def solve(
        self,
        context,
    ):

        return self.client.generate(

            system_prompt=CHALLENGE_SYSTEM_PROMPT,

            user_prompt=build_prompt(
                context,
            ),

            response_model=ChallengeVerdict,

            temperature=0.1,
        )