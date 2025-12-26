import React, { useState, useRef, useEffect } from "react";
import Icons from "./Icon"; 

const RangeDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Use optional chaining to prevent "undefined" crashes
  const selectedOption = options?.find((opt) => opt.value === value);

  return (
    <div className="relative w-full min-w-[200px]" ref={dropdownRef}>
      {/* Selection Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full h-11 md:h-12 px-4 bg-white border-2 transition-all duration-200 rounded-xl ${
          isOpen ? "border-black shadow-md" : "border-gray-100 hover:border-gray-300"
        }`}
      >
        <span className="text-[10px] md:text-xs font-bold text-gray-900 uppercase tracking-wider truncate mr-2">
          {selectedOption ? selectedOption.label : "Select Size"}
        </span>
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <Icons icon="ph:caret-down-bold" size={14} />
        </div>
      </button>

      {/* Options Menu */}
      <div
        className={`absolute bottom-full mb-2 left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom z-[110] ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="py-2 max-h-[250px] overflow-y-auto no-scrollbar">
          <div className="px-5 py-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Select Size
          </div>
          {options?.map((opt, index) => (
            <button
              key={`${opt.value}-${index}`} // Fixes unique "key" error (image_23dd6a.png)
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between w-full px-5 py-3 text-xs md:text-sm transition-colors ${
                value === opt.value ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="font-bold">{opt.label}</span>
              {value === opt.value && (
                <Icons icon="ph:check-circle-fill" size={18} className="text-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeDropdown;