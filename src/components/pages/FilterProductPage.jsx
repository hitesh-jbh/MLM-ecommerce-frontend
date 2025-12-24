import React, { useState, useEffect } from 'react';
import { ChevronDown, Heart, Menu, X, Grid3X3, List, Search, Filter, Star, ShoppingBag, Check } from 'lucide-react';
import Card3Modi from '../ui/Card3Modi';
import CardShimmer from '../ui/CardShimmer';

export default function FilterProductPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [sortBy, setSortBy] = useState('popular');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [brandSearch, setBrandSearch] = useState('');
    const [activeLayout, setActiveLayout] = useState(2);
    const [collapsedSections, setCollapsedSections] = useState({
        brand: false,
        price: false,
        size: false
    });
    const [isLoading, setIsLoading] = useState(true);

    const layouts = [
        { id: 1, columns: 1, icon: '=' },
        { id: 2, columns: 2, icon: '||' }
    ]

    const products = [
        { id: 1, name: 'Shirt Soft Cotton', price: 40.00, brand: 'Uniqlo', category: 'Shirts', rating: 4.5, reviews: 128, image: 'https://gentlehaus.in/cdn/shop/files/1_da90cc63-f19b-4851-bc98-4be80122dbbf.webp?v=1754287277&width=1240', stock: 12 },
        { id: 2, name: 'Zip Up Neck Shirt', price: 65.00, brand: 'Nike', category: 'Shirts', rating: 4.2, reviews: 89, image: 'https://gentlehaus.in/cdn/shop/files/1_698850c4-7f88-44ec-9537-66b50ea4e6b3.webp?v=1750850291&width=1240', stock: 8 },
        { id: 3, name: 'Classic Long Sleeve', price: 55.00, brand: 'Adidas', category: 'Shirts', rating: 4.7, reviews: 203, image: 'https://gentlehaus.in/cdn/shop/files/1_3f224edb-25bd-49f7-a2ee-d366d40979d5.webp?v=1753440203&width=1240', stock: 25 },
        { id: 4, name: 'Premium Polo Shirt', price: 85.00, brand: 'Puma', category: 'Shirts', rating: 4.3, reviews: 156, image: 'https://gentlehaus.in/cdn/shop/files/1_8863e69b-c686-4b9e-8238-7aa55faf92cb.webp?v=1750849550&width=1240', stock: 5 },
        { id: 5, name: 'Sports T-Shirt', price: 35.00, brand: 'Nike', category: 'T-Shirts', rating: 4.0, reviews: 92, image: 'https://gentlehaus.in/cdn/shop/files/1_391cef8b-61ec-466a-ac0a-a2ce8f4cac52.webp?v=1750847760&width=1240', stock: 18 },
        { id: 6, name: 'Casual Cotton Tee', price: 28.00, brand: 'Uniqlo', category: 'T-Shirts', rating: 4.8, reviews: 312, image: 'https://gentlehaus.in/cdn/shop/files/1_6cc9bb17-2b88-4f46-94e1-d79d63bf12ed.webp?v=1753858576&width=1240', stock: 32 },
        { id: 7, name: 'Running Shorts', price: 45.00, brand: 'Adidas', category: 'Shorts', rating: 4.6, reviews: 167, image: 'https://gentlehaus.in/cdn/shop/files/1_33f5ffba-1bf7-41a3-af4c-59154e549e92.webp?v=1754287482&width=1240', stock: 15 },
        { id: 8, name: 'Training Pants', price: 95.00, brand: 'New Balance', category: 'Pants', rating: 4.4, reviews: 78, image: 'https://gentlehaus.in/cdn/shop/files/1_454b8e7d-f557-4487-b1ed-3c2653720d81.webp?v=1753440349&width=1240', stock: 7 },
    ];

    const brands = [
        { name: 'Nike', count: 123, logo: 'ℕ' },
        { name: 'Adidas', count: 55, logo: '𝔄' },
        { name: 'Puma', count: 325, logo: '𝕻' },
        { name: 'Uniqlo', count: 61, logo: 'ⓤ' },
        { name: 'New Balance', count: 99, logo: '𝔵' },
        { name: 'Apple', count: 65, logo: '𝕴' },
    ];

    const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const categories = ['Shirts', 'T-Shirts', 'Pants', 'Shorts', 'Sweatshirts', 'Jackets'];

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(favId => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const toggleBrand = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const toggleSize = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter(s => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const toggleSection = (section) => {
        setCollapsedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedSizes([]);
        setPriceRange([0, 1000]);
        setSearchQuery('');
    };

    const applyPriceFilter = (min, max) => {
        setPriceRange([parseInt(min), parseInt(max)]);
    };

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            let filtered = [...products];
            
            // Brand filter
            if (selectedBrands.length > 0) {
                filtered = filtered.filter(product => selectedBrands.includes(product.brand));
            }

            // Size filter (simulated)
            if (selectedSizes.length > 0) {
                filtered = filtered.filter(product =>
                    product.id % selectedSizes.length === 0 || selectedSizes.includes('M')
                );
            }

            // Price filter
            filtered = filtered.filter(product =>
                product.price >= priceRange[0] && product.price <= priceRange[1]
            );

            // Search filter
            if (searchQuery) {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Sort filter
            switch (sortBy) {
                case 'newest':
                    filtered.sort((a, b) => b.id - a.id);
                    break;
                case 'price-low':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    filtered.sort((a, b) => b.reviews - a.reviews);
            }

            setFilteredProducts(filtered);

            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
        // let filtered = [...products];

        // // Brand filter
        // if (selectedBrands.length > 0) {
        //     filtered = filtered.filter(product => selectedBrands.includes(product.brand));
        // }

        // // Size filter (simulated)
        // if (selectedSizes.length > 0) {
        //     filtered = filtered.filter(product =>
        //         product.id % selectedSizes.length === 0 || selectedSizes.includes('M')
        //     );
        // }

        // // Price filter
        // filtered = filtered.filter(product =>
        //     product.price >= priceRange[0] && product.price <= priceRange[1]
        // );

        // // Search filter
        // if (searchQuery) {
        //     filtered = filtered.filter(product =>
        //         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        //         product.category.toLowerCase().includes(searchQuery.toLowerCase())
        //     );
        // }

        // // Sort filter
        // switch (sortBy) {
        //     case 'newest':
        //         filtered.sort((a, b) => b.id - a.id);
        //         break;
        //     case 'price-low':
        //         filtered.sort((a, b) => a.price - b.price);
        //         break;
        //     case 'price-high':
        //         filtered.sort((a, b) => b.price - a.price);
        //         break;
        //     case 'rating':
        //         filtered.sort((a, b) => b.rating - a.rating);
        //         break;
        //     default:
        //         filtered.sort((a, b) => b.reviews - a.reviews);
        // }

        // setFilteredProducts(filtered);
    }, [selectedBrands, selectedSizes, priceRange, searchQuery, sortBy]);

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="px-4 md:px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all active:scale-95"
                            >
                                {sidebarOpen ? <X size={24} /> : <Filter size={24} />}
                            </button>
                            <nav className="text-sm text-gray-600 hidden md:flex items-center">
                                <span className="text-amber-600 font-medium hover:text-amber-900 cursor-pointer transition">Home</span>
                                <span className="mx-2">›</span>
                                <span className="text-gray-900 font-medium">Clothes</span>
                            </nav>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:text-amber-600 focus:border-transparent w-64"
                                />
                            </div>

                            {/* Layout Buttons */}
                            <div className="flex items-center justify-end gap-3 flex-wrap">
                                {layouts.map((layout) => (
                                    <div key={layout.id} className="relative group">
                                        <button
                                            onClick={() => setActiveLayout(layout.columns)}
                                            className={`
                  w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium
                  transition-all duration-300 ease-out
                  ${activeLayout === layout.columns
                                                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 hover:shadow-md'
                                                }
                `}
                                        >
                                            {layout.icon}
                                        </button>
                                        {/* Tooltip */}
                                        <div className="
                pointer-events-none
                absolute -top-12 left-1/2 -translate-x-1/2
                bg-gray-900 text-white text-sm px-3 py-1 rounded-md
                opacity-0 scale-95
                transition-all duration-200
                group-hover:opacity-100 group-hover:scale-100
                whitespace-nowrap
              ">
                                            {layout.columns} columns
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {filteredProducts.length} results for clothes
                            </h1>
                            {(selectedBrands.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-amber-600 hover:text-yellow-900 font-medium flex items-center gap-1"
                                >
                                    <X size={16} />
                                    Clear filters
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:text-amber-600 focus:border-transparent"
                                >
                                    <option value="popular">Popular</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex relative">
                {/* Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-[150] md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
          fixed md:sticky md:top-32 md:h-[calc(100vh-8rem)] inset-y-0 left-0 z-[200] md:z-[90] w-full md:w-80 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block
          h-screen md:h-[calc(100vh-8rem)] overflow-y-auto
        `}>
                    <div className="p-6">
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <Filter className="text-amber-600" size={24} />
                                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                                >
                                    Clear all
                                </button>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Search Brands */}
                        <div className="mb-8">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search brands..."
                                    value={brandSearch}
                                    onChange={(e) => setBrandSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:text-amber-600 focus:border-transparent"
                                />
                            </div>

                            {/* Brand Filter */}
                            <div className="mb-8">
                                <button
                                    onClick={() => toggleSection('brand')}
                                    className="flex items-center justify-between w-full mb-4 group"
                                >
                                    <h3 className="text-gray-900 font-semibold text-lg">Brand</h3>
                                    <ChevronDown
                                        size={20}
                                        className={`transform transition-transform ${collapsedSections.brand ? 'rotate-180' : ''} text-gray-400 group-hover:text-gray-600`}
                                    />
                                </button>

                                {!collapsedSections.brand && (
                                    <div className="space-y-3 animate-fadeIn">
                                        {filteredBrands.map((brand) => (
                                            <label
                                                key={brand.name}
                                                className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand.name)}
                                                    onChange={() => toggleBrand(brand.name)}
                                                    className="sr-only"
                                                />
                                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${selectedBrands.includes(brand.name)
                                                    ? 'border-b bg-amber-600 text-white'
                                                    : 'border-gray-300'
                                                    }`}>
                                                    {selectedBrands.includes(brand.name) && <Check size={14} />}
                                                </div>
                                                <div className="flex-1 flex items-center gap-3">
                                                    <span className="text-lg">{brand.logo}</span>
                                                    <span className="text-gray-700">{brand.name}</span>
                                                </div>
                                                <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                                                    {brand.count}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <button
                                    onClick={() => toggleSection('price')}
                                    className="flex items-center justify-between w-full mb-4 group"
                                >
                                    <h3 className="text-gray-900 font-semibold text-lg">Price Range</h3>
                                    <ChevronDown
                                        size={20}
                                        className={`transform transition-transform ${collapsedSections.price ? 'rotate-180' : ''} text-gray-400 group-hover:text-gray-600`}
                                    />
                                </button>

                                {!collapsedSections.price && (
                                    <div className="space-y-6 animate-fadeIn">
                                        <div className="pt-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                step="10"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                                className="w-full h-2 bg-gradient-to-r from-amber-600 to-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-900 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                step="10"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                                className="w-full h-2 bg-gradient-to-r from-gray-300 to-amber-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-900 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between text-sm font-medium">
                                            <span className="text-gray-700">SAR {priceRange[0].toLocaleString()}</span>
                                            <span className="text-gray-700">SAR {priceRange[1].toLocaleString()}</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                                                <input
                                                    type="number"
                                                    value={priceRange[0]}
                                                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                                                    min="0"
                                                    max={priceRange[1]}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                                                <input
                                                    type="number"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                                                    min={priceRange[0]}
                                                    max="1000"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Size Filter */}
                            <div className="mb-8">
                                <button
                                    onClick={() => toggleSection('size')}
                                    className="flex items-center justify-between w-full mb-4 group"
                                >
                                    <h3 className="text-gray-900 font-semibold text-lg">Size</h3>
                                    <ChevronDown
                                        size={20}
                                        className={`transform transition-transform ${collapsedSections.size ? 'rotate-180' : ''} text-gray-400 group-hover:text-gray-600`}
                                    />
                                </button>

                                {!collapsedSections.size && (
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 animate-fadeIn">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSize(size)}
                                                className={`
                          py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200
                          ${selectedSizes.includes(size)
                                                        ? 'border-b bg-gradient-to-br from-amber-20 to-amber-80 text-amber-600 shadow-sm'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-amber-400 hover:bg-amber-60'
                                                    }
                        `}
                                            >
                                                {size}
                                                {selectedSizes.includes(size) && (
                                                    <div className="w-2 h-2 bg-amber-600 rounded-full mx-auto mt-1" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Active Filters */}
                            {(selectedBrands.length > 0 || selectedSizes.length > 0) && (
                                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <h4 className="font-medium text-black mb-2">Active Filters</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedBrands.map(brand => (
                                            <span key={brand} className="inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-600 px-3 py-1 rounded-full text-sm">
                                                {brand}
                                                <button onClick={() => toggleBrand(brand)} className="ml-1 hover:text-amber-900">
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        ))}
                                        {selectedSizes.map(size => (
                                            <span key={size} className="inline-flex items-center gap-1 bg-white border border-amber-200 text-amber-600 px-3 py-1 rounded-full text-sm">
                                                Size: {size}
                                                <button onClick={() => toggleSize(size)} className="ml-1 hover:text-amber-900">
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8">
                    {/* Mobile Search */}
                    <div className="mb-6 md:hidden">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="mb-6 text-sm text-gray-600">
                        Showing {filteredProducts.length} of {products.length} products
                        {(selectedBrands.length > 0 || selectedSizes.length > 0) && (
                            <span className="ml-2 text-amber-600">
                                • {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''}, {selectedSizes.length} size{selectedSizes.length !== 1 ? 's' : ''} selected
                            </span>
                        )}
                    </div>

                    {/* Products Grid/List */}
                    {/* {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-gray-400" size={40} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <Card3Modi product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredProducts.map((product) => (
                                <Card3Modi product={product} />
                                
                            ))}
                        </div>
                    )}

                    {filteredProducts.length > 0 && (
                        <div className="mt-12 text-center">
                            <button className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-lg hover:shadow-md transition-all hover:scale-[1.02] active:scale-95">
                                Load More Products
                            </button>
                        </div>
                    )} */}
                    {isLoading ? (
                    // SHIMMER STATE
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <CardShimmer key={index} />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    // EMPTY STATE
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="text-gray-400" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-amber-800 text-white font-medium rounded-lg hover:bg-amber-900 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    // DATA STATE
                    <div className={viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                        : "space-y-4"}
                    >
                        {filteredProducts.map((product) => (
                            <Card3Modi key={product.id} product={product} />
                        ))}
                    </div>
                )}
                </main>
            </div>

            {/* Mobile Filter Button */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden opacity-80 fixed bottom-6 right-6 bg-gradient-to-r from-amber-600 to-amber-900 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 z-40"
                >
                    <Filter size={24} />
                </button>
            )}
        </div>
    );
}