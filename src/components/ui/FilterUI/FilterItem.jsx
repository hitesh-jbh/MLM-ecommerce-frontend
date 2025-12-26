import React from 'react';
import { Check } from 'lucide-react';

const FilterItem = ({ label, count, icon, isSelected, onToggle }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition group">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="sr-only"
      />
      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
        isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300 group-hover:border-amber-400'
      }`}>
        {isSelected && <Check size={14} strokeWidth={3} />}
      </div>
      
      <div className="flex-1 flex items-center gap-3">
        {icon && <span className="text-lg">{icon}</span>}
        <span className={`${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
          {label}
        </span>
      </div>

      {count !== undefined && (
        <span className="text-gray-500 text-sm bg-gray-100 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </label>
  );
};

export default FilterItem;