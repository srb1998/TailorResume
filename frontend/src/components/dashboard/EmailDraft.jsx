// File: frontend/src/components/dashboard/EmailDraft.jsx
import { useState, useEffect } from 'react';
import { Mail, Copy, Send, X, CheckCircle } from 'lucide-react';
import { generateEmailDraft } from '../../services/api';

export default function EmailDraft({ jobTitle, company, recipientEmail, onClose }) {
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const result = await generateEmailDraft(jobTitle, company, recipientEmail);
        setDraft(result);
      } catch (err) {
        console.error('Failed to generate email draft:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [jobTitle, company, recipientEmail]);

  const handleCopy = () => {
    if (!draft) return;

    const emailText = `To: ${draft.recipient_email || 'hiring@company.com'}
Subject: ${draft.subject}

${draft.body}`;

    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-6 animate-fade-in border-l-4 border-blue-600">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Email Draft Ready
            </h3>
            {recipientEmail && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recipient detected: {recipientEmail}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Generating email draft...</span>
        </div>
      ) : draft ? (
        <div className="space-y-4">
          {/* Email Preview */}
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
            <div className="mb-3 pb-3 border-b border-gray-200 dark:border-slate-700">
              <div className="text-sm mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">To:</span>{' '}
                <span className="text-gray-900 dark:text-white">
                  {draft.recipient_email || 'hiring@company.com'}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span>{' '}
                <span className="text-gray-900 dark:text-white">{draft.subject}</span>
              </div>
            </div>
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm">
              {draft.body}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              className="btn-primary flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${draft.recipient_email || ''}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}
              className="btn-secondary flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Open in Email Client</span>
            </a>
          </div>

          {/* Info */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>Tip:</strong> Personalize this email before sending. 
              Mention specific projects or skills that align with the role.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Failed to generate email draft. Please try again.
        </div>
      )}
    </div>
  );
}