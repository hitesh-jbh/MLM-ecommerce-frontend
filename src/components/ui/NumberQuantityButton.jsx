import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantityCounter() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleIncrease = () => setQuantity(quantity + 1);

  return (
    /* Change Log:
       1. w-full: Takes full width of the container on mobile (useful if stacked).
       2. sm:max-w-[140px]: Constrains the width on larger screens so it doesn't look stretched.
       3. min-w-[110px]: Ensures the buttons don't overlap the number on tiny screens.
       4. h-11 md:h-12: Standardizes heights for touch targets.
    */
    <div className="flex items-center justify-between px-3 border border-gray-300 rounded-lg bg-white w-full min-w-[110px] sm:max-w-[160px] h-11 md:h-10 shadow-sm">
      <button
        type="button"
        onClick={handleDecrease}
        className="flex items-center justify-center text-gray-400 hover:text-black transition-colors p-1 active:scale-90"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <span className="text-base md:text-lg font-semibold text-black tabular-nums">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        className="flex items-center justify-center text-gray-400 hover:text-black transition-colors p-1 active:scale-90"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
}