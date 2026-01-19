import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ProductReview({ data = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data || data.length === 0) return null;

  const totalSlides = Math.ceil(data.length / itemsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* 1. Navigation Controls */}
      {totalSlides > 1 && (
        <div className="flex justify-end items-center mb-4 gap-3">
          <button onClick={handlePrev} className="p-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
            <ChevronLeft size={14} />
          </button>
          <span className="text-[11px] font-bold text-gray-600 tabular-nums uppercase tracking-tighter">
            {currentIndex + 1} / {totalSlides}
          </span>
          <button onClick={handleNext} className="p-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* 2. Review Carousel */}
      <div className="relative overflow-hidden p-1"> {/* Added p-1 so shadows aren't cut off */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.map((item, index) => (
            <div
              key={item.id || index}
              className="px-2 flex-shrink-0"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              {/* DARKER BORDER + SHADOW FOR VISIBILITY */}
              <div className="bg-white rounded-xl p-5 border border-gray-300 shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                
                {/* User Info Header */}
                <div className="flex items-center gap-3 mb-3">
                  
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-900 leading-none mb-1">
                      {item.reviewerName}
                    </h3>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < (item.rating || 5) ? "#000" : "none"}
                          className={i < (item.rating || 5) ? "text-black" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[13px] text-gray-700 leading-relaxed italic mb-4 flex-grow">
                  "{item.review}"
                </p>

                {/* VISIBLE DATE STAMP */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-[11px] text-gray-500 font-semibold tracking-wide">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}