
import React from 'react';

export const Waveform: React.FC = () => {
  return (
    <div className="flex items-end justify-center gap-1 h-12">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="waveform-bar w-1.5 bg-gradient-to-t from-[#FF6B35] to-[#FF8C61] rounded-full"
          style={{ animationDelay: `${i * 0.05}s`, height: `${Math.random() * 80 + 20}%` }}
        />
      ))}
    </div>
  );
};
