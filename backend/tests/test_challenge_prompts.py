import json
import unittest

from app.ai.challenge.prompts import build_prompt


class ChallengePromptTests(unittest.TestCase):
    def test_build_prompt_accepts_plain_dict_context(self):
        context = {
            "question": "What is 2 + 2?",
            "options": ["3", "4", "5", "6"],
            "stored_answer": "4",
            "student_answer": "4",
        }

        prompt = build_prompt(context)

        payload = json.loads(prompt)

        self.assertEqual(payload["question"], "What is 2 + 2?")
        self.assertEqual(payload["student_answer"], "4")


if __name__ == "__main__":
    unittest.main()
