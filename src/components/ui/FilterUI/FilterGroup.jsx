import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterGroup = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-8 border-b border-gray-100 pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-4 group transition-all"
      >
        <h3 className="text-gray-900 font-semibold text-lg">{title}</h3>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } text-gray-400 group-hover:text-gray-600`}
        />
      </button>

      <div className={`transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {children}
      </div>
    </div>
  );
};

export default FilterGroup;