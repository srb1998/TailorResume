// File: frontend/src/components/dashboard/JobInput.jsx
import { useState } from 'react';
import { Briefcase, Link as LinkIcon, Sparkles } from 'lucide-react';

export default function JobInput({ onSubmit, disabled }) {
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const input = activeTab === 'text' ? jobDescription : jobUrl;
    if (!input.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(input);
      setJobDescription('');
      setJobUrl('');
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = activeTab === 'text' 
    ? jobDescription.trim().length > 50 
    : jobUrl.trim().length > 0;

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-4">
        <Briefcase className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Job Description
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4 border-b border-gray-200 dark:border-dark-border">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'text'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Paste Text
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'url'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Job URL
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'text' ? (
          <div className="mb-4">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              className="textarea-field"
              placeholder="Paste the complete job description here...

Example:
We are looking for a Senior Python Developer with 5+ years of experience in Django, Flask, and FastAPI..."
              disabled={disabled || submitting}
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {jobDescription.length} characters
              {jobDescription.length < 50 && jobDescription.length > 0 && (
                <span className="text-orange-500 ml-2">
                  (minimum 50 characters required)
                </span>
              )}
            </p>
          </div>
        ) : (
          <div className="mb-4">
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className="input-field pl-10"
                placeholder="https://linkedin.com/jobs/view/..."
                disabled={disabled || submitting}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Supports: LinkedIn, Indeed, Glassdoor, and more
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={disabled || submitting || !isValid}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Tailoring Resume...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Tailor Resume</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 <strong>Tip:</strong> Include the full job description for best results. 
          Our AI will extract keywords and requirements automatically.
        </p>
      </div>
    </div>
  );
}