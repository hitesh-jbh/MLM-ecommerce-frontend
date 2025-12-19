import React, { useState, useEffect } from 'react';
import Icons from '../ui/Icon.jsx';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 13, secs: 17 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) secs--;
        else if (mins > 0) { mins--; secs = 59; }
        else if (hours > 0) { hours--; mins = 59; secs = 59; }
        else if (days > 0) { days--; hours = 23; mins = 59; secs = 59; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("GET1FREE");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] rounded-2xl relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 my-auto">
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-50 bg-black/50 hover:bg-black text-white w-8 h-8 flex items-center justify-center rounded-full transition-all backdrop-blur-sm"
          aria-label="Close modal"
        >
          <Icons icon="heroicons:x-mark" size={18} />
        </button>

        <div className="relative aspect-[16/7] sm:aspect-[16/6] bg-gray-100">
          <img
            src="https://gentlehaus.in/cdn/shop/files/about_us_side_banner.webp?v=1751090746&width=940"
            alt="Promotion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="flex justify-center gap-1.5 sm:gap-3 -mt-6 relative z-10 px-4">
          {[
            { label: 'days', val: time.days },
            { label: 'hrs', val: time.hours },
            { label: 'mins', val: time.mins },
            { label: 'secs', val: time.secs }
          ].map((item) => (
            <div 
              key={item.label} 
              className="bg-white rounded-xl shadow-lg p-1.5 sm:p-2.5 text-center min-w-[55px] sm:min-w-[70px] border border-gray-50"
            >
              <div className="text-sm sm:text-xl font-black text-black tabular-nums leading-none">
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center px-6 py-8 sm:py-10">
          <h2 className="text-2xl sm:text-3xl font-black text-black mb-2 tracking-tight">
            BUY 2 GET 1 FREE
          </h2>
          
          <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed max-w-[280px] mx-auto">
            Add 3 items to your cart and apply code to get 1 
            <span className="text-black font-bold"> absolutely free!</span>
          </p>

          <button 
            onClick={handleCopy}
            className="group relative inline-flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl px-8 py-3 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer w-full sm:w-auto"
          >
            <div className="text-lg sm:text-xl font-black text-black tracking-widest flex items-center gap-2">
              GET1FREE
            </div>
          </button>
          
        </div>
      </div>
    </div>
  );
}