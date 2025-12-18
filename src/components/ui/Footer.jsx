import React, { useState } from 'react';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        console.log('Subscribed with email:', email);
        setEmail('');
    };

    return (
        <footer className="bg-gray-100 px-6 md:px-12 lg:px-20 py-14 md:py-18">
            <div className="max-w-7xl mx-auto">

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-20 mb-16">

                    {/* Newsletter */}
                    <div className="max-w-sm">
                        <h2 className="text-xl md:text-2xl font-semibold text-black mb-3">
                            Let’s get in touch
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                            Subscribe to our newsletter and get 10% off your first order.
                        </p>

                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />

                            <button
                                onClick={handleSubscribe}
                                className="inline-flex bg-black text-white px-6 py-3 text-sm font-medium rounded-md hover:bg-gray-900 transition"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base font-semibold text-black mb-5">
                            Quick links
                        </h3>
                        <ul className="space-y-3">
                            {['Home', 'Gentle Trends', 'Luxuria', 'Contact Us', 'About Us'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-600 text-sm hover:text-black transition"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h3 className="text-base font-semibold text-black mb-5">
                            Information
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Shipping & Cancellation',
                                'Policy',
                                'Refund & Return Policy',
                                'Terms & Conditions',
                                'Privacy Policy',
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-600 text-sm hover:text-black transition"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-base font-semibold text-black mb-5">
                            Our store
                        </h3>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-gray-600 transition">
                                <Facebook size={22} />
                            </a>
                            <a href="#" className="hover:text-gray-600 transition">
                                <Instagram size={22} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-6">
                    <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">

                        {/* Copyright */}
                        <div className="text-center md:text-left text-xs md:text-sm text-gray-500">
                            © 2025 JBH Tech Innovation. All rights reserved.
                        </div>

                        {/* Payment Icons */}
                        <div className="flex justify-center md:justify-end items-center gap-3 flex-wrap">

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
            </div>
        </footer>
    );
}
