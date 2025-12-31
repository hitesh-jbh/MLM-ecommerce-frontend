import React from "react";

function KpiCard({
  title,
  value,
  icon = null,
  size = "sm",        // sm | md | lg
  className = "",
}) {
  const sizeClasses = {
    sm: {
      container: "px-3 py-2",
      title: "text-xs",
      value: "text-base",
      icon: "w-4 h-4",
    },
    md: {
      container: "px-4 py-3",
      title: "text-sm",
      value: "text-lg",
      icon: "w-5 h-5",
    },
    lg: {
      container: "px-5 py-4",
      title: "text-base",
      value: "text-xl",
      icon: "w-6 h-6",
    },
  };

  const styles = sizeClasses[size];

  return (
    <div
      className={`flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm
      dark:bg-black dark:text-white dark:border-gray-800
      ${styles.container} ${className}`}
    >
      <div>
        <p className={`font-medium text-gray-600 dark:text-gray-400 ${styles.title}`}>
          {title}
        </p>
        <h2 className={`font-semibold ${styles.value}`}>
          {value}
        </h2>
      </div>

      {icon && (
        <div className="ml-3 text-gray-500 dark:text-gray-400">
          {React.cloneElement(icon, {
            className: styles.icon,
          })}
        </div>
      )}
    </div>
  );
}

export default KpiCard;
