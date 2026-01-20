
import React from 'react';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-px bg-gray-200 dark:bg-white/5 rounded-[40px] shadow-2xl overflow-hidden">
        {/* Problem Side */}
        <div className="p-12 md:p-20 bg-white dark:bg-[#0D0D0D] relative">
          <div className="absolute top-10 right-10 opacity-5">
             <svg className="w-48 h-48 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
          </div>
          <h2 className="text-3xl font-black text-[#02295E] dark:text-white mb-12 flex items-center gap-4">
             <span className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl">✕</span>
             Losing $4,200/Month to Missed Calls?
          </h2>
          <div className="space-y-8">
            <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
              <p className="font-bold text-red-800 dark:text-red-400 mb-2">Every voicemail is a lead calling your competitor</p>
              <div className="text-2xl font-black text-red-600">78% of callers hang up on voicemail</div>
            </div>
            <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
              <p className="font-bold text-red-800 dark:text-red-400 mb-2">Answering services sound robotic and expensive</p>
              <div className="text-2xl font-black text-red-600">$800-$1500/month + still miss after-hours</div>
            </div>
            <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
              <p className="font-bold text-red-800 dark:text-red-400 mb-2">Your team is too busy during peak season</p>
              <div className="text-2xl font-black text-red-600">Avg. company misses 37% of calls May-Sept</div>
            </div>
          </div>
        </div>

        {/* Solution Side */}
        <div className="p-12 md:p-20 bg-[#F5F5F5] dark:bg-[#0A0A0A] relative">
          <div className="absolute top-10 right-10 opacity-5">
             <svg className="w-48 h-48 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <h2 className="text-3xl font-black text-[#FF6B35] mb-12 flex items-center gap-4">
             <span className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">✓</span>
             AI That Sounds Human. Books Jobs.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 glass-card rounded-2xl border-green-500/10">
               <div className="text-3xl mb-3">⚡</div>
               <h4 className="font-bold mb-2 text-[#003A87] dark:text-white uppercase tracking-tight">Answers In 2 Rings</h4>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Even when you're on another call or in the field.</p>
            </div>
            <div className="p-6 glass-card rounded-2xl border-green-500/10">
               <div className="text-3xl mb-3">💬</div>
               <h4 className="font-bold mb-2 text-[#003A87] dark:text-white uppercase tracking-tight">Natural Chats</h4>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Asks qualifying questions about furnace age, symptoms, urgency.</p>
            </div>
            <div className="p-6 glass-card rounded-2xl border-green-500/10">
               <div className="text-3xl mb-3">📅</div>
               <h4 className="font-bold mb-2 text-[#003A87] dark:text-white uppercase tracking-tight">Instant Booking</h4>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Checks your availability, books appointment, sends SMS confirmation.</p>
            </div>
            <div className="p-6 glass-card rounded-2xl border-green-500/10">
               <div className="text-3xl mb-3">🚀</div>
               <h4 className="font-bold mb-2 text-[#003A87] dark:text-white uppercase tracking-tight">Smart Routing</h4>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Emergency? Transfers to on-call tech. Quote? Schedules callback.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
