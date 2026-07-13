from app.models.question import Question
from app.models.question_attempt import (
    QuestionAttempt
)
from app.models.question_challenge import (
    QuestionChallenge,
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

            challenge = (

                db.query(
                    QuestionChallenge
                )

                .filter(
                    QuestionChallenge.question_id
                    == question.id
                )

                .first()

            )

            question_data = {
                "questionId": question.id,

                "question": question.question_text,

                "userAnswer": attempt.user_answer,

                "correctAnswer": attempt.correct_answer,

                "isCorrect": attempt.is_correct,

                "timeTaken": attempt.time_taken_seconds,

                "explanation": question.explanation,
            }

            if challenge:

                question_data["challenge"] = {

                    "challenged": True,

                    "status": challenge.verdict,

                    "derivedAnswer": challenge.derived_answer,

                    "reasoning": challenge.reasoning,

                    "confidence": challenge.confidence,

                    "scoreChange": (
                        1
                        if challenge.verdict == "accepted"
                        else 0
                    ),
                }

            else:

                question_data["challenge"] = None

            review_data.append(question_data)

        return review_data