import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, X, Search, Minus, Plus } from 'lucide-react';
import Icons from "../ui/Icon.jsx"; 
import BuyNowButton from '../ui/BuyNowButton.jsx';

// Generic Internal Components (If you haven't exported these elsewhere)
const QtyCounter = ({ quantity, setQuantity }) => (
  <div className="flex items-center border border-gray-300 rounded-md w-max bg-white">
    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100 transition"><Minus size={16}/></button>
    <span className="px-6 font-medium text-lg">{quantity}</span>
    <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-gray-100 transition"><Plus size={16}/></button>
  </div>
);

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const ProductDetails = ({ product }) => {
    if (!product) return <div className="p-20 text-center font-light">Loading Product Details...</div>;

    // --- States ---
    const [currentImage, setCurrentImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
    const [quantity, setQuantity] = useState(1);
    
      // Prevent background scroll when lightbox is open
      useEffect(() => {
        if (showLightbox) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
      }, [showLightbox]);

    // Fallback logic for images
    const images = product.images || [product.image];
    const sizes = product.sizes || ["S", "M", "L", "XL", "XXL"];

    // --- Handlers ---
    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

    const handleAddToCart = () => {
        console.log("Cart Action:", { ...product, selectedSize, quantity });
        alert(`${product.title} (${selectedSize}) added to cart!`);
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
                {/* --- LIGHTBOX MODAL --- */}
                {/* Lightbox Modal */}
                {showLightbox && (
                <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-between py-8 md:justify-center animate-in fade-in duration-300">
                
                {/* Top Close Button (Mobile Only) - Helpful for quick exit */}
                <button 
                    onClick={() => setShowLightbox(false)}
                    className="absolute top-4 right-4 text-white/70 hover:text-white md:hidden"
                >
                    <X size={28} />
                </button>

                {/* Main Image Container - Adaptive Height */}
                <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center p-4">
                    <img 
                    src={images[currentImage]} 
                    alt="Zoomed Product" 
                    className="max-h-full max-w-full object-contain select-none transition-all duration-300"
                    />
                </div>

                {/* Bottom Navigation Controls */}
                <div className="flex items-center gap-4 md:gap-8 pb-10 md:pb-5 md:mt-12">
                    {/* Previous Button */}
                    <button 
                    onClick={prevImage}
                    className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                    aria-label="Previous Image"
                    >
                    <Icons icon="heroicons:arrow-left" className="text-black w-5 h-5 md:w-7 md:h-7" />
                    
                    </button>

                    {/* Close Button (Middle) */}
                    <button 
                    onClick={() => setShowLightbox(false)}
                    className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                    aria-label="Close Lightbox"
                    >
                    <X className="text-black w-5 h-5 md:w-7 md:h-7" />
                    </button>

                    {/* Next Button */}
                    <button 
                    onClick={nextImage}
                    className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                    aria-label="Next Image"
                    >
                    <Icons icon="heroicons:arrow-right" size={24} className="text-black w-5 h-5 md:w-7 md:h-7" />
                    </button>
                </div>

                {/* Image Counter Indicator */}
                <div className="absolute bottom-4 text-white/50 text-xs tracking-widest uppercase font-medium">
                    {currentImage + 1} / {images.length}
                </div>
                </div>
            )}
                

                {/* Left: Swiper Gallery */}
                <div className="space-y-4">
                    <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            className=" w-full h-[545px]"
                        >
                            {images.map((img, i) => (
                                <SwiperSlide key={i}><img src={img} className="w-full h-full object-cover" /></SwiperSlide>
                            ))}
                        </Swiper>
                        
                        <button className="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronLeft/></button>
                        <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronRight/></button>
                        <button onClick={() => setShowLightbox(true)} className="absolute top-4 right-4 z-10 bg-white/80 p-3 rounded-full"><Search size={20}/></button>
                    </div>

                    {/* Thumbnails Swiper */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-24"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i} className="cursor-pointer">
                                <div className={`h-full rounded-xl overflow-hidden border-2 transition ${activeIndex === i ? 'border-black' : 'border-transparent'}`}>
                                    <img src={img} className="w-full h-full object-cover" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Column 2: Product Details */}
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-start gap-4">
                        <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                            {product.title}
                        </h1>
                        <button onClick={() => setIsLiked(!isLiked)} className={`p-2.5 rounded-full border transition-colors ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-200'}`}>
                            <Icons icon={isLiked ? "heroicons:heart-solid" : "heroicons:heart"} size={22} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-red-600">{product.price}</span>
                        {product.originalPrice && <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>}
                    </div>

                    {/* Dynamic Size Selector */}
                    <div className="space-y-3">
                        <p className="font-bold text-sm uppercase tracking-wider text-gray-900">Size: <span className="font-normal">{selectedSize}</span></p>
                        <div className="flex flex-wrap gap-2.5">
                            {sizes.map(size => (
                                <button 
                                    key={size} 
                                    onClick={() => setSelectedSize(size)} 
                                    className={`w-12 h-12 border rounded-md text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons & Actions */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <QtyCounter quantity={quantity} setQuantity={setQuantity} />
                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-white border-2 border-black text-black font-bold py-4 px-8 rounded-md hover:bg-black hover:text-white transition-all uppercase tracking-widest text-sm"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="space-y-3">
                <div className="inline-block bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-tighter">
                    Extra 5% Off on Prepaid Orders
                </div>
                <BuyNowButton />
            </div>
                        {/* <button className="w-full bg-red-600 text-white font-bold py-4 px-8 rounded-md hover:bg-red-700 transition-all uppercase tracking-widest text-sm">
                            Buy It Now
                        </button> */}
                    </div>

                    {/* Delivery & Trust Badges */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-sm md:text-base text-gray-700">
                                <Icons icon="heroicons:truck" size={22} className="text-gray-600" />
                                <p><span className="font-bold">Estimated Delivery:</span> 21 Dec - 25 Dec</p>
                            </div>
                            <div className="flex items-center gap-3 text-sm md:text-base text-gray-700">
                                <Icons icon="heroicons:archive-box" size={22} className="text-gray-600" />
                                <p><span className="font-bold">Free Shipping:</span> Enjoy free shipping with prepaid orders</p>
                            </div>
                            </div>
                        <div className="bg-[#f9f9f9] p-6 rounded-xl border border-gray-100 flex flex-col items-center gap-4">
                            <div className="flex gap-4 opacity-70">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                            </div>
                            <p className="text-gray-500 text-xs font-semibold tracking-wide uppercase">Secure checkout guaranteed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;