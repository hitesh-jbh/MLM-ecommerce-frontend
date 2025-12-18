import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantityCounter() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="flex flex-col items-center gap-4">
        {/* Counter Box */}
        <div className="flex items-center gap-4 px-2 py-1 border border-gray-300 rounded-lg w-50 bg-white">
          <button
            onClick={handleDecrease}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={24} />
          </button>

          <span className="text-2xl font-semibold text-black min-w-12 text-center">
            {quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="text-gray-600 hover:text-black transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}