import React from 'react';

const NormalButton = ({ 
  content, 
  bg = "bg-white", 
  hoverBg,
  hoverText = "hover:text-white", 
  width = "auto", 
  className = "",
  noBorder = false,
  noHover = false,
  onClick
}) => {
  
  const isBlackBg = bg.includes('black');
  const textColor = isBlackBg ? 'text-white' : 'text-black';

  // Responsive Width Logic
  const isFullWidth = width === "100%";
  const inlineStyle = !isFullWidth && width !== "auto" ? { width: width } : {};

  return (
    <button
      onClick={onClick}
      style={inlineStyle}
      className={`
        /* Base Flex Layout */
        flex items-center justify-center text-center transition-all duration-300
        
        /* Dynamic Background & Text */
        ${bg} 
        ${textColor} 
        
        /* Width Logic */
        ${isFullWidth ? 'w-full' : 'w-auto'}
        
        /* REFINED DIMENSIONS */
        /* Reduced from 48/55px to 42/48px for a sleeker look */
        h-[42px] md:h-[48px] 
        px-6 md:px-8
        
        /* TYPOGRAPHY */
        /* Smaller font + wide tracking = high-end look */
        text-[10px] sm:text-[11px] md:text-[12px] 
        uppercase tracking-[0.15em] font-bold
        rounded-md 
        
        /* BORDER */
        ${noBorder ? 'border-none' : 'border border-black/10 md:border-black'}
        
        /* INTERACTION */
        ${!noHover ? `
          ${hoverBg} 
          ${hoverText} 
          cursor-pointer
        ` : 'cursor-default'}
        
        /* Touch Feedback */
        active:scale-[0.97] active:opacity-80
        
        /* Custom Override */
        ${className}
      `}
    >
      <span className="whitespace-nowrap">{content}</span>
    </button>
  );
};

export default NormalButton;