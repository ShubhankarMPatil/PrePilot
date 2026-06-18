from sqlalchemy import func

from app.models.study_session import StudySession


class AnalyticsService:

    @staticmethod
    def get_analytics(db):

        sessions = db.query(
            StudySession
        ).all()

        total_minutes = sum(
            s.duration_minutes
            for s in sessions
        )

        breakdown = []

        grouped = {}

        for session in sessions:

            grouped.setdefault(
                session.topic,
                0
            )

            grouped[
                session.topic
            ] += session.duration_minutes

        for topic, minutes in grouped.items():

            breakdown.append(
                {
                    "topic": topic,
                    "minutes": minutes
                }
            )

        return {
            "totalStudyMinutes":
                total_minutes,

            "sessionsCompleted":
                len(sessions),

            "topicBreakdown":
                breakdown
        }