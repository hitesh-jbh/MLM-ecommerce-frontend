// import React, { useState, useRef, useEffect, useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../../utils/slice/authSlice';
// import { 
//   viewAllProducts, 
//   viewCartItem, 
//   userNotification,
//   adminNotification,
//   markRead,
//   markAllRead,
//   viewNotification 
// } from "../../../utils/service/apiService"; 
// import Icons from '../../ui/Icon';
// import { websiteName } from "../../../utils/constants";
// import useSWR from 'swr';
// import Card3Modi from '../../ui/Card3Modi';
// import { CheckCheck, Loader2, X } from 'lucide-react';

// export default function Nav() {
//   // Rank Configurations
//   const RANK_CONFIG = {
//     gold: { icon: "solar:medal-ribbon-bold", color: "text-yellow-600" },
//     silver: { icon: "solar:medal-star-bold", color: "text-gray-400" },
//     premium: { icon: "solar:star-bold", color: "text-purple-500" },
//     default: { icon: "solar:user-bold", color: "text-gray-400" },
//   };

//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [isActionLoading, setIsActionLoading] = useState(false);
  
//   const [selectedNotif, setSelectedNotif] = useState(null);
//   const [isModalLoading, setIsModalLoading] = useState(false);

//   const searchRef = useRef(null);
//   const profileMenuRef = useRef(null);
//   const notificationRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // AUTH SELECTORS
//   const { user, isLoggedIn } = useSelector((state) => state.auth);
//   const token = useSelector((state) => state.auth?.token);
  
//   // ROLE LOGIC: Strict check to ensure user object exists before checking role
//   const isAdmin = isLoggedIn && (user?.role === 'super_admin' || user?.role === 'admin');
//   const isCustomer = isLoggedIn && user?.role === 'user';

//   // --- NOTIFICATION LOGIC ---
//   const { data: notifications = [], mutate: refreshNotifications } = useSWR(
//     token && isLoggedIn ? ["/api/notifications", token, isAdmin] : null,
//     async ([, tkn, isAd]) => {
//       const res = isAd ? await adminNotification(tkn) : await userNotification(tkn);
//       return res.data?.data || res.data?.notifications || res.data || [];
//     },
//     { revalidateOnFocus: true }
//   );

//   const safeNotifications = Array.isArray(notifications) ? notifications : [];
//   const isUnread = (n) => n.is_read === 0 || n.status === 'unread' || n.status === 'pending';
//   const pendingNotifications = safeNotifications.filter(isUnread);

//   const handleViewDetails = async (notifId) => {
//     setIsModalLoading(true);
//     try {
//       const res = await viewNotification(token, notifId);
//       setSelectedNotif(res.data?.data || res.data);
//       refreshNotifications();
//     } catch (error) {
//       toast.error("Failed to load details");
//     } finally {
//       setIsModalLoading(false);
//     }
//   };

//   const handleMarkRead = async (notifId) => {
//     try {
//       await markRead(token, notifId);
//       refreshNotifications();
//     } catch (error) {
//       toast.error("Failed to mark as read");
//     }
//   };

//   const handleMarkAllRead = async () => {
//     if (pendingNotifications.length === 0) return;
//     setIsActionLoading(true);
//     try {
//       await markAllRead(token);
//       await refreshNotifications();
//       toast.success(isAdmin ? "Admin alerts cleared" : "Notifications cleared");
//     } catch (error) {
//       toast.error("Failed to update");
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   // --- CART & SEARCH ---
//   const { data: cartData } = useSWR(token && isLoggedIn ? ["/api/cart/", token] : null, ([, tkn]) => 
//     viewCartItem(tkn).then(res => res.data)
//   );
//   const cartItemsLength = cartData?.data?.items?.length || 0;

//   const { data: allProducts = [] } = useSWR('/api/products-all', () => 
//     viewAllProducts().then(res => res.data?.products || res.data || [])
//   );

//   const filteredProducts = useMemo(() => {
//     if (!searchQuery.trim() || searchQuery.length < 2) return [];
//     const query = searchQuery.toLowerCase().trim();
//     return allProducts.filter(p => [p.name, p.category, p.brand].some(f => f?.toLowerCase().includes(query)));
//   }, [searchQuery, allProducts]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) setIsProfileMenuOpen(false);
//       if (notificationRef.current && !notificationRef.current.contains(e.target)) setIsNotificationOpen(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <div ref={searchRef} className="sticky top-0 z-[100] w-full bg-white shadow-sm">
//       <ToastContainer position="bottom-right" autoClose={2000} theme="light" />

//       {/* NOTIFICATION DETAIL MODAL */}
//       {selectedNotif && (
//         <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
//             <div className="p-6 border-b flex items-center justify-between">
//               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Notification Detail</span>
//               <button onClick={() => setSelectedNotif(null)} className="hover:rotate-90 transition-transform">
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-8">
//               <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">{selectedNotif.title}</h2>
//               <div className="bg-gray-50 p-5 border border-gray-100 rounded-sm mb-6">
//                 <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedNotif.message}</p>
//               </div>
//               <div className="flex justify-between items-center">
//                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
//                     Received: {new Date(selectedNotif.created_at || selectedNotif.createdAt).toLocaleString()}
//                  </p>
//                  <button 
//                   onClick={() => setSelectedNotif(null)}
//                   className="px-8 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
//                  >
//                   Dismiss
//                  </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* NOTIFICATION SIDEBAR */}
//       <div className={`fixed inset-0 bg-black/20 z-[200] transition-opacity duration-300 ${isNotificationOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//         <div ref={notificationRef} className={`absolute right-0 top-0 h-screen w-full max-w-[360px] bg-white shadow-2xl transform transition-transform duration-300 ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//           <div className="flex flex-col h-full">
//             <div className="p-6 border-b flex items-center justify-between">
//               <div>
//                 <h2 className="text-xs font-black uppercase tracking-[0.2em]">{isAdmin ? 'Admin Alerts' : 'Notifications'}</h2>
//                 {pendingNotifications.length > 0 && (
//                   <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">{pendingNotifications.length} New</p>
//                 )}
//               </div>
//               <button onClick={() => setIsNotificationOpen(false)} className="hover:rotate-90 transition-transform">
//                 <Icons icon="solar:close-circle-linear" size={24} />
//               </button>
//             </div>

//             {safeNotifications.length > 0 && (
//               <div className="px-6 py-2 border-b bg-gray-50 flex justify-end">
//                 <button 
//                   onClick={handleMarkAllRead}
//                   disabled={isActionLoading || pendingNotifications.length === 0}
//                   className="text-[10px] font-bold uppercase text-blue-600 disabled:opacity-50 flex items-center gap-1"
//                 >
//                   {isActionLoading ? <Loader2 size={12} className="animate-spin" /> : <CheckCheck size={14} />}
//                   Mark all read
//                 </button>
//               </div>
//             )}
            
//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {safeNotifications.length > 0 ? (
//                 safeNotifications.map((notif) => (
//                   <div 
//                     key={notif.id || notif._id} 
//                     onClick={() => handleViewDetails(notif.id || notif._id)}
//                     className={`p-4 rounded border cursor-pointer transition-all hover:border-blue-200 ${isUnread(notif) ? 'bg-white border-blue-100 shadow-sm' : 'bg-gray-50 opacity-60'}`}
//                   >
//                     <div className="flex justify-between items-start gap-2">
//                       <div className="flex-1">
//                         <p className={`text-xs font-bold mb-1 ${isUnread(notif) ? 'text-black' : 'text-gray-500'}`}>{notif.title}</p>
//                         <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">{notif.message}</p>
//                       </div>
//                       {isUnread(notif) && (
//                         <button 
//                           onClick={(e) => {
//                             e.stopPropagation(); 
//                             handleMarkRead(notif.id || notif._id);
//                           }} 
//                           className="text-[9px] font-black text-blue-600 uppercase"
//                         >
//                           Read
//                         </button>
//                       )}
//                     </div>
//                     <div className="flex justify-between items-center mt-2">
//                       <p className="text-[9px] text-gray-400 font-bold uppercase">
//                         {notif.created_at || notif.createdAt ? new Date(notif.created_at || notif.createdAt).toLocaleDateString() : 'Recent'}
//                       </p>
//                       {isModalLoading && <Loader2 size={10} className="animate-spin text-blue-500" />}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="h-full flex flex-col items-center justify-center opacity-20">
//                   <Icons icon="solar:bell-bing-bold" size={48} />
//                   <p className="text-[10px] font-black uppercase mt-2">Inbox Empty</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* NAV CONTENT */}
//       {!isSearchOpen ? (
//         <nav className="border-b border-gray-100 px-4 sm:px-8 lg:px-16 py-4 bg-white">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <Link to="/" className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white font-black text-sm">
//                 {websiteName?.slice(0, 3).toUpperCase()}
//               </div>
//               <span className="font-bold text-xl hidden sm:block uppercase tracking-tight">{websiteName}</span>
//             </Link>

//             <div className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest text-gray-900">
//               <Link to="/" className="hover:opacity-50 transition-opacity">Home</Link>
//               <Link to="/gentle" className="hover:opacity-50 transition-opacity">Gentle Trends</Link>
//               <Link to="/luxuria" className="hover:opacity-50 transition-opacity">Luxuria</Link>
//               <Link to="/about" className="hover:text-gray-500 transition-colors">About Us</Link>
//               <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
//             </div>

//             <div className="flex items-center gap-5 sm:gap-7">
//               <button onClick={() => setIsSearchOpen(true)} className="hover:scale-110 transition-transform">
//                 <Icons icon="solar:magnifer-linear" size={24} />
//               </button>

//               <button onClick={() => setIsNotificationOpen(true)} className="relative hover:scale-110 transition-transform">
//                 <Icons icon="solar:bell-linear" size={24} />
//                 {pendingNotifications.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
//                     {pendingNotifications.length}
//                   </span>
//                 )}
//               </button>

//               {/* PROFILE DROPDOWN */}
//               <div className="relative group py-2" ref={profileMenuRef}>
//                  {isLoggedIn && user ? (
//                   <>
//                     <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="p-1 focus:outline-none">
//                       <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 bg-gray-50 overflow-hidden hover:scale-105 transition">
//                         {user.imageUrl ? <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <Icons icon="solar:user-bold" size={18} />}
//                       </div>
//                     </button>

//                     <div className={`absolute top-full right-0 mt-1 ${isProfileMenuOpen ? 'flex' : 'hidden'} group-hover:flex flex-col bg-white border border-gray-100 shadow-2xl rounded-sm p-5 min-w-[260px] z-[120]`}>
//                       <div className="mb-4">
//                         <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Account</p>
//                         <p className="text-black font-bold text-sm truncate">{user.firstName} {user.lastName}</p>
//                         <div className="flex items-center gap-1.5 mt-1">
//                           <span className={`text-[10px] font-black uppercase tracking-wider ${RANK_CONFIG[user.rank?.toLowerCase()]?.color || RANK_CONFIG.default.color}`}>
//                             {user.rank || 'Member'}
//                           </span>
//                           <Icons 
//                             icon={RANK_CONFIG[user.rank?.toLowerCase()]?.icon || RANK_CONFIG.default.icon} 
//                             className={RANK_CONFIG[user.rank?.toLowerCase()]?.color || RANK_CONFIG.default.color}
//                             size={14} 
//                           />
//                         </div>
//                         <p className="text-gray-500 text-xs truncate mt-2">{user.email}</p>
//                       </div>

//                       <div className="space-y-1 border-t border-gray-100 pt-3">
//                         {isAdmin && (
//                           <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase text-blue-600 hover:bg-blue-50 rounded" onClick={() => setIsProfileMenuOpen(false)}>
//                             <Icons icon="solar:widget-bold" size={16} />
//                             <span>Admin Panel</span>
//                           </Link>
//                         )}
//                         <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsProfileMenuOpen(false)}>
//                           <Icons icon="solar:user-rounded-linear" size={16} />
//                           <span>Profile</span>
//                         </Link>
//                         <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded mt-2 border-t pt-3">
//                           <Icons icon="solar:logout-bold" size={16} />
//                           <span>Logout</span>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to="/login" className="p-2 -m-2 block"><Icons icon="solar:user-linear" size={24} /></Link>
//                 )}
//               </div>

//               {/* WALLET: Restricted strictly to customers */}
//               {isCustomer && (
//                 <Link to="/wallet" className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border rounded-full text-[11px] font-black transition-colors hover:bg-gray-100">
//                   <Icons icon="solar:wallet-2-bold" size={18} className="text-zinc-700" />
//                   <span>₹{(user?.walletBalance ?? 0).toLocaleString('en-IN')}</span>
//                 </Link>
//               )}

//               <Link to="/cart" className="relative hover:scale-110 transition-transform">
//                 <Icons icon="solar:cart-large-2-linear" size={26} />
//                 {cartItemsLength > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
//                     {cartItemsLength}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </nav>
//       ) : (
//         <div className="fixed inset-0 bg-white z-[150] flex flex-col p-8 animate-in fade-in duration-300">
//            <div className="flex justify-between items-center mb-10">
//               <span className="font-black text-xl uppercase tracking-tighter">{websiteName}</span>
//               <button onClick={() => setIsSearchOpen(false)}><Icons icon="solar:close-circle-linear" size={32} /></button>
//            </div>
//            <input 
//              autoFocus 
//              placeholder="SEARCH COLLECTION..." 
//              className="w-full text-4xl md:text-6xl font-light border-b-2 border-black pb-4 outline-none uppercase"
//              value={searchQuery}
//              onChange={(e) => setSearchQuery(e.target.value)}
//            />
//            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 overflow-y-auto">
//               {filteredProducts.map(p => <div key={p.id} onClick={() => setIsSearchOpen(false)}><Card3Modi product={p} /></div>)}
//            </div>
//         </div>
//       )}
//     </div>
//   );
// }













import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../utils/slice/authSlice';
import { 
  viewAllProducts, 
  viewCartItem, 
  userNotification,
  adminNotification,
  markRead,
  markAllRead,
  viewNotification // Integrated from your service
} from "../../../utils/service/apiService"; 
import Icons from '../../ui/Icon';
import { websiteName } from "../../../utils/constants";
import useSWR from 'swr';
import Card3Modi from '../../ui/Card3Modi';
import { CheckCheck, Loader2, X } from 'lucide-react';

export default function Nav() {
  // Rank Configurations
  const RANK_CONFIG = {
    gold: { icon: "solar:medal-ribbon-bold", color: "text-yellow-600" },
    silver: { icon: "solar:medal-star-bold", color: "text-gray-400" },
    premium: { icon: "solar:star-bold", color: "text-purple-500" },
    default: { icon: "solar:user-bold", color: "text-gray-400" },
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  // New States for Detail Modal
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const searchRef = useRef(null);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth?.token);
  
  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';
  const isCustomer = user?.role === 'user' || !isAdmin;

  // --- NOTIFICATION LOGIC ---
  const { data: notifications = [], mutate: refreshNotifications } = useSWR(
    token && isLoggedIn ? ["/api/notifications", token, isAdmin] : null,
    async ([, tkn, isAd]) => {
      const res = isAd ? await adminNotification(tkn) : await userNotification(tkn);
      return res.data?.data || res.data?.notifications || res.data || [];
    },
    { revalidateOnFocus: true }
  );

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const isUnread = (n) => n.is_read === 0 || n.status === 'unread' || n.status === 'pending';
  const pendingNotifications = safeNotifications.filter(isUnread);

  // VIEW SPECIFIC NOTIFICATION LOGIC
  const handleViewDetails = async (notifId) => {
    setIsModalLoading(true);
    try {
      const res = await viewNotification(token, notifId);
      setSelectedNotif(res.data?.data || res.data);
      // Automatically refresh list to update unread status indicators
      refreshNotifications();
    } catch (error) {
      toast.error("Failed to load details");
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleMarkRead = async (notifId) => {
    try {
      await markRead(token, notifId);
      refreshNotifications();
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAllRead = async () => {
    if (pendingNotifications.length === 0) return;
    setIsActionLoading(true);
    try {
      await markAllRead(token);
      await refreshNotifications();
      toast.success(isAdmin ? "Admin alerts cleared" : "Notifications cleared");
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- CART & SEARCH ---
  const { data: cartData } = useSWR(token ? ["/api/cart/", token] : null, ([, tkn]) => 
    viewCartItem(tkn).then(res => res.data)
  );
  const cartItemsLength = cartData?.data?.items?.length || 0;

  const { data: allProducts = [] } = useSWR('/api/products-all', () => 
    viewAllProducts().then(res => res.data?.products || res.data || [])
  );

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    return allProducts.filter(p => [p.name, p.category, p.brand].some(f => f?.toLowerCase().includes(query)));
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) setIsProfileMenuOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(e.target)) setIsNotificationOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  return (
    <div ref={searchRef} className="sticky top-0 z-[100] w-full bg-white shadow-sm">
      <ToastContainer position="bottom-right" autoClose={2000} theme="light" />

      {/* NOTIFICATION DETAIL MODAL */}
      {selectedNotif && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Notification Detail</span>
              <button onClick={() => setSelectedNotif(null)} className="hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">{selectedNotif.title}</h2>
              <div className="bg-gray-50 p-5 border border-gray-100 rounded-sm mb-6">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedNotif.message}</p>
              </div>
              <div className="flex justify-between items-center">
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                   Received: {new Date(selectedNotif.created_at || selectedNotif.createdAt).toLocaleString()}
                 </p>
                 <button 
                  onClick={() => setSelectedNotif(null)}
                  className="px-8 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                 >
                  Dismiss
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION SIDEBAR */}
      <div className={`fixed inset-0 bg-black/20 z-[200] transition-opacity duration-300 ${isNotificationOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div ref={notificationRef} className={`absolute right-0 top-0 h-screen w-full max-w-[360px] bg-white shadow-2xl transform transition-transform duration-300 ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">{isAdmin ? 'Admin Alerts' : 'Notifications'}</h2>
                {pendingNotifications.length > 0 && (
                  <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">{pendingNotifications.length} New</p>
                )}
              </div>
              <button onClick={() => setIsNotificationOpen(false)} className="hover:rotate-90 transition-transform">
                <Icons icon="solar:close-circle-linear" size={24} />
              </button>
            </div>

            {safeNotifications.length > 0 && (
              <div className="px-6 py-2 border-b bg-gray-50 flex justify-end">
                <button 
                  onClick={handleMarkAllRead}
                  disabled={isActionLoading || pendingNotifications.length === 0}
                  className="text-[10px] font-bold uppercase text-blue-600 disabled:opacity-50 flex items-center gap-1"
                >
                  {isActionLoading ? <Loader2 size={12} className="animate-spin" /> : <CheckCheck size={14} />}
                  Mark all read
                </button>
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {safeNotifications.length > 0 ? (
                safeNotifications.map((notif) => (
                  <div 
                    key={notif.id || notif._id} 
                    onClick={() => handleViewDetails(notif.id || notif._id)}
                    className={`p-4 rounded border cursor-pointer transition-all hover:border-blue-200 ${isUnread(notif) ? 'bg-white border-blue-100 shadow-sm' : 'bg-gray-50 opacity-60'}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className={`text-xs font-bold mb-1 ${isUnread(notif) ? 'text-black' : 'text-gray-500'}`}>{notif.title}</p>
                        <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">{notif.message}</p>
                      </div>
                      {isUnread(notif) && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent opening modal when clicking just mark read
                            handleMarkRead(notif.id || notif._id);
                          }} 
                          className="text-[9px] font-black text-blue-600 uppercase"
                        >
                          Read
                        </button>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[9px] text-gray-400 font-bold uppercase">
                        {notif.created_at || notif.createdAt ? new Date(notif.created_at || notif.createdAt).toLocaleDateString() : 'Recent'}
                      </p>
                      {isModalLoading && <Loader2 size={10} className="animate-spin text-blue-500" />}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20">
                  <Icons icon="solar:bell-bing-bold" size={48} />
                  <p className="text-[10px] font-black uppercase mt-2">Inbox Empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NAV CONTENT */}
      {!isSearchOpen ? (
        <nav className="border-b border-gray-100 px-4 sm:px-8 lg:px-16 py-4 bg-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white font-black text-sm">
                {websiteName?.slice(0, 3).toUpperCase()}
              </div>
              <span className="font-bold text-xl hidden sm:block uppercase tracking-tight">{websiteName}</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest text-gray-900">
              <Link to="/" className="hover:opacity-50 transition-opacity">Home</Link>
              <Link to="/gentle" className="hover:opacity-50 transition-opacity">Gentle Trends</Link>
              <Link to="/luxuria" className="hover:opacity-50 transition-opacity">Luxuria</Link>
              <Link to="/about" className="hover:text-gray-500 transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-5 sm:gap-7">
              <button onClick={() => setIsSearchOpen(true)} className="hover:scale-110 transition-transform">
                <Icons icon="solar:magnifer-linear" size={24} />
              </button>

              <button onClick={() => setIsNotificationOpen(true)} className="relative hover:scale-110 transition-transform">
                <Icons icon="solar:bell-linear" size={24} />
                {pendingNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {pendingNotifications.length}
                  </span>
                )}
              </button>

              {/* PROFILE DROPDOWN */}
              <div className="relative group py-2" ref={profileMenuRef}>
                 {isLoggedIn && user ? (
                  <>
                    <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="p-1 focus:outline-none">
                      <div className="w-9 h-9 rounded-full border-2 border-black p-0.5 bg-gray-50 overflow-hidden hover:scale-105 transition">
                        {user.imageUrl ? <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" /> : <Icons icon="solar:user-bold" size={18} />}
                      </div>
                    </button>

                    <div className={`absolute top-full right-0 mt-1 ${isProfileMenuOpen ? 'flex' : 'hidden'} group-hover:flex flex-col bg-white border border-gray-100 shadow-2xl rounded-sm p-5 min-w-[260px] z-[120]`}>
                      <div className="mb-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Account</p>
                        <p className="text-black font-bold text-sm truncate">{user.firstName} {user.lastName}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`text-[10px] font-black uppercase tracking-wider ${RANK_CONFIG[user.rank?.toLowerCase()]?.color || RANK_CONFIG.default.color}`}>
                            {user.rank || 'Member'}
                          </span>
                          <Icons 
                            icon={RANK_CONFIG[user.rank?.toLowerCase()]?.icon || RANK_CONFIG.default.icon} 
                            className={RANK_CONFIG[user.rank?.toLowerCase()]?.color || RANK_CONFIG.default.color}
                            size={14} 
                          />
                        </div>
                        <p className="text-gray-500 text-xs truncate mt-2">{user.email}</p>
                      </div>

                      <div className="space-y-1 border-t border-gray-100 pt-3">
                        {isAdmin && (
                          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase text-blue-600 hover:bg-blue-50 rounded" onClick={() => setIsProfileMenuOpen(false)}>
                            <Icons icon="solar:widget-bold" size={16} />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded" onClick={() => setIsProfileMenuOpen(false)}>
                          <Icons icon="solar:user-rounded-linear" size={16} />
                          <span>Profile</span>
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded mt-2 border-t pt-3">
                          <Icons icon="solar:logout-bold" size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to="/login" className="p-2 -m-2 block"><Icons icon="solar:user-linear" size={24} /></Link>
                )}
              </div>

              {isLoggedIn && isCustomer && (
                <Link to="/wallet" className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border rounded-full text-[11px] font-black transition-colors hover:bg-gray-100">
                  <Icons icon="solar:wallet-2-bold" size={18} className="text-zinc-700" />
                  <span>₹{(user.walletBalance || 0).toLocaleString('en-IN')}</span>
                </Link>
              )}

              <Link to="/cart" className="relative hover:scale-110 transition-transform">
                <Icons icon="solar:cart-large-2-linear" size={26} />
                {cartItemsLength > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {cartItemsLength}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <div className="fixed inset-0 bg-white z-[150] flex flex-col p-8 animate-in fade-in duration-300">
           <div className="flex justify-between items-center mb-10">
              <span className="font-black text-xl uppercase tracking-tighter">{websiteName}</span>
              <button onClick={() => setIsSearchOpen(false)}><Icons icon="solar:close-circle-linear" size={32} /></button>
           </div>
           <input 
             autoFocus 
             placeholder="SEARCH COLLECTION..." 
             className="w-full text-4xl md:text-6xl font-light border-b-2 border-black pb-4 outline-none uppercase"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
           <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 overflow-y-auto">
              {filteredProducts.map(p => <div key={p.id} onClick={() => setIsSearchOpen(false)}><Card3Modi product={p} /></div>)}
           </div>
        </div>
      )}
    </div>
  );
}
