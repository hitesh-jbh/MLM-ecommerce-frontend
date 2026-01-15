// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { addItem } from '../../../utils/Slice/cartSlice';

// const OrderCard = ({ order }) => {
//   // Mapping to your API response structure
//   const { 
//     id: orderId, 
//     total_amount, 
//     order_status: status, 
//     created_at, 
//     items = [] 
//   } = order;
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleBuyAgain = (item) => {
//     dispatch(addItem({
//       id: item.product_id,
//       name: item.name,
//       image: item.image || "https://via.placeholder.com/150",
//       quantity: 1,
//       selectedSize: { size: "Standard", price: item.price, stock: 100 }
//     }));
//     navigate('/cart');
//   };
//   console.log(order)

//   // Status mapping to match Amazon-style colors
//   const isDelivered = status?.toLowerCase() === "delivered" || status?.toLowerCase() === "created";
//   const isCancelled = status?.toLowerCase() === "cancelled";

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm mb-6 font-sans">
//       {/* Header: Displays metadata from the response */}
//       <div className="bg-[#f0f2f2] px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-300 text-[11px] md:text-xs text-gray-600">
//         <div>
//           <p className="uppercase font-bold text-gray-500">Order Placed</p>
//           <p className="text-gray-800">
//             {new Date(created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
//           </p>
//         </div>
//         <div>
//           <p className="uppercase font-bold text-gray-500">Total</p>
//           <p className="text-gray-800 font-bold">₹{total_amount}</p>
//         </div>
//         <div className="hidden md:block">
//           <p className="uppercase font-bold text-gray-500">Ship To</p>
//           <p className="text-blue-600 hover:text-[#C45500] cursor-pointer">User</p>
//         </div>
//         <div className="text-right">
//           <p className="uppercase font-bold text-gray-500">Order # {orderId}</p>
//           {/* Navigates to the detailed view using the orderId */}
//           <Link to={`/view-order/${orderId}`} className="text-blue-600 hover:text-[#C45500] block mt-1 underline">
//             View order details
//           </Link>
//         </div>
//       </div>

//       {/* Item List: Maps through the items array */}
//       <div className="p-4 space-y-4">
//         {items.map((item, index) => (
//           <div key={index} className="flex flex-col md:flex-row gap-6 pb-4 border-b last:border-0 border-gray-100">
//             {/* Image Placeholder - update 'item.image' if added to API later */}
//             <div className="w-20 h-24 flex-shrink-0 bg-gray-50 rounded border overflow-hidden">
//               <img 
//                 src={item.product_thumbnail} 
//                 alt={item.product_name} 
//                 className="w-full h-full object-contain" 
//               />
//             </div>

//             <div className="flex-1">
//               <Link to={`/view-order/${item.product_id}`} className="text-[#B12704] font-bold hover:underline block text-sm mb-1">
//                 {item.product_name}
//               </Link>
//               <span className="text-[#B12704] font-bold hover:underline block text-sm mb-1">{item.product_id}</span>
              
//               <div className="mb-2">
//                 <p className={`text-[12px] font-bold ${isDelivered ? 'text-green-700' : isCancelled ? 'text-red-600' : 'text-orange-700'}`}>
//                   {status}
//                 </p>
//               </div>
//               {/* <p className="text-[11px] text-gray-500">Quantity: {item.quantity}</p>
//               <p className="text-[11px] text-gray-400 mt-1">Category: {item.category}</p> */}
//             </div>

//             {/* Actions: Matching the visual theme */}
//             <div className="flex flex-col gap-2 w-full md:w-48">
//               <button className="w-full py-1.5 text-xs bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium">
//                 Write a product review
//               </button>
//               <button 
//                 onClick={() => handleBuyAgain(item)} 
//                 className="w-full py-2 text-black text-[12px] bg-[#FFD814] hover:bg-[#F7CA00] border border-[#F2C200] rounded-lg shadow-sm font-medium"
//               >
//                 Buy it again
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderCard;

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem } from '../../../utils/Slice/cartSlice';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Destructure directly from the order object (flat structure)
  const { 
    id, 
    total_amount, 
    order_status, 
    created_at, 
    product_name, 
    product_thumbnail, 
    ship_to 
  } = order;

  const handleBuyAgain = () => {
    dispatch(addItem({
      id: id,
      name: product_name,
      image: product_thumbnail || "https://via.placeholder.com/150",
      quantity: 1,
      // Pass standard defaults since API is flat
      selectedSize: { size: "Standard", price: total_amount, stock: 100 }
    }));
    navigate('/cart');
  };

  // Status mapping
  const isDelivered = order_status?.toUpperCase() === "DELIVERED";
  const isCreated = order_status?.toUpperCase() === "CREATED";
  const isCancelled = order_status?.toUpperCase() === "CANCELLED";

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm mb-6 font-sans">
      {/* Header Section */}
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

      {/* Product Body: Removed .map() because the data is flat */}
      <div className="p-4 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-20 h-24 flex-shrink-0 bg-gray-50 rounded border overflow-hidden">
          <img 
            src={product_thumbnail || "https://via.placeholder.com/150"} 
            alt={product_name} 
            className="w-full h-full object-contain" 
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <Link to={`/product/${id}`} className="text-black font-bold hover:underline hover:text-[#C45500] block text-sm mb-1">
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

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full md:w-48">
          <button className="w-full py-1.5 text-xs bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium">
            Write a product review
          </button>
          <button 
            onClick={handleBuyAgain} 
            className="w-full py-2 text-black text-[12px] bg-[#FFD814] hover:bg-[#F7CA00] border border-[#F2C200] rounded-lg shadow-sm font-medium"
          >
            Buy it again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;