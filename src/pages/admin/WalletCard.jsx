import React from "react";

const WalletCard = ({ orders, pending, onView }) => {
  return (
    <div className="w-40 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">Wallet Balances</h2>
      <div className="flex justify-between mb-1 text-sm text-gray-600">
        <span>Orders</span>
        <span className="font-medium">₹{orders}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm text-gray-600">
        <span>Pending</span>
        <span className="font-medium">₹{pending}</span>
      </div>
      <button
        onClick={onView}
        className="w-full py-1 text-xs font-medium text-white bg-purple-500 rounded hover:bg-purple-600"
      >
        View Wallets
      </button>
    </div>
  );
};

export default WalletCard;
