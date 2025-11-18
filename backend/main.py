# main.py

from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
import logging
import os
import tempfile
import asyncio
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from io import BytesIO

from models.schemas import (
    JobDescriptionInput, 
    TailoredResumeResponse,
    ApplicationCreate,
    ApplicationResponse,
    EmailDraftRequest,
    EmailDraftResponse
)
from database.db import get_db, init_db
from database.models import Application, UserResume
from services.resume_parser import parse_resume, extract_email_from_text
from services.openai_service import tailor_resume_content, generate_email_draft, extract_keywords
from services.pdf_service import html_to_pdf, generate_preview_html

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    logger.info("Database initialized")
    yield
    # Shutdown (if any cleanup is needed in future)


app = FastAPI(title="Resume Tailor Pro API", version="1.0.0", lifespan=lifespan)


# CORS

origins = [
    "http://localhost:3000",  # Your React app's URL
    # Add any other origins if needed
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# (Database initialization handled by lifespan handler)

@app.get("/")
async def root():
    return {
        "message": "Resume Tailor Pro API",
        "version": "1.0.0",
        "status": "running"
    }

@app.post("/api/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload and parse user's base resume"""
    try:
        file_type = file.filename.split(".")[-1].lower()
        if file_type not in ["pdf", "docx"]:
            raise HTTPException(400, "Only PDF and DOCX files are supported")
        
        # Use system temp directory (cross-platform)
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = os.path.join(temp_dir, file.filename)
            with open(temp_path, "wb") as f:
                f.write(await file.read())
            
            content = parse_resume(temp_path, file_type)
            
            resume = UserResume(
                original_content=content,
                file_type=file_type
            )
            db.add(resume)
            db.commit()
        
        return {
            "message": "Resume uploaded successfully",
            "resume_id": resume.id,
            "preview": content[:500] + "..."
        }
    
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(500, str(e))

@app.post("/api/tailor", response_model=TailoredResumeResponse)
async def tailor_resume(
    job_input: JobDescriptionInput,
    db: Session = Depends(get_db)
):
    """Tailor resume based on job description"""
    try:
        user_resume = db.query(UserResume).order_by(UserResume.id.desc()).first()
        if not user_resume:
            raise HTTPException(400, "Please upload your resume first")
        
        # Extract email from JD
        email_detected = extract_email_from_text(job_input.job_description)
        
        # Extract keywords for highlighting
        logger.info("Extracting keywords from job description...")
        keywords = extract_keywords(job_input.job_description)
        logger.info(f"Extracted keywords: {keywords}")
        
        # Tailor resume using OpenAI
        logger.info("Tailoring resume with AI...")
        result = tailor_resume_content(
            user_resume.original_content,
            job_input.job_description
        )
        
        # Generate preview HTML (with keywords highlighted)
        preview_html = generate_preview_html(result["html_content"], keywords)
        
        # Save application with keywords
        application = Application(
            company=result["company"],
            job_title=result["job_title"],
            job_description=job_input.job_description,
            tailored_resume=result["html_content"],
            status="Ready"
        )
        db.add(application)
        db.commit()
        
        return {
            "job_title": result["job_title"],
            "company": result["company"],
            "html_content": preview_html,
            "email_detected": email_detected,
            "keywords": keywords 
        }
    
    except Exception as e:
        logger.error(f"Tailor error: {str(e)}")
        raise HTTPException(500, str(e))

@app.post("/api/generate-pdf")
async def generate_pdf_endpoint(request: dict):
    """Generate PDF from HTML with keyword highlighting"""
    try:
        html_content = request.get("html")
        keywords = request.get("keywords", [])
        
        logger.info(f"Generating PDF with {len(keywords)} keywords to highlight")
        
        pdf_bytes = html_to_pdf(html_content, keywords)
        
        return StreamingResponse(
            BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=resume.pdf"}
        )
    
    except Exception as e:
        logger.error(f"PDF error: {str(e)}")
        raise HTTPException(500, str(e))

@app.post("/api/email-draft", response_model=EmailDraftResponse)
async def create_email_draft(request: EmailDraftRequest):
    """Generate email draft"""
    try:
        draft = generate_email_draft(
            request.job_title,
            request.company,
            request.recipient_email
        )
        return draft
    
    except Exception as e:
        logger.error(f"Email draft error: {str(e)}")
        raise HTTPException(500, str(e))

@app.get("/api/applications", response_model=List[ApplicationResponse])
async def get_applications(db: Session = Depends(get_db)):
    """Get all applications"""
    applications = db.query(Application).order_by(Application.created_at.desc()).all()
    return applications

@app.delete("/api/applications/{app_id}")
async def delete_application(app_id: int, db: Session = Depends(get_db)):
    """Delete an application"""
    app = db.query(Application).filter(Application.id == app_id).first()
    if not app:
        raise HTTPException(404, "Application not found")
    
    db.delete(app)
    db.commit()
    return {"message": "Application deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)