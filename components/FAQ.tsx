
import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, toggle }: any) => (
  <div className="border-b border-gray-100 dark:border-white/10 last:border-0">
    <button 
      onClick={toggle}
      className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
    >
      <span className="text-lg font-bold text-[#02295E] dark:text-gray-200">{question}</span>
      <span className={`text-2xl font-black transform transition-transform ${isOpen ? 'rotate-45' : ''} text-[#FF6B35]`}>+</span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
      <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{answer}</p>
    </div>
  </div>
);

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "How long does setup take?", a: "15 minutes. You'll do a quick onboarding call where we record your greeting, configure your calendar, and set emergency routing rules. The AI goes live immediately after." },
    { q: "Will customers know it's AI?", a: "Most don't notice. The voice is a natural Canadian accent, uses your company name, and handles complex questions. 94% of customers prefer it to leaving a voicemail." },
    { q: "What if the AI can't answer a question?", a: "It gracefully transfers to your team or takes a detailed message. You can also set 'escalation triggers' for specific high-value requests." },
    { q: "Does it integrate with my CRM?", a: "Yes. We support ServiceTitan, Housecall Pro, Jobber, FieldEdge, and 20+ others. Leads are pushed automatically with recording attached." }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-black text-center mb-16 text-[#003A87] dark:text-[#FF6B35]">Common Questions</h2>
        <div className="bg-[#F5F5F5] dark:bg-white/5 rounded-[40px] p-8 md:p-12 shadow-inner">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i} question={faq.q} answer={faq.a} 
              isOpen={openIndex === i} toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
