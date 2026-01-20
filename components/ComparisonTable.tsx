
import React from 'react';

const Check = () => <span className="text-green-500 font-bold">✓</span>;
const Cross = () => <span className="text-red-500 font-bold">✕</span>;
const Warn = () => <span className="text-yellow-500 font-bold">⚠️</span>;

export const ComparisonTable: React.FC = () => {
  const rows = [
    { label: "Cost", human: "$800-1500/mo", ivr: "$200-400/mo", peel: "$299/mo" },
    { label: "Availability", human: "Bus. hours only ⚠️", ivr: "24/7 ✓", peel: "24/7 ✓" },
    { label: "Answer Speed", human: "4-6 rings ⚠️", ivr: "1-2 rings ✓", peel: "1-2 rings ✓" },
    { label: "Natural Voice", human: "Yes ✓", ivr: "No ✕", peel: "Yes ✓" },
    { label: "Books Appointments", human: "Manual ⚠️", ivr: "No ✕", peel: "Instant ✓" },
    { label: "Industry Knowledge", human: "Generic ✕", ivr: "None ✕", peel: "HVAC-trained ✓" }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-16 text-[#003A87] dark:text-[#FF6B35]">AI vs. Traditional Services</h2>
        <div className="overflow-x-auto rounded-[32px] shadow-xl">
          <table className="w-full text-left bg-white dark:bg-white/5">
            <thead>
              <tr className="bg-[#003A87] text-white">
                <th className="p-8 font-black text-lg">Feature</th>
                <th className="p-8 font-bold text-sm uppercase opacity-70">Human Service</th>
                <th className="p-8 font-bold text-sm uppercase opacity-70">Standard IVR</th>
                <th className="p-8 font-black text-xl bg-[#FF6B35]">Peel AI Voice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 font-bold text-[#02295E] dark:text-gray-300">{row.label}</td>
                  <td className="p-8 font-medium text-gray-500">{row.human}</td>
                  <td className="p-8 font-medium text-gray-500">{row.ivr}</td>
                  <td className="p-8 font-black text-[#FF6B35] bg-[#FF6B35]/5">{row.peel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
