from app.models.question_attempt import (
    QuestionAttempt,
)

from app.models.test import Test


class ScoreService:

    @staticmethod
    def recompute_test_score(
        db,
        test_id,
    ):

        attempts = (

            db.query(
                QuestionAttempt
            )

            .filter(
                QuestionAttempt.test_id == test_id
            )

            .all()
        )

        score = sum(

            1

            for attempt in attempts

            if attempt.is_correct

        )

        test = (

            db.query(Test)

            .filter(
                Test.id == test_id
            )

            .first()
        )

        test.score = score

        db.commit()

        return score
