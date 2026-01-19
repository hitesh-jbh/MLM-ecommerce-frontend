import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderDetails } from '../../utils/service/apiService';
import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer';

const ViewOrder = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth?.token);
    
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!token) return;
            try {
                setLoading(true);
                const response = await getOrderDetails(token, id);
                setOrder(response.data?.data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        window.scrollTo(0, 0);
    }, [id, token]);

    if (loading) return <ProductInfoShimmer />;
    if (!order) return <div className="p-20 text-center text-gray-500">Order not found.</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
            <nav className="mb-4">
                <button 
                    onClick={() => navigate('/your-order')} 
                    className="text-blue-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1 transition-all"
                >
                    <span className="text-lg">←</span> Back to your orders
                </button>
            </nav>

            <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h1>
            
            {/* Responsive Header Card */}
            <div className="bg-white border border-gray-200 rounded-t-xl p-4 md:p-6 grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-12 text-sm">
                <div className="flex flex-col gap-1">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-500 tracking-wider">Order Placed</p>
                    <p className="text-gray-700">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-500 tracking-wider">Total</p>
                    <p className="font-bold text-gray-800">₹{order.total_amount?.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-500 tracking-wider">Status</p>
                    <p className="font-bold text-blue-600 uppercase text-xs">{order.order_status}</p>
                </div>
                <div className="flex flex-col gap-1 md:ml-auto md:text-right">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-500 tracking-wider">Order # {order.id}</p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 bg-gray-50/50 border-b">
                    <h2 className={`text-base font-bold flex items-center gap-2 ${order.payment_status === 'PAID' ? 'text-green-700' : 'text-orange-700'}`}>
                        <div className={`w-2 h-2 rounded-full ${order.payment_status === 'PAID' ? 'bg-green-600' : 'bg-orange-600'}`}></div>
                        Payment Status: {order.payment_status}
                    </h2>
                </div>

                <div className="p-4 md:p-6 space-y-8">
                    {order.items?.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-6 pb-8 border-b last:border-0 border-gray-100 last:pb-0">
                            {/* Product Image Placeholder */}
                            <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center shrink-0">
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter text-center px-2">
                                    {item.name}
                                </span>
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-1">
                                    <h3 
                                        className="text-[#B12704] font-bold hover:underline cursor-pointer text-lg leading-tight"
                                        onClick={() => navigate(`/info/${item.product_id}`)}
                                    >
                                        {item.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 py-1">
                                        <p><span className="font-medium text-gray-400 uppercase">ID:</span> {item.product_id}</p>
                                        <p><span className="font-medium text-gray-400 uppercase">Category:</span> {item.category}</p>
                                    </div>
                                    <p className="text-sm text-gray-700 font-medium">Quantity: {item.quantity}</p>
                                    <p className="text-md font-bold text-gray-900 mt-2">Price: ₹{item.price?.toLocaleString('en-IN')}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 w-full sm:w-48 justify-start">
                                    <button 
                                        onClick={() => navigate(`/info/${item.product_id}`)}
                                        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black text-xs py-2.5 rounded-lg font-bold border border-[#F2C200] shadow-sm transition-colors"
                                    >
                                        Buy it again
                                    </button>
                                    <Link to={`/write-review/${item.product_id}`}>
                                        <button className="w-full py-2.5 text-xs bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-bold text-gray-700 transition-colors">
                                            Write a product review
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;