import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StatsDashboard() {
  const [stats, setStats] = useState({
    walletBalance: 460.75,
    totalEarnings: 1520,
    totalOrders: 80,
    activeReferrals: 6,
    resentRewards: 0
  });

  const statCards = [
    { label: 'Commission Wallet Balance', link: "/wallet-balance", value: `$${stats.walletBalance.toFixed(2)}`, key: 'walletBalance' },
    { label: 'Total Earnings', link: "#", value: stats.totalEarnings, key: 'totalEarnings' },
    { label: 'Total Orders', link: "/your-order", value: stats.totalOrders, key: 'totalOrders' },
    { label: 'Active Referrals', link: "#", value: stats.activeReferrals, key: 'activeReferrals' },
    { label: 'Resent Rewards', link: "#", value: stats.resentRewards, key: 'resentRewards' }
  ];

  const handleChange = (key, value) => {
    setStats(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  return (
    
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Dashboard Stats</h1>
        
        {/* Stats Display */}
        <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-2xl shadow-2xl p-4 md:p-6 mb-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {statCards.map((card, index) => (
              <Link to={card.link} key={card.key}><div
                key={index}
                className="bg-white rounded-xl p-4 md:p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-xs md:text-sm text-gray-600 font-medium mb-2 whitespace-nowrap">
                  {card.label}
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
                  {card.value}
                </div>
              </div></Link>
            ))}
          </div>
        </div>

      </div>
    
  );
}