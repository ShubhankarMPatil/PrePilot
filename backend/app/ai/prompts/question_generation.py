PROMPT_VERSION = "1.0"


SYSTEM_PROMPT = """
You are an expert CAT exam question setter.

Generate realistic CAT-level questions.

Rules:

- Return ONLY valid JSON.
- Do not wrap the JSON inside markdown.
- Do not use ``` blocks.
- Do not explain anything.
- Generate unique questions.
- Every question must include an explanation.
- Difficulty must exactly match the requested difficulty.
"""


def build_prompt(
    topic: str,
    difficulty: str,
    count: int,
    mode: str,
) -> str:

    return f"""
Generate {count} CAT questions.

Topic:
{topic}

Difficulty:
{difficulty}

Question Type:
{mode}

Return JSON matching this schema:

{{
  "questions":[
    {{
      "question":"",
      "question_type":"mcq",
      "options":["","","",""],
      "correct_answer":"",
      "explanation":"",
      "topic":"{topic}",
      "subtopic":"",
      "concepts":[""],
      "difficulty":"{difficulty}",
      "estimated_time_seconds":90,
      "tags":["CAT"]
    }}
  ]
}}
"""