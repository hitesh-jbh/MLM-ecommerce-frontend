import React from "react";
import { Icon } from "@iconify/react";

const Icons = ({
  icon,
  className = "",
  size = 50,          // SINGLE size prop
  rotate,
  hFlip,
  vFlip,
  noborder,
//   bodyClass = "p-3",
}) => {
  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      rotate={rotate}
      hFlip={hFlip}
      vFlip={vFlip}
      className={className}
    />
  );
};

export default Icons;
