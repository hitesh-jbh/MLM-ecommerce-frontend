import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react'; 
import { useSelector } from 'react-redux';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { addToCart, addToWishlist, removeToWishlist, getWishlist } from '../../utils/service/apiService';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth?.token);

  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const lastWishlistClick = useRef(0);
  const THROTTLE_DELAY = 1000;

  const defaultImage =
    product?.thumbnail_url ||
    product?.images?.[0]?.image_url ||
    product?.images?.[0] ||
    product?.image ||
    "https://via.placeholder.com/400x500?text=No+Image";

  const hoverImage =
    product?.images?.[1]?.image_url ||
    product?.images?.[1] ||
    defaultImage;
  
  const productName = product?.name || "Product";
  const productPrice = product?.price || 0;
  const originalPrice = product?.mrp || null;
  const productId = product?.id || product?._id;

  const isOutOfStock = (product?.stock ?? 1) <= 0;

  const discountPercent =
    originalPrice && originalPrice > productPrice
      ? Math.round(((originalPrice - productPrice) / originalPrice) * 100)
      : null;

  // --- Fetch Wishlist Data ---
  const { data: wishlistData } = useQuery({
      queryKey: ["wishlist", token],
      queryFn: () => getWishlist(token).then(res => res.data.items || res.data.data || []),
      enabled: !!token
  });
  
  // चेक करें कि क्या प्रोडक्ट पहले से विशलिस्ट में है
  const isLiked = useMemo(() => {
      return wishlistData?.some((item) => {
          const itemID = item.product_id || item._id || item.id || item.product?.id;
          return String(itemID) === String(productId);
      }) ?? false;
  }, [wishlistData, productId]);

  // --- Wishlist Handler with Real API ---
  const handleWishlistToggle = async (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 

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
        
        queryClient.invalidateQueries({ queryKey: ["wishlist", token] });

        toast.update(toastId, { 
          render: isLiked ? "Removed from wishlist" : "Added to wishlist!", 
          type: "success", 
          isLoading: false, 
          autoClose: 2000, 
          closeButton: true 
        });
    } catch (error) {
        console.error("Wishlist Error:", error);
        toast.update(toastId, { 
          render: "Failed to update wishlist", 
          type: "error", 
          isLoading: false, 
          autoClose: 2000, 
          closeButton: true 
        });
    }
  };

  // --- Add to Cart Handler ---
  const handleQuickAddToCart = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!token) return navigate("/login");
    if (isOutOfStock) return;

    setIsAdding(true);
    const toastId = toast.loading("Adding to cart...");

    try {
      await addToCart(token, productId, 1);
      queryClient.invalidateQueries({ queryKey: ["cart", token] }); 

      toast.update(toastId, { 
        render: "Successfully added to cart!", 
        type: "success", 
        isLoading: false, 
        autoClose: 2000, 
        closeButton: true
      });
    } catch (error) {
      console.error("Cart Error:", error);
      toast.update(toastId, { 
        render: "Failed to add item", 
        type: "error", 
        isLoading: false,
        autoClose: 2000,
        closeButton: true
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div 
      className="relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* टॉप बैज */}
      {discountPercent && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {discountPercent}% OFF
          </span>
        </div>
      )}
      
      {/* विशलिस्ट बटन - अब असली API और लाल रंग (isLiked) के साथ */}
      <button 
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-20 w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer ${isLiked ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'}`}
      >
        <Heart 
          size={18} 
          className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500" : (isHovered ? "fill-red-50 text-red-400" : "")}`} 
        />
      </button>

      {/* इमेज कंटेनर */}
      <Link to={`/product/${product?.slug || product?.id}`} className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 block">
        <img 
          src={isHovered ? hoverImage : defaultImage} 
          alt={productName} 
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        <button 
          onClick={handleQuickAddToCart}
          disabled={isOutOfStock || isAdding}
          className={`absolute bottom-3 right-3 z-20 w-11 h-11 flex items-center justify-center bg-white text-dirora-dark rounded-full shadow-lg hover:bg-dirora-purple hover:text-white transition-all duration-300 disabled:opacity-50 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
          title="Add to Cart"
        >
          {isAdding ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <ShoppingCart size={20} className={isOutOfStock ? "opacity-50" : ""} />
          )}
        </button>
      </Link>

      {/* कॉम्पैक्ट प्रोडक्ट डिटेल्स */}
      <div className="p-3 flex flex-col gap-1">
        <Link to={`/product/${product?.slug || product?.id}`}>
          <h3 className={`font-medium text-xs md:text-sm line-clamp-1 transition-colors ${isHovered ? 'text-dirora-purple' : 'text-gray-800'}`}>
            {productName}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-gray-900 font-bold text-sm md:text-base">
            ₹{Number(productPrice).toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-gray-400 text-xs line-through">
              ₹{Number(originalPrice).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;