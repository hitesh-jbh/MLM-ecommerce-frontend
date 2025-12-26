import React from "react";

export default function AnnouncementBar() {
  return (
    <div className="w-full overflow-hidden bg-emerald-50 border-b border-emerald-100">
      <div className="relative w-full">
        
        {/* Marquee Track */}
        <div className="flex w-[200%] animate-marquee">
          
          {/* First Set */}
          <div className="flex w-1/2 items-center min-w-max py-2 sm:py-3">
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 px-3 sm:px-6">
                  ● Limited-Time Best Discount
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 px-3 sm:px-6">
                  ● Safe & Secure Shopping
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 px-3 sm:px-6">
                  ● Free Shipping
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Second Set (Duplicate) */}
          <div className="flex w-1/2 items-center min-w-max py-2 sm:py-3">
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 px-3 sm:px-6">
                  ● Limited-Time Best Discount
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 px-3 sm:px-6">
                  ● Safe & Secure Shopping
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 px-3 sm:px-6">
                  ● Free Shipping
                </span>
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
      
    </div>
  );
}