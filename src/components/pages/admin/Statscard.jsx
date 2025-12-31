import React from 'react'

function StatCard({ title, value, icon }) {
  return (
    <div
      className="
        flex items-center gap-3
        px-3 py-2
        w-full max-w-[240px]
        rounded-lg
        bg-white dark:bg-neutral-900
        shadow-sm
      "
    >
      {/* Icon */}
      <div className="flex items-center justify-center bg-gray-100 rounded-md w-9 h-9 dark:bg-neutral-800">
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col leading-tight">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-base font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export default StatCard;