import React from "react";
import AboutUs from "./pages/AboutUs.jsx";
import StickyComponent from "./components/ui/StickyComponent.jsx";
import Modal from "./components/ui/Modal.jsx";
import ProductInfoPurchase from "./pages/ProductInoPurchase.jsx";
import ScrollingBanner from "./components/ui/ScrollingBannerCarousel.jsx";
import FeatureSection from "./components/ui/FeatureSection.jsx";
import Contact from "./components/pages/contact.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import UserProfile from "./components/ui/UserProfile.jsx";

export default function App() {
  const userData = {
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  fullName: "udit kumar",
  role: "Admin",
  location: "Leeds, United Kingdom",
  personalInfo: {
    firstName: "Natashia",
    lastName: "Khaleira",
    dob: "12-10-1990",
    email: "info@binary-fusion.com",
    phone: "(+62) 821 2554-5846",
    role: "student",
    Location: "london"
  },
};

  return (
    <>
     {/* <AboutUs /> */}
     {/* <StickyComponent /> */}
     {/* <Modal />   */}
     {/* <FeatureSection /> */}
     {/* <ProductInfoPurchase /> */}
     {/* <ScrollingBanner /> */}
     {/* <FeatureSection /> */}
     {/* <Contact /> */}
     {/* <LoginPage /> */}
     <UserProfile user={userData} />
     
    </>
  );
}
