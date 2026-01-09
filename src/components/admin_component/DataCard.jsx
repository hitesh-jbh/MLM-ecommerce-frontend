import React from "react";

const Datacard = ({
  title,
  value,
  subText,
  change,
  icon,
  bg = "bg-white",
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm 
      ${bg} w-full max-w-[260px]`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/60">
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="text-sm font-medium leading-none text-gray-700">
          {title}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-semibold text-gray-900">
            {value}
          </span>

          {subText && (
            <span className="text-sm text-gray-500">
              {subText}
            </span>
          )}
        </div>

        {change && (
          <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1">
            {change} <span className="text-[10px]">▼</span>
          </p>
        )}
      </div>
    </div>
  );
};


export default Datacard;
