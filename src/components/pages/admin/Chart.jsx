import React, { useState } from 'react';
import { FiSearch, FiPlus, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import LineChart from '../../ui/LineChart.jsx';
import Testimonial from "./Testimonial.jsx";
import { mlmData } from '../../../utils/Constants.jsx';

const UserManagementDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const pieData = [
    { name: 'Direct', value: 40, color: '#3B82F6' },
    { name: 'Level 1', value: 10, color: '#FBBF24' },
    { name: 'Level 2', value: 10, color: '#F87171' },
    { name: 'Level 3', value: 15, color: '#34D399' },
    { name: 'Today 55', value: 25, color: '#6366F1' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* 1. Top Search and Filters Bar - Adjusted for Mobile Stack */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users / ID"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-3">
            <select className="flex-1 lg:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
              <option>All Status</option>
            </select>
            <select className="flex-1 lg:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
              <option>All Ranks</option>
            </select>
          </div>
        </div>

        {/* 2. Charts Row - Dynamic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Line Chart */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="text-lg font-bold text-gray-700 mb-4">User Growth</h3>
            <div className="h-[250px] w-full">
              <LineChart data={mlmData} xKey="day" yKey="total" lineColor="#3B82F6" />
            </div>
          </div>

          {/* Commission Distribution Donut Chart */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Commission Distribution</h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 h-auto sm:h-[250px]">
              {/* Legend - Grid layout on small mobile, list on tablet+ */}
              <div className="grid grid-cols-2 sm:flex sm:flex-col w-full sm:w-1/3 gap-3">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-600">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
              {/* Donut with Center Text */}
              <div className="w-full sm:w-2/3 h-[200px] sm:h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius="60%"
                      outerRadius="85%"
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-800">40%</span>
                    <span className="text-[10px] text-gray-400 uppercase">Direct</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Action Buttons - Wrapping for narrow screens */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3B82F6] text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-all">
            <FiPlus /> Add User
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
            <FiMessageSquare className="text-blue-500" /> Send Message
          </button>
          <button className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-50 transition-all">
            <FiMoreHorizontal />
          </button>
        </div>

        {/* Testimonial */}
        <div className="w-full overflow-hidden">
          <Testimonial />
        </div>

        {/* Total Users Summary Card */}
        <div className=" border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Total Users</span>
            <span className="text-xl font-bold text-gray-900">100</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
             Real-time distribution across all statuses
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserManagementDashboard;




// import React, { useState } from 'react';
// import { 
//   FiSearch, 
//   FiUserPlus, 
//   FiSend, 
//   FiMessageSquare,
//   FiMoreVertical,
//   FiChevronDown,
//   FiFilter,
//   FiUsers,
//   FiCheckCircle,
//   FiClock,
//   FiAlertCircle
// } from 'react-icons/fi';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import Testimonial from "./Testimonial.jsx";
// import LineChart from '../../ui/LineChart.jsx';
// import { mlmData } from '../../../utils/Constants.jsx';




// const UserManagementDashboard = () => {
//   // State for search
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // State for filters
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedRank, setSelectedRank] = useState('all');
  
//   // Line chart
//   const data = mlmData;

//   // Pie chart data
//   const pieData = [
//     { name: 'Active', value: 65, color: '#10B981' },
//     { name: 'Inactive', value: 15, color: '#EF4444' },
//     { name: 'Pending', value: 12, color: '#F59E0B' },
//     { name: 'Suspended', value: 8, color: '#6B7280' }
//   ];

//   // User levels data
//   const levelData = [
//     { level: 'Level 1', count: 45, color: '#3B82F6' },
//     { level: 'Level 2', count: 32, color: '#10B981' },
//     { level: 'Level 3', count: 18, color: '#F59E0B' },
//     { level: 'Level 55', count: 5, color: '#8B5CF6' }
//   ];

//   // Status options
//   const statusOptions = [
//     { value: 'all', label: 'All Status' },
//     { value: 'active', label: 'Active' },
//     { value: 'inactive', label: 'Inactive' },
//     { value: 'pending', label: 'Pending' },
//     { value: 'suspended', label: 'Suspended' }
//   ];

//   // Rank options
//   const rankOptions = [
//     { value: 'all', label: 'All Ranks' },
//     { value: 'bronze', label: 'Bronze' },
//     { value: 'silver', label: 'Silver' },
//     { value: 'gold', label: 'Gold' },
//     { value: 'platinum', label: 'Platinum' }
//   ];

//   // Handle search
//   const handleSearch = () => {
//     if (searchQuery) {
//       alert(`Searching for User ID: ${searchQuery}`);
//     }
//   };

//   // Handle add user
//   const handleAddUser = () => {
//     const username = prompt('Enter username for new user:');
//     if (username) {
//       alert(`Added new user: ${username}`);
//     }
//   };

//   // Handle send message
//   const handleSendMessage = () => {
//     const message = prompt('Enter your message:');
//     if (message) {
//       alert(`Message sent: "${message}"`);
//     }
//   };

//   // Handle more options
//   const handleMoreOptions = () => {
//     alert('More options menu opened');
//   };

//   // Custom pie chart tooltip
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
//           <p className="font-medium text-gray-900">{payload[0].name}</p>
//           <p className="text-sm text-gray-600">{payload[0].value} users</p>
//           <p className="text-xs text-gray-500">{((payload[0].value / 100) * 100).toFixed(1)}%</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">User Management Dashboard</h1>
//           <p className="text-gray-600">Manage users, view statistics, and send messages</p>
//         </div>

//         <div className="lg:w-2/3">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               {/* Search and Filters Row */}
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//                 {/* Search Input */}
//                 <div className="flex-1">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search User ID..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                       onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                     />
//                     <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   </div>
//                 </div>

//                 {/* Filters in one line */}
//                 <div className="flex flex-wrap gap-3">
//                   {/* Status Dropdown */}
//                   <div className="relative">
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value)}
//                       className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     >
//                       {statusOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
//                   </div>

//                   {/* Rank Dropdown */}
//                   <div className="relative">
//                     <select
//                       value={selectedRank}
//                       onChange={(e) => setSelectedRank(e.target.value)}
//                       className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     >
//                       {rankOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
//                   </div>

//                   {/* Filter Icon Button */}
//                   <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                     <FiFilter className="text-gray-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* User Levels - Single Line */}
//               {/* <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-4">User Distribution by Level</h3>
//                 <div className="flex flex-wrap gap-4">
//                   {levelData.map((level) => (
//                     <div
//                       key={level.level}
//                       className="flex-1 min-w-[120px] bg-gray-50 border border-gray-200 rounded-xl p-4"
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="font-medium text-gray-900">{level.level}</span>
//                         <div
//                           className="w-3 h-3 rounded-full"
//                           style={{ backgroundColor: level.color }}
//                         ></div>
//                       </div>
//                       <div className="text-2xl font-bold text-gray-800">{level.count}</div>
//                       <div className="text-sm text-gray-500">users</div>
//                     </div>
//                   ))}
//                 </div>
//               </div> */}

//               {/* Action Buttons Row */}
//               <div className="flex flex-wrap gap-3">
//                 {/* Add User Button */}
//                 <button
//                   onClick={handleAddUser}
//                   className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//                 >
//                   <FiUserPlus />
//                   <span>Add User</span>
//                 </button>

//                 {/* Send Message Button */}
//                 <button
//                   onClick={handleSendMessage}
//                   className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
//                 >
//                   <FiSend />
//                   <span>Send Message</span>
//                 </button>

//                 {/* Message with Icon Label */}
//                 <button className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
//                   <FiMessageSquare />
//                   <span>Message</span>
//                 </button>

//                 {/* 3 Dots Small Label */}
//                 <button
//                   onClick={handleMoreOptions}
//                   className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
//                   title="More Options"
//                 >
//                   <FiMoreVertical />
//                 </button>
//               </div>

//               {/* Stats Overview */}
//               <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-blue-700">Total Users</p>
//                       <p className="text-2xl font-bold text-gray-800 mt-1">100</p>
//                     </div>
//                     <FiUsers className="text-2xl text-blue-600" />
//                   </div>
//                 </div> */}

//                 {/* <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-green-700">Active Users</p>
//                       <p className="text-2xl font-bold text-gray-800 mt-1">65</p>
//                     </div>
//                     <FiCheckCircle className="text-2xl text-green-600" />
//                   </div>
//                 </div> */}

//                 {/* <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-yellow-700">Pending</p>
//                       <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
//                     </div>
//                     <FiClock className="text-2xl text-yellow-600" />
//                   </div>
//                 </div> */}

//                 {/* <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-red-700">Suspended</p>
//                       <p className="text-2xl font-bold text-gray-800 mt-1">8</p>
//                     </div>
//                     <FiAlertCircle className="text-2xl text-red-600" />
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </div>


//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Side - User Management */}
//           <LineChart data={data} xKey="day" yKey="total" lineColor="#000" />

//           {/* Right Side - Pie Chart */}
//           <div className="lg:w-1/3">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
//               <h3 className="text-lg font-semibold text-gray-700 mb-6">User Status Distribution</h3>
              
//               {/* Pie Chart Container */}
//               <div className="h-64 mb-6">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={2}
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend 
//                       verticalAlign="bottom" 
//                       height={36}
//                       formatter={(value, entry) => (
//                         <span className="text-gray-700 text-sm">{value}</span>
//                       )}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Pie Chart Details */}
//               <div className="space-y-3">
//                 {pieData.map((item, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div
//                         className="w-3 h-3 rounded-full"
//                         style={{ backgroundColor: item.color }}
//                       ></div>
//                       <span className="text-gray-700">{item.name}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="font-medium text-gray-900">{item.value}</span>
//                       <span className="text-sm text-gray-500">
//                         ({((item.value / 100) * 100).toFixed(1)}%)
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {/* Testimonial */}

//   <Testimonial />


//               {/* Total Users */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-700">Total Users</span>
//                   <span className="text-xl font-bold text-gray-900">100</span>
//                 </div>
//                 <div className="text-sm text-gray-500 mt-1">
//                   Real-time distribution across all statuses
//                 </div>
//               </div>

    
             
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagementDashboard;