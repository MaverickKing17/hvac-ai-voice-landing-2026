
import React from 'react';

const Step = ({ num, icon, title, desc }: any) => (
  <div className="relative group p-6">
    <div className="mb-8 w-20 h-20 bg-[#FF6B35] rounded-[32px] flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10">
      {icon}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#003A87] text-white rounded-full flex items-center justify-center text-xs font-black ring-4 ring-white dark:ring-[#0A0A0A]">{num}</div>
    </div>
    <h3 className="text-xl font-black text-[#003A87] dark:text-white mb-4 uppercase tracking-tighter">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-[#003A87] dark:text-[#FF6B35] mb-6">See It In Action</h2>
          <p className="text-xl text-gray-500">From ring to booked appointment in under 60 seconds</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-16 left-0 w-full h-1 bg-gray-100 dark:bg-white/5 -z-0" />
          
          <Step num="1" icon="📞" title="Customer Calls" desc="AI answers with your custom greeting: 'Thanks for calling Peel Heating, this is Alex...'" />
          <Step num="2" icon="💬" title="Natural Conversation" desc="AI asks: 'What issue are you experiencing?' and adapts based on responses." />
          <Step num="3" icon="📅" title="Booked Instantly" desc="AI checks your Google Calendar, offers available slots, and sends SMS confirmation." />
          <Step num="4" icon="📊" title="You Get Notified" desc="Lead details, call recording, and transcript sent to your phone/dashboard instantly." />
        </div>
        
        <div className="mt-20 text-center">
           <button className="bg-[#003A87] hover:bg-[#002B66] text-white px-10 py-4 rounded-xl font-black text-xl transition-all shadow-xl hover:scale-105 uppercase tracking-wider">
             See Your Custom Demo
           </button>
        </div>
      </div>
    </section>
  );
};
