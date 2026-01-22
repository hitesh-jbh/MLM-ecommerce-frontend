import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderDetails, cancelOrder } from '../../utils/service/apiService';
import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer';
import { toast } from 'react-toastify';
import { XCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const ViewOrder = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth?.token);
    
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const toastOptions = { theme: "light", position: "bottom-center" };

    const fetchOrder = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const response = await getOrderDetails(token, id);
            setOrder(response.data?.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
            toast.error("Failed to load order details", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
        window.scrollTo(0, 0);
    }, [id, token]);

    const handleCancelOrder = async () => {
        setShowCancelModal(false);
        setIsCancelling(true);
        try {
            const response = await cancelOrder(token, id);
            if (response.data.success) {
                toast.success(`Order #${id} has been cancelled`, toastOptions);
                fetchOrder(); // Refresh data to show CANCELLED status
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Cancellation failed", toastOptions);
        } finally {
            setIsCancelling(false);
        }
    };

    if (loading) return <ProductInfoShimmer />;
    if (!order) return <div className="p-20 text-center text-gray-500">Order not found.</div>;

    const status = order.order_status?.toUpperCase();

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans bg-gray-50 min-h-screen relative">
            
            {/* --- CANCELLATION MODAL --- */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <XCircle className="text-red-600" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Order?</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            Are you sure you want to cancel this entire order? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                                No, Keep it
                            </button>
                            <button onClick={handleCancelOrder} className="flex-1 py-3 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <nav className="mb-4 flex justify-between items-center">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-blue-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1 transition-all"
                >
                    <span className="text-lg">←</span> Back to your orders
                </button>

                {/* Header Cancel Button */}
                {status !== 'CANCELLED' && status !== 'DELIVERED' && (
                    <button 
                        onClick={() => setShowCancelModal(true)}
                        disabled={isCancelling}
                        className="text-red-600 hover:text-red-700 text-sm font-bold underline flex items-center gap-1 disabled:opacity-50"
                    >
                        <AlertCircle size={16} />
                        {isCancelling ? "Processing..." : "Cancel Order"}
                    </button>
                )}
            </nav>

            <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Details</h1>
            
            {/* Header Info Card */}
            <div className="bg-white border border-gray-200 rounded-t-xl p-4 md:p-6 grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-12 text-sm shadow-sm">
                <div className="flex flex-col gap-1">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-400 tracking-wider">Order Placed</p>
                    <p className="text-gray-700 font-medium">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-400 tracking-wider">Total</p>
                    <p className="font-bold text-gray-900 text-base">₹{Number(order.total_amount)?.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-400 tracking-wider">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter w-fit
                        ${status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                          status === 'CANCELLED' ? 'bg-red-100 text-red-600' : 
                          'bg-blue-100 text-blue-700'}`}>
                        {status}
                    </span>
                </div>
                <div className="flex flex-col gap-1 md:ml-auto md:text-right">
                    <p className="uppercase text-[10px] md:text-xs font-semibold text-gray-400 tracking-wider">Order # {order.id}</p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl shadow-sm overflow-hidden mb-10">
                <div className="p-4 md:p-6 bg-gray-50/50 border-b flex justify-between items-center">
                    <h2 className={`text-base font-bold flex items-center gap-2 ${order.payment_status === 'PAID' ? 'text-green-700' : 'text-orange-700'}`}>
                        {order.payment_status === 'PAID' ? <CheckCircle2 size={18} /> : <div className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse"></div>}
                        Payment Status: {order.payment_status}
                    </h2>
                </div>

                <div className="p-4 md:p-6 space-y-8">
                    {order.items?.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-6 pb-8 border-b last:border-0 border-gray-100 last:pb-0">
                            <div className="w-32 h-32 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shrink-0 p-2">
                                <img 
                                    src={item.thumbnail_url || "https://via.placeholder.com/150"} 
                                    alt={item.name} 
                                    className="w-full h-full object-contain hover:scale-105 transition-transform" 
                                />
                            </div>

                            <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-1">
                                    <h3 
                                        className="text-gray-900 font-bold hover:text-blue-600 cursor-pointer text-lg leading-tight transition-colors"
                                        onClick={() => navigate(`/product/${item.product_id}`)}
                                    >
                                        {item.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 py-1 font-medium">
                                        <p><span className="uppercase text-[10px]">ID:</span> {item.product_id}</p>
                                        <p><span className="uppercase text-[10px]">Category:</span> {item.category}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 font-semibold">Quantity: {item.quantity}</p>
                                    <p className="text-lg font-black text-gray-900 mt-2">₹{item.price?.toLocaleString('en-IN')}</p>
                                </div>

                                <div className="flex flex-col gap-2 w-full sm:w-48 justify-center">
                                    <button 
                                        onClick={() => navigate(`/product/${item.product_id}`)}
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