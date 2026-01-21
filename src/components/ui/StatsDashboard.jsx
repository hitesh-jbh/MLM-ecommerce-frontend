import React from 'react';
import { Link } from 'react-router-dom';

export default function StatsDashboard({ stats }) {
  
  const formatValue = (val, type = 'number') => {
    if (val === null || val === undefined) return "0";
    if (type === 'currency') {
      return `$${parseFloat(val).toFixed(2)}`;
    }
    return val;
  };

  const statCards = [
    { 
      label: 'Commission Wallet Balance', 
      link: "#", 
      value: formatValue(stats?.commissionWalletBalance, 'currency'), 
      key: 'walletBalance' 
    },
    { 
      label: 'Total Earnings', 
      link: "#", 
      value: formatValue(stats?.totalEarnings, 'currency'), 
      key: 'totalEarnings' 
    },
    { 
      label: 'Total Orders', 
      link: "#", 
      value: stats?.totalOrders || 0, 
      key: 'totalOrders' 
    },
    { 
      label: 'Active Referrals', 
      link: "#", 
      value: stats?.activeReferrals || 0, 
      key: 'activeReferrals' 
    },
    { 
      label: 'Recent Rewards', 
      link: "#", 
      value: stats?.recentRewards || 0, 
      key: 'recentRewards' 
    }
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
        Dashboard Stats
      </h1>
      
      <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 rounded-3xl shadow-xl p-4 md:p-8 border border-white">
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}