import React, { useState, useRef, useEffect } from 'react';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';

const FixedDateLabelWithDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('11/Dec/2025 - 12/Dec/2025');
  const dropdownRef = useRef(null);

  const dateOptions = [
    { id: 1, label: '11/Dec/2025 - 12/Dec/2025' },
    { id: 2, label: '10/Dec/2025 - 11/Dec/2025' },
    { id: 3, label: '09/Dec/2025 - 10/Dec/2025' },
    { id: 4, label: '08/Dec/2025 - 09/Dec/2025' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-50 p-4 md:p-8">
      {/* Responsive Wrapper: 
          - Mobile: Fixed to bottom or top-center 
          - Desktop: Fixed to top-right 
      */}
      <div  ref={dropdownRef}>
        <div className="relative">
          <button 
            className="flex items-center justify-between w-full md:w-auto gap-3 bg-white px-4 py-3 rounded-xl shadow-2xl border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-3">
              <FiCalendar className="text-blue-500 shrink-0" />
              <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                {selectedDate}
              </span>
            </div>
            <FiChevronDown className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            /* Dropdown Alignment:
               - Mobile: Opens upwards (since button is at bottom)
               - Desktop: Opens downwards
            */
            <div className="absolute bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 right-0 w-full md:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-1.5">
                <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Select Date Range
                </div>
                {dateOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`w-full px-3 py-3 text-left rounded-lg transition-colors flex items-center justify-between ${
                      selectedDate === option.label ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedDate(option.label);
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-sm">{option.label}</span>
                    {selectedDate === option.label && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
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