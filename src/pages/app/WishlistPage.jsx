import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import useSWR, { useSWRConfig } from "swr";
import { 
  getWishlist, 
  removeToWishlist, 
  addToCart 
} from "../../utils/service/apiService.js";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const token = useSelector((state) => state.auth?.token);

  // FETCH: Always get fresh wishlist from DB to prevent Duplicate Entry errors
  const { data: wishlistItems, isLoading } = useSWR(
    token ? ["/api/wishlist", token] : null,
    () => getWishlist(token).then((res) => res.data.items || res.data.data || [])
  );

  const handleMoveToCart = async (item) => {
    if (!token) return navigate("/login");
    
    // Ensure we are grabbing the correct ID field based on your backend response
    const productId = item.product_id || item.id || item._id;
    const productName = item.product_name || item.name || "Product";
    
    const loadingToast = toast.loading(`Moving ${productName} to cart...`);
    
    try {
      // 1. ADD TO CART: We force quantity to 1
      // If "Active cart not found" persists, your backend might need a "Create Cart" call first
      await addToCart(token, productId, 1);
      
      // 2. REMOVE FROM WISHLIST: Once added to cart, clean up the wishlist
      await removeToWishlist(token, productId);
      
      // 3. SYNC: Tell SWR to update both caches immediately
      mutate(["/api/cart", token]); 
      mutate(["/api/wishlist", token]);
      
      toast.update(loadingToast, { 
        render: "Successfully moved to cart!", 
        type: "success", 
        isLoading: false, 
        autoClose: 2000 
      });
    } catch (error) {
      console.error("Cart Error Details:", error.response?.data);
      const errorMsg = error.response?.data?.message || "Could not add to cart";
      
      toast.update(loadingToast, { 
        render: errorMsg, 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  const handleRemove = async (productId) => {
    const loadingToast = toast.loading("Removing...");
    try {
      await removeToWishlist(token, productId);
      mutate(["/api/wishlist", token]);
      toast.update(loadingToast, { render: "Removed", type: "success", isLoading: false, autoClose: 2000 });
    } catch (error) {
      toast.update(loadingToast, { render: "Error removing item", type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Wishlist</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems?.map((item) => {
            const prodId = item.product_id || item.id || item._id;
            const prodImage = item.product_thumbnail || item.image || item.thumbnail_url || item.product?.thumbnail_url;
            
            return (
              <div key={prodId} className="bg-white flex flex-col sm:flex-row gap-4 p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={prodImage} 
                  className="w-full sm:w-32 h-32 object-cover rounded-2xl bg-gray-50" 
                  alt={item.product_name || item.name} 
                />
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.product_name || item.name}</h3>
                    </div>
                    <button 
                      onClick={() => handleRemove(prodId)} 
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 sm:mt-0">
                    <p className="text-2xl font-black text-black">₹{item.product_price || item.price}</p>
                    <button 
                      onClick={() => handleMoveToCart(item)}
                      className="bg-black text-white px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 active:scale-95 transition-all shadow-lg shadow-gray-200"
                    >
                      <ShoppingBag size={18} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}