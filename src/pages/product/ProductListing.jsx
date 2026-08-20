import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/ui/Card3Modi.jsx";
import api from "../../utils/api/axiosInstance.js"; 

const ProductListing = () => {

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const { categorySlug, subCategorySlug } = useParams();

  const activeSlug = subCategorySlug || categorySlug;

  const { data: filteredProducts = [], isLoading } = useQuery({
    queryKey: ["products", activeSlug],
    queryFn: async () => {
      const res = await api.get(`/api/product`, {
        params: { category: activeSlug } 
      });
      return res.data?.products || res.data || [];
    },
    enabled: !!activeSlug, 
  });

  const displayTitle = activeSlug 
    ? activeSlug.charAt(0).toUpperCase() + activeSlug.slice(1).replace(/-/g, " ") 
    : "All Products";

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-8">
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

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full cursor-pointer hover:border-gray-400 transition-colors bg-white">
              <span className="text-sm font-medium text-gray-700">Sort By: Recommended</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Filter By</h2>
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Price</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <label className="flex items-center gap-3 cursor-pointer hover:text-purple-700">
                    <input type="checkbox" className="accent-purple-600 w-4 h-4" /> Under ₹10,000
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:text-purple-700">
                    <input type="checkbox" className="accent-purple-600 w-4 h-4" /> ₹10,000 - ₹20,000
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:text-purple-700">
                    <input type="checkbox" className="accent-purple-600 w-4 h-4" /> Above ₹20,000
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-purple-600" size={40} />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-serif text-gray-700">No products found in this category.</h3>
                <p className="text-sm text-gray-500 mt-2">Try checking out our other collections!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;