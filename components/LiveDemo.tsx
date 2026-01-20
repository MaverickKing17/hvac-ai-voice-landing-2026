
import React, { useState, useEffect, useRef } from 'react';
import { Waveform } from './Waveform';

const SCENARIOS = [
  { 
    id: 'emergency', 
    label: "Emergency: No Heat", 
    summary: "AI identified emergency, checked calendar, booked same-day slot.",
    score: "9/10",
    action: "Dispatched to on-call technician",
    transcript: [
      { speaker: "Customer", text: "Help! My furnace stopped working and it's -15 outside!" },
      { speaker: "Peel AI", text: "I'm so sorry to hear that. That is definitely an emergency. I see we have a technician available in 2 hours. Should I book that for you?" },
      { speaker: "Customer", text: "Yes, please! As soon as possible." },
      { speaker: "Peel AI", text: "Done. Alex is on his way. I've sent a confirmation text to your phone now." }
    ]
  },
  { 
    id: 'quote', 
    label: "Request: AC Quote", 
    summary: "Qualified lead, gathered unit age, booked consultation.",
    score: "7/10",
    action: "Scheduled sales call",
    transcript: [
      { speaker: "Customer", text: "I'm looking to replace my old AC unit." },
      { speaker: "Peel AI", text: "I can help with that! Roughly how old is your current system?" },
      { speaker: "Customer", text: "About 15 years old. It's struggling." },
      { speaker: "Peel AI", text: "Understood. I can schedule a free estimate for tomorrow morning at 9 AM. Does that work?" }
    ]
  }
];

export const LiveDemo: React.FC = () => {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const activeScenario = SCENARIOS.find(s => s.id === activeId)!;
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setVisibleLines(0);
    if (isPlaying) {
      const interval = setInterval(() => {
        setVisibleLines(prev => {
          if (prev >= activeScenario.transcript.length) {
            clearInterval(interval);
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, activeId, activeScenario.transcript.length]);

  return (
    <section id="demo-section" className="py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#003A87] dark:text-[#FF6B35] mb-6">Experience It Yourself</h2>
          <p className="text-xl text-gray-500">Click to hear how the AI handles different scenarios</p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 space-y-4">
            {SCENARIOS.map(s => (
              <button 
                key={s.id}
                onClick={() => { setActiveId(s.id); setIsPlaying(false); }}
                className={`w-full text-left p-6 rounded-2xl font-bold transition-all border-2 ${activeId === s.id ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg scale-105' : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/10 hover:border-[#FF6B35]/30'}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-8 glass-card rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-12">
               <button 
                onClick={() => { setIsPlaying(true); setVisibleLines(0); }}
                className="w-20 h-20 bg-[#003A87] rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-xl"
               >
                 <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
               <div className="flex-1 px-8">
                 <Waveform />
               </div>
               <div className="text-xs font-bold text-gray-400 dark:text-white/40 tracking-widest uppercase">Live Transcript</div>
            </div>

            <div className="flex-1 space-y-6 mb-12">
              {activeScenario.transcript.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={`flex flex-col ${line.speaker === 'Peel AI' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{line.speaker}</span>
                  <div className={`max-w-[80%] p-4 rounded-2xl font-medium text-sm md:text-base ${line.speaker === 'Peel AI' ? 'bg-[#003A87] text-white rounded-tr-none' : 'bg-gray-100 dark:bg-white/10 dark:text-gray-200 rounded-tl-none'}`}>
                    {line.text}
                  </div>
                </div>
              ))}
              {!isPlaying && visibleLines === 0 && (
                <div className="h-full flex items-center justify-center text-gray-400 font-bold italic">
                  Click play to start scenario...
                </div>
              )}
            </div>

            <div className="bg-[#FF6B35]/5 dark:bg-[#FF6B35]/10 border border-[#FF6B35]/20 p-6 rounded-3xl">
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 <div>
                   <span className="text-[10px] font-bold text-[#FF6B35] uppercase block mb-1">What Happened?</span>
                   <p className="text-xs dark:text-gray-300 leading-relaxed font-semibold">{activeScenario.summary}</p>
                 </div>
                 <div>
                   <span className="text-[10px] font-bold text-[#FF6B35] uppercase block mb-1">Lead Score</span>
                   <p className="text-xl font-black text-[#003A87] dark:text-white">{activeScenario.score}</p>
                 </div>
                 <div className="col-span-2 md:col-span-1">
                   <span className="text-[10px] font-bold text-[#FF6B35] uppercase block mb-1">Next Action</span>
                   <p className="text-xs dark:text-gray-300 font-black">{activeScenario.action}</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
