// Hero.jsx

import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-bg dark:via-dark-card dark:to-dark-bg py-20 sm:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Resume Optimization</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Land Your Dream Job with
            <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI-Tailored Resumes
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in">
            Stop spending hours customizing your resume. Our AI optimizes it for each job in{' '}
            <span className="font-bold text-primary">30 seconds</span>, beating ATS systems every time.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15-20 min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">saved per application</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ATS compatibility</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">more interviews</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group">
              <span>Start Tailoring Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>See How It Works</span>
            </a>
          </div>

          {/* Trust Badge */}
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 animate-fade-in">
            ✓ No credit card required  •  ✓ Free forever  •  ✓ Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}