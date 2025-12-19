import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/ui/BreadCrumb.jsx';
import NormalButton from '../components/ui/NormalButton.jsx';
import Icons from '../components/ui/Icon.jsx';  
import QuantityCounter from '../components/ui/NumberQuantityButton.jsx';
import Modal from '../components/ui/Modal.jsx';
import BuyNowButton from '../components/ui/BuyNowButton.jsx';
import FeatureSection from '../components/ui/FeatureSection.jsx';
import ProductCard from '../components/ui/Card.jsx';
import Footer from '../components/ui/Footer.jsx';
  // Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, EffectFade } from 'swiper/modules';
// Icons (using Lucide as a standard, or swap for your <Icons />)
import { X, ChevronLeft, ChevronRight, Search } from 'lucide-react';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
// import FeatureSection from '../components/ui/FeatureSection.jsx'; 

export default function ProductInfoPurchase() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('XS');
  const [isLiked, setIsLiked] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);


  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (showLightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showLightbox]);


  const images = [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Product description' },
    { id: 'shipping', label: 'Shipping & Return' }
  ];


  // Featured Card Section Data
  const featureData = [
    {
      icon: "ph:package-light", // Iconify names (example)
      head: "Easy & Free Returns",
      desc: "Experience hassle-free shopping, complete with complimentary shipping."
    },
    {
      icon: "ph:shield-check-light",
      head: "Payment Safety",
      desc: "Enjoy complete peace of mind with secure, encrypted payments at every step of your shopping journey."
    },
    {
      icon: "ph:chat-centered-dots-light",
      head: "Customers Services",
      desc: "Shop our activewear with confidence—your satisfaction matters to us."
    }
  ];

  // Product Card Data
  const products = [
    {
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
      title: "Men's Full Sleeve Cotton Shirt with Geometric Deer Printed Embroidery",
      actualPrice: "984.00",
      originalPrice: "1,479.00"
    },
    {
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      title: "Men's Full Sleeve Cotton Shirt with Retro Yellow Geometric Print",
      actualPrice: "949.00",
      originalPrice: "1,391.00"
    },
    {
      img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      title: "Men's Geometric Egypt Print Cotton Shirt in Full Sleeve",
      actualPrice: "978.00",
      originalPrice: "1,469.00"
    },
    {
      img: "https://gentlehaus.in/cdn/shop/files/2_7802ca1e-3cd6-4d24-9f3d-72b7c5c3b2d7.webp?v=1754287277&width=360",
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline",
      actualPrice: "974.00",
      originalPrice: "1,479.00"
    },
    {
      img: "https://gentlehaus.in/cdn/shop/files/2_190955a7-7bac-4709-8ae9-d7762570dac3.webp?v=1753858631&width=360",
      title: "Men's Full Sleeve Cotton Shirt Featuring Minimal Tech Print",
      actualPrice: "987.00",
      originalPrice: "1,436.00"
    },
    {
      img: "https://gentlehaus.in/cdn/shop/files/2_2dba3960-3954-4a33-8921-52bd73113b1b.webp?v=1750849046&width=360",
      title: "Men's Full Sleeve Cotton Shirt with Geometric Deer Printed Embroidery",
      actualPrice: "984.00",
      originalPrice: "1,479.00"
    },
    {
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      title: "Men's Full Sleeve Cotton Shirt with Retro Yellow Geometric Print",
      actualPrice: "949.00",
      originalPrice: "1,391.00"
    }
  ];


  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 20% of the viewport height
      const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
      setShowStickyBar(scrollPercentage >= 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
  //     setShowStickyBar(scrollPercentage >= 20);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 20% of the viewport height
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
    /* FIX 1: Dynamic padding-bottom (pb-24) on the parent wrapper 
       This prevents the sticky bar from overlapping the main images or footer content.
    */
    <div className={`min-h-screen bg-white transition-all duration-500 ${showStickyBar ? 'pb-24 lg:pb-0' : 'pb-0'}`}>
      
      {/* BreadCrumb Section */}
      <div className='flex justify-center items-center py-6 md:py-12 lg:py-16 text-center px-4'>
        <Breadcrumb
          showTitle={false}
          align="center"
          items={[
            { label: "Home", href: "/" },
            { label: "Gentle Trends", href: "/gentle-trends" },
            { label: "Men’s Full Sleeve Cotton Shirt" },
          ]}
        />
      </div>

      {/* Main Product Container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* --- FULL SCREEN LIGHTBOX MODAL --- */}
          {showLightbox && (
            <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-between py-8 md:justify-center animate-in fade-in duration-300">
              
              {/* Top Close Button (Mobile Only) - Helpful for quick exit */}
              <button 
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white md:hidden"
              >
                <X size={28} />
              </button>

              {/* Main Image Container - Adaptive Height */}
              <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center p-4">
                <img 
                  src={images[currentImage]} 
                  alt="Zoomed Product" 
                  className="max-h-full max-w-full object-contain select-none transition-all duration-300"
                />
              </div>

              {/* Bottom Navigation Controls */}
              <div className="flex items-center gap-4 md:gap-8 pb-10 md:pb-0 md:mt-12">
                {/* Previous Button */}
                <button 
                  onClick={prevImage}
                  className="bg-white p-3 md:p-5 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="text-black w-5 h-5 md:w-7 md:h-7" />
                </button>

                {/* Close Button (Middle) */}
                <button 
                  onClick={() => setShowLightbox(false)}
                  className="bg-white p-3 md:p-5 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                  aria-label="Close Lightbox"
                >
                  <X className="text-black w-5 h-5 md:w-7 md:h-7" />
                </button>

                {/* Next Button */}
                <button 
                  onClick={nextImage}
                  className="bg-white p-3 md:p-5 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                  aria-label="Next Image"
                >
                  <ChevronRight className="text-black w-5 h-5 md:w-7 md:h-7" />
                </button>
              </div>

              {/* Image Counter Indicator */}
              <div className="absolute bottom-4 text-white/50 text-xs tracking-widest uppercase font-medium">
                {currentImage + 1} / {images.length}
              </div>
            </div>
          )}
          {/* Column 1: Image Gallery */}
          <div className="space-y-4">
            {/* FIX 2: Responsive Aspect Ratio 
               aspect-[4/5] ensures the image fills mobile screens correctly without infinite height.
            */}
            <div className="relative aspect-[4/5] md:aspect-auto md:h-[500px] lg:h-[650px] bg-gray-50 rounded-xl overflow-hidden group">
              <Swiper
                effect={'fade'}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                onSlideChange={(swiper) => setCurrentImage(swiper.realIndex)}
                className="w-full h-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt="Product" className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Arrows */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity active:scale-95">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity active:scale-95">
              <ChevronRight size={24} />
            </button>

            {/* Magnify Icon (Triggers Lightbox) */}
            <button 
              onClick={() => setShowLightbox(true)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg transition active:scale-90"
            >
              <Search size={22} />
            </button>

              {/* <button 
                onClick={() => setShowLightbox(true)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-md transition-transform active:scale-90"
              >
                <Search size={20} className="text-gray-700" />
              </button> */}
            </div>

            {/* Thumbnail Navigation */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={4}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbsSwiper h-20 md:h-28 w-full"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <div className={`h-full w-full rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentImage === index ? 'border-black' : 'border-transparent opacity-60'}`}>
                    <img src={img} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                Men's Full Sleeve Cotton Shirt with Retro Geometric Block Print
              </h1>
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className={`p-2.5 rounded-full border transition-colors ${isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-200 hover:border-gray-400'}`}
              >
                <Icons icon={isLiked ? "heroicons:heart-solid" : "heroicons:heart"} size={22} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-red-600">Rs. 938.00</span>
              <span className="text-lg text-gray-400 line-through">Rs. 1,361.00</span>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
                <p className="font-bold text-sm uppercase tracking-wider text-gray-900">Size: <span className="font-normal">{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2.5">
                    {sizes.map(size => (
                        <button 
                          key={size} 
                          onClick={() => setSelectedSize(size)} 
                          className={`w-11 h-11 border rounded-md text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
                        >
                          {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-auto"><QuantityCounter /></div>
                <NormalButton content="Add to Cart" hoverBg='bg-black' hoverText='white' width="100%" />
              </div>
              <div className="space-y-3">
                <div className="inline-block bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded border border-green-100 uppercase tracking-tighter">
                    Extra 5% Off on Prepaid Orders
                </div>
                <BuyNowButton />
            </div>

            {/* Shipping & Delivery Info (New) */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm md:text-base text-gray-700">
                <Icons icon="heroicons:truck" size={22} className="text-gray-600" />
                <p><span className="font-bold">Estimated Delivery:</span> 21 Dec - 25 Dec</p>
              </div>
              <div className="flex items-center gap-3 text-sm md:text-base text-gray-700">
                <Icons icon="heroicons:archive-box" size={22} className="text-gray-600" />
                <p><span className="font-bold">Free Shipping:</span> Enjoy free shipping with prepaid orders</p>
              </div>
            </div>

            {/* Secure Checkout Section */}
            <div className="bg-[#f9f9f9] p-6 rounded-xl border border-gray-100 flex flex-col items-center gap-4 mt-4">
              <div className="flex gap-4 flex-wrap justify-center items-center">
                {/* Individual payment logos for cleaner look */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-5 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" alt="GPay" className="h-5 opacity-70" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="ApplePay" className="h-5 opacity-70" />
              </div>
              <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-wide">
                Guarantee safe & secure checkout
              </p>
            </div>
          </div>
        </div>

      </div>
      </div>

      {/* Tab  */}
      <div className="max-w-[1440pxpx] mx-auto px-4 md:px-8 mt-8">
         <div className="flex gap-6 md:gap-10 border-b overflow-x-auto no-scrollbar">
           {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm md:text-xl font-semibold whitespace-nowrap transition-all relative ${
                activeTab === tab.id ? 'text-black' : 'text-gray-400'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-black" />}
            </button>
          ))}
        </div>
        <div className="py-4 md:py-12 text-gray-700 text-base md:text-xl leading-relaxed">
          {activeTab === 'description' ? (
             <div className="space-y-4">
                <p>Elevate your everyday style with this men's cotton shirt featuring a modern brushstroke print.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>100% breathable cotton fabric</li>
                  <li>Regular fit for everyday comfort</li>
                </ul>
             </div>
          ) : (
            <p>Shipping takes 3-5 business days. Returns accepted within 7 days.</p>
          )}
        </div>
      </div>

      {/* Fetured Component */}
      <section className="w-full py-16 md:py-12 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Main Heading - Centered and Spaced */}
        <div className="text-center mb-12 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-normal text-[#1a1a1a]">
            Why Gentlehaus?
          </h1>
        </div>

        {/* Grid: 1 col on mobile, 3 cols on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {featureData.map((item, index) => (
            <FeatureSection 
              key={index}
              iconName={item.icon}
              title={item.head}
              description={item.desc}
            />
          ))}
        </div>
        
      </div>
    </section>


    {/* You Might Also Like */}
    <section className="w-full py-10 md:py-8 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-normal text-[#1a1a1a]">
            You Might Also Like
          </h2>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-5 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {products.map((item, index) => (
            <div key={index} className="snap-center">
              <ProductCard 
                img={item.img}
                title={item.title}
                actualPrice={item.actualPrice}
                originalPrice={item.originalPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Recently Viewed Products */}
    <section className="w-full py-10 md:py-8 bg-white font-sans">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-normal text-[#1a1a1a]">
            Recently Viewed Products
          </h2>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-5 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {products.map((item, index) => (
            <div key={index} className="snap-center">
              <ProductCard 
                img={item.img}
                title={item.title}
                actualPrice={item.actualPrice}
                originalPrice={item.originalPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />

      {/* Sticky Bar - Mobile Optimized */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50 transition-transform duration-500 border-t border-gray-100 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-[1440px] mx-auto px-4 h-20 md:h-18 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 min-w-0 flex-shrink">
            <div className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0">
              <img 
                src={images[currentImage]} 
                alt="Product" 
                className="w-full h-full object-cover rounded-md border border-gray-100" 
              />
            </div>
            
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-gray-900 text-xs md:text-base truncate">
                Men's Cotton Shirt
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold text-sm md:text-lg">Rs. 942.00</span>
                <span className="hidden xs:inline text-gray-400 line-through text-[10px] md:text-xs">Rs. 1,361.00</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
            <div className="hidden sm:block scale-90 md:scale-100">
              <QuantityCounter />
            </div>
            
            <button className="bg-black text-white px-4 md:px-10 py-2.5 md:py-3.5 rounded-xl text-[11px] md:text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all active:scale-95 shadow-md">
              Add to cart
            </button>
          </div>

        </div>
        
        <div className="h-[env(safe-area-inset-bottom)] bg-white"></div>
      </div>
    </div>
  );
}