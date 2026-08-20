import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, X } from 'lucide-react';

// Actions & Service
import { 
    setProducts, toggleBrand, toggleSize, 
    setPriceRange, setSearchQuery, setSortBy, clearFilters 
} from "../../utils/slice/productSlice.js";
import { viewAllProducts } from '../../utils/service/apiService';

// UI Components
import Card3Modi from '../../components/ui/Card3Modi.jsx';
import CardShimmer from '../../components/ui/CardShimmer.jsx';
import FilterGroup from '../../components/ui/FilterUI/FilterGroup.jsx';
import FilterItem from '../../components/ui/FilterUI/FilterItem.jsx';

export default function FilterProductPage() {
    const dispatch = useDispatch();
    const { items, filters } = useSelector((state) => state.product);
    const { selectedBrands, selectedSizes, priceRange, searchQuery, sortBy } = filters;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brandSearch, setBrandSearch] = useState('');
    const [filterData, setFilterData] = useState({
        brands: [],
        sizes: [],
        priceRange: [0, 5000],
        actualMaxPrice: 5000
    });

    // 1. Fetch Data and Sync with Redux
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const res = await viewAllProducts();
                const data = res.data.products || res.data;
                dispatch(setProducts(data));
                
                // Calculate dynamic filters from products
                calculateFilters(data);
            } catch (err) {
                console.error("Fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [dispatch]);

    // 2. Calculate filters from product data
    const calculateFilters = (products) => {
        if (!products || products.length === 0) return;

        // Extract unique brands
        const brandsSet = new Set();
        const sizesSet = new Set();
        let maxPrice = 0;
        let minPrice = Infinity;

        products.forEach(product => {
            // Brands - fallback to category if brand is not present
            if (product.brand) {
                brandsSet.add(product.brand);
            } else if (product.category) {
                // Use category as brand if no brand field
                brandsSet.add(product.category);
            }
            
            // Sizes - handle different structures
            if (product.size && Array.isArray(product.size)) {
                product.size.forEach(size => sizesSet.add(size));
            } else if (product.size) {
                sizesSet.add(product.size);
            } else if (product.variants && Array.isArray(product.variants)) {
                product.variants.forEach(variant => {
                    if (variant.size) sizesSet.add(variant.size);
                });
            }
            
            // Price range
            const price = parseFloat(product.price) || 0;
            if (price > maxPrice) maxPrice = price;
            if (price < minPrice) minPrice = price;
        });

        // For filter slider, cap at 5000 but track actual max for display
        const cappedMaxPrice = Math.min(maxPrice, 5000);
        
        // Create brand objects with counts
        const brandsArray = Array.from(brandsSet).map(brand => ({
            name: brand,
            count: products.filter(p => (p.brand === brand) || (p.category === brand)).length
        })).sort((a, b) => a.name.localeCompare(b.name));
        
        setFilterData({
            brands: brandsArray,
            sizes: Array.from(sizesSet).sort(),
            priceRange: [Math.floor(minPrice), Math.ceil(cappedMaxPrice)],
            actualMaxPrice: Math.ceil(maxPrice)
        });

        // Set initial price range in Redux to show ALL products by default
        dispatch(setPriceRange([0, 5000]));
    };

    // 3. The Core Filter Engine
    const filteredProducts = useMemo(() => {
        let result = [...items];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase().trim();
            result = result.filter(p => 
                p.name?.toLowerCase().includes(q) || 
                (p.brand && p.brand.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                (p.description && p.description.toLowerCase().includes(q))
            );
        }

        // Brands - handle both brand and category
        if (selectedBrands.length > 0) {
            result = result.filter(p => 
                selectedBrands.includes(p.brand) || 
                selectedBrands.includes(p.category)
            );
        }

        // Sizes (Checks both direct size array or variant objects)
        if (selectedSizes.length > 0) {
            result = result.filter(p => {
                // Handle different size structures
                let availableSizes = [];
                if (p.size && Array.isArray(p.size)) {
                    availableSizes = p.size;
                } else if (p.size) {
                    availableSizes = [p.size];
                } else if (p.variants && Array.isArray(p.variants)) {
                    availableSizes = p.variants.map(v => v.size).filter(Boolean);
                }
                
                return selectedSizes.some(s => availableSizes.includes(s));
            });
        }

        // Price - Show ALL products when filter is at max (5000)
        // Only apply price filter if user has specifically set it below 5000
        if (priceRange[1] < 5000) {
            result = result.filter(p => {
                const price = parseFloat(p.price) || 0;
                return price >= priceRange[0] && price <= priceRange[1];
            });
        } else {
            // When filter is at 5000, show ALL products regardless of price
            // This includes products above ₹5000
            result = result.filter(p => {
                const price = parseFloat(p.price) || 0;
                return price >= priceRange[0]; // Only check minimum price
            });
        }

        // Sort
        const sorts = {
            'price-low': (a, b) => (a.price || 0) - (b.price || 0),
            'price-high': (a, b) => (b.price || 0) - (a.price || 0),
            'newest': (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
            'popular': (a, b) => (b.popularity || 0) - (a.popularity || 0),
        };
        return result.sort(sorts[sortBy] || ((a, b) => 0));
    }, [items, selectedBrands, selectedSizes, priceRange, searchQuery, sortBy]);

    // 4. Handle price range change with validation
    const handlePriceChange = (maxValue) => {
        const newMax = Math.min(parseInt(maxValue), 5000);
        dispatch(setPriceRange([0, newMax]));
    };

    // 5. Brand Search Helper
    const displayedBrands = filterData.brands.filter(b => 
        b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );

    // 6. Handle brand toggle with both brand and category
    const handleBrandToggle = (brandName) => {
        dispatch(toggleBrand(brandName));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <header className="sticky top-0 z-[50] bg-white border-b px-4 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <button 
                        onClick={() => setSidebarOpen(true)} 
                        className="md:hidden p-2 border rounded hover:bg-gray-50"
                    >
                        <Filter size={18}/>
                    </button>
                    <h1 className="font-bold text-lg hidden sm:block">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'} Found
                    </h1>
                    
                    <div className="flex-1 max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                        <input 
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border rounded-full outline-none focus:border-black"
                        />
                    </div>

                    <select 
                        value={sortBy} 
                        onChange={(e) => dispatch(setSortBy(e.target.value))}
                        className="bg-transparent font-bold text-sm outline-none cursor-pointer"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low-High</option>
                        <option value="price-high">Price: High-Low</option>
                        <option value="popular">Popular</option>
                    </select>
                </div>
            </header>

            <div className="max-w-7xl mx-auto flex">
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-[100] w-72 bg-white p-6 transform transition-transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-black uppercase tracking-tighter text-xl">Filters</span>
                        <button 
                            onClick={() => setSidebarOpen(false)} 
                            className="md:hidden p-1 hover:bg-gray-100 rounded"
                        >
                            <X size={20}/>
                        </button>
                    </div>

                    {/* Brands Filter */}
                    <FilterGroup title="Category">
                        <input 
                            placeholder="Find category..." 
                            className="w-full p-2 text-sm border mb-3 rounded focus:outline-none focus:border-black"
                            onChange={(e) => setBrandSearch(e.target.value)}
                            value={brandSearch}
                        />
                        <div className="max-h-48 overflow-y-auto space-y-1">
                            {displayedBrands.length > 0 ? (
                                displayedBrands.map(b => (
                                    <FilterItem 
                                        key={b.name} 
                                        label={b.name} 
                                        count={b.count}
                                        isSelected={selectedBrands.includes(b.name)}
                                        onToggle={() => handleBrandToggle(b.name)}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm p-2">No categories found</p>
                            )}
                        </div>
                    </FilterGroup>

                    {/* Price Filter - Capped at 5000 */}
                    <FilterGroup title="Price Range">
                        <div className="space-y-4">
                            <input 
                                type="range" 
                                min={filterData.priceRange[0]} 
                                max={5000} 
                                step="100"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e.target.value)}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                            />
                            <div className="flex justify-between items-center text-sm">
                                <div className="font-bold">₹{priceRange[0].toLocaleString()}</div>
                                <div className="flex items-center gap-2">
                                    <div className="font-bold">₹{priceRange[1].toLocaleString()}</div>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        Max: ₹5,000
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">
                                {priceRange[1] === 5000 
                                    ? `Showing all products (including those above ₹5,000 up to ₹${filterData.actualMaxPrice.toLocaleString()})`
                                    : `Showing products up to ₹${priceRange[1].toLocaleString()}`}
                            </p>
                        </div>
                    </FilterGroup>

                    {/* Sizes Filter */}
                    <FilterGroup title="Size">
                        <div className="grid grid-cols-3 gap-2">
                            {filterData.sizes.length > 0 ? (
                                filterData.sizes.map(s => (
                                    <button 
                                        key={s}
                                        onClick={() => dispatch(toggleSize(s))}
                                        className={`py-2 border text-xs font-bold rounded transition ${
                                            selectedSizes.includes(s) 
                                                ? 'bg-black text-white border-black' 
                                                : 'hover:border-black hover:bg-gray-50'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm col-span-3 p-2">
                                    {items.length > 0 ? "No size data available" : "Loading sizes..."}
                                </p>
                            )}
                        </div>
                    </FilterGroup>
                    
                    {/* Clear Filters Button */}
                    <button 
                        onClick={() => {
                            dispatch(clearFilters());
                            setBrandSearch('');
                        }}
                        className="w-full mt-6 py-3 bg-gray-100 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition rounded-lg"
                    >
                        Clear All Filters
                    </button>
                </aside>

                {/* Product Grid */}
                <main className="flex-1 p-4 md:p-6">
                    {/* Mobile filter indicator */}
                    <div className="md:hidden mb-4 flex items-center justify-between">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            <Filter size={16}/>
                            <span className="font-medium">Filters</span>
                            {(selectedBrands.length > 0 || selectedSizes.length > 0 || priceRange[1] < 5000) && (
                                <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                    {selectedBrands.length + selectedSizes.length + (priceRange[1] < 5000 ? 1 : 0)}
                                </span>
                            )}
                        </button>
                        <div className="text-sm text-gray-600">
                            {filteredProducts.length} items
                        </div>
                    </div>

                    {/* Active filters display */}
                    {(selectedBrands.length > 0 || selectedSizes.length > 0 || priceRange[1] < 5000) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedBrands.map(brand => (
                                <span 
                                    key={brand}
                                    className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                                >
                                    {brand}
                                    <button 
                                        onClick={() => handleBrandToggle(brand)}
                                        className="ml-1 text-gray-500 hover:text-black"
                                    >
                                        <X size={14}/>
                                    </button>
                                </span>
                            ))}
                            {selectedSizes.map(size => (
                                <span 
                                    key={size}
                                    className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                                >
                                    Size: {size}
                                    <button 
                                        onClick={() => dispatch(toggleSize(size))}
                                        className="ml-1 text-gray-500 hover:text-black"
                                    >
                                        <X size={14}/>
                                    </button>
                                </span>
                            ))}
                            {priceRange[1] < 5000 && (
                                <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
                                    Price: Up to ₹{priceRange[1].toLocaleString()}
                                    <button 
                                        onClick={() => dispatch(setPriceRange([0, 5000]))}
                                        className="ml-1 text-gray-500 hover:text-black"
                                    >
                                        <X size={14}/>
                                    </button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1,2,3,4,5,6].map(i => <CardShimmer key={i}/>)}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <div className="text-sm text-gray-500 mb-4">
                                Showing {filteredProducts.length} of {items.length} products
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(p => (
                                    <Card3Modi 
                                        key={p.id} 
                                        product={{
                                            ...p,
                                            // Ensure product has all required fields for Card3Modi
                                            image: p.thumbnail_url || p.image,
                                            brand: p.brand || p.category,
                                            name: p.name,
                                            price: p.price,
                                            description: p.description
                                        }} 
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-40">
                            <h3 className="text-xl font-bold mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
                            <button 
                                onClick={() => {
                                    dispatch(clearFilters());
                                    setBrandSearch('');
                                }}
                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}