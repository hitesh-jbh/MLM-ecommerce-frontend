import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        items: [],
        filteredItems: [],
        filters: {
            selectedBrands: [],
            selectedSizes: [],
            priceRange: [0, 1000],
            searchQuery: '',
            sortBy: 'popular'
        },
        favorites: [],
        isLoading: false,
        collapsedSections: {
            brand: false,
            price: false,
            size: false
        }
    },
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
            state.filteredItems = action.payload;
        },
        
        setFilteredProducts: (state, action) => {
            state.filteredItems = action.payload;
        },
        
        // toggleBrand: (state, action)  => {
        toggleBrand: (state, action) => {
            const brand = action.payload;
            if (state.filters.selectedBrands.includes(brand)) {
                state.filters.selectedBrands = state.filters.selectedBrands.filter(b => b !== brand);
            } else {
                state.filters.selectedBrands.push(brand);
            }
        },
        
        toggleSize: (state, action) => {
            const size = action.payload;
            if (state.filters.selectedSizes.includes(size)) {
                state.filters.selectedSizes = state.filters.selectedSizes.filter(s => s !== size);
            } else {
                state.filters.selectedSizes.push(size);
            }
        },
        
        setPriceRange: (state, action) => {
            state.filters.priceRange = action.payload;
        },
        
        setSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
        },
        
        setSortBy: (state, action) => {
            state.filters.sortBy = action.payload;
        },
        
        toggleFavorite: (state, action) => {
            const id = action.payload;
            if (state.favorites.includes(id)) {
                state.favorites = state.favorites.filter(favId => favId !== id);
            } else {
                state.favorites.push(id);
            }
        },
        
        clearFilters: (state) => {
            state.filters.selectedBrands = [];
            state.filters.selectedSizes = [];
            state.filters.priceRange = [0, 1000];
            state.filters.searchQuery = '';
        },
        
        toggleCollapsedSection: (state, action) => {
            const section = action.payload;
            state.collapsedSections[section] = !state.collapsedSections[section];
        },
        
        setCollapsedSections: (state, action) => {
            state.collapsedSections = action.payload;
        },
        
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const {
    setProducts,
    setFilteredProducts,
    toggleBrand,
    toggleSize,
    setPriceRange,
    setSearchQuery,
    setSortBy,
    toggleFavorite,
    clearFilters,
    toggleCollapsedSection,
    setCollapsedSections,
    setIsLoading
} = productSlice.actions;

export default productSlice.reducer;