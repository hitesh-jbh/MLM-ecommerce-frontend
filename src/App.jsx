import HappyCustomersCards from "./components/ui/HappyCustomersCards";
import NavButtons from "./components/ui/NavButtons.jsx";
import NumberQuantityButton from "./components/ui/NumberQuantityButton.jsx";
import FourCardButton from "./components/ui/FourCardButton.jsx";
import BuyNowButton from "./components/ui/BuyNowButton.jsx";
import Card from "./components/ui/Card.jsx";

export default function App() {
  return (
    <div className="font-cursive min-h-screen bg-white font-cursive">
      <NavButtons />
      <HappyCustomersCards />
      <NumberQuantityButton />
      <FourCardButton />
      <BuyNowButton />
      <Card />
    </div>
  );
}
