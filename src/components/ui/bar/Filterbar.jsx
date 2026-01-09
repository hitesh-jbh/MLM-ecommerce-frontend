// import React, { useState, useEffect } from 'react';

// const FilterBar = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     userType: "admin", // Matches parent default
//     role: "All",
//     rank: "All",
//     startDate: "",
//     endDate: ""
//   });

//   useEffect(() => {
//     onFilterChange(filters);
//   }, [filters, onFilterChange]);

//   const handleChange = (e) => {
//     setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <div className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
        
//         {/* API Filter - Change category */}
//         <div className="space-y-2">
//           <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">User Category</label>
//           <select 
//             name="userType" 
//             value={filters.userType} 
//             onChange={handleChange} 
//             className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-black bg-gray-50/50 font-medium"
//           >
//             <option value="admin">Administrators</option>
//             <option value="staff">Staff Members</option>
//             <option value="customer">Customers</option>
//           </select>
//         </div>

//         {/* Local Role Filter */}
//         <div className="space-y-2">
//           <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Specific Role</label>
//           <select 
//             name="role" 
//             value={filters.role} 
//             onChange={handleChange} 
//             className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
//           >
//             <option value="All">All Roles</option>
//             <option value="SUPERADMIN">Super Admin</option>
//             <option value="MANAGER">Manager</option>
//           </select>
//         </div>

//         {/* Local Rank Filter */}
//         <div className="space-y-2">
//           <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Rank</label>
//           <select 
//             name="rank" 
//             value={filters.rank} 
//             onChange={handleChange} 
//             className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
//           >
//             <option value="All">All Ranks</option>
//             <option value="Gold">Gold</option>
//             <option value="Silver">Silver</option>
//             <option value="Bronze">Bronze</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Joined After</label>
//           <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none bg-gray-50/50" />
//         </div>

//         <div className="space-y-2">
//           <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Joined Before</label>
//           <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none bg-gray-50/50" />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default FilterBar;


import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import Icons from '../Icon';

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