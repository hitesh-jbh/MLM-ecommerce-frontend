import HappyCustomersCards from "./components/ui/HappyCustomersCards";
import Nav from "./components/ui/Nav.jsx";
import NumberQuantityButton from "./components/ui/NumberQuantityButton.jsx";
import FourCardButton from "./components/ui/FourCardButton.jsx";
import FeatureCard from "./components/ui/FeatureCard.jsx";
import BuyNowButton from "./components/ui/BuyNowButton.jsx";
import Card from "./components/ui/Card.jsx";
import Hero from "./components/ui/Hero.jsx"
import TwoImgOnHome from "./components/ui/TwoImgOnHome.jsx"
import Contact from "./components/pages/Contact.jsx"
import Footer from "./components/ui/Footer.jsx"
import ImageShowcase from "./components/ui/ImageShowcase.jsx"
import CartPage from "./components/pages/CartPage.jsx"
import FilterProductPage from "./components/pages/filterProductPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <LoginPage />
      {/* <CartPage /> */}
      {/* <FilterProductPage/> */}
      {/* <Hero /> */}
      {/* <FourCardButton /> */}
      {/* <TwoImgOnHome /> */}
      {/* <HappyCustomersCards /> */}
      {/* <ImageShowcase /> */}
      {/* <FeatureCard /> */}
      {/* <NumberQuantityButton /> */}
      {/* <BuyNowButton /> */}
      {/* <Contact /> */}
      {/* <Card /> */}
      <Footer />
    </>
  );
}
