import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Products from "./pages/components/products";
import ProductCard from "./components/ui/ProductCard.jsx";
import IconButton from "./components/ui/IconButton";
import Dropdown from "./components/ui/Dropdown.jsx";

export default function App() {
  return (
    <>
    {/* <Dropdown
    classMenuItems="left-0 w-[200px] top-full mt-1 shadow-lg border border-gray-200 rounded-lg"
    label={
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[180px]">
        <span className="font-medium text-gray-700">Best selling</span>
        <svg
          className="w-4 h-4 text-gray-500 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    }
    items={[
      { label: "Featured", link: "#" },
      { label: "Best selling", link: "#" },
      { label: "Alphabetically, A-Z", link: "#" },
      { label: "Alphabetically, Z-A", link: "#" },
      { label: "Price, low to high", link: "#" },
      { label: "Price, high to low", link: "#" },
      { label: "Date, old to new", link: "#" },
      { label: "Date, new to old", link: "#" },
    ]}
    classItem="px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm"
  /> */}
     <div><IconButton /></div>
     <Dropdown />
     <ProductCard />
     
    
          
        
    </>
  );
}
