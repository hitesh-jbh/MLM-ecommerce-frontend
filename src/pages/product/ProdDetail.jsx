// import React, { useState, useEffect, useMemo } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// import { ChevronLeft, ChevronRight, X, ShoppingBag, CheckCircle2, AlertTriangle, ChevronRight as ArrowRight } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useSWRConfig } from 'swr';

// // Redux Actions & Services
// import { toggleWishlist } from '../../utils/Slice/WishList.js';
// import { initializeProduct } from '../../utils/Slice/countSlice.js';
// import { addToCart, createOrder } from '../../utils/service/apiService.js';
// import { toast } from 'react-toastify';

// // UI Components
// import Icons from "../../components/ui/Icon.jsx"; 
// import QuantityCounter from '../../components/ui/NumberQuantityButton.jsx';
// import BuyNowButton from "../../components/ui/BuyNowButton.jsx"

// // Swiper Styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/free-mode';

// const ProdDetails = ({ product }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { mutate } = useSWRConfig(); 
//     console.log(product)

//     const token = useSelector((state) => state.auth?.token);
    
//     const [selectedVariant, setSelectedVariant] = useState(
//         product?.variants?.[0] || { size: "M", price: product?.price, stock: product?.stock || 0 }
//     );
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);

//     const productId = product?._id || product?.id;
//     const wishlistItems = useSelector((state) => state.wishlist.items || []);
//     const isLiked = wishlistItems.some((item) => (item._id || item.id) === productId);
    
//     // --- QUANTITY FIX ---
//     // This pulls the live count from your Redux store based on the product and size
//     const counterKey = `${productId}-${selectedVariant.size}`;
//     const currentQuantity = useSelector((state) => state.count[counterKey] || 1);

//     const stockCount = selectedVariant.stock;
//     const isOutOfStock = stockCount <= 0;
//     const isLowStock = stockCount > 0 && stockCount <= 5;

//     useEffect(() => {
//         if (productId) {
//             dispatch(initializeProduct({ id: productId, size: selectedVariant.size }));
//         }
//     }, [productId, selectedVariant.size, dispatch]);

//     // const images = useMemo(() => {
//     //     return Array.isArray(product?.image) ? product.image : [product?.image || 'https://via.placeholder.com/600'];
//     // }, [product]);
//     const images = useMemo(() => {
//         // Check for the specific property 'image_url' from your API response
//         if (product?.image_url) {
//             return [product.image_url];
//         }
        
//         // Fallback if the data structure changes to an array or uses a different key
//         if (Array.isArray(product?.image)) {
//             return product.image;
//         }

//         return [product?.image || 'https://via.placeholder.com/600'];
//     }, [product]);

//     const handleAddToCart = async () => {
//         if (!token) {
//             toast.warning("Please login to add items to cart");
//             return navigate("/login");
//         }

//         if (isOutOfStock) return toast.error("Out of stock!");

//         const loadingToast = toast.loading("Adding to cart...");

//         try {
//             // FIX: Explicitly passing currentQuantity from Redux to the API
//             await addToCart(token, productId, currentQuantity);
            
//             mutate(["/api/cart/", token]); 
            
//             toast.update(loadingToast, { 
//                 render: `Added ${currentQuantity} item(s) to cart!`, 
//                 type: "success", 
//                 isLoading: false, 
//                 autoClose: 2000 
//             });
//         } catch (error) {
//             toast.update(loadingToast, { 
//                 render: error.response?.data?.message || "Failed to add", 
//                 type: "error", 
//                 isLoading: false, 
//                 autoClose: 3000 
//             });
//         }
//     };

//     const handleBuyNow = async () => {
//         if (!token) {
//             toast.warning("Please login to proceed");
//             return navigate("/login");
//         }

//         const loadingToast = toast.loading("Preparing checkout...");

//         try {
//             // FIX: Passing the selected quantity to the order payload
//             const orderPayload = {
//                 items: [{ productId: productId, quantity: currentQuantity }]
//             };

//             const response = await createOrder(token, orderPayload);

//             if (response.data.success) {
//                 toast.update(loadingToast, { 
//                     render: "Order placed successfully!", 
//                     type: "success", 
//                     isLoading: false, 
//                     autoClose: 2000 
//                 });
//                 navigate('/your-order');
//             }
//         } catch (error) {
//             toast.update(loadingToast, { 
//                 render: error.response?.data?.message || "Order failed", 
//                 type: "error", 
//                 isLoading: false, 
//                 autoClose: 3000 
//             });
//         }
//     };

//     if (!product) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;

//     return (
//         <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 font-sans">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                
//                 {/* GALLERY (Left Column) */}
//                 <div className="space-y-4">
//                     <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
//                         <Swiper
//                             loop={true}
//                             navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
//                             thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                             modules={[FreeMode, Navigation, Thumbs]}
//                             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                             className="w-full h-[470px] md:h-[470px]"
//                         >
//                             {images.map((img, i) => (
//                                 <SwiperSlide key={i}>
//                                     <img src={img} className="w-full h-full object-cover" alt={product.name} />
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                         <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"><ChevronRight size={20}/></button>
//                     </div>

//                     <Swiper
//                         onSwiper={setThumbsSwiper}
//                         spaceBetween={12}
//                         slidesPerView={4}
//                         modules={[FreeMode, Navigation, Thumbs]}
//                         className="h-24"
//                     >
//                         {images.map((img, i) => (
//                             <SwiperSlide key={i} className="cursor-pointer">
//                                 <div className={`h-full rounded-xl overflow-hidden border-2 transition-all ${activeIndex === i ? 'border-black' : 'border-transparent opacity-60'}`}>
//                                     <img src={img} className="w-full h-full object-cover" alt="thumb" />
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* INFO (Right Column) */}
//                 <div className="flex flex-col space-y-8">
//                     <div>
//                         <div className="mb-4">
//                             {isOutOfStock ? (
//                                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest border border-red-100">
//                                     <X size={12} /> Out of Stock
//                                 </span>
//                             ) : isLowStock ? (
//                                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-widest border border-orange-100 animate-pulse">
//                                     <AlertTriangle size={12} /> Only {stockCount} left!
//                                 </span>
//                             ) : (
//                                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest border border-green-100">
//                                     <CheckCircle2 size={12} /> In Stock
//                                 </span>
//                             )}
//                         </div>

//                         <div className="flex justify-between items-start gap-6">
//                             <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{product.name}</h1>
//                             <button 
//                                 onClick={() => dispatch(toggleWishlist(product))} 
//                                 className={`p-4 rounded-full border transition-all ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-100 hover:border-gray-300'}`}
//                             >
//                                 <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={24} />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex items-baseline gap-4">
//                         <span className="text-4xl font-black text-black tracking-tight">Rs. {selectedVariant.price}</span>
//                     </div>

//                     <div className="space-y-6 pt-6">
//                         {/* CONTROLS ROW: MATCHES SCREENSHOT D41A2C */}
//                         <div className="flex flex-wrap items-center gap-4">
//                             {/* PILL QUANTITY SELECTOR */}
//                             <div className={`h-[56px] flex items-center border border-gray-200  px-2 bg-white shadow-sm ${isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}>
//                                 <QuantityCounter productId={productId} selectedSize={selectedVariant} />
//                             </div>
                            
//                             {/* ADD TO CART BUTTON */}
//                             <button 
//                                 onClick={handleAddToCart}
//                                 disabled={isOutOfStock}
//                                 className={`flex-1 min-w-[200px] h-[56px] rounded-full font-bold uppercase tracking-widest text-xs transition-all border-2 flex items-center justify-center gap-2
//                                     ${isOutOfStock 
//                                         ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' 
//                                         : 'bg-white border-black text-black hover:bg-black hover:text-white active:scale-95 shadow-sm'}`}
//                             >
//                                 <ShoppingBag size={18} />
//                                 {isOutOfStock ? "Sold Out" : "Add to Cart"}
//                             </button>
//                         </div>
                        
//                         {/* BUY NOW BRANDED BAR: MATCHES SCREENSHOT D41A2C */}
//                         <div className="w-full">
//                             <div 
//                                 onClick={!isOutOfStock ? handleBuyNow : undefined}
//                                 className={`w-full group transition-transform active:scale-[0.98] cursor-pointer ${
//                                     isOutOfStock ? 'opacity-40 grayscale cursor-not-allowed pointer-events-none' : ''
//                                 }`}
//                             >
//                                 <div className="bg-black text-white rounded-xl p-1 flex items-center justify-between overflow-hidden shadow-lg border border-black">
//                                     {/* If BuyNowButton has its own onClick, you might need to 
//                                     pass the handleBuyNow function into it as a prop instead.
//                                     */}
//                                     <BuyNowButton />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* TRUST BADGES */}
//                     <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
//                         <div className="p-4 bg-gray-50/50 rounded-2xl flex items-center gap-3 border border-gray-100">
//                             <Icons icon="solar:shield-check-bold" className="text-gray-400" size={24}/>
//                             <div>
//                                 <p className="text-[10px] text-gray-400 uppercase font-black">Security</p>
//                                 <p className="text-xs font-bold">Safe Payments</p>
//                             </div>
//                         </div>
//                         <div className="p-4 bg-gray-50/50 rounded-2xl flex items-center gap-3 border border-gray-100">
//                             <Icons icon="solar:delivery-bold" className="text-gray-400" size={24}/>
//                             <div>
//                                 <p className="text-[10px] text-gray-400 uppercase font-black">Shipping</p>
//                                 <p className="text-xs font-bold">Fast Delivery</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProdDetails;

import React, { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, X, ShoppingBag, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';

// Redux Actions & Services
import { toggleWishlist } from '../../utils/Slice/WishList.js';
import { initializeProduct } from '../../utils/Slice/countSlice.js';
import { addToCart, createOrder } from '../../utils/service/apiService.js';
import { toast } from 'react-toastify';

// UI Components
import Icons from "../../components/ui/Icon.jsx"; 
import QuantityCounter from '../../components/ui/NumberQuantityButton.jsx';
import BuyNowButton from "../../components/ui/BuyNowButton.jsx"

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const ProdDetails = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig(); 

    const token = useSelector((state) => state.auth?.token);
    const wishlistItems = useSelector((state) => state.wishlist.items || []);
    
    // 1. INTEGRATION: Standardize IDs and Variant
    const productId = product?.id || product?._id;
    
    // Create a default variant because your API is "flat" (no variants array)
    const [selectedVariant, setSelectedVariant] = useState({
        size: "Standard",
        price: product?.price || 0,
        stock: product?.stock || 0
    });

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isLiked = wishlistItems.some((item) => (item._id || item.id) === productId);
    
    const counterKey = `${productId}-${selectedVariant.size}`;
    const currentQuantity = useSelector((state) => state.count[counterKey] || 1);

    const stockCount = product?.stock ?? 0;
    const isOutOfStock = stockCount <= 0;
    const isLowStock = stockCount > 0 && stockCount <= 5;

    useEffect(() => {
        if (productId) {
            dispatch(initializeProduct({ id: productId, size: selectedVariant.size }));
        }
    }, [productId, selectedVariant.size, dispatch]);

    // 2. INTEGRATION: Map your 'images' and 'thumbnail_url'
    const images = useMemo(() => {
        const imageList = [];
        
        // Add images array from API if exists
        if (Array.isArray(product?.images)) {
            imageList.push(...product.images);
        }
        
        // Add thumbnail as fallback/extra if not already in list
        if (product?.thumbnail_url && !imageList.includes(product.thumbnail_url)) {
            imageList.unshift(product.thumbnail_url);
        }

        return imageList.length > 0 ? imageList : ['https://via.placeholder.com/600'];
    }, [product]);

    const handleAddToCart = async () => {
        if (!token) {
            toast.warning("Please login to add items to cart");
            return navigate("/login");
        }

        if (isOutOfStock) return toast.error("Out of stock!");
        const loadingToast = toast.loading("Adding to cart...");

        try {
            await addToCart(token, productId, currentQuantity);
            mutate(["/api/cart/", token]); 
            toast.update(loadingToast, { 
                render: `Added ${currentQuantity} item(s) to cart!`, 
                type: "success", 
                isLoading: false, 
                autoClose: 2000 
            });
        } catch (error) {
            toast.update(loadingToast, { 
                render: error.response?.data?.message || "Failed to add", 
                type: "error", 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    };

    const handleBuyNow = async () => {
        if (!token) {
            toast.warning("Please login to proceed");
            return navigate("/login");
        }

        const loadingToast = toast.loading("Preparing checkout...");
        try {
            const orderPayload = {
                items: [{ productId: productId, quantity: currentQuantity }]
            };
            const response = await createOrder(token, orderPayload);
            if (response.data.success) {
                toast.update(loadingToast, { 
                    render: "Order placed successfully!", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 2000 
                });
                navigate('/your-order');
            }
        } catch (error) {
            toast.update(loadingToast, { 
                render: error.response?.data?.message || "Order failed", 
                type: "error", 
                isLoading: false, 
                autoClose: 3000 
            });
        }
    };

    if (!product) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                
                {/* GALLERY SECTION */}
                <div className="space-y-4">
                    <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Swiper
                            loop={images.length > 1}
                            navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            className="w-full h-[480px]"
                        >
                            {images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img src={img} className="w-full h-full object-contain" alt={product.name} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {images.length > 1 && (
                            <>
                                <button className="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"><ChevronLeft size={20}/></button>
                                <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"><ChevronRight size={20}/></button>
                            </>
                        )}
                    </div>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={12}
                        slidesPerView={4}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="h-24"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i} className="cursor-pointer">
                                <div className={`h-full rounded-xl overflow-hidden border-2 transition-all ${activeIndex === i ? 'border-black' : 'border-transparent opacity-60'}`}>
                                    <img src={img} className="w-full h-full object-cover" alt="thumb" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* INFO SECTION */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <div className="mb-4">
                            {isOutOfStock ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase border border-red-100">
                                    <X size={12} /> Out of Stock
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase border border-green-100">
                                    <CheckCircle2 size={12} /> {stockCount} Items Available
                                </span>
                            )}
                        </div>

                        <div className="flex justify-between items-start gap-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                            <button 
                                onClick={() => dispatch(toggleWishlist(product))} 
                                className={`p-4 rounded-full border transition-all ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-100 hover:border-gray-300'}`}
                            >
                                <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={24} />
                            </button>
                        </div>
                        <p className="text-gray-500 mt-2 text-sm font-medium uppercase tracking-wider">{product.category}</p>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-4xl font-black text-black">Rs. {product.price}</span>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className={`h-[56px] flex items-center border border-gray-200 px-2 bg-white rounded-xl ${isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}>
                                <QuantityCounter productId={productId} selectedSize={selectedVariant} />
                            </div>
                            
                            <button 
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className={`flex-1 min-w-[200px] h-[56px] rounded-xl font-bold uppercase tracking-widest text-xs transition-all border-2 flex items-center justify-center gap-2
                                    ${isOutOfStock 
                                        ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' 
                                        : 'bg-white border-black text-black hover:bg-black hover:text-white shadow-sm'}`}
                            >
                                <ShoppingBag size={18} />
                                {isOutOfStock ? "Sold Out" : "Add to Cart"}
                            </button>
                        </div>
                        
                        <div 
                            onClick={!isOutOfStock ? handleBuyNow : undefined}
                            className={`w-full group cursor-pointer ${isOutOfStock ? 'opacity-40 pointer-events-none' : ''}`}
                        >
                            <div className="bg-black text-white rounded-xl p-1 flex items-center justify-between overflow-hidden shadow-lg">
                                <BuyNowButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdDetails;