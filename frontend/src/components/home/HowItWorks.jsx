// frontend/src/components/home/HowItWorks.jsx
import { Upload, FileText, Download, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      number: '01',
      title: 'Upload Your Resume',
      description: 'Upload your base resume in PDF or DOCX format. We parse and store it securely.',
      color: 'bg-blue-500',
    },
    {
      icon: FileText,
      number: '02',
      title: 'Paste Job Description',
      description: 'Copy the job posting and paste it. Our AI extracts key requirements and keywords.',
      color: 'bg-purple-500',
    },
    {
      icon: CheckCircle,
      number: '03',
      title: 'AI Tailors Resume',
      description: 'GPT-4 rewrites your resume to match the job, optimizing for ATS compatibility.',
      color: 'bg-green-500',
    },
    {
      icon: Download,
      number: '04',
      title: 'Download & Apply',
      description: 'Get your tailored PDF instantly. Apply with confidence knowing you\'ll pass ATS.',
      color: 'bg-orange-500',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four simple steps to create the perfect resume for any job application
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
              )}

              <div className="text-center">
                {/* Icon Circle */}
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${step.color} mb-4 relative z-10`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>

                {/* Step Number */}
                <div className="text-4xl font-bold text-gray-200 dark:text-gray-700 mb-2">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="/dashboard" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2">
            <span>Try It Now - It's Free</span>
          </a>
        </div>
      </div>
    </section>
  );
}