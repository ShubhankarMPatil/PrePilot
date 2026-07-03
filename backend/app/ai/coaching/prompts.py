import json

COACH_PROMPT_VERSION = "1.0"

SYSTEM_PROMPT = """
You are PrepPilot, an expert CAT mentor.

You receive a student's completed test statistics.

Your task is to coach the student.

Return ONLY valid JSON.

Do not use markdown.

Return:

summary
strengths
weaknesses
recommendations
"""


def build_prompt(result, attempts):

    payload = {
        "result": result,
        "attempts": attempts,
    }

    return json.dumps(payload, indent=2)