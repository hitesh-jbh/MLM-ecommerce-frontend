import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaProductHunt,
  FaMoneyCheckAlt,
  FaChartBar,
  FaWallet,
  FaUsers,
  FaBell,
  FaSitemap,
  FaNetworkWired,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaChevronDown,
  FaChevronUp,
  FaStore // 1. Storefront के लिए नया आइकॉन
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ closeMobileMenu }) => {
  const [isCollapsed] = useState(false);
  // 2. Dropdown State को अपग्रेड किया ताकि मल्टीपल ड्रॉपडाउन काम कर सकें
  const [openDropdown, setOpenDropdown] = useState(null); 
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaTachometerAlt />, count: null, link: '/admin/dashboard' },
    { id: 'orders', name: 'Orders', icon: <FaShoppingCart />, count: null, link: '/admin/orderoverview' },
    { id: 'products', name: 'Products', icon: <FaProductHunt />, count: null, link: '/admin/product' },
    
    // 3. यहाँ हमने आपका नया Storefront ड्रॉपडाउन ऐड किया है
    {
      id: 'storefront',
      name: 'Storefront',
      icon: <FaStore />,
      count: null,
      isDropdown: true,
      subItems: [
        { name: 'Hero Banners', link: '/admin/storefront/hero' },
        { name: 'Category Strip', link: '/admin/storefront/categories' },
      ]
    },

    { id: 'commissions', name: 'Commissions', icon: <FaMoneyCheckAlt />, count: null, link: '/admin/comission' },
    { id: 'reports', name: 'Reports', icon: <FaChartBar />, count: null, link: '/admin/report' },
    {
      id: 'wallets',
      name: 'Wallets',
      icon: <FaWallet />,
      count: null,
      isDropdown: true,
      subItems: [
        { name: 'Work Wallet', link: '/admin/wallets/work' },
        { name: 'Withdrawal Requests', link: '/admin/withdrawals' }
      ]
    },
    { id: 'users', name: 'Users', icon: <FaUsers />, count: null, link: '/admin/user' },
    { id: 'notification', name: 'Notification', icon: <FaBell />, count: null, link: '/admin/notifications' },
    { id: 'mlm', name: 'MLM Management', icon: <FaSitemap />, count: null, link: '/admin/mlm' },
    { id: 'hierarchy', name: 'Hierarchy', icon: <FaNetworkWired />, count: null, link: '/admin/hierachy' },
    { id: 'setting', name: 'Setting', icon: <FaCog />, count: null, link: '/admin/setting' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-full ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 shadow-lg z-50`}>
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-black rounded-lg shadow-sm">
                <FaHome className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link || (item.subItems && item.subItems.some(sub => location.pathname === sub.link));
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isDropdownOpen = openDropdown === item.id; // Check if this specific dropdown is open

          return (
            <div key={item.id}>
              {/* Main Menu Item */}
              <div
                onClick={() => {
                  if (hasSubItems && !isCollapsed) {
                    // Toggle current dropdown, close if already open
                    setOpenDropdown(isDropdownOpen ? null : item.id);
                  } else if (!hasSubItems && closeMobileMenu && window.innerWidth < 768) {
                    closeMobileMenu();
                  }
                }}
                className="relative cursor-pointer"
              >
                <Link
                  to={hasSubItems ? '#' : item.link}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive && !hasSubItems ? 'bg-black text-white shadow-md' : 'text-gray-black hover:bg-gray-200'
                  } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={isActive && !hasSubItems ? 'text-white' : 'text-gray-700'}>{item.icon}</div>
                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                  </div>

                  {!isCollapsed && (
                    <div className="flex items-center">
                      {item.count !== null && (
                        <span className={`px-2 py-0.5 rounded-full text-xs ${isActive && !hasSubItems ? 'bg-white text-gray-600' : 'bg-gray-600 text-white'}`}>
                          {item.count}
                        </span>
                      )}
                      {hasSubItems && (
                        isDropdownOpen ? <FaChevronUp className="ml-2 text-xs" /> : <FaChevronDown className="ml-2 text-xs" />
                      )}
                    </div>
                  )}
                </Link>
              </div>

              {/* Submenu Items */}
              {!isCollapsed && hasSubItems && isDropdownOpen && (
                <div className="mt-1 ml-9 space-y-1 border-l-2 border-gray-300">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.link}
                      onClick={() => {
                        if (closeMobileMenu && window.innerWidth < 768) {
                          closeMobileMenu();
                        }
                      }}
                      className={`block p-2 pl-4 text-sm rounded-r-lg transition-colors ${
                        location.pathname === sub.link 
                        ? 'bg-gray-200 text-gray-900 font-bold' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;