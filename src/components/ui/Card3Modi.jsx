import React, { useState } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Icons from '../ui/Icon.jsx';
import { addItem } from '../../utils/Slice/cartSlice.js';
import { useDispatch } from 'react-redux';

const Card3Modi = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  // 1. Safe Formatting for Prices
  const displayPrice = typeof product.price === 'number' 
    ? `Rs. ${product.price.toFixed(2)}` 
    : product.price;

  const displayOriginal = typeof product.originalPrice === 'number'
    ? `Rs. ${product.originalPrice.toFixed(2)}`
    : product.originalPrice;

  // 2. Navigation Handler
  const goToInfoPage = () => {
    navigate(`/product/${product.id}`);
  };

  // 3. Wishlist Toggle Handler
  const handleWishlist = (e) => {
    e.stopPropagation(); // Prevents navigating to info page
    setIsLiked(!isLiked);
  };

  // 4. Cart Handler
  const handleAddItem = (e) => {
    e.stopPropagation();

    // 1. Find the "M" size specifically from the variants array
    const mVariant = product.variants?.find(v => v.size === "M") || product.variants?.[0];

    if (!mVariant) {
      console.error("No variants found for this product");
      goToInfoPage();
      return;
    }

    // 2. Check stock for the "M" variant
    if (mVariant.stock === 0) {
      alert(`Size ${mVariant.size} is currently out of stock!`);
      return;
    }

    // 3. Dispatch to cart
    dispatch(addItem({
      id: product.id,
      name: product.name,
      image: Array.isArray(product.images) ? product.images[0] : (product.image || product.images),
      selectedSize: mVariant, // This contains size: "M" and the specific price
      quantity: 1
    }));

    // Optional: UI Feedback
    alert(`Added ${product.name} (Size ${mVariant.size}) at Rs. ${mVariant.price} to cart!`);
  };

  return (
    <div className="group relative flex flex-col w-full bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-xl">
      
      {/* Image Section - CLICKABLE */}
      <div 
        onClick={goToInfoPage}
        className="relative aspect-[4/5] m-1.5 sm:m-2 overflow-hidden rounded-[18px] sm:rounded-[24px] bg-[#F7F7F7] cursor-pointer"
      >
        <img
          src={Array.isArray(product.images) ? product.images[0] : (product.image || product.images)}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <span className="bg-[#1A1A1A]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <span className="text-amber-400">★</span> 
            <span className="hidden xs:inline">New Arrival</span>
            <span className="xs:hidden">New</span>
          </span>
        </div>

        {/* Wishlist Button - WORKING */}
        <button 
          onClick={handleWishlist} 
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 backdrop-blur-sm rounded-full transition-all shadow-sm active:scale-90 z-10 ${
            isLiked 
              ? "bg-red-50 text-red-500" 
              : "bg-white/80 text-gray-500 hover:text-red-500"
          }`}
        >
          <Icons 
            icon={isLiked ? "heroicons:heart-solid" : "heroicons:heart"} 
            size={20} 
            className={isLiked ? "fill-current" : ""} 
          />
        </button>

        {/* Desktop Add to Cart Hover Button */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out hidden lg:block">
          <button 
            onClick={handleAddItem}
            className="w-full bg-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-900 shadow-xl hover:bg-black hover:text-white transition-colors border border-gray-100"
          >
            <ShoppingBag size={18} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 lg:p-5 pt-1 sm:pt-2 flex-1 flex flex-col">
        {/* Text Area - CLICKABLE */}
        <div onClick={goToInfoPage} className="cursor-pointer">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-gray-600 truncate max-w-[70%]">
              {product.category || 'Casual'}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star size={12} className="text-amber-500 fill-amber-500 sm:w-3.5 sm:h-3.5" />
              <span className="text-[10px] sm:text-xs font-bold text-gray-800">4.8</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base  lg:text-[14px] font-bold text-gray-900 leading-tight mb-0.5 sm:mb-1 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4 font-medium">by {product.brand}</p>
        </div>

        {/* Price & Stock Section */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-red-600 leading-none">{displayPrice}</span>
            {displayOriginal && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through mt-0.5">{displayOriginal}</span>
            )}
          </div>
          <div className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] whitespace-nowrap">
            In stock
          </div>
        </div>

        {/* Mobile Add to Cart Button */}
        <button 
          onClick={handleAddItem}
          className="mt-3 sm:mt-4 w-full lg:hidden bg-gray-900 active:bg-black text-white py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <ShoppingBag size={14} className="sm:w-4 sm:h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card3Modi;