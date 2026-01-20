
import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Heating', id: 'diagnose' },
    { label: 'Air Conditioning', id: 'diagnose' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Features', id: 'features' },
    { label: 'Reviews', id: 'reviews' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#0A0A0A] shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="cursor-pointer">
            <img 
              src="https://promo.peelheating.ca/wp-content/uploads/2025/10/Peel_Dark.png" 
              alt="Peel logo" 
              className="w-[176px] h-auto dark:invert"
            />
          </a>
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-[#02295E] dark:text-gray-300">
            {navLinks.map(link => (
              <button 
                key={link.label}
                onClick={() => scrollTo(link.id)} 
                className="hover:text-[#FF6B35] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="relative group">
              <button 
                onClick={() => scrollTo('demo')}
                className="flex items-center gap-1 text-[#FF6B35]"
              >
                AI Receptionist
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a 
            href="tel:+12892728831" 
            className="px-4 py-2 bg-[#FF6B35]/10 text-[#FF6B35] rounded-md font-bold text-sm"
          >
            (289) 272-8831
          </a>
          <button 
            onClick={() => scrollTo('pricing')}
            className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all transform hover:scale-105 uppercase tracking-wider"
          >
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-white/10 p-4 shadow-xl flex flex-col gap-4">
          {navLinks.map(link => (
            <button 
              key={link.label}
              onClick={() => scrollTo(link.id)} 
              className="text-left py-2 font-bold text-[#02295E] dark:text-gray-300"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => scrollTo('pricing')}
            className="bg-[#FF6B35] text-white py-3 rounded-lg font-bold uppercase"
          >
            Schedule Demo
          </button>
        </div>
      )}
    </header>
  );
};
