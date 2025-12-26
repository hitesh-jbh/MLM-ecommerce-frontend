import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import appStore from '../../utils/appStore';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchQuery } from '../../utils/Slice/searchSlice';

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const cartItemsLength = useSelector((store) => store.cart.items.length);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const popularSearches = ['T-Shirt', 'Blue', 'Jacket'];

  // const searchItem = useSelector((state) => state.search.query);
  // // search handler
  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   dispatch(updateSearchQuery());
  // }

  // const popularSearches = () => {
  //   dis
  // }

  return (
    <div ref={searchRef}>
      {/* Main Navigation - Image 1 Style */}
      {!isSearchOpen && (
        <nav className="bg-white border-b border-gray-200 px-6 md:px-12 lg:px-20 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/"><div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GH</span>
                </div>
                <div>
                  <p className="text-black font-bold text-lg tracking-wide">GENTLEHAUS</p>
                  <p className="text-gray-600 text-xs tracking-widest">PREMIUM CLOTHING</p>
                </div>
              </div>
            </div></Link>

            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-black hover:text-gray-600 transition font-medium text-sm">
                Home
              </a>
              <a href="/gentle" className="text-black hover:text-gray-600 transition font-medium text-sm">
                Gentle Trends
              </a>
              <a href="/luxuria" className="text-black hover:text-gray-600 transition font-medium text-sm">
                Luxuria
              </a>
              <a href="/contact" className="text-black hover:text-gray-600 transition font-medium text-sm">
                Contact Us
              </a>
              <a href="/about" className="text-black hover:text-gray-600 transition font-medium text-sm">
                About Us
              </a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-black hover:text-gray-600 transition"
              >
                <Search size={22} />
              </button>
              {/* <Link to="/login"><button className='p-1 w-[2/12] rounded text-black hover:text-gray-600 transition font-medium text-sm' >Login</button></Link> */}
              <Link to="/profile"><button className="text-black hover:text-gray-600 transition">
                <User size={22} />
              </button></Link>
              <Link to="/cart"><button className="relative text-black hover:text-gray-600 transition">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsLength}
                </span>
              </button></Link>
            </div>
          </div>
        </nav>
      )}

      {/* Search Navigation - Image 2 Style */}
      {isSearchOpen && (
        <nav className="bg-white border-b border-gray-200 px-6 md:px-12 lg:px-20 py-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Top Row with Logo and Right Icons */}
            <div className="flex items-center justify-between mb-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/"><div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GH</span>
                  </div>
                  <div>
                    <p className="text-black font-bold text-lg tracking-wide">GENTLEHAUS</p>
                    <p className="text-gray-600 text-xs tracking-widest">PREMIUM CLOTHING</p>
                  </div>
                </div></Link>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-4">

                {/* user login or not login logic */}
                {/* <Link to="/login"><button className='text-black hover:text-gray-600 transition font-medium text-sm p-1 w-[2/12] rounded ' >Login</button></Link> */}
                <Link to="/profile"><button className="text-black hover:text-gray-600 transition">
                  <User size={22} />
                </button></Link>

                <Link to="/cart" ><button className="relative text-black hover:text-gray-600 transition">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    2
                  </span>
                </button></Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full px-5 py-2 border-2 border-gray-300 rounded text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition text-base"
              />
              <button className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black transition">
                <Search size={22} />
              </button>
            </div>

            {/* Popular Searches */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <span className="text-gray-600 text-sm font-medium">Popular Searches:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="text-black hover:underline text-sm font-medium transition"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
} 