
import React from 'react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#02295E] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <button onClick={() => scrollTo('home')} className="block">
            <img src="https://promo.peelheating.ca/wp-content/uploads/2025/10/Peel_Dark.png" alt="Peel logo" className="w-44 invert" />
          </button>
          <p className="text-gray-400 font-medium leading-relaxed">Toronto's Trusted HVAC Experts Since 1981</p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>TSSA# 000234098</p>
            <p>ECRA/ESA# 7015406</p>
          </div>
          <div className="flex gap-4">
            {['FB', 'IG', 'YT', 'LI'].map(s => <div key={s} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#FF6B35] cursor-pointer transition-colors font-bold text-xs">{s}</div>)}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-[#FF6B35]">Services</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><button onClick={() => scrollTo('diagnose')} className="hover:text-white transition-colors">Heating Repair</button></li>
            <li><button onClick={() => scrollTo('diagnose')} className="hover:text-white transition-colors">AC Installation</button></li>
            <li><button onClick={() => scrollTo('diagnose')} className="hover:text-white transition-colors">Heat Pump Installation</button></li>
            <li><button onClick={() => scrollTo('diagnose')} className="hover:text-white transition-colors">Tankless Water Heaters</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-[#FF6B35]">AI Receptionist</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
            <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">Pricing Plans</button></li>
            <li><button onClick={() => scrollTo('demo')} className="hover:text-white transition-colors">Live Demo</button></li>
            <li><button onClick={() => scrollTo('roi')} className="hover:text-white transition-colors">ROI Calculator</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-[#FF6B35]">Contact</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li className="flex items-center gap-3">
              <a href="tel:+12892728831" className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-[#FF6B35]">📞</span> (289) 272-8831
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a href="mailto:info@peelheating.ca" className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-[#FF6B35]">✉️</span> info@peelheating.ca
              </a>
            </li>
            <li className="flex items-center gap-3">
               <span className="text-[#FF6B35]">📍</span> Mississauga & GTA
            </li>
            <li className="text-xs text-gray-500 pt-4">
              AI answers 24/7 • Office: Mon-Fri 8AM-6PM
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm font-medium">© 2026 Peel Heating & Cooling. All rights reserved.</p>
        <div className="flex gap-8 text-sm text-gray-500 font-medium">
          <button className="hover:text-white">Privacy Policy</button>
          <button className="hover:text-white">Terms of Use</button>
        </div>
        <p className="text-gray-500 text-sm font-medium">Built with ❤️ in Toronto</p>
      </div>
    </footer>
  );
};
