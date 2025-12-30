import React from "react";
import Sidebar from "./Sidebar";
import GenericTable from "./GenericTable";
import TableActionFooter from "./TableActionFooter";
import UserProfile from "../../ui/UserProfile";
import { referNetworkData, salesData, walletData, walletTable, workWalletData, workWalletTable } from "../../../utils/Constants";
import { Outlet } from "react-router-dom";
import Icons from "../../ui/Icon";

const monthlySales = salesData;

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false); // Mobile toggle state

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] relative">
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 bg-amber-600 rounded-lg text-white shadow-md"
          >
            <Icons icon="heroicons:bars-3-bottom-left-solid" size={20} />
          </button>
          <span className="font-bold text-amber-900">Admin Panel</span>
          <div className="w-8 h-8 rounded-full bg-gray-200" /> {/* Placeholder for Profile */}
        </header>

        {/* Page Content: Now has full width on mobile */}
        <main className="p-4 md:p-8 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;




// import React from 'react'
// import LineChart from '../../ui/LineChart'
// import { commissionData, commissionTable, referNetworkData, salesData, treeData, walletData, walletTable, workWalletData, workWalletTable } from '../../../utils/Constants';
// import HierarchyGraph from '../../ui/HierachyGraph';
// import UserProfile from '../../ui/UserProfile';
// import GenericTable from './GenericTable';
// import { orderData, orderTable, userData, userTable, productData, productTable } from '../../../utils/Constants';
// import ReferNetwork from '../../ui/ReferNetwork'
// import TableActionFooter from './TableActionFooter';
// import Sidebar from './Sidebar';

// const monthlySales = salesData;
// const referralData = treeData;

// const AdminDashboard = () => {
//   return (
//     <div className='min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col gap-8'>
      
//       {/* Orders Section */}
//       <section>
//         <GenericTable 
//           title="Orders" 
//           columns={orderTable} 
//           data={orderData} 
//         />
//       </section>

//       {/* Products Section */}
//       <section>
//         <GenericTable 
//           title="Products Table" 
//           columns={productTable} 
//           data={productData} 
//         />
//       </section>

//       {/* All users */}
//       <section>
//         <GenericTable 
//           title="All Users" 
//           columns={userTable} 
//           data={userData} 
//         />
//       </section>

//       {/* Commission Mgt*/}
//       <section>
//         <GenericTable 
//           title="Users" 
//           columns={commissionTable} 
//           data={commissionData} 
//         />
//       </section>

//       {/* Wallet */}
//       <section>
//         <GenericTable 
//           title="Wallet Transaction" 
//           columns={walletTable} 
//           data={walletData} 
//         />
//         <TableActionFooter 
//           data={walletData} 
//           storageKey="wallet-tx" 
//         />
//       </section>

//       {/*Work Wallet Overview */}
//       <section>
//         <GenericTable 
//           title="Work Wallet Overview" 
//           columns={workWalletTable} 
//           data={workWalletData} 
//         />
//         <TableActionFooter 
//           data={workWalletData} 
//           storageKey="work-wallet" 
//         />
//       </section>

//       <section>
//         <ReferNetwork data={referNetworkData}/>
//       </section>
      
//     </div>
//   )
// }

// export default AdminDashboard