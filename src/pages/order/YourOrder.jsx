// import { Search, Loader2 } from 'lucide-react';
// import { useState, useMemo } from 'react';
// import OrderCard from '../../components/ui/order/OrderCard.jsx';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import useSWR from 'swr';
// import { getMyAllOrders } from '../../utils/service/apiService';

// const YourOrder = () => {
//     const token = useSelector((state) => state.auth?.token);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [activeTab, setActiveTab] = useState('Orders');
//     const [timeFilter, setTimeFilter] = useState('2026');

//     const { data: response, isLoading } = useSWR(
//         token ? ["/api/order/", token] : null,
//         () => getMyAllOrders(token)
//     );

//     const allOrders = useMemo(() => response?.data?.data || [], [response]);
//     // console.log(allOrders)

//     const getTabFilteredOrders = (orders) => {
//         return orders.filter(order => {
//             const status = order.order_status?.toLowerCase();
//             switch (activeTab) {
//                 case "Buy Again": return status === "delivered" || status === "5";
//                 case "Not Yet Dispatched": return ["created", "pending", "1"].includes(status);
//                 case "Cancelled Orders": return status === "cancelled" || status === "0";
//                 default: return status !== "cancelled" && status !== "0";
//             }
//         });
//     };

//     const filteredOrders = useMemo(() => {
//         return getTabFilteredOrders(allOrders).filter(order => {
//             const date = new Date(order.created_at);
//             const matchesTime = timeFilter === "past three months" 
//                 ? date >= new Date(new Date().setMonth(new Date().getMonth() - 3)) 
//                 : date.getFullYear().toString() === timeFilter;

//             const matchesSearch = order.id.toString().includes(searchQuery);
//             return matchesTime && matchesSearch;
//         }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     }, [allOrders, activeTab, timeFilter, searchQuery]);

//     if (isLoading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={40} /></div>;

//     return (
//         <div className="max-w-5xl mx-auto px-4 py-6 font-sans">
//             <h1 className="text-3xl font-medium mb-6">Your Orders</h1>
            
//             {/* Tabs and Filters */}
//             <div className="border-b border-gray-200 mb-6 flex gap-8 text-sm">
//                 {["Orders", "Buy Again", "Cancelled Orders"].map(tab => (
//                     <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? "border-b-2 border-orange-600 font-bold" : "text-gray-500"}`}>{tab}</button>
//                 ))}
//             </div>

//             <div className="space-y-6">
//                 {filteredOrders.map(order => (
//                     <OrderCard 
//                         key={order.id} 
//                         order={{
//                             orderId: order.id,
//                             orderDate: order.created_at,
//                             price: order.total_amount,
//                             status: order.order_status,
//                             // Normalizing data: If items is missing, create a placeholder from order data
//                             items: (order.items && order.items.length > 0) ? order.items : [{
//                                 product_id: order.id,
//                                 title: "Premium Order Item",
//                                 quantity: 1,
//                                 image: null
//                             }]
//                         }} 
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default YourOrder;


import { Search, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import OrderCard from '../../components/ui/order/OrderCard.jsx';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getMyAllOrders } from '../../utils/service/apiService';
import { Link } from 'react-router-dom';

const YourOrder = () => {
    const token = useSelector((state) => state.auth?.token);
    const [searchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Orders');

    const { data: response, isLoading } = useQuery({
        queryKey: ["order", token],
        queryFn: () => getMyAllOrders(token),
        enabled: !!token
    });

    // FIX 1: Correct data extraction based on your console log
    // Your log shows an array of objects. We ensure it's an array.
    const allOrders = useMemo(() => {
        const data = response?.data?.data || response?.data || response;
        return Array.isArray(data) ? data : [];
    }, [response]);

    const filteredOrders = useMemo(() => {
        const tabFiltered = allOrders.filter(order => {
            const status = order.order_status?.toLowerCase();
            switch (activeTab) {
                case "Buy Again": return status === "delivered";
                // case "Buy Again": return status === "BUY_NOW";
                case "Cancelled Orders": return status === "cancelled";
                default: return status !== "cancelled"; 
            }
        });

        return tabFiltered.filter(order => {
            const matchesSearch = 
                order.id?.toString().includes(searchQuery) || 
                order.product_name?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
    }, [allOrders, activeTab, searchQuery]);

    if (isLoading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={40} /></div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 font-sans">
            {/* Breadcrumb */}
            <nav className="text-sm mb-4">
                <Link to="/profile" className="text-gray-700 hover:underline cursor-pointer">Your Account</Link>
                <span className="mx-1 text-gray-500">›</span>
                <span className="text-black">Your Orders</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-normal text-gray-900">Your Orders</h1>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-200">
                <div className="flex gap-8 text-sm">
                    {["Orders", "Cancelled Orders"].map(tab => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)} 
                            className={`pb-2 ${activeTab === tab ? "border-b-2 border-orange-600 font-bold" : "text-gray-500"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                {/* Search Bar */}
                {/* <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search all orders" 
                        className="pl-10 pr-4 py-2 border rounded-full text-sm w-full md:w-80 outline-none focus:ring-1 focus:ring-orange-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div> */}
            </div>

            <div className="space-y-6">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <OrderCard 
                            key={order.id} 
                            order={order} // PASS THE WHOLE ORDER OBJECT DIRECTLY
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-lg text-gray-500">
                        No orders found for this filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourOrder;