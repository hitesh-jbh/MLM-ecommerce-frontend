import React from "react";
import KpiCard from "../../components/admin_component/KpiCards";
import { GenericTable } from "../../components/partials/table/GenericTable";
import TableActionFooter from "./TableActionFooter";
import { workWalletData, workWalletTable } from "../../utils/Constants";

function WorkWalletMgt() {
    const KpiData = [
        { id: "1", title: "Total MLM Income", value: "320" },
        { id: "2", title: "Referral Income", value: "20" },
        { id: "3", title: "Level Income", value: "20" },
        { id: "4", title: "Pending bonus", value: "20" },
    ];

    return (
        /* 1. Added padding (p-4) and responsive margins (md:ml-64) 
           to account for your fixed sidebar.
        */
        <div className="p-4 md:p-6 space-y-6">
            
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
                        title="Work Wallet Overview" 
                        columns={workWalletTable} 
                        data={workWalletData} 
                    />
                </div>
                
                {/* Footer Section: Adding padding to match the table look */}
                <div className="p-4 border-t border-gray-50">
                    <TableActionFooter data={workWalletData} storageKey="work-wallet" />
                </div>
            </div>
        </div>
    );
}

export default WorkWalletMgt;