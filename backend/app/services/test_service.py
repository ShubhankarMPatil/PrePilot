from app.models.test import Test


class TestService:

    @staticmethod
    def get_tests(db):

        return db.query(
            Test
        ).all()

    @staticmethod
    def get_test(
        db,
        test_id
    ):

        return db.query(
            Test
        ).filter(
            Test.id == test_id
        ).first()