import React, { useState } from 'react';
import { FiSearch, FiPlus, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import LineChart from './LineChart.jsx';
import Testimonial from "../../../admin_component/Testimonial.jsx";
import { GenericTable } from '../../table/GenericTable.jsx';

const UserManagementDashboard = ({ chartData, recentActivity }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Column Definitions for GenericTable
  const activityColumns = [
    {
      header: "User",
      key: "userName",
      width: "30%",
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
            {value?.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-slate-700 truncate">{value}</span>
        </div>
      )
    },
    {
      header: "Activity",
      key: "activity",
      width: "40%",
      render: (value) => {
        const isRegistration = value?.toLowerCase().includes('registered');
        return (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            isRegistration 
              ? 'bg-green-100 text-green-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {value}
          </span>
        );
      }
    },
    {
      header: "Timestamp",
      key: "createdAt",
      width: "30%",
      render: (value) => (
        <div className="flex flex-col">
          <span className="text-slate-600 font-medium">
            {new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[9px] text-slate-400">
            {new Date(value).toLocaleDateString()}
          </span>
        </div>
      )
    }
  ];

  // 2. Data Formatting for Charts
  const formattedLineData = chartData?.userGrowth?.map(item => ({
    day: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    total: item.count
  })) || [];

  const COLORS = ['#3B82F6', '#FBBF24', '#F87171', '#34D399', '#6366F1'];
  const formattedPieData = chartData?.commissionDistribution?.map((item, index) => ({
    name: item.label,
    value: parseFloat(item.value),
    color: COLORS[index % COLORS.length]
  })) || [];

  const totalValue = formattedPieData.reduce((acc, curr) => acc + curr.value, 0);

  // 3. Filtered Activity Logic (Optional Search)
  const filteredActivity = recentActivity?.filter(item => 
    item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.activity.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users or activities..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-3">
            <select className="flex-1 lg:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            <button className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-50 transition-all">
               <FiMoreHorizontal />
            </button>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-700 mb-4 uppercase tracking-tight text-[12px]">User Growth Trends</h3>
            <div className="h-[250px] w-full">
              <LineChart data={formattedLineData} xKey="day" yKey="total" lineColor="#3B82F6" />
            </div>
          </div>

          {/* Commission Distribution */}
          <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-700 mb-4 uppercase tracking-tight text-[12px]">Commission Distribution</h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 h-auto sm:h-[250px]">
              <div className="grid grid-cols-2 sm:flex sm:flex-col w-full sm:w-1/3 gap-3">
                {formattedPieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="w-full sm:w-2/3 h-[200px] sm:h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formattedPieData}
                      innerRadius="65%"
                      outerRadius="90%"
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {formattedPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="block text-xl font-black text-gray-800">₹{totalValue.toFixed(0)}</span>
                    <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Total Payout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generic Table for Activity */}
        <div className="w-full">
          <GenericTable 
            title="System Activity Logs" 
            columns={activityColumns} 
            data={filteredActivity} 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-gray-800 active:scale-95 transition-all">
            <FiPlus /> Add New User
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            <FiMessageSquare className="text-blue-500" /> Broadcast Message
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserManagementDashboard;






// import React, { useState } from 'react';
// import { FiSearch, FiPlus, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import LineChart from './LineChart.jsx';
// import Testimonial from "../../../admin_component/Testimonial.jsx";
// import { mlmData } from '../../../../utils/Constants.jsx';

// const UserManagementDashboard = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const pieData = [
//     { name: 'Direct', value: 40, color: '#3B82F6' },
//     { name: 'Level 1', value: 10, color: '#FBBF24' },
//     { name: 'Level 2', value: 10, color: '#F87171' },
//     { name: 'Level 3', value: 15, color: '#34D399' },
//     { name: 'Today 55', value: 25, color: '#6366F1' }
//   ];

//   return (
//     <div className="min-h-screen bg-[#F8F9FC] p-3 md:p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* 1. Top Search and Filters Bar - Adjusted for Mobile Stack */}
//         <div className="flex flex-col lg:flex-row lg:items-center gap-4">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search users / ID"
//               className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-row gap-3">
//             <select className="flex-1 lg:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
//               <option>All Status</option>
//             </select>
//             <select className="flex-1 lg:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none">
//               <option>All Ranks</option>
//             </select>
//           </div>
//         </div>

//         {/* 2. Charts Row - Dynamic Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* User Growth Line Chart */}
//           <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//             <h3 className="text-lg font-bold text-gray-700 mb-4">User Growth</h3>
//             <div className="h-[250px] w-full">
//               <LineChart data={mlmData} xKey="day" yKey="total" lineColor="#3B82F6" />
//             </div>
//           </div>

//           {/* Commission Distribution Donut Chart */}
//           <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100">
//             <h3 className="text-lg font-bold text-gray-700 mb-4">Commission Distribution</h3>
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-6 h-auto sm:h-[250px]">
//               {/* Legend - Grid layout on small mobile, list on tablet+ */}
//               <div className="grid grid-cols-2 sm:flex sm:flex-col w-full sm:w-1/3 gap-3">
//                 {pieData.map((item, i) => (
//                   <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-600">
//                     <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
//                     <span className="truncate">{item.name}</span>
//                   </div>
//                 ))}
//               </div>
//               {/* Donut with Center Text */}
//               <div className="w-full sm:w-2/3 h-[200px] sm:h-full relative">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       innerRadius="60%"
//                       outerRadius="85%"
//                       paddingAngle={2}
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <div className="text-center">
//                     <span className="block text-2xl font-bold text-gray-800">40%</span>
//                     <span className="text-[10px] text-gray-400 uppercase">Direct</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 3. Action Buttons - Wrapping for narrow screens */}
//         <div className="flex flex-wrap items-center gap-3">
//           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3B82F6] text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-all">
//             <FiPlus /> Add User
//           </button>
//           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
//             <FiMessageSquare className="text-blue-500" /> Send Message
//           </button>
//           <button className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-50 transition-all">
//             <FiMoreHorizontal />
//           </button>
//         </div>

//         {/* Testimonial */}
//         <div className="w-full overflow-hidden">
//           <Testimonial />
//         </div>

//         {/* Total Users Summary Card */}
//         <div className=" border-t border-gray-200">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-700">Total Users</span>
//             <span className="text-xl font-bold text-gray-900">100</span>
//           </div>
//           <div className="text-sm text-gray-500 mt-1">
//              Real-time distribution across all statuses
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserManagementDashboard;