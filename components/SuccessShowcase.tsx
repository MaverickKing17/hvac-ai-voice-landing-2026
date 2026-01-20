
import React, { useState } from 'react';
import { Waveform } from './Waveform';

interface SuccessStory {
  id: string;
  company: string;
  location: string;
  scenario: string;
  outcome: string;
  revenue: string;
  timestamp: string;
  avatar: string;
}

const STORIES: SuccessStory[] = [
  {
    id: '1',
    company: 'Maple Leaf HVAC',
    location: 'Mississauga',
    scenario: 'Emergency Furnace Repair (No Heat)',
    outcome: 'Appointment Booked @ 11:42 PM',
    revenue: '$450.00',
    timestamp: '2 mins ago',
    avatar: 'M'
  },
  {
    id: '2',
    company: 'GTA Comfort Pro',
    location: 'Brampton',
    scenario: 'Full AC System Replacement Quote',
    outcome: 'Qualified Lead Sent to Sales',
    revenue: '$8,500.00 Est.',
    timestamp: '15 mins ago',
    avatar: 'G'
  },
  {
    id: '3',
    company: 'York Region Cooling',
    location: 'Vaughan',
    scenario: 'Heat Pump Maintenance Inquiry',
    outcome: 'Service Plan Sold via SMS Link',
    revenue: '$199.00',
    timestamp: '1 hour ago',
    avatar: 'Y'
  }
];

export const SuccessShowcase: React.FC = () => {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A] overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-[#003A87] dark:text-[#FF6B35] tracking-tighter mb-4">
              AI Performance Gallery
            </h2>
            <p className="text-xl text-gray-500 font-medium">
              See the real-world impact Peel AI has on local GTA businesses every single day.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-green-500/10 px-6 py-3 rounded-2xl border border-green-500/20">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-green-700 dark:text-green-400 font-black text-sm uppercase tracking-widest">
              Live Activity Tracker
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {STORIES.map((story) => (
          <div 
            key={story.id} 
            className="glass-card p-8 rounded-[40px] shadow-2xl relative group hover:scale-105 transition-all duration-500 border-white/50"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-[#003A87] dark:bg-[#FF6B35] rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg">
                {story.avatar}
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-[#FF6B35] uppercase tracking-widest block mb-1">Status</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[10px] font-black uppercase">
                  Captured
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <h4 className="font-black text-[#02295E] dark:text-white uppercase text-xs tracking-widest mb-1">{story.company}</h4>
                <p className="text-xs text-gray-400 font-bold">{story.location}, ON</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                <p className="text-sm font-bold text-[#02295E] dark:text-gray-200 mb-1">{story.scenario}</p>
                <p className="text-[10px] text-[#FF6B35] font-black uppercase">{story.outcome}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Rev. Captured</span>
                  <span className="text-lg font-black text-[#003A87] dark:text-white">{story.revenue}</span>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-bold text-gray-400 uppercase block">Processed</span>
                   <span className="text-xs font-black dark:text-gray-300">{story.timestamp}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
              className="w-full py-4 rounded-xl border-2 border-[#003A87]/10 dark:border-white/10 flex items-center justify-center gap-3 group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] group-hover:text-white transition-all font-black text-sm uppercase tracking-wider"
            >
              {activeStory === story.id ? (
                <>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  STOP RECORDING
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  HEAR CALL RECORDING
                </>
              )}
            </button>

            {activeStory === story.id && (
              <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <Waveform />
                <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
                  Simulating Natural Canadian Voice...
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 mt-20">
        <div className="glass-card rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-white to-gray-50 dark:from-white/5 dark:to-transparent">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black text-[#003A87] dark:text-[#FF6B35] mb-2 uppercase tracking-tighter">
              Stop losing money to voicemail.
            </h3>
            <p className="text-lg text-gray-500 font-medium">
              Join dozens of local HVAC companies in Brampton, Mississauga & Toronto.
            </p>
          </div>
          <button 
            onClick={() => scrollTo('pricing')}
            className="px-12 py-5 bg-[#003A87] text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-blue-900/20 uppercase tracking-wider"
          >
            Claim Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};
