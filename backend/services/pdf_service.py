# backend/services/pdf_service.py

import re
from typing import List
from weasyprint import HTML

def html_to_pdf(html_content: str, keywords: List[str] = None) -> bytes:
    """
    Convert HTML to PDF using WeasyPrint.
    This is more reliable in server environments than browser-based tools.
    """
    try:
        return HTML(string=html_content).write_pdf()
            
    except Exception as e:
        # Add more context to the error
        raise ValueError(f"PDF generation failed with WeasyPrint: {str(e)}")


def fix_encoding(html: str) -> str:
    """Fix common UTF-8 encoding issues."""
    replacements = { '–': '-', '—': '-', '‘': "'", '’': "'", '“': '"', '”': '"', '…': '...', '•': '-'}
    for old, new in replacements.items():
        html = html.replace(old, new)
    return html


def fix_colors(html: str) -> str:
    """Enforce consistent, professional colors."""
    color_fixes = { 'color: #333': 'color: #000', 'color: #555': 'color: #000' }
    for old, new in color_fixes.items():
        html = html.replace(old, new)
    return html


def highlight_keywords(html: str, keywords: List[str]) -> str:
    """Make keywords bold throughout the resume."""
    if not keywords:
        return html
    
    keywords = sorted(set(keywords), key=len, reverse=True)
    
    for keyword in keywords:
        if not keyword or len(keyword) < 2:
            continue
        
        escaped_keyword = re.escape(keyword)
        pattern = re.compile(r'(?<![<\w])(' + escaped_keyword + r')(?![>\w])', re.IGNORECASE)
        
        parts = re.split(r'(<strong[^>]*>.*?</strong>)', html, flags=re.IGNORECASE | re.DOTALL)
        
        result_parts = []
        for i, part in enumerate(parts):
            if i % 2 == 1 or '<strong' in part.lower():
                result_parts.append(part)
            else:
                modified = pattern.sub(r'<strong style="font-weight: 700; color: #000;">\1</strong>', part)
                result_parts.append(modified)
        
        html = ''.join(result_parts)
    
    return html


def generate_preview_html(html_content: str, keywords: List[str] = None) -> str:
    """
    Generate beautiful HTML for web preview AND for PDF generation.
    WeasyPrint has excellent CSS support.
    """
    # Apply all the same fixes for consistency
    html_content = fix_encoding(html_content)
    html_content = fix_colors(html_content)
    
    if keywords:
        html_content = highlight_keywords(html_content, keywords)
    
    # This CSS will be used for both the web preview and the PDF
    professional_css = """
    <style>
        @page {
            size: letter;
            margin: 0.75in;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            line-height: 1.5;
            color: #1a1a1a;
            font-size: 11pt;
            max-width: 8.5in; /* Added for web preview centering */
            margin: 0 auto;   /* Added for web preview centering */
            background: white;
        }
        
        h1 { font-size: 26pt; font-weight: 700; margin-bottom: 8px; color: #000; }
        h2 { font-size: 14pt; font-weight: 700; margin-top: 22px; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 4px; letter-spacing: 1px; text-transform: uppercase; color: #000; page-break-after: avoid; }
        h3 { font-size: 12pt; font-weight: 600; margin-top: 12px; margin-bottom: 4px; color: #000; }
        p { margin: 6px 0; }
        ul { margin: 8px 0; padding-left: 24px; }
        li { margin: 4px 0; }
        strong, b { font-weight: 700 !important; color: #000 !important; }
        
        .job-entry { page-break-inside: avoid; margin-bottom: 16px; }
        
        /* Modern CSS for flexbox layout in job headers, supported by WeasyPrint */
        .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
        .job-title { font-weight: 700; font-size: 11pt; color: #000; }
        .date { font-size: 10pt; color: #444; font-style: italic; white-space: nowrap; }
    </style>
    """
    
    if "<head>" in html_content:
        return html_content.replace("</head>", f"{professional_css}</head>")
    elif "<html>" in html_content:
        return html_content.replace("<html>", f"<html><head>{professional_css}</head>")
    else:
        return f"<!DOCTYPE html><html><head><meta charset='UTF-8'>{professional_css}</head><body>{html_content}</body></html>"