import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingCart, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../utils/Slice/authSlice';
import { getProfile } from "../../utils/Service/apiService";
import Icons from './Icon';

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItemsLength = useSelector((store) => store.cart.items.length);

  // 1. Session Validation: Runs once on mount
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('token');
      if (token && !user) {
        try {
          const response = await getProfile(token);
          const userData = response.data.user || response.data;

          dispatch(loginSuccess({
            user: userData,
            token: token
          }));
        } catch (error) {
          console.error("Session expired or invalid:", error);
          localStorage.removeItem('token');
          dispatch(logout());
        }
      }
    };
    validateSession();
  }, [dispatch, user]);

  // 2. Click Outside Search Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // 3. Dynamic Routing Logic (Admin vs User)
  // const getProfilePath = () => {
  //   if (!user) return "/login";
  //   const role = user.role?.toLowerCase();
  //   if (role === 'super_admin' || role === 'admin') {
  //     return "/admin/dashboard";
  //   }
  //   return "/profile";
  // };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  // Reusable Profile Dropdown/Icon Component
  const ProfileSection = () => (
    <div className="flex items-center gap-4">
      {isLoggedIn && user ? (
        <div className="relative group">
          <Link to="/profile">
            <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 overflow-hidden shadow-sm transition-transform hover:scale-105 flex items-center justify-center bg-gray-50">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={18} className="text-black" />
              )}
            </div>
          </Link>

          {/* Hover Menu */}
          <div className="absolute top-10 right-0 hidden group-hover:flex flex-col bg-white border border-gray-100 shadow-2xl rounded-sm p-5 min-w-[240px] z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Account</p>
              <p className="text-black font-bold text-sm truncate">{user.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-sm font-bold uppercase tracking-tighter">
                  {user.role?.replace('_', ' ')}
                </span>
                {(user.role === 'super_admin' || user.role === 'admin') && (
                  <Icons icon="solar:crown-minimalistic-bold" size={14} className="text-amber-500" />
                )}
              </div>
            </div>
            
            <div className="space-y-1 border-t border-gray-50 pt-3">
              {(user.role === 'super_admin' || user.role === 'admin') && (
                <Link to="/admin/dashboard" className="flex items-center gap-2 px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition-colors">
                  <LayoutDashboard size={14} /> Admin Panel
                </Link>
              )}
              <Link to="/profile" className="flex items-center gap-2 px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-colors">
                <Settings size={14} /> Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors mt-2"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/login" className="text-black hover:text-gray-600 transition p-1">
          <User size={22} />
        </Link>
      )}
    </div>
  );

  return (
    <div ref={searchRef} className="sticky top-0 z-[90] w-full">
      {!isSearchOpen ? (
        <nav className="bg-white border-b border-gray-100 px-6 md:px-12 lg:px-20 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-black rounded-sm flex items-center justify-center transition-transform group-hover:rotate-3">
                  <span className="text-white font-black text-xs tracking-tighter">GH</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-black font-bold text-lg tracking-[0.1em] leading-none">GENTLEHAUS</p>
                  <p className="text-gray-400 text-[9px] tracking-[0.3em] uppercase mt-1.5">Menn's Couture</p>
                </div>
              </div>
            </Link>

            {/* Main Nav Links */}
            <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-black hover:text-gray-600 transition font-medium text-sm">Home</Link>
                <Link to="/gentle" className="text-black hover:text-gray-600 transition font-medium text-sm">Gentle Trends</Link>
                <Link to="/luxuria" className="text-black hover:text-gray-600 transition font-medium text-sm">Luxuria</Link>
                <Link to="/contact" className="text-black hover:text-gray-600 transition font-medium text-sm">Contact Us</Link>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-6">
              <button onClick={() => setIsSearchOpen(true)} className="text-black hover:scale-110 transition-transform">
                <Search size={20} />
              </button>
              
              <ProfileSection />

              <Link to="/cart" className="relative text-black hover:scale-110 transition-transform">
                <ShoppingCart size={20} />
                {cartItemsLength > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-black text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {cartItemsLength}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        /* Search Overlay */
        <nav className="bg-white border-b border-black px-6 md:px-12 lg:px-20 py-8 animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
               <Link to="/"><p className="text-black font-black text-xl tracking-tighter">GENTLEHAUS</p></Link>
               <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <X size={24} />
               </button>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search Collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full px-0 py-4 border-b border-gray-200 text-black placeholder-gray-300 focus:border-black outline-none text-2xl font-light uppercase tracking-widest transition-all"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}



// import React, { useState, useRef, useEffect } from 'react';
// import { Search, User, ShoppingCart, Icon } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginSuccess, logout } from '../../utils/Slice/authSlice';
// import { getProfile } from "../../utils/Service/apiService"; // Your API service
// import Icons from './Icon';

// export default function Nav() {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const searchRef = useRef(null);
//   const dispatch = useDispatch();

//   // 1. Redux Selectors - Using your authSlice state
//   const { user, isLoggedIn } = useSelector((state) => state.auth);
//   const cartItemsLength = useSelector((store) => store.cart.items.length);

//   // 2. Session Persistence: Fetch profile if token exists but user doesn't
//   useEffect(() => {
//     const validateSession = async () => {
//       const token = localStorage.getItem('token');
      
//       // If we have a token but no user data in Redux (e.g., after refresh)
//       if (token && !user) {
//         try {
//           // Verify token with backend
//           const response = await getProfile(token);
          
//           // Update Redux with real user data { id, email, level, role }
//           dispatch(loginSuccess({
//             user: response.data,
//             token: token
//           }));
//         } catch (error) {
//           console.error("Session expired or invalid token");
//           dispatch(logout()); // Clears Redux and localStorage
//         }
//       }
//     };

//     validateSession();
//   }, [dispatch, user]);

//   // 3. Handle click outside for Search
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchOpen(false);
//       }
//     };
//     if (isSearchOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isSearchOpen]);

//   const popularSearches = ['T-Shirt', 'Blue', 'Jacket'];

//   // 4. Reusable Profile Section (Updated for Backend Data)
//   const ProfileSection = () => (
//     <>
//     <div className="flex items-center gap-4">
//       {isLoggedIn && user ? (
//         <>
//           {/* User Profile Circle & Hover Tooltip */}
//           <div className="relative group">
//             <Link to="/profile">
//               <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 overflow-hidden shadow-sm transition-transform hover:scale-105 flex items-center justify-center">
//                 {user.profileImage ? (
//                   <img 
//                     src={user.profileImage} 
//                     alt="Profile" 
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <User size={18} /> // Fallback icon
//                 )}
//               </div>
//             </Link>
//             <Icons icon="solar:heroicon-wallet" size={16} className="absolute bottom-0 right-0 text-blue-500 bg-white rounded-full p-[2px] border border-white" />
            

//             {/* Hover Tooltip - Populated with API data */}
//             <div className="absolute top-10 right-0 hidden group-hover:flex flex-col bg-white border border-gray-200 shadow-xl rounded-lg p-4 min-w-[220px] z-[100]">
//               <div className="flex items-center justify-between mb-1">
//                 <p className="text-black font-bold text-sm truncate">
//                   {user.email} 
//                   {/* {user.personalInfo?.firstName} {user.personalInfo?.lastName}   */}
//                 </p>
//                 <Icons icon="solar:check-circle-bold" size={18} className="text-blue-500" />
//               </div>

//               <div className="flex items-center gap-1.5 mb-3">
//                 <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
//                   {/* Rank: {user.role} | Level {user.level} */}
//                   Rank: {user.role}
//                 </span>
//                 <Icons icon="solar:crown-minimalistic-bold" size={14} className="text-amber-500" />
//               </div>

//               <div className="pt-3 border-t border-gray-100 space-y-2">
//                 <button 
//                   onClick={() => dispatch(logout())}
//                   className="w-full mt-2 py-1.5 bg-black text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-gray-800 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <Link to="/login" className="text-black hover:text-gray-600 transition">
//           <User size={22} />
//         </Link>
//       )}
//     </div>
    
//     {/* Wallet Display - Real Data from DB */}
//     <div className="hidden sm:flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
//       <Icons icon="solar:wallet-money-bold" size={16} className="text-black" />
//       <span className="text-[11px] font-black tracking-tight">
//         {/* ${user.walletBalance || 0} 122 */}122
//       </span>
//     </div>
//     </>
//   );

//   return (
//     <div ref={searchRef}>
//       {!isSearchOpen && (
//         <nav className="bg-white border-b border-gray-200 px-6 md:px-12 lg:px-20 py-4">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             {/* Logo */}
//             <Link to="/">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">GH</span>
//                 </div>
//                 <div>
//                   <p className="text-black font-bold text-lg tracking-wide leading-none">GENTLEHAUS</p>
//                   <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mt-1">Premium Clothing</p>
//                 </div>
//               </div>
//             </Link>

//             {/* Menu Links */}
//             <div className="hidden md:flex items-center gap-8">
//                <Link to="/" className="text-black hover:text-gray-600 transition font-medium text-sm">Home</Link>
//                <Link to="/gentle" className="text-black hover:text-gray-600 transition font-medium text-sm">Gentle Trends</Link>
//                <Link to="/luxuria" className="text-black hover:text-gray-600 transition font-medium text-sm">Luxuria</Link>
//                <Link to="/contact" className="text-black hover:text-gray-600 transition font-medium text-sm">Contact Us</Link>
//              </div>

//             {/* Action Icons */}
//             <div className="flex items-center gap-5">
//               <button onClick={() => setIsSearchOpen(true)} className="text-black hover:text-gray-500">
//                 <Search size={20} />
//               </button>
              
//               <ProfileSection />

//               <Link to="/cart" className="relative text-black hover:text-gray-500">
//                 <ShoppingCart size={20} />
//                 {cartItemsLength > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
//                     {cartItemsLength}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </nav>
//       )}

//       {/* Search Interface (Logic remains the same) */}
//       {isSearchOpen && (
//         <nav className="bg-white border-b border-gray-200 px-6 md:px-12 lg:px-20 py-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center justify-between mb-8">
//                <Link to="/"><p className="text-black font-bold text-lg tracking-wide">GENTLEHAUS</p></Link>
//                <div className="flex items-center gap-5">
//                  <ProfileSection />
//                  <Link to="/cart" className="relative text-black">
//                    <ShoppingCart size={20} />
//                  </Link>
//                </div>
//             </div>
//             <div className="relative max-w-2xl mx-auto mb-6">
//               <input
//                 type="text"
//                 placeholder="WHAT ARE YOU LOOKING FOR?"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 autoFocus
//                 className="w-full px-0 py-3 border-b-2 border-black text-black placeholder-gray-400 focus:outline-none text-lg font-medium uppercase"
//               />
//             </div>
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// }


// Correct code
// import React, { useState, useRef, useEffect } from 'react';
// import { Search, User, ShoppingCart } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginSuccess, logout } from '../../utils/Slice/authSlice';
// import { user as dummyUser } from "../Store/data"; // Renamed to avoid conflict
// import Icons from './Icon';

// export default function Nav() {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const searchRef = useRef(null);
//   const dispatch = useDispatch();

//   // Redux Selectors
//   const { user, isLoggedIn } = useSelector((state) => state.auth);
//   const cartItemsLength = useSelector((store) => store.cart.items.length);


//   // 1. Force login with dummy data on load
//   useEffect(() => {
//     if (!isLoggedIn) {
//       dispatch(loginSuccess({
//         user: dummyUser,
//         token: "fake-jwt-token"
//       }));
//     }
//   }, [dispatch, isLoggedIn]);

//   // 2. Handle click outside for Search
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchOpen(false);
//       }
//     };
//     if (isSearchOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isSearchOpen]);

//   const popularSearches = ['T-Shirt', 'Blue', 'Jacket'];

//   // 3. Reusable Profile Section
//   const ProfileSection = () => (
//     <div className="flex items-center gap-4">
//       {isLoggedIn && user ? (
//         <>
//           {/* User Profile Circle & Hover Tooltip */}
//           <div className="relative group">
//             <Link to="/profile">
//               <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 overflow-hidden shadow-sm transition-transform hover:scale-105">
//                 <img 
//                   src={user.profileImage} 
//                   alt="Profile" 
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               </div>
//             </Link>

//             {/* Hover Tooltip (Premium Theme) */}
//             <div className="absolute top-10 right-0 hidden group-hover:flex flex-col bg-white border border-gray-200 shadow-xl rounded-lg p-4 min-w-[200px] z-[100]">
//               <div className="flex items-center justify-between mb-1">
//                 <p className="text-black font-bold text-sm truncate">
//                   {user.personalInfo?.firstName} {user.personalInfo?.lastName}
//                 </p>
//                 {/* Verified Icon */}
//                 <Icons icon="solar:check-circle-bold" size={18} className="text-blue-500" />
//               </div>

//               <div className="flex items-center gap-1.5 mb-3">
//                 <Icons icon="solar:crown-minimalistic-bold" size={14} className="text-amber-500" />
//                 <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
//                   {user.personalInfo?.rank}
//                 </span>
//               </div>

//               <div className="pt-3 border-t border-gray-100 space-y-2">
//                 {/* Clock / Member Since */}
//                 <div className="flex items-center gap-2 text-gray-400">
//                   <Icons icon="solar:clock-circle-outline" size={14} />
//                   <span className="text-[10px] font-medium uppercase tracking-tight">Member since 2024</span>
//                 </div>

//                 <button 
//                   onClick={() => dispatch(logout())}
//                   className="w-full mt-2 py-1.5 bg-black text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-gray-800 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Wallet Amount */}
//           <Link to="/wallet" className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-100 transition">
//             <Icons icon="solar:wallet-bold" size={16} className="text-black" />
//             <span className="text-xs font-black text-black">
//               ${user.walletBalance?.toLocaleString()}
//             </span>
//           </Link>
//         </>
//       ) : (
//         <Link to="/login" className="text-black hover:text-gray-600 transition">
//           <User size={22} />
//         </Link>
//       )}
//     </div>
//   );

//   return (
//     <div ref={searchRef}>
//       {/* 4. Main Navigation (Visible when search is closed) */}
//       {!isSearchOpen && (
//         <nav className="bg-white border-b border-gray-200 px-6 md:px-12 lg:px-20 py-4">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             {/* Logo */}
//             <Link to="/">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">GH</span>
//                 </div>
//                 <div>
//                   <p className="text-black font-bold text-lg tracking-wide leading-none">GENTLEHAUS</p>
//                   <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mt-1">Premium Clothing</p>
//                 </div>
//               </div>
//             </Link>

//             {/* Menu Links */}
//             <div className="hidden md:flex items-center gap-8">
//                <a href="/" className="text-black hover:text-gray-600 transition font-medium text-sm">
//                  Home
//                </a>
//                <a href="/gentle" className="text-black hover:text-gray-600 transition font-medium text-sm">
//                  Gentle Trends
//                </a>
//                <a href="/luxuria" className="text-black hover:text-gray-600 transition font-medium text-sm">
//                  Luxuria
//                </a>
//                <a href="/contact" className="text-black hover:text-gray-600 transition font-medium text-sm">
//                  Contact Us
//                </a>
//                <a href="/about" className="text-black hover:text-gray-600 transition font-medium text-sm">
//                  About Us
//                </a>
//              </div>

//             {/* Action Icons */}
//             <div className="flex items-center gap-5">
//               <button onClick={() => setIsSearchOpen(true)} className="text-black hover:text-gray-500">
//                 <Search size={20} />
//               </button>
              
//               <ProfileSection />

//               <Link to="/cart" className="relative text-black hover:text-gray-500">
//                 <ShoppingCart size={20} />
//                 <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
//                   {cartItemsLength}
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </nav>
//       )}

//       {/* 5. Search Interface (Visible when search is open) */}
//       {isSearchOpen && (
//         <nav className="bg-white border-b border-gray-200 px-6 md:px-12 lg:px-20 py-6 animate-in fade-in duration-300">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center justify-between mb-8">
//               <Link to="/">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
//                     <span className="text-white font-bold text-sm">GH</span>
//                   </div>
//                   <p className="text-black font-bold text-lg tracking-wide">GENTLEHAUS</p>
//                 </div>
//               </Link>
//               <div className="flex items-center gap-5">
//                 <ProfileSection />
//                 <Link to="/cart" className="relative text-black">
//                   <ShoppingCart size={20} />
//                   <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
//                     {cartItemsLength}
//                   </span>
//                 </Link>
//               </div>
//             </div>

//             <div className="relative max-w-2xl mx-auto mb-6">
//               <input
//                 type="text"
//                 placeholder="WHAT ARE YOU LOOKING FOR?"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 autoFocus
//                 className="w-full px-0 py-3 border-b-2 border-black text-black placeholder-gray-400 focus:outline-none text-lg font-medium tracking-tight uppercase"
//               />
//               <button className="absolute right-0 top-1/2 -translate-y-1/2 text-black">
//                 <Search size={24} />
//               </button>
//             </div>

//             <div className="flex items-center justify-center gap-4 flex-wrap">
//               <span className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">Popular:</span>
//               {popularSearches.map((search) => (
//                 <button 
//                   key={search} 
//                   onClick={() => setSearchQuery(search)} 
//                   className="text-black hover:underline text-[11px] font-bold uppercase tracking-widest"
//                 >
//                   {search}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </nav>
//       )}
//     </div>
//   );
// }
