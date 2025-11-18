// api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/api/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const tailorResume = async (jobDescription, jobUrl = null) => {
  const response = await api.post('/api/tailor', {
    job_description: jobDescription,
    job_url: jobUrl,
  });
  return response.data;
};

export const generatePDF = async (htmlContent, keywords = []) => {
  try {
    const response = await api.post('/api/generate-pdf', 
      { 
        html: htmlContent,
        keywords: keywords
      },
      { 
        responseType: 'blob',
        timeout: 60000 // 1 minute for PDF generation
      }
    );
    return response.data;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};

export const generateEmailDraft = async (jobTitle, company, recipientEmail = null) => {
  const response = await api.post('/api/email-draft', {
    job_title: jobTitle,
    company: company,
    recipient_email: recipientEmail,
  });
  return response.data;
};

export const getApplications = async () => {
  const response = await api.get('/api/applications');
  return response.data;
};

export const deleteApplication = async (appId) => {
  const response = await api.delete(`/api/applications/${appId}`);
  return response.data;
};

export default api;