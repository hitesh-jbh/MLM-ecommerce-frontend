
// import React, { useState, useEffect, useMemo } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// import { ChevronLeft, ChevronRight, X, ShoppingBag, CheckCircle2, AlertTriangle } from 'lucide-react';
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

//     const token = useSelector((state) => state.auth?.token);
//     const wishlistItems = useSelector((state) => state.wishlist.items || []);
    
//     // 1. INTEGRATION: Standardize IDs and Variant
//     const productId = product?.id || product?._id;
    
//     // Create a default variant because your API is "flat" (no variants array)
//     const [selectedVariant, setSelectedVariant] = useState({
//         size: "Standard",
//         price: product?.price || 0,
//         stock: product?.stock || 0
//     });

//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);

//     const isLiked = wishlistItems.some((item) => (item._id || item.id) === productId);
    
//     const counterKey = `${productId}-${selectedVariant.size}`;
//     const currentQuantity = useSelector((state) => state.count[counterKey] || 1);

//     const stockCount = product?.stock ?? 0;
//     const isOutOfStock = stockCount <= 0;
//     const isLowStock = stockCount > 0 && stockCount <= 5;

//     useEffect(() => {
//         if (productId) {
//             dispatch(initializeProduct({ id: productId, size: selectedVariant.size }));
//         }
//     }, [productId, selectedVariant.size, dispatch]);

//     // 2. INTEGRATION: Map your 'images' and 'thumbnail_url'
//     const images = useMemo(() => {
//         const imageList = [];
        
//         // Add images array from API if exists
//         if (Array.isArray(product?.images)) {
//             imageList.push(...product.images);
//         }
        
//         // Add thumbnail as fallback/extra if not already in list
//         if (product?.thumbnail_url && !imageList.includes(product.thumbnail_url)) {
//             imageList.unshift(product.thumbnail_url);
//         }

//         return imageList.length > 0 ? imageList : ['https://via.placeholder.com/600'];
//     }, [product]);

//     const handleAddToCart = async () => {
//         if (!token) {
//             toast.warning("Please login to add items to cart");
//             return navigate("/login");
//         }

//         if (isOutOfStock) return toast.error("Out of stock!");
//         const loadingToast = toast.loading("Adding to cart...");

//         try {
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
                
//                 {/* GALLERY SECTION */}
//                 <div className="space-y-4">
//                     <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
//                         <Swiper
//                             loop={images.length > 1}
//                             navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
//                             thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                             modules={[FreeMode, Navigation, Thumbs]}
//                             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                             className="w-full h-[480px]"
//                         >
//                             {images.map((img, i) => (
//                                 <SwiperSlide key={i}>
//                                     <img src={img} className="w-full h-full object-contain" alt={product.name} />
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                         {images.length > 1 && (
//                             <>
//                                 <button className="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"><ChevronLeft size={20}/></button>
//                                 <button className="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"><ChevronRight size={20}/></button>
//                             </>
//                         )}
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

//                 {/* INFO SECTION */}
//                 <div className="flex flex-col space-y-6">
//                     <div>
//                         <div className="mb-4">
//                             {isOutOfStock ? (
//                                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase border border-red-100">
//                                     <X size={12} /> Out of Stock
//                                 </span>
//                             ) : (
//                                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase border border-green-100">
//                                     <CheckCircle2 size={12} /> {stockCount} Items Available
//                                 </span>
//                             )}
//                         </div>

//                         <div className="flex justify-between items-start gap-6">
//                             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
//                             <button 
//                                 onClick={() => dispatch(toggleWishlist(product))} 
//                                 className={`p-4 rounded-full border transition-all ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-100 hover:border-gray-300'}`}
//                             >
//                                 <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={24} />
//                             </button>
//                         </div>
//                         <p className="text-gray-500 mt-2 text-sm font-medium uppercase tracking-wider">{product.category}</p>
//                     </div>

//                     <div className="flex items-baseline gap-4">
//                         <span className="text-4xl font-black text-black">Rs. {product.price}</span>
//                     </div>

//                     <div className="space-y-6 pt-4">
//                         <div className="flex flex-wrap items-center gap-4">
//                             <div className={`h-[56px] flex items-center border border-gray-200 px-2 bg-white rounded-xl ${isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}>
//                                 <QuantityCounter productId={productId} selectedSize={selectedVariant} />
//                             </div>
                            
//                             <button 
//                                 onClick={handleAddToCart}
//                                 disabled={isOutOfStock}
//                                 className={`flex-1 min-w-[200px] h-[56px] rounded-xl font-bold uppercase tracking-widest text-xs transition-all border-2 flex items-center justify-center gap-2
//                                     ${isOutOfStock 
//                                         ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' 
//                                         : 'bg-white border-black text-black hover:bg-black hover:text-white shadow-sm'}`}
//                             >
//                                 <ShoppingBag size={18} />
//                                 {isOutOfStock ? "Sold Out" : "Add to Cart"}
//                             </button>
//                         </div>
                        
//                         <div 
//                             onClick={!isOutOfStock ? handleBuyNow : undefined}
//                             className={`w-full group cursor-pointer ${isOutOfStock ? 'opacity-40 pointer-events-none' : ''}`}
//                         >
//                             <div className="bg-black text-white rounded-xl p-1 flex items-center justify-between overflow-hidden shadow-lg">
//                                 <BuyNowButton />
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
import { ChevronLeft, ChevronRight, X, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';

import { toggleWishlist } from '../../utils/slice/WishList.js';
import { initializeProduct } from '../../utils/slice/countSlice.js';
import { addToCart, addToWishlist, removeToWishlist, getWishlist } from '../../utils/service/apiService.js';
import { toast } from 'react-toastify';

import Icons from "../../components/ui/Icon.jsx"; 
import QuantityCounter from '../../components/ui/NumberQuantityButton.jsx';
import BuyNowButton from "../../components/ui/BuyNowButton.jsx";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProdDetails = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig(); 

    const token = useSelector((state) => state.auth?.token);
    const productId = product?.id || product?._id;

    // Fetch Wishlist
    const { data: wishlistData } = useSWR(
        token ? ["/api/wishlist", token] : null,
        () => getWishlist(token).then(res => res.data.items || res.data.data || [])
    );
    
    const isLiked = useMemo(() => {
        return wishlistData?.some((item) => {
            const itemID = item.product_id || item._id || item.id || item.product?.id;
            return String(itemID) === String(productId);
        }) ?? false;
    }, [wishlistData, productId]);

    const [selectedVariant] = useState({ size: "Standard", price: product?.price || 0, stock: product?.stock || 0 });
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Get the current quantity from Redux
    const currentQuantity = useSelector((state) => state.count[`${productId}-Standard`] || 1);
    const isOutOfStock = (product?.stock ?? 0) <= 0;

    useEffect(() => {
        if (productId) dispatch(initializeProduct({ id: productId, size: "Standard" }));
    }, [productId, dispatch]);

    const handleWishlistToggle = async () => {
        if (!token) return toast.warning("Please login first");
        const loadingToast = toast.loading(isLiked ? "Removing..." : "Adding...");
        try {
            if (isLiked) await removeToWishlist(token, productId);
            else await addToWishlist(token, productId);
            
            dispatch(toggleWishlist(product));
            mutate(["/api/wishlist", token]);
            toast.update(loadingToast, { render: isLiked ? "Removed" : "Added", type: "success", isLoading: false, autoClose: 2000 });
        } catch (error) {
            toast.update(loadingToast, { render: "Error updating wishlist", type: "error", isLoading: false, autoClose: 2000 });
        }
    };

    const handleAddToCart = async () => {
        if (!token) return navigate("/login");
        const loadingToast = toast.loading("Adding...");
        try {
            await addToCart(token, productId, currentQuantity);
            mutate(["/api/cart/", token]); 
            toast.update(loadingToast, { render: "Added to cart!", type: "success", isLoading: false, autoClose: 2000 });
        } catch (error) {
            toast.update(loadingToast, { render: "Failed", type: "error", isLoading: false });
        }
    };

    const images = useMemo(() => {
        const list = Array.isArray(product?.images) ? [...product.images] : [];
        if (product?.thumbnail_url && !list.includes(product.thumbnail_url)) list.unshift(product.thumbnail_url);
        return list.length > 0 ? list : ['https://via.placeholder.com/600'];
    }, [product]);

    if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-4">
                    <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border">
                        <Swiper loop={images.length > 1} navigation thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} onSlideChange={(s) => setActiveIndex(s.realIndex)} className="h-[480px]">
                            {images.map((img, i) => <SwiperSlide key={i}><img src={img} className="w-full h-full object-contain" alt="product"/></SwiperSlide>)}
                        </Swiper>
                    </div>
                    <Swiper onSwiper={setThumbsSwiper} spaceBetween={12} slidesPerView={4} modules={[FreeMode, Navigation, Thumbs]} className="h-24">
                        {images.map((img, i) => (
                            <SwiperSlide key={i} className="cursor-pointer">
                                <div className={`h-full rounded-xl border-2 ${activeIndex === i ? 'border-black' : 'border-transparent opacity-60'}`}>
                                    <img src={img} className="w-full h-full object-cover" alt="thumb"/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="flex flex-col space-y-6">
                    <div>
                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${isOutOfStock ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {isOutOfStock ? <X size={12} className="inline mr-1"/> : <CheckCircle2 size={12} className="inline mr-1"/>}
                                {isOutOfStock ? "Out of Stock" : `${product.stock} Available`}
                            </span>
                        </div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-4xl font-bold">{product.name}</h1>
                            <button onClick={handleWishlistToggle} className={`p-4 rounded-full border transition-all ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400'}`}>
                                <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={24} />
                            </button>
                        </div>
                    </div>
                    <span className="text-4xl font-black">Rs. {product.price}</span>
                    <div className="flex flex-wrap gap-4">
                        <QuantityCounter productId={productId} selectedSize={selectedVariant} />
                        <button onClick={handleAddToCart} disabled={isOutOfStock} className="flex-1 h-[56px] rounded-xl font-bold border-2 border-black hover:bg-black hover:text-white transition-all">
                            <ShoppingBag className="inline mr-2" size={18} /> {isOutOfStock ? "Sold Out" : "Add to Cart"}
                        </button>
                    </div>
                    
                    {/* Updated BuyNowButton with quantity prop */}
                    <div className="w-full">
                        <BuyNowButton product={product} />
                        {/* <BuyNowButton product={product} quantity={currentQuantity} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdDetails;