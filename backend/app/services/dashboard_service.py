from sqlalchemy import func

from app.models.user import User
from app.models.goal import Goal
from app.models.study_session import StudySession


class DashboardService:

    @staticmethod
    def get_dashboard_data(db):

        user = db.query(User).first()

        goal = db.query(Goal).first()

        session_count = db.query(
            func.count(StudySession.id)
        ).scalar()

        return {
            "userName": user.name,
            "exam": user.exam,
            "targetDate": user.target_date,

            "dailyQuestionsTarget": goal.daily_questions_target,
            "dailyStudyHoursTarget": goal.daily_study_hours_target,

            "totalSessions": session_count
        }