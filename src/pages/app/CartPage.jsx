import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, Loader2, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { 
  viewCartItem, 
  updateCartQuantity, 
  removeCartIem 
} from "../../utils/service/apiService";
import { toast } from "react-toastify";

export default function Cart() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);

  const { data, isLoading, mutate } = useSWR(
    token ? ["/api/cart/", token] : null,
    ([tkn]) => viewCartItem(tkn).then((res) => res.data)
  );

  const cartItems = useMemo(() => {
    return data?.data?.items || [];
  }, [data]);

  const totalAmount = data?.data?.totalAmount || "0.00";

  const updateQty = async (productId, currentQty, delta, stockAvailable) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    if (delta > 0 && newQty > stockAvailable) {
      toast.warning(`Only ${stockAvailable} items available`);
      return;
    }

    const optimisticItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: newQty, total: (Number(item.price) * newQty).toFixed(2) }
        : item
    );

    const optimisticTotal = optimisticItems
      .reduce((acc, item) => acc + Number(item.total), 0)
      .toFixed(2);

    const optimisticData = {
      ...data,
      data: { ...data.data, items: optimisticItems, totalAmount: optimisticTotal },
    };

    try {
      await mutate(updateCartQuantity(token, productId, newQty), {
        optimisticData: optimisticData,
        rollbackOnError: true,
        revalidate: true,
        populateCache: false,
      });
    } catch (err) {
      console.error("Cart Update Error:", err);
      toast.error("Failed to update quantity");
    }
  };

  const remove = async (productId) => {
    try {
      await removeCartIem(token, productId);
      mutate();
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Cart Remove Error:", err);
      toast.error("Could not remove item");
    }
  };

  const handleCheckout = () => {
    if (!token) return navigate("/login");
    if (cartItems.length === 0) return toast.error("Cart is empty");

    navigate("/checkout", {
      state: {
        checkoutItems: cartItems, 
        totalAmount: totalAmount,
        source: "CART" 
      },
    });
  };

  if (isLoading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={64} className="text-gray-300 mb-6" />
        <h2 className="text-2xl md:text-3xl font-serif font-black text-gray-900">Your cart is empty</h2>
        <Link
          to="/"
          className="mt-8 bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-purple-500/25 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 py-8 md:py-12">
      {/* Premium Typography applied here */}
      <h1 className="text-3xl md:text-4xl font-serif font-black text-gray-900 tracking-tight mb-6 md:mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
        {/* ITEMS LIST */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId || item.productId}
              className="relative bg-white p-4 md:p-6 border border-gray-100 rounded-3xl flex flex-row gap-4 md:gap-6 items-start shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Image - Wrapped in Link */}
              <Link 
                to={`/product/${item.productId}`} 
                className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 block hover:opacity-80 transition-opacity"
              >
                <img
                  src={item.thumbnail || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="truncate">
                    {/* Product Name - Wrapped in Link */}
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 truncate font-serif hover:text-purple-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-base md:text-lg font-black mt-1 text-gray-900">₹ {Number(item.price).toLocaleString('en-IN')}</p>
                  </div>
                  {/* Styled Trash Button */}
                  <button
                    onClick={() => remove(item.productId)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Controls and Stock info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4">
                  <div className="flex items-center w-fit border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => updateQty(item.productId, item.quantity, -1, item.stock)}
                      className="px-3 py-1.5 hover:bg-purple-50 hover:text-purple-600 text-gray-500 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold min-w-[40px] text-center border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.productId, item.quantity, 1, item.stock)}
                      disabled={item.quantity >= item.stock}
                      className={`px-3 py-1.5 text-gray-500 transition-colors ${
                        item.quantity >= item.stock ? 'opacity-20 cursor-not-allowed' : 'hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center sm:block text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest sm:mb-1">
                      STOCK: {item.stock}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: <span className="text-gray-900 font-black text-base">₹ {Number(item.total).toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY SECTION - Light Purple Background */}
        <div className="lg:w-[380px] lg:sticky lg:top-8">
          <div className="bg-[#f8f5ff] rounded-3xl p-6 md:p-8 border border-purple-100 shadow-sm">
            <h2 className="text-2xl font-serif font-black text-gray-900 mb-6">Order Summary</h2>
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-purple-200/60">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-2xl md:text-3xl font-black text-gray-900 font-serif">₹ {Number(totalAmount).toLocaleString('en-IN')}</span>
            </div>

            {/* Gradient Premium Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] hover:from-[#7c3aed] hover:to-[#5b21b6] text-white py-4 md:py-5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-5 font-medium">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}