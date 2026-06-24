from app.models.test import Test
from app.models.question import Question
from app.models.question_attempt import QuestionAttempt


class SubmissionService:

    @staticmethod
    def submit_test(
        db,
        test_id,
        payload
    ):

        test = db.query(Test).filter(
            Test.id == test_id
        ).first()

        if not test:
            raise ValueError(
                "Test not found"
            )

        correct_count = 0

        total_time = 0

        for answer in payload.answers:

            question = (
                db.query(Question)
                .filter(
                    Question.id
                    == answer.questionId
                )
                .first()
            )

            if not question:
                continue

            is_correct = (
                answer.answer.strip().lower()
                ==
                question.correct_answer.strip().lower()
            )

            if is_correct:
                correct_count += 1

            total_time += answer.timeTaken

            attempt = QuestionAttempt(
                test_id=test_id,

                question_id=question.id,

                user_id=1,

                user_answer=answer.answer,

                correct_answer=
                    question.correct_answer,

                is_correct=is_correct,

                time_taken_seconds=
                    answer.timeTaken
            )

            db.add(attempt)

        test.total_time_seconds = (
            payload.totalTimeSeconds
        )

        test.submitted = True

        test.status = "completed"

        db.commit()

        total_questions = len(
            payload.answers
        )

        accuracy = 0

        if total_questions > 0:
            accuracy = (
                correct_count
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
            "score":
                correct_count,

            "totalQuestions":
                total_questions,

            "accuracy":
                round(
                    accuracy,
                    2
                ),

            "averageTime":
                round(
                    average_time,
                    2
                )
        }