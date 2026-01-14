import React, { useState } from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Icons from '../ui/Icon.jsx';
import { toggleWishlist } from '../../utils/Slice/wishlistSlice.js';
import { addItem } from '../../utils/Slice/cartSlice.js';
import { toast } from 'react-toastify';

const Card3Modi = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Wishlist State Management
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isLiked = wishlistItems.some(
    (item) => item.id === product.id && item.selectedSize?.size === "M"
  );

  // 2. Pricing & Variant Logic
  // Defaulting to "M" size for quick actions as per your requirement
  // const mVariant = product.variants?.find(v => v.size === "M") || product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState(
          product?.variants?.[0] || { size: "M", price: product?.price, stock: 10 }
      );

  const displayPrice = typeof product.price === 'number' 
    ? `Rs. ${product.price.toFixed(2)}` 
    : product.price;

  const displayOriginal = typeof product.originalPrice === 'number'
    ? `Rs. ${product.originalPrice.toFixed(2)}`
    : product.originalPrice;

  // 3. Navigation
  const goToInfoPage = () => {
    navigate(`/product/${product.id}`);
  };

  // 4. Wishlist Handler
  const handleWishlist = (e) => {
    e.stopPropagation(); 
    // if (!mVariant) return;

    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: Array.isArray(product.images) ? product.images[0] : (product.image || product.images),
      // selectedSize: mVariant, 
      // price: mVariant.price
      selectedSize: selectedVariant,
      price: selectedVariant.price
    }));
    
    // Aesthetic White Toast
    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist", {
      theme: "light",
      icon: <Icons icon="solar:heart-bold" className={isLiked ? "text-gray-400" : "text-red-500"} size={20} />
    });
  };

  // 5. Cart Handler
  const handleAddItem = (e) => {
    e.stopPropagation();

    // Check if product has stock based on your JSON structure
    if (product.stock <= 0) {
      toast.error("This item is currently out of stock!", { theme: "light" });
      return;
    }

    // Adapt the flat JSON to the format your cartSlice expects
    dispatch(addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      // Handle the image from your product object
      image: Array.isArray(product.images) ? product.images[0] : (product.image || product.images),
      
      // Wrapping price and stock into selectedSize as required by your Slice
      selectedSize: {
        size: "Default", // or product.size if available
        price: product.price,
        stock: product.stock
      },
      quantity: 1
    }));

    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };

  return (
    <div className="group relative flex flex-col w-full bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-1">
      
      {/* Image Section */}
      <div 
        onClick={goToInfoPage}
        className="relative aspect-[4/5] m-1.5 sm:m-2 overflow-hidden rounded-[18px] sm:rounded-[24px] bg-[#F7F7F7] cursor-pointer"
      >
        <img
          src={Array.isArray(product.images) && product.images.length > 0 
            ? product.images[0] 
            : (product.image || product.images || 'https://dummyimage.com/400x500')}
          alt={product.name || 'Product'}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x500?text=Image+Error';
          }}
        />
        
        {/* Floating Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
          <span className="bg-black/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <span className="text-amber-400">★</span> 
            <span className="tracking-widest uppercase">New Arrival</span>
          </span>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist} 
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-2.5 backdrop-blur-md rounded-full transition-all shadow-sm active:scale-75 z-20 ${
            isLiked 
              ? "bg-red-50 text-red-500" 
              : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white"
          }`}
        >
          <Icons 
            icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} 
            size={20} 
          />
        </button>

        {/* Desktop Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out hidden lg:block z-20">
          <button 
            onClick={handleAddItem}
            className="w-full bg-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-900 shadow-2xl hover:bg-black hover:text-white transition-all border border-gray-100"
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 pt-2 sm:pt-3 flex-1 flex flex-col">
        <div onClick={goToInfoPage} className="cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 truncate max-w-[70%]">
              {product.category || 'Collection 2026'}
            </span>
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md">
              <Star size={10} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-bold text-gray-800">4.8</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 mb-4 font-medium italic">by {product.brand}</p>
        </div>

        {/* Price & Stock Section */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black text-black tracking-tight">{displayPrice}</span>
            {displayOriginal && (
              <span className="text-[10px] text-gray-400 line-through -mt-1">{displayOriginal}</span>
            )}
          </div>
          
          <div className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter ${
            selectedVariant?.stock > 0 
              ? 'bg-green-50 text-green-600 border border-green-100' 
              : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {selectedVariant?.stock > 0 ? 'In Stock' : 'Sold Out'}
          </div>
        </div>

        {/* Mobile Add to Cart Button */}
        <button 
          onClick={handleAddItem}
          className="mt-4 w-full lg:hidden bg-black active:scale-95 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card3Modi;