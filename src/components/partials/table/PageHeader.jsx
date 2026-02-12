import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

// --- Custom Hook ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// --- Component ---
const PageHeader = ({ 
    itemCount, 
    searchQuery, 
    onSearchChange, 
    onFilterClick, 
    title = "Items Found",
    categories = [], 
    selectedCategory,
    onCategoryChange,
    onReset,
    isFiltered
}) => {
    const [localSearch, setLocalSearch] = useState(searchQuery);
    const debouncedSearchTerm = useDebounce(localSearch, 500);

    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        onSearchChange(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearchChange]);

    const handleClear = () => {
        setLocalSearch("");
        onSearchChange("");
    };

    return (
        <div className="bg-white border border-gray-100 rounded-2xl mb-6 shadow-sm">
            <div className="max-w-[1600px] mx-auto px-6 py-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    
                    {/* Left: Count */}
                    <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={onFilterClick} 
                                className="lg:hidden p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <Icon icon="lucide:filter" className="text-gray-600 w-[18px] h-[18px]"/>
                            </button>
                            
                            <h1 className="font-extrabold text-xl text-gray-800 tracking-tight">
                                {itemCount} <span className="text-gray-400 font-medium text-base ml-1">{title}</span>
                            </h1>
                        </div>

                        {isFiltered && (
                            <button 
                                onClick={onReset}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all"
                            >
                                <Icon icon="lucide:rotate-ccw" className="w-[14px] h-[14px]" /> Reset
                            </button>
                        )}
                    </div>

                    {/* Right: Search Input */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:flex-1 lg:justify-end">
                        
                        {categories.length > 0 && (
                            <div className="relative w-full sm:w-52">
                                <select 
                                    value={selectedCategory}
                                    onChange={(e) => onCategoryChange(e.target.value)}
                                    className="w-full appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:bg-white focus:border-black transition-all text-sm font-bold text-gray-700 cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <Icon icon="lucide:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                            </div>
                        )}

                        <div className="w-full sm:max-w-md relative group">
                            <Icon 
                                icon="lucide:search"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors w-[18px] h-[18px]" 
                            />
                            <input 
                                type="text"
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                placeholder="Search by ID, Name or Email..." 
                                className="w-full pl-12 pr-10 py-2.5 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all text-sm"
                            />
                            {localSearch && (
                                <button 
                                    onClick={handleClear}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                                >
                                    <Icon icon="lucide:x" className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;