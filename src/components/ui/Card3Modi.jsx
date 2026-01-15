import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSWRConfig } from 'swr'; 
import Icons from '../ui/Icon.jsx';
import { toggleWishlist } from '../../utils/Slice/wishlistSlice.js';
import { addToCart } from '../../utils/service/apiService.js';
import { toast } from 'react-toastify';

const Card3Modi = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig(); 
  
  const token = useSelector((state) => state.auth?.token);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  
  // Standardize ID: backend usually uses _id, frontend might use id
  const productId = product._id || product.id;
  const isLiked = wishlistItems.some((item) => (item._id || item.id) === productId);

  const handleAddItem = async (e) => {
    e.stopPropagation();

    if (!token) {
      toast.warning("Please login to add items to cart");
      return;
    }

    if (product.stock !== undefined && product.stock <= 0) {
      toast.error("This item is currently out of stock!");
      return;
    }

    const loadingToast = toast.loading("Adding to cart...");

    try {
      // Pass the standardized productId
      await addToCart(token, productId, 1);

      // Re-validate the cart data globally so the Cart page updates
      mutate(["/api/cart", token]); 
      
      toast.update(loadingToast, { 
        render: "Product added to cart!", 
        type: "success", 
        isLoading: false, 
        autoClose: 2000 
      });
    } catch (error) {
      toast.update(loadingToast, { 
        render: error.response?.data?.message || "Failed to add to cart", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  return (
    <div className="group relative flex flex-col w-full bg-white rounded-[32px] border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-1">
      <div 
        onClick={() => navigate(`/product/${productId}`)} 
        className="relative aspect-[4/5] m-2 overflow-hidden rounded-[24px] bg-[#F7F7F7] cursor-pointer"
      >
        <img
          src={Array.isArray(product.thumbnail_url) ? product.thumbnail_url : (product.thumbnail_url || 'https://dummyimage.com/400x500')}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <button 
          onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(product)); }} 
          className={`absolute top-4 right-4 p-2.5 backdrop-blur-md rounded-full transition-all z-20 ${isLiked ? "bg-red-50 text-red-500" : "bg-white/90 text-gray-400"}`}
        >
          <Icons icon={isLiked ? "solar:heart-bold" : "solar:heart-linear"} size={20} />
        </button>
        
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden lg:block z-20">
          <button onClick={handleAddItem} className="w-full bg-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-900 shadow-2xl hover:bg-black hover:text-white transition-all border border-gray-100">
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5 pt-2 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-black text-black">Rs. {product.price}</span>

          <div className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter ${
            product?.stock > 0 
              ? 'bg-green-50 text-green-600 border border-green-100' 
              : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {product?.stock > 0 ? 'In Stock' : 'Sold Out'}
        </div>
        </div>
        
        
        <button onClick={handleAddItem} className="mt-4 w-full lg:hidden bg-black text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card3Modi;