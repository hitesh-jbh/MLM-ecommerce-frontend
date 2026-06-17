import React, { useState } from 'react';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

const UserWorkWallet = React.lazy(() => import('./UserWorkWalletAdapter.jsx'));
const UserNormalWallet = React.lazy(() => import('./UserNormalWalletAdapter.jsx'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-40">
    <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
  </div>
);

export default function UserWallet() {
  const [active, setActive] = useState('work');
  const { token } = useSelector((state) => state.auth || {});

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black">Wallet</h1>
          <div className="flex bg-white rounded-lg p-1">
            <button
              onClick={() => setActive('work')}
              className={`px-4 py-2 text-sm font-semibold rounded ${active === 'work' ? 'bg-black text-white' : 'text-gray-600'}`}>
              Work Wallet
            </button>
            <button
              onClick={() => setActive('normal')}
              className={`px-4 py-2 text-sm font-semibold rounded ${active === 'normal' ? 'bg-black text-white' : 'text-gray-600'}`}>
              Normal Wallet
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-4">
          <Suspense fallback={<PageLoader />}>
            {active === 'work' ? <UserWorkWallet token={token} /> : <UserNormalWallet token={token} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
