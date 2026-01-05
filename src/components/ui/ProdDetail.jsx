// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// import { ChevronLeft, ChevronRight, X, Search, Minus, Plus } from 'lucide-react';
// import Icons from "../ui/Icon.jsx"; 
// import BuyNowButton from '../ui/BuyNowButton.jsx';
// import { useDispatch, useSelector } from 'react-redux';
// import { initializeProduct } from '../../utils/Slice/countSlice';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/free-mode';
// import QuantityCounter from './NumberQuantityButton.jsx';

// const ProductDetails = ({ product }) => {

//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (product?.id) {
//             dispatch(initializeProduct(product.id));
//         }
//     }, [product?.id, dispatch]);

//     if (!product) return <div className="p-20 text-center font-light">Loading Product Details...</div>;

//     // --- States ---
//     const [currentImage, setCurrentImage] = useState(0);
//     const [isLiked, setIsLiked] = useState(false);
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [showLightbox, setShowLightbox] = useState(false);
//     const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
//     const [quantity, setQuantity] = useState(1);
    
//       useEffect(() => {
//         if (showLightbox) {
//           document.body.style.overflow = 'hidden';
//         } else {
//           document.body.style.overflow = 'unset';
//         }
//       }, [showLightbox]);

//     const images = product.image || [product.image];
//     const sizes = product.sizes || ["S", "M", "L", "XL", "XXL"];

//     // --- Handlers ---
//     const nextImage = () => setCurrentImage((prev) => (prev + 1) % image.length);
//     const prevImage = () => setCurrentImage((prev) => (prev - 1 + image.length) % image.length);

//     const currentQuantity = useSelector((state) => state.count[product.id] || 1);

//     const handleAddToCart = (product) => {
//         dispatch(addItem(product));
//         alert(`${product.name} added with quantity: ${currentQuantity}`);
//     };

//     return (
//         <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
//                 {/* --- LIGHTBOX MODAL --- */}
//                 {/* Lightbox Modal */}
//                 {showLightbox && (
//                 <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-between py-8 md:justify-center animate-in fade-in duration-300">
                
//                 {/* Top Close Button (Mobile Only) - Helpful for quick exit */}
//                 <button 
//                     onClick={() => setShowLightbox(false)}
//                     className="absolute top-4 right-4 text-white/70 hover:text-white md:hidden"
//                 >
//                     <X size={28} />
//                 </button>

//                 {/* Main Image Container - Adaptive Height */}
//                 <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center p-4">
//                     <img 
//                     src={images[currentImage]} 
//                     alt="Zoomed Product" 
//                     className="max-h-full max-w-full object-contain select-none transition-all duration-300"
//                     />
//                 </div>

//                 {/* Bottom Navigation Controls */}
//                 <div className="flex items-center gap-4 md:gap-8 pb-10 md:pb-5 md:mt-12">
//                     {/* Previous Button */}
//                     <button 
//                     onClick={prevImage}
//                     className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
//                     aria-label="Previous Image"
//                     >
//                     <Icons icon="heroicons:arrow-left" className="text-black w-5 h-5 md:w-7 md:h-7" />
                    
//                     </button>

//                     {/* Close Button (Middle) */}
//                     <button 
//                     onClick={() => setShowLightbox(false)}
//                     className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
//                     aria-label="Close Lightbox"
//                     >
//                     <X className="text-black w-5 h-5 md:w-7 md:h-7" />
//                     </button>

//                     {/* Next Button */}
//                     <button 
//                     onClick={nextImage}
//                     className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
//                     aria-label="Next Image"
//                     >
//                     <Icons icon="heroicons:arrow-right" size={24} className="text-black w-5 h-5 md:w-7 md:h-7" />
//                     </button>
//                 </div>

//                 {/* Image Counter Indicator */}
//                 <div className="absolute bottom-4 text-white/50 text-xs tracking-widest uppercase font-medium">
//                     {currentImage + 1} / {images.length}
//                 </div>
//                 </div>
//             )}
                

//                 {/* Left: Swiper Gallery */}
//                 <div className="space-y-4">
//                     <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
//                         <Swiper
//                             loop={true}
//                             spaceBetween={10}
//                             navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
//                             thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                             modules={[FreeMode, Navigation, Thumbs]}
//                             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                             className=" w-full h-[545px]"
//                         >
//                             {images.map((img, i) => (
//                                 <SwiperSlide key={i}><img src={img} className="w-full h-full object-cover" /></SwiperSlide>
//                             ))}
//                         </Swiper>
                        
//                         <button className="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronLeft/></button>
//                         <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronRight/></button>
//                         <button onClick={() => setShowLightbox(true)} className="absolute top-4 right-4 z-10 bg-white/80 p-3 rounded-full"><Search size={20}/></button>
//                     </div>

//                     {/* Thumbnails Swiper */}
//                     <Swiper
//                         onSwiper={setThumbsSwiper}
//                         spaceBetween={10}
//                         slidesPerView={4}
//                         freeMode={true}
//                         watchSlidesProgress={true}
//                         modules={[FreeMode, Navigation, Thumbs]}
//                         className="h-24"
//                     >
//                         {images.map((img, i) => (
//                             <SwiperSlide key={i} className="cursor-pointer">
//                                 <div className={`h-full rounded-xl overflow-hidden border-2 transition ${activeIndex === i ? 'border-black' : 'border-transparent'}`}>
//                                     <img src={img} className="w-full h-full object-cover" />
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* Column 2: Product Details */}
//                 <div className="flex flex-col space-y-6">
//                     <div className="flex justify-between items-start gap-4">
//                         <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
//                             {product.name}
//                         </h1>
//                         <button onClick={() => setIsLiked(!isLiked)} className={`p-2.5 rounded-full border transition-colors ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-200'}`}>
//                             <Icons icon={isLiked ? "heroicons:heart-solid" : "heroicons:heart"} size={22} />
//                         </button>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <span className="text-2xl font-bold text-red-600"> Rs. {product.offerPrice}</span>
//                         {product.price && <span className="text-lg text-gray-400 line-through"> Rs. {product.price}</span>}
//                     </div>

//                     {/* Dynamic Size Selector */}
//                     <div className="space-y-3">
//                         <p className="font-bold text-sm uppercase tracking-wider text-gray-900">Size: <span className="font-normal">{selectedSize}</span></p>
//                         <div className="flex flex-wrap gap-2.5">
//                             {sizes.map(size => (
//                                 <button 
//                                     key={size} 
//                                     onClick={() => setSelectedSize(size)} 
//                                     className={`w-12 h-12 border rounded-md text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
//                                 >
//                                     {size}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Buttons & Actions */}
//                     <div className="space-y-4 pt-4 border-t border-gray-100">
//                         <div className="flex flex-col sm:flex-row gap-4">
//                             <QuantityCounter productId={product.id}/>
//                             <button 
//                                 onClick={handleAddToCart}
//                                 className="flex-1 bg-white border-2 border-black text-black font-bold py-4 px-8 rounded-md hover:bg-black hover:text-white transition-all uppercase tracking-widest text-sm"
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                         <div className="space-y-3">
//                 <div className="inline-block bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-tighter">
//                     Extra 5% Off on Prepaid Orders
//                 </div>
//                 <BuyNowButton />
//             </div>
//                         {/* <button className="w-full bg-red-600 text-white font-bold py-4 px-8 rounded-md hover:bg-red-700 transition-all uppercase tracking-widest text-sm">
//                             Buy It Now
//                         </button> */}
//                     </div>

//                     {/* Delivery & Trust Badges */}
//                     <div className="space-y-4 pt-4 border-t border-gray-100">
//                         <div className="space-y-4 pt-4 border-t border-gray-100">
//                             <div className="flex items-center gap-3 text-sm md:text-base text-gray-700">
//                                 <Icons icon="heroicons:truck" size={22} className="text-gray-600" />
//                                 <p><span className="font-bold">Estimated Delivery:</span> 21 Dec - 25 Dec</p>
//                             </div>
//                             <div className="flex items-center gap-3 text-sm md:text-base text-gray-700">
//                                 <Icons icon="heroicons:archive-box" size={22} className="text-gray-600" />
//                                 <p><span className="font-bold">Free Shipping:</span> Enjoy free shipping with prepaid orders</p>
//                             </div>
//                             </div>
//                         <div className="bg-[#f9f9f9] p-6 rounded-xl border border-gray-100 flex flex-col items-center gap-4">
//                             <div className="flex gap-4 opacity-70">
//                                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
//                                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
//                                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
//                             </div>
//                             <p className="text-gray-500 text-xs font-semibold tracking-wide uppercase">Secure checkout guaranteed</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;


import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Actions
import { addItem } from '../../utils/Slice/cartSlice';
import { initializeProduct } from '../../utils/Slice/countSlice';

// UI Components
import Icons from "../ui/Icon.jsx"; 
import BuyNowButton from '../ui/BuyNowButton.jsx';
import QuantityCounter from './NumberQuantityButton.jsx';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const ProductDetails = ({ product }) => {
    const dispatch = useDispatch();

    // 1. --- States ---
    // Handle specific variant (Size/Price/Stock)
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || { size: "M", price: product.price, stock: 10 });
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // 2. --- Redux Data ---
    // Get the current counter value for this specific Product + Size combination
    const counterKey = `${product.id}-${selectedVariant.size}`;
    const currentQuantity = useSelector((state) => state.count[counterKey] || 1);

    // 3. --- Effects ---
    // Initialize the counter for the selected size when component loads or size changes
    useEffect(() => {
        if (product?.id) {
            dispatch(initializeProduct({ id: product.id, size: selectedVariant.size }));
        }
    }, [product?.id, selectedVariant.size, dispatch]);

    // Prevent scrolling when Lightbox is open
    useEffect(() => {
        document.body.style.overflow = showLightbox ? 'hidden' : 'unset';
    }, [showLightbox]);

    if (!product) return <div className="p-20 text-center">Loading Product...</div>;

    const images = product.image || [];

    // 4. --- Handlers ---
    const handleAddToCart = () => {
        if (selectedVariant.stock === 0) {
            alert("Sorry, this size is currently out of stock.");
            return;
        }

        dispatch(addItem({
            id: product.id,
            name: product.name,
            image: images[0],
            selectedSize: selectedVariant, // Contains .size, .price, .stock
            quantity: currentQuantity      // The value from countSlice
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
                        <div className="absolute bottom-10 text-white/70 tracking-widest">
                            {activeIndex + 1} / {images.length}
                        </div>
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

                    {/* Thumbnails */}
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
                            onClick={() => setIsLiked(!isLiked)} 
                            className={`p-2.5 rounded-full border transition-colors ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-200'}`}
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

                    {/* --- ACTIONS --- */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Quantity Counter needs the whole variant to know the stock limit */}
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

                    {/* --- TRUST BADGES --- */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Icons icon="heroicons:truck" size={22} />
                            <p><span className="font-bold">Free Shipping:</span> On all prepaid orders</p>
                        </div>
                        <div className="bg-[#f9f9f9] p-4 rounded-xl border border-gray-100 flex flex-col items-center gap-3">
                            <div className="flex gap-4 opacity-60 grayscale">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                            </div>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Secure checkout guaranteed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';

// // Redux Actions
// import { addItem } from '../../utils/Slice/cartSlice';
// import { initializeProduct } from '../../utils/Slice/countSlice';

// // UI Components
// import Icons from "../ui/Icon.jsx"; 
// import BuyNowButton from '../ui/BuyNowButton.jsx';
// import QuantityCounter from './NumberQuantityButton.jsx';

// // Swiper Styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/free-mode';

// const ProductDetails = ({ product, selectedVariant, setSelectedVariant }) => {
//     const dispatch = useDispatch();

//     // 1. --- Local UI States ---
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [showLightbox, setShowLightbox] = useState(false);
//     const [isLiked, setIsLiked] = useState(false);

//     // 2. --- Redux Data Syncing ---
//     // Look up quantity for this specific Product + Size combination
//     const counterKey = `${product?.id}-${selectedVariant?.size}`;
//     const currentQuantity = useSelector((state) => state.count[counterKey] || 1);

//     // Initialize the counter in Redux for the selected size
//     useEffect(() => {
//         if (product?.id && selectedVariant?.size) {
//             dispatch(initializeProduct({ id: product.id, size: selectedVariant.size }));
//         }
//     }, [product?.id, selectedVariant?.size, dispatch]);

//     // UI: Prevent scrolling when Lightbox is open
//     useEffect(() => {
//         document.body.style.overflow = showLightbox ? 'hidden' : 'unset';
//     }, [showLightbox]);

//     if (!product || !selectedVariant) return <div className="p-20 text-center">Loading Product...</div>;

//     const images = product.images || [];

//     // 3. --- Handlers ---
//     const handleAddToCart = () => {
//         if (selectedVariant.stock === 0) {
//             alert("Sorry, this size is currently out of stock.");
//             return;
//         }

//         dispatch(addItem({
//             id: product.id,
//             name: product.name,
//             image: images[0],
//             selectedSize: selectedVariant, 
//             quantity: currentQuantity      
//         }));
        
//         alert(`Added ${currentQuantity} units of Size ${selectedVariant.size} to your cart!`);
//     };

//     return (
//         <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                
//                 {/* --- LIGHTBOX MODAL --- */}
//                 {showLightbox && (
//                     <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
//                         <button 
//                             onClick={() => setShowLightbox(false)}
//                             className="absolute top-6 right-6 text-white hover:scale-110 transition"
//                         >
//                             <X size={32} />
//                         </button>
//                         <img 
//                             src={images[activeIndex]} 
//                             className="max-h-[80vh] max-w-[90vw] object-contain" 
//                             alt="Preview"
//                         />
//                     </div>
//                 )}

//                 {/* --- LEFT: GALLERY --- */}
//                 <div className="space-y-4">
//                     <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
//                         <Swiper
//                             loop={true}
//                             spaceBetween={10}
//                             navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
//                             thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                             modules={[FreeMode, Navigation, Thumbs]}
//                             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                             className="w-full h-[400px] md:h-[545px]"
//                         >
//                             {images.map((img, i) => (
//                                 <SwiperSlide key={i}>
//                                     <img src={img} className="w-full h-full object-cover" alt={product.name} />
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
                        
//                         <button className="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronLeft/></button>
//                         <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ChevronRight/></button>
//                         <button onClick={() => setShowLightbox(true)} className="absolute top-4 right-4 z-10 bg-white/80 p-3 rounded-full"><Search size={20}/></button>
//                     </div>

//                     {/* Thumbnails */}
//                     <Swiper
//                         onSwiper={setThumbsSwiper}
//                         spaceBetween={10}
//                         slidesPerView={4}
//                         watchSlidesProgress={true}
//                         modules={[FreeMode, Navigation, Thumbs]}
//                         className="h-20 md:h-24"
//                     >
//                         {images.map((img, i) => (
//                             <SwiperSlide key={i} className="cursor-pointer">
//                                 <div className={`h-full rounded-xl overflow-hidden border-2 transition ${activeIndex === i ? 'border-black' : 'border-transparent'}`}>
//                                     <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* --- RIGHT: PRODUCT INFO --- */}
//                 <div className="flex flex-col space-y-6">
//                     <div className="flex justify-between items-start gap-4">
//                         <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
//                             {product.name}
//                         </h1>
//                         <button 
//                             onClick={() => setIsLiked(!isLiked)} 
//                             className={`p-2.5 rounded-full border transition-colors ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-200'}`}
//                         >
//                             <Icons icon={isLiked ? "heroicons:heart-solid" : "heroicons:heart"} size={22} />
//                         </button>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <span className="text-3xl font-bold text-red-600">Rs. {selectedVariant.price}</span>
//                         {product.oldPrice && <span className="text-lg text-gray-400 line-through">Rs. {product.oldPrice}</span>}
//                     </div>

//                     {/* --- VARIANT SELECTOR --- */}
//                     <div className="space-y-3">
//                         <p className="font-bold text-sm uppercase tracking-wider text-gray-900">
//                             Size: <span className="font-normal">{selectedVariant.size}</span>
//                         </p>
//                         <div className="flex flex-wrap gap-2.5">
//                             {product.variants.map((variant) => (
//                                 <button 
//                                     key={variant.size} 
//                                     onClick={() => setSelectedVariant(variant)} 
//                                     disabled={variant.stock === 0}
//                                     className={`w-12 h-12 border rounded-md text-sm font-medium transition-all
//                                         ${selectedVariant.size === variant.size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}
//                                         ${variant.stock === 0 ? 'opacity-25 cursor-not-allowed bg-gray-100' : ''}`}
//                                 >
//                                     {variant.size}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* --- ACTIONS --- */}
//                     <div className="space-y-4 pt-4 border-t border-gray-100">
//                         <div className="flex flex-col sm:flex-row gap-4">
//                             {/* Quantity Counter synced by productId and the current selected size object */}
//                             <QuantityCounter 
//                                 productId={product.id} 
//                                 selectedSize={selectedVariant}
//                             />
                            
//                             <button 
//                                 onClick={handleAddToCart}
//                                 className="flex-1 bg-white border-2 border-black text-black font-bold py-4 px-8 rounded-md hover:bg-black hover:text-white transition-all uppercase tracking-widest text-sm"
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                         <BuyNowButton />
//                     </div>

//                     {/* Trust Badges */}
//                     <div className="space-y-4 pt-4 border-t border-gray-100">
//                         <div className="flex items-center gap-3 text-sm text-gray-700">
//                             <Icons icon="heroicons:truck" size={22} />
//                             <p><span className="font-bold">Free Shipping:</span> On all prepaid orders</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;