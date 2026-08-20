import React, { useState, useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import {
  ShoppingBag,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { toggleWishlist } from "../../utils/slice/WishList.js";
import { initializeProduct } from "../../utils/slice/countSlice.js";
import {
  addToCart,
  addToWishlist,
  removeToWishlist,
  getWishlist,
} from "../../utils/service/apiService.js";
import { toast } from "react-toastify";

import Icons from "../../components/ui/Icon.jsx";
import QuantityCounter from "../../components/ui/NumberQuantityButton.jsx";
import BuyNowButton from "../../components/ui/BuyNowButton.jsx";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProdDetails = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const token = useSelector((state) => state.auth?.token);
  const productId = product?.id || product?._id;

  const lastWishlistClick = useRef(0);
  const lastCartClick = useRef(0);
  const THROTTLE_DELAY = 1000;

  // 👇 1. टैब्स के लिए State वापस ले आए
  const [activeTab, setActiveTab] = useState("description");

  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist", token],
    queryFn: () =>
      getWishlist(token).then((res) => res.data.items || res.data.data || []),
    enabled: !!token,
  });

  const isLiked = useMemo(() => {
    return (
      wishlistData?.some((item) => {
        const itemID =
          item.product_id || item._id || item.id || item.product?.id;
        return String(itemID) === String(productId);
      }) ?? false
    );
  }, [wishlistData, productId]);

  const [selectedVariant] = useState({
    size: "Standard",
    price: product?.price || 0,
    stock: product?.stock || 0,
  });
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentQuantity = useSelector(
    (state) => state.count[`${productId}-Standard`] || 1,
  );
  const isOutOfStock = (product?.stock ?? 0) <= 0;

  useEffect(() => {
    if (productId)
      dispatch(initializeProduct({ id: productId, size: "Standard" }));
  }, [productId, dispatch]);

  const handleWishlistToggle = async () => {
    const now = Date.now();
    if (now - lastWishlistClick.current < THROTTLE_DELAY) return;
    lastWishlistClick.current = now;

    if (!token) return toast.warning("Please login first");

    const toastId = toast.loading(
      isLiked ? "Removing from wishlist..." : "Adding to wishlist...",
    );

    try {
      if (isLiked) {
        await removeToWishlist(token, productId);
      } else {
        await addToWishlist(token, productId);
      }

      dispatch(toggleWishlist(product));
      queryClient.invalidateQueries({ queryKey: ["wishlist", token] });

      toast.update(toastId, {
        render: isLiked ? "Removed from wishlist" : "Added to wishlist!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
      });
    } catch (error) {
      console.error("Wishlist Error:", error);
      toast.update(toastId, {
        render: "Failed to update wishlist",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
      });
    }
  };

  const handleAddToCart = async () => {
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
        closeButton: true,
      });
    } catch (error) {
      console.error("Cart Error:", error);
      toast.update(toastId, {
        render: "Failed to add item",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
      });
    }
  };

  const images = useMemo(() => {
    const list = Array.isArray(product?.images) ? [...product.images] : [];
    if (product?.thumbnail_url && !list.includes(product.thumbnail_url))
      list.unshift(product.thumbnail_url);
    return list.length > 0 ? list : ["https://via.placeholder.com/600"];
  }, [product]);

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-serif text-dirora-purple">
        Loading Assets...
      </div>
    );

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* 🌟 IMAGE GALLERY */}
        <div className="space-y-4">
          <div className="relative group rounded-3xl overflow-hidden bg-gray-50/50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Swiper
              loop={images.length > 1}
              navigation={{ prevEl, nextEl }}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              className="h-[400px] md:h-[500px]"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    className="w-full h-full object-contain p-4"
                    alt={product.name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {images.length > 1 && (
              <>
                <button
                  ref={(node) => setPrevEl(node)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 text-dirora-dark rounded-full shadow-md hover:bg-dirora-purple hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  ref={(node) => setNextEl(node)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 text-dirora-dark rounded-full shadow-md hover:bg-dirora-purple hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-20 md:h-24"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="cursor-pointer">
                <div
                  className={`h-full rounded-2xl border-2 transition-all p-1 bg-gray-50 ${activeIndex === i ? "border-dirora-purple shadow-sm scale-[1.02]" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover rounded-xl"
                    alt="thumb"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🌟 CONTENT SECTION */}
        <div className="flex flex-col space-y-6 bg-[#f8f5ff] p-6 md:p-10 rounded-3xl border border-purple-100 shadow-sm h-fit">
          <div>
            <div className="mb-4">
              <span
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-black uppercase tracking-widest border flex items-center w-fit shadow-sm ${isOutOfStock ? "bg-red-50 text-red-600 border-red-100" : "bg-purple-100 text-dirora-purple border-purple-200"}`}
              >
                {isOutOfStock ? (
                  <X size={14} className="mr-2" />
                ) : (
                  <CheckCircle2 size={14} className="mr-2" />
                )}
                {isOutOfStock ? "Out of Stock" : `${product.stock} Available`}
              </span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl md:text-3xl font-serif font-black text-dirora-dark tracking-tight leading-tight">
                {product.name}
              </h1>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-full border transition-all shrink-0 hover:scale-105 shadow-sm ${isLiked ? "text-red-500 bg-red-50 border-red-100" : "text-gray-400 bg-white border-gray-200 hover:border-dirora-purple hover:text-dirora-purple"}`}
              >
                <Icons
                  icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"}
                  size={22}
                />
              </button>
            </div>
          </div>

          {/* Price with Strike-through MRP */}
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-black text-dirora-dark font-serif tracking-tight">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>

            {/* अगर MRP या compare_price डेटाबेस में है और price से ज़्यादा है */}
            {((product.mrp && Number(product.mrp) > Number(product.price)) ||
              (product.compare_price &&
                Number(product.compare_price) > Number(product.price))) && (
              <span className="text-red-500 line-through text-lg md:text-xl font-normal font-serif">
                ₹
                {Number(product.mrp || product.compare_price).toLocaleString(
                  "en-IN",
                )}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <QuantityCounter
              productId={productId}
              selectedSize={selectedVariant}
            />
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 h-[52px] rounded-xl font-bold tracking-widest uppercase text-xs md:text-sm transition-all flex items-center justify-center gap-3 shadow-sm ${
                isOutOfStock
                  ? "bg-gray-100 text-gray-400 border-none cursor-not-allowed shadow-none"
                  : "border-2 border-dirora-purple text-dirora-purple bg-white hover:bg-dirora-purple hover:text-white hover:shadow-md hover:shadow-purple-200"
              }`}
            >
              <ShoppingBag size={18} />
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>

          <div className="w-full">
            <BuyNowButton product={product} />
          </div>

          {/* 👇 2. डिस्क्रिप्शन और शिपिंग टैब्स वापस आ गए! */}
          <div className="pt-6 mt-4 border-t border-purple-200/60">
            <div className="flex gap-6 mb-5">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-2 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === "description" ? "border-dirora-purple text-dirora-purple" : "border-transparent text-gray-400 hover:text-gray-700"}`}
              >
                Product Description
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-2 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === "shipping" ? "border-dirora-purple text-dirora-purple" : "border-transparent text-gray-400 hover:text-gray-700"}`}
              >
                Shipping & Return
              </button>
            </div>

            <div className="text-gray-600 text-sm leading-relaxed min-h-[100px]">
              {activeTab === "description" && (
                <p className="animate-in fade-in duration-500">
                  {product.description ||
                    "Exclusive designer piece crafted with premium quality materials. Perfect for elevating your everyday style and making a lasting impression."}
                </p>
              )}
              {activeTab === "shipping" && (
                <ul className="list-disc pl-5 space-y-2 animate-in fade-in duration-500 text-gray-600 marker:text-dirora-purple">
                  <li>Free insured shipping on all orders over ₹999.</li>
                  <li>Delivered securely in premium brand packaging.</li>
                  <li>7-day easy return and exchange policy available.</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDetails;
