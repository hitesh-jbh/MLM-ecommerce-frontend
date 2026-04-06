import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
    const queryClient = useQueryClient(); 

    const token = useSelector((state) => state.auth?.token);
    const productId = product?.id || product?._id;

    // --- Throttling Refs ---
    const lastWishlistClick = useRef(0);
    const lastCartClick = useRef(0);
    const THROTTLE_DELAY = 1000; // 1 second gap

    // Fetch Wishlist
    const { data: wishlistData } = useQuery({
        queryKey: ["wishlist", token],
        queryFn: () => getWishlist(token).then(res => res.data.items || res.data.data || []),
        enabled: !!token
    });
    
    const isLiked = useMemo(() => {
        return wishlistData?.some((item) => {
            const itemID = item.product_id || item._id || item.id || item.product?.id;
            return String(itemID) === String(productId);
        }) ?? false;
    }, [wishlistData, productId]);

    const [selectedVariant] = useState({ size: "Standard", price: product?.price || 0, stock: product?.stock || 0 });
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Get current quantity from Redux
    const currentQuantity = useSelector((state) => state.count[`${productId}-Standard`] || 1);
    const isOutOfStock = (product?.stock ?? 0) <= 0;

    useEffect(() => {
        if (productId) dispatch(initializeProduct({ id: productId, size: "Standard" }));
    }, [productId, dispatch]);

    // --- Throttled Handlers ---
    const handleWishlistToggle = async () => {
        // Throttle check
        const now = Date.now();
        if (now - lastWishlistClick.current < THROTTLE_DELAY) return;
        lastWishlistClick.current = now;

        if (!token) return toast.warning("Please login first");

        const toastId = toast.loading(isLiked ? "Removing from wishlist..." : "Adding to wishlist...");
        
        try {
            if (isLiked) {
                await removeToWishlist(token, productId);
            } else {
                await addToWishlist(token, productId);
            }
            
            // Sync local redux and global React Query state
            dispatch(toggleWishlist(product));
            queryClient.invalidateQueries({ queryKey: ["wishlist", token] });

            toast.update(toastId, { 
                render: isLiked ? "Removed from wishlist" : "Added to wishlist!", 
                type: "success", 
                isLoading: false, 
                autoClose: 2000,
                closeButton: true 
            });
        } catch (error) {
            toast.update(toastId, { 
                render: "Failed to update wishlist", 
                type: "error", 
                isLoading: false, 
                autoClose: 2000,
                closeButton: true 
            });
        }
    };

    const handleAddToCart = async () => {
        // Throttle check
        const now = Date.now();
        if (now - lastCartClick.current < THROTTLE_DELAY) return;
        lastCartClick.current = now;

        if (!token) return navigate("/login");
        if (isOutOfStock) return;

        const toastId = toast.loading("Adding to cart...");
        try {
            await addToCart(token, productId, currentQuantity);
            queryClient.invalidateQueries({ queryKey: ["cart", token] }); 

            toast.update(toastId, { 
                render: "Successfully added to cart!", 
                type: "success", 
                isLoading: false, 
                autoClose: 2000, 
                closeButton: true
            });
        } catch (error) {
            toast.update(toastId, { 
                render: "Failed to add item", 
                type: "error", 
                isLoading: false,
                autoClose: 2000,
                closeButton: true
            });
        }
    };

    const images = useMemo(() => {
        const list = Array.isArray(product?.images) ? [...product.images] : [];
        if (product?.thumbnail_url && !list.includes(product.thumbnail_url)) list.unshift(product.thumbnail_url);
        return list.length > 0 ? list : ['https://via.placeholder.com/600'];
    }, [product]);

    if (!product) return <div className="h-screen flex items-center justify-center">Loading Assets...</div>;

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Swiper 
                            loop={images.length > 1} 
                            navigation 
                            thumbs={{ swiper: thumbsSwiper }} 
                            modules={[FreeMode, Navigation, Thumbs]} 
                            onSlideChange={(s) => setActiveIndex(s.realIndex)} 
                            className="h-[480px]"
                        >
                            {images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img src={img} className="w-full h-full object-contain" alt={product.name}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
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
                                <div className={`h-full rounded-xl border-2 transition-all ${activeIndex === i ? 'border-black' : 'border-transparent opacity-60'}`}>
                                    <img src={img} className="w-full h-full object-cover rounded-lg" alt="thumb"/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Content Section */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border flex items-center w-fit ${isOutOfStock ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                {isOutOfStock ? <X size={12} className="mr-1"/> : <CheckCircle2 size={12} className="mr-1"/>}
                                {isOutOfStock ? "Out of Stock" : `${product.stock} Available`}
                            </span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">{product.name}</h1>
                            <button 
                                onClick={handleWishlistToggle} 
                                className={`p-4 rounded-full border transition-all shrink-0 ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 bg-white hover:bg-gray-50'}`}
                            >
                                <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={24} />
                            </button>
                        </div>
                    </div>

                    <span className="text-4xl font-black text-gray-900">Rs. {product.price}</span>

                    <div className="flex flex-wrap gap-4 items-center">
                        <QuantityCounter productId={productId} selectedSize={selectedVariant} />
                        <button 
                            onClick={handleAddToCart} 
                            disabled={isOutOfStock} 
                            className={`flex-1 h-[56px] rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                                isOutOfStock 
                                ? "bg-gray-100 text-gray-400 border-none cursor-not-allowed" 
                                : "border-2 border-black bg-white hover:bg-black hover:text-white"
                            }`}
                        >
                            <ShoppingBag size={18} /> 
                            {isOutOfStock ? "Sold Out" : "Add to Cart"}
                        </button>
                    </div>

                    <div className="w-full">
                        <BuyNowButton product={product} />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {product.description || "High-quality product crafted for durability and comfort."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdDetails;


// import React, { useState, useEffect, useMemo } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// import { ChevronLeft, ChevronRight, X, ShoppingBag, CheckCircle2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import useSWR, { useSWRConfig } from 'swr';

// import { toggleWishlist } from '../../utils/slice/WishList.js';
// import { initializeProduct } from '../../utils/slice/countSlice.js';
// import { addToCart, addToWishlist, removeToWishlist, getWishlist } from '../../utils/service/apiService.js';
// import { toast } from 'react-toastify';

// import Icons from "../../components/ui/Icon.jsx"; 
// import QuantityCounter from '../../components/ui/NumberQuantityButton.jsx';
// import BuyNowButton from "../../components/ui/BuyNowButton.jsx";

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';

// const ProdDetails = ({ product }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { mutate } = useSWRConfig(); 

//     const token = useSelector((state) => state.auth?.token);
//     const productId = product?.id || product?._id;

//     // Fetch Wishlist
//     const { data: wishlistData } = useSWR(
//         token ? ["/api/wishlist", token] : null,
//         () => getWishlist(token).then(res => res.data.items || res.data.data || [])
//     );
    
//     const isLiked = useMemo(() => {
//         return wishlistData?.some((item) => {
//             const itemID = item.product_id || item._id || item.id || item.product?.id;
//             return String(itemID) === String(productId);
//         }) ?? false;
//     }, [wishlistData, productId]);

//     const [selectedVariant] = useState({ size: "Standard", price: product?.price || 0, stock: product?.stock || 0 });
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [activeIndex, setActiveIndex] = useState(0);

//     // Get the current quantity from Redux
//     const currentQuantity = useSelector((state) => state.count[`${productId}-Standard`] || 1);
//     const isOutOfStock = (product?.stock ?? 0) <= 0;

//     useEffect(() => {
//         if (productId) dispatch(initializeProduct({ id: productId, size: "Standard" }));
//     }, [productId, dispatch]);

//     const handleWishlistToggle = async () => {
//         if (!token) return toast.warning("Please login first");
//         const loadingToast = toast.loading(isLiked ? "Removing..." : "Adding...");
//         try {
//             if (isLiked) await removeToWishlist(token, productId);
//             else await addToWishlist(token, productId);
            
//             dispatch(toggleWishlist(product));
//             mutate(["/api/wishlist", token]);
//             toast.update(loadingToast, { render: isLiked ? "Removed" : "Added", type: "success", isLoading: false, autoClose: 2000 });
//         } catch (error) {
//             toast.update(loadingToast, { render: "Error updating wishlist", type: "error", isLoading: false, autoClose: 2000 });
//         }
//     };

//     const handleAddToCart = async () => {
//         if (!token) return navigate("/login");
//         const loadingToast = toast.loading("Adding...");
//         try {
//             await addToCart(token, productId, currentQuantity);
//             mutate(["/api/cart/", token]); 
//             toast.update(loadingToast, { render: "Added to cart!", type: "success", isLoading: false, autoClose: 2000 });
//         } catch (error) {
//             toast.update(loadingToast, { render: "Failed", type: "error", isLoading: false });
//         }
//     };

//     const images = useMemo(() => {
//         const list = Array.isArray(product?.images) ? [...product.images] : [];
//         if (product?.thumbnail_url && !list.includes(product.thumbnail_url)) list.unshift(product.thumbnail_url);
//         return list.length > 0 ? list : ['https://via.placeholder.com/600'];
//     }, [product]);

//     if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

//     return (
//         <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//                 <div className="space-y-4">
//                     <div className="relative group rounded-3xl overflow-hidden bg-gray-50 border">
//                         <Swiper loop={images.length > 1} navigation thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} onSlideChange={(s) => setActiveIndex(s.realIndex)} className="h-[480px]">
//                             {images.map((img, i) => <SwiperSlide key={i}><img src={img} className="w-full h-full object-contain" alt="product"/></SwiperSlide>)}
//                         </Swiper>
//                     </div>
//                     <Swiper onSwiper={setThumbsSwiper} spaceBetween={12} slidesPerView={4} modules={[FreeMode, Navigation, Thumbs]} className="h-24">
//                         {images.map((img, i) => (
//                             <SwiperSlide key={i} className="cursor-pointer">
//                                 <div className={`h-full rounded-xl border-2 ${activeIndex === i ? 'border-black' : 'border-transparent opacity-60'}`}>
//                                     <img src={img} className="w-full h-full object-cover" alt="thumb"/>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 <div className="flex flex-col space-y-6">
//                     <div>
//                         <div className="mb-4">
//                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${isOutOfStock ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
//                                 {isOutOfStock ? <X size={12} className="inline mr-1"/> : <CheckCircle2 size={12} className="inline mr-1"/>}
//                                 {isOutOfStock ? "Out of Stock" : `${product.stock} Available`}
//                             </span>
//                         </div>
//                         <div className="flex justify-between items-start">
//                             <h1 className="text-4xl font-bold">{product.name}</h1>
//                             <button onClick={handleWishlistToggle} className={`p-4 rounded-full border transition-all ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400'}`}>
//                                 <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={24} />
//                             </button>
//                         </div>
//                     </div>
//                     <span className="text-4xl font-black">Rs. {product.price}</span>
//                     <div className="flex flex-wrap gap-4">
//                         <QuantityCounter productId={productId} selectedSize={selectedVariant} />
//                         <button onClick={handleAddToCart} disabled={isOutOfStock} className="flex-1 h-[56px] rounded-xl font-bold border-2 border-black hover:bg-black hover:text-white transition-all">
//                             <ShoppingBag className="inline mr-2" size={18} /> {isOutOfStock ? "Sold Out" : "Add to Cart"}
//                         </button>
//                     </div>
                    
//                     {/* Updated BuyNowButton with quantity prop */}
//                     <div className="w-full">
//                         <BuyNowButton product={product} />
//                         {/* <BuyNowButton product={product} quantity={currentQuantity} /> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProdDetails;