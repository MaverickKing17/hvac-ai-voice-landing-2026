
import React from 'react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 mesh-gradient text-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Answer Every Call?</h2>
        <p className="text-2xl mb-12 text-gray-200">Join 47 Toronto HVAC companies using AI to grow revenue</p>
        
        <div className="grid sm:grid-cols-2 gap-12 mb-16 max-w-2xl mx-auto text-left">
          <div className="space-y-4">
             {['14-day free trial', 'Setup in 15 minutes', 'No credit card required'].map(t => (
               <div key={t} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="font-bold">{t}</span>
               </div>
             ))}
          </div>
          <div className="space-y-4">
             {['Cancel anytime', '30-day money-back', 'Keep all recordings'].map(t => (
               <div key={t} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="font-bold">{t}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           <button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-12 py-5 rounded-2xl font-black text-2xl shadow-2xl hover:scale-105 transition-all w-full sm:w-auto">
             START FREE TRIAL
           </button>
           <a href="#" className="text-white text-lg font-bold underline underline-offset-8 decoration-[#FF6B35] hover:text-[#FF6B35] transition-colors">
             Schedule a personal demo
           </a>
        </div>
      </div>
    </section>
  );
};
