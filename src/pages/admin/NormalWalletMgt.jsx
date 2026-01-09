import React from "react";
import KpiCard from "./KpiCards";
import { GenericTable } from "./GenericTable";
import TableActionFooter from "./admin/TableActionFooter";
import { walletData, walletTable } from "../../utils/Constants";

function NormalWalletMgt() {
    const KpiData = [
        { id: "1", title: "Total Wallet Balance", value: "$12345" },
        { id: "2", title: "Available Balance", value: "$12345" },
        { id: "3", title: "Pending Balance", value: "$12345" },
        // { id: "4", title: "Pending bonus", value: "20" },
    ];

    return (
        /* 1. Added padding (p-4) and responsive margins (md:ml-64) 
           to account for your fixed sidebar.
        */
        <div className="p-4 md:p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin-Wallet Management</h1>
            
            {/* KPI Section: Adjusted grid for better flow on mobile */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {KpiData.map((item) => (
                    <KpiCard key={item.id} {...item} />
                ))}
            </div>
            

            {/* Table Section: Wrapped in a container for overflow handling */}
            <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <GenericTable 
                        title="Wallet Tranactions" 
                        columns={walletTable} 
                        data={walletData} 
                    />
                </div>
                
                {/* Footer Section: Adding padding to match the table look */}
                <div className="p-4 border-t border-gray-50">
                    <TableActionFooter data={walletData} storageKey="wallet-tx" />
                </div>
            </div>
        </div>
    );
}

export default NormalWalletMgt;