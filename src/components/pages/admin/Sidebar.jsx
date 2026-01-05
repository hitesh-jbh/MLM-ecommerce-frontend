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
  FaChevronUp
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false); // State for dropdown
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaTachometerAlt />, count: null, link: '/admin/dashboard' },
    { id: 'orders', name: 'Orders', icon: <FaShoppingCart />, count: 12, link: '/admin/orderoverview' },
    { id: 'products', name: 'Products', icon: <FaProductHunt />, count: 45, link: '/admin/product' },
    { id: 'commissions', name: 'Commissions', icon: <FaMoneyCheckAlt />, count: 8, link: '/admin/comission' },
    { id: 'reports', name: 'Reports', icon: <FaChartBar />, count: null, link: '/reports' },
    {
      id: 'wallets',
      name: 'Wallets',
      icon: <FaWallet />,
      count: null,
      isDropdown: true, // Identify as dropdown
      subItems: [
        { name: 'Normal Wallet', link: '/admin/wallets/normal' },
        { name: 'Work Wallet', link: '/admin/wallets/work' }
      ]
    },
    { id: 'users', name: 'Users', icon: <FaUsers />, count: 234, link: '/admin/user' },
    { id: 'notification', name: 'Notification', icon: <FaBell />, count: 3, link: '/admin/notifications' },
    { id: 'mlm', name: 'MLM Management', icon: <FaSitemap />, count: null, link: '/admin/mlm' },
    { id: 'hierarchy', name: 'Hierarchy', icon: <FaNetworkWired />, count: null, link: '/admin/hierachy' },
    { id: 'setting', name: 'Setting', icon: <FaCog />, count: null, link: '/admin/setting' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-full ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-gradient-to-b from-amber-50 to-amber-100 border-r border-amber-200 shadow-lg z-50`}>
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-amber-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-amber-600 rounded-lg shadow-sm">
                <FaHome className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-amber-900">Admin Panel</h2>
            </Link>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-amber-200 rounded-lg transition-colors">
            {isCollapsed ? <FaChevronRight className="text-amber-700" /> : <FaChevronLeft className="text-amber-700" />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link;
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.id}>
              {/* Main Menu Item */}
              <div
                onClick={() => hasSubItems && !isCollapsed && setIsWalletOpen(!isWalletOpen)}
                className="relative"
              >
                <Link
                  to={hasSubItems ? '#' : item.link}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-amber-600 text-white shadow-md' : 'text-amber-800 hover:bg-amber-200'
                  } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={isActive ? 'text-white' : 'text-amber-700'}>{item.icon}</div>
                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                  </div>

                  {!isCollapsed && (
                    <div className="flex items-center">
                      {item.count !== null && (
                        <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white text-amber-600' : 'bg-amber-600 text-white'}`}>
                          {item.count}
                        </span>
                      )}
                      {hasSubItems && (
                        isWalletOpen ? <FaChevronUp className="ml-2 text-xs" /> : <FaChevronDown className="ml-2 text-xs" />
                      )}
                    </div>
                  )}
                </Link>
              </div>

              {/* Submenu Items */}
              {!isCollapsed && hasSubItems && isWalletOpen && (
                <div className="mt-1 ml-9 space-y-1 border-l-2 border-amber-300">
                  {item.subItems.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.link}
                      className={`block p-2 pl-4 text-sm rounded-r-lg transition-colors ${
                        location.pathname === sub.link 
                        ? 'bg-amber-200 text-amber-900 font-bold' 
                        : 'text-amber-700 hover:bg-amber-100'
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