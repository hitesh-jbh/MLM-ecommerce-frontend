import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Icons from '../ui/Icon.jsx';

const NormalButton = ({ 
  content, 
  bg = "bg-white", 
  hoverBg = "hover:bg-gray-100",
  hoverText = "", 
  width = "auto", 
  className = "",
  noBorder = false,
  noHover = false,
  onClick
}) => {
  
  const isBlackBg = bg.includes('black');
  const textColor = isBlackBg ? 'text-white' : 'text-black';

  const hoverTextColorClass = hoverText === 'white' ? 'hover:text-white' : 
                               hoverText === 'black' ? 'hover:text-black' : '';

  // Only apply fixed width style if width is not "auto" and not a Tailwind class
  const isTailwindWidth = width.startsWith('w-');
  const inlineStyle = !isTailwindWidth && width !== "auto" ? { width: width } : {};

  return (
    <button
      onClick={onClick}
      style={inlineStyle}
      className={`
        /* Centering Logic */
        flex items-center justify-center inline-flex
        
        ${bg} 
        ${textColor} 
        ${!noHover ? hoverBg : ''}
        ${!noHover ? hoverTextColorClass : ''}
        ${isTailwindWidth ? width : ''}
        
        /* Layout & Typography */
        h-[55px] px-8 text-[20px] rounded-lg font-medium transition-all duration-200
        ${noBorder ? 'border-none' : 'border border-black'}
        
        /* Effects */
        ${!noHover ? 'hover:scale-105 active:scale-95' : 'active:opacity-80'}
        ${className}
      `}
    >
      {content}
    </button>
  );
};

export default function App() {
  const [selectedSize, setSelectedSize] = useState("XXL");
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  return (
    /* Changed items-center to items-start to prevent auto-stretching */
    <div className="flex flex-col items-start gap-6 p-10 bg-white">
      
      {/* Takes only space needed for text */}
      <NormalButton content="Shop Now" bg="bg-black" hoverBg="hover:bg-zinc-800" />
      
      {/* Takes only space needed for text */}
      <NormalButton content="Shop Now" />

      <NormalButton content="BUY MORE, SAVE MORE | GET1FREE" bg="bg-black" noHover="true" /> 

      {/* Takes exactly 600px */}
      <NormalButton 
        content="Add to cart"  
        width="600px" 
        hoverBg="hover:bg-black" 
        hoverText="white" 
      />

      <NormalButton
        content={
          <Icons 
            icon="heroicons:arrow-up" 
            size={24} // Adjust size of the arrow here
          />
        }
        bg="bg-black"
        width="55px"      // Matches the height (h-[55px]) in your NormalButton
        noHover={true}
        className="!rounded-full !px-0 flex items-center justify-center" 
      />

      {/* Size Row */}
      <div className="flex gap-2">
        {sizes.map((size) => (
          <NormalButton 
            key={size}
            content={size}
            width="65px" 
            noBorder={true}
            noHover={true}
            bg={selectedSize === size ? "bg-black" : "bg-[#f3f4f6]"} 
            className={selectedSize === size ? "text-white" : "text-black"}
            onClick={() => setSelectedSize(size)}
          />
        ))}
      </div>
    </div>
  );
}