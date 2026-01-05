import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../utils/Slice/wishlistSlice.js";
import { addItem } from "../../utils/Slice/cartSlice.js";

export default function WishlistPage() {
  const dispatch = useDispatch();
  
  // 1. Pull data from the wishlist slice instead of cart
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // 2. Handler to remove item (toggles it off)
  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
  };

  // 3. Handler to move to cart
  const handleMoveToCart = (item) => {
    dispatch(addItem({
      ...item,
      quantity: 1
    }));
    // Optional: Remove from wishlist after adding to cart
    // dispatch(toggleWishlist(item));
    alert(`${item.name} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6 text-sm">Save items you love here!</p>
          <Link to="/" className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">My Wishlist</h1>
            <p className="text-gray-500 text-sm mt-1">{wishlistItems.length} items saved</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize.size}`}
              className="group relative bg-white flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              {/* Image Section */}
              <Link to={`/product/${item.id}`} className="w-full sm:w-32 h-40 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl bg-gray-50"
                />
              </Link>

              {/* Info Section */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${item.id}`} className="hover:text-blue-600 transition">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.brand}</p>
                      <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => handleRemove(item)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Size: <span className="font-semibold text-black">{item.selectedSize.size}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                  <p className="text-xl font-black text-black">
                    ₹{item.price.toFixed(2)}
                  </p>
                  
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 active:scale-95 transition-all"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}