// File: frontend/src/components/dashboard/StatusBoard.jsx

import { Download, Mail, Trash2, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function StatusBoard({ applications = [], onDelete }) {
  if (!applications || applications.length === 0) {
    return null;
  }

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Application History
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {applications.length} {applications.length === 1 ? 'application' : 'applications'}
        </span>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="border border-gray-200 dark:border-dark-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{app.company}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{app.job_title}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                app.status === 'Ready' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>
                {app.status}
              </span>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(app.created_at)}
            </div>

            <div className="flex gap-2">
              <button 
                className="flex-1 p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium"
                title="Download"
              >
                <Download className="h-4 w-4 mx-auto" />
              </button>
              <button 
                className="flex-1 p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-sm font-medium"
                title="Email"
              >
                <Mail className="h-4 w-4 mx-auto" />
              </button>
              <button 
                onClick={() => onDelete(app.id)}
                className="flex-1 p-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg transition-colors text-sm font-medium"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 mx-auto" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-dark-border">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Company</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Role</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr 
                key={app.id} 
                className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
              >
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                  {app.company}
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                  {app.job_title}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(app.created_at)}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === 'Ready' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-card rounded-lg transition-colors"
                      title="Email Draft"
                    >
                      <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button 
                      onClick={() => onDelete(app.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}