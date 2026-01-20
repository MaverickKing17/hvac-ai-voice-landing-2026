
import React, { useState, useEffect } from 'react';

export const TrustBar: React.FC = () => {
  const [calls, setCalls] = useState(1200);

  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Calls answered this week", value: calls.toLocaleString(), sub: "Real-time counter", color: "text-[#FF6B35]" },
    { label: "99.97% Uptime", value: "SLA Guaranteed", sub: "Last 90 days", color: "text-green-500" },
    { label: "2.8 Seconds", value: "Instant Response", sub: "Average answer time", color: "text-blue-500" },
    { label: "94% Satisfied", value: "Happy Customers", sub: "Prefer AI vs. voicemail", color: "text-purple-500" }
  ];

  return (
    <div className="bg-[#F5F5F5] dark:bg-[#111] py-12 border-y border-gray-200 dark:border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <p className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
              <h4 className="text-[#02295E] dark:text-gray-300 font-bold uppercase text-xs tracking-widest mb-1 group-hover:text-[#FF6B35] transition-colors">{stat.label}</h4>
              <p className="text-xs text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
