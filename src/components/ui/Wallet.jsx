import React from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { userCommissionDashboaed } from '../../utils/service/apiService'; 
import { Wallet as WalletIcon, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const WalletPage = () => {
  const token = useSelector((state) => state.auth.token);
  
  const { data: commissionData, isLoading } = useSWR(
    token ? ["/api/commission/commission-dashboard", token] : null,
    ([_, tkn]) => userCommissionDashboaed(tkn).then(res => res.data.data)
  );

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-tighter">Initializing...</div>;

  const stats = {
    available: commissionData?.available || 0,
    onHold: commissionData?.onHold || 0,
    paidOut: commissionData?.paidOut || 0,
    totalEarned: commissionData?.totalLifetimeEarnings || 0,
    mainWallet: commissionData?.mainWallet || 0,
    pendingClearance: commissionData?.pendingClearance || 0,
    historicalPayouts: commissionData?.historicalPayouts || 0,
  };

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen text-black font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Main Hero Summary - Reduced Size */}
        <section>
          <div className="flex flex-col lg:flex-row border-[3px] border-black rounded-none overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Left Side: Breakdown (Stacked to prevent overlap) */}
            <div className="flex-[1.5] p-6 md:p-8 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black bg-white">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-8 italic">Commission Dashboard</h1>
              
              <div className="flex flex-col gap-y-6">
                <StatBox label="Available" value={stats.available} primary />
                <StatBox label="On Hold" value={stats.onHold} />
                <StatBox label="Paid Out" value={stats.paidOut} />
              </div>
            </div>

            {/* Right Side: Total Earnings - Compacted */}
            <div className="flex-1 p-6 md:p-8 bg-[#F8F9FA] flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Life-Time Earnings</p>
              <p className="text-4xl md:text-5xl font-black tracking-tighter">${Number(stats.totalEarned).toLocaleString()}</p>
              <div className="mt-3 flex items-center gap-2 text-green-600 font-bold text-[11px] uppercase">
                <TrendingUp size={14} /> <span>Live Tracking Enabled</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Breakdown Cards */}
        <section>
          <h2 className="text-lg font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-black"></span> Detailed Asset Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <DetailCard icon={<WalletIcon size={20}/>} label="Main Wallet" value={stats.mainWallet} sub="Ready to withdraw" />
            <DetailCard icon={<Clock size={20}/>} label="Pending Clearance" value={stats.pendingClearance} sub="Awaiting verification" />
            <DetailCard icon={<CheckCircle size={20}/>} label="Historical Payouts" value={stats.historicalPayouts} sub="Transferred to bank" />
          </div>
        </section>
      </div>
    </div>
  );
};

/* Smaller StatBox to handle stacking */
const StatBox = ({ label, value, primary }) => (
  <div className="border-l-4 border-black pl-4 py-1">
    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">{label}</p>
    <p className={`text-2xl md:text-3xl font-black leading-none ${primary ? 'text-black' : 'text-gray-500'}`}>
      ${Number(value).toLocaleString()}
    </p>
  </div>
);

/* Compacted DetailCard */
const DetailCard = ({ icon, label, value, sub }) => (
  <div className="group border-2 border-black p-6 transition-all hover:bg-black hover:text-white cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
    <div className="p-2 border-2 border-current rounded-full w-fit mb-4 group-hover:bg-white group-hover:text-black transition-colors">
      {icon}
    </div>
    <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
    <p className="text-2xl font-black mb-1">${Number(value).toLocaleString()}</p>
    <p className="text-[9px] font-bold uppercase tracking-tighter opacity-40">{sub}</p>
  </div>
);

export default WalletPage;