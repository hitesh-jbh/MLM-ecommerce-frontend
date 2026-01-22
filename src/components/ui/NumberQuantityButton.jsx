// // // import { useState } from 'react';
// // // import { Plus, Minus } from 'lucide-react';

// // // export default function QuantityCounter() {
// // //   const [quantity, setQuantity] = useState(1);

// // //   const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
// // //   const handleIncrease = () => setQuantity(quantity + 1);

// // //   return (
// // //     <div className="flex items-center justify-between px-3 border border-gray-300 rounded-lg bg-white w-full min-w-[110px] sm:max-w-[160px] h-11 md:h-10 shadow-sm">
// // //       <button
// // //         type="button"
// // //         onClick={handleDecrease}
// // //         className="flex items-center justify-center text-gray-400 hover:text-black transition-colors p-1 active:scale-90"
// // //         aria-label="Decrease quantity"
// // //       >
// // //         <Minus className="w-4 h-4 md:w-5 md:h-5" />
// // //       </button>

// // //       <span className="text-base md:text-lg font-semibold text-black tabular-nums">
// // //         {quantity}
// // //       </span>

// // //       <button
// // //         type="button"
// // //         onClick={handleIncrease}
// // //         className="flex items-center justify-center text-gray-400 hover:text-black transition-colors p-1 active:scale-90"
// // //         aria-label="Increase quantity"
// // //       >
// // //         <Plus className="w-4 h-4 md:w-5 md:h-5" />
// // //       </button>
// // //     </div>
// // //   );
// // // }


// // import { useState } from 'react';
// // import { Plus, Minus } from 'lucide-react';
// // import appStore from '../../utils/appStore';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { decrementCount, incrementCount } from '../../utils/Slice/countSlice';

// // export default function QuantityCounter({ productId }) {

// //   const dispatch = useDispatch();

// //   const quantity = useSelector((state) => state.count[productId] || 1);
// //   const handleIncrease = (productId) => {
// //     dispatch(incrementCount(productId));
// //   }
// //   const handleDecrease = (productId) => {
// //     dispatch(decrementCount(productId));
// //   }

// //   return (
// //     <div className="flex items-center justify-between px-3 border border-gray-300 rounded-lg bg-white w-full min-w-[110px] sm:max-w-[160px] h-11 md:h-10 shadow-sm">
// //       <button
// //         type="button"
// //         onClick={handleDecrease}
// //         className="flex items-center justify-center text-gray-400 hover:text-black transition-colors p-1 active:scale-90"
// //         aria-label="Decrease quantity"
// //       >
// //         <Minus className="w-4 h-4 md:w-5 md:h-5" />
// //       </button>

// //       <span className="text-base md:text-lg font-semibold text-black tabular-nums">
// //         {quantity}
// //       </span>

// //       <button
// //         type="button"
// //         onClick={handleIncrease}
// //         className="flex items-center justify-center text-gray-400 hover:text-black transition-colors p-1 active:scale-90"
// //         aria-label="Increase quantity"
// //       >
// //         <Plus className="w-4 h-4 md:w-5 md:h-5" />
// //       </button>
// //     </div>
// //   );
// // }


// import { Plus, Minus } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { incrementCount, decrementCount } from '../../utils/Slice/countSlice';

// export default function QuantityCounter({ productId, selectedSize }) {
//   const dispatch = useDispatch();
//   const key = `${productId}-${selectedSize.size}`;
//   const quantity = useSelector((state) => state.count[key] || 1);

//   return (
//     <div className="flex items-center justify-between px-3 border border-gray-300 rounded-lg bg-white w-full sm:max-w-[160px] h-11">
//       <button 
//         onClick={() => dispatch(decrementCount({ id: productId, size: selectedSize.size }))}
//         className="p-1 active:scale-90"
//       >
//         <Minus className="w-4 h-4" />
//       </button>

//       <span className="font-semibold text-black">{quantity}</span>

//       <button 
//         onClick={() => dispatch(incrementCount({ id: productId, size: selectedSize.size, stock: selectedSize.stock }))}
//         className="p-1 active:scale-90"
//       >
//         <Plus className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }

import { Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, decrementCount } from '../../utils/slice/countSlice';

export default function QuantityCounter({ productId, selectedSize }) {
  const dispatch = useDispatch();

  // 1. Add a safety check. If selectedSize doesn't exist yet, return null or a loader
  if (!selectedSize) return null; 

  // 2. Use optional chaining (?.) just in case
  const key = `${productId}-${selectedSize?.size}`;
  const quantity = useSelector((state) => state.count[key] || 1);

  return (
    <div className="flex items-center justify-between px-3 border border-gray-300 rounded-lg bg-white w-full sm:max-w-[160px] h-13">
      <button 
        onClick={() => dispatch(decrementCount({ id: productId, size: selectedSize?.size }))}
        className="p-1 active:scale-90"
      >
        <Minus className="w-4 h-4" />
      </button>

      <span className="font-semibold text-black">{quantity}</span>

      <button 
        onClick={() => dispatch(incrementCount({ 
          id: productId, 
          size: selectedSize?.size, 
          stock: selectedSize?.stock 
        }))}
        className="p-1 active:scale-90"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}