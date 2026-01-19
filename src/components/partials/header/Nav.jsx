// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginSuccess, logout } from '../../../utils/Slice/authSlice';
// import { getProfile } from "../../../utils/service/apiService";
// import Icons from '../../ui/Icon';
// import { websiteName } from "../../../utils/Constants"
// import useSWR from 'swr';
// import { viewCartItem } from "../../../utils/service/apiService";
// import { getWallet } from '../../../utils/service/apiService';

// const RANK_CONFIG = {
//   gold: { icon: "solar:medal-ribbon-bold", color: "text-yellow-600" },
//   silver: { icon: "solar:medal-star-bold", color: "text-gray-400" },
//   premium: { icon: "solar:star-bold", color: "text-purple-500" },
//   default: { icon: "solar:user-bold", color: "text-gray-400" },
// };

// export default function Nav() {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const searchRef = useRef(null);
//   const profileMenuRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isLoggedIn } = useSelector((state) => state.auth);

//   // Fetch cart data
//   const token = useSelector((state) => state.auth?.token);
//   const { data: cartData } = useSWR(
//     token ? ["/api/cart/", token] : null,
//     ([url, tkn]) => viewCartItem(tkn).then(res => res.data)
//   );

//   // Derive the length from SWR data
//   const reduxCartLength = useSelector((store) => store.cart.items.length);
//   const cartItemsLength = cartData?.data?.items?.length ?? reduxCartLength;

//   // All products for search
//   const { data: allProducts = [], error: productsError, isLoading: productsLoading } = useSWR(
//     '/api/products-all',
//     () => viewAllProducts().then(res => res.data?.products || res.data || []),
//     { revalidateOnFocus: false, dedupingInterval: 5 * 60 * 1000 }
//   );

//   const filteredProducts = useMemo(() => {
//     if (!searchQuery.trim() || searchQuery.length < 2 || productsLoading || productsError) return [];

//     const query = searchQuery.toLowerCase().trim();
//     return allProducts.filter(product => {
//       const fields = [
//         product.name,
//         product.description,
//         product.category,
//         product.brand,
//         ...(product.tags || [])
//       ];
//       return fields.some(field => field?.toString().toLowerCase().includes(query));
//     });
//   }, [searchQuery, allProducts, productsLoading, productsError]);

//   // Session Validation
//   useEffect(() => {
//     const validateSession = async () => {
//       const token = localStorage.getItem('token');
//       if (token && !user) {
//         try {
//           const response = await getProfile(token);
//           const userData = response.data.user || response.data;
//           dispatch(loginSuccess({ user: userData, token: token }));
//         } catch (error) {
//           localStorage.removeItem('token');
//           dispatch(logout());
//         }
//       }
//     };
//     validateSession();
//   }, [dispatch, user]);

//   // Click Outside Detection
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchOpen(false);
//       }
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setIsProfileMenuOpen(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Toggle profile menu for mobile
//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(!isProfileMenuOpen);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     dispatch(logout());
//     toast.success("Logged out successfully.");
//     navigate('/');
//     setIsProfileMenuOpen(false);
//   };

//   // Check if user is admin/super_admin
//   const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';
//   // Check if user is a customer (show wallet only for customers)
//   const isCustomer = user?.role?.toLowerCase() === 'customer';

//   const ProfileSection = () => {
//     const roleKey = user?.role?.toLowerCase() || 'default';
//     const rank = RANK_CONFIG[roleKey] || RANK_CONFIG.default;

//     return (
//       <div className="flex items-center gap-4" ref={profileMenuRef}>
//         {isLoggedIn && user ? (
//           <div className="relative group pt-2 pb-2"> 
//             {/* Profile Icon - Clickable on mobile */}
//             <button 
//               onClick={toggleProfileMenu}
//               className="focus:outline-none"
//               aria-label="Profile menu"
//             >
//               <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 overflow-hidden shadow-sm transition-transform hover:scale-105 flex items-center justify-center bg-gray-50">
//                 {user.imageUrl ? (
//                   <img src={user.imageUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                 ) : (
//                   <Icons icon="solar:user-bold" size={18} className="text-black" />
//                 )}
//               </div>
//             </button>

//             {/* Profile Dropdown Menu */}
//             <div className={`
//               absolute top-full right-0 
//               ${isProfileMenuOpen ? 'flex' : 'hidden'} 
//               group-hover:flex 
//               flex-col bg-white border border-gray-100 shadow-2xl rounded-sm p-5 min-w-[260px] z-[110] 
//               animate-in fade-in slide-in-from-top-1 duration-200
//             `}>
//               {/* User Info Section */}
//               <div className="mb-4">
//                 <p className="text-[10px] uppercase tracking-[0.2em] text-gray-700 font-bold mb-1">Account</p>
//                 <p className="text-black font-bold text-sm truncate">{`${user.firstName} ${user.lastName}`}</p>
//                 <p className="text-gray-500 text-xs truncate mt-1">{user.email}</p>
//                 <div className="flex items-center gap-2 mt-2">
//                   <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-sm font-bold uppercase tracking-tighter">
//                     {user.role?.replace('_', ' ')}
//                   </span>
//                   <Icons icon={rank.icon} size={14} className={rank.color} />
//                 </div>
//               </div>
              
//               {/* Menu Options Section */}
//               <div className="space-y-1 border-t border-gray-100 pt-3">

//                 {/* Admin-specific options */}
//                 {isAdmin && (
//                   <>
//                     <Link 
//                       // to="/admin/adminprofile" 
//                       to="/profile" 
//                       className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                       onClick={() => setIsProfileMenuOpen(false)}
//                     >
//                       <Icons icon="solar:shield-user-bold" size={16} />
//                       <span>Profile</span>
//                     </Link>
                    
//                     <Link 
//                       to="/admin/dashboard" 
//                       className="flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                       onClick={() => setIsProfileMenuOpen(false)}
//                     >
//                       <Icons icon="solar:widget-bold" size={16} />
//                       <span>Admin Panel</span>
//                     </Link>
//                   </>
//                 )}

//                 {/* Customer-specific options */}
//                 {isCustomer && (
//                   <>
//                     <Link 
//                       to="/profile" 
//                       className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
//                       onClick={() => setIsProfileMenuOpen(false)}
//                     >
//                       <Icons icon="solar:user-rounded-linear" size={16} className="text-gray-500" />
//                       <span>Profile</span>
//                     </Link>
//                   </>
//                 )}

//                 {/* Logout Button */}
//                 <button 
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 w-full px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded transition-colors mt-2 border-t border-gray-100 pt-3"
//                 >
//                   <Icons icon="solar:logout-bold" size={16} />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <Link to="/login" className="text-black hover:text-gray-600 transition p-1">
//             <Icons icon="solar:user-linear" size={22} />
//           </Link>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div ref={searchRef} className="sticky top-0 z-[100] w-full">
//       <ToastContainer 
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       {!isSearchOpen ? (
//         <nav className="bg-white border-b border-gray-100 px-6 md:px-12 lg:px-20 py-4">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <Link to="/" className="group flex items-center gap-3">
//               <div className="w-9 h-9 bg-black rounded-sm flex items-center justify-center transition-transform group-hover:rotate-3">
//                 <span className="text-white font-black text-xs tracking-tighter">{websiteName}</span>
//               </div>
//               <div className="hidden sm:block">
//                 <p className="text-black font-bold text-lg tracking-[0.1em] leading-none">{websiteName}</p>
//               </div>
//             </Link>

//             <div className="hidden md:flex items-center gap-8 text-sm font-medium">
//               <Link to="/" className="hover:text-gray-600">Home</Link>
//               <Link to="/gentle" className="hover:text-gray-600">Gentle Trends</Link>
//               <Link to="/luxuria" className="hover:text-gray-600">Luxuria</Link>
//               <Link to="/contact" className="hover:text-gray-600">Contact Us</Link>
//             </div>

//             <div className="flex items-center gap-5">
//               <button onClick={() => setIsSearchOpen(true)} className="text-black">
//                 <Icons icon="solar:magnifer-linear" size={20} />
//               </button>

//                <button className="relative p-2 -m-2 hover:text-orange-600 transition-colors hidden md:block">
//                 <Icons icon="solar:bell-bing-linear" size={24} />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
//               </button>

//               <ProfileSection />

//               {/* Show wallet only for customers */}
//               {isLoggedIn && user && isCustomer && (
//                 <Link to="/admin/wallets/normal" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 hover:bg-gray-200 transition-all">
//                   <Icons icon="solar:wallet-2-linear" size={20} className="text-black" />
//                   <span className="text-xs font-bold text-black">
//                     ${user.walletBalance || '0.00'}
//                   </span>
//                 </Link>
//               )}

//               <Link to="/cart" className="relative text-black">
//                 <Icons icon="solar:cart-large-2-linear" size={22} />
//                 {cartItemsLength > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
//                     {cartItemsLength}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </nav>
//       ) : (
//         <nav className="bg-white border-b border-black px-6 md:px-12 lg:px-20 py-8 animate-in slide-in-from-top duration-300">
//           <div className="max-w-3xl mx-auto">
//             <div className="flex justify-between items-center mb-4">
//               <Link to="/"><p className="text-black font-black text-xl tracking-tighter">{websiteName}</p></Link>
//               <button onClick={() => setIsSearchOpen(false)}><Icons icon="solar:close-circle-linear" size={24} /></button>
//             </div>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search Collection..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 autoFocus
//                 className="w-full py-4 border-b border-gray-200 outline-none text-md uppercase tracking-widest"
//               />
//               <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">
//                 <Icons icon="solar:magnifer-linear" size={24} />
//               </div>
//             </div>
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// }
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../../utils/Slice/authSlice';
import { getProfile, viewAllProducts, viewCartItem } from "../../../utils/service/apiService";
import Icons from '../../ui/Icon';
import { websiteName } from "../../../utils/Constants";
import useSWR from 'swr';
import Card3Modi from '../../ui/Card3Modi';

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
  const location = useLocation();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth?.token);

  // Cart Logic
  const { data: cartData } = useSWR(
    token ? ["/api/cart/", token] : null,
    ([, tkn]) => viewCartItem(tkn).then(res => res.data),
    { revalidateOnFocus: false }
  );
  const reduxCartLength = useSelector((store) => store.cart?.items?.length || 0);
  const cartItemsLength = cartData?.data?.items?.length ?? reduxCartLength;

  // Search Logic
  const { data: allProducts = [], error: productsError, isLoading: productsLoading } = useSWR(
    '/api/products-all',
    () => viewAllProducts().then(res => res.data?.products || res.data || []),
    { revalidateOnFocus: false, dedupingInterval: 300000 }
  );

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2 || productsLoading || productsError) return [];
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(product => {
      const fields = [product.name, product.category, product.brand];
      return fields.some(field => field?.toString().toLowerCase().includes(query));
    });
  }, [searchQuery, allProducts, productsLoading, productsError]);

  // Session Management
  useEffect(() => {
    const validateSession = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !user) {
        try {
          const res = await getProfile(storedToken);
          dispatch(loginSuccess({ user: res.data.user || res.data, token: storedToken }));
        } catch {
          localStorage.removeItem('token');
          dispatch(logout());
        }
      }
    };
    validateSession();
  }, [dispatch, user]);

  // Outside Clicks
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';
  const isCustomer = user?.role?.toLowerCase() === 'customer';

  const shouldShowFullSearch = isSearchOpen && !location.pathname.includes('/gentle');

  return (
    <div ref={searchRef} className="sticky top-0 z-[100] w-full bg-white shadow-sm">
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />

      {!isSearchOpen ? (
        <nav className="border-b border-gray-100 px-4 sm:px-8 lg:px-16 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                <span className="text-white font-black text-sm">{websiteName?.slice(0, 2).toUpperCase()}</span>
              </div>
              <span className="font-bold text-xl hidden sm:block tracking-tight">{websiteName}</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-wider text-gray-900">
              <Link to="/" className="hover:text-gray-500 transition-colors">Home</Link>
              <Link to="/gentle" className="hover:text-gray-500 transition-colors">Gentle Trends</Link>
              <Link to="/luxuria" className="hover:text-gray-500 transition-colors">Luxuria</Link>
              <Link to="/about" className="hover:text-gray-500 transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
            </div>

            {/* Icons Group */}
            <div className="flex items-center gap-5 sm:gap-7">
              {/* Search */}
              <button onClick={() => setIsSearchOpen(true)} className="p-2 -m-2 hover:opacity-60 transition-opacity">
                <Icons icon="solar:magnifer-linear" size={24} />
              </button>

              {/* Notification Bell - HIDDEN ON SMALL DEVICES */}
              <button className="relative p-2 -m-2 hover:text-orange-600 transition-colors hidden md:block">
                <Icons icon="solar:bell-bing-linear" size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* Profile */}
              <div className="relative" ref={profileMenuRef}>
                {isLoggedIn && user ? (
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="p-1 focus:outline-none">
                    <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 bg-gray-50 overflow-hidden hover:scale-105 transition">
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <Icons icon="solar:user-bold" size={18} />
                      )}
                    </div>
                  </button>
                ) : (
                  <Link to="/login" className="p-2 -m-2 block"><Icons icon="solar:user-linear" size={24} /></Link>
                )}

                {isProfileMenuOpen && (
                  <div className="absolute top-full right-0 mt-3 bg-white border border-gray-100 shadow-2xl rounded-lg p-5 min-w-[240px] z-[120] animate-in slide-in-from-top-2">
                    <p className="font-bold text-sm truncate">{user.firstName} {user.lastName}</p>
                    <div className="space-y-1 border-t mt-3 pt-3">
                      {isAdmin && <Link to="/admin/dashboard" className="block px-2 py-2 text-xs font-bold text-blue-600 rounded hover:bg-blue-50">Admin Panel</Link>}
                      <Link to="/profile" className="block px-2 py-2 text-xs font-medium hover:bg-gray-50 rounded">Profile</Link>
                      <button onClick={handleLogout} className="w-full text-left px-2 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded">Logout</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wallet */}
              {isLoggedIn && isCustomer && (
                <Link to="/wallet" className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border rounded-full text-[11px] font-black">
                  <Icons icon="solar:wallet-2-bold" size={18} />
                  <span>₹{(user.walletBalance || 0).toLocaleString('en-IN')}</span>
                </Link>
              )}

              {/* Cart - Professional Badge & High Clickability */}
              <Link to="/cart" className="relative p-2 -m-2 group transition-all duration-300">
                <Icons icon="solar:cart-large-2-linear" size={26} className="group-hover:scale-110 transition-transform" />
                {cartItemsLength > 0 && (
                  <span className="absolute top-0.5 -right-0.5 bg-black text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-sm ring-1 ring-black/5">
                    {cartItemsLength}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        /* Full Screen Search Overlay */
        shouldShowFullSearch && (
          <div className="fixed inset-0 bg-white z-[150] flex flex-col animate-in fade-in duration-300">
            <div className="border-b px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
              <span className="text-xl font-black uppercase tracking-tighter">{websiteName}</span>
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="p-2 hover:bg-gray-100 rounded-full">
                <Icons icon="solar:close-circle-linear" size={30} />
              </button>
            </div>
            <div className="p-6 md:p-12 max-w-5xl mx-auto w-full">
              <input 
                autoFocus
                type="text" 
                placeholder="SEARCH COLLECTION..." 
                className="w-full text-3xl md:text-5xl font-light border-b-2 border-black py-4 outline-none uppercase tracking-tighter"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="mt-12 overflow-y-auto max-h-[60vh] grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id || product._id} onClick={() => setIsSearchOpen(false)}>
                    <Card3Modi product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}