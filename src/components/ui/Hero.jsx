import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../utils/api/axiosInstance.js";

const fetchHero = async () => {
  // 🚨 बस यहाँ ?type=hero जोड़ दिया है
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

  useEffect(() => {
    if (activeSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [activeSlides.length]);

  if (isLoading) {
    return (
      <div className="max-w-9xl mx-auto px-4 my-6">
        <div className="w-full h-[390px] md:h-[440px] bg-gray-200 animate-pulse rounded-[28px]"></div>
      </div>
    );
  }

  if (isError || activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeSlides.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const targetLink = currentSlide.link || currentSlide.link_url || "/products";
  const bgImage = currentSlide.image_url || currentSlide.image;

  return (
    <div className="max-w-9xl mx-auto px-4 my-6">
      <section className="relative w-full h-[390px] md:h-[440px] flex items-center overflow-hidden rounded-[28px] bg-black shadow-lg">
        
        <Link to={targetLink} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-[center_20%] transition-all duration-1000 ease-in-out"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
        </Link>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-6 md:mx-12 w-full">
          <h1 className="font-serif text-3xl md:text-5xl font-light leading-tight text-white mb-4 uppercase tracking-wide">
            {currentSlide.title}
          </h1>
          <p className="text-xs md:text-sm text-white/90 max-w-sm mb-8 leading-relaxed font-sans">
            {currentSlide.subtitle}
          </p>
        </div>

        {activeSlides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {activeSlides.length > 1 && (
          <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-20">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/50"
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