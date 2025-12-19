import React, { useState, useEffect } from "react";
import NormalButton from "../ui/NormalButton.jsx";
import Icons from "../ui/Icon.jsx";

const StickyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic: Show scroll button after 20% of page height
      const scrollThreshold = document.documentElement.scrollHeight * 0.2;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed mb-[60px] bottom-0 left-0 w-full bg-transparent pointer-events-none z-[999] flex flex-col sm:flex-row justify-between items-center sm:items-end p-4 md:p-8 lg:p-10 gap-4">
      
      <div className="pointer-events-auto w-full sm:w-auto order-2 sm:order-1">
        <NormalButton 
          content="BUY MORE, SAVE MORE | GET1FREE" 
          bg="bg-black" 
          noHover={true} 
          className="sm:w-auto text-[10px] md:text-[12px] lg:text-[14px] tracking-[0.15em] py-2 px-4 lg:px-8 shadow-2xl rounded-full md:rounded-lg" 
        />
      </div>

      <div 
        className={`pointer-events-auto order-1 sm:order-2 self-end sm:self-auto transition-all duration-500 transform ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
        } mb-[40px] `}
      >
        <NormalButton
          content={<Icons icon="ph:arrow-up-bold" size={20} />}
          bg="bg-white"
          className="!h-[40px] !w-[40px] md:!h-[50px] md:!w-[50px] !rounded-full !px-0 flex items-center justify-center shadow-xl border border-gray-100 text-black hover:bg-black hover:text-white transition-colors" 
          noHover={false}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  );
};

export default StickyComponent;