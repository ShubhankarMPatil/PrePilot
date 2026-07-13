from abc import ABC
from abc import abstractmethod


class ChallengeStrategy(ABC):

    @abstractmethod
    def solve(
        self,
        context,
    ):
        pass