from app.models.question import Question
from app.models.question_attempt import (
    QuestionAttempt
)


class ReviewService:

    @staticmethod
    def get_review(
        db,
        test_id
    ):

        attempts = (
            db.query(
                QuestionAttempt
            )
            .filter(
                QuestionAttempt.test_id
                == test_id
            )
            .all()
        )

        review_data = []

        for attempt in attempts:

            question = (
                db.query(Question)
                .filter(
                    Question.id
                    ==
                    attempt.question_id
                )
                .first()
            )

            review_data.append(
                {
                    "questionId":
                        question.id,

                    "question":
                        question.question_text,

                    "userAnswer":
                        attempt.user_answer,

                    "correctAnswer":
                        attempt.correct_answer,

                    "isCorrect":
                        attempt.is_correct,

                    "timeTaken":
                        attempt.time_taken_seconds,

                    "explanation":
                        question.explanation
                }
            )

        return review_data