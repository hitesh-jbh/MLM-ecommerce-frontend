import React from "react";
import { Icon } from "@iconify/react";

const Icons = ({
  icon,
  className = "",
  size, 
  rotate,
  hFlip,
  vFlip,
}) => {
  return (
    <Icon
      icon={icon}
      // If size is passed, it overrides. Otherwise, CSS classes (className) take control.
      width={size || "100%"} 
      height={size || "100%"}
      rotate={rotate}
      hFlip={hFlip}
      vFlip={vFlip}
      className={`${className} inline-block align-middle`}
    />
  );
};

export default Icons;