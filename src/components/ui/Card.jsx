import React from 'react';

const ProductCard = ({ img, title, actualPrice, originalPrice }) => {
  return (
    /* Removed flex-shrink-0 and fixed width. 
       Now it will fill the width of its parent grid cell.
    */
    <div className="w-full flex flex-col group cursor-pointer bg-white">
      
      {/* IMAGE CONTAINER 
          Responsive Aspect Ratio: 3/4 on mobile for better vertical scrolling, 
          4/5 on desktop for a wider look.
      */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#f3f3f3] mb-3 md:mb-4 rounded-lg">
        <img
          src={img}
          alt={title}
          // Loading="lazy" improves performance on mobile devices
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 md:group-hover:scale-110"
        />
        
        {/* Subtle hover overlay for desktop */}
        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col px-1">
        {/* Responsive Typography:
            text-sm (14px) on mobile, text-lg (18px) on desktop.
            Line-clamp ensures titles don't break the layout if too long.
        */}
        <h3 className="text-sm md:text-lg lg:text-xl leading-tight font-medium text-[#1a1a1a] line-clamp-2 min-h-[40px] md:min-h-[56px] group-hover:text-gray-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
          {/* Actual Price */}
          <span className="text-[#e63946] text-[10px] md:text-lg font-bold">
            Rs. {actualPrice}
          </span>
        
          {/* Original Price */}
          {originalPrice && (
            <span className="text-gray-400 line-through text-[7px] md:text-sm">
              Rs. {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;