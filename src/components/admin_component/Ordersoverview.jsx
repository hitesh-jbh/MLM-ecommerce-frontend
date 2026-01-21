import React, { useState, useEffect } from 'react';
import { orderTrend, dashboard_Stat } from "../../utils/service/apiService";

const OrdersOverview = () => {
  // State for Chart Data (from API)
  const [ordersData, setOrdersData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for top StatCards (Global Totals)
  const [liveStats, setLiveStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // 1. Fetch Global Stats for the top cards
        const statsRes = await dashboard_Stat(token);
        if (statsRes.data?.success) {
          setLiveStats({
            totalOrders: statsRes.data.data.totalOrders || 0,
            totalRevenue: parseFloat(statsRes.data.data.totalRevenue) || 0,
          });
        }

        // 2. Fetch Order Trend for the chart
        const trendRes = await orderTrend(token);
        if (trendRes.data?.success) {
          // Map API data to include revenue if missing, or use API values
          const formattedTrend = trendRes.data.data.map(item => ({
            month: item.month.substring(0, 3), // e.g., "January" -> "Jan"
            orders: item.orders || 0,
            revenue: item.revenue || (item.orders * 100) // Placeholder if revenue isn't in trend API
          }));
          setOrdersData(formattedTrend);
          setFilteredData(formattedTrend);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update filtered view when selection changes
  useEffect(() => {
    if (selectedMonth === 'All') {
      setFilteredData(ordersData);
    } else {
      const filtered = ordersData.filter(item => item.month === selectedMonth);
      setFilteredData(filtered);
    }
  }, [selectedMonth, ordersData]);

  // Derived calculations
  const chartTotalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
  const chartTotalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
  
  const displayOrders = selectedMonth === 'All' ? liveStats.totalOrders : chartTotalOrders;
  const displayRevenue = selectedMonth === 'All' ? liveStats.totalRevenue : chartTotalRevenue;
  
  const maxOrders = ordersData.length > 0 
    ? Math.max(...ordersData.map(item => item.orders)) 
    : 100;

  const calculateBarHeight = (orders) => {
    const maxHeight = 180;
    return maxOrders > 0 ? (orders / maxOrders) * maxHeight : 0;
  };

  if (loading) return <div className="p-10 text-center">Loading Performance Data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
          <div className="border-b border-gray-200 p-4 md:p-6 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders Overview</h1>
                <p className="text-sm text-gray-500">Live API performance metrics</p>
              </div>
              <div className="w-full sm:w-auto">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full sm:w-40 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500"
                >
                  <option value="All">All Months</option>
                  {ordersData.map(item => (
                    <option key={item.month} value={item.month}>{item.month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard title="Total Orders" value={displayOrders.toLocaleString()} trend="Live" />
              <StatCard title="Total Revenue" value={`$${displayRevenue.toLocaleString()}`} trend="Live" />
              <StatCard title="Avg. Value" value={`$${displayOrders > 0 ? Math.round(displayRevenue / displayOrders) : 0}`} trend="Live" />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
              <h2 className="text-lg font-bold mb-4">Orders Trend</h2>
              <div className="overflow-x-auto pb-4">
                <div className="min-w-[600px] h-72 flex items-end border-b border-gray-200 pb-2 relative">
                  {/* Y-Axis Labels */}
                  <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-[10px] text-gray-400">
                    <span>{maxOrders}</span>
                    <span>{Math.round(maxOrders / 2)}</span>
                    <span>0</span>
                  </div>

                  {/* Bars mapped from API data */}
                  <div className="flex-1 flex justify-around items-end ml-10">
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center group relative px-1 w-full">
                          <div 
                            className={`w-full max-w-[40px] rounded-t-sm transition-all duration-300 ${item.month === selectedMonth ? 'bg-amber-900' : 'bg-amber-700 hover:bg-amber-600'}`}
                            style={{ height: `${calculateBarHeight(item.orders)}px` }}
                          />
                          <span className="text-[10px] mt-2 text-gray-500 font-medium">{item.month}</span>
                          <div className="absolute -top-12 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                            {item.orders} Orders
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full text-center text-gray-400 pb-10">No trend data available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components remain the same
const StatCard = ({ title, value, trend }) => (
  <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
    <div className="flex items-baseline gap-2 mt-1">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <span className="text-xs font-medium text-amber-600">{trend}</span>
    </div>
  </div>
);

export default OrdersOverview;

// import React, { useState, useEffect } from 'react';

// const OrdersOverview = () => {
//   const initialData = [
//     { month: 'Feb', orders: 400, revenue: 24000 },
//     { month: 'Mar', orders: 800, revenue: 48000 },
//     { month: 'Apr', orders: 1200, revenue: 72000 },
//     { month: 'May', orders: 1600, revenue: 96000 },
//     { month: 'Jun', orders: 2000, revenue: 120000 },
//     { month: 'Jul', orders: 1800, revenue: 108000 },
//     { month: 'Aug', orders: 1400, revenue: 84000 },
//     { month: 'Sep', orders: 1200, revenue: 72000 },
//     { month: 'Oct', orders: 1600, revenue: 96000 },
//     { month: 'Nov', orders: 2000, revenue: 120000 },
//     { month: 'Dec', orders: 2200, revenue: 132000 },
//   ];

//   const [ordersData, setOrdersData] = useState(initialData);
//   const [selectedMonth, setSelectedMonth] = useState('All');
//   const [filteredData, setFilteredData] = useState(initialData);

//   const totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
//   const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
//   const monthOptions = ['All', ...initialData.map(item => item.month)];

//   useEffect(() => {
//     if (selectedMonth === 'All') {
//       setFilteredData(ordersData);
//     } else {
//       const filtered = ordersData.filter(item => item.month === selectedMonth);
//       setFilteredData(filtered);
//     }
//   }, [selectedMonth, ordersData]);

//   const maxOrders = Math.max(...ordersData.map(item => item.orders));

//   const handleAddData = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newData = {
//       month: formData.get('month'),
//       orders: parseInt(formData.get('orders')),
//       revenue: parseInt(formData.get('revenue'))
//     };
//     setOrdersData([...ordersData, newData]);
//     e.target.reset();
//   };

//   const calculateBarHeight = (orders) => {
//     const maxHeight = 180;
//     return (orders / maxOrders) * maxHeight;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-2 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
//           {/* Header Section */}
//           <div className="border-b border-gray-200 p-4 md:p-6 bg-white">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders Overview</h1>
//                 <p className="text-sm text-gray-500">E-commerce performance metrics</p>
//               </div>
//               <div className="w-full sm:w-auto">
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   className="w-full sm:w-40 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500"
//                 >
//                   {monthOptions.map(month => (
//                     <option key={month} value={month}>{month}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="p-4 md:p-6">
//             {/* Stats Grid - Stacked on mobile, 3 cols on md+ */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//               <StatCard title="Total Orders" value={totalOrders.toLocaleString()} trend="+12.5%" />
//               <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} trend="+8.3%" />
//               <StatCard title="Avg. Order Value" value={`$${totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}`} trend="+5.7%" />
//             </div>

//             {/* Chart Section */}
//             <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
//               <h2 className="text-lg font-bold mb-4">Orders Trend</h2>
              
//               {/* Responsive Chart Wrapper: Scrollable on mobile */}
//               <div className="overflow-x-auto pb-4">
//                 <div className="min-w-[600px] h-72 flex items-end border-b border-gray-200 pb-2 relative">
//                   {/* Y-Axis Labels (Sticky) */}
//                   <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-[10px] text-gray-400">
//                     <span>{maxOrders}</span>
//                     <span>{Math.round(maxOrders / 2)}</span>
//                     <span>0</span>
//                   </div>

//                   {/* Bars */}
//                   <div className="flex-1 flex justify-around items-end ml-10">
//                     {filteredData.map((item, index) => {
//                       const isSelected = item.month === selectedMonth;
//                       return (
//                         <div key={index} className="flex flex-col items-center group relative px-1 w-full">
//                           <div 
//                             className={`w-full max-w-[40px] rounded-t-sm transition-all duration-300 ${isSelected ? 'bg-amber-900' : 'bg-amber-700 hover:bg-amber-600'}`}
//                             style={{ height: `${calculateBarHeight(item.orders)}px` }}
//                           />
//                           <span className="text-[10px] mt-2 text-gray-500 font-medium">{item.month}</span>
                          
//                           {/* Tooltip */}
//                           <div className="absolute -top-12 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
//                             {item.orders} Orders
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Form Section - Grid for inputs */}
//             <div className="mt-8 bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
//               <h3 className="font-bold mb-4">Add Performance Data</h3>
//               <form onSubmit={handleAddData} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <InputGroup label="Month" name="month" placeholder="Jan" />
//                 <InputGroup label="Orders" name="orders" type="number" placeholder="1000" />
//                 <InputGroup label="Revenue ($)" name="revenue" type="number" placeholder="50000" />
//                 <button type="submit" className="h-10 self-end bg-gray-900 text-white rounded-md hover:bg-black transition-colors text-sm font-medium">
//                   Add Entry
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Components for cleaner code
// const StatCard = ({ title, value, trend }) => (
//   <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
//     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
//     <div className="flex items-baseline gap-2 mt-1">
//       <p className="text-2xl font-bold text-gray-900">{value}</p>
//       <span className="text-xs font-medium text-green-600">{trend}</span>
//     </div>
//   </div>
// );

// const InputGroup = ({ label, ...props }) => (
//   <div className="flex flex-col gap-1">
//     <label className="text-xs font-bold text-gray-600 uppercase">{label}</label>
//     <input {...props} className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none" required />
//   </div>
// );

// export default OrdersOverview;