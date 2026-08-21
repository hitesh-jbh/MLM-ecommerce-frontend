import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import api from "../../utils/api/axiosInstance.js";

const fetchHero = async () => {
  const response = await api.get("/api/banners?type=hero");
  return response.data.data;
};

const Hero = () => {
  const {
    data: heroSlides,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["heroContent"],
    queryFn: fetchHero,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const activeSlides = Array.isArray(heroSlides) ? heroSlides : [];

  // Auto-slide Logic (Fix kiya gaya hai)
  useEffect(() => {
    // Agar 1 se zyada slides hain tabhi auto-slide chalega
    if (activeSlides && activeSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
      }, 4000); // 4 seconds kar diya hai taaki jaldi slide ho
      return () => clearInterval(interval);
    }
  }, [activeSlides]); // Dependency array fix kar di hai

  if (isLoading) {
    return (
      <div className="w-full max-w-[1920px] mx-auto md:px-4 lg:px-8 my-0 md:my-6">
        <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] bg-gray-200 animate-pulse rounded-none md:rounded-[28px]"></div>
      </div>
    );
  }

  if (isError || activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeSlides.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const targetLink = currentSlide?.link || currentSlide?.link_url || "/products";
  const bgImage = currentSlide?.image_url || currentSlide?.image;

  return (
    <div className="w-full max-w-[1920px] mx-auto md:px-4 lg:px-8 my-0 md:my-6 relative group">
      <section className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] flex items-center overflow-hidden rounded-none md:rounded-[28px] bg-black shadow-xl">
        
        <Link to={targetLink} className="absolute inset-0 z-0 cursor-pointer">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
        </Link>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-6 sm:mx-12 md:mx-16 lg:mx-20 w-full pointer-events-none">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-3 md:mb-5 uppercase tracking-wider drop-shadow-lg">
            {currentSlide?.title}
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-200 max-w-sm md:max-w-md mb-6 md:mb-8 leading-relaxed font-sans drop-shadow-md">
            {currentSlide?.subtitle}
          </p>
          
          <Link to={targetLink} className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-dirora-purple hover:text-white transition-all duration-300 pointer-events-auto shadow-lg hover:shadow-xl">
            Shop Now
            <ArrowRight size={16} className="hidden md:block" />
          </Link>
        </div>

        {/* एरो बटन्स - अब हमेशा दिखेंगे (Hover वाला झंझट हटा दिया) */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/70 hover:bg-white text-black flex items-center justify-center shadow-md transition-all"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/70 hover:bg-white text-black flex items-center justify-center shadow-md transition-all"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </>
        )}

        {activeSlides.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-0 w-full flex items-center justify-center gap-2 z-20">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 h-2 md:w-10 md:h-2.5 bg-white shadow-md"
                    : "w-2 h-2 md:w-2.5 md:h-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Hero;