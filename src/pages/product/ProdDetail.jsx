import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 1. Use useNavigate hook

// Redux Actions
import { toggleWishlist } from '../../utils/Slice/WishList.js';
import { addItem } from '../../utils/Slice/cartSlice.js';
import { initializeProduct } from '../../utils/Slice/countSlice.js';

// UI Components
import Icons from "../../components/ui/Icon.jsx"; 
import BuyNowButton from '../../components/ui/BuyNowButton.jsx';
import QuantityCounter from '../../components/ui/NumberQuantityButton.jsx';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const ProdDetails = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 2. Initialize navigate function

    // --- States ---
    const [selectedVariant, setSelectedVariant] = useState(
        product?.variants?.[0] || { size: "M", price: product?.price, stock: 10 }
    );
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);

    // --- Redux Data ---
    const isLiked = useSelector((state) => 
        state.wishlist.items.some(
            (item) => item.id === product?.id && item.selectedSize?.size === selectedVariant.size
        )
    );

    const counterKey = `${product?.id}-${selectedVariant.size}`;
    const currentQuantity = useSelector((state) => state.count[counterKey] || 1);

    // --- Effects ---
    useEffect(() => {
        if (product?.id) {
            dispatch(initializeProduct({ id: product.id, size: selectedVariant.size }));
        }
    }, [product?.id, selectedVariant.size, dispatch]);

    useEffect(() => {
        document.body.style.overflow = showLightbox ? 'hidden' : 'unset';
    }, [showLightbox]);

    if (!product) return <div className="p-20 text-center">Loading Product...</div>;

    const images = product.image || [];

    // --- Handlers ---
    const handleToggleWishlist = () => {
        dispatch(toggleWishlist({
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: images[0],
            selectedSize: selectedVariant,
            price: selectedVariant.price
        }));
        
        navigate("/wishlist"); 
    };

    const handleAddToCart = () => {
        if (selectedVariant.stock === 0) {
            alert("Sorry, this size is currently out of stock.");
            return;
        }

        dispatch(addItem({
            id: product.id,
            name: product.name,
            image: images[0],
            selectedSize: selectedVariant,
            quantity: currentQuantity
        }));
        
        alert(`Added ${currentQuantity} (${selectedVariant.size}) to your cart!`);
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                
                {/* --- LIGHTBOX MODAL --- */}
                {showLightbox && (
                    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
                        <button 
                            onClick={() => setShowLightbox(false)}
                            className="absolute top-6 right-6 text-white hover:scale-110 transition"
                        >
                            <X size={32} />
                        </button>
                        <img 
                            src={images[activeIndex]} 
                            className="max-h-[80vh] max-w-[90vw] object-contain" 
                            alt="Preview"
                        />
                    </div>
                )}

                {/* --- LEFT: GALLERY --- */}
                <div className="space-y-4">
                    <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            className="w-full h-[400px] md:h-[545px]"
                        >
                            {images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img src={img} className="w-full h-full object-cover" alt={product.name} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        
                        <button className="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronLeft/></button>
                        <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronRight/></button>
                        <button onClick={() => setShowLightbox(true)} className="absolute top-4 right-4 z-10 bg-white/80 p-3 rounded-full"><Search size={20}/></button>
                    </div>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-20 md:h-24"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i} className="cursor-pointer">
                                <div className={`h-full rounded-xl overflow-hidden border-2 transition ${activeIndex === i ? 'border-black' : 'border-transparent'}`}>
                                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* --- RIGHT: PRODUCT INFO --- */}
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-start gap-4">
                        <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                            {product.name}
                        </h1>
                        <button 
                            onClick={handleToggleWishlist} 
                            className={`p-2.5 rounded-full border transition-colors ${
                                isLiked 
                                ? 'text-red-500 bg-red-50 border-red-100' 
                                : 'text-gray-400 border-gray-200 hover:border-red-200 hover:text-red-300'
                            }`}
                        >
                            <Icons icon={isLiked ? "heroicons:heart-solid" : "heroicons:heart"} size={22} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-red-600">Rs. {selectedVariant.price}</span>
                        {product.oldPrice && <span className="text-lg text-gray-400 line-through">Rs. {product.oldPrice}</span>}
                    </div>

                    {/* --- VARIANT SELECTOR --- */}
                    {/* <div className="space-y-3">
                        <p className="font-bold text-sm uppercase tracking-wider text-gray-900">
                            Size: <span className="font-normal">{selectedVariant.size}</span>
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                            {product.variants.map((variant) => (
                                <button 
                                    key={variant.size} 
                                    onClick={() => setSelectedVariant(variant)} 
                                    disabled={variant.stock === 0}
                                    className={`w-12 h-12 border rounded-md text-sm font-medium transition-all
                                        ${selectedVariant.size === variant.size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}
                                        ${variant.stock === 0 ? 'opacity-25 cursor-not-allowed bg-gray-100' : ''}`}
                                >
                                    {variant.size}
                                </button>
                            ))}
                        </div>
                        {selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
                            <p className="text-orange-600 text-xs font-bold animate-pulse">Low Stock: Only {selectedVariant.stock} left!</p>
                        )}
                    </div> */}

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <QuantityCounter productId={product.id} selectedSize={selectedVariant}/>
                            
                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-white border-2 border-black text-black font-bold py-4 px-8 rounded-md hover:bg-black hover:text-white transition-all uppercase tracking-widest text-sm"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <BuyNowButton product={product}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdDetails;