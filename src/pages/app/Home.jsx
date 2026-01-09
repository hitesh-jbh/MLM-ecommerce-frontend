import React, { useEffect, useState } from "react";
import Nav from "../../components/partials/header/Nav.jsx";
import Hero from "../../components/ui/Hero.jsx";
import ProductCarousel from "../../components/ui/ProductCarousel.jsx";
import ScrollingBanner from "../../components/ui/ScrollingBannerCarousel.jsx";
import StickyComponent from "../../components/ui/StickyComponent.jsx";
import CoastalEdition from "../../components/ui/CoastalEdition .jsx"
import IconButton from "../../components/ui/TwoImgOnHome.jsx"
import HappyCustomersCards from "../../components/ui/HappyCustomersCards.jsx"
import ImageShowcase from "../../components/ui/ImageShowcase.jsx"
import FeaturesSection from "../../components/ui/FeatureCard.jsx";
import { FaShippingFast, FaExchangeAlt, FaTags, FaShieldAlt } from 'react-icons/fa';
import HomeShimmer from "../../components/shimmer/HomeShimmer.jsx";
import { Product } from "../../utils/Constants.jsx";
// import Dropdown from "../ui/Dropdown.jsx";
import { viewAllProducts } from "../../utils/Service/apiService.js";

export const Home = () => {

  const [products, setProducts] = useState(null);
  const [cardsData, setCardsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        // 2. Fetch real products from your backend
        const response = await viewAllProducts();
        
        // As seen in your Postman logs, the array is inside response.data.products
        setProducts(response.data.products || []);

        // 3. Set your feature cards
        setCardsData([
          { id: 1, icon: FaShippingFast, title: "Free Shipping", description: "Enjoy free shipping with\nprepaid orders" },
          { id: 2, icon: FaExchangeAlt, title: "Easy & Free Returns", description: "Returns Made Easy & Free" },
          { id: 3, icon: FaTags, title: "Best Discount", description: "Limited-Time Best Discount" },
          { id: 4, icon: FaShieldAlt, title: "Payment Safety", description: "100% Safe & Secure Shopping" }
        ]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  if (!cardsData || !products) return (<HomeShimmer />)

  return (
    <>
        <Hero />
        <ProductCarousel title="You are in new arrivals" products={ products} />
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
        <FeaturesSection />

        </div>
    </>
  );
};

export default Home;