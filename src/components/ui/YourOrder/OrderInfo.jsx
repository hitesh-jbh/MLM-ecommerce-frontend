import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
  const { orderDate, total, orderId, shipTo, items, status } = order;
  const navigate = useNavigate();

  const handleBuyAgain = (item) => {
    console.log("Adding to cart:", item.title);
    navigate('/cart'); 
    alert(`${item.title} added to cart!`);
  };

  const handleWriteReview = (orderId) => {
    navigate(`/write-review/${orderId}`);
  };

  const handleCancelPackage = (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this package?");
    if (confirmCancel) {
      console.log("Cancelling order:", orderId);
      alert("Order cancellation request submitted.");
    }
  };

  const handleTrackClick = () => {
    navigate(`/your-order/${orderId}`);
  };

  const isCompletedOrCancelled = status === "0" || status === "5";
  const isInProgress = ["1", "2", "3", "4"].includes(status);

  return (
    <div className="border border-gray-300 rounded-lg mb-6 overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-[#f0f2f2] px-4 py-3 flex flex-wrap gap-y-4 justify-between items-center border-b border-gray-300 text-[12px] md:text-sm text-gray-600">
        <div className="flex gap-6 md:gap-10">
          <div>
            <p className="uppercase text-[10px] font-bold text-gray-500">Order Placed</p>
            <p>{orderDate}</p>
          </div>
          <div>
            <p className="uppercase text-[10px] font-bold text-gray-500">Total</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
          <div className="hidden sm:block">
            <p className="uppercase text-[10px] font-bold text-gray-500">Ship To</p>
            <p className="text-gray-700 hover:text-orange-700 cursor-pointer hover:underline">{shipTo}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="uppercase text-[10px] font-bold text-gray-500">Order # {orderId}</p>
          {status === "0" && (
            <span className="text-red-600 font-bold text-[10px] uppercase">Cancelled</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 mb-4 last:mb-0 border-b last:border-0 pb-4 last:pb-0">
            {/* Image */}
            <div className={`w-24 h-28 flex-shrink-0 mx-auto md:mx-0 ${status === "0" ? 'grayscale opacity-60' : ''}`}>
              <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
            </div>

            {/* Item Details */}
            <div className="flex-1 space-y-1">
              <Link to={`/product/${item.id}`} className="text-gray-900 font-medium hover:text-orange-700 text-sm md:text-base leading-tight block">
                {item.title}
              </Link>
              {status === "5" ? (
                <p className="text-xs text-green-600 font-medium">Delivered</p>
              ) : status === "0" ? (
                <p className="text-xs text-red-500 font-medium">This order was cancelled</p>
              ) : (
                <p className="text-xs text-gray-500 italic">Return window expires on {item.returnExpiry}</p>
              )}
            </div>

            {/* Actions Section */}
            <div className="flex flex-col gap-2 w-full md:w-48 pt-2 md:pt-0">
              {/* ALWAYS SHOW REVIEW IF DELIVERED */}
              {status === "5" && (
                <button 
                  onClick={() => handleWriteReview(item.id)}
                  className="w-full py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition"
                >
                  Write a product review
                </button>
              )}

              {/* IF IN PROGRESS: Track and Cancel */}
              {isInProgress && (
                <>
                  <button onClick={handleTrackClick} className="w-full py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition">
                    Track Package
                  </button>
                  <button 
                    onClick={() => handleCancelPackage(orderId)}
                    className="w-full py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-red-50 text-red-600 shadow-sm transition"
                  >
                    Cancel Package
                  </button>
                </>
              )}

              {/* IF CANCELLED or DELIVERED: Buy Again */}
              {isCompletedOrCancelled && (
                <button 
                  onClick={() => handleBuyAgain(item)}
                  className="w-full py-1.5 text-sm bg-yellow-400 border border-yellow-500 rounded-lg hover:bg-yellow-500 shadow-sm transition font-medium"
                >
                  Buy it again
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;