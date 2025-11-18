// Features.jsx
import { Zap, Target, Mail, FileCheck, Clock, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Optimization',
      description: 'GPT-4 analyzes job descriptions and tailors your resume with relevant keywords instantly.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'ATS-Friendly Format',
      description: 'Guaranteed to pass Applicant Tracking Systems used by 99% of Fortune 500 companies.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Mail,
      title: 'Auto Email Drafts',
      description: 'Generate professional cover emails automatically when a hiring manager email is detected.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FileCheck,
      title: 'Instant PDF Export',
      description: 'Download professionally formatted PDFs ready to submit. No manual editing needed.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clock,
      title: 'Save 15-20 Minutes',
      description: 'What takes hours of manual work now happens in seconds. Apply to more jobs, faster.',
      gradient: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your resume data is encrypted and never shared. Full GDPR compliance guaranteed.',
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Stand Out
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to make your job application process seamless and successful
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}