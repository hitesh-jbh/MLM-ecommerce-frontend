import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const WalletBalance = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  // New state for level income view
  const [levelIncomeView, setLevelIncomeView] = useState('All');

  const walletData = {
    totalBalance: 460.75,
    availableBalance: 410.75,
    pendingBalance: 50.00,
    earnings: {
      directReferral: 120,
      levelIncome: 210.75,
      teamMatching: 80
    },
    levelIncome: [
      { level: 'Level 1', members: 12, earnings: 75.00, withdrawals: 25.00, netEarnings: 50.00 },
      { level: 'Level 2', members: 38, earnings: 65.00, withdrawals: 10.00, netEarnings: 55.00 },
      { level: 'Level 3', members: 40, earnings: 60.00, withdrawals: 15.00, netEarnings: 45.00 },
      { level: 'Level 4', members: 25, earnings: 45.00, withdrawals: 20.00, netEarnings: 25.00 },
      { level: 'Level 5', members: 15, earnings: 35.00, withdrawals: 10.00, netEarnings: 25.00 }
    ],
    levelWithdrawals: [
      { level: 'Level 1', date: '22 Dec, 2025', amount: 10.00 },
      { level: 'Level 2', date: '21 Dec, 2025', amount: 5.00 },
      { level: 'Level 1', date: '20 Dec, 2025', amount: 15.00 },
      { level: 'Level 3', date: '19 Dec, 2025', amount: 15.00 }
    ],
    recentTransactions: [
      { type: 'Level 1 Referral Bonus', date: '22 Dec, 2025', amount: 75.00, isPositive: true },
      { type: 'Withdrawal', date: '21 Dec, 2025', amount: 50.00, isPositive: false },
      { type: 'Level 2 Bonus', date: '20 Dec, 2025', amount: 65.00, isPositive: true },
      { type: 'Level 3 Bonus', date: '19 Dec, 2025', amount: 60.00, isPositive: true }
    ]
  };

  // Calculate totals based on active view
  const getLevelTotals = (viewType) => {
    if (viewType === 'Earnings') {
      return walletData.levelIncome.reduce((sum, level) => sum + level.earnings, 0);
    } else if (viewType === 'Withdrawals') {
      return walletData.levelIncome.reduce((sum, level) => sum + level.withdrawals, 0);
    } else {
      return walletData.levelIncome.reduce((sum, level) => sum + level.netEarnings, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gray-400 rounded mr-3"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Wallet Balance</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Track your earnings and withdrawals</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-gray-700 font-semibold mb-1">Wallet Balance</h2>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">${walletData.totalBalance.toFixed(2)}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-700 text-sm sm:text-base">Available Balance</span>
              <span className="ml-auto font-semibold text-green-600">${walletData.availableBalance.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-gray-700 text-sm sm:text-base">Pending Balance</span>
              <span className="ml-auto font-semibold text-yellow-600">${walletData.pendingBalance.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="bg-gray-600 hover:bg-black text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
            >
              Withdraw
            </button>
            <button 
              onClick={() => setShowAddFundsModal(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
            >
              Add Funds
            </button>
            <button 
              onClick={() => setShowHistoryModal(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
            >
              Withdrawal History
            </button>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Earnings Breakdown</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View Details</button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm sm:text-base">Direct Referral Bonus – Level Income (1–5)</span>
              <span className="font-semibold text-gray-900">${walletData.earnings.directReferral.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm sm:text-base">Team Matching Bonus –</span>
              <span className="font-semibold text-gray-900">${walletData.earnings.levelIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm sm:text-base">Team Matching Bonus-</span>
              <span className="font-semibold text-gray-900">${walletData.earnings.teamMatching.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Level Income */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Level Income</h2>
            <div className="text-sm font-semibold text-blue-600">
              Total: ${getLevelTotals(levelIncomeView).toFixed(2)}
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
            {['All', 'Earnings', 'Withdrawals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setLevelIncomeView(tab)}
                className={`px-4 py-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  levelIncomeView === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Level Income Table */}
          <div className="space-y-3">
            {levelIncomeView === 'All' && (
              <>
                {walletData.levelIncome.map((level, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{level.level}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">{level.members} members</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-4">
                        <span className="text-green-600 text-sm">+${level.earnings.toFixed(2)}</span>
                        <span className="text-red-600 text-sm">-${level.withdrawals.toFixed(2)}</span>
                        <span className="font-semibold text-blue-600 text-sm sm:text-base">${level.netEarnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {levelIncomeView === 'Earnings' && (
              <>
                {walletData.levelIncome.map((level, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{level.level}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">{level.members} members</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpCircle className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600 text-sm sm:text-base">${level.earnings.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {levelIncomeView === 'Withdrawals' && (
              <>
                {walletData.levelIncome.map((level, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{level.level}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">{level.members} members</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDownCircle className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-red-600 text-sm sm:text-base">${level.withdrawals.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Transactions</h2>
            
            {/* Transaction Type Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['All', 'Earnings', 'Withdrawals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            {walletData.recentTransactions
              .filter(transaction => {
                if (activeTab === 'All') return true;
                if (activeTab === 'Earnings') return transaction.isPositive;
                if (activeTab === 'Withdrawals') return !transaction.isPositive;
                return true;
              })
              .map((transaction, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {transaction.isPositive ? (
                        <ArrowUpCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4 text-red-600" />
                      )}
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{transaction.type}</p>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm ml-6">{transaction.date}</p>
                  </div>
                  <span className={`font-semibold text-sm sm:text-base ${
                    transaction.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.isPositive ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Withdraw Funds</h3>
            <p className="text-gray-600 mb-4">Available Balance: ${walletData.availableBalance.toFixed(2)}</p>
            <input 
              type="number" 
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Funds Modal */}
      {showAddFundsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Funds</h3>
            <input 
              type="number" 
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddFundsModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddFundsModal(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Withdrawal History</h3>
            <div className="space-y-3">
              {walletData.recentTransactions
                .filter(t => !t.isPositive)
                .map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.type}</p>
                      <p className="text-gray-600 text-sm">{transaction.date}</p>
                    </div>
                    <span className="font-semibold text-red-600">-${transaction.amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
            <button 
              onClick={() => setShowHistoryModal(false)}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletBalance;