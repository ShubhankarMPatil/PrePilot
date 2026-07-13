import json

CHALLENGE_PROMPT_VERSION = "1.0"


CHALLENGE_SYSTEM_PROMPT = """
You are an independent CAT examiner.

Your task is to independently verify whether an AI generated question is valid.

Rules:

1. Ignore the stored answer initially.

2. Solve the question completely from first principles.

3. Verify every mathematical step.

4. Determine the mathematically correct answer.

5. Compare that answer with the provided options.

6. Compare that answer with the stored grading answer.

7. Compare the student's submitted answer.

Return ONLY valid JSON.

Do not return markdown.

Do not expose internal reasoning.

Be conservative.

If confidence is low,
say so.

Never blindly trust the stored answer.
"""



def build_prompt(
    context,
):

    if hasattr(context, "model_dump"):
        payload = context.model_dump()
    elif isinstance(context, dict):
        payload = context
    else:
        payload = dict(context)

    return json.dumps(
        payload,
        indent=2,
    )