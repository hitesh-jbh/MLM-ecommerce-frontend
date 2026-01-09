import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem } from '../../../utils/Slice/cartSlice';

const OrderCard = ({ order }) => {
  const { orderDate, price, orderId, shipTo, items, status, id, name, image } = order;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyAgain = (item) => {
    dispatch(addItem({
      id: item.id,
      name: item.title,
      image: item.image,
      quantity: 1,
      selectedSize: {
        size: order.size || "M",
        price: price / items.length,
        stock: 100 // Ensures it passes the reducer's stock check
      }
    }));
    navigate('/cart');
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
            <p>₹{price.toFixed(2)}</p>
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

            <div className="flex flex-col gap-2 w-full md:w-48 pt-2 md:pt-0">
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
                  className="w-full py-1.5 text-white text-sm bg-black border border-gray-800 rounded-lg hover:bg-white hover:border-black hover:text-black shadow-sm transition font-medium"
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
