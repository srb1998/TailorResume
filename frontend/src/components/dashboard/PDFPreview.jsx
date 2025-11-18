import { useState } from 'react';
import { Download, RefreshCw, Eye, Code } from 'lucide-react';

export default function PDFPreview({ htmlContent, company, jobTitle, onDownload, onRegenerate }) {
  const [viewMode, setViewMode] = useState('preview');

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Tailored Resume Preview
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {company} - {jobTitle}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'preview' ? 'html' : 'preview')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-lg transition-colors"
            title={viewMode === 'preview' ? 'View HTML' : 'View Preview'}
          >
            {viewMode === 'preview' ? <Code className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden mb-4 bg-white">
        {viewMode === 'preview' ? (
          <iframe
            srcDoc={htmlContent}
            title="Resume Preview"
            className="w-full h-[600px] border-0"
            sandbox="allow-same-origin" 
          />
        ) : (
          <pre className="bg-gray-50 dark:bg-dark-bg p-4 text-xs overflow-x-auto max-h-[600px]">
            <code className="text-gray-800 dark:text-gray-200">{htmlContent}</code>
          </pre>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onDownload}
          className="btn-primary flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={onRegenerate}
          className="btn-secondary flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Regenerate</span>
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <p className="text-sm text-green-700 dark:text-green-300">
          ✓ This resume is optimized for ATS systems and includes keywords from the job description.
        </p>
      </div>
    </div>
  );
}