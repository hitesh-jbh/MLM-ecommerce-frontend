import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantityCounter() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);

  return (
    /* Removed all outer centering divs */
    <div className="flex items-center justify-between px-2 py-1 border border-gray-300 rounded-lg w-[120px] md:w-[250px] bg-white h-[45px] md:h-[55px]">
      <button
        onClick={handleDecrease}
        className="text-gray-400 hover:text-black transition-colors"
      >
        <Minus size={20} />
      </button>

      <span className="text-lg md:text-xl font-medium text-black">
        {quantity}
      </span>

      <button
        onClick={handleIncrease}
        className="text-gray-400 hover:text-black transition-colors"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}