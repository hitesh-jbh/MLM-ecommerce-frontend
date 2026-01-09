import React, { useState } from 'react';
import Icons from '../../components/ui/Icon';

const TableActionFooter = ({ data = [], storageKey = "default" }) => {
  // Use a unique key to keep "Withdraw" and "Purchase" states separate for each table
  const [activeTab, setActiveTab] = useState('withdraw');

  const handleDownload = () => {
    if (data.length === 0) return alert("No data available to download");
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${storageKey}-statement-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4 mt-6 w-full overflow-x-auto pb-2">
      <div className="flex flex-row gap-3 min-w-max">
        {/* Withdraw Button */}
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
            activeTab === 'withdraw'
              ? 'bg-[#7086E0] text-white border-[#7086E0] shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Icons icon="heroicons:wallet-solid" size={16} />
          Withdraw
        </button>

        {/* Use for Purchase Button */}
        <button
          onClick={() => setActiveTab('purchase')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
            activeTab === 'purchase'
              ? 'bg-[#7086E0] text-white border-[#7086E0] shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Icons icon="heroicons:shopping-cart-solid" size={16} />
          Use for Purchase
        </button>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all min-w-max"
      >
        <Icons icon="heroicons:arrow-down-tray-solid" size={16} />
        Download Statement
      </button>
    </div>
  );
};
export default TableActionFooter;


// import React, { useState } from 'react';
// import { WalletCards, ShoppingCart, Download } from 'lucide-react';

// const TableActionFooter = ({ data = [] }) => {
//   const [activeTab, setActiveTab] = useState('withdraw');

//   // Function to trigger download (Example: JSON download)
//   const handleDownload = () => {
//     if (data.length === 0) return alert("No data available to download");
    
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `statement-${new Date().toISOString().split('T')[0]}.json`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex flex-row items-center justify-between gap-4 mt-6 w-full overflow-x-auto pb-2">
//       {/* Action Group */}
//       <div className="flex flex-row gap-3 min-w-max">
//         <button
//           onClick={() => setActiveTab('withdraw')}
//           className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
//             activeTab === 'withdraw'
//               ? 'bg-[#7086E0] text-white border-[#7086E0] shadow-sm'
//               : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
//           }`}
//         >
//           <WalletCards size={16} />
//           Withdraw
//         </button>

//         <button
//           onClick={() => setActiveTab('purchase')}
//           className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all border ${
//             activeTab === 'purchase'
//               ? 'bg-[#7086E0] text-white border-[#7086E0] shadow-sm'
//               : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
//           }`}
//         >
//           <ShoppingCart size={16} />
//           Use for Purchase
//         </button>
//       </div>

//       {/* Download Button */}
//       <button
//         onClick={handleDownload}
//         className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all min-w-max"
//       >
//         <Download size={16} />
//         Download Statement
//       </button>
//     </div>
//   );
// };

// export default TableActionFooter;

