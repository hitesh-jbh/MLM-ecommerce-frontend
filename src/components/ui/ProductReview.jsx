import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/**
 * HappyCustomersCards
 * @param {Array} data - Array of customer review objects from backend
 */
export default function ProductReview({ data = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Responsive logic: Adjust items per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Tablet
      } else {
        setItemsToShow(3); // Desktop
      }
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent errors if data hasn't loaded yet
  if (!data || data.length === 0) return null;

  const totalSlides = Math.ceil(data.length / itemsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 text-center sm:text-left">
            Happy Customers
          </h2>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slide Counter */}
            <span className="text-sm font-medium text-gray-500 tabular-nums">
              {currentIndex + 1} / {totalSlides}
            </span>

            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {data.map((item) => (
              <div
                key={item.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < item.rating ? "#000" : "none"}
                        className={i < item.rating ? "text-black" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.name}
                  </h3>

                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
                    {item.title}
                  </h4>

                  <p className="text-sm md:text-base text-gray-600 leading-relaxed italic">
                    "{item.review}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// Example usage in Parent Component
// const [reviews, setReviews] = useState([]);

// useEffect(() => {
//   fetch('/api/reviews')
//     .then(res => res.json())
//     .then(json => setReviews(json));
// }, []);

// return <HappyCustomersCards data={reviews} />;