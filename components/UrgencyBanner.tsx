
import React, { useState, useEffect } from 'react';

export const UrgencyBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#02295E] text-white text-center py-2 px-4 text-sm font-semibold tracking-wide">
      ⚡ Book a demo today and get setup priority — <span className="text-[#FF6B35]">{timeLeft}</span> left
    </div>
  );
};
