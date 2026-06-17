import React from 'react';
import { useQuery } from '@tanstack/react-query';
import WalletKpiGrid from '../../components/wallet/WalletKpiGrid';
import WalletTransactions from '../../components/wallet/WalletTransactions';
import { getWallet, getUserWalletTransactions } from '../../utils/service/apiService';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { requestWithdrawal} from '../../utils/service/apiService';

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });

const transactionFetcher = (token) =>
  getUserWalletTransactions(token, 50).then(res => res.data?.data || res.data || []);

const walletFetcher = (token) =>
  // normalize backend response shape: prefer res.data.data when available
  getWallet(token).then(res => res.data?.data || res.data || {});

export default function UserNormalWalletAdapter({ token }) {
  const {
    data: walletRes,
    isLoading: walletLoading,
    error: walletError,
  } = useQuery({
    queryKey: ['user-wallet', token],
    
    queryFn: () => walletFetcher(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: transactions = [],
    isLoading: txLoading,
    error: txError,
  } = useQuery({
    queryKey: ['user-wallet-transactions', token],
    queryFn: () => transactionFetcher(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const loading = walletLoading || txLoading;
  const error = walletError || txError;

  // Log wallet response shape for debugging
  console.log('UserNormalWalletAdapter - walletRes:', walletRes);

  const withdrawable = Number(walletRes?.withdrawable_balance || 0);
  const nonWithdrawable = Number(walletRes?.non_withdrawable_balance || 0);
  const totalBalance = withdrawable + nonWithdrawable;

  const totalEarnings = Array.isArray(transactions)
    ? transactions
        .filter(t => String(t.type).toLowerCase() === 'credit')
        .reduce((s, t) => s + Number(t.amount || 0), 0)
    : 0;

  const KpiData = [
    { id: 'w1', title: 'Withdrawable Balance', value: inr.format(withdrawable) },
    { id: 'w2', title: 'Non-Withdrawable Balance', value: inr.format(nonWithdrawable) },
    { id: 'w3', title: 'Total Wallet Balance', value: inr.format(totalBalance) },
    { id: 'w4', title: 'Total Earnings', value: inr.format(totalEarnings) },
  ];

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitWithdrawal = async () => {
    const amt = Number(withdrawAmount || 0);
    if (!amt || amt <= 0) return alert('Enter a valid amount');
    if (amt > withdrawable) return alert('Amount exceeds available balance');
    try {
      setSubmitting(true);
      await requestWithdrawal(token, { amount: amt });
      alert('Withdrawal request submitted');
      setShowWithdrawModal(false);
      setWithdrawAmount('');
    } catch (err) {
      alert(err?.response?.data?.message || err.message || 'Failed to submit');
    } finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded shadow">
        Error loading wallet. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WalletKpiGrid items={KpiData} />

      <div className="flex justify-end">
        <button onClick={() => setShowWithdrawModal(true)} className="bg-black text-white px-4 py-2 rounded">Withdraw Funds</button>
      </div>

      <div>
        {Array.isArray(transactions) && transactions.length > 0 ? (
          <WalletTransactions data={transactions} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-500">
            No transactions found for your wallet yet.
          </div>
        )}
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Withdraw Funds</h3>
            <p className="text-gray-600 mb-2">Available Balance: {inr.format(withdrawable)}</p>
            <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="Enter amount" className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
            <div className="flex gap-3">
              <button onClick={() => setShowWithdrawModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded">Cancel</button>
              <button onClick={submitWithdrawal} disabled={submitting} className="flex-1 bg-blue-600 text-white py-2 rounded">{submitting ? 'Submitting...' : 'Submit'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
