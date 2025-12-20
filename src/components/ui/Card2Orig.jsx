import React from 'react';

const Card2Orig = ({ product }) => {
  return (
    <div className="flex flex-col group w-full cursor-pointer bg-white">
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-2 md:mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col px-1">
        {/* Adjusted min-height and leading for mobile to prevent overlapping */}
        <h3 className="text-[11px] sm:text-sm md:text-base font-medium text-gray-800 line-clamp-2 min-h-[30px] md:min-h-[40px] leading-tight mb-1">
          {product.title}
        </h3>
        
        <div className="flex flex-wrap items-baseline gap-1 md:gap-2">
          {/* Reduced font size for mobile (text-xs) to ensure it fits */}
          <span className="text-red-600 font-bold text-xs sm:text-sm md:text-md whitespace-nowrap">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-[9px] md:text-sm whitespace-nowrap">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card2Orig;