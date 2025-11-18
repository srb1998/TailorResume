// frontend/src/components/home/CTA.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-purple-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">Limited Time: Free Forever Plan</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of job seekers who've boosted their interview rate by 3x with AI-tailored resumes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/dashboard" 
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105 flex items-center space-x-2 group"
          >
            <span>Start Tailoring Free</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all">
            Watch Demo
          </button>
        </div>

        <p className="mt-6 text-white/80 text-sm">
          No credit card required • 5 free tailored resumes • Cancel anytime
        </p>
      </div>
    </section>
  );
}