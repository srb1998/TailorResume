# File: backend/database/models.py
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(255), nullable=False)
    job_title = Column(String(255), nullable=False)
    job_description = Column(Text, nullable=False)
    tailored_resume = Column(Text, nullable=False)
    status = Column(String(50), default="Ready")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class UserResume(Base):
    __tablename__ = "user_resumes"
    
    id = Column(Integer, primary_key=True, index=True)
    original_content = Column(Text, nullable=False)
    file_type = Column(String(10), nullable=False)  # pdf, docx, html
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
