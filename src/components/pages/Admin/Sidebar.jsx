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
  FaHome
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Current location track करने के लिए

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaTachometerAlt />, count: null, link: '/' },
    { id: 'orders', name: 'Orders', icon: <FaShoppingCart />, count: 12, link: '/admin/orderoverview' },
    { id: 'products', name: 'Products', icon: <FaProductHunt />, count: 45, link: '/admin/product' },
    { id: 'commissions', name: 'Commissions', icon: <FaMoneyCheckAlt />, count: 8, link: '/admin/comission' },
    { id: 'reports', name: 'Reports', icon: <FaChartBar />, count: null, link: '/reports' },
    { id: 'wallets', name: 'Wallets', icon: <FaWallet />, count: null, link: '/wallets' },
    { id: 'users', name: 'Users', icon: <FaUsers />, count: 234, link: '/admin/chart' },
    { id: 'notification', name: 'Notification', icon: <FaBell />, count: 3, link: '/admin/notifications' },
    { id: 'Marketing Compaigns', name: 'Marketing Compaigns', icon: <FaBell />, count: 3, link: '/admin/compagins' },
    { id: 'mlm', name: 'MLM Management', icon: <FaSitemap />, count: null, link: '/mlm' },
    { id: 'hierarchy', name: 'Hierarchy', icon: <FaNetworkWired />, count: null, link: '/hierarchy' },
    { id: 'setting', name: 'Setting', icon: <FaCog />, count: null, link: '/setting' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-full ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-gradient-to-b from-amber-50 to-amber-100 border-r border-amber-200 shadow-lg z-50`}>
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-amber-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-amber-600 rounded-lg">
                <FaHome className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-amber-900">Admin Panel</h2>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/">
              <div className="p-2 bg-amber-600 rounded-lg">
                <FaHome className="w-6 h-6 text-white" />
              </div>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-amber-200 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <FaChevronRight className="w-4 h-4 text-amber-700" />
            ) : (
              <FaChevronLeft className="w-4 h-4 text-amber-700" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-120px)]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={item.id}
              to={item.link}
              className={`block w-full ${isCollapsed ? 'flex justify-center' : 'flex justify-between items-center'} p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-800 hover:bg-amber-200 hover:text-amber-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${isActive ? 'text-white' : 'text-amber-700'}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </div>
              {!isCollapsed && item.count !== null && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  isActive
                    ? 'bg-white text-amber-600'
                    : 'bg-amber-600 text-white'
                }`}>
                  {item.count}
                </span>
              )}
              {isCollapsed && item.count !== null && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-200 bg-amber-50">
          <div className="flex items-center space-x-3">
           
            <div className="flex-1">
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;