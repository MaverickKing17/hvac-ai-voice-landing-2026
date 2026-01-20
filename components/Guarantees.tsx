
import React from 'react';

const GuaranteeCard = ({ icon, title, desc, fine }: any) => (
  <div className="glass-card p-10 rounded-[32px] shadow-xl border-gray-100 dark:border-white/10 hover:scale-105 transition-transform duration-500">
     <div className="text-5xl mb-6">{icon}</div>
     <h3 className="text-xl font-black mb-4 uppercase tracking-tighter text-[#003A87] dark:text-white">{title}</h3>
     <p className="text-gray-600 dark:text-gray-300 font-bold text-sm mb-6 leading-relaxed">"{desc}"</p>
     <div className="pt-6 border-t border-gray-100 dark:border-white/5">
        <p className="text-[10px] font-black uppercase text-[#FF6B35] tracking-widest">{fine}</p>
     </div>
  </div>
);

export const Guarantees: React.FC = () => {
  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-black text-[#003A87] dark:text-[#FF6B35] mb-4">Our Ironclad Guarantees</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">We stand behind our work AND our technology</p>
      </div>

      <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <GuaranteeCard 
          icon="🔒" title="No Loopholes™" 
          desc="If you're not satisfied within 1 year, we make it right. Period."
          fine="Applies to AI service quality and uptime"
        />
        <GuaranteeCard 
          icon="⚡" title="No Hassles™" 
          desc="If AI goes down for >1 hour, we credit you $100/hour."
          fine="99.97% uptime SLA"
        />
        <GuaranteeCard 
          icon="🎯" title="Just Right™" 
          desc="If AI doesn't book appointments as promised, we'll refund your first month."
          fine="Based on proper setup and training"
        />
        <GuaranteeCard 
          icon="🤝" title="We Respect You™" 
          desc="Your data is yours. Export anytime. We never sell to competitors."
          fine="PIPEDA compliant • SOC 2 certified"
        />
      </div>
    </section>
  );
};
