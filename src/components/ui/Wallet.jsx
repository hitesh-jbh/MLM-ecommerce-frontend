import React from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
// Import the new service function
import { userCommissionDashboaed } from '../../utils/service/apiService'; 
import { Wallet as WalletIcon, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const WalletPage = () => {
  const token = useSelector((state) => state.auth.token);
  
  // 1. Updated SWR to use the Commission Dashboard API
  const { data: commissionData, isLoading, error } = useSWR(
    token ? ["/api/commission/commission-dashboard", token] : null,
    ([_, tkn]) => userCommissionDashboaed(tkn).then(res => res.data.data)
  );

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-tighter">Initializing Dashboard...</div>;

  // 2. Updated data mapping to match your new API response keys
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
    <div className="p-4 md:p-8 bg-white min-h-screen text-black font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Main Hero Summary */}
        <section>
          <div className="flex flex-col lg:flex-row border-4 border-black rounded-none overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex-[2] p-8 md:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-black">
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-10 italic">Commission Dashboard</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* 3. Using the new mapped keys */}
                <StatBox label="Available" value={stats.available} primary />
                <StatBox label="On Hold" value={stats.onHold} />
                <StatBox label="Paid Out" value={stats.paidOut} />
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12 bg-[#F3F4F6] flex flex-col justify-center text-center lg:text-left">
              <p className="text-[12px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Life-Time Earnings</p>
              <p className="text-5xl md:text-6xl font-black tracking-tighter">${Number(stats.totalEarned).toLocaleString()}</p>
              <div className="mt-4 flex items-center gap-2 text-green-600 font-bold text-sm">
                <TrendingUp size={16} /> <span>Live Tracking Enabled</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Breakdown Cards */}
        <section>
          <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
            <span className="w-12 h-1 bg-black"></span> Detailed Asset Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 4. Mapping detailed fields */}
            <DetailCard icon={<WalletIcon />} label="Main Wallet" value={stats.mainWallet} sub="Ready to withdraw" />
            <DetailCard icon={<Clock />} label="Pending Clearance" value={stats.pendingClearance} sub="Awaiting verification" />
            <DetailCard icon={<CheckCircle />} label="Historical Payouts" value={stats.historicalPayouts} sub="Transferred to bank" />
          </div>
        </section>
      </div>
    </div>
  );
};

/* Components remain the same but added Number() conversion for safety */
const StatBox = ({ label, value, primary }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
    <p className={`text-3xl font-black ${primary ? 'text-black' : 'text-gray-500'}`}>${Number(value).toLocaleString()}</p>
  </div>
);

const DetailCard = ({ icon, label, value, sub }) => (
  <div className="group border-2 border-black p-8 transition-all hover:bg-black hover:text-white cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
    <div className="p-3 border-2 border-current rounded-full w-fit mb-6 group-hover:bg-white group-hover:text-black transition-colors">{icon}</div>
    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
    <p className="text-3xl font-black mb-2">${Number(value).toLocaleString()}</p>
    <p className="text-[10px] font-bold uppercase tracking-tighter opacity-40">{sub}</p>
  </div>
);

export default WalletPage;


// import React from 'react';
// import StepBar from './bar/StepBar';
// import { Wallet as WalletIcon, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';
// import { normalWalletDetail } from '../../utils/Constants';

// const WalletPage = () => {
//   const summaryData = normalWalletDetail;

//   return (
//     <div className="p-4 md:p-8 bg-white min-h-screen text-black font-sans">
//       <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        
//         {/* SECTION 1: Commission Summary */}
//         <section>
//           <div className="flex flex-col lg:flex-row border-2 border-black rounded-none overflow-hidden">
//             {/* Left Child: Heading & Stats */}
//             <div className="flex-1 p-6 md:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
//               <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic">
//                 {summaryData.commission.title}
//               </h1>
//               {/* Responsive Grid: 1 col on mobile, 3 on tablet+ */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
//                 <StatBox label="Balance" value={summaryData.commission.balance} primary />
//                 <StatBox label="Pending" value={summaryData.commission.pending} />
//                 <StatBox label="Paid" value={summaryData.commission.paid} />
//               </div>
//             </div>

//             {/* Right Child: Progress & Summary */}
//             <div className="flex-1 p-6 md:p-8 bg-gray-50 flex flex-col justify-between">
//               <div>
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
//                   <span className="text-[16px] font-bold uppercase tracking-widest text-gray-900">Earnings Progress</span>
//                   <span className="text-xl font-black">${summaryData.commission.totalEarned.toLocaleString()} Total</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
//                 <StatBox label="Balance" value={summaryData.commission.totalEarned} />
//                 <StatBox label="Pending" value={summaryData.commission.pending} />
//                 <StatBox label="Paid" value={summaryData.commission.paid} />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* SECTION 2: Normal Wallet */}
//         <section>
//           <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
//             <div className="w-8 h-[3px] bg-black"></div>
//             {summaryData.normalWallet.title}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//             {summaryData.normalWallet.stats.map((item, index) => (
//               <div key={index} className="group border-2 border-black p-6 transition-all duration-300 cursor-pointer">
//                 <div className="flex justify-between items-start mb-6">
//                   <div className="p-2 border-2 border-current rounded-full">
//                     {item.icon}
//                   </div>
//                 </div>
//                 <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">{item.label}</p>
//                 <p className="text-2xl md:text-3xl font-black mt-1">${item.value.toLocaleString()}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// };

// /* --- Responsive Sub-Components --- */

// const StatBox = ({ label, value, primary = false }) => (
//   <div className="border-l-4 border-black pl-4 sm:border-0 sm:pl-0">
//     <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">{label}</p>
//     <p className={`text-2xl md:text-3xl font-black ${primary ? 'text-black' : 'text-gray-700'}`}>
//       ${value.toLocaleString()}
//     </p>
//   </div>
// );

// const MiniDetail = ({ label, val }) => (
//   <div className="text-center">
//     <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{label}</p>
//     <p className="text-xs md:text-sm font-black italic">${val.toLocaleString()}</p>
//   </div>
// );

// export default WalletPage;