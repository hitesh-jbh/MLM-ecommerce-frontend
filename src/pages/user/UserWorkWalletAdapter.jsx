import React from 'react';
import useSWR from 'swr';
import WalletKpiGrid from '../../components/wallet/WalletKpiGrid';
import { userCommissionTable } from '../../utils/constants';
import { GenericTable } from '../../components/partials/table/GenericTable';
import api from '../../utils/api/axiosInstance';
import { Loader2 } from 'lucide-react';

const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
});

const formatCurrency = (value) => {
  const amount = Number(value);
  return inrCurrencyFormatter.format(Number.isFinite(amount) ? amount : 0);
};

export default function UserWorkWalletAdapter({ token }) {
  // Fetch user's commission history (user-specific)
  const { data: commissionsRes, error, isValidating: commLoading } = useSWR(
    token ? ['/api/commission/list', token] : null,
    ([url, t]) => api.get(url, { headers: { Authorization: `Bearer ${t}` } }).then(res => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 10000,
    }
  );

  const commissions = commissionsRes?.commissions || commissionsRes?.data || [];

  // KPIs
  const totalMLMIncome = commissions.reduce((s, c) => s + Number(c.amount || 0), 0);
  const directReferral = commissions.filter(c => Number(c.level) === 1).reduce((s, c) => s + Number(c.amount || 0), 0);
  const levelIncome = commissions.filter(c => Number(c.level) > 1).reduce((s, c) => s + Number(c.amount || 0), 0);
  const pendingCommission = commissions.filter(c => c.status === 'pending').reduce((s, c) => s + Number(c.amount || 0), 0);

  const KpiData = [
    { id: '1', title: 'Total MLM Income', value: formatCurrency(totalMLMIncome) },
    { id: '2', title: 'Direct Referral Income', value: formatCurrency(directReferral) },
    { id: '3', title: 'Level Income', value: formatCurrency(levelIncome) },
    { id: '4', title: 'Pending Commission', value: formatCurrency(pendingCommission) },
  ];

  if (commLoading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
    </div>
  );

  if (error) return (
    <div className="p-6 bg-white rounded shadow">Error loading commissions</div>
  );

  return (
    <div className="space-y-6">
      <WalletKpiGrid items={KpiData} />

      <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
        <div className="overflow-x-auto p-4">
          <GenericTable title="Work Wallet - Commission History" columns={userCommissionTable} data={commissions || []} />
        </div>
      </div>
    </div>
  );
}
