import React from "react";
import KpiCard from "../../components/pages/admin/KpiCards";
import CompactCommissionConfig from "../../components/pages/Comission";
import { GenericTable } from "./GenericTable";
import { commissionData, commissionTable } from "../../utils/Constants";

function CommissionMgt() {
    const KpiData = [
        { id: "1", title: "Total Commission", value: "320" },
        { id: "2", title: "Paid Commission", value: "20" },
        { id: "3", title: "Pending Commission", value: "20" },
        { id: "4", title: "Rejected/On hold", value: "20" },
    ];

    return (
        // Added a main container with padding that scales with screen size
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            
            {/* Header Section: Better spacing and text alignment */}
            <div className="mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Commission Management
                </h1>
                <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                    Track, approve and manage commission earned from product sales and referrals.
                </p>
            </div>

            {/* KPI Grid: Using a more fluid grid system */}
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
                {KpiData.map((item) => (
                    <KpiCard key={item.id} {...item} />
                ))}
            </div>

            {/* Configuration Section: Added margin-top for breathing room */}
            <div className="mt-10">
                <CompactCommissionConfig />
            </div>

            {/* Table Section: Wrapped in a container to handle horizontal scrolling */}
            <div className="mt-10 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <GenericTable 
                        title="Commission Details"
                        columns={commissionTable} 
                        data={commissionData}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommissionMgt;