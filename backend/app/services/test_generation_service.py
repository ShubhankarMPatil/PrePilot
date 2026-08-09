import time

from app.ai.generation.question_generator import (
    QuestionGenerator,
)

from app.ai.prompts.question_generation import (
    PROMPT_VERSION,
)

from app.core.config import settings

from app.ai.validation.question_validator import (
    QuestionValidator,
)

from app.models.ai_generation import (
    AIGeneration,
)

from app.models.question import Question
from app.models.test import Test


class TestGenerationService:

    @staticmethod
    def generate_test(
        db,
        topic,
        difficulty,
        count,
        mode,
    ):

        start = time.perf_counter()

        try:

            generated = QuestionGenerator().generate(
                topic=topic,
                difficulty=difficulty,
                count=count,
                mode=mode,
            )

            duration = int(
                (time.perf_counter() - start)
                * 1000
            )

            QuestionValidator.validate(generated)

            test = Test(
                # TODO:
                # Replace with authenticated user
                user_id=1,

                title=f"{topic} Practice",

                topic=topic,

                difficulty=difficulty,

                total_questions=len(
                    generated.questions
                ),

                status="ready",

                total_time_seconds=0,

                submitted=False,
            )

            db.add(test)

            db.flush()

            for index, item in enumerate(
                generated.questions,
                start=1,
            ):

                question = Question(

                    test_id=test.id,

                    question_text=item.question,

                    question_type=item.question_type,

                    option_a=item.options[0]
                    if len(item.options) > 0
                    else None,

                    option_b=item.options[1]
                    if len(item.options) > 1
                    else None,

                    option_c=item.options[2]
                    if len(item.options) > 2
                    else None,

                    option_d=item.options[3]
                    if len(item.options) > 3
                    else None,

                    correct_answer=item.correct_answer,

                    explanation=item.explanation,

                    question_order=index,

                    topic=item.topic,

                    subtopic=item.subtopic,

                    difficulty=item.difficulty,

                    estimated_time_seconds=item.estimated_time_seconds,

                    tags=",".join(
                        sorted(item.tags)
                    ),
                )

                db.add(question)

            generation = AIGeneration(

                feature="question_generation",

                provider=settings.LLM_PROVIDER,
                
                model=settings.active_llm_model,

                prompt_version=PROMPT_VERSION,

                duration_ms=duration,

                success=True,

                error=None,
            )

            db.add(generation)

            db.commit()

            return test.id

        except Exception as e:

            db.rollback()

            duration = int(
                (time.perf_counter() - start)
                * 1000
            )

            generation = AIGeneration(

                feature="question_generation",

                provider=settings.LLM_PROVIDER,

                model=settings.active_llm_model,

                prompt_version=PROMPT_VERSION,

                duration_ms=duration,

                success=False,

                error=str(e),
            )

            db.add(generation)

            db.commit()

            raise