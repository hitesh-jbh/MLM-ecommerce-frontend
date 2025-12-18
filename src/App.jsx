import React from "react";
import AboutUs from "./pages/AboutUs.jsx";
import StickyComponent from "./components/ui/StickyComponent.jsx";
import Modal from "./components/ui/Modal.jsx";
import ProductInfoPurchase from "./pages/ProductInoPurchase.jsx";

export default function App() {
  return (
    <>
     <AboutUs />
     <StickyComponent />
     <Modal />  
     <ProductInfoPurchase />
     
    </>
  );
}
