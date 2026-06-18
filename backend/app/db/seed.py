from app.db.database import SessionLocal

from app.models.user import User
from app.models.goal import Goal
from app.models.study_session import StudySession

from app.models.subject import Subject


def seed_database():

    db = SessionLocal()

    if db.query(User).first():
        db.close()
        return

    user = User(
        name="Shubhankar",
        email="demo@prepilot.com",
        exam="CAT",
        target_date="2026-11-30"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    goal = Goal(
        user_id=user.id,
        daily_questions_target=30,
        daily_study_hours_target=3
    )

    db.add(goal)

    sessions = [
        StudySession(
            user_id=user.id,
            topic="Percentages",
            duration_minutes=60,
            session_date="2026-06-15"
        ),
        StudySession(
            user_id=user.id,
            topic="Geometry",
            duration_minutes=45,
            session_date="2026-06-14"
        ),
        StudySession(
            user_id=user.id,
            topic="Algebra",
            duration_minutes=90,
            session_date="2026-06-13"
        )
    ]

    subjects = [
        Subject(
            name="Percentages",
            category="Quant"
        ),
        Subject(
            name="Algebra",
            category="Quant"
        ),
        Subject(
            name="Geometry",
            category="Quant"
        ),
        Subject(
            name="Time and Work",
            category="Quant"
        ),
        Subject(
            name="Reading Comprehension",
            category="VARC"
        ),
        Subject(
            name="Para Jumbles",
            category="VARC"
        ),
    ]

    db.add_all(sessions)
    db.add_all(subjects)

    db.commit()

    db.close()