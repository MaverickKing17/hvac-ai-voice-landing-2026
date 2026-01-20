
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProblemSolution } from './components/ProblemSolution';
import { HowItWorks } from './components/HowItWorks';
import { ROICalculator } from './components/ROICalculator';
import { FeatureGrid } from './components/FeatureGrid';
import { ComparisonTable } from './components/ComparisonTable';
import { SuccessShowcase } from './components/SuccessShowcase';
import { LiveDemo } from './components/LiveDemo';
import { Integrations } from './components/Integrations';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Guarantees } from './components/Guarantees';
import { Footer } from './components/Footer';
import { FinalCTA } from './components/FinalCTA';
import { UrgencyBanner } from './components/UrgencyBanner';
import { SymptomChecker } from './components/SymptomChecker';
import { BookingChatbot } from './components/BookingChatbot';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDark(e.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-[#0A0A0A] text-[#F5F5F5]' : 'bg-white text-[#1A1A1A]'}`}>
      <UrgencyBanner />
      <Header />
      <main>
        <div id="home"><Hero /></div>
        <TrustBar />
        <ProblemSolution />
        <div id="how-it-works"><HowItWorks /></div>
        <div id="diagnose"><SymptomChecker /></div>
        <div id="roi"><ROICalculator /></div>
        <div id="features"><FeatureGrid /></div>
        <ComparisonTable />
        <div id="reviews"><SuccessShowcase /></div>
        <div id="demo"><LiveDemo /></div>
        <Integrations />
        <div id="pricing"><Pricing /></div>
        <div id="faq"><FAQ /></div>
        <Guarantees />
        <FinalCTA />
      </main>
      <Footer />
      
      {/* AI Booking Chatbot Widget */}
      <BookingChatbot />
      
      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card p-4 flex gap-4">
        <a 
          href="tel:+12892728831" 
          className="flex-1 bg-[#003A87] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          CALL NOW
        </a>
        <button 
          onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex-1 bg-[#FF6B35] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
          TRY AI DEMO
        </button>
      </div>
    </div>
  );
};

export default App;
