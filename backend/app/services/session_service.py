from app.models.study_session import StudySession


class SessionService:

    @staticmethod
    def get_sessions(db):

        sessions = db.query(
            StudySession
        ).all()

        return sessions

    @staticmethod
    def create_session(
        db,
        user_id,
        topic,
        duration_minutes,
        session_date
    ):

        session = StudySession(
            user_id=user_id,
            topic=topic,
            duration_minutes=duration_minutes,
            session_date=session_date
        )

        db.add(session)

        db.commit()

        db.refresh(session)

        return session