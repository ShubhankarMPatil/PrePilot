import json

from app.ai.coaching.coach import Coach
from app.ai.coaching.models import CoachingInsight

from app.models.ai_insight import AIInsight
from app.models.question_attempt import QuestionAttempt

from app.services.result_service import ResultService
from app.models.test import Test

class CoachingService:

    @staticmethod
    def generate_insight(
        db,
        test_id,
    ):

        test = (
            db.query(Test)
            .filter(Test.id == test_id)
            .first()
        )

        existing = (
            db.query(AIInsight)
            .filter(AIInsight.test_id == test_id)
            .first()
        )

        # ----------------------------
        # Return cached insight
        # ----------------------------
        if existing:

            return CoachingInsight(
                summary=existing.summary,
                strengths=json.loads(existing.strengths),
                weaknesses=json.loads(existing.weaknesses),
                recommendations=json.loads(existing.recommendations),
            )

        # ----------------------------
        # Generate new insight
        # ----------------------------

        result = ResultService.get_test_results(
            db,
            test_id,
        )

        attempts = (
            db.query(QuestionAttempt)
            .filter(
                QuestionAttempt.test_id == test_id
            )
            .all()
        )

        attempt_payload = []

        for attempt in attempts:

            attempt_payload.append({

                "questionId": attempt.question_id,

                "userAnswer": attempt.user_answer,

                "correctAnswer": attempt.correct_answer,

                "correct": attempt.is_correct,

                "timeTaken": attempt.time_taken_seconds,
            })

        context = {

            "topic": test.topic,

            "difficulty": test.difficulty,

            "questionCount": test.total_questions,

            "result": result,

            "attempts": attempt_payload,
        }

        coach = Coach()

        insight = coach.generate(
            context
        )

        record = AIInsight(

            # TODO: Replace with authenticated user
            user_id=1,

            test_id=test_id,

            summary=insight.summary,

            strengths=json.dumps(
                insight.strengths
            ),

            weaknesses=json.dumps(
                insight.weaknesses
            ),

            recommendations=json.dumps(
                insight.recommendations
            ),
        )

        db.add(record)

        db.commit()

        return insight