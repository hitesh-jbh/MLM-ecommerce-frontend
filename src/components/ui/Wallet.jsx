import React from 'react';
import StepBar from './ProgessBar/stepBar';
import { Wallet as WalletIcon, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';
import { normalWalletDetail } from '../../utils/Constants';

const WalletPage = () => {
  const summaryData = normalWalletDetail;

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen text-black font-sans">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        
        {/* SECTION 1: Commission Summary */}
        <section>
          <div className="flex flex-col lg:flex-row border-2 border-black rounded-none overflow-hidden">
            {/* Left Child: Heading & Stats */}
            <div className="flex-1 p-6 md:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-6 md:mb-8 italic">
                {summaryData.commission.title}
              </h1>
              {/* Responsive Grid: 1 col on mobile, 3 on tablet+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                <StatBox label="Balance" value={summaryData.commission.balance} primary />
                <StatBox label="Pending" value={summaryData.commission.pending} />
                <StatBox label="Paid" value={summaryData.commission.paid} />
              </div>
            </div>

            {/* Right Child: Progress & Summary */}
            <div className="flex-1 p-6 md:p-8 bg-gray-50 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
                  <span className="text-[16px] font-bold uppercase tracking-widest text-gray-900">Earnings Progress</span>
                  <span className="text-xl font-black">${summaryData.commission.totalEarned.toLocaleString()} Total</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                <StatBox label="Balance" value={summaryData.commission.totalEarned} />
                <StatBox label="Pending" value={summaryData.commission.pending} />
                <StatBox label="Paid" value={summaryData.commission.paid} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Normal Wallet */}
        <section>
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
            <div className="w-8 h-[3px] bg-black"></div>
            {summaryData.normalWallet.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {summaryData.normalWallet.stats.map((item, index) => (
              <div key={index} className="group border-2 border-black p-6 transition-all duration-300 cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2 border-2 border-current rounded-full">
                    {item.icon}
                  </div>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">{item.label}</p>
                <p className="text-2xl md:text-3xl font-black mt-1">${item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

/* --- Responsive Sub-Components --- */

const StatBox = ({ label, value, primary = false }) => (
  <div className="border-l-4 border-black pl-4 sm:border-0 sm:pl-0">
    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-widest">{label}</p>
    <p className={`text-2xl md:text-3xl font-black ${primary ? 'text-black' : 'text-gray-700'}`}>
      ${value.toLocaleString()}
    </p>
  </div>
);

const MiniDetail = ({ label, val }) => (
  <div className="text-center">
    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{label}</p>
    <p className="text-xs md:text-sm font-black italic">${val.toLocaleString()}</p>
  </div>
);

export default WalletPage;