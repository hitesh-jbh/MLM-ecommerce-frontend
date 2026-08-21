import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { FooterPageData } from './FooterPageData.js';
import { websiteName } from '../../../utils/constants.jsx';

export default function Footer() {
    const date = new Date().getFullYear();

    const routeLink = [
        { id: 1, link: "/", text: "Home" },
        { id: 2, link: "/gentle", text: "Gentle Trends" },
        { id: 3, link: "/luxuria", text: "Luxuria" },
        { id: 4, link: "/contact", text: "Contact Us" },
        { id: 5, link: "/about", text: "About Us" },
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-6 md:pt-16 md:pb-8">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer Grid (4 Balanced Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">

                    {/* 1. Brand Info & Socials (Replaced Newsletter to fill the gap) */}
                    <div className="flex flex-col items-start">
                        <span onClick={() => window.scrollTo(0, 0)} className="cursor-pointer mb-4 block">
                            <h2 className="font-serif font-black text-2xl uppercase tracking-tighter text-gray-900">
                                {websiteName || "Dirora.in"}
                            </h2>
                        </span>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 pr-4 font-sans">
                            Elevating your everyday style with premium, carefully curated collections. Wrapped with love, delivered with care.
                        </p>
                        
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all shadow-sm">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all shadow-sm">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div>
                        <h3 className="font-serif text-base font-bold text-gray-900 mb-5 tracking-wide uppercase">
                            Quick links
                        </h3>
                        <ul className="space-y-3">
                            {routeLink.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.link}
                                        className="text-gray-500 text-sm hover:text-purple-600 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-purple-600 transition-colors"></span>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Information */}
                    <div>
                        <h3 className="font-serif text-base font-bold text-gray-900 mb-5 tracking-wide uppercase">
                            Information
                        </h3>
                        <ul className="space-y-3">
                            {FooterPageData.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={`/info/${item.id}`}
                                        className="text-gray-500 text-sm hover:text-purple-600 transition-colors capitalize flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-purple-600 transition-colors"></span>
                                        {item.id.replace(/-/g, ' ')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Store Contact */}
                    <div>
                        <h3 className="font-serif text-base font-bold text-gray-900 mb-5 tracking-wide uppercase">
                            Get In Touch
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-500 font-sans">
                            <li><strong className="text-gray-700 font-medium">Email:</strong> support@dirora.in</li>
                            <li><strong className="text-gray-700 font-medium">Phone:</strong> +91 12345 67890</li>
                            <li><strong className="text-gray-700 font-medium">Hours:</strong> Mon - Fri, 9AM - 6PM</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">

                    {/* Copyright */}
                    <div className="text-center md:text-left text-xs text-gray-400 font-medium">
                        © {date} {websiteName}. All rights reserved.
                    </div>

                    {/* Payment Icons (Sleek & Clean) */}
                    <div className="flex justify-center md:justify-end items-center gap-2 flex-wrap opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-1 shadow-sm">
                            <img src="https://www.nacha.org/sites/default/files/2024-10/Stripe%20wordmark%20-%20blurple%20%28large%29.png" alt="Stripe" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-1 shadow-sm">
                            <img src="https://cyberinnovate.ie/wp-content/uploads/2024/02/mastercard.webp" alt="MasterCard" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-1 shadow-sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="w-full h-full object-contain" />
                        </div>
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center p-1 shadow-sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="w-full h-full object-contain" />
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}