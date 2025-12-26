// import React from "react";
// import QuantityCounter from "../ui/NumberQuantityButton";
// import RangeDropdown from "./RangeDropdown";

// const StickyPurchaseBar = ({ 
//   product, 
//   show,                
//   quantity,            
//   onQuantityChange,    
//   selectedSize,      
//   setSelectedSize,   
//   sizeOptions,       
//   onAddToCart,         
//   buttonLabel = "Add to cart" 
// }) => {
  
//   if (!product) return null;

//   // Handles displaying the first image from the DUMMY_PRODUCTS array
//   const stickyImage = product.images && product.images.length > 0 
//     ? product.images[0] 
//     : product.image;

//   const handleAction = () => {
//     if (!selectedSize) {
//       alert("Please select a size");
//       return;
//     }
//     onAddToCart();
//   };

//   return (
//     <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-[100] transition-transform duration-500 border-t border-gray-100 ${show ? 'translate-y-0' : 'translate-y-full'}`}>
//       <div className="max-w-[1440px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
        
//         {/* Product Thumbnail & Title */}
//         <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
//           <div className="h-10 w-10 md:h-14 md:w-14 flex-shrink-0">
//             <img 
//               src={stickyImage} 
//               alt={product.title} 
//               className="w-full h-full object-cover rounded-md border border-gray-100" 
//             />
//           </div>
          
//           <div className="flex flex-col min-w-0">
//             <h3 className="font-bold text-gray-900 text-[10px] sm:text-xs md:text-sm truncate leading-tight">
//               {product.title}
//             </h3>
//             <span className="text-red-600 font-bold text-[12px] whitespace-nowrap">
//               {product.price}
//             </span>
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
//           <div className="hidden lg:block w-52">
//              <RangeDropdown 
//                 options={sizeOptions} 
//                 value={selectedSize} 
//                 onChange={setSelectedSize} 
//              />
//           </div>

//           <div className="hidden sm:block">
//             <QuantityCounter value={quantity} onChange={onQuantityChange} />
//           </div>
          
//           <button 
//             onClick={handleAction}
//             className="bg-black text-white px-4 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-md whitespace-nowrap"
//           >
//             {buttonLabel}
//           </button>
//         </div>
//       </div>
//       <div className="h-[env(safe-area-inset-bottom)] bg-white"></div>
//     </div>
//   );
// };

// export default StickyPurchaseBar;


import React from "react";
import { useState } from "react";
import QuantityCounter from "../ui/NumberQuantityButton";
import RangeDropdown from "./RangeDropdown";

const StickyPurchaseBar = ({ 
  product, 
  show,                
  quantity,            // State from InfoProd
  onQuantityChange,    // setQuantity from InfoProd
  selectedSize,        // State from InfoProd
  setSelectedSize,     // setSelectedSize from InfoProd
  sizeOptions,       
  onAddToCart,         
  buttonLabel = "Add to cart" 
}) => {
  
  if (!product) return null;

  const stickyImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : product.image;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-[100] transition-transform duration-500 border-t border-gray-100 ${show ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-[1440px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
        
        {/* Product Identity */}
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <div className="h-10 w-10 md:h-14 md:w-14 flex-shrink-0">
            <img 
              src={stickyImage} 
              alt={product.title} 
              className="w-full h-full object-cover rounded-md border border-gray-100" 
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-gray-900 text-[10px] sm:text-xs md:text-sm truncate leading-tight">
              {product.title}
            </h3>
            <span className="text-red-600 font-bold text-[12px] whitespace-nowrap">
              {product.price}
            </span>
          </div>
        </div>

        {/* Synced Controls */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          
          {/* Synced Dropdown */}
          <div className="hidden lg:block w-52">
             {/* <RangeDropdown 
              options={sizeOptions} 
              value={selectedSize.size} // Pass the string value to the UI
              onChange={(newSizeString) => {
                // Find the full variant object from the product data
                const fullVariant = product.variants.find(v => v.size === newSizeString);
                setSelectedSize(fullVariant); // Update parent state with the full object
              }} 
            /> */}
          </div>

          {/* Synced Counter */}
          <div className="sm:block">
            <QuantityCounter 
                productId={product.id} 
                selectedSize={selectedSize} // Add this line!
            />
          </div>
          
          <button 
            onClick={onAddToCart}
            className="bg-black text-white px-4 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95 shadow-md whitespace-nowrap"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom)] bg-white"></div>
    </div>
  );
};

export default StickyPurchaseBar;