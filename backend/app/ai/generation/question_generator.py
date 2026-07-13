from app.ai.client.openrouter import OpenRouterClient

from app.ai.models import GeneratedQuestionSet

from app.ai.prompts.question_generation import build_prompt

from app.ai.prompts.question_generation import SYSTEM_PROMPT


class QuestionGenerator:

    def __init__(self):

        self.client = OpenRouterClient()

    def generate(
        self,
        topic: str,
        difficulty: str,
        count: int,
        mode: str,
    ):

        prompt = build_prompt(
            topic,
            difficulty,
            count,
            mode,
        )

        return self.client.generate(

            system_prompt=SYSTEM_PROMPT,

            user_prompt=prompt,

            response_model=GeneratedQuestionSet,
    )