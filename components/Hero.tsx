
import React from 'react';
import { Waveform } from './Waveform';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden mesh-gradient">
      {/* Decorative Floating Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#FF6B35] rounded-full blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#003A87] rounded-full blur-[120px] opacity-30 animate-pulse" />

      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <span className="animate-pulse">🤖</span> AI-Powered 24/7 Phone System
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Never Miss Another Customer Call. <span className="text-[#FF6B35]">Ever.</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            Your AI receptionist answers in 2 rings, books appointments instantly, and qualifies leads—even at 3 AM. Purpose-built for busy HVAC companies in the GTA.
          </p>
          
          <ul className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              "Answers 24/7, weekends, holidays - no extra fees",
              "Books directly into YOUR calendar",
              "Speaks like your best employee",
              "Transfers urgent calls to on-call tech"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <div className="bg-[#FF6B35] p-1 rounded-full">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="font-semibold text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={() => scrollTo('demo')}
              className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-105 text-lg shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              HEAR IT IN ACTION
            </button>
            <button 
              onClick={() => scrollTo('how-it-works')}
              className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all text-lg backdrop-blur-sm"
            >
              SEE HOW IT WORKS
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 w-fit border border-white/10">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i+100}/40/40`} className="w-10 h-10 rounded-full border-2 border-primary" alt="User" />
              ))}
            </div>
            <div>
              <div className="flex text-yellow-400 gap-0.5 mb-1">
                {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-white text-xs font-semibold">Join 47 Toronto HVAC companies using AI</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="glass-card p-8 rounded-[32px] w-full max-w-md transform hover:rotate-2 transition-all duration-700 hover:scale-105 border-white/40 shadow-2xl">
            <div className="bg-white/50 rounded-2xl p-6 mb-8 text-center dark:bg-black/20">
              <h3 className="text-[#003A87] dark:text-[#FF6B35] font-black text-2xl mb-1 uppercase tracking-tighter">TRY IT FREE</h3>
              <p className="text-[#02295E] dark:text-gray-400 font-bold text-sm">14 DAYS • NO CREDIT CARD REQUIRED</p>
            </div>
            
            <div className="space-y-6">
              <div 
                onClick={() => scrollTo('demo')}
                className="flex items-center justify-center p-8 bg-[#003A87]/10 rounded-full w-24 h-24 mx-auto cursor-pointer group hover:bg-[#FF6B35]/20 transition-all"
              >
                 <svg className="w-10 h-10 text-[#FF6B35] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              
              <Waveform />

              <div className="bg-white/40 p-4 rounded-xl text-sm border border-white/20">
                <p className="text-[#02295E] italic">"Hi, I'm Alex from Peel Heating. I can help you book a furnace repair today..."</p>
              </div>
              
              <p className="text-center text-xs text-[#02295E]/60 dark:text-white/40 font-medium">
                Powered by Google AI • Natural Canadian Accent
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
