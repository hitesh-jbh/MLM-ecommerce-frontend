import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Products from "./pages/components/products";
import ProductCard from "./components/ui/ProductCard.jsx";
import IconButton from "./components/ui/IconButton";
import Dropdown from "./components/ui/Dropdown.jsx";
import NormalButton from "./components/ui/NormalButton.jsx";

export default function App() {
  return (
    <>
     <div><IconButton /></div>
     <NormalButton />
     <Dropdown />
     <ProductCard />
     
    </>
  );
}
