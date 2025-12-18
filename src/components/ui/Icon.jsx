import React from "react";
import { Icon } from "@iconify/react";

const Icons = ({
  icon,
  className = "",
  size,               // Can still pass a number if you want fixed size
  rotate,
  hFlip,
  vFlip,
}) => {
  return (
    <Icon
      icon={icon}
      /* If 'size' is provided, it uses it. 
         If not, we set it to null/100% so we can control size 
         entirely via the 'className' prop (e.g., className="w-6 h-6 md:w-10 md:h-10")
      */
      width={size || "100%"} 
      height={size || "100%"}
      rotate={rotate}
      hFlip={hFlip}
      vFlip={vFlip}
      className={`${className} inline-block`}
    />
  );
};

export default Icons;

/* ================= EXAMPLE USAGE ================= */

function Example() {
  return (
    <div className="p-10">
      {/* Responsive behavior: 
        - Default (Mobile): w-8 (32px)
        - Desktop (md): w-16 (64px)
      */}
      <Icons 
        icon="mdi:home" 
        className="w-8 h-8 md:w-16 md:h-16 text-blue-500" 
      />
      
      {/* Fixed size still works if needed */}
      <Icons 
        icon="mdi:heart" 
        size={40} 
        className="text-red-500" 
      />
    </div>
  );
}