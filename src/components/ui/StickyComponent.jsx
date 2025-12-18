import React, { useState, useEffect } from "react";
import NormalButton from "../ui/NormalButton.jsx";
import Icons from "../ui/Icon.jsx";

const StickyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate 20% of the total document height
      const scrollThreshold = document.documentElement.scrollHeight * 0.2;
      
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* Parent Div: Background set to transparent (bg-none) */
    <div className="fixed bottom-0 left-0 w-full bg-none pointer-events-none z-50 flex justify-between items-end pb-10">
      
      {/* 2nd Child: ALWAYS VISIBLE - Left side */}
      <div className="ml-4 md:ml-10 pointer-events-auto">
        <NormalButton 
          content="BUY MORE, SAVE MORE | GET1FREE" 
          bg="bg-black" 
          noHover={true} 
          className="text-[12px] md:text-[16px] tracking-widest py-3 px-6 shadow-xl" 
        />
      </div>

      {/* 1st Child: VISIBLE ONLY AFTER 20% SCROLL - Right side */}
      <div 
        className={`mr-4 md:mr-10 mb-24 transition-all duration-500 pointer-events-auto ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <NormalButton
          content={<Icons icon="heroicons:arrow-up" size={24} />}
          bg="bg-black"
          className="!h-[45px] !w-[45px] md:!h-[55px] md:!w-[55px] !rounded-full !px-0 flex items-center justify-center shadow-2xl" 
          noHover={true}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>

    </div>
  );
};

export default StickyComponent;