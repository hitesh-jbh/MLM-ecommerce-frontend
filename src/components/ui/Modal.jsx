import React, { useState, useEffect } from 'react';
import NormalButton from '../ui/NormalButton.jsx';
import Icons from '../ui/Icon.jsx';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    mins: 13,
    secs: 17
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hours, mins, secs } = prev;
        
        if (secs > 0) {
          secs--;
        } else if (mins > 0) {
          mins--;
          secs = 59;
        } else if (hours > 0) {
          hours--;
          mins = 59;
          secs = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          mins = 59;
          secs = 59;
        }
        
        return { days, hours, mins, secs };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* White Modal Container */}
      <div className="bg-white h-auto md:h-[650px] rounded-lg max-w-2xl w-full relative overflow-hidden shadow-2xl">
        
        {/* Close Button: Positioned inside the relative container at the top right */}
        <div className="absolute top-4 right-4 z-50">
          <NormalButton
            content={<Icons icon="heroicons:x-mark" size={24} />}
            bg="bg-black"
            className="!h-[40px] !w-[40px] md:!h-[45px] md:!w-[45px] !rounded-full !px-0 flex items-center justify-center" 
            noHover={true}
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Clothing Image Section */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <img
            src="https://gentlehaus.in/cdn/shop/files/about_us_side_banner.webp?v=1751090746&width=940"
            alt="Clothing collection"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 -mt-8 relative z-10 px-4">
          {['days', 'hrs', 'mins', 'secs'].map((unit) => (
            <div key={unit} className="bg-white rounded-lg shadow-lg p-4 text-center min-w-[70px]">
              <div className="text-2xl md:text-3xl font-bold text-gray-800">
                {unit === 'hrs' ? time.hours : unit === 'mins' ? time.mins : unit === 'secs' ? time.secs : time.days}
              </div>
              <div className="text-xs text-gray-600 mt-1">{unit}</div>
            </div>
          ))}
        </div>

        {/* Text Content Section */}
        <div className="text-center px-8 py-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            BUY 2 GET 1 FREE
          </h2>
          <p className="text-gray-600 text-lg md:text-2xl mb-8">
            Add 3 Items to Cart & Apply Code — Get 1 Absolutely<br className="hidden md:block" />
            FREE! Use Code | <span className="font-bold text-black">GET1FREE</span>.
          </p>

          {/* Promo Code Box */}
          <div className="inline-block border-2 border-dashed border-gray-400 rounded-lg px-8 md:px-12 py-4">
            <div className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">GET1FREE</div>
          </div>
        </div>
      </div>
    </div>
  );
}