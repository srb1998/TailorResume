// frontend/src/pages/HomePage.jsx

import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Pricing from '../components/home/Pricing';
import CTA from '../components/home/CTA';

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
    </div>
  );
}