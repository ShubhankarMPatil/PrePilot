from app.db.database import SessionLocal

from app.models.user import User
from app.models.goal import Goal
from app.models.study_session import StudySession

from app.models.subject import Subject

from app.models.test import Test
from app.models.question import Question


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

    test = Test(
        user_id=user.id,
        title="Percentages Practice Test",
        topic="Percentages",
        difficulty="Medium",
        total_questions=3,
        status="ready",
        total_time_seconds=0
    )

    db.add(test)
    db.commit()
    db.refresh(test)

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

    questions = [
        Question(
            test_id=test.id,
            question_text="A shirt priced at ₹200 is sold at a 20% profit. Find the cost price.",
            question_type="typed",
            correct_answer="166.67",
            explanation="CP = SP / 1.2",
            question_order=1
        ),

        Question(
            test_id=test.id,
            question_text="What is 25% of 400?",
            question_type="mcq",
            option_a="50",
            option_b="75",
            option_c="100",
            option_d="125",
            correct_answer="100",
            explanation="25% × 400 = 100",
            question_order=2
        ),

        Question(
            test_id=test.id,
            question_text="Population increased from 1000 to 1200. Percentage increase?",
            question_type="typed",
            correct_answer="20",
            explanation="Increase = 200/1000 × 100",
            question_order=3
        )
    ]

    db.add_all(sessions)
    db.add_all(subjects)
    db.add_all(questions)

    db.commit()

    db.close()