import React, { useEffect, useState } from "react";
import Nav from "../ui/Nav.jsx";
import Hero from "../ui/Hero.jsx";
import ProductCarousel from "../ui/ProductCarousel.jsx";
import ScrollingBanner from "../ui/ScrollingBannerCarousel.jsx";
import StickyComponent from "../ui/StickyComponent.jsx";
import CoastalEdition from "../ui/CoastalEdition .jsx"
import IconButton from "../ui/TwoImgOnHome.jsx"
import HappyCustomersCards from "../ui/HappyCustomersCards.jsx"
import ImageShowcase from "../ui/ImageShowcase.jsx"
import FeatureCard from "../ui/FeatureCard.jsx";
import { FaShippingFast, FaExchangeAlt, FaTags, FaShieldAlt } from 'react-icons/fa';
import HomeShimmer from "../ui/HomeShimmer.jsx";
// import Dropdown from "../ui/Dropdown.jsx";

export const Home = () => {

  const [products, setProducts] = useState(null);
  const [cardsData, setCardsData] = useState(null);

  //   const products = [
  //   {
  //     id: 1,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
  //     title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
  //     price: 'Rs. 971.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  //   {
  //     id: 2,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
  //     title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
  //     price: 'Rs. 974.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  //   {
  //     id: 3,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
  //     title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
  //     price: 'Rs. 971.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  //   {
  //     id: 4,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
  //     title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
  //     price: 'Rs. 974.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  //   {
  //     id: 5,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
  //     title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
  //     price: 'Rs. 971.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  //   {
  //     id: 6,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
  //     title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
  //     price: 'Rs. 974.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  //   {
  //     id: 7,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
  //     title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
  //     price: 'Rs. 971.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  //   {
  //     id: 8,
  //     image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
  //     title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
  //     price: 'Rs. 974.00',
  //     originalPrice: 'Rs. 1,479.00',
  //     description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
  //     brand: 'Gentlehaus',
  //   },
  // ];

  
  // const cardsData = [
  //   {
  //     id: 1,
  //     icon: FaShippingFast,
  //     title: "Free Shipping",
  //     description: "Enjoy free shipping with\nprepaid orders"
  //   },
  //   {
  //     id: 2,
  //     icon: FaExchangeAlt,
  //     title: "Easy & Free Returns",
  //     description: "Returns Made Easy & Free"
  //   },
  //   {
  //     id: 3,
  //     icon: FaTags,
  //     title: "Best Discount",
  //     description: "Limited-Time Best Discount"
  //   },
  //   {
  //     id: 4,
  //     icon: FaShieldAlt,
  //     title: "Payment Safety",
  //     description: "100% Safe & Secure Shopping"
  //   }
  // ];

  useEffect(() => {
    const timer = setTimeout(() => {
    setProducts ([
      {
        id: 1,
        image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
        title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
      {
        id: 2,
        image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
        title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
        price: 'Rs. 974.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
      {
        id: 3,
        image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
        title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
      {
        id: 4,
        image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
        title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
        price: 'Rs. 974.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
      {
        id: 5,
        image: 'https://gentlehaus.in/cdn/shop/files/1_49300bfe-3fe9-4c44-b2c1-6e984a00b13c.webp?v=1750849046&width=1240',
        title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
      {
        id: 6,
        image: 'https://gentlehaus.in/cdn/shop/files/1_b4bc91c2-58a2-4fc3-90db-65f2c21d058d.webp?v=1750849685&width=620',
        title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
        price: 'Rs. 974.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
      {
        id: 7,
        image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240',
        title: "Men's Full Sleeve Cotton Shirt with 'California' Typography Casual Black Streetwear",
        price: 'Rs. 971.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
      {
        id: 8,
        image: 'https://gentlehaus.in/cdn/shop/files/1_9d456e30-6edb-4efa-935b-735b3fba85ef.webp?v=1753858631&width=1240',
        title: "Men's Full Sleeve Cotton Shirt Featuring Bold Geometric Outline Pattern",
        price: 'Rs. 974.00',
        originalPrice: 'Rs. 1,479.00',
        description: 'Bring elegance and charm to your wardrobe with this men\'s cotton shirt featuring a beautifully...',
        brand: 'Gentlehaus',
      },
    ])

    setCardsData ([
      {
        id: 1,
        icon: FaShippingFast,
        title: "Free Shipping",
        description: "Enjoy free shipping with\nprepaid orders"
      },
      {
        id: 2,
        icon: FaExchangeAlt,
        title: "Easy & Free Returns",
        description: "Returns Made Easy & Free"
      },
      {
        id: 3,
        icon: FaTags,
        title: "Best Discount",
        description: "Limited-Time Best Discount"
      },
      {
        id: 4,
        icon: FaShieldAlt,
        title: "Payment Safety",
        description: "100% Safe & Secure Shopping"
      }
    ]);
  }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!cardsData || !products) return (<HomeShimmer />)

  return (
    <>
        <Hero />
        <ProductCarousel title="You are in new arrivals" products={ products} />
        {/* <Dropdown /> */}
        <ScrollingBanner />
        <CoastalEdition />
        <IconButton />
        <HappyCustomersCards />
        <div className="max-w-8xl mx-auto py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Main Heading */}
          <h2 className="text-3xl px-18 md:text-4xl lg:text-6xl font-light text-[#1a1a1a] mb-6 tracking-tight">
            Follow us Instagram
          </h2>

          {/* Subtext and Link */}
          <div className="space-y-1 mb-10">
            <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
              Tag <span className="font-medium text-black">@gentlehaus.india</span> in your Instagram photos 
              for a chance to be featured here.
            </p>
            <p className="text-gray-600 text-base md:text-lg font-light">
              Find more inspiration on{' '}
              <a 
                href="https://instagram.com/gentlehaus.india" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black underline underline-offset-4 hover:text-gray-500 transition-colors decoration-1"
              >
                our Instagram.
              </a>
            </p>
          </div>
        </div>
        
        <ImageShowcase />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardsData.map((card) => (
              <FeatureCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
    </>
  );
};

export default Home;