
import React, { useState, useMemo } from 'react';

type Step = 'system' | 'symptom' | 'result';
type System = 'heating' | 'cooling' | 'water';

interface DiagnosticData {
  title: string;
  severity: 'low' | 'medium' | 'high';
  likelyCause: string;
  advice: string;
}

const SYMPTOMS: Record<System, { id: string; label: string; icon: string; diagnostic: DiagnosticData }[]> = {
  heating: [
    { id: 'h1', label: 'No Heat', icon: '❄️', diagnostic: { title: 'Total System Failure', severity: 'high', likelyCause: 'Ignition failure or faulty thermostat.', advice: 'Emergency service recommended. High risk of frozen pipes in GTA winters.' } },
    { id: 'h2', label: 'Noisy Operation', icon: '🔊', diagnostic: { title: 'Mechanical Wear', severity: 'medium', likelyCause: 'Worn blower motor or loose belt.', advice: 'Schedule a repair soon to avoid complete motor burnout.' } },
    { id: 'h3', label: 'Cycling On/Off', icon: '🔄', diagnostic: { title: 'Short Cycling', severity: 'medium', likelyCause: 'Dirty filter or overheating heat exchanger.', advice: 'Try changing your filter. If issues persist, a sensor check is needed.' } },
    { id: 'h4', label: 'Strange Smell', icon: '👃', diagnostic: { title: 'Safety Alert', severity: 'high', likelyCause: 'Dust burnout or potential gas leak.', advice: 'If it smells like rotten eggs, leave the house immediately and call us from outside.' } },
  ],
  cooling: [
    { id: 'c1', label: 'Blowing Warm Air', icon: '🔥', diagnostic: { title: 'Refrigerant Issue', severity: 'medium', likelyCause: 'Low refrigerant or failed compressor.', advice: 'Likely needs a leak test and recharge.' } },
    { id: 'c2', label: 'Frozen Unit', icon: '🧊', diagnostic: { title: 'Airflow Restriction', severity: 'medium', likelyCause: 'Dirty coils or restricted return air.', advice: 'Turn off the unit to let it thaw. Do not run it while frozen.' } },
    { id: 'c3', label: 'Leaking Water', icon: '💧', diagnostic: { title: 'Clogged Drain Line', severity: 'low', likelyCause: 'Algae buildup in condensate line.', advice: 'Simple flush required. Prevents water damage to your floor.' } },
  ],
  water: [
    { id: 'w1', label: 'No Hot Water', icon: '🚿', diagnostic: { title: 'Burner/Element Failure', severity: 'high', likelyCause: 'Broken heating element or pilot light out.', advice: 'Professional repair needed to restore hot water.' } },
    { id: 'w2', label: 'Rusty Water', icon: '🟠', diagnostic: { title: 'Tank Corrosion', severity: 'medium', likelyCause: 'Sacrificial anode rod is spent.', advice: 'Your tank is starting to corrode. Replacement may be needed soon.' } },
  ]
};

export const SymptomChecker: React.FC = () => {
  const [step, setStep] = useState<Step>('system');
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const diagnosticResult = useMemo(() => {
    if (!selectedSystem || !selectedSymptomId) return null;
    return SYMPTOMS[selectedSystem].find(s => s.id === selectedSymptomId)?.diagnostic;
  }, [selectedSystem, selectedSymptomId]);

  const handleSystemSelect = (sys: System) => {
    setSelectedSystem(sys);
    setStep('symptom');
  };

  const handleSymptomSelect = (id: string) => {
    setSelectedSymptomId(id);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep('result');
    }, 1500);
  };

  const reset = () => {
    setStep('system');
    setSelectedSystem(null);
    setSelectedSymptomId(null);
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-[#003A87]/10 dark:bg-[#FF6B35]/10 rounded-full text-[#003A87] dark:text-[#FF6B35] font-black text-xs uppercase tracking-widest mb-4">
            Smart Diagnostic Tool
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#02295E] dark:text-white mb-6">What's wrong with your system?</h2>
          <p className="text-xl text-gray-500">Identify your HVAC issue in seconds with our AI triage tool.</p>
        </div>

        <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl relative min-h-[500px] flex flex-col">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-12">
            {['system', 'symptom', 'result'].map((s, idx) => (
              <div key={s} className="flex flex-col items-center gap-2 flex-1 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm z-10 transition-colors ${
                  step === s ? 'bg-[#FF6B35] text-white shadow-lg' : 
                  (idx < ['system', 'symptom', 'result'].indexOf(step) ? 'bg-[#003A87] text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-400')
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s ? 'text-[#FF6B35]' : 'text-gray-400'}`}>
                  {s}
                </span>
                {idx < 2 && (
                  <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-100 dark:bg-white/5 -z-0" />
                )}
              </div>
            ))}
          </div>

          {isAnalyzing ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-2xl font-black text-[#02295E] dark:text-white uppercase">Analyzing Symptoms...</h3>
              <p className="text-gray-500 font-medium">Comparing against common GTA furnace & AC failure patterns</p>
            </div>
          ) : step === 'system' ? (
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black text-[#02295E] dark:text-white mb-8 text-center uppercase">Select Your Equipment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button onClick={() => handleSystemSelect('heating')} className="group p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-transparent hover:border-[#FF6B35] hover:bg-white dark:hover:bg-white/10 transition-all text-center shadow-sm hover:shadow-xl">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔥</div>
                  <div className="font-black text-[#02295E] dark:text-white uppercase tracking-tight">Heating</div>
                  <div className="text-xs text-gray-500 font-bold mt-1">Furnace / Boiler</div>
                </button>
                <button onClick={() => handleSystemSelect('cooling')} className="group p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-transparent hover:border-[#FF6B35] hover:bg-white dark:hover:bg-white/10 transition-all text-center shadow-sm hover:shadow-xl">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">❄️</div>
                  <div className="font-black text-[#02295E] dark:text-white uppercase tracking-tight">Cooling</div>
                  <div className="text-xs text-gray-500 font-bold mt-1">Air Conditioner</div>
                </button>
                <button onClick={() => handleSystemSelect('water')} className="group p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-transparent hover:border-[#FF6B35] hover:bg-white dark:hover:bg-white/10 transition-all text-center shadow-sm hover:shadow-xl">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚿</div>
                  <div className="font-black text-[#02295E] dark:text-white uppercase tracking-tight">Water</div>
                  <div className="text-xs text-gray-500 font-bold mt-1">Water Heater</div>
                </button>
              </div>
            </div>
          ) : step === 'symptom' && selectedSystem ? (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <button onClick={reset} className="text-sm font-bold text-[#FF6B35] flex items-center gap-1 hover:underline">
                  ← Back to Systems
                </button>
                <h3 className="text-2xl font-black text-[#02295E] dark:text-white uppercase text-center flex-1">What's happening?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SYMPTOMS[selectedSystem].map((sym) => (
                  <button 
                    key={sym.id}
                    onClick={() => handleSymptomSelect(sym.id)}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border-2 border-transparent hover:border-[#FF6B35] transition-all text-left group"
                  >
                    <div className="text-3xl bg-white dark:bg-white/10 p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">{sym.icon}</div>
                    <div className="font-bold text-[#02295E] dark:text-gray-200">{sym.label}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : step === 'result' && diagnosticResult ? (
            <div className="flex-1 animate-in zoom-in-95 duration-500 flex flex-col items-center">
              <div className={`mb-8 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest text-white shadow-lg animate-pulse ${
                diagnosticResult.severity === 'high' ? 'bg-red-600' : 
                diagnosticResult.severity === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
              }`}>
                {diagnosticResult.severity} Priority Issue Identified
              </div>
              
              <div className="text-center mb-10">
                <h3 className="text-3xl font-black text-[#02295E] dark:text-white mb-2 uppercase">{diagnosticResult.title}</h3>
                <p className="text-gray-500 font-bold italic mb-6">Potential Cause: {diagnosticResult.likelyCause}</p>
                <div className="p-6 bg-[#003A87]/5 dark:bg-white/5 rounded-2xl border border-[#003A87]/10 dark:border-white/10 max-w-lg mx-auto">
                  <p className="text-[#02295E] dark:text-gray-300 font-medium leading-relaxed">{diagnosticResult.advice}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 w-full">
                 <button className="bg-[#FF6B35] text-white py-4 rounded-xl font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    BOOK REPAIR NOW
                 </button>
                 <button onClick={reset} className="bg-gray-100 dark:bg-white/10 text-[#02295E] dark:text-white py-4 rounded-xl font-black text-lg hover:bg-gray-200 transition-colors">
                    RE-START TOOL
                 </button>
              </div>
            </div>
          ) : null}
          
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AI Expert Model: HVAC-GPT-v2. Toronto Region</span>
          </div>
        </div>
      </div>
    </section>
  );
};
