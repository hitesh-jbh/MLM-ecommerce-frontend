import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react'; 

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 1. डेटा को ऊपर ही सुरक्षित तरीके से सेट कर लें (Fallbacks)
  const defaultImage = product?.images?.[0] || product?.image || "https://images.pexels.com/photos/17390022/pexels-photo-17390022.jpeg?auto=compress&cs=tinysrgb&w=400";
  const hoverImage = product?.images?.[1] || product?.hoverImage || "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=400";
  
  const productName = product?.name || "18kt Gold Diamond Ring";
  const productPrice = product?.price || "15,000";
  
  // अगर API से originalPrice नहीं आता है, तो हम यहाँ डमी 18,000 दिखा रहे हैं
  const originalPrice = product?.originalPrice || "18,000"; 
  const discountPercent = product?.discount || 15;

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* टॉप बैज (Discount) */}
      {discountPercent && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {discountPercent}% OFF
          </span>
        </div>
      )}
      
      {/* विशलिस्ट (Heart) बटन */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
        <Heart 
          size={18} 
          className={`transition-colors duration-300 ${isHovered ? "fill-red-50 text-red-400" : ""}`} 
        />
      </button>

      {/* इमेज कंटेनर */}
      <Link to={`/product/${product?.slug || product?.id}`} className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={isHovered ? hoverImage : defaultImage} 
          alt={productName} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        
        {/* होवर पर दिखने वाला 'View Details' बटन */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out opacity-0 group-hover:opacity-100">
          <button className="w-full py-2.5 bg-white/95 backdrop-blur text-gray-800 text-sm font-semibold rounded-xl shadow-lg hover:bg-[#4a154b] hover:text-white transition-colors">
            View Details
          </button>
        </div>
      </Link>

      {/* प्रोडक्ट डिटेल्स */}
      <div className="p-4 flex flex-col gap-1.5">
        <Link to={`/product/${product?.slug || product?.id}`}>
          <h3 className="text-gray-700 font-medium text-sm md:text-base line-clamp-1 group-hover:text-[#4a154b] transition-colors">
            {productName}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-900 font-bold text-base md:text-lg">
            ₹{productPrice}
          </span>
          {/* अब यहाँ कोई एरर नहीं आएगी */}
          {originalPrice && (
            <span className="text-gray-400 text-xs md:text-sm line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;