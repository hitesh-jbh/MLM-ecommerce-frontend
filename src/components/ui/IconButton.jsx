import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

function IconButton({
  icon,
  iconSize = "28px", // Mobile size
  laptopSize = "38px", // Desktop size
  badge,
  to,
  onClick,
  className = "",
  margin = "4px",
  tooltip,
}) {
  const content = (
    <div 
      className="relative inline-flex items-center justify-center"
      // We pass the sizes as CSS variables so they can be accessed in Tailwind's arbitrary values safely
      style={{ '--mobile-size': iconSize, '--laptop-size': laptopSize }}
    >
      <Icon
        icon={icon}
        // Responsive size using CSS variables
        className={`text-[#282c3f] transition-all w-[var(--mobile-size)] h-[var(--mobile-size)] lg:w-[var(--laptop-size)] lg:h-[var(--laptop-size)]`}
        width={null} 
        height={null}
      />

      {badge > 0 && (
        <span
          className="
            absolute -top-1 -right-1 md:-top-1.5 md:-right-2
            min-w-[18px] h-[18px] lg:min-w-[22px] lg:h-[22px] px-1
            flex items-center justify-center
            rounded-full bg-[#d34040] 
            text-white text-[9px] lg:text-[11px] font-bold
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

  // Apply responsive margins
  const finalClass = `${baseClasses} ${className}`;

  return to ? (
    <Link to={to} className={finalClass} style={{ margin: `0 ${margin}` }}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={finalClass} style={{ margin: `0 ${margin}` }}>
      {content}
    </button>
  );
}

export default IconButton;