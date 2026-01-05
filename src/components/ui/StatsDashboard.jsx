import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function StatsDashboard() {
  const [stats] = useState({
    walletBalance: 460.75,
    totalEarnings: 1520,
    totalOrders: 80,
    activeReferrals: 6,
    resentRewards: 0
  });

  const statCards = [
    { label: 'Commission Wallet Balance', link: "/wallet-balance", value: `$${stats.walletBalance.toFixed(2)}`, key: 'walletBalance' },
    { label: 'Total Earnings', link: "#", value: stats.totalEarnings, key: 'totalEarnings' },
    { label: 'Total Orders', link: "#", value: stats.totalOrders, key: 'totalOrders' },
    { label: 'Active Referrals', link: "#", value: stats.activeReferrals, key: 'activeReferrals' },
    { label: 'Recent Rewards', link: "#", value: stats.resentRewards, key: 'resentRewards' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
        Dashboard Stats
      </h1>
      
      {/* Stats Display Container */}
      <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 rounded-3xl shadow-xl p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {statCards.map((card) => (
            <Link 
              to={card.link} 
              key={card.key}
              className="group block"
            >
              <div className="h-full bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                    {card.label}
                  </p>
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 truncate">
                    {card.value}
                  </h2>
                </div>
                
                {/* Visual indicator for mobile interactivity */}
                <div className="mt-4 flex items-center text-blue-600 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW DETAILS →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}