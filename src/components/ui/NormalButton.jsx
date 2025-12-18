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

  // Responsive Width Logic
  const isTailwindWidth = width.startsWith('w-');
  const inlineStyle = !isTailwindWidth && width !== "auto" ? { width: width } : {};

  return (
    <button
      onClick={onClick}
      style={inlineStyle}
      className={`
        flex items-center justify-center inline-flex
        
        ${bg} 
        ${textColor} 
        ${!noHover ? hoverBg : ''}
        ${!noHover ? hoverTextColorClass : ''}
        ${isTailwindWidth ? width : ''}
        
        /* RESPONSIVE LAYOUT & TYPOGRAPHY */
        /* Height: 45px on mobile, 55px on desktop */
        h-[45px] md:h-[55px] 
        /* Padding: smaller on mobile */
        px-4 md:px-8 
        /* Font: 16px on mobile, 20px on desktop */
        text-[16px] md:text-[20px] 
        rounded-lg font-medium transition-all duration-200
        
        ${noBorder ? 'border-none' : 'border border-black'}
        
        /* Effects: Hover scale disabled on touch devices for better UX */
        ${!noHover ? 'md:hover:scale-105 active:scale-95' : 'active:opacity-80'}
        ${className}
      `}
    >
      {content}
    </button>
  );
};
export default NormalButton;

// export default function App() {
//   const [selectedSize, setSelectedSize] = useState("XXL");
//   const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

//   return (
//     <div className="flex flex-col items-start gap-4 md:gap-6 p-4 md:p-10 bg-white w-full">
      
//       {/* Standard Buttons */}
//       <NormalButton content="Shop Now" bg="bg-black" hoverBg="hover:bg-zinc-800" />
//       <NormalButton content="Shop Now" />

//       {/* Full width promo bar on mobile, auto width on desktop */}
//       <NormalButton 
//         content="BUY MORE, SAVE MORE | GET1FREE" 
//         bg="bg-black" 
//         noHover={true} 
//         className="w-full md:w-auto text-[14px] md:text-[20px]" 
//       /> 

//       {/* Responsive width: Full width on mobile, 600px on desktop */}
//       <NormalButton 
//         content="Add to cart"  
//         width="100%" 
//         hoverBg="hover:bg-black" 
//         hoverText="white" 
//         className="max-w-[600px]"
//       />

//       {/* Circle Icon Button */}
//       <NormalButton
//         content={<Icons icon="heroicons:arrow-up" size={24} />}
//         bg="bg-black"
//         /* Scale size responsive */
//         className="!h-[45px] !w-[45px] md:!h-[55px] md:!w-[55px] !rounded-full !px-0 flex items-center justify-center" 
//         noHover={true}
//       />

//       {/* Responsive Size Row: Wraps to next line on small screens */}
//       <div className="flex flex-wrap gap-2 w-full">
//         {sizes.map((size) => (
          // <NormalButton 
          //   key={size}
          //   content={size}
          //   className={`
          //     !min-w-[50px] md:!min-w-[65px] 
          //     !h-[45px] md:!h-[55px]
          //     ${selectedSize === size ? "text-white" : "text-black"}
          //   `}
          //   noBorder={true}
          //   noHover={true}
          //   bg={selectedSize === size ? "bg-black" : "bg-[#f3f4f6]"} 
          //   onClick={() => setSelectedSize(size)}
          // />
//         ))}
//       </div>
//     </div>
//   );
// }