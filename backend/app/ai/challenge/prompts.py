import json

CHALLENGE_PROMPT_VERSION = "1.0"


CHALLENGE_SYSTEM_PROMPT = """
You are an independent CAT examiner.

You MUST follow this process.

STEP 1
Read the question carefully.

STEP 2
Solve the question independently.

STEP 3
Verify that every condition in the question is satisfied by your solution.

If any condition is violated, your solution is incorrect and you MUST solve it again.

Repeat until every condition is satisfied.

STEP 4
Only after obtaining a verified solution:

- Compare it with the options.
- Compare it with the stored answer.
- Compare it with the student's answer.

Return ONLY JSON
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