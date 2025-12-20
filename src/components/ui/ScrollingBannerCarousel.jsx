import React from "react";

const ScrollingBanner = ({ 
  items = [], 
  speed = "20s", // Increased time for a smoother, larger banner
  bgColor = "bg-white" 
}) => {
  const bannerItems = items.length > 0 ? items : [
    { id: 1, text: "Effortless Style, Everyday Wear", img: "https://gentlehaus.in/cdn/shop/files/categories-4-min.webp?v=1750849138" },
    { id: 2, text: "Crafted for the Modern Man", img: "https://gentlehaus.in/cdn/shop/files/categories-2-min.webp?v=1750849137" },
    { id: 3, text: "Elevate Your Wardrobe Instantly", img: "https://gentlehaus.in/cdn/shop/files/categories-3-min.webp?v=1750849138" },
  ];

  const scrollList = [...bannerItems, ...bannerItems, ...bannerItems];

  return (
    // REDUCED SPACE ABOVE: Changed 'my-8' or similar in parent to 'mt-0' or 'mt-2'
    // INCREASED SIZE: Added more vertical padding 'py-6 md:py-8'
    <div className={`w-full overflow-hidden border-y border-gray-100 py-6 md:py-6 mt-2 ${bgColor}`}>
      <div 
        className="flex animate-marquee-infinite items-center hover:[animation-play-state:paused] cursor-default"
        style={{ animationDuration: speed }}
      >
        {scrollList.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center flex-shrink-0">
            {/* INCREASED TEXT SIZE: Changed to text-sm up to text-2xl */}
            <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-black uppercase tracking-[0.1em] whitespace-nowrap px-8 sm:px-12 md:px-20">
              {item.text}
            </span>

            {/* INCREASED IMAGE SIZE: Changed w-8/h-8 to w-16/h-16 */}
            <div className="flex items-center justify-center">
              {item.img && (
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={item.img}
                    alt="product icon"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FIXED STYLE TAG: Removed 'jsx' to fix console errors */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: fit-content;
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollingBanner;