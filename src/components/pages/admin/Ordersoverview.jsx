import React, { useState, useEffect } from 'react';

const OrdersOverview = () => {
  // Initial data for the bar chart
  const initialData = [
    { month: 'Feb', orders: 400, revenue: 24000 },
    { month: 'Mar', orders: 800, revenue: 48000 },
    { month: 'Apr', orders: 1200, revenue: 72000 },
    { month: 'May', orders: 1600, revenue: 96000 },
    { month: 'Jun', orders: 2000, revenue: 120000 },
    { month: 'Jul', orders: 1800, revenue: 108000 },
    { month: 'Aug', orders: 1400, revenue: 84000 },
    { month: 'Sep', orders: 1200, revenue: 72000 },
    { month: 'Oct', orders: 1600, revenue: 96000 },
    { month: 'Nov', orders: 2000, revenue: 120000 },
    { month: 'Dec', orders: 2200, revenue: 132000 },
  ];

  const [ordersData, setOrdersData] = useState(initialData);
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [filteredData, setFilteredData] = useState(initialData);

  // Calculate totals
  const totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);

  // Get month options for dropdown
  const monthOptions = ['All', ...initialData.map(item => item.month)];

  // Filter data based on selected month
  useEffect(() => {
    if (selectedMonth === 'All') {
      setFilteredData(ordersData);
    } else {
      const filtered = ordersData.filter(item => item.month === selectedMonth);
      setFilteredData(filtered);
    }
  }, [selectedMonth, ordersData]);

  // Find maximum orders for scaling the chart
  const maxOrders = Math.max(...ordersData.map(item => item.orders));

  // Function to handle form submission for adding new data
  const handleAddData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMonth = formData.get('month');
    const newOrders = parseInt(formData.get('orders'));
    const newRevenue = parseInt(formData.get('revenue'));

    const newData = {
      month: newMonth,
      orders: newOrders,
      revenue: newRevenue
    };

    setOrdersData([...ordersData, newData]);
    e.target.reset();
  };

  // Function to remove data point
  const removeData = (index) => {
    const newData = [...ordersData];
    newData.splice(index, 1);
    setOrdersData(newData);
  };

  // Function to calculate bar height based on orders
  const calculateBarHeight = (orders) => {
    const maxHeight = 180; // Maximum height in pixels
    return (orders / maxOrders) * maxHeight;
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      {/* Single Main Card */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="border-b border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Orders Overview</h1>
                <p className="text-gray-600">E-commerce performance metrics and analytics dashboard</p>
              </div>
              
              {/* Month Selector */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Filter by Month:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent min-w-[120px]"
                >
                  {monthOptions.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Stats and Graph */}
              <div className="lg:col-span-2">
                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Total Orders Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                        <p className="text-2xl font-bold text-black">{totalOrders.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedMonth === 'All' ? 'All months' : `For ${selectedMonth}`}
                        </p>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-full">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Previous</span>
                        <span className="font-medium text-green-600">+12.5%</span>
                      </div>
                    </div>
                  </div>

                  {/* Total Revenue Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                        <p className="text-2xl font-bold text-black">${totalRevenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedMonth === 'All' ? 'All months' : `For ${selectedMonth}`}
                        </p>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-full">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Previous</span>
                        <span className="font-medium text-green-600">+8.3%</span>
                      </div>
                    </div>
                  </div>

                  {/* Average Order Value Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Avg. Order Value</p>
                        <p className="text-2xl font-bold text-black">
                          ${totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedMonth === 'All' ? 'All months' : `For ${selectedMonth}`}
                        </p>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-full">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Previous</span>
                        <span className="font-medium text-green-600">+5.7%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bar Chart Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-black mb-1">Orders Trend (Feb - Dec)</h2>
                      <p className="text-gray-600">Visual representation of order volumes across months</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-amber-700 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Orders Count</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-amber-900 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Selected: {selectedMonth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart Container */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    {/* Y-axis and Bars */}
                    <div className="flex">
                      {/* Y-axis labels */}
                      <div className="w-12 flex flex-col justify-between h-64 text-xs text-gray-500">
                        {[0, maxOrders * 0.25, maxOrders * 0.5, maxOrders * 0.75, maxOrders].map((value, index) => (
                          <div key={index} className="flex items-center justify-end pr-2 h-16">
                            {Math.round(value)}
                          </div>
                        ))}
                      </div>

                      {/* Bars Container */}
                      <div className="flex-1 flex items-end justify-between px-4 pb-6 h-64">
                        {filteredData.map((item, index) => {
                          const barHeight = calculateBarHeight(item.orders);
                          const isSelected = item.month === selectedMonth;
                          
                          return (
                            <div key={index} className="flex flex-col items-center flex-1 mx-1">
                              <div className="relative group">
                                {/* Bar - ONLY BROWN COLOR HERE */}
                                <div
                                  className={`w-8 ${isSelected ? 'bg-amber-900' : 'bg-amber-700'} rounded-t-lg transition-all duration-300 hover:bg-amber-800 cursor-pointer`}
                                  style={{ height: `${barHeight}px` }}
                                  title={`${item.month}: ${item.orders} orders`}
                                >
                                  {/* Bar value inside bar */}
                                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.orders}
                                  </div>
                                </div>
                                
                                {/* Tooltip */}
                                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                  <div className="font-bold mb-1">{item.month}</div>
                                  <div>Orders: <strong>{item.orders}</strong></div>
                                  <div>Revenue: <strong>${item.revenue.toLocaleString()}</strong></div>
                                </div>
                              </div>
                              
                              {/* Month Label */}
                              <div className={`mt-2 text-sm font-medium ${isSelected ? 'text-black font-bold' : 'text-gray-700'}`}>
                                {item.month}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* X-axis line */}
                    <div className="border-t border-gray-300 mt-2"></div>
                    
                    {/* X-axis labels */}
                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
                      <span>Feb</span>
                      <span>Apr</span>
                      <span>Jun</span>
                      <span>Aug</span>
                      <span>Oct</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>

                {/* Add New Data Form */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <h2 className="text-xl font-bold text-black mb-4">Add New Data Point</h2>
                  <form onSubmit={handleAddData}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                        <input
                          type="text"
                          name="month"
                          required
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="e.g., Jan"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Orders</label>
                        <input
                          type="number"
                          name="orders"
                          required
                          min="0"
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="e.g., 1500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($)</label>
                        <input
                          type="number"
                          name="revenue"
                          required
                          min="0"
                          className="w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="e.g., 90000"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                          Add Data
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column - Data Table */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm h-fit">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black">Monthly Data Table</h2>
                  <span className="text-sm text-gray-500">{ordersData.length} entries</span>
                </div>
                
                <div className="overflow-y-auto max-h-[500px]">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Month</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Orders</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Revenue</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersData.map((item, index) => (
                        <tr 
                          key={index} 
                          className={`border-b border-gray-100 hover:bg-gray-50 ${
                            item.month === selectedMonth ? 'bg-gray-50' : ''
                          }`}
                        >
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${item.month === selectedMonth ? 'bg-amber-700' : 'bg-gray-400'}`}></div>
                              <span className="font-medium text-black">{item.month}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-medium text-black">{item.orders.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-medium text-black">${item.revenue.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => removeData(index)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium hover:bg-red-50 px-2 py-1 rounded transition-colors"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Summary Statistics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">Max Orders</div>
                      <div className="text-lg font-bold text-black">{maxOrders}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">Min Orders</div>
                      <div className="text-lg font-bold text-black">{Math.min(...ordersData.map(item => item.orders))}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">Avg Revenue</div>
                      <div className="text-lg font-bold text-black">${Math.round(ordersData.reduce((sum, item) => sum + item.revenue, 0) / ordersData.length).toLocaleString()}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-600">Total Months</div>
                      <div className="text-lg font-bold text-black">{ordersData.length}</div>
                    </div>
                  </div>
                </div>

                {/* Current Filter Info */}
                <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">Current Filter: </span>
                      <span className="font-medium text-black">{selectedMonth}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Showing {filteredData.length} of {ordersData.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="text-center text-sm text-gray-600">
              <div className="flex justify-center items-center space-x-6">
               
                
               
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersOverview;