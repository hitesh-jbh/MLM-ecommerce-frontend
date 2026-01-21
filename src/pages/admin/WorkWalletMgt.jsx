import React from "react";
import useSWR from "swr";
import KpiCard from "../../components/admin_component/KpiCards";
import { GenericTable } from "../../components/partials/table/GenericTable";
import TableActionFooter from "./TableActionFooter";
import { workWalletTable } from "../../utils/Constants";
import { fetcher } from "../../utils/Api/axiosInstance"; // Ensure this is your axios fetcher
import { Loader2 } from "lucide-react";

function WorkWalletMgt() {
    // 1. Fetch Overview Data (for KPI cards)
    const { data: overviewRes, isLoading: overviewLoading } = useSWR(
        "/api/admin/work-wallet/overview",
        fetcher
    );

    // 2. Fetch List Data (for Table)
    const { data: listRes, isLoading: listLoading } = useSWR(
        "/api/admin/work-wallet/list",
        fetcher
    );

    // Extract data safely from responses
    const overviewData = overviewRes?.data || {};
    const tableData = listRes?.data || [];

    const KpiData = [
        { 
            id: "1", 
            title: "Total MLM Income", 
            value: overviewData.totalMLMIncome ? `₹${overviewData.totalMLMIncome}` : "₹0" 
        },
        { 
            id: "2", 
            title: "Referral Income", 
            value: overviewData.referralIncome ? `₹${overviewData.referralIncome}` : "₹0" 
        },
        { 
            id: "3", 
            title: "Level Income", 
            value: overviewData.levelIncome ? `₹${overviewData.levelIncome}` : "₹0" 
        },
        { 
            id: "4", 
            title: "Pending Bonus", 
            value: overviewData.pendingBonus ? `₹${overviewData.pendingBonus}` : "₹0" 
        },
    ];

    // Show loader while initial data is fetching
    if (overviewLoading || listLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            
            {/* KPI Section */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {KpiData.map((item) => (
                    <KpiCard key={item.id} {...item} />
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <GenericTable 
                        title="Work Wallet Overview" 
                        columns={workWalletTable} 
                        data={tableData} 
                    />
                </div>
            
            </div>
        </div>
    );
}

export default WorkWalletMgt;