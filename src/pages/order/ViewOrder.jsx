import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
                // Call the service with the ID from the URL
                const response = await getOrderDetails(token, id);
                // The API wraps the object in a 'data' key
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
    console.log(order)

    if (loading) return <ProductInfoShimmer />;
    if (!order) return <div className="p-20 text-center text-gray-500">Order not found.</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h1>
            
            <div className="bg-white border border-gray-200 rounded-t-lg p-4 flex flex-wrap gap-8 text-sm text-gray-600">
                <div>
                    <p className="uppercase text-xs font-semibold text-gray-500">Order Placed</p>
                    <p>{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                    <p className="uppercase text-xs font-semibold text-gray-500">Total</p>
                    <p className="font-bold text-gray-800">₹{order.total_amount}</p>
                </div>
                <div>
                    <p className="uppercase text-xs font-semibold text-gray-500">Status</p>
                    <p className="font-bold text-blue-600">{order.order_status}</p>
                </div>
                <div className="ml-auto text-right">
                    <p className="uppercase text-xs font-semibold text-gray-500">Order # {order.id}</p>
                </div>
            </div>

            <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-6 shadow-sm">
                <h2 className="text-lg font-bold text-green-700 mb-4 border-b pb-2">
                    Payment Status: {order.payment_status}
                </h2>

                <div className="space-y-8">
                    {/* Accessing the nested items array from the response */}
                    {order.items?.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 pb-6 border-b last:border-0 border-gray-100">
                            <div className="w-24 h-24 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                                {/* Using the name for alt text as image URL isn't in this specific response */}
                                <span className="text-gray-400 text-[10px] text-center p-1">{item.name}</span>
                            </div>

                            <div className="flex-1">
                                <h3 
                                    className="text-[#B12704] font-bold hover:underline cursor-pointer text-base"
                                    onClick={() => navigate(`/info/${item.product_id}`)}
                                >
                                    {item.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Category: {item.category}</p>
                                <p className="text-sm text-gray-700 mt-2">Quantity: {item.quantity}</p>
                                <p className="text-[#B12704] font-bold mt-1">₹{item.price}</p>
                                
                                <div className="mt-4 flex gap-3">
                                    <button 
                                        onClick={() => navigate(`/info/${item.product_id}`)}
                                        className="bg-[#FFD814] hover:bg-[#F7CA00] text-black text-xs py-1.5 px-6 rounded-full font-medium border border-[#F2C200]"
                                    >
                                        Buy it again
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <button 
                    onClick={() => navigate('/your-order')} 
                    className="text-blue-600 hover:text-orange-700 text-sm font-medium hover:underline"
                >
                    ← Back to your orders
                </button>
            </div>
        </div>
    );
};

export default ViewOrder;