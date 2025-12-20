import { useState, useRef, useEffect } from "react";

const Dropdown = ({ options, defaultValue, onChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.value === defaultValue) || options[0]
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button: Scaled down text and weight */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-1.5 px-2 py-1.5
          bg-transparent text-gray-800 border-none outline-none
          /* Decreased size: 14px on mobile, 16px on desktop */
          text-sm md:text-base font-normal 
          hover:text-black transition-colors cursor-pointer
        "
      >
        <span className="whitespace-nowrap tracking-tight">{selectedOption.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute top-full right-0 sm:left-0 mt-1
            /* Tighter, more elegant width */
            w-[180px] sm:w-[220px] 
            bg-white border border-gray-200 shadow-xl rounded-lg z-50 py-1.5
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`
                w-full text-left px-4 py-2.5
                /* Refined font scaling: maxes out at 15px */
                text-[13px] md:text-[15px]
                hover:bg-gray-50 transition-colors
                ${selectedOption.value === option.value 
                  ? "bg-gray-50 font-semibold text-black" 
                  : "text-gray-600 font-normal hover:text-black"}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

// const Demo = () => {
//   const [products, setProducts] = useState([
//     { id: 1, name: "Zebra Print Tee", price: 29.99, date: new Date("2024-01-15") },
//     { id: 2, name: "Apple Sweatshirt", price: 49.99, date: new Date("2024-02-20") },
//     { id: 3, name: "Classic Hoodie", price: 39.99, date: new Date("2024-01-10") },
//     { id: 4, name: "Beige Jacket", price: 79.99, date: new Date("2024-03-05") },
//     { id: 5, name: "Denim Shirt", price: 34.99, date: new Date("2024-02-01") },
//   ]);

//   const sortOptions = [
//     { label: "Featured", value: "featured" },
//     { label: "Best selling", value: "best-selling" },
//     { label: "Price, low to high", value: "price-asc" },
//     { label: "Price, high to low", value: "price-desc" },
//     { label: "Date, new to old", value: "date-desc" },
//   ];

//   const handleSort = (sortValue) => {
//     const sorted = [...products];
//     switch (sortValue) {
//       case "price-asc": sorted.sort((a, b) => a.price - b.price); break;
//       case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
//       case "date-desc": sorted.sort((a, b) => b.date - a.date); break;
//       default: break;
//     }
//     setProducts(sorted);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-2 sm:px-4 py-6 md:p-10">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-10 border-b border-gray-200 pb-4 gap-4">
//           <h2 className="text-xl md:text-3xl font-bold">Our Collection</h2>
//           <Dropdown
//             options={sortOptions}
//             defaultValue="best-selling"
//             onChange={handleSort}
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 hover:shadow-xl transition-all duration-300 group"
//             >
//               <div className="aspect-[4/5] bg-gray-100 rounded-lg mb-4 overflow-hidden">
//                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500" />
//               </div>
//               <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
//               <p className="text-lg md:text-xl text-[#ff3f6c] font-bold mb-2">${product.price.toFixed(2)}</p>
//               <p className="text-xs md:text-sm text-gray-500">Added: {product.date.toLocaleDateString()}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };