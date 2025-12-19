import React from "react";
import AboutUs from "./pages/AboutUs.jsx";
import StickyComponent from "./components/ui/StickyComponent.jsx";
import Modal from "./components/ui/Modal.jsx";
import ProductInfoPurchase from "./pages/ProductInoPurchase.jsx";
import ScrollingBanner from "./components/ui/ScrollingBannerCarousel.jsx";
import FeatureSection from "./components/ui/FeatureSection.jsx";

export default function App() {
  return (
    <>
     <AboutUs />
     <StickyComponent />
     <Modal />  
     <FeatureSection />
     <ProductInfoPurchase />
     <ScrollingBanner />
     <FeatureSection />
     
    </>
  );
}
