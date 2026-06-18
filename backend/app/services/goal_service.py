from app.models.goal import Goal


class GoalService:

    @staticmethod
    def get_goals(db):

        goal = db.query(Goal).first()

        return {
            "dailyQuestionsTarget":
                goal.daily_questions_target,

            "dailyStudyHoursTarget":
                goal.daily_study_hours_target
        }