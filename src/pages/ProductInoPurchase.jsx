import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/ui/BreadCrumb.jsx';
import NormalButton from '../components/ui/NormalButton.jsx';
import Icons from '../components/ui/Icon.jsx';  
import QuantityCounter from '../components/ui/NumberQuantityButton.jsx';
import Modal from '../components/ui/Modal.jsx';
import BuyNowButton from '../components/ui/BuyNowButton.jsx';
import FeatureSection from '../components/ui/FeatureSection.jsx';
import Dropdown from '../components/ui/Dropdown.jsx';
import ProductCard from '../components/ui/Card.jsx';
import Footer from '../components/ui/Footer.jsx';
import StickyPurchaseBar from '../components/ui/CardBottomFixed.jsx';
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
import ProductCarousel from '../components/ui/ProductCarousel.jsx';
import Tabs from '../components/ui/Tabs.jsx';

export default function ProductInfoPurchase() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('XS');
  const [isLiked, setIsLiked] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
const handlePrev = () => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.swiper.slideNext();
    }
  };

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

  // In your Parent Component (e.g., Home.jsx)
const fixedCardDetail = [
  {
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', // Fixed name from 'imge'
    title: "Men's Full Sleeve Cotton Shirt",
    price: "Rs. 942.00",
    originalPrice: "Rs. 1,361.00"
  }
];
 
  const [activeTab, setActiveTab] = useState('description');

  const productTabs = [
    {
      id: 'description',
      label: 'Description',
      content: (
        <div className="space-y-4 max-w-3xl">
          <p className="font-medium text-gray-900">Elevate your everyday style with this premium cotton shirt.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-inside list-disc">
            <li>100% Breathable Cotton</li>
            <li>Regular Fit</li>
            <li>Machine Washable</li>
            <li>Pre-shrunk Fabric</li>
          </ul>
        </div>
      )
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: (
        <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
          <p><span className="font-bold">Fast Delivery:</span> 3-5 business days.</p>
          <p className="mt-2"><span className="font-bold">Returns:</span> Easy 7-day return policy.</p>
        </div>
      )
    }
  ];


  const tabs = [
    { id: 'description', label: 'Product description' },
    { id: 'shipping', label: 'Shipping & Return' }
  ];

  // const images = [
  //   { id: 'main', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'},
  //   { id: 1, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'},
  //   { id: 2, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'},
  //   { id: 3, image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80'}
  // ];
  const images = [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80'
  ];

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };


  // Unified size handler - syncs both size buttons and dropdown
  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
  };

  const sizes = ['XS','S', 'M', 'L', 'XL', 'XXL'];

  // Handlers for Lightbox
  const nextImg = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  


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
      id: 1,
      image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 2,
      image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 3,
      image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 4,
      image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 5,
      image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
      title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
      price: 'Rs. 971.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    },
    {
      id: 6,
      image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
      title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
      price: 'Rs. 974.00',
      originalPrice: 'Rs. 1,479.00',
      description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
    }
  ];

  const priceRange = [
    { label: "XS - Rs", value: "XS" },
    { label: "S - Rs", value: "S" },
    { label: "M - Rs", value: "M" },
    { label: "L - Rs", value: "L" },
    { label: "XL - Rs", value: "XL" },
    { label: "XXL - Rs", value: "XXL" },
    { label: "3XL - Rs", value: "3XL" },
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
              <div className="flex items-center gap-4 md:gap-8 pb-10 md:pb-5 md:mt-12">
                {/* Previous Button */}
                <button 
                  onClick={prevImage}
                  className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                  aria-label="Previous Image"
                >
                  <Icons icon="heroicons:arrow-left" className="text-black w-5 h-5 md:w-7 md:h-7" />
                  
                 </button>

                {/* Close Button (Middle) */}
                <button 
                  onClick={() => setShowLightbox(false)}
                  className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                  aria-label="Close Lightbox"
                >
                  <X className="text-black w-5 h-5 md:w-7 md:h-7" />
                </button>

                {/* Next Button */}
                <button 
                  onClick={nextImage}
                  className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
                  aria-label="Next Image"
                >
                  <Icons icon="heroicons:arrow-right" size={24} className="text-black w-5 h-5 md:w-7 md:h-7" />
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
            <div className="relative h-[495px] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[currentImage]}
                alt={`Product ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
              >
                <ChevronRight size={24} />
              </button>

              <button
                onClick={() => setShowLightbox(true)}
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg transition active:scale-90"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                    currentImage === index ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
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
              <span className="text-xl font-bold text-red-600">Rs. 938.00</span>
              <span className="text-md text-gray-400 line-through">Rs. 1,361.00</span>
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
      <Tabs
        tabs={productTabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Fetured Component */}
      <section className="w-full py-16 md:py-12 bg-white font-sans">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Main Heading - Centered and Spaced */}
        <div className="text-center mb-12 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-normal text-[#1a1a1a]">
            Why Gentlehaus?
          </h1>
        </div>

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
    <ProductCarousel title="You Might Also Like" products={products} />

    {/* Recently Viewed Products */}
    <ProductCarousel title="Recently Viewed Products" products={products} />

    {/* Card Fixed button */}
    <StickyPurchaseBar
        show={showStickyBar}
        product={fixedCardDetail[0]}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onAddToCart={() => console.log("Added")}
      />

    <Footer />
    </div>
  );
}
// import React, { useState, useEffect } from 'react';
// import { X, ChevronLeft, ChevronRight, Search } from 'lucide-react';

// // Mock components - replace with your actual imports
// const Breadcrumb = ({ items }) => (
//   <div className="flex gap-2 text-sm">
//     {items.map((item, i) => (
//       <span key={i}>{item}{i < items.length - 1 && ' / '}</span>
//     ))}
//   </div>
// );

// const NormalButton = ({ children, onClick, className }) => (
//   <button onClick={onClick} className={`px-4 py-2 ${className}`}>{children}</button>
// );

// const Icons = ({ icon, className }) => <span className={className}>{icon}</span>;

// const QuantityCounter = ({ quantity, onIncrease, onDecrease }) => (
//   <div className="flex items-center gap-2 border rounded">
//     <button onClick={onDecrease} className="px-3 py-1">-</button>
//     <span>{quantity}</span>
//     <button onClick={onIncrease} className="px-3 py-1">+</button>
//   </div>
// );

// const Modal = ({ children, isOpen }) => isOpen ? <div className="fixed inset-0 z-50">{children}</div> : null;

// const BuyNowButton = ({ children, onClick }) => (
//   <button onClick={onClick} className="bg-black text-white px-6 py-3 rounded">{children}</button>
// );

// const FeatureSection = ({ icon, head, desc }) => (
//   <div className="text-center p-4">
//     <div className="text-2xl mb-2">{icon}</div>
//     <h3 className="font-bold">{head}</h3>
//     <p className="text-sm">{desc}</p>
//   </div>
// );

// const Dropdown = ({ options, value, onChange, label }) => (
//   <div className="mb-4">
//     {label && <label className="block mb-2">{label}</label>}
//     <select value={value} onChange={(e) => onChange(e.target.value)} className="border rounded px-3 py-2 w-full">
//       {options.map(opt => (
//         <option key={opt.value} value={opt.value}>{opt.label}</option>
//       ))}
//     </select>
//   </div>
// );

// const ProductCard = ({ image, title, price, originalPrice }) => (
//   <div className="border rounded p-4">
//     <img src={image} alt={title} className="w-full h-48 object-cover mb-2" />
//     <h3 className="font-bold text-sm mb-1">{title}</h3>
//     <div className="flex gap-2">
//       <span className="font-bold">{price}</span>
//       <span className="line-through text-gray-500">{originalPrice}</span>
//     </div>
//   </div>
// );

// const Footer = () => <div className="bg-gray-100 p-8 text-center">Footer</div>;

// const StickyPurchaseBar = ({ show, product, quantity, onQuantityChange, onAddToCart }) => {
//   if (!show) return null;
//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
//         <div className="flex-1 px-4">
//           <h3 className="font-bold text-sm">{product.title}</h3>
//           <p className="text-sm">{product.price}</p>
//         </div>
//         <QuantityCounter 
//           quantity={quantity} 
//           onIncrease={() => onQuantityChange(quantity + 1)}
//           onDecrease={() => onQuantityChange(Math.max(1, quantity - 1))}
//         />
//         <BuyNowButton onClick={onAddToCart}>Add to Cart</BuyNowButton>
//       </div>
//     </div>
//   );
// };

// const ProductCarousel = ({ products }) => (
//   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//     {products.map(p => <ProductCard key={p.id} {...p} />)}
//   </div>
// );

// const Tabs = ({ tabs, activeTab, onChange }) => (
//   <div>
//     <div className="flex border-b">
//       {tabs.map(tab => (
//         <button
//           key={tab.id}
//           onClick={() => onChange(tab.id)}
//           className={`px-4 py-2 ${activeTab === tab.id ? 'border-b-2 border-black font-bold' : ''}`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   </div>
// );

// export default function ProductInfoPurchase() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('XS');
//   const [isLiked, setIsLiked] = useState(false);
//   const [showStickyBar, setShowStickyBar] = useState(false);
//   const [showLightbox, setShowLightbox] = useState(false);
//   const [activeTab, setActiveTab] = useState('description');

//   // Prevent background scroll when lightbox is open
//   useEffect(() => {
//     if (showLightbox) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [showLightbox]);

//   const fixedCardDetail = [
//     {
//       image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
//       title: "Men's Full Sleeve Cotton Shirt",
//       price: "Rs. 942.00",
//       originalPrice: "Rs. 1,361.00"
//     }
//   ];

//   const productTabs = [
//     {
//       id: 'description',
//       label: 'Description',
//       content: (
//         <div>
//           <p>Elevate your everyday style with this premium cotton shirt.</p>
//           <ul>
//             <li>* 100% Breathable Cotton</li>
//             <li>* Regular Fit</li>
//             <li>* Machine Washable</li>
//             <li>* Pre-shrunk Fabric</li>
//           </ul>
//         </div>
//       )
//     },
//     {
//       id: 'shipping',
//       label: 'Shipping & Returns',
//       content: (
//         <div>
//           <p>Fast Delivery: 3-5 business days.</p>
//           <p>Returns: Easy 7-day return policy.</p>
//         </div>
//       )
//     }
//   ];

//   const tabs = [
//     { id: 'description', label: 'Product description' },
//     { id: 'shipping', label: 'Shipping & Return' }
//   ];

//   const images = [
//     'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
//     'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
//     'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
//     'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80'
//   ];

//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

//   const featureData = [
//     {
//       icon: "📦",
//       head: "Easy & Free Returns",
//       desc: "Experience hassle-free shopping, complete with complimentary shipping."
//     },
//     {
//       icon: "🛡️",
//       head: "Payment Safety",
//       desc: "Enjoy complete peace of mind with secure, encrypted payments at every step of your shopping journey."
//     },
//     {
//       icon: "💬",
//       head: "Customers Services",
//       desc: "Shop our activewear with confidence—your satisfaction matters to us."
//     }
//   ];

//   const products = [
//     {
//       id: 1,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//     },
//     {
//       id: 2,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//     },
//     {
//       id: 3,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//     },
//     {
//       id: 4,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//     },
//     {
//       id: 5,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
//       title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
//       price: 'Rs. 971.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//     },
//     {
//       id: 6,
//       image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
//       title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
//       price: 'Rs. 974.00',
//       originalPrice: 'Rs. 1,479.00',
//       description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
//     }
//   ];

//   const priceRange = [
//     { label: "XS - Rs", value: "XS" },
//     { label: "S - Rs", value: "S" },
//     { label: "M - Rs", value: "M" },
//     { label: "L - Rs", value: "L" },
//     { label: "XL - Rs", value: "XL" },
//     { label: "XXL - Rs", value: "XXL" },
//     { label: "3XL - Rs", value: "3XL" },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPercentage = (window.scrollY / window.innerHeight) * 100;
//       setShowStickyBar(scrollPercentage >= 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const nextImage = () => {
//     setCurrentImage((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Unified quantity handler
//   const handleQuantityChange = (newQuantity) => {
//     setQuantity(Math.max(1, newQuantity));
//   };

//   const increaseQuantity = () => handleQuantityChange(quantity + 1);
//   const decreaseQuantity = () => handleQuantityChange(quantity - 1);

//   // Unified size handler - syncs both size buttons and dropdown
//   const handleSizeChange = (newSize) => {
//     setSelectedSize(newSize);
//   };

//   return (
//     <div className="pb-24">
//       {/* BreadCrumb Section */}
//       <div className="container mx-auto px-4 py-4">
//         <Breadcrumb items={['Home', 'Products', 'Shirt']} />
//       </div>

//       {/* Main Product Container */}
//       <div className="container mx-auto px-4">
//         {/* --- FULL SCREEN LIGHTBOX MODAL --- */}
//         {showLightbox && (
//           <Modal isOpen={showLightbox}>
//             <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
//               <button
//                 onClick={() => setShowLightbox(false)}
//                 className="absolute top-4 right-4 text-white/70 hover:text-white md:hidden"
//               >
//                 <X size={32} />
//               </button>

//               <div className="flex-1 flex items-center justify-center p-4">
//                 <img
//                   src={images[currentImage]}
//                   alt={`Product ${currentImage + 1}`}
//                   className="max-h-full max-w-full object-contain"
//                 />
//               </div>

//               <div className="p-4 flex items-center justify-center gap-4">
//                 <button
//                   onClick={prevImage}
//                   className="bg-white p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>

//                 <button
//                   onClick={() => setShowLightbox(false)}
//                   className="bg-white p-3 md:p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
//                   aria-label="Close Lightbox"
//                 >
//                   <X size={24} />
//                 </button>

//                 <button
//                   onClick={nextImage}
//                   className="bg-white p-3 rounded-full shadow-xl hover:bg-gray-200 transition active:scale-90"
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//               </div>

//               <div className="text-white text-center pb-4">
//                 {currentImage + 1} / {images.length}
//               </div>
//             </div>
//           </Modal>
//         )}

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Column 1: Image Gallery */}
//           <div className="space-y-4">
//             <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
//               <img
//                 src={images[currentImage]}
//                 alt={`Product ${currentImage + 1}`}
//                 className="w-full h-full object-cover"
//               />

//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
//               >
//                 <ChevronLeft size={24} />
//               </button>

//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
//               >
//                 <ChevronRight size={24} />
//               </button>

//               <button
//                 onClick={() => setShowLightbox(true)}
//                 className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg transition active:scale-90"
//               >
//                 <Search size={20} />
//               </button>
//             </div>

//             {/* Thumbnail Navigation */}
//             <div className="grid grid-cols-4 gap-2">
//               {images.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImage(index)}
//                   className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
//                     currentImage === index ? 'border-black' : 'border-gray-200'
//                   }`}
//                 >
//                   <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Column 2: Product Details */}
//           <div className="space-y-6">
//             <div className="flex justify-between items-start">
//               <h1 className="text-3xl font-bold">Men's Full Sleeve Cotton Shirt with Retro Geometric Block Print</h1>
//               <button
//                 onClick={() => setIsLiked(!isLiked)}
//                 className={`p-2.5 rounded-full border transition-colors ${
//                   isLiked ? 'text-red-500 bg-red-50 border-red-100' : 'text-gray-400 border-gray-200 hover:border-gray-400'
//                 }`}
//               >
//                 ❤️
//               </button>
//             </div>

//             <div className="flex items-center gap-3">
//               <span className="text-2xl font-bold">Rs. 938.00</span>
//               <span className="text-xl text-gray-500 line-through">Rs. 1,361.00</span>
//             </div>

//             {/* Size Selector */}
//             <div>
//               <div className="mb-2 text-sm font-medium">Size: {selectedSize}</div>
//               <div className="flex gap-2 flex-wrap">
//                 {sizes.map(size => (
//                   <button
//                     key={size}
//                     onClick={() => handleSizeChange(size)}
//                     className={`w-11 h-11 border rounded-md text-sm font-medium transition-all ${
//                       selectedSize === size
//                         ? 'bg-black text-white border-black'
//                         : 'bg-white text-black border-gray-200 hover:border-black'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Dropdown - synced with size buttons */}
//             <Dropdown
//               options={priceRange}
//               value={selectedSize}
//               onChange={handleSizeChange}
//               label="Select Size:"
//             />

//             {/* Actions */}
//             <div className="space-y-3">
//               <div className="flex gap-3">
//                 <QuantityCounter
//                   quantity={quantity}
//                   onIncrease={increaseQuantity}
//                   onDecrease={decreaseQuantity}
//                 />
//                 <BuyNowButton onClick={() => console.log('Buy Now')}>Buy Now</BuyNowButton>
//               </div>
//               <div className="bg-green-50 text-green-700 p-3 rounded text-sm text-center">
//                 Extra 5% Off on Prepaid Orders
//               </div>
//             </div>

//             {/* Shipping & Delivery Info */}
//             <div className="border-t pt-4 space-y-2 text-sm">
//               <div>Estimated Delivery: 21 Dec - 25 Dec</div>
//               <div>Free Shipping: Enjoy free shipping with prepaid orders</div>
//             </div>

//             {/* Secure Checkout Section */}
//             <div className="border-t pt-4">
//               <div className="flex gap-2 mb-2">
//                 <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
//                 <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
//                 <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
//               </div>
//               <div className="text-sm text-gray-600">Guarantee safe & secure checkout</div>
//             </div>
//           </div>
//         </div>

//         {/* Tab */}
//         <div className="mt-12">
//           <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
//           <div className="mt-4">
//             {productTabs.find(t => t.id === activeTab)?.content}
//           </div>
//         </div>

//         {/* Featured Component */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-center mb-8">Why Gentlehaus?</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {featureData.map((item, index) => (
//               <FeatureSection key={index} {...item} />
//             ))}
//           </div>
//         </div>

//         {/* You Might Also Like */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
//           <ProductCarousel products={products} />
//         </div>

//         {/* Recently Viewed Products */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
//           <ProductCarousel products={products.slice(0, 4)} />
//         </div>
//       </div>

//       {/* Card Fixed button */}
//       <StickyPurchaseBar
//         show={showStickyBar}
//         product={fixedCardDetail[0]}
//         quantity={quantity}
//         onQuantityChange={handleQuantityChange}
//         onAddToCart={() => console.log("Added")}
//       />

//       <Footer />
//     </div>
//   );
// }