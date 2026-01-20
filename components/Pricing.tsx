
import React from 'react';

const PricingCard = ({ tier, price, save, features, highlight = false, onSelect }: any) => (
  <div className={`glass-card p-10 rounded-[40px] shadow-2xl relative ${highlight ? 'border-2 border-[#FF6B35] scale-105 z-10' : 'z-0 opacity-90'}`}>
     {highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B35] text-white px-6 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">Most Popular</div>}
     <h3 className="text-2xl font-black text-[#003A87] dark:text-white mb-4 uppercase tracking-tighter">{tier}</h3>
     <div className="mb-2">
       <span className="text-5xl font-black text-[#02295E] dark:text-[#FF6B35] tracking-tighter">{price}</span>
       {price !== "Custom" && <span className="text-gray-500 font-bold">/mo</span>}
     </div>
     {save && <p className="text-green-600 dark:text-green-400 font-black text-xs uppercase mb-10">{save}</p>}
     
     <ul className="space-y-6 mb-12">
       {features.map((f: string) => (
         <li key={f} className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-300">
           <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
           {f}
         </li>
       ))}
     </ul>

     <button 
      onClick={() => onSelect(tier)}
      className={`w-full py-4 rounded-xl font-black text-lg transition-all ${highlight ? 'bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-lg shadow-[#FF6B35]/30' : 'bg-gray-100 dark:bg-white/10 text-[#003A87] dark:text-white hover:bg-gray-200'}`}
     >
        {price === "Custom" ? "CONTACT SALES" : "START FREE TRIAL"}
     </button>
  </div>
);

export const Pricing: React.FC = () => {
  const handleSelect = (tier: string) => {
    // Scroll to chatbot and signal opening (simulated by triggering a click on the floating button or just providing feedback)
    const chatBtn = document.querySelector('.pulse-glow') as HTMLButtonElement;
    if (chatBtn) {
      chatBtn.click();
    } else {
      alert(`Great choice! The ${tier} plan trial is starting. Our AI assistant at the bottom right can help you finish setup.`);
    }
  };

  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-[#111]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-[#003A87] dark:text-[#FF6B35] mb-6">Simple Pricing. Massive ROI.</h2>
          <p className="text-xl text-gray-500 font-medium">No setup fees. No per-minute charges. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          <PricingCard 
            tier="Starter" price="$299" save="Billed annually ($3,588/year, Save $708)"
            onSelect={handleSelect}
            features={["Unlimited calls", "24/7 availability", "Calendar integration (1)", "SMS confirmations", "Call recordings (30 days)", "Email support"]}
          />
          <PricingCard 
            tier="Pro" price="$499" save="Billed annually ($5,988/year, Save $1,200)" highlight={true}
            onSelect={handleSelect}
            features={["Everything in Starter", "Multi-calendar support", "CRM integration (ServiceTitan, etc.)", "Priority call routing", "Custom voice training", "Phone support"]}
          />
          <PricingCard 
            tier="Enterprise" price="Custom"
            onSelect={handleSelect}
            features={["Everything in Pro", "Multi-location support", "Advanced analytics", "Dedicated account manager", "Custom integrations", "White-glove onboarding"]}
          />
        </div>
      </div>
    </section>
  );
};
