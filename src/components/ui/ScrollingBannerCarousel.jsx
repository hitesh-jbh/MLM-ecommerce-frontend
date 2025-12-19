import React from "react";

const ScrollingBanner = ({ 
  items = [], 
  speed = "30s", // Slower speed feels more premium
  bgColor = "bg-white" 
}) => {
  const bannerItems = items.length > 0 ? items : [
    { id: 1, text: "Effortless Style, Everyday Wear", img: "https://gentlehaus.in/cdn/shop/files/categories-4-min.webp?v=1750849138" },
    { id: 2, text: "Crafted for the Modern Man", img: "https://gentlehaus.in/cdn/shop/files/categories-2-min.webp?v=1750849137" },
    { id: 3, text: "Elevate Your Wardrobe Instantly", img: "https://gentlehaus.in/cdn/shop/files/categories-3-min.webp?v=1750849138" },
  ];

  // Tripling the list to ensure a seamless loop without gaps
  const scrollList = [...bannerItems, ...bannerItems, ...bannerItems];

  return (
    <div className={`w-full overflow-hidden border-y border-gray-100 py-3 md:py-5 ${bgColor}`}>
      <div 
        className="flex animate-marquee-infinite items-center hover:[animation-play-state:paused] cursor-default"
        style={{ animationDuration: speed }}
      >
        {scrollList.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center flex-shrink-0">
            {/* Reduced Text Size: text-xs on mobile to text-lg on desktop */}
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-black uppercase tracking-[0.2em] whitespace-nowrap px-6 sm:px-10 md:px-14">
              {item.text}
            </span>

            {/* Compact Image Container */}
            <div className="flex items-center justify-center">
              {item.img ? (
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                  <img
                    src={item.img}
                    alt="product"
                    className="w-[80%] h-[80%] object-contain mix-blend-multiply"
                  />
                </div>
              ) : (
                /* Small dot separator if no image */
                <div className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Required CSS for the infinite marquee animation */}
      {/* <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: fit-content;
          animation: marquee linear infinite;
        }
      `}</style> */}
    </div>
  );
};

export default ScrollingBanner;