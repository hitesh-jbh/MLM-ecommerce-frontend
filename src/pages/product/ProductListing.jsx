import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SlidersHorizontal, Loader2, X } from "lucide-react"; // ChevronDown हटा दिया
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ui/Card3Modi.jsx";
import api from "../../utils/api/axiosInstance.js"; 

const ProductListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { categorySlug, subCategorySlug } = useParams();

  // 1. नए States: Sort और Price Strip के लिए
  const [sortOrder, setSortOrder] = useState(""); // "" | "low-to-high" | "high-to-low"
  const [priceMax, setPriceMax] = useState(50000); // डिफ़ॉल्ट 50,000 सेट किया है

  const activeSlug = subCategorySlug || categorySlug;

  const { data: filteredProducts = [], isLoading } = useQuery({
    // 2. Query Key में sortOrder और priceMax डाल दिया ताकि बदलते ही API कॉल हो
    queryKey: ["products", activeSlug, sortOrder, priceMax],
    queryFn: async () => {
      const res = await api.get(`/api/product`, {
        params: { 
          category: activeSlug,
          sort: sortOrder,        // बैकएंड को sort जायेगा (low-to-high / high-to-low)
          maxPrice: priceMax      // बैकएंड को प्राइस की मैक्स लिमिट जाएगी
        } 
      });
      return res.data?.products || res.data || [];
    },
    enabled: !!activeSlug, 
  });

  const displayTitle = activeSlug 
    ? activeSlug.charAt(0).toUpperCase() + activeSlug.slice(1).replace(/-/g, " ") 
    : "All Products";

  // फ़िल्टर क्लियर करने का फंक्शन
  const handleClearAll = () => {
    setSortOrder("");
    setPriceMax(50000);
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-8 pb-12 relative">
      
      {/* ========================================= */}
      {/* FILTER DRAWER (Left Sidebar Overlay)      */}
      {/* ========================================= */}
      
      <div 
        className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsFilterOpen(false)}
      ></div>

      <div 
        className={`fixed top-0 left-0 h-screen w-full max-w-[320px] bg-white shadow-2xl z-[250] transform transition-transform duration-300 ease-in-out flex flex-col ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900">Filters</h2>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-500 hover:text-purple-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          
          {/* 3. SORT BY (Radio Buttons - Drawer के अंदर) */}
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-widest">Sort By</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <label className="flex items-center gap-3 cursor-pointer hover:text-purple-700">
                <input 
                  type="radio" name="sort" 
                  checked={sortOrder === ""} 
                  onChange={() => setSortOrder("")} 
                  className="accent-purple-600 w-4 h-4" 
                /> Recommended
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-purple-700">
                <input 
                  type="radio" name="sort" 
                  checked={sortOrder === "low-to-high"} 
                  onChange={() => setSortOrder("low-to-high")} 
                  className="accent-purple-600 w-4 h-4" 
                /> Price: Low to High
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-purple-700">
                <input 
                  type="radio" name="sort" 
                  checked={sortOrder === "high-to-low"} 
                  onChange={() => setSortOrder("high-to-low")} 
                  className="accent-purple-600 w-4 h-4" 
                /> Price: High to Low
              </label>
            </div>
          </div>

          {/* 4. PRICE RANGE STRIP (Slider - Checkbox हटा दिए) */}
          <div className="border-b border-gray-100 pb-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 uppercase text-sm tracking-widest">Price Range</h3>
              <span className="text-xs text-gray-900 font-bold bg-purple-100 px-2 py-1 rounded">₹{Number(priceMax).toLocaleString()}</span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="50"
              value={priceMax} 
              onChange={(e) => setPriceMax(e.target.value)} 
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" 
            />
            
            <div className="flex justify-between text-xs text-gray-500 mt-3 font-medium">
              <span>₹0</span>
              <span>₹5000+</span>
            </div>
          </div>

        </div>

        <div className="p-5 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button 
            onClick={handleClearAll}
            className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-100 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="flex-1 py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
      {/* ========================================= */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 mb-8">
          <div>
            <div className="text-xs text-gray-500 mb-2 font-medium tracking-wide uppercase">
              <Link to="/" className="hover:text-purple-600">Home</Link> / {displayTitle}
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-gray-900">
              {displayTitle}
              <span className="text-sm text-gray-500 font-sans ml-2">
                ({filteredProducts.length} Designs)
              </span>
            </h1>
          </div>

          <div className="flex items-center mt-5 md:mt-0">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-purple-600 hover:text-purple-600 transition-colors bg-white shadow-sm"
            >
              <SlidersHorizontal size={16} /> Filters & Sort
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-purple-600" size={40} />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-2">No products found for this filter.</h3>
              <p className="text-sm md:text-base text-gray-500">Try adjusting the price range or sorting.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ProductListing;