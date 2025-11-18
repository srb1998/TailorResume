// frontend/src/pages/DashboardPage.jsx

import React, { useState } from 'react';
import ResumeUpload from '../components/dashboard/ResumeUpload';
import JobInput from '../components/dashboard/JobInput';
import PDFPreview from '../components/dashboard/PDFPreview';
import EmailDraft from '../components/dashboard/EmailDraft';
import StatusBoard from '../components/dashboard/StatusBoard';
import LoadingSpinner from '../components/dashboard/LoadingSpinner';
import { useTailorResume } from '../hooks/useTailorResume';
import { useApplications } from '../hooks/useApplications';
import { generatePDF } from '../services/api';
import { downloadBlob, sanitizeFilename } from '../utils/helpers';

export default function DashboardPage() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [showEmailDraft, setShowEmailDraft] = useState(false);
  const [keywords, setKeywords] = useState([]);
  
  const { tailor, loading, error } = useTailorResume();
  const { applications, addApplication, deleteApplication } = useApplications();

  const handleResumeUpload = () => {
    setResumeUploaded(true);
  };

  const handleTailor = async (jobDescription) => {
    try {
      const result = await tailor(jobDescription);
      setCurrentResult(result);
      setKeywords(result.keywords || []); // Store keywords from response
      
      // Add to applications list
      addApplication({
        id: Date.now(),
        company: result.company,
        job_title: result.job_title,
        status: 'Ready',
        created_at: new Date().toISOString(),
      });

      // Show email draft if email detected
      if (result.email_detected) {
        setShowEmailDraft(true);
      }
    } catch (err) {
      console.error('Tailor error:', err);
    }
  };

  const handleDownloadPDF = async () => {
    if (!currentResult) return;
  
    try {
      console.log('Starting PDF generation with keywords:', keywords);
      
      // 1. Await the blob data directly from the API call
      const pdfBlob = await generatePDF(currentResult.html_content, keywords);
      
      // 2. Create a temporary URL from the blob
      const url = window.URL.createObjectURL(pdfBlob);
      
      // 3. Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      
      // 4. Sanitize the filename and set it on the link
      const filename = sanitizeFilename(currentResult.company, currentResult.job_title);
      link.setAttribute('download', filename);
      
      // 5. Append the link to the body, click it, and then remove it
      document.body.appendChild(link);
      link.click();
      
      // 6. Clean up by removing the link and revoking the temporary URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('PDF download initiated successfully.');

    } catch (err) {
      // Now, this catch block will ONLY run for genuine server errors (like 500)
      // or actual network failures, not for successful downloads.
      console.error('A true PDF download error occurred:', err);
      alert(`Failed to generate or download PDF. Please try again. Error: ${err.message}`);
    }
  };

  const handleRegenerate = () => {
    // Reset current result to allow re-tailoring
    setCurrentResult(null);
    setShowEmailDraft(false);
    setKeywords([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your resume and start tailoring it for your dream job
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {!resumeUploaded ? (
              <ResumeUpload onUpload={handleResumeUpload} />
            ) : (
              <div className="card p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Resume Uploaded</span>
                  </div>
                  <button
                    onClick={() => setResumeUploaded(false)}
                    className="text-sm text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            {resumeUploaded && (
              <JobInput onSubmit={handleTailor} disabled={loading} />
            )}
          </div>

          {/* Right Column - Preview & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {loading && <LoadingSpinner />}
            
            {error && (
              <div className="card p-6 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                <p className="text-red-700 dark:text-red-400 font-medium">
                  Error: {error}
                </p>
              </div>
            )}

            {currentResult && (
              <>
                {keywords.length > 0 && (
                  <div className="card p-4 border-l-4 border-blue-500">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      🎯 Keywords Highlighted ({keywords.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {keywords.slice(0, 10).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                      {keywords.length > 10 && (
                        <span className="px-3 py-1 text-gray-500 text-sm">
                          +{keywords.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <PDFPreview
                  htmlContent={currentResult.html_content}
                  company={currentResult.company}
                  jobTitle={currentResult.job_title}
                  onDownload={handleDownloadPDF}
                  onRegenerate={handleRegenerate}
                />

                {showEmailDraft && (
                  <EmailDraft
                    jobTitle={currentResult.job_title}
                    company={currentResult.company}
                    recipientEmail={currentResult.email_detected}
                    onClose={() => setShowEmailDraft(false)}
                  />
                )}
              </>
            )}

            {applications.length > 0 && (
              <StatusBoard
                applications={applications}
                onDelete={deleteApplication}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}