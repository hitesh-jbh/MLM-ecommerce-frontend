import React from 'react';

const ProductInfoShimmer = () => {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      {/* Breadcrumb Shimmer */}
      <div className="flex justify-center py-8">
        <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left: Gallery Shimmer */}
          <div className="space-y-4">
            {/* Main Image Placeholder */}
            <div className="w-full h-[545px] bg-gray-200 rounded-3xl"></div>
            {/* Thumbnails Placeholder */}
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 w-full bg-gray-100 rounded-xl"></div>
              ))}
            </div>
          </div>

          {/* Right: Content Shimmer */}
          <div className="flex flex-col space-y-6">
            {/* Title & Heart */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 w-full">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-full shrink-0"></div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
              <div className="h-6 w-24 bg-gray-100 rounded"></div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="flex gap-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gray-100 rounded-md"></div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-14 w-32 bg-gray-100 rounded-md"></div>
                <div className="h-14 flex-1 bg-gray-200 rounded-md"></div>
              </div>
              <div className="h-14 w-full bg-gray-200 rounded-md"></div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="h-5 w-full bg-gray-100 rounded"></div>
              <div className="h-5 w-3/4 bg-gray-100 rounded"></div>
              <div className="h-24 w-full bg-gray-50 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Shimmer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8 border-b border-gray-100 mb-6">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-20 w-full bg-gray-50 rounded"></div>
      </div>
    </div>
  );
};

export default ProductInfoShimmer;