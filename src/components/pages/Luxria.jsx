import React, { useState } from 'react';
import Dropdown from '../ui/Dropdown.jsx';
import Card3Modi from '../ui/Card3Modi';
import FourCardButton from '../ui/FourCardButton.jsx';
import { Product } from '../../utils/Constants.jsx';

const INITIAL_PRODUCTS = Product;

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