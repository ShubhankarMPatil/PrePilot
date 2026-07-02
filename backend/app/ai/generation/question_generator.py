from app.ai.client.openrouter import OpenRouterClient

from app.ai.prompts.question_generation import build_prompt


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

        return self.client.generate_questions(prompt)