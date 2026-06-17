import React from 'react';
import { GenericTable } from '../../components/partials/table/GenericTable';
import { walletTable } from '../../utils/constants';

export default function WalletTransactions({ title = 'Recent Wallet Transactions', data = [] }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative p-6">
      <div className="overflow-x-auto">
        <GenericTable title={title} columns={walletTable} data={data} />
      </div>
    </div>
  );
}
