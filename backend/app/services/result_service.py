from sqlalchemy import func

from app.models.question_attempt import QuestionAttempt


class ResultService:

    @staticmethod
    def get_test_results(
        db,
        test_id
    ):

        attempts = (
            db.query(QuestionAttempt)
            .filter(
                QuestionAttempt.test_id == test_id
            )
            .all()
        )

        total_questions = len(attempts)

        correct_answers = sum(
            1
            for attempt in attempts
            if attempt.is_correct
        )

        total_time = sum(
            attempt.time_taken_seconds
            for attempt in attempts
        )

        accuracy = 0

        if total_questions > 0:
            accuracy = (
                correct_answers
                /
                total_questions
            ) * 100

        average_time = 0

        if total_questions > 0:
            average_time = (
                total_time
                /
                total_questions
            )

        return {
            "score": correct_answers,
            "totalQuestions": total_questions,
            "accuracy": round(
                accuracy,
                2
            ),
            "averageTime": round(
                average_time,
                2
            )
        }