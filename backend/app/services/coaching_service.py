import json

from app.ai.coaching.coach import Coach

from app.models.ai_insight import AIInsight
from app.models.question_attempt import QuestionAttempt

from app.services.result_service import ResultService
from app.ai.coaching.models import CoachingInsight


class CoachingService:

    @staticmethod
    def generate_insight(
        db,
        test_id,
    ):

        existing = (
            db.query(AIInsight)
            .filter(AIInsight.test_id == test_id)
            .first()
        )

        # ----------------------------
        # Return cached insight
        # ----------------------------
        if existing:

            return {
                "summary": existing.summary,
                "strengths": json.loads(existing.strengths),
                "weaknesses": json.loads(existing.weaknesses),
                "recommendations": json.loads(existing.recommendations),
            }

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

        coach = Coach()

        insight = coach.generate(
            result=result,
            attempts=[
                {
                    "questionId": a.question_id,
                    "correct": a.is_correct,
                    "timeTaken": a.time_taken_seconds,
                }
                for a in attempts
            ],
        )

        record = AIInsight(

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

        return CoachingInsight(
            summary=existing.summary,
            strengths=json.loads(existing.strengths),
            weaknesses=json.loads(existing.weaknesses),
            recommendations=json.loads(existing.recommendations),
        )