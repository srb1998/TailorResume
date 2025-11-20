# backend/services/openai_service.py

from openai import OpenAI 
import os
import json
from dotenv import load_dotenv
from typing import List, Dict

load_dotenv()

# Initialize the client explicitly. 

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_keywords(job_description: str) -> List[str]:
    """
    Extract important keywords from job description for highlighting
    """
    prompt = f"""You are an ATS keyword extraction expert.

    Job Description:
    {job_description}

    Extract the 15-20 most important keywords that should be highlighted in a resume.
    Focus on:
    1. Technical skills (Python, React, AWS, etc.)
    2. Tools and frameworks (Docker, Kubernetes, FastAPI, etc.)
    3. Key qualifications (Machine Learning, Gen AI, Data Science, etc.)
    4. Important certifications or requirements

    Return ONLY a JSON array of keywords (no explanations):
    ["keyword1", "keyword2", "keyword3", ...]

    Rules:
    - Each keyword should be 1-3 words max
    - Use proper capitalization (e.g., "Python" not "python")
    - Include variations if important (e.g., "AI", "Artificial Intelligence")
    """

    try:
        # Use client.chat.completions.create instead of openai.chat.completions.create
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        
        content = response.choices[0].message.content
        content = content.replace("```json", "").replace("```", "").strip()
        
        keywords = json.loads(content)
        return keywords
    
    except Exception as e:
        print(f"Keyword extraction error: {str(e)}")
        return []


def tailor_resume_content(original_resume: str, job_description: str) -> Dict:
    """
    Use OpenAI to tailor resume based on job description
    Now includes keyword extraction
    """
    
    prompt = f"""You are an expert ATS optimization specialist and resume writer.

Original Resume Content:
{original_resume}

Job Description:
{job_description}

Tasks:
1. Extract the job title and company name from the job description
2. Identify key skills, technologies, and keywords from the JD
3. Rewrite the resume content to naturally incorporate these keywords
4. Maintain professional tone and truthfulness
5. Return the content in clean, semantic HTML format

IMPORTANT HTML REQUIREMENTS:
- Use ONLY simple HTML tags: <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- NO flexbox, NO grid, NO modern CSS
- Use inline styles for ALL formatting
- Structure: Name (h1) → Contact Info (p) → Sections (h2) → Content
- Use <strong> for company names, job titles, and important terms
- Use proper hierarchy: h1 for name, h2 for sections, h3 for job titles

Return ONLY a JSON object with this exact structure:
{{
    "job_title": "extracted job title",
    "company": "extracted company name",
    "html_content": "complete HTML resume with proper structure and inline styles"
}}

Example HTML structure:
<html>
<body>
<h1 style="font-size: 26pt; font-weight: 700; color: #000;">John Doe</h1>
<p style="text-align: center; font-size: 10pt;">
email@example.com | (123) 456-7890 | linkedin.com/in/johndoe
</p>

<h2 style="font-size: 13pt; font-weight: 700; color: #000; border-bottom: 2px solid #000; margin-top: 20px;">PROFESSIONAL SUMMARY</h2>
<p>Senior Software Engineer with 5+ years of experience in <strong>Python</strong>, <strong>FastAPI</strong>, and <strong>Gen AI</strong>...</p>

<h2 style="font-size: 13pt; font-weight: 700; color: #000; border-bottom: 2px solid #000; margin-top: 20px;">EXPERIENCE</h2>

<div style="margin-bottom: 15px;">
<div style="display: flex; justify-content: space-between;">
<h3 style="font-size: 12pt; font-weight: 700; color: #000;">Senior Software Engineer</h3>
<span style="font-size: 10pt; color: #444; font-style: italic;">Jan 2020 - Present</span>
</div>
<p style="font-weight: 600; color: #000;"><strong>Google Inc.</strong> - Mountain View, CA</p>
<ul>
<li>Led development of <strong>AI-powered</strong> features using <strong>Python</strong> and <strong>TensorFlow</strong></li>
<li>Improved system performance by 40% through optimization</li>
</ul>
</div>

<h2 style="font-size: 13pt; font-weight: 700; color: #000; border-bottom: 2px solid #000; margin-top: 20px;">SKILLS</h2>
<p><strong>Languages:</strong> Python, JavaScript, SQL</p>
<p><strong>Frameworks:</strong> FastAPI, React, Django</p>
<p><strong>Tools:</strong> Docker, Kubernetes, AWS, Git</p>

</body>
</html>
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        
        content = response.choices[0].message.content
        content = content.replace("```json", "").replace("```", "").strip()
        
        result = json.loads(content)
        return result
    
    except Exception as e:
        raise ValueError(f"OpenAI API error: {str(e)}")


def generate_email_draft(job_title: str, company: str, recipient_email: str = None) -> dict:
    """
    Generate professional email draft
    """
    
    prompt = f"""Write a professional, concise job application email for:

Role: {job_title}
Company: {company}

Requirements:
- Keep it under 150 words
- Professional but warm tone
- Mention attached resume
- Express genuine interest
- Include a strong call-to-action

Return ONLY a JSON object:
{{
    "subject": "Email subject line",
    "body": "Email body text"
}}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8
        )
        
        content = response.choices[0].message.content
        content = content.replace("```json", "").replace("```", "").strip()
        
        result = json.loads(content)
        result["recipient_email"] = recipient_email
        return result
    
    except Exception as e:
        raise ValueError(f"Failed to generate email: {str(e)}")