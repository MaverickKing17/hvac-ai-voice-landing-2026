
import React from 'react';

const TestimonialCard = ({ name, biz, quote, thumb }: any) => (
  <div className="min-w-[320px] md:min-w-[400px] glass-card p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
    <div className="flex items-center gap-4 mb-8">
       <div className="w-16 h-16 bg-[#FF6B35] rounded-2xl flex items-center justify-center font-black text-xl text-white">
         {name[0]}
       </div>
       <div>
         <h4 className="font-black text-lg text-[#02295E] dark:text-white leading-none mb-1">{name}</h4>
         <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{biz}</p>
       </div>
    </div>
    <div className="relative mb-8 aspect-video bg-gray-200 dark:bg-white/10 rounded-3xl overflow-hidden shadow-inner cursor-pointer">
       <img src={thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Testimonial thumbnail" />
       <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
         <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
           <svg className="w-6 h-6 text-[#FF6B35] fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
         </div>
       </div>
       <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">1:23</div>
    </div>
    <p className="text-[#02295E] dark:text-gray-300 italic font-medium leading-relaxed">"{quote}"</p>
    <div className="flex text-yellow-400 gap-0.5 mt-6">
       {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A] overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-[#003A87] dark:text-[#FF6B35] tracking-tighter">Hear From Toronto Pros</h2>
      </div>
      <div className="flex gap-8 overflow-x-auto px-4 pb-12 snap-x no-scrollbar">
        <TestimonialCard 
          name="Manuel T." biz="Maple Leaf HVAC" thumb="https://picsum.photos/seed/hvac1/400/225"
          quote="The AI handles after-hours calls better than our old service. Customers think it's a real person."
        />
        <TestimonialCard 
          name="Ian J." biz="Comfort Pro" thumb="https://picsum.photos/seed/hvac2/400/225"
          quote="ROI hit in the first month. We're capturing calls we used to lose to competitors."
        />
        <TestimonialCard 
          name="Rishabh C." biz="Climate Control Experts" thumb="https://picsum.photos/seed/hvac3/400/225"
          quote="The calendar integration is seamless. No more double-bookings or missed appointments."
        />
      </div>
    </section>
  );
};
