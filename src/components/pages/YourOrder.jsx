import { Search } from 'lucide-react';
import React, { useState } from 'react';
import OrderCard from '../ui/YourOrder/OrderInfo';
import { Link } from 'react-router-dom';

const YourOrder = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Orders');
    const [timeFilter, setTimeFilter] = useState('2025'); // Default to current year

    const tabs = ["Orders", "Buy Again", "Not Yet Dispatched", "Cancelled Orders"];

    const allOrders = [
        {
            orderId: "404-1234567-8901234",
            orderDate: "20 December 2024",
            status: "0", 
            total: 971.00,
            shipTo: "John Doe",
            items: [{
                id: 1,
                title: "Men's Full Sleeve Cotton Shirt with Retro Geometric Block Print",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2025"
            }]
        },
        {
            orderId: "404-1234567-8905678",
            orderDate: "21 December 2025",
            status: "1", // Added for StepBar
            total: 1250.00,
            shipTo: "John Doe",
            items: [{
                id: 2,
                title: "Premium Slim Fit Chinos",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2026"
            }]
        },
        {
            orderId: "404-1234567-8909876",
            orderDate: "23 December 2025",
            status: "3", // Added for StepBar
            total: 1250.00,
            shipTo: "John Doe",
            items: [{
                id: 3,
                title: "Premium Slim Fit Chinos",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2026"
            }]
        },
        {
            orderId: "404-1234567-8902468",
            orderDate: "25 December 2025",
            status: "5", // Added for StepBar
            total: 1250.00,
            shipTo: "John Doe",
            items: [{
                id: 4,
                title: "Premium Slim Fit Chinos",
                image: "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp",
                returnExpiry: "Jan 15, 2026"
            }]
        }
    ];

    const getTabFilteredOrders = (orders) => {
        return orders.filter(order => {
            const status = order.status?.toLowerCase();
            
            switch (activeTab) {
                case "Buy Again":
                    return status === "5" || status === "delivered";
                
                case "Not Yet Dispatched":
                    return status === "1" || status === "ordered" || status === "packed";
                
                case "Cancelled Orders":
                    return status === "0" || status === "cancelled";
                
                default:
                    return status !== "0" && status !== "cancelled";
            }
        });
    };

    // Sorting and Filtering Logic
    const parseOrderDate = (dateStr) => new Date(dateStr);

    const filteredOrders = getTabFilteredOrders(allOrders)
        .filter(order => {
            const date = parseOrderDate(order.orderDate);
            const orderYear = date.getFullYear().toString();
            
            // Time Filter Logic
            let matchesTime = false;
            if (timeFilter === "past three months") {
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                matchesTime = date >= threeMonthsAgo;
            } else {
                matchesTime = orderYear === timeFilter;
            }

            // Search Logic
            const matchesSearch = order.items.some(item => 
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) || order.orderId.includes(searchQuery);

            return matchesTime && matchesSearch;
        })
        .sort((a, b) => parseOrderDate(b.orderDate) - parseOrderDate(a.orderDate));

    return (
        <div className="max-w-5xl mx-auto px-4 py-4 font-sans">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4">
                <Link to="/profile" className="text-gray-700 hover:underline cursor-pointer">Your Account</Link>
                <span className="mx-1 text-gray-500">›</span>
                <span className="text-black">Your Orders</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-normal text-gray-900">Your Orders</h1>
                
                <div className="flex items-center w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search all orders"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-80 pl-9 pr-4 h-[6vh]  border border-gray-400 rounded-l-md focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:border-[#e77600] outline-none text-sm"
                        />
                    </div>
                    <button className="bg-[#333] hover:bg-black text-white px-4 md:px-6 h-[6vh] rounded-r-md text-sm font-medium transition shadow-sm border border-[#333] whitespace-nowrap">
                        Search Orders
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300 mb-6">
                <ul className="flex flex-wrap gap-x-8 gap-y-2 overflow-x-auto whitespace-nowrap">
                    {tabs.map((tab) => (
                        <li 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-[14px] cursor-pointer relative transition-all ${
                                activeTab === tab 
                                ? "text-gray-900 border-b-2 border-orange-600 font-bold" 
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Filter Info Bar */}
            <div className="flex items-center gap-1.5 text-sm text-gray-900 mb-6">
                <span className="font-bold">{filteredOrders.length} {activeTab.toLowerCase()}</span>
                <span>placed in</span>
                <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="bg-[#F0F2F2] border border-gray-300 rounded-md px-2 py-1 text-xs shadow-sm focus:outline-none hover:bg-gray-200 cursor-pointer outline-none"
                >
                    <option value="past three months">past three months</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                </select>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <OrderCard key={order.orderId} order={order} />
                    ))
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">
                            No {activeTab.toLowerCase()} found for this period.
                        </p>
                        <button 
                            onClick={() => {setSearchQuery(''); setTimeFilter('2025'); setActiveTab('Orders');}}
                            className="mt-4 text-black hover:underline text-sm"
                        >
                            Go to all orders
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default YourOrder;