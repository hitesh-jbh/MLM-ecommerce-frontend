import React from 'react';
import KpiCard from '../../components/admin_component/KpiCards';

export default function WalletKpiGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <KpiCard key={item.id} {...item} />
      ))}
    </div>
  );
}
