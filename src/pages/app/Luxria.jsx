import React, { useState, useEffect } from 'react';
import Dropdown from '../../components/ui/Dropdown.jsx';
import Card3Modi from '../../components/ui/Card3Modi.jsx';
import FourCardButton from '../../components/ui/FourCardButton.jsx';
import useSWR from 'swr';

const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price, low to high", value: "price-asc" },
    { label: "Price, high to low", value: "price-desc" },
];

const Luxria = () => {
    // 1. Fetch data with SWR
    const { data, error, isLoading } = useSWR('/api/product/');
    
    // 2. Initialize with empty array to prevent .map() errors
    const [displayProducts, setDisplayProducts] = useState([]);
    const [activeLayout, setActiveLayout] = useState(4);

    // 3. Sync data safely when API responds
    useEffect(() => {
        if (data) {
            // Check if data is nested (e.g., data.products) or a direct array
            const productsArray = Array.isArray(data) ? data : (data.products || []);
            setDisplayProducts(productsArray);
        }
    }, [data]);

    const handleSort = (sortValue) => {
        const masterList = Array.isArray(data) ? data : (data?.products || []);
        let sorted = [...displayProducts];

        if (sortValue === "price-asc") sorted.sort((a, b) => a.price - b.price);
        else if (sortValue === "price-desc") sorted.sort((a, b) => b.price - a.price);
        else sorted = [...masterList];

        setDisplayProducts(sorted);
    };

    return (
        <div className="min-h-screen bg-white px-4 py-8 md:p-12">
            <div className="max-w-[1400px] mx-auto">
                
                {/* Header Toolbar */}
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

                {/* Error Handling */}
                {error && (
                    <div className="text-center py-20 bg-red-50 text-red-600 uppercase text-[10px] font-bold tracking-widest">
                        Error loading collection. Please try again later.
                    </div>
                )}

                {/* Grid Logic */}
                <div className={`
                    grid gap-x-4 gap-y-10 transition-all duration-500 ease-in-out
                    ${activeLayout === 1 ? 'grid-cols-1' : ''}
                    ${activeLayout === 2 ? 'grid-cols-2' : ''}
                    ${activeLayout === 3 ? 'grid-cols-2 md:grid-cols-3' : ''}
                    ${activeLayout === 4 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}
                    ${activeLayout === 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : ''}
                `}>
                    {isLoading ? (
                        /* Skeleton Loader while data is fetching */
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="bg-gray-100 aspect-[4/5] w-full rounded-sm" />
                                <div className="h-2 bg-gray-100 w-2/3 mx-auto" />
                                <div className="h-2 bg-gray-100 w-1/3 mx-auto" />
                            </div>
                        ))
                    ) : (
                        /* Product Rendering with safety check */
                        Array.isArray(displayProducts) && displayProducts.map((product) => (
                            <div key={product._id || product.id}>
                                {activeLayout === 1 ? (
                                    <div className="group flex flex-col md:flex-row gap-8 items-center bg-gray-50/30 p-6 rounded-sm border border-transparent hover:border-gray-200 transition-all">
                                        <div className="w-full md:w-1/4 overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-4 text-center md:text-left">
                                            <h3 className="text-xl font-bold uppercase tracking-widest">{product.name}</h3>
                                            <p className="text-gray-500 text-xs leading-relaxed max-w-xl">{product.description}</p>
                                            <div className="text-lg font-bold">₹{product.price?.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <Card3Modi product={product} />
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Empty State */}
                {!isLoading && displayProducts.length === 0 && !error && (
                    <div className="text-center py-40">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">The collection is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Luxria;