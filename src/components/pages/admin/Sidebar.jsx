import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icons from '../../ui/Icon';

const Sidebar = ({ closeMobileMenu }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: "heroicons:rectangle-group-solid", count: null, link: '/admin' },
    { id: 'orders', name: 'Orders', icon: "heroicons:shopping-cart-solid", count: 12, link: '/admin/orderoverview' },
    { id: 'products', name: 'Products', icon: "heroicons:archive-box-solid", count: 45, link: '/admin/product' },
    { id: 'commissions', name: 'Commissions', icon: "heroicons:currency-dollar-solid", count: 8, link: '/admin/comission' },
    { id: 'reports', name: 'Reports', icon: "heroicons:chart-bar-solid", count: null, link: '/reports' },
    { id: 'wallets', name: 'Wallets', icon: "heroicons:wallet-solid", count: null, link: '/wallets' },
    { id: 'users', name: 'Users', icon: "heroicons:users-solid", count: 234, link: '/users' },
    { id: 'notification', name: 'Notification', icon: "heroicons:bell-solid", count: 3, link: '/notification' },
    { id: 'mlm', name: 'MLM Management', icon: "heroicons:sitemap-solid", count: null, link: '/mlm' },
    { id: 'hierarchy', name: 'Hierarchy', icon: "heroicons:share-solid", count: null, link: '/hierarchy' },
    { id: 'setting', name: 'Setting', icon: "heroicons:cog-6-tooth-solid", count: null, link: '/setting' },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="p-4 border-b border-amber-200 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <div className="p-2 bg-amber-600 rounded-lg shrink-0">
            <Icons icon="heroicons:home-solid" size={20} className="text-white" />
          </div>
          <h2 className="text-lg font-bold text-amber-900 truncate">Admin Panel</h2>
        </Link>
        {/* Close button for mobile */}
        <button className="md:hidden" onClick={closeMobileMenu}>
            <Icons icon="heroicons:x-mark-solid" size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={item.id}
              to={item.link}
              onClick={closeMobileMenu} // Close sidebar on mobile when navigating
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-800 hover:bg-amber-200 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className={`shrink-0 ${isActive ? 'text-white' : 'text-amber-700'}`}>
                  <Icons icon={item.icon} size={20} />
                </div>
                <span className="font-medium text-sm truncate">{item.name}</span>
              </div>

              {item.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-2 ${
                  isActive ? 'bg-white text-amber-600' : 'bg-amber-600 text-white'
                }`}>
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Icons from '../../ui/Icon'; // Path to your icon.jsx

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();

//   const menuItems = [
//     { id: 'dashboard', name: 'Dashboard', icon: "heroicons:rectangle-group-solid", count: null, link: '/admin' },
//     { id: 'orders', name: 'Orders', icon: "heroicons:shopping-cart-solid", count: 12, link: '/admin/orderoverview' },
//     { id: 'products', name: 'Products', icon: "heroicons:archive-box-solid", count: 45, link: '/admin/product' },
//     { id: 'commissions', name: 'Commissions', icon: "heroicons:currency-dollar-solid", count: 8, link: '/admin/comission' },
//     { id: 'reports', name: 'Reports', icon: "heroicons:chart-bar-solid", count: null, link: '/reports' },
//     { id: 'wallets', name: 'Wallets', icon: "heroicons:wallet-solid", count: null, link: '/wallets' },
//     { id: 'users', name: 'Users', icon: "heroicons:users-solid", count: 234, link: '/users' },
//     { id: 'notification', name: 'Notification', icon: "heroicons:bell-solid", count: 3, link: '/notification' },
//     { id: 'mlm', name: 'MLM Management', icon: "heroicons:sitemap-solid", count: null, link: '/mlm' },
//     { id: 'hierarchy', name: 'Hierarchy', icon: "heroicons:share-solid", count: null, link: '/hierarchy' },
//     { id: 'setting', name: 'Setting', icon: "heroicons:cog-6-tooth-solid", count: null, link: '/setting' },
//   ];

//   return (
//     <div className={`left-0 h-full ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-gradient-to-b from-amber-50 to-amber-100 border-r border-amber-200 shadow-lg z-50`}>
      
//       {/* Sidebar Header */}
//       <div className="p-4 border-b border-amber-200">
//         <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
//           {!isCollapsed && (
//             <Link to="/" className="flex items-center space-x-3">
//               <div className="p-2 bg-amber-600 rounded-lg">
//                 <Icons icon="heroicons:home-solid" size={20} className="text-white" />
//               </div>
//               <h2 className="text-lg font-bold text-amber-900">Admin Panel</h2>
//             </Link>
//           )}
//           {isCollapsed && (
//             <Link to="/">
//               <div className="p-2 bg-amber-600 rounded-lg">
//                 <Icons icon="heroicons:home-solid" size={20} className="text-white" />
//               </div>
//             </Link>
//           )}
//           {/* <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-2 hover:bg-amber-200 rounded-lg transition-colors ml-2"
//           >
//             <Icons 
//               icon={isCollapsed ? "heroicons:chevron-right-solid" : "heroicons:chevron-left-solid"} 
//               size={16} 
//               className="text-amber-700" 
//             />
//           </button> */}
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-120px)]">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.link;
//           return (
//             <Link
//               key={item.id}
//               to={item.link}
//               className={`block w-full relative ${isCollapsed ? 'flex justify-center' : 'flex justify-between items-center'} p-3 rounded-lg transition-all duration-200 ${
//                 isActive
//                   ? 'bg-amber-600 text-white shadow-md'
//                   : 'text-amber-800 hover:bg-amber-200 hover:text-amber-900'
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <div className={`${isActive ? 'text-white' : 'text-amber-700'}`}>
//                   <Icons icon={item.icon} size={20} />
//                 </div>
//                 {!isCollapsed && (
//                   <span className="font-medium text-sm">{item.name}</span>
//                 )}
//               </div>

//               {!isCollapsed && item.count !== null && (
//                 <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
//                   isActive ? 'bg-white text-amber-600' : 'bg-amber-600 text-white'
//                 }`}>
//                   {item.count}
//                 </span>
//               )}
              
//               {/* Notification Dot for Collapsed Mode */}
//               {isCollapsed && item.count !== null && (
//                 <div className="absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full border-2 border-amber-50"></div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

