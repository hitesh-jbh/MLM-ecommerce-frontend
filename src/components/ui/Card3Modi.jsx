import React, { useRef } from 'react'; 
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import { ShoppingBag, BellRing } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icons from '../ui/Icon.jsx';
import { getWishlist, addToWishlist, removeToWishlist, addToCart } from '../../utils/service/apiService.js';
import { toast } from 'react-toastify';

const Card3Modi = ({ product }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 
  const token = useSelector((state) => state.auth?.token);
  
  // --- Throttling Refs ---
  const lastWishlistClick = useRef(0);
  const lastCartClick = useRef(0);
  const THROTTLE_DELAY = 1000; // 1 second limit

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist", token],
    queryFn: () => getWishlist(token).then(res => res.data.items || res.data.data || []),
    enabled: !!token
  });

  const productId = product.product_id || product._id || product.id;
  const isOutOfStock = product?.stock <= 0;

  const isLiked = wishlistData?.some((item) => {
    const itemID = item.product_id || item._id || item.id || item.product?.id;
    return String(itemID) === String(productId);
  }) ?? false;

  // --- Throttled Wishlist Handler ---
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    
    const now = Date.now();
    if (now - lastWishlistClick.current < THROTTLE_DELAY) return;
    lastWishlistClick.current = now;

    if (!token) {
      toast.warning("Please login to manage wishlist");
      return;
    }

    const toastId = toast.loading(isLiked ? "Removing..." : "Adding...");
    
    try {
      if (isLiked) {
        await removeToWishlist(token, productId);
        toast.update(toastId, { render: "Removed!", type: "success", isLoading: false, autoClose: 2000, closeButton: true });
      } else {
        await addToWishlist(token, productId);
        toast.update(toastId, { render: "Added!", type: "success", isLoading: false, autoClose: 2000, closeButton: true });
      }
      queryClient.invalidateQueries({ queryKey: ["wishlist", token] }); 
    } catch (error) {
      toast.update(toastId, { render: "Action failed", type: "error", isLoading: false, autoClose: 3000, closeButton: true });
    }
  };

  // --- Throttled Add to Cart Handler ---
  const handleAddItem = async (e) => {
    e.stopPropagation();
    
    const now = Date.now();
    if (now - lastCartClick.current < THROTTLE_DELAY) return; // Prevent spamming cart
    lastCartClick.current = now;

    if (isOutOfStock) return;
    if (!token) {
      toast.warning("Please login to add items to cart");
      return;
    }

    const toastId = toast.loading("Adding to cart...");
    try {
      await addToCart(token, productId, 1);
      queryClient.invalidateQueries({ queryKey: ["cart", token] }); 
      toast.update(toastId, { 
        render: "Added to cart!", 
        type: "success", 
        isLoading: false, 
        autoClose: 2000,
        closeButton: true 
      });
    } catch (error) {
      toast.update(toastId, { 
        render: "Failed to add item", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000,
        closeButton: true 
      });
    }
  };

  return (
    <div className="group relative flex flex-col w-full bg-white rounded-[32px] border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-1">
      {/* Product Image Section */}
      <div onClick={() => navigate(`/product/${productId}`)} className="relative aspect-[4/5] m-2 overflow-hidden rounded-[24px] bg-[#F7F7F7] cursor-pointer">
        <img 
          src={product.thumbnail_url || 'https://dummyimage.com/400x500'} 
          alt={product.name} 
          className={`h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isOutOfStock ? 'grayscale-[0.5] opacity-80' : ''}`} 
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistToggle} 
          className={`absolute top-4 right-4 p-2.5 backdrop-blur-md rounded-full transition-all z-20 ${
            isLiked ? "bg-red-50 text-red-500" : "bg-white/90 text-gray-400"
          }`}
        >
          <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={20} />
        </button>
        
        {/* Throttled Cart Button */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden lg:block z-20">
          {isOutOfStock ? (
            <div className="w-full bg-gray-100/90 backdrop-blur-sm py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 cursor-not-allowed">
              <BellRing size={16} /> Out of Stock
            </div>
          ) : (
            <button 
              onClick={handleAddItem} 
              className="w-full bg-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-900 shadow-2xl hover:bg-black hover:text-white transition-all border border-gray-100"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="p-5 pt-2 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-black text-black">Rs. {product.price}</span>
          
          <div className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase ${
            !isOutOfStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {!isOutOfStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3Modi;


// import React from 'react';
// import useSWR, { useSWRConfig } from 'swr'; 
// import { ShoppingBag, BellRing } from 'lucide-react'; // Added BellRing for Out of Stock feel
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Icons from '../ui/Icon.jsx';
// import { getWishlist, addToWishlist, removeToWishlist, addToCart } from '../../utils/service/apiService.js';
// import { toast } from 'react-toastify';

// const Card3Modi = ({ product }) => {
//   const navigate = useNavigate();
//   const { mutate } = useSWRConfig(); 
//   const token = useSelector((state) => state.auth?.token);

//   const { data: wishlistData } = useSWR(
//     token ? ["/api/wishlist", token] : null,
//     () => getWishlist(token).then(res => res.data.items || res.data.data || [])
//   );

//   const productId = product.product_id || product._id || product.id;
//   const isOutOfStock = product?.stock <= 0; // Logic for Out of Stock

//   const isLiked = wishlistData?.some((item) => {
//     const itemID = item.product_id || item._id || item.id || item.product?.id;
//     return String(itemID) === String(productId);
//   }) ?? false;

//   const handleWishlistToggle = async (e) => {
//     e.stopPropagation();
//     if (!token) {
//       toast.warning("Please login to manage wishlist");
//       return;
//     }
//     const loadingToast = toast.loading(isLiked ? "Removing..." : "Adding...");
//     try {
//       if (isLiked) {
//         await removeToWishlist(token, productId);
//         toast.update(loadingToast, { render: "Removed!", type: "success", isLoading: false, autoClose: 2000 });
//       } else {
//         await addToWishlist(token, productId);
//         toast.update(loadingToast, { render: "Added!", type: "success", isLoading: false, autoClose: 2000 });
//       }
//       mutate(["/api/wishlist", token]); 
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "Action failed";
//       toast.update(loadingToast, { render: errorMsg, type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   const handleAddItem = async (e) => {
//     e.stopPropagation();
//     if (isOutOfStock) return; // Guard clause
//     if (!token) {
//       toast.warning("Please login to add items to cart");
//       return;
//     }
//     const loadingToast = toast.loading("Adding to cart...");
//     try {
//       await addToCart(token, productId, 1);
//       mutate(["/api/cart", token]); 
//       toast.update(loadingToast, { render: "Added to cart!", type: "success", isLoading: false, autoClose: 2000 });
//     } catch (error) {
//       toast.update(loadingToast, { render: "Failed", type: "error", isLoading: false, autoClose: 3000 });
//     }
//   };

//   return (
//     <div className="group relative flex flex-col w-full bg-white rounded-[32px] border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-1">
//       <div onClick={() => navigate(`/product/${productId}`)} className="relative aspect-[4/5] m-2 overflow-hidden rounded-[24px] bg-[#F7F7F7] cursor-pointer">
//         <img 
//           src={product.thumbnail_url || 'https://dummyimage.com/400x500'} 
//           alt={product.name} 
//           className={`h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isOutOfStock ? 'grayscale-[0.5] opacity-80' : ''}`} 
//         />
        
//         <button 
//           onClick={handleWishlistToggle} 
//           className={`absolute top-4 right-4 p-2.5 backdrop-blur-md rounded-full transition-all z-20 ${
//             isLiked ? "bg-red-50 text-red-500" : "bg-white/90 text-gray-400"
//           }`}
//         >
//           <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={20} />
//         </button>
        
//         {/* ACTION BUTTONS ON HOVER */}
//         <div className="absolute inset-x-0 bottom-4 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden lg:block z-20">
//           {isOutOfStock ? (
//             <div className="w-full bg-gray-100/90 backdrop-blur-sm py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 border border-gray-200 cursor-not-allowed">
//               <BellRing size={16} /> Out of Stock
//             </div>
//           ) : (
//             <button onClick={handleAddItem} className="w-full bg-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-900 shadow-2xl hover:bg-black hover:text-white transition-all border border-gray-100">
//               <ShoppingBag size={16} /> Add to Cart
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="p-5 pt-2 flex-1 flex flex-col">
//         <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
//         <div className="mt-auto flex items-center justify-between">
//           <span className="text-lg font-black text-black">Rs. {product.price}</span>
          
//           <div className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase ${
//             !isOutOfStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
//           }`}>
//             {!isOutOfStock ? 'In Stock' : 'Out of Stock'}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card3Modi;