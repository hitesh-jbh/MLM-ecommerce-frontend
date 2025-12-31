import React, { useState } from 'react';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';

const FixedDateLabelWithDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const dateOptions = [
    { id: 1, label: '11/Dec/2025 - 12/Dec/2025' },
    { id: 2, label: '10/Dec/2025 - 11/Dec/2025' },
    { id: 3, label: '09/Dec/2025 - 10/Dec/2025' },
    { id: 4, label: '08/Dec/2025 - 09/Dec/2025' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Fixed at top right corner */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button 
            className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-300 hover:bg-gray-50 transition-all hover:shadow-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiCalendar className="text-blue-500" />
            <span className="text-gray-800 font-medium">
              11/Dec/2025 - 12/Dec/2025
            </span>
            <FiChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

         {isOpen && (
  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200">
    <div className="p-2">
      {dateOptions.map((option) => (
        <button
          key={option.id}
          className="w-full px-3 py-2.5 text-left rounded hover:bg-blue-50 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-gray-700">{option.label}</span>
        </button>
      ))}
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default FixedDateLabelWithDropdown;