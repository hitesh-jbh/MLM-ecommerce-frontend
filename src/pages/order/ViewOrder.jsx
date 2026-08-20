import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOrderDetails, cancelOrder } from '../../utils/service/apiService';
import ProductInfoShimmer from '../../components/shimmer/ProductInfoShimmer';
import { toast } from 'react-toastify';
import { XCircle, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

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
            
            // 👇 FIX: API से आने वाले डेटा को सही से कैच करेगा, चाहे वो किसी भी फॉर्मेट में हो
            const orderData = response.data?.data || response.data || response;
            setOrder(orderData);
            
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
            if (response.data?.success || response.status === 200) {
                toast.success(`Order #${id} has been cancelled`, toastOptions);
                fetchOrder(); // Status रिफ्रेश करने के लिए
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Cancellation failed", toastOptions);
        } finally {
            setIsCancelling(false);
        }
    };

    if (loading) return <ProductInfoShimmer />;
    
    // अगर सच में डेटा नहीं मिला तब ही यह दिखेगा
    if (!order || Object.keys(order).length === 0) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
            <h2 className="text-2xl font-serif font-black text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-500 mb-6">We couldn't find the details for this order.</p>
            <button onClick={() => navigate('/profile/your-order')} className="px-6 py-2 bg-dirora-dark text-white rounded-lg font-bold">Go Back</button>
        </div>
    );

    const status = order.order_status?.toUpperCase();

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans bg-white min-h-screen relative">
            
            {/* --- CANCELLATION MODAL --- */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200 border border-gray-100">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <XCircle className="text-red-500" size={32} />
                        </div>
                        <h3 className="text-2xl font-serif font-black text-gray-900 mb-3 text-center">Cancel Order?</h3>
                        <p className="text-gray-500 text-sm mb-8 text-center leading-relaxed">
                            Are you sure you want to cancel this entire order? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowCancelModal(false)} className="flex-1 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                                No, Keep it
                            </button>
                            <button onClick={handleCancelOrder} className="flex-1 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <nav className="mb-8 flex justify-between items-center">
                <button 
                    onClick={() => navigate('/profile/your-order')} 
                    className="text-gray-500 hover:text-dirora-purple text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
                >
                    <ArrowLeft size={16} /> Back to Orders
                </button>

                {status !== 'CANCELLED' && status !== 'DELIVERED' && (
                    <button 
                        onClick={() => setShowCancelModal(true)}
                        disabled={isCancelling}
                        className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 disabled:opacity-50 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                        <AlertCircle size={16} />
                        {isCancelling ? "Processing..." : "Cancel Order"}
                    </button>
                )}
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif font-black mb-8 text-dirora-dark tracking-tight">Order Details</h1>
            
            {/* Header Info Card */}
            <div className="bg-[#f8f5ff] border border-purple-100 rounded-2xl p-6 grid grid-cols-2 md:flex md:flex-wrap gap-6 md:gap-12 text-sm shadow-sm mb-8">
                <div className="flex flex-col gap-1.5">
                    <p className="uppercase text-[10px] font-bold text-gray-400 tracking-widest">Order Placed</p>
                    <p className="text-gray-900 font-bold">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="uppercase text-[10px] font-bold text-gray-400 tracking-widest">Total Amount</p>
                    <p className="font-black text-dirora-dark text-lg leading-none">₹{Number(order.total_amount)?.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="uppercase text-[10px] font-bold text-gray-400 tracking-widest">Order Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit shadow-sm
                        ${status === 'DELIVERED' ? 'bg-green-100 text-green-700 border border-green-200' : 
                          status === 'CANCELLED' ? 'bg-red-100 text-red-600 border border-red-200' : 
                          'bg-purple-100 text-dirora-purple border border-purple-200'}`}>
                        {status}
                    </span>
                </div>
                <div className="flex flex-col gap-1.5 md:ml-auto md:text-right">
                    <p className="uppercase text-[10px] font-bold text-gray-400 tracking-widest">Order ID</p>
                    <p className="text-gray-900 font-bold font-mono">#{order.id || order._id}</p>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-10">
                <div className="p-5 md:p-6 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
                    <h2 className={`text-xs uppercase tracking-widest font-bold flex items-center gap-2 ${order.payment_status === 'PAID' ? 'text-green-600' : 'text-orange-500'}`}>
                        {order.payment_status === 'PAID' ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>}
                        Payment: {order.payment_status || "PENDING"}
                    </h2>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {order.items?.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-8 pb-8 border-b last:border-0 border-gray-100 last:pb-0">
                            {/* Product Image */}
                            <div className="w-28 h-32 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                <img 
                                    src={item.thumbnail_url || item.image || "https://via.placeholder.com/150"} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-2">
                                    <h3 
                                        className="text-gray-900 font-serif font-bold hover:text-dirora-purple cursor-pointer text-lg leading-tight transition-colors line-clamp-2"
                                        onClick={() => navigate(`/product/${item.product_id}`)}
                                    >
                                        {item.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                                        <p><span className="uppercase text-[10px] text-gray-400 font-bold tracking-widest mr-1">Product ID:</span> {item.product_id}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 font-bold bg-gray-50 w-fit px-3 py-1 rounded-md">Qty: {item.quantity}</p>
                                    <p className="text-xl font-black text-dirora-dark mt-3">₹{Number(item.price)?.toLocaleString('en-IN')}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 w-full sm:w-48 justify-center">
                                    <button 
                                        onClick={() => navigate(`/product/${item.product_id}`)}
                                        className="w-full bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white text-xs py-3 rounded-xl font-bold uppercase tracking-widest shadow-md shadow-purple-500/20 transition-all active:scale-[0.98]"
                                    >
                                        Buy it again
                                    </button>
                                    <Link to={`/write-review/${item.product_id}`}>
                                        <button className="w-full py-3 text-xs bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 font-bold text-gray-700 uppercase tracking-widest transition-all">
                                            Write Review
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