from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Numeric
from sqlalchemy.dialects.postgresql import ARRAY
from app.db.database import Base
from datetime import datetime
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    #auth coloumns
    github_id = Column(String, unique=True, nullable=True)
    auth_provider = Column(String, default="local")  # local / github



    