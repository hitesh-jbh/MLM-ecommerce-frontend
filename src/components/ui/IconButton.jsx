import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip"; // Import your Tooltip component

function IconButton({
  icon,
  iconSize = "24px",
  badge,
  to,
  onClick,
  className = "",
  margin = "0",
  tooltip, // New prop for tooltip text
}) {
  const content = (
    <div className="relative inline-flex items-center justify-center">
      <Icon
        icon={icon}
        width={iconSize}
        height={iconSize}
        className="text-[#282c3f]"
      />

      {badge > 0 && (
        <span
          className="
            absolute -top-1.5 -right-2
            min-w-[18px] h-[18px]
            flex items-center justify-center
            rounded-full bg-[#ff3f6c]
            text-white text-[11px] font-semibold
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
    outline-none ring-0
    focus:outline-none focus:ring-0
    focus-visible:outline-none
    shadow-none
    cursor-pointer
  `;

  const style = { margin };

  // Helper function to conditionally wrap with Tooltip
  const wrapWithTooltip = (element) => {
    if (tooltip) {
      return (
        <Tooltip content={tooltip} placement="bottom">
          {element}
        </Tooltip>
      );
    }
    return element;
  };

  if (to) {
    return wrapWithTooltip(
      <Link to={to} className={`${baseClasses} ${className}`} style={style}>
        {content}
      </Link>
    );
  }

  return wrapWithTooltip(
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      style={style}
    >
      {content}
    </button>
  );
}

// export default IconButton;


// export default IconButton;
export default function App() {
    return (
        <div className="flex justify-end items-center gap-4 px-4 py-3 bg-white shadow-sm">
        <IconButton 
          icon="mdi:magnify" 
          iconSize="40px"
          tooltip="Search"
          margin="0 8px"
          className="cursor-pointer hover:text-gray-600 transition-colors"
        />
        <IconButton 
          icon="mdi:account-outline" 
          iconSize="40px"
          tooltip="Profile"
          margin="0 8px"
          className="cursor-pointer hover:text-gray-600 transition-colors"
        />
        <IconButton 
          icon="mdi:shopping-outline" 
          iconSize="40px"
          tooltip="Cart"
          margin="0 8px"
          badge={3}
          className="cursor-pointer hover:text-gray-600 transition-colors"
        />
      </div>
    )
}