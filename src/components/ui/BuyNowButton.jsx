import React, { useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BuyNowButton({ product, quantity }) {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handlePlaceOrder = () => {
    if (!token) return navigate("/login");
    setIsPending(true);

    const checkoutData = {
      checkoutItems: [
        {
          productId: product.id || product._id,
          name: product.name,
          price: product.price,
          quantity: quantity || 1,
          thumbnail: product.thumbnail_url || product.images?.[0],
        },
      ],
      totalAmount: Number(product.price) * (quantity || 1),
      source: "DIRECT", // Flag for single product purchase
    };

    navigate("/checkout", { state: checkoutData });
    setIsPending(false);
  };

  return (
    <button
      onClick={handlePlaceOrder}
      disabled={isPending}
      className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-purple-200 transition-all cursor-pointer disabled:opacity-50"
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Buy Now"}{" "}
      <ChevronRight size={18} />
    </button>
  );
}
