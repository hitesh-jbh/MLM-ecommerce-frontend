import React, { useState } from 'react'; // Added useState
import { useSelector } from 'react-redux'; // Added to get token
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../../utils/service/apiService'; // Import your service
import { toast } from 'react-toastify'; // Optional: for feedback

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token); // Get token from Redux
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    id, 
    total_amount, 
    order_status, 
    created_at, 
    product_name, 
    productId,
    product_thumbnail, 
    ship_to 
  } = order;

  // --- UPDATED HANDLE BUY AGAIN ---
  const handleBuyAgain = async () => {
    if (!token) {
      toast.error("Please login to place an order");
      return navigate('/login');
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare the payload as per your backend requirement
      const orderData = {
        items: [
          {
            productId: productId,
            quantity: 1,
            source: "BUY_NOW" // Using BUY_NOW ensures the cart isn't cleared
          }
        ]
      };

      // 2. Call the createOrder service
      const response = await createOrder(token, orderData);

      if (response.data.success) {
        toast.success("Order placed successfully!");
        // 3. Redirect to a success page or the orders list
        navigate('/orders'); 
      }
    } catch (error) {
      console.error("Order failed:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDelivered = order_status?.toUpperCase() === "DELIVERED";
  const isCreated = order_status?.toUpperCase() === "CREATED";
  const isCancelled = order_status?.toUpperCase() === "CANCELLED";

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm mb-6 font-sans">
      {/* Header Section remains the same */}
      <div className="bg-[#f0f2f2] px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-300 text-[11px] md:text-xs text-gray-600">
        <div>
          <p className="uppercase font-bold text-gray-500">Order Placed</p>
          <p className="text-gray-800">
            {created_at ? new Date(created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
          </p>
        </div>
        <div>
          <p className="uppercase font-bold text-gray-500">Total</p>
          <p className="text-gray-800 font-bold">₹{total_amount}</p>
        </div>
        <div className="hidden md:block">
          <p className="uppercase font-bold text-gray-500">Ship To</p>
          <p className="text-blue-600 hover:text-[#C45500] cursor-pointer">{ship_to || 'User'}</p>
        </div>
        <div className="text-right">
          <p className="uppercase font-bold text-gray-500">Order # {id}</p>
          <Link to={`/view-order/${id}`} className="text-blue-600 hover:text-[#C45500] block mt-1 underline">
            View order details
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col md:flex-row gap-6">
        <div className="w-20 h-24 flex-shrink-0 bg-gray-50 rounded border overflow-hidden">
          <img 
            src={product_thumbnail || "https://via.placeholder.com/150"} 
            alt={product_name} 
            className="w-full h-full object-contain" 
          />
        </div>

        <div className="flex-1">
          <Link to={`/product/${productId}`} className="text-black font-bold hover:underline hover:text-[#C45500] block text-sm mb-1">
            {product_name}
          </Link>
          
          <div className="mb-2">
            <p className={`text-[10px] font-bold 
              ${isDelivered ? 'text-green-700' : 
                isCreated ? 'text-orange-700' : 
                isCancelled ? 'text-red-600' : 'text-gray-700'}`}>
              {order_status}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-48">
          <Link to={`/write-review/${productId}`}>
            <button className="w-full py-1.5 text-xs bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium">
              Write a product review
            </button>
          </Link>
          <button 
            onClick={handleBuyAgain} 
            disabled={isSubmitting}
            className={`w-full py-2 text-black text-[12px] rounded-lg shadow-sm font-medium border
              ${isSubmitting ? 'bg-gray-200 cursor-not-allowed border-gray-300' : 'bg-[#FFD814] hover:bg-[#F7CA00] border-[#F2C200]'}`}
          >
            {isSubmitting ? "Processing..." : "Buy it again"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { addItem } from '../../../utils/Slice/cartSlice';

// const OrderCard = ({ order }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Destructure directly from the order object (flat structure)
//   const { 
//     id, 
//     total_amount, 
//     order_status, 
//     created_at, 
//     product_name, 
//     productId,
//     product_thumbnail, 
//     ship_to 
//   } = order;

//   const handleBuyAgain = () => {
//     dispatch(addItem({
//       id: id,
//       name: product_name,
//       image: product_thumbnail || "https://via.placeholder.com/150",
//       quantity: 1,
//       // Pass standard defaults since API is flat
//       selectedSize: { size: "Standard", price: total_amount, stock: 100 }
//     }));
//     navigate('/cart');
//   };

//   // Status mapping
//   const isDelivered = order_status?.toUpperCase() === "DELIVERED";
//   const isCreated = order_status?.toUpperCase() === "CREATED";
//   const isCancelled = order_status?.toUpperCase() === "CANCELLED";

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm mb-6 font-sans">
//       {/* Header Section */}
//       <div className="bg-[#f0f2f2] px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-300 text-[11px] md:text-xs text-gray-600">
//         <div>
//           <p className="uppercase font-bold text-gray-500">Order Placed</p>
//           <p className="text-gray-800">
//             {created_at ? new Date(created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
//           </p>
//         </div>
//         <div>
//           <p className="uppercase font-bold text-gray-500">Total</p>
//           <p className="text-gray-800 font-bold">₹{total_amount}</p>
//         </div>
//         <div className="hidden md:block">
//           <p className="uppercase font-bold text-gray-500">Ship To</p>
//           <p className="text-blue-600 hover:text-[#C45500] cursor-pointer">{ship_to || 'User'}</p>
//         </div>
//         <div className="text-right">
//           <p className="uppercase font-bold text-gray-500">Order # {id}</p>
//           <Link to={`/view-order/${id}`} className="text-blue-600 hover:text-[#C45500] block mt-1 underline">
//             View order details
//           </Link>
//         </div>
//       </div>

//       {/* Product Body: Removed .map() because the data is flat */}
//       <div className="p-4 flex flex-col md:flex-row gap-6">
//         {/* Image */}
//         <div className="w-20 h-24 flex-shrink-0 bg-gray-50 rounded border overflow-hidden">
//           <img 
//             src={product_thumbnail || "https://via.placeholder.com/150"} 
//             alt={product_name} 
//             className="w-full h-full object-contain" 
//           />
//         </div>

//         {/* Product Details */}
//         <div className="flex-1">
//           <Link to={`/product/${id}`} className="text-black font-bold hover:underline hover:text-[#C45500] block text-sm mb-1">
//             {product_name}
//           </Link>
          
//           <div className="mb-2">
//             <p className={`text-[10px] font-bold 
//               ${isDelivered ? 'text-green-700' : 
//                 isCreated ? 'text-orange-700' : 
//                 isCancelled ? 'text-red-600' : 'text-gray-700'}`}>
//               {order_status}
//             </p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col gap-2 w-full md:w-48">
//           <Link to={`/write-review/${productId}`}>
//                 <button className="w-full py-1.5 text-xs bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium">
//                   Write a product review
//                 </button>
//           </Link>
//           <button 
//             onClick={handleBuyAgain} 
//             className="w-full py-2 text-black text-[12px] bg-[#FFD814] hover:bg-[#F7CA00] border border-[#F2C200] rounded-lg shadow-sm font-medium"
//           >
//             Buy it again
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;