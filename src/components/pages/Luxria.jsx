import React, { useState } from 'react';
import Dropdown from '../ui/Dropdown.jsx';
import Card3Modi from '../ui/Card3Modi';
import FourCardButton from '../ui/FourCardButton.jsx';

const INITIAL_PRODUCTS = [
    { id: 1, name: 'Shirt Soft Cotton', price: 40.00, brand: 'Uniqlo', category: 'Shirts', rating: 4.5, reviews: 128, image: 'https://gentlehaus.in/cdn/shop/files/1_da90cc63-f19b-4851-bc98-4be80122dbbf.webp?v=1754287277&width=1240', description: 'Experience ultimate comfort with our premium soft cotton shirt, designed for a clean, tailored fit.' },
    { id: 2, name: 'Zip Up Neck Shirt', price: 65.00, brand: 'Nike', category: 'Shirts', rating: 4.2, reviews: 89, image: 'https://gentlehaus.in/cdn/shop/files/1_698850c4-7f88-44ec-9537-66b50ea4e6b3.webp?v=1750850291&width=1240', description: 'A modern silhouette featuring a zip-up neck, perfect for layering or as a standalone statement piece.' },
    { id: 3, name: 'Classic Long Sleeve', price: 55.00, brand: 'Adidas', category: 'Shirts', rating: 4.7, reviews: 203, image: 'https://gentlehaus.in/cdn/shop/files/1_3f224edb-25bd-49f7-a2ee-d366d40979d5.webp?v=1753440203&width=1240', description: 'The essential long sleeve shirt built with durable fabric and a timeless athletic cut.' },
    { id: 4, name: 'Premium Polo Shirt', price: 85.00, brand: 'Puma', category: 'Shirts', rating: 4.3, reviews: 156, image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240', description: 'Elevate your casual wear with this premium polo, featuring a refined collar and breathable knit.' },
    { id: 5, name: 'Sports T-Shirt', price: 35.00, brand: 'Nike', category: 'T-Shirts', rating: 4.0, reviews: 92, image: 'https://gentlehaus.in/cdn/shop/files/1_391cef8b-61ec-466a-ac0a-a2ce8f4cac52.webp?v=1750847760&width=1240', description: 'High-performance fabric that wicks away moisture, keeping you cool during intense training.' },
    { id: 6, name: 'Casual Cotton Tee', price: 28.00, brand: 'Uniqlo', category: 'T-Shirts', rating: 4.8, reviews: 312, image: 'https://gentlehaus.in/cdn/shop/files/1_6cc9bb17-2b88-4f46-94e1-d79d63bf12ed.webp?v=1753858576&width=1240', description: 'A staple casual tee made from 100% organic cotton for a soft hand-feel and lasting durability.' },
    { id: 7, name: 'Running Shorts', price: 45.00, brand: 'Adidas', category: 'Shorts', rating: 4.6, reviews: 167, image: 'https://gentlehaus.in/cdn/shop/files/1_33f5ffba-1bf7-41a3-af4c-59154e549e92.webp?v=1754287482&width=1240', description: 'Lightweight shorts with a flexible waistband, optimized for maximum range of motion.' },
    { id: 8, name: 'Training Pants', price: 95.00, brand: 'New Balance', category: 'Pants', rating: 4.4, reviews: 78, image: 'https://gentlehaus.in/cdn/shop/files/1_454b8e7d-f557-4487-b1ed-3c2653720d81.webp?v=1753440349&width=1240', description: 'Tapered training pants with secure pockets, designed for both workout sessions and travel.' }
];

const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price, low to high", value: "price-asc" },
    { label: "Price, high to low", value: "price-desc" },
];

const Luxria = () => {
    const [displayProducts, setDisplayProducts] = useState(INITIAL_PRODUCTS);
    const [activeLayout, setActiveLayout] = useState(4);

    const handleSort = (sortValue) => {
        let sorted = [...displayProducts];
        if (sortValue === "price-asc") sorted.sort((a, b) => a.price - b.price);
        else if (sortValue === "price-desc") sorted.sort((a, b) => b.price - a.price);
        else sorted = [...INITIAL_PRODUCTS];
        setDisplayProducts(sorted);
    };

    return (
        <div className="min-h-screen bg-white px-4 py-8 md:p-12">
            <div className="max-w-[1400px] mx-auto">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-gray-100 pb-6 gap-6">
                    <div className="w-full md:w-64">
                        <Dropdown options={sortOptions} defaultValue="featured" onChange={handleSort} />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <span className="hidden lg:block text-[10px] uppercase tracking-widest text-gray-400 font-bold">View Layout</span>
                        <FourCardButton 
                            activeLayout={activeLayout} 
                            setActiveLayout={setActiveLayout} 
                        />
                    </div>
                </div>

                {/* Grid Logic: Forces 2 columns on mobile even if layout 3, 4, or 5 is active */}
                <div className={`
                    grid gap-x-4 gap-y-10 transition-all duration-500 ease-in-out
                    ${activeLayout === 1 ? 'grid-cols-1' : ''}
                    ${activeLayout === 2 ? 'grid-cols-2' : ''}
                    ${activeLayout === 3 ? 'grid-cols-2 md:grid-cols-3' : ''}
                    ${activeLayout === 4 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}
                    ${activeLayout === 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : ''}
                `}>
                    {displayProducts.map((product) => (
                        <div key={product.id}>
                            {activeLayout === 1 ? (
                                <div className="group flex flex-col md:flex-row gap-8 items-center bg-gray-50/50 p-6 rounded-sm border border-transparent hover:border-gray-200 transition-all">
                                    <div className="w-full md:w-1/3 overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-2xl font-medium">{product.name}</h3>
                                        <p className="text-gray-500">{product.description}</p>
                                        <span className="text-xl font-bold">₹{product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            ) : (
                                <Card3Modi product={product} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Luxria;