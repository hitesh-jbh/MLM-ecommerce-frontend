import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import Icons from '../../ui/Icon';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    role: "All",
    rank: "All",
    startDate: "",
    endDate: ""
  });

  // Whenever the local 'filters' state changes, notify the parent component
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        {/* Role Select - Includes ADMIN/STAFF based on backend */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Role</label>
          <select name="role" value={filters.role} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50">
            <option value="All">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="STAFF">Staff</option>
            <option value="CUSTOMER">Customer</option>
          </select>
        </div>

        {/* Rank Select */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Rank</label>
          <select name="rank" value={filters.rank} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50">
            <option value="All">All Ranks</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>

        {/* Date: From */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Registered From</label>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" />
        </div>

        {/* Date: To */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Registered To</label>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" />
        </div>

        {/* Add Staff Button - Links to POST /admin/staff */}
        

      </div>
    </div>
  );
};

export default FilterBar;



// import React from 'react';
// import { FiPlus, FiChevronDown } from 'react-icons/fi';

// const FilterBar = () => {
//   return (
//     <div className="w-full bg-white border border-gray-200 rounded-xl p-3 md:p-4 shadow-sm">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
//         {/* Left Side: Title */}
//         <div className="flex items-center">
//           <h2 className="text-gray-700 font-semibold text-lg whitespace-nowrap">
//             All Users
//           </h2>
//         </div>

//         {/* Right Side: Filters and Actions */}
//         <div className="flex flex-wrap items-center gap-2 md:gap-3">
          
//           {/* Level Dropdown */}
//           <div className="relative flex-1 min-w-[120px] md:flex-none">
//             <select className="w-full appearance-none bg-white border border-gray-300 text-gray-600 py-2 pl-3 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer">
//               <option>Level: All</option>
//               <option>Level 1</option>
//               <option>Level 2</option>
//             </select>
//             <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>

//           {/* Date Range Dropdown */}
//           <div className="relative flex-1 min-w-[180px] md:flex-none">
//             <select className="w-full appearance-none bg-white border border-gray-300 text-gray-600 py-2 pl-3 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer">
//               <option>04/01/2024 - 04/30/2024</option>
//             </select>
//             <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>

//           {/* Apply Filters Button */}
//           <button className="flex-1 md:flex-none px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm active:scale-95">
//             Apply Filters
//           </button>

//           {/* Add New User Button */}
//           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm active:scale-95">
//             <FiPlus className="text-lg" />
//             <span className="whitespace-nowrap">Add New User</span>
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterBar;