
import React from 'react';

const FeatureCard = ({ icon, title, desc, colSpan = "col-span-1" }: any) => (
  <div className={`${colSpan} glass-card p-8 rounded-3xl group hover:bg-[#FF6B35] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer`}>
    <div className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-500">{icon}</div>
    <h3 className="text-xl font-black mb-3 group-hover:text-white transition-colors uppercase tracking-tight">{title}</h3>
    <p className="text-gray-500 group-hover:text-white/80 transition-colors leading-relaxed font-medium">{desc}</p>
    <div className="mt-6 flex items-center gap-2 text-[#FF6B35] group-hover:text-white font-bold text-sm">
      LEARN MORE 
      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
    </div>
  </div>
);

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-[#003A87] dark:text-[#FF6B35] mb-6 tracking-tighter">Everything You Need. Nothing You Don't.</h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">A full suite of tools designed specifically to help local HVAC pros dominate their market.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon="🗣️" title="Natural Voice" 
            desc="Canadian accent, human-like tone, no robotic responses. Most customers don't even know it's AI."
          />
          <FeatureCard 
            icon="📅" title="Calendar Integration" colSpan="md:col-span-1"
            desc="Syncs with Google/Outlook, checks availability in real-time. No more double-bookings."
          />
          <FeatureCard 
            icon="📱" title="SMS Confirmations" 
            desc="Auto-sends appointment details to customers immediately after booking to reduce no-shows."
          />
          <FeatureCard 
            icon="🔄" title="Call Transfer" 
            desc="Intelligently routes emergencies to your on-call tech instantly based on keywords like 'leak' or 'no heat'."
          />
          <FeatureCard 
            icon="📊" title="Lead Scoring" 
            desc="Rates urgency (1-10) so you prioritize callbacks. AI identifies hot leads before they call competitors."
          />
          <FeatureCard 
            icon="🎤" title="Call Recording" 
            desc="Every conversation saved for quality and training. Access full transcripts in your dashboard."
          />
          <FeatureCard 
            icon="📝" title="CRM Integration" colSpan="lg:col-span-2"
            desc="Pushes leads directly to ServiceTitan, Housecall Pro, Jobber, and 20+ other platforms. Manual entry is a thing of the past."
          />
          <FeatureCard 
            icon="🌍" title="Multilingual" 
            desc="Offers French, Portuguese, Italian for the diverse GTA market."
          />
        </div>
      </div>
    </section>
  );
};
