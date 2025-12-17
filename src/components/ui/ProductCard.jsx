// import React from "react";

// const ProductCard = ({
//   image,
//   title,
//   link = "#",
//   offerPrice,
//   originalPrice,
//   currency = "Rs.",
//   className = "custom-class",
//   bodyClass = "p-4",
//   noborder = false,
//   children,
// }) => {
//   return (
//     <div
//       className={`
//         h-full flex flex-col rounded-md bg-white dark:bg-slate-800 overflow-hidden
//         ${
//           noborder
//             ? ""
//             : "border border-slate-200 dark:border-slate-700 shadow-sm"
//         }
//         ${className}
//       `}
//     >
//       {/* Image */}
//       {image && (
//         <a href={link} className="block">
//           <img
//             src={image}
//             alt={title}
//             className="w-full h-[320px] object-cover"
//           />
//         </a>
//       )}

//       {/* Content */}
//       <div className={`flex flex-col gap-2 ${bodyClass}`}>
//         {title && (
//           <a href={link} className="no-underline hover:no-underline">
//             <h3 className="text-slate-900 dark:text-slate-100 font-medium text-sm leading-snug">
//               {title}
//             </h3>
//           </a>
//         )}

//         {(offerPrice || originalPrice) && (
//           <div className="flex items-center gap-3 mt-1">
//             {offerPrice && (
//               <span className="text-red-600 font-semibold text-lg">
//                 {currency} {offerPrice.toFixed(2)}
//               </span>
//             )}

//             {originalPrice && originalPrice > offerPrice && (
//               <span className="text-slate-400 text-sm line-through">
//                 {currency} {originalPrice.toFixed(2)}
//               </span>
//             )}
//           </div>
//         )}

//         {/* Extra content (buttons, badges, etc.) */}
//         {children}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";

const ProductCard = ({
  image,
  title,
  link = "#",
  offerPrice,
  originalPrice,
  currency = "Rs.",
  className = "",
  children,
}) => {
  return (
    <div
      className={`
        flex flex-col bg-white dark:bg-slate-800
        w-[70px] h-[10px] rounded-md overflow-hidden
        ${className}
      `}
    >
      {/* Image Container - Fixed height */}
      {image && (
        <a 
          href={link} 
          className="block overflow-hidden flex-shrink-0"
          style={{ height: "calc(100% - 80px)" }} // Adjust based on content height
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover bg-[#f3f3f3]"
          />
        </a>
      )}

      {/* Content Section - Fixed height at bottom */}
      <div 
        className="pt-2 px-1 flex flex-col justify-between flex-grow"
        style={{ minHeight: "80px" }} // Fixed minimum height for content
      >
        {/* Title - Exactly 3 lines like the image */}
        {title && (
          <a href={link} className="no-underline block">
            <h3 className="text-[#333] dark:text-gray-100 font-normal text-[13px] leading-[1.4] h-[55px] overflow-hidden mb-1">
              {title}
            </h3>
          </a>
        )}

        {/* Pricing - Exactly like the image */}
        <div className="flex items-center gap-2 mt-1">
          {offerPrice && (
            <span className="text-[#d32f2f] font-bold text-[15px]">
              {currency} {offerPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          )}

          {originalPrice && originalPrice > offerPrice && (
            <span className="text-gray-400 text-[13px] line-through">
              {currency} {originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default ProductCard;