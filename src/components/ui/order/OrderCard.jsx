import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder, cancelOrder } from '../../../utils/service/apiService'; 
import { toast } from 'react-toastify';
import { XCircle } from 'lucide-react';

const OrderCard = ({ order, refreshOrders }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  
  // State management
  const [setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Parse strings into arrays
  const productIds = order.product_ids ? order.product_ids.split(',') : [];
  const productNames = order.product_names ? order.product_names.split(',') : [];
  const productThumbnails = order.product_thumbnails ? order.product_thumbnails.split(',') : [];

  // Light theme configuration for all toasts
  const toastOptions = { theme: "light" };

  const handleBuyAgain = async (productId) => {
    if (!token) {
      toast.error("Please login to place an order", toastOptions);
      return navigate('/login');
    }
    setIsSubmitting(true);
    try {
      const orderData = {
        items: [{ productId: productId, quantity: 1, source: "BUY_NOW" }]
      };
      const response = await createOrder(token, orderData);
      if (response.data.success) {
        toast.success("Order placed successfully!", toastOptions);
        navigate('/profile/your-order');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order", toastOptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmCancellation = async () => {
    setShowCancelModal(false);
    setIsCancelling(true);
    try {
      const response = await cancelOrder(token, order.id);
      if (response.data.success) {
        toast.success("Order cancelled successfully", toastOptions);
        if (refreshOrders) refreshOrders(); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order", toastOptions);
    } finally {
      setIsCancelling(false);
    }
  };

  const status = order.order_status?.toUpperCase();

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm mb-6 font-sans relative">
      
      {/* --- CUSTOM CANCELLATION MODAL --- */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Cancel Order?</h3>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to cancel this entire order? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={confirmCancellation}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase hover:bg-red-700 transition-colors shadow-lg shadow-red-100"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gray-50/80 px-5 py-4 flex flex-wrap items-center justify-between border-b border-gray-100 gap-4">
        <div className="flex gap-8 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
          <div>
            <p className="text-black">Order Placed</p>
            <p className="text-gray-700 mt-1">{order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-black">Total Amount</p>
            <p className="text-gray-700 mt-1 text-sm font-bold">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-black">Ship To</p>
            <p className="text-blue-600 mt-1 hover:underline cursor-pointer flex items-center gap-1">
              {order.ship_to || 'Guest'} 
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-black font-bold uppercase">Order ID: #{order.id}</p>
          <div className="flex items-center gap-4 mt-1">
            <Link to={`/view-order/${order.id}`} className="text-xs text-blue-600 font-bold hover:text-blue-800 transition-colors">
              View Details
            </Link>
            <div className="h-3 w-[1px] bg-gray-300"></div>
            {status !== 'CANCELLED' && status !== 'DELIVERED' && (
              <button 
                onClick={() => setShowCancelModal(true)}
                className="text-xs text-red-500 font-bold hover:text-red-700 flex items-center gap-1 group transition-colors"
                disabled={isCancelling}
              >
                <XCircle size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                {isCancelling ? "Processing..." : "Cancel Order"}
              </button>
            )}
            {status === 'CANCELLED' && <span className="text-xs text-gray-400 font-bold italic">Order Cancelled</span>}
          </div>
        </div>
      </div>

      {/* Product List Section */}
      <div className="divide-y divide-gray-200">
        {productIds.map((pid, index) => (
          <div key={`${order.id}-${pid}-${index}`} className="p-4 flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-20 h-24 flex-shrink-0 bg-gray-50 rounded border overflow-hidden">
              <img 
                src={productThumbnails[index] || "https://via.placeholder.com/150"} 
                alt={productNames[index]} 
                className="w-full h-full object-contain" 
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <Link to={`/product/${pid}`} className="text-black font-bold hover:underline hover:text-[#C45500] block text-sm mb-1">
                {productNames[index] || "Product Name Not Available"}
              </Link>
              <div className="mb-2">
                <p className={`text-[10px] font-bold 
                  ${status === 'DELIVERED' ? 'text-green-700' : 
                    status === 'CREATED' ? 'text-orange-700' : 
                    status === 'CANCELLED' ? 'text-red-600' : 'text-gray-700'}`}>
                  {status}
                </p>
              </div>
            </div>

            {/* Actions for this specific product */}
            <div className="flex flex-col gap-2 w-full md:w-48">
              <Link to={`/write-review/${pid}`}>
                <button className="w-full py-1.5 text-[11px] bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium">
                  Write a product review
                </button>
              </Link>
              <button 
              onClick={() => navigate(`/product/${pid}`)}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black text-xs py-2.5 rounded-lg font-bold border border-[#F2C200] shadow-sm transition-colors"
              >
                Buy it again
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;