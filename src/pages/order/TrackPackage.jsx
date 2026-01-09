import React from 'react'
import { useParams, Link } from 'react-router-dom';
import StepBar from '../../ui/bar/StepBar.jsx';
import { shippedProducts } from '../../utils/Constants.jsx';

const TrackPackage = () => {
    const { orderId } = useParams();

    // In a real app, you would fetch this data from an API
    const currentOrder = shippedProducts;

    const orderData = currentOrder.find(o => o.orderId === orderId) || currentOrder[0];
    // const orderData = currentOrder.find(o => o.orderId === orderId) || currentOrder[0];
    const item = orderData.items[0];
    
    // Logic to determine if the order is cancelled
    const isCancelled = orderData.status === "0" || orderData.status?.toLowerCase() === "cancelled";

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            <nav className="text-sm mb-4">
                <Link to="/your-order" className="text-gray-700 hover:underline cursor-pointer">Your Orders</Link>
                <span className="mx-1 text-gray-500">›</span>
                <span className="text-black">Track Package</span>
            </nav>

            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${isCancelled ? 'text-red-600' : 'text-gray-900'}`}>
                    {isCancelled ? "Order Cancelled" : "Track Package"}
                </h1>
                <p className="text-gray-600">Order ID: {orderData.orderId}</p>
            </div>

            {/* Product Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start border-b pb-8 mb-8">
                <div className={`w-32 h-40 flex-shrink-0 border rounded-md p-2 bg-white ${isCancelled ? 'grayscale' : ''}`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-black hover:text-orange-600 cursor-pointer">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 font-bold">₹{orderData.total.toFixed(2)}</p>
                </div>
            </div>

            {/* Progress Bar Section */}
           <div className={`bg-white p-6 rounded-xl border shadow-sm ${isCancelled ? 'border-red-100 bg-red-50/30' : 'border-green-100 bg-green-50/30'}`}>
                {/* FIXED: Passing 'status' prop and using 'orderData' */}
                <StepBar status={orderData.status} />
                
                {isCancelled && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        <strong>Note:</strong> This order was cancelled. A refund will be processed within 5-7 business days.
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrackPackage;