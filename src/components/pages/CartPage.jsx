import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function Cart() {
    const [items, setItems] = useState([
        {
            id: 1,
            image:
                "https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240",
            title:
                "Men's Full Sleeve Cotton Shirt with Retro Geometric Block Print",
            size: "XS",
            price: 938.0,
            quantity: 1,
        },
        {
            id: 2,
            image:
                "https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620",
            title:
                "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
            size: "XS",
            price: 942.0,
            quantity: 1,
        },
    ]);

    const handleQuantityChange = (id, qty) => {
        if (qty > 0) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity: qty } : item
                )
            );
        }
    };

    const handleRemove = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-black">Shopping Cart</h1>
                </div>

                {/* Cart Items */}
                <div className="space-y-6 mb-10">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 pb-5 border-b border-gray-200"
                        >
                            {/* Image */}
                            <div className="w-20 h-24 flex-shrink-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover rounded-md bg-gray-100"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 mb-1">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-gray-500 mb-2">
                                    Size: {item.size}
                                </p>

                                <p className="text-sm font-semibold text-black mb-3">
                                    ₹ {item.price.toFixed(2)}
                                </p>

                                <div className="flex items-center justify-between">
                                    {/* Quantity */}
                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="px-2 py-1 hover:bg-gray-100"
                                        >
                                            <Minus size={14} />
                                        </button>

                                        <span className="px-3 text-xs font-medium">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="px-2 py-1 hover:bg-gray-100"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="text-xs text-gray-500 hover:text-black transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coupon */}
                <div className="bg-gray-100 px-4 py-3 rounded-md mb-8 text-center">
                    <p className="text-sm font-medium text-gray-700">
                        🎟️ Apply Coupon
                    </p>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-5 mb-6">
                    <p className="text-lg font-semibold text-black">Subtotal</p>
                    <p className="text-lg font-semibold text-black">
                        ₹ {subtotal.toFixed(2)}
                    </p>
                </div>

                {/* Buy Button */}
                <button className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-md text-sm font-semibold transition mb-2">
                    BUY NOW
                </button>

                <p className="text-xs text-gray-500 text-center mb-8">
                    Powered by Shiprocket
                </p>

                {/* Payment Methods */}
                <div className="flex justify-center md:justify-center items-center gap-3 flex-wrap">

                    {/* Stripe */}
                    <div className="w-14 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                        <img
                            src="https://www.nacha.org/sites/default/files/2024-10/Stripe%20wordmark%20-%20blurple%20%28large%29.png"
                            alt="Stripe"
                            className="w-10 h-6 object-contain"
                        />
                    </div>

                    {/* MasterCard */}
                    <div className="w-14 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                        <img
                            src="https://cyberinnovate.ie/wp-content/uploads/2024/02/mastercard.webp"
                            alt="MasterCard"
                            className="w-10 h-6 object-contain"
                        />
                    </div>

                    {/* Visa */}
                    <div className="w-14 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                            alt="Visa"
                            className="w-10 h-6 object-contain"
                        />
                    </div>

                    {/* Google Pay */}
                    <div className="w-14 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                            alt="Google Pay"
                            className="w-10 h-6 object-contain"
                        />
                    </div>

                    {/* Apple Pay */}
                    <div className="w-14 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
                            alt="Apple Pay"
                            className="w-10 h-6 object-contain"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
