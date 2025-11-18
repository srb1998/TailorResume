# File: backend/models/schemas.py
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class JobDescriptionInput(BaseModel):
    job_description: str
    job_url: Optional[str] = None

class TailoredResumeResponse(BaseModel):
    job_title: str
    company: str
    html_content: str
    email_detected: Optional[str] = None
    keywords: Optional[List[str]] = None 
    
class ApplicationCreate(BaseModel):
    company: str
    job_title: str
    job_description: str
    tailored_resume: str
    status: str = "Ready"

class ApplicationResponse(BaseModel):
    id: int
    company: str
    job_title: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class EmailDraftRequest(BaseModel):
    job_title: str
    company: str
    recipient_email: Optional[str] = None

class EmailDraftResponse(BaseModel):
    subject: str
    body: str
    recipient_email: Optional[str] = None