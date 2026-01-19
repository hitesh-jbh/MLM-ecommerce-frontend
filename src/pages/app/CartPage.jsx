import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, Loader2, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { 
  viewCartItem, 
  updateCartQuantity, 
  removeCartIem, 
  createOrder // Integrated Generic Service
} from "../../utils/service/apiService";
import { toast } from "react-toastify";

export default function Cart() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);

  // Fetch Cart Data
  const { data, isLoading, mutate } = useSWR(
    token ? ["/api/cart/", token] : null,
    ([url, tkn]) => viewCartItem(tkn).then((res) => res.data)
  );

  // Derive cart items from backend response structure
  const cartItems = useMemo(() => {
    return data?.data?.items || [];
  }, [data]);

  const totalAmount = data?.data?.totalAmount || "0.00";

  // --- QUANTITY UPDATE (Optimistic UI) ---
  const updateQty = async (productId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

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
      toast.error("Failed to update quantity");
    }
  };

  // --- REMOVE ITEM ---
  const remove = async (productId) => {
    try {
      await removeCartIem(token, productId);
      mutate();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Could not remove item");
    }
  };

  // --- CREATE ORDER (Checkout Integration) ---
  const handleCheckout = async () => {
    if (!token) {
      toast.error("Please login to proceed");
      return navigate("/login");
    }

    try {
      // 1. Map current UI items to the backend payload
      // const orderPayload = {
      //   items: cartItems.map((item) => ({
      //     productId: item.productId,
      //     quantity: item.quantity,
      //     source: "CART",
      //   })),
      // };
      const orderPayload = {
        source: "CART"
      }

      // 2. Call the backend to create the order
      // const response = await createOrder(token, orderPayload);
      const response = await createOrder(token, orderPayload);

      if (response.data.success) {
        toast.success("Order placed successfully!");

        await mutate({ success: true, data: { items: [], totalAmount: "0.00" } }, false);
        
        // 5. Navigate to order history
        navigate('/cart');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  if (isLoading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={64} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <Link
          to="/"
          className="mt-8 bg-black text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      <div className="flex flex-col gap-10">
        {/* ITEMS LIST AREA */}
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="relative bg-white p-6 border-b border-gray-100 flex gap-6 items-start group"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.thumbnail || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-lg font-semibold mt-2">₹ {item.price}</p>
                  </div>
                  <button
                    onClick={() => remove(item.productId)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.productId, item.quantity, -1)}
                      className="px-3 py-1 hover:bg-gray-50 text-gray-500"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-1 text-sm font-bold min-w-[40px] text-center border-x border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.productId, item.quantity, 1)}
                      className="px-3 py-1 hover:bg-gray-50 text-gray-500"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Total: <span className="text-gray-900 font-medium">₹ {item.total}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY SECTION - CENTERED */}
        <div className="bg-gray-50/50 rounded-2xl p-8 max-w-lg mx-auto w-full border border-gray-100 mt-10">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-medium text-gray-900">Subtotal</span>
            <span className="text-2xl font-bold">₹ {totalAmount}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}