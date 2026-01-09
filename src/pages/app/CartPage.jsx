import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, updateQuantity } from "../../utils/slice/cartSlice";
import { placeOrder } from "../../utils/Slice/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, size, currentQty, adjustment) => {
    const newQty = currentQty + adjustment;
    dispatch(updateQuantity({ id, size, quantity: newQty }));
  };

  const handleRemove = (id, size) => {
    dispatch(removeItem({ id, size }));
  };

  const handlePlaceOrder = () => {
    const finalOrder = {
      // id: `ORD-${Date.now()}`,
      items: [...cartItems],
      totalAmount: subtotal,
      date: new Date().toLocaleString(),
      status: "Processing"
    }
    dispatch(placeOrder(finalOrder));
    dispatch(clearCart());
    navigate('/order-history'); 
    toast.info(`Order Placed Successfully! Total: ₹${subtotal.toFixed(2)}`);
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
        <Link to="/" className="bg-black text-white px-6 py-2 rounded-md">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-black mb-8">Shopping Cart</h1>

        <div className="space-y-6 mb-10">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 pb-5 border-b border-gray-200"
            >
              <Link to={`/product/${item.id}`} className="w-20 h-24 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md bg-gray-100"
                />
              </Link>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <Link to={`/product/${item.id}`} className="hover:underline">
                    <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <button
                    onClick={() => handleRemove(item.id, item.size)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                <p className="text-sm font-semibold text-black mt-2">
                  {/* ₹ {item.price} */}
                  ₹ {item.price.toFixed(2)}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity, -1)}
                      className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-xs font-medium">{item.quantity}</span>
                    <button
                      disabled={item.quantity >= item.stock}
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity, 1)}
                      className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-400">
                    Total: ₹ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold text-black">Subtotal</p>
            <p className="text-lg font-semibold text-black">₹ {subtotal.toFixed(2)}</p>
          </div>

          <button onClick={handlePlaceOrder} className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-md text-sm font-semibold transition">
            PROCEED TO CHECKOUT
          </button>
          
          <div className="mt-6 flex justify-center gap-3 opacity-60 grayscale">
            {/* Payment Icons */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4" />
            <img src="https://cyberinnovate.ie/wp-content/uploads/2024/02/mastercard.webp" alt="Mastercard" className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}