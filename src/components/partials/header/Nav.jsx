import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../../utils/Slice/authSlice';
import { getProfile, viewAllProducts } from "../../../utils/service/apiService";
import Icons from '../../ui/Icon';
import { websiteName } from "../../../utils/Constants";
import useSWR from 'swr';
import Card3Modi from '../../ui/Card3Modi';
import { viewCartItem } from "../../../utils/service/apiService";

const RANK_CONFIG = {
  gold: { icon: "solar:medal-ribbon-bold", color: "text-yellow-600" },
  silver: { icon: "solar:medal-star-bold", color: "text-gray-400" },
  premium: { icon: "solar:star-bold", color: "text-purple-500" },
  default: { icon: "solar:user-bold", color: "text-gray-400" },
};

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const profileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ← Added to detect current route

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth?.token);

  // Cart
  const { data: cartData } = useSWR(
    token ? ["/api/cart/", token] : null,
    ([, tkn]) => viewCartItem(tkn).then(res => res.data),
    { revalidateOnFocus: false }
  );
  const reduxCartLength = useSelector((store) => store.cart?.items?.length || 0);
  const cartItemsLength = cartData?.data?.items?.length ?? reduxCartLength;

  // All products for search
  const { data: allProducts = [], error: productsError, isLoading: productsLoading } = useSWR(
    '/api/products-all',
    () => viewAllProducts().then(res => res.data?.products || res.data || []),
    { revalidateOnFocus: false, dedupingInterval: 5 * 60 * 1000 }
  );

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2 || productsLoading || productsError) return [];

    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(product => {
      const fields = [
        product.name,
        product.description,
        product.category,
        product.brand,
        ...(product.tags || [])
      ];
      return fields.some(field => field?.toString().toLowerCase().includes(query));
    });
  }, [searchQuery, allProducts, productsLoading, productsError]);

  // Session validation
  useEffect(() => {
    const validateSession = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !user) {
        try {
          const res = await getProfile(storedToken);
          const userData = res.data.user || res.data;
          dispatch(loginSuccess({ user: userData, token: storedToken }));
        } catch {
          localStorage.removeItem('token');
          dispatch(logout());
        }
      }
    };
    validateSession();
  }, [dispatch, user]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileMenu = () => setIsProfileMenuOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';
  const isCustomer = user?.role?.toLowerCase() === 'customer';

  const ProfileSection = () => {
    const roleKey = user?.role?.toLowerCase() || 'default';
    const rank = RANK_CONFIG[roleKey] || RANK_CONFIG.default;

    return (
      <div className="flex items-center gap-4" ref={profileMenuRef}>
        {isLoggedIn && user ? (
          <div className="relative group">
            <button onClick={toggleProfileMenu} className="focus:outline-none">
              <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 bg-gray-50 overflow-hidden hover:scale-105 transition">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <Icons icon="solar:user-bold" size={18} className="text-black" />
                )}
              </div>
            </button>

            <div className={`absolute top-full right-0 mt-2 ${isProfileMenuOpen ? 'flex' : 'hidden'} group-hover:flex flex-col bg-white border border-gray-100 shadow-2xl rounded-lg p-5 min-w-[260px] z-[110]`}>
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider text-gray-600 font-bold">ACCOUNT</p>
                <p className="font-bold text-sm truncate mt-1">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-full font-bold uppercase">
                    {user.role?.replace('_', ' ') || 'User'}
                  </span>
                  <Icons icon={rank.icon} size={14} className={rank.color} />
                </div>
              </div>
              <div className="space-y-1 border-t pt-3">
                {isAdmin && (
                  <>
                    <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">Profile</Link>
                    <Link to="/admin/dashboard" className="block px-3 py-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded">Admin Panel</Link>
                  </>
                )}
                {isCustomer && (
                  <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">Profile</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded mt-2">
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="text-black hover:text-gray-700">
            <Icons icon="solar:user-linear" size={24} />
          </Link>
        )}
      </div>
    );
  };

  // Determine if we should show full-screen search overlay
  const shouldShowFullSearch = isSearchOpen && 
    !location.pathname.includes('/gentle');
    // !location.pathname.includes('/luxuria') &&
    // !location.pathname.includes('/product/');

  return (
    <div ref={searchRef} className="sticky top-0 z-[100] w-full bg-white">
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" newestOnTop />

      {/* Normal Navigation Bar */}
      {!isSearchOpen ? (
        <nav className="border-b border-gray-100 px-4 sm:px-8 lg:px-16 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                <span className="text-white font-black text-sm">{websiteName?.slice(0,2)}</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">{websiteName}</span>
            </Link>

            <div className="hidden md:flex items-center gap-10 text-sm font-medium">
              <Link to="/" className="hover:text-gray-700">Home</Link>
              <Link to="/gentle" className="hover:text-gray-700">Gentle Trends</Link>
              <Link to="/luxuria" className="hover:text-gray-700">Luxuria</Link>
              <Link to="/contact" className="hover:text-gray-700">Contact</Link>
            </div>

            <div className="flex items-center gap-5 sm:gap-7">
              <button 
                onClick={() => setIsSearchOpen(true)}
                disabled={!shouldShowFullSearch && isSearchOpen}
                className={`transition-colors ${!shouldShowFullSearch && isSearchOpen ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
              >
                <Icons icon="solar:magnifer-linear" size={24} />
              </button>

              <ProfileSection />

              {isLoggedIn && isCustomer && (
                <Link to="/wallet" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium">
                  ₹{(user.walletBalance || 0).toLocaleString('en-IN')}
                </Link>
              )}

              <Link to="/cart" className="relative">
                <Icons icon="solar:cart-large-2-linear" size={26} />
                {cartItemsLength > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsLength}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        /* ──────────────────────────────────────────────
           FULL SCREEN SEARCH - Only on allowed pages
        ────────────────────────────────────────────── */
        shouldShowFullSearch ? (
          <div className="fixed inset-0 bg-white z-[110] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
              <Link to="/" className="text-2xl font-black">{websiteName}</Link>
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="text-3xl font-light"
              >
                ×
              </button>
            </div>

            {/* Search Input */}
            <div className="px-4 sm:px-8 lg:px-16 py-6 border-b">
              <div className="max-w-4xl mx-auto relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full py-4 px-5 text-xl md:text-2xl border-b-2 border-black outline-none placeholder:text-gray-400"
                />
                <Icons 
                  icon="solar:magnifer-linear" 
                  size={28} 
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-12 py-8">
              {productsLoading ? (
                <div className="text-center py-20 text-gray-500">Loading products...</div>
              ) : productsError ? (
                <div className="text-center py-20 text-red-600">Failed to load products</div>
              ) : searchQuery.length < 2 ? (
                <div className="text-center py-20 text-gray-500">Start typing to search...</div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 text-gray-600">
                  No products found for <strong>"{searchQuery}"</strong>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
                  {filteredProducts.slice(0, 20).map((product) => (
                    <div
                      key={product.id || product._id || product.product_id}
                      onClick={() => {
                        navigate(`/product/${product.slug || product.id || product._id || product.product_id}`);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="cursor-pointer"
                    >
                      <Card3Modi product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}