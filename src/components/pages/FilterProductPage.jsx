import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, X } from 'lucide-react';

// Actions & Service
import { 
    setProducts, toggleBrand, toggleSize, 
    setPriceRange, setSearchQuery, setSortBy, clearFilters 
} from "../../utils/Slice/productSlice";
import { viewAllProducts } from '../../utils/Service/apiService.js';
import { Brands } from '../../utils/Constants.jsx';

// UI Components
import Card3Modi from '../ui/Card3Modi';
import CardShimmer from '../ui/CardShimmer';
import FilterGroup from '../ui/FilterUI/FilterGroup';
import FilterItem from '../ui/FilterUI/FilterItem';

export default function FilterProductPage() {
    const dispatch = useDispatch();
    const { items, filters } = useSelector((state) => state.product);
    const { selectedBrands, selectedSizes, priceRange, searchQuery, sortBy } = filters;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [brandSearch, setBrandSearch] = useState('');

    // 1. Fetch Data and Sync with Redux
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const res = await viewAllProducts();
                const data = res.data.products || res.data;
                dispatch(setProducts(data));
            } catch (err) {
                console.error("Fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [dispatch]);

    // 2. The Core Filter Engine
    const filteredProducts = useMemo(() => {
        let result = [...items];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase().trim();
            result = result.filter(p => 
                p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q)
            );
        }

        // Brands
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        // Sizes (Checks both direct size array or variant objects)
        if (selectedSizes.length > 0) {
            result = result.filter(p => {
                const pSizes = p.size || p.variants?.map(v => v.size) || [];
                return selectedSizes.some(s => pSizes.includes(s));
            });
        }

        // Price
        result = result.filter(p => (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]);

        // Sort
        const sorts = {
            'price-low': (a, b) => a.price - b.price,
            'price-high': (a, b) => b.price - a.price,
            'newest': (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        };
        return result.sort(sorts[sortBy] || ((a, b) => 0));
    }, [items, selectedBrands, selectedSizes, priceRange, searchQuery, sortBy]);

    // 3. Brand Search Helper
    const displayedBrands = Brands.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <header className="sticky top-0 z-[50] bg-white border-b px-4 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 border rounded"><Filter size={18}/></button>
                    <h1 className="font-bold text-lg hidden sm:block">{filteredProducts.length} Items Found</h1>
                    
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
                        className="bg-transparent font-bold text-sm outline-none"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low-High</option>
                        <option value="price-high">Price: High-Low</option>
                    </select>
                </div>
            </header>

            <div className="max-w-7xl mx-auto flex">
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-[100] w-72 bg-white p-6 transform transition-transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-black uppercase tracking-tighter text-xl">Filters</span>
                        <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X/></button>
                    </div>

                    <FilterGroup title="Brand">
                        <input 
                            placeholder="Find brand..." 
                            className="w-full p-2 text-sm border mb-3 rounded"
                            onChange={(e) => setBrandSearch(e.target.value)}
                        />
                        <div className="max-h-48 overflow-y-auto space-y-1">
                            {displayedBrands.map(b => (
                                <FilterItem 
                                    key={b.name} label={b.name} count={b.count}
                                    isSelected={selectedBrands.includes(b.name)}
                                    onToggle={() => dispatch(toggleBrand(b.name))}
                                />
                            ))}
                        </div>
                    </FilterGroup>

                    <FilterGroup title="Price Range">
                        <input 
                            type="range" min="0" max="5000" step="100"
                            value={priceRange[1]}
                            onChange={(e) => dispatch(setPriceRange([0, parseInt(e.target.value)]))}
                            className="w-full accent-black"
                        />
                        <div className="flex justify-between text-xs font-bold mt-2">
                            <span>₹0</span>
                            <span>₹{priceRange[1]}</span>
                        </div>
                    </FilterGroup>

                    <FilterGroup title="Size">
                        <div className="grid grid-cols-3 gap-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                                <button 
                                    key={s}
                                    onClick={() => dispatch(toggleSize(s))}
                                    className={`py-2 border text-xs font-bold rounded ${selectedSizes.includes(s) ? 'bg-black text-white' : 'hover:border-black'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </FilterGroup>
                    
                    <button 
                        onClick={() => dispatch(clearFilters())}
                        className="w-full mt-6 py-3 bg-gray-100 text-xs font-bold uppercase tracking-widest hover:bg-gray-200"
                    >
                        Clear All
                    </button>
                </aside>

                {/* Grid */}
                <main className="flex-1 p-6">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1,2,3,4,5,6].map(i => <CardShimmer key={i}/>)}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(p => (
                                <Card3Modi key={p._id || p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40">
                            <h3 className="text-xl font-bold">No products found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}







// import React, { useState, useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { 
//     ChevronDown, X, Search, Filter, 
// } from 'lucide-react';

// // Import your Redux Actions
// import {
//     toggleBrand,
//     toggleSize,
//     setPriceRange,
//     setSearchQuery,
//     setSortBy,
//     clearFilters,
//     setProducts
// } from "../../utils/Slice/productSlice"

// import Card3Modi from '../ui/Card3Modi';
// import CardShimmer from '../ui/CardShimmer';
// import { Brands, Product } from '../../utils/Constants.jsx';
// import FilterGroup from '../ui/FilterUI/FilterGroup';
// import FilterItem from '../ui/FilterUI/FilterItem';

// export default function FilterProductPage() {
//     const dispatch = useDispatch();
    
//     // 1. Get State from Redux
//     const { items, filters, isLoading } = useSelector((state) => state.product);
//     const { selectedBrands, selectedSizes, priceRange, searchQuery, sortBy } = filters;

//     // 2. UI-only Local State
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [brandSearch, setBrandSearch] = useState('');
//     const [activeLayout, setActiveLayout] = useState(2);

//     // 3. Initialize Products (Simulating API Fetch)
//     useEffect(() => {
//         // Only set products if the list is empty
//         if (items.length === 0) {
//             dispatch(setProducts(Product));
//         }
//     }, [dispatch, items.length]);

//     // 4. Memoized Filtering Logic (Standardizes logic and boosts performance)
//     const filteredProducts = useMemo(() => {
//         let result = [...items];

//         if (selectedBrands.length > 0) {
//             result = result.filter(p => selectedBrands.includes(p.brand));
//         }

//         if (selectedSizes.length > 0) {
//             // Your logic: Product matches if ID is divisible by selection count
//             result = result.filter(p => p.id % selectedSizes.length === 0);
//         }

//         result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

//         if (searchQuery) {
//             const query = searchQuery.toLowerCase();
//             result = result.filter(p => 
//                 p.name.toLowerCase().includes(query) || 
//                 p.brand.toLowerCase().includes(query)
//             );
//         }

//         const sortFunctions = {
//             'newest': (a, b) => b.id - a.id,
//             'price-low': (a, b) => a.price - b.price,
//             'price-high': (a, b) => b.price - a.price,
//             'rating': (a, b) => b.rating - a.rating,
//             'popular': (a, b) => b.reviews - a.reviews,
//         };
        
//         return result.sort(sortFunctions[sortBy] || sortFunctions.popular);
//     }, [items, selectedBrands, selectedSizes, priceRange, searchQuery, sortBy]);

//     const filteredBrandsList = Brands.filter(brand =>
//         brand.name.toLowerCase().includes(brandSearch.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header - Connect Search and Sort to Redux */}
//             <header className="sticky top-0 z-[100] bg-white border-b p-4">
//                 <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
//                     <div className="flex items-center gap-4">
//                         <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 bg-gray-100 rounded">
//                             <Filter size={20} />
//                         </button>
//                         <h1 className="text-xl font-bold">{filteredProducts.length} Items Found</h1>
//                     </div>

//                     <div className="flex items-center gap-4 flex-1 justify-end">
//                         <div className="relative max-w-xs w-full">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                             <input 
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={searchQuery}
//                                 onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//                                 className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-amber-500 outline-none"
//                             />
//                         </div>
//                         <select 
//                             value={sortBy} 
//                             onChange={(e) => dispatch(setSortBy(e.target.value))}
//                             className="border p-2 rounded-lg text-sm font-medium"
//                         >
//                             <option value="popular">Popularity</option>
//                             <option value="price-low">Price: Low-High</option>
//                             <option value="price-high">Price: High-Low</option>
//                             <option value="newest">New Arrivals</option>
//                         </select>
//                     </div>
//                 </div>
//             </header>

//             <div className="max-w-7xl mx-auto flex">
//                 {/* Sidebar */}
//                 <aside className={`fixed inset-y-0 left-0 z-[200] w-72 bg-white p-6 transform transition-transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-lg font-bold">Filters</h2>
//                         <button onClick={() => dispatch(clearFilters())} className="text-amber-600 text-sm font-medium">Clear All</button>
//                         <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X size={20}/></button>
//                     </div>

//                     {/* Brand Filter */}
//                     <FilterGroup title="Brand">
//                         <input 
//                             type="text" 
//                             placeholder="Search brand..." 
//                             className="w-full p-2 mb-4 border rounded text-sm"
//                             onChange={(e) => setBrandSearch(e.target.value)}
//                         />
//                         <div className="max-h-60 overflow-y-auto space-y-1">
//                             {filteredBrandsList.map(b => (
//                                 <FilterItem 
//                                     key={b.name}
//                                     label={b.name}
//                                     count={b.count}
//                                     isSelected={selectedBrands.includes(b.name)}
//                                     onToggle={() => dispatch(toggleBrand(b.name))}
//                                 />
//                             ))}
//                         </div>
//                     </FilterGroup>

//                     {/* Price Slider */}
//                     <FilterGroup title="Price Range">
//                         <div className="space-y-4 pt-2">
//                             <input 
//                                 type="range" min="0" max="1000" step="10"
//                                 value={priceRange[1]}
//                                 onChange={(e) => dispatch(setPriceRange([priceRange[0], parseInt(e.target.value)]))}
//                                 className="w-full accent-amber-600"
//                             />
//                             <div className="flex justify-between text-sm font-bold">
//                                 <span>Rs. {priceRange[0]}</span>
//                                 <span>Rs. {priceRange[1]}</span>
//                             </div>
//                         </div>
//                     </FilterGroup>

//                     {/* Size Selector */}
//                     <FilterGroup title="Size">
//                         <div className="grid grid-cols-3 gap-2">
//                             {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
//                                 <button
//                                     key={size}
//                                     onClick={() => dispatch(toggleSize(size))}
//                                     className={`py-2 text-xs border rounded transition-colors ${selectedSizes.includes(size) ? 'bg-amber-600 border-amber-600 text-white' : 'hover:border-amber-500'}`}
//                                 >
//                                     {size}
//                                 </button>
//                             ))}
//                         </div>
//                     </FilterGroup>
//                 </aside>

//                 {/* Main Product Grid */}
//                 <main className="flex-1 p-6">
//                     {isLoading ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {[1, 2, 3, 4, 5, 6].map(n => <CardShimmer key={n} />)}
//                         </div>
//                     ) : filteredProducts.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {filteredProducts.map(product => (
//                                 <Card3Modi key={product.id} product={product} />
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-20">
//                             <p className="text-gray-500">No products match your filters.</p>
//                             <button onClick={() => dispatch(clearFilters())} className="mt-4 text-amber-600 underline">Reset All</button>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// }

