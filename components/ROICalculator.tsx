
import React, { useState, useMemo } from 'react';

export const ROICalculator: React.FC = () => {
  const [vol, setVol] = useState(150);
  const [missed, setMissed] = useState(30);
  const [value, setValue] = useState(450);

  const stats = useMemo(() => {
    const missedCalls = Math.round(vol * (missed / 100));
    const lostJobs = Math.round(missedCalls * 0.60);
    const revenueLoss = lostJobs * value;
    const aiCost = 299;
    const savings = revenueLoss - aiCost;
    const roi = ((savings / aiCost) * 100).toFixed(0);

    return { missedCalls, lostJobs, revenueLoss, savings, roi };
  }, [vol, missed, value]);

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-5xl text-center mb-16">
        <h2 className="text-4xl font-black text-[#003A87] dark:text-[#FF6B35] mb-4">Calculate Your Savings</h2>
        <p className="text-xl text-gray-500">See how much revenue you're losing to missed calls</p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-[#F5F5F5] dark:bg-white/5 rounded-[40px] p-8 md:p-16 shadow-2xl">
          <div className="space-y-12">
            <div className="space-y-6">
              <label className="flex justify-between text-lg font-bold text-[#02295E] dark:text-gray-300">
                Monthly call volume <span>{vol}</span>
              </label>
              <input 
                type="range" min="50" max="500" value={vol} 
                onChange={(e) => setVol(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
            </div>
            
            <div className="space-y-6">
              <label className="flex justify-between text-lg font-bold text-[#02295E] dark:text-gray-300">
                % of calls you miss <span>{missed}%</span>
              </label>
              <input 
                type="range" min="10" max="60" value={missed} 
                onChange={(e) => setMissed(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
            </div>

            <div className="space-y-6">
              <label className="flex justify-between text-lg font-bold text-[#02295E] dark:text-gray-300">
                Average job value <span>${value}</span>
              </label>
              <input 
                type="range" min="200" max="2000" step="50" value={value} 
                onChange={(e) => setValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-red-500/10 border-2 border-red-500/20 rounded-3xl p-8 text-center relative overflow-hidden">
               <h3 className="text-red-500 font-bold uppercase text-xs tracking-widest mb-4">Potential monthly revenue loss</h3>
               <p className="text-5xl font-black text-red-600 mb-6">${stats.revenueLoss.toLocaleString()}</p>
               <div className="space-y-2 text-sm font-semibold text-red-800/60 dark:text-red-400">
                  <p>{stats.missedCalls} missed calls/month</p>
                  <p>× 60% conversion rate = {stats.lostJobs} lost jobs</p>
                  <p>× ${value} average = ${stats.revenueLoss.toLocaleString()} lost</p>
               </div>
            </div>

            <div className="bg-green-500/10 border-2 border-green-500/20 rounded-3xl p-8 text-center">
               <div className="flex flex-col gap-2">
                 <div className="flex justify-between font-bold text-green-700 dark:text-green-400">
                    <span>AI Cost:</span>
                    <span>$299/mo</span>
                 </div>
                 <div className="flex justify-between font-black text-2xl text-green-800 dark:text-green-300">
                    <span>YOU SAVE:</span>
                    <span>${stats.savings.toLocaleString()}/mo</span>
                 </div>
               </div>
               <div className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-full font-black text-lg">
                 {stats.roi}% ROI
               </div>
            </div>
            
            <button className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-black text-xl hover:scale-105 transition-transform">
               START 14-DAY FREE TRIAL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
