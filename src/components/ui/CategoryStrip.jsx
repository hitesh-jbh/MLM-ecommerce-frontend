import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../utils/api/axiosInstance.js";

const CategoryStrip = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories/home-strip");

        if (response.data.success) {
          const rawData = response.data.data;

          // जादू यहाँ है: हम Main Categories के अंदर से Sub-Categories निकाल रहे हैं
          let extractedSubCategories = [];

          rawData.forEach((category) => {
            // अगर इसके अंदर subCategories हैं (Nested API Response)
            if (category.subCategories && category.subCategories.length > 0) {
              extractedSubCategories.push(...category.subCategories);
            }
            // या अगर यह खुद एक subCategory है (parent_id मौजूद है)
            else if (category.parent_id) {
              extractedSubCategories.push(category);
            }
          });

          // अब State में सिर्फ Rings, Necklaces जैसी Sub-Categories ही सेट होंगी
          setCategories(extractedSubCategories);
        }
      } catch (error) {
        console.error("Categories fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-[#4a154b]">
        Loading Categories...
      </div>
    );
  }

  return (
    // 1. max-w-7xl वापस लगाया ताकि बहुत बड़ी स्क्रीन पर हद से ज्यादा न फैले
    <div className="w-full max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-8">
      
      {/* 2. w-full की जगह w-fit max-w-full mx-auto कर दिया (यही वो जादू है जो डब्बे को कंटेंट के हिसाब से सिकोड़ेगा) */}
      <div className="bg-purple-50/50 border border-purple-100 rounded-2xl md:rounded-[2rem] p-4 md:p-8 shadow-sm w-fit max-w-full mx-auto relative group">
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
          
          {/* Left Static Asset */}
          <div className="flex flex-col items-center justify-center min-w-[120px] md:min-w-[140px] text-center shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 md:mb-3">
              <img
                src="/image/hp-asset1.png"
                alt="Wrapped with love"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-serif text-base md:text-lg text-[#4a154b] font-semibold">
              Wrapped with love
            </h3>
          </div>

          {/* Dynamic Scrollable Categories */}
          <div className="relative flex-1 max-w-full overflow-hidden flex items-center">
            
            {/* Left Arrow */}
            {categories.length > 3 && (
              <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 z-10 w-9 h-9 bg-white shadow-md rounded-full items-center justify-center text-gray-700 hover:text-dirora-purple transition-all duration-300"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Scroll Container (px-10 दिया है ताकि एरो और आइटम एक-दूसरे के ऊपर न चढ़ें) */}
            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-8 overflow-x-auto scroll-smooth px-2 md:px-10 py-2 max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id || cat._id}
                  to={`/collections/${cat.slug}`} 
                  className="flex flex-col items-center min-w-[80px] md:min-w-[110px] group shrink-0"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-white mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-105 shadow-sm border border-purple-100">
                    <img
                      src={cat.image_url || cat.image || "https://via.placeholder.com/150"}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-600 text-center">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right Arrow */}
            {categories.length > 3 && (
              <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 z-10 w-9 h-9 bg-white shadow-md rounded-full items-center justify-center text-gray-700 hover:text-dirora-purple transition-all duration-300"
              >
                <ChevronRight size={22} />
              </button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStrip;
