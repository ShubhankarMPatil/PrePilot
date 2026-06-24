from app.models.question import Question


class QuestionService:

    @staticmethod
    def get_test_questions(
        db,
        test_id
    ):

        return (
            db.query(Question)
            .filter(
                Question.test_id == test_id
            )
            .order_by(
                Question.question_order
            )
            .all()
        )