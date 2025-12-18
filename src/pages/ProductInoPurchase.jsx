import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/ui/BreadCrumb.jsx';
import NormalButton from '../components/ui/NormalButton.jsx';
import Icons from '../components/ui/Icon.jsx';  
import QuantityCounter from '../components/ui/NumberQuantityButton.jsx';
import BuyNowButton from '../components/ui/BuyNowButton.jsx';

export default function ProductInfoPurchase() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('XS');
  const [isLiked, setIsLiked] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  // 1. State to track which tab is active
  const [activeTab, setActiveTab] = useState('description');

  // 2. Tab Data
  const tabs = [
    { id: 'description', label: 'Product description' },
    { id: 'shipping', label: 'Shipping & Return' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
      setShowStickyBar(scrollPercentage >= 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-white">
      
      {/* BreadCrumb */}
      <div className='flex justify-center items-center py-8 md:py-12 lg:py-20 text-center px-4'>
        <Breadcrumb
        showTitle={false}
        align="center"
        items={[
            { label: "Home", href: "/" },
            { label: "Gentle Trends", href: "/gentle-trends" },
            {
            label:
                "Men’s Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
            },
        ]}
        />
        </div>


      {/* Main Content */}
      <div className="max-w-7.5xl mx-6 px-6 py-8 mt-4">
        {/* Parent Div with Two Children */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1st Child - Image Carousel */}
          <div className="space-y-4">
            {/* Main Image with Controls */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden group">
              <img 
                src={images[currentImage]} 
                alt="Product" 
                className="w-full h-[800px] object-cover"
              />
              
              {/* Left Arrow */}
                <NormalButton
                content={<Icons icon="heroicons:arrow-left" size={24} />}
                bg="bg-black"
                className="!h-[45px] !w-[45px] md:!h-[55px] md:!w-[55px] !rounded-full !px-0 flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100" 
                noHover={true}
                textColor="black"
                onClick={prevImage}
                />
              
              {/* Right Arrow */}
                <NormalButton
                content={<Icons icon="heroicons:arrow-right" size={24} />}
                bg="bg-black"
                className="!h-[45px] !w-[45px] md:!h-[55px] md:!w-[55px] !rounded-full !px-0 flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2  p-2 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100" 
                noHover={true}
                onClick={nextImage}
                />
              
              {/* Magnify Icon */}
              <NormalButton
                content={<Icons icon="heroicons:magnifying-glass" size={24} />}
                className="!h-[45px] !w-[45px] md:!h-[55px] md:!w-[55px] !rounded-full !px-0 flex items-center justify-center absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition" 
                noHover={false}
                />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4 w-[650px] h-[200px] ">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition ${
                    currentImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 2nd Child - Product Details */}
          <div className="space-y-6">
            {/* Title and Like Icon */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-5xl font-normal text-gray-800 flex-1">
                Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern
              </h1>
              <NormalButton
                className="!h-[45px] !w-[45px] md:!h-[55px] md:!w-[55px] !rounded-full !px-0 flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600" 
                // className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                noHover={true}
                onClick={() => setIsLiked(!isLiked)}
                />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-red-500">Rs. 942.00</span>
              <span className="text-2xl text-gray-400 line-through">Rs. 1,384.00</span>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex text-2xl items-center gap-2 mb-3">
                <span className="font-semibold">Size:</span>
                <span>{selectedSize}</span>
              </div>
              <div className="flex flex-wrap mt-4 gap-3">
                {sizes.map((size) => (
                <NormalButton 
                    key={size}
                    content={size}
                    className={`
                    !min-w-[50px] md:!min-w-[65px] 
                    !h-[45px] md:!h-[55px]
                    ${selectedSize === size ? "text-white" : "text-black"}
                    `}
                    noBorder={true}
                    noHover={true}
                    bg={selectedSize === size ? "bg-black" : "bg-[#f3f4f6]"} 
                    onClick={() => setSelectedSize(size)}
                />
                ))}
              </div>
              <button className="mt-5 text-2xl underline flex items-center gap-1">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Size Chart
              </button>
            </div>

            {/* Quantity */}
            <div>
              <div className="font-semibold text-2xl mb-3">Quantity</div>
              <div className="flex items-center gap-4">
                <QuantityCounter />

                {/* Add to Cart Button */}
                <NormalButton 
                    content="Add to cart"  
                    width="100%" 
                    hoverBg="hover:bg-black" 
                    hoverText="white"
                />
              </div>
            </div>

            {/* Buy Now Button */}
            <BuyNowButton />

            {/* Multiple Payment Method Logo */}
            <div className="flex flex-col items-center justify-center gap-6 py-8 bg-[#F9F9F9] rounded-lg">
            {/* Container for Payment Icons */}
            <div className="flex justify-center items-center">
                <img 
                src="https://gentlehaus.in/cdn/shop/files/payment-footer.svg?v=1750913623" 
                alt="Payment Methods" 
                className="h-10 md:h-12 w-auto" // Adjusted height for better visibility
                />
            </div>

            {/* Guarantee Text */}
            <div className="text-center">
                <p className="text-gray-700 text-lg md:text-xl font-medium tracking-wide">
                Guarantee safe & secure checkout
                </p>
            </div>
            </div>
          </div>
        </div>

      </div>

      {/* Tab  */}
      <div className="w-full mt-12 border-t border-gray-100 p-8">
        {/* Tab Headers - Increased text size and font weight */}
        <div className="flex gap-10 border-b border-gray-200">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-xl md:text-2xl font-semibold transition-all duration-300 relative ${
                activeTab === tab.id 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                {tab.label}
                {/* Animated Underline */}
                {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black animate-in slide-in-from-left duration-300" />
                )}
            </button>
            ))}
        </div>

        {/* Tab Content Area - Enhanced typography for readability */}
        <div className="py-10 min-h-[250px]">
            {activeTab === 'description' && (
            <div className="animate-in fade-in duration-500 space-y-8">
                <p className="text-gray-800 leading-relaxed text-lg md:text-xl font-normal">
                Elevate your everyday style with this men's cotton shirt featuring a modern brushstroke print. 
                Crafted from soft, breathable cotton, this full sleeve shirt combines artistic flair with 
                all-day comfort. The abstract brush pattern in earthy green and beige tones adds a touch of 
                creativity, perfect for casual outings or smart-casual looks.
                </p>
                <p className="text-gray-800 leading-relaxed text-lg md:text-xl font-medium">
                Designed for the modern man who appreciates unique style with a clean finish.
                </p>
                <ul className="space-y-4">
                {[
                    "100% breathable cotton fabric",
                    "Full sleeve design for versatile styling",
                    "Contemporary brushstroke print",
                    "Regular fit for everyday comfort",
                    "Ideal for casual and semi-formal occasions"
                ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4 text-gray-700 text-lg md:text-xl">
                    <span className="w-2 h-2 bg-black rounded-full" />
                    {item}
                    </li>
                ))}
                </ul>
            </div>
            )}

            {activeTab === 'shipping' && (
            <div className="animate-in fade-in duration-500 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                Shipping cost is based on weight. Just add products to your cart and use the Shipping Calculator to see the shipping price.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
                We want you to be 100% satisfied with your purchase. Items can be returned or exchanged within 7 days of delivery.
                </p>
            </div>
            )}
        </div>
        </div>

      {/* Sticky Bar - Shows after 20% scroll */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto h-[120px] px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={images[currentImage]} alt="Product" className="w-20 h-20 object-cover rounded" />
            <div>
              <h3 className="font-semibold text-[24px] ">Men's Full Sleeve Cotton Shirt</h3>
              <p className="text-red-500 font-bold text-[20px] ">Rs. 942.00</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <QuantityCounter />
            <NormalButton content="Add to cart" bg="bg-black" hoverBg="hover:bg-gray-900" textColor="white" className="px-6 py-3 text-lg" />

          </div>
        </div>
      </div>
    </div>
  );
}