
import React from 'react';

const INTEGRATIONS = [
  { name: 'Google Gemini', role: 'Context & Reasoning', icon: '🧠', desc: 'The "Brain" that understands complex GTA HVAC terminology and homeowner needs.' },
  { name: 'LiveKit', role: 'Voice Infrastructure', icon: '🎙️', desc: 'Enterprise-grade real-time audio delivery with <100ms latency across North America.' },
  { name: 'ServiceTitan', role: 'Field Management', icon: '🛠️', desc: 'Direct booking and lead synchronization for high-volume HVAC service fleets.' },
  { name: 'Jobber', role: 'CRM Sync', icon: '📋', desc: 'Automatic client creation and quote logging directly from voice conversations.' },
];

export const Integrations: React.FC = () => {
  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[#003A87] dark:text-[#FF6B35] uppercase tracking-tighter mb-4">An Integrated Powerhouse</h2>
          <p className="text-lg text-gray-500 font-medium">Built on global-scale infrastructure for local-scale reliability.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTEGRATIONS.map((item) => (
            <div key={item.name} className="glass-card p-8 rounded-[32px] hover:border-[#FF6B35] transition-all group">
              <div className="text-4xl mb-6 bg-white dark:bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="font-black text-[#003A87] dark:text-white text-lg mb-1 uppercase tracking-tighter">{item.name}</h4>
              <p className="text-[10px] font-black text-[#FF6B35] uppercase tracking-widest mb-4">{item.role}</p>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
