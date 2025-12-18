import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
// import Tooltip from "./Tooltip"; 

function IconButton({
  icon,
  iconSize = "26px", // Default for mobile
  laptopSize = "40px", // New prop for larger screens
  badge,
  to,
  onClick,
  className = "",
  margin = "0",
  tooltip,
}) {
  const content = (
    <div className="relative inline-flex items-center justify-center">
      <Icon
        icon={icon}
        /* Mobile: 30px 
           Laptop (lg): Uses the laptopSize prop (default 40px)
        */
        className={`text-[#282c3f] transition-all w-[30px] h-[30px] lg:w-[${laptopSize}] lg:h-[${laptopSize}]`}
        width={null} 
        height={null}
      />

      {badge > 0 && (
        <span
          className="
            absolute -top-1 -right-1 md:-top-2 md:-right-3
            /* Scales from 20px on mobile to 28px on laptop */
            min-w-[20px] h-[20px] lg:min-w-[28px] lg:h-[28px] px-1.5
            flex items-center justify-center
            rounded-full bg-[#d34040] 
            text-white text-[10px] lg:text-[14px] font-bold
            border-2 border-white
            z-10
          "
        >
          {badge}
        </span>
      )}
    </div>
  );

  const baseClasses = `
    inline-flex items-center justify-center
    appearance-none bg-transparent border-0
    outline-none cursor-pointer transition-transform active:scale-90
  `;

  // Margin adapts: smaller on mobile, custom on desktop
  const finalClass = `${baseClasses} ${className} mx-1 md:mx-[${margin}]`;

  if (to) {
    return (
      <Link to={to} className={finalClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={finalClass}>
      {content}
    </button>
  );
}
export default IconButton;

// Example usage in the same file for context:
// export default function App() {
//     return (
//         <div className="flex justify-end items-center gap-3 md:gap-6 px-4 md:px-8 py-4 bg-white shadow-sm">
//           <IconButton icon="mdi:magnify" laptopSize="38px" />
//           <IconButton icon="mdi:account-outline" laptopSize="38px" />
//           <IconButton icon="mdi:shopping-outline" laptopSize="38px" badge={3} />
//         </div>
//     )
// }