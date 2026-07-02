from app.models.question import Question
from app.models.question_attempt import QuestionAttempt

from app.services.answer_normalizer import (
    AnswerNormalizer,
)


class EvaluationService:

    @staticmethod
    def evaluate(
        db,
        test_id: int,
        answers: list,
    ):

        score = 0

        total_time = 0

        for submission in answers:

            question = (
                db.query(Question)
                .filter(
                    Question.id == submission.questionId
                )
                .first()
            )

            user_answer = AnswerNormalizer.normalize(
                submission.answer
            )

            correct_answer = AnswerNormalizer.normalize(
                question.correct_answer
            )

            is_correct = (
                user_answer == correct_answer
            )

            if is_correct:
                score += 1

            total_time += submission.timeTaken

            attempt = QuestionAttempt(

                test_id=test_id,

                question_id=question.id,

                user_answer=submission.answer,

                correct_answer=question.correct_answer,

                is_correct=is_correct,

                time_taken_seconds=submission.timeTaken,
            )

            db.add(attempt)

        db.commit()

        total_questions = len(answers)

        accuracy = 0

        if total_questions > 0:

            accuracy = (
                score
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

            "score": score,

            "totalQuestions": total_questions,

            "accuracy": round(
                accuracy,
                2,
            ),

            "averageTime": round(
                average_time,
                2,
            ),
        }