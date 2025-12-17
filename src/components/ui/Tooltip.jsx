import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

const Tooltip = ({
  children,
  content = "content",
  title,
  className = "btn btn-dark",
  placement = "top",
  arrow = true,
  animation = "shift-away",
  trigger = "mouseenter focus",
  interactive = false,
  duration = 200,
}) => {
  return (
    <Tippy
      // Content is wrapped in a span with larger font and padding
      content={
        <span className="text-[18px] px-3 py-2 block font-medium leading-tight">
          {content}
        </span>
      }
      placement={placement}
      arrow={arrow}
      animation={animation}
      trigger={trigger}
      interactive={interactive}
      duration={duration}
      // Increased maxWidth to accommodate the larger text size
      maxWidth={450} 
    >
      {/* Standardized the trigger: if children exist, use them; 
          otherwise, fallback to a button with the title prop.
      */}
      {children ? (
        children
      ) : (
        <button type="button" className={className}>
          {title}
        </button>
      )}
    </Tippy>
  );
};

export default Tooltip;