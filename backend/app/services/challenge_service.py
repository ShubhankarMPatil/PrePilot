from app.ai.challenge.challenge_agent import (
    ChallengeAgent,
)

from app.models.question import Question

from app.models.question_attempt import (
    QuestionAttempt,
)

from app.models.question_challenge import (
    QuestionChallenge,
)

from app.services.score_service import (
    ScoreService,
)

class ChallengeService:

    @staticmethod
    def challenge(
        db,
        question_id,
        student_answer,
    ):

        question = (
            db.query(Question)
            .filter(
                Question.id == question_id
            )
            .first()
        )

        if question is None:

            raise ValueError(
                "Question not found."
            )

        attempt = (
            db.query(QuestionAttempt)
            .filter(
                QuestionAttempt.question_id == question_id,
                QuestionAttempt.test_id == question.test_id,
            )
            .first()
        )

        if attempt is None:
            return {
                "questionValid": True,
                "generatorAnswerValid": True,
                "studentCorrect": False,
                "derivedAnswer": question.correct_answer,
                "matchedOption": None,
                "confidence": 0.0,
                "reasoning": "No prior attempt was found for this question.",
                "updatedScore": None,
            }

        context = {

            "question": question.question_text,

            "options": [

                question.option_a,

                question.option_b,

                question.option_c,

                question.option_d,
            ],

            "stored_answer": question.correct_answer,

            "student_answer": student_answer,
        }

        verdict = ChallengeAgent().solve(
            context
        )

        challenge = QuestionChallenge(

            question_id=question.id,

            test_id=question.test_id,

            student_answer=student_answer,

            derived_answer=verdict.derived_answer,

            verdict=(
                "accepted"
                if verdict.student_correct
                else "rejected"
            ),

            reasoning=verdict.reasoning,

            confidence=verdict.confidence,
        )

        existing = (

            db.query(
                QuestionChallenge
            )

            .filter(
                QuestionChallenge.question_id
                == question_id
            )

            .first()

        )

        db.add(challenge)

        if existing:

            return {

                "questionValid": True,

                "generatorAnswerValid": True,

                "studentCorrect": (
                    existing.verdict == "accepted"
                ),

                "derivedAnswer": existing.derived_answer,

                "matchedOption": None,

                "confidence": existing.confidence,

                "reasoning": existing.reasoning,

                "updatedScore": None,
            }


        score_updated = False

        #
        # Fix generator mistakes
        #

        if (

            not verdict.question_valid

        ):

            attempt.correct_answer = (
                verdict.derived_answer
            )

            attempt.is_correct = (
                verdict.student_correct
            )

            if not verdict.generator_answer_valid:

                question.correct_answer = (
                    verdict.derived_answer
                )

            score_updated = True

        db.commit()

        updated_score = None

        if score_updated:

            updated_score = (
                ScoreService.recompute_test_score(

                    db,

                    question.test_id,
                )
            )

        return {

            "questionValid":
                verdict.question_valid,

            "generatorAnswerValid":
                verdict.generator_answer_valid,

            "studentCorrect":
                verdict.student_correct,

            "derivedAnswer":
                verdict.derived_answer,

            "matchedOption":
                verdict.matched_option,

            "confidence":
                verdict.confidence,

            "reasoning":
                verdict.reasoning,

            "updatedScore":
                updated_score,
        }