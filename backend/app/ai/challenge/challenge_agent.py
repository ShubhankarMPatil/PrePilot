from app.ai.challenge.single_call import (
    SingleCallStrategy,
)

from app.ai.challenge.two_call import (
    TwoCallStrategy,
)

from app.core.config import settings


class ChallengeAgent:

    def __init__(self):

        if settings.CHALLENGE_MODE == "two":

            self.strategy = TwoCallStrategy()

        else:

            self.strategy = SingleCallStrategy()

    def solve(
        self,
        context,
    ):

        return self.strategy.solve(
            context
        )