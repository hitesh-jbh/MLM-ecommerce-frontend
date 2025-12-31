import React from 'react'

function StatCard({ title, value, icon }) {
  return (
    <div className="flex items-center px-6 py-4 text-black bg-white border border-gray-200 shadow-md dark:bg-black dark:text-white rounded-xl dark:border-gray-800">
      <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-900">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <h2 className="text-xl font-bold">
          {value}
        </h2>
      </div>

    </div>
  );
}

export default StatCard;