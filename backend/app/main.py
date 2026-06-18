from fastapi import FastAPI

from app.db.init_db import create_tables
from app.db.seed import seed_database
from app.api.dashboard import router as dashboard_router
from app.api.sessions import router as session_router
from fastapi.middleware.cors import CORSMiddleware

from app.api.goals import router as goals_router
from app.api.subjects import router as subjects_router
from app.api.analytics import router as analytics_router

app = FastAPI(
    title="PrepPilot API"
)

app.include_router(session_router)
app.include_router(dashboard_router)
app.include_router(goals_router)
app.include_router(subjects_router)
app.include_router(analytics_router)

@app.on_event("startup")
def startup_event():
    create_tables()
    seed_database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "PrepPilot Backend Running"
    }