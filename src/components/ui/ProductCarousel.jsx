import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card3Modi from '../ui/Card3Modi.jsx';

import 'swiper/css';
import 'swiper/css/navigation';

const ProductCarousel = ({ title, products }) => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'smooth' if you want an animated scroll
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-8 md:my-16 relative group">
      <h2 className="text-center text-xl md:text-4xl mb-10 text-black font-light tracking-wide uppercase">
        {title} 
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={2}
        navigation={{
          prevEl,
          nextEl,
        }}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
        onInit={(swiper) => {
          // Links custom buttons to Swiper instance on initialization
          swiper.params.navigation.prevEl = prevEl;
          swiper.params.navigation.nextEl = nextEl;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="product-slider !static"
      >
        {products?.map((item) => (
          <SwiperSlide key={item.id}>
            <div 
              onClick={() => handleCardClick(item.id)} 
              className="cursor-pointer py-4"
            >
              <Card3Modi product={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <button 
        ref={(node) => setPrevEl(node)}
        className="absolute left-2 top-[50%] -translate-y-1/2 z-20 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md w-10 h-10 md:w-12 md:h-12 transition-all duration-300 hover:bg-black hover:text-white lg:opacity-0 lg:group-hover:opacity-100 disabled:opacity-30"
      >
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>
      
      <button 
        ref={(node) => setNextEl(node)}
        className="absolute right-2 top-[50%] -translate-y-1/2 z-20 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md w-10 h-10 md:w-12 md:h-12 transition-all duration-300 hover:bg-black hover:text-white lg:opacity-0 lg:group-hover:opacity-100 disabled:opacity-30"
      >
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          display: none !important;
        }
        @media (max-width: 1024px) {
          .lg\\:opacity-0 {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;