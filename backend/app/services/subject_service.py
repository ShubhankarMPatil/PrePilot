from app.models.subject import Subject


class SubjectService:

    @staticmethod
    def get_subjects(db):

        return db.query(
            Subject
        ).all()