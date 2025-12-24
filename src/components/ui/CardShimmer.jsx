import React from 'react';

const CardShimmer = () => {
  return (
    <div className="flex flex-col w-full bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      
      {/* Image Section Shimmer */}
      <div className="relative aspect-[4/5] m-1.5 sm:m-2 overflow-hidden rounded-[18px] sm:rounded-[24px] bg-gray-200">
        {/* Floating Badge Shimmer */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 h-5 w-20 bg-gray-300 rounded-full"></div>
        {/* Wishlist Button Shimmer */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content Section Shimmer */}
      <div className="p-3 sm:p-4 lg:p-5 pt-1 sm:pt-2 flex-1 flex flex-col">
        
        {/* Category & Rating Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-2 w-16 bg-gray-200 rounded"></div>
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
        </div>

        {/* Title Lines */}
        <div className="space-y-2 mb-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>

        {/* Brand Name */}
        <div className="h-3 w-20 bg-gray-100 rounded mb-4"></div>

        {/* Price & Stock Section */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-16 bg-gray-100 rounded"></div>
          </div>
          <div className="h-5 w-16 bg-gray-100 rounded-full"></div>
        </div>

        {/* Mobile Button Shimmer (Visible on mobile, hidden on large screens) */}
        <div className="mt-3 sm:mt-4 w-full lg:hidden h-9 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
};

export default CardShimmer;