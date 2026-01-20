
import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#0A0A0A] shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <img 
            src="https://promo.peelheating.ca/wp-content/uploads/2025/10/Peel_Dark.png" 
            alt="Peel logo" 
            className="w-[176px] h-auto dark:invert"
          />
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-[#02295E] dark:text-gray-300">
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Heating</a>
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Air Conditioning</a>
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Water Heaters</a>
            <div className="relative group">
              <button className="flex items-center gap-1 text-[#FF6B35]">
                AI Receptionist
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <a href="#" className="hover:text-[#FF6B35] transition-colors">Offers & Rebates</a>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="px-4 py-2 bg-[#FF6B35]/10 text-[#FF6B35] rounded-md font-bold text-sm">
            (289) 272-8831
          </div>
          <button className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all transform hover:scale-105 uppercase tracking-wider">
            Schedule Demo
          </button>
        </div>
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>
      </div>
    </header>
  );
};
