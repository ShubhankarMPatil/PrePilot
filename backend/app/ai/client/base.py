from abc import ABC
from abc import abstractmethod


class LLMClient(ABC):

    @abstractmethod
    def generate(
        self,
        system_prompt: str,
        user_prompt: str,
        response_model
    ):
        ...