from fastapi import FastAPI
from app.db.database import Base, engine
from app.db.init_db import create_database
from app.routes.auth import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",   # React
    "http://127.0.0.1:3000",
    "http://localhost:5173",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # allowed frontend
    allow_credentials=True,
    allow_methods=["*"],            # GET, POST, PUT, DELETE
    allow_headers=["*"],            # Authorization, Content-Type
)

# 👇 IMPORTANT
from app.models import user  


app.include_router(router)

@app.on_event("startup")
def startup():
    print("🚀 Starting...")

    create_database()

    Base.metadata.create_all(bind=engine)
 
@app.get("/")
def root():
    return {"message": "API running"}   