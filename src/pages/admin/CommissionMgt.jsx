import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import KpiCard from "../../components/admin_component/KpiCards";
import CompactCommissionConfig from "../../components/admin_component/Comission";
import { GenericTable } from "../../components/partials/table/GenericTable";
import { commissionTable } from "../../utils/Constants";
import { commissionStats, userCommissionStats } from "../../utils/service/apiService";
import { Link } from "react-router-dom";
import { Loader2, Wallet, CheckCircle, Clock, AlertCircle } from "lucide-react";

const statsFetcher = (token) => commissionStats(token).then(res => res.data?.data || {});
const listFetcher = (token) => userCommissionStats(token).then(res => res.data?.commissions || []);

function CommissionMgt() {
    const token = useSelector((state) => state.auth?.token);

    const { data: stats, isLoading: statsLoading } = useSWR(
        token ? ["commissionStats", token] : null,
        () => statsFetcher(token)
    );

    const { data: commissions, isLoading: listLoading } = useSWR(
        token ? ["commissionList", token] : null,
        () => listFetcher(token)
    );

    const KpiData = useMemo(() => [
        { id: "1", title: "Total Commission", value: `₹${stats?.totalCommission || "0.00"}`, icon: <Wallet size={18} className="text-white"/> },
        { id: "2", title: "Paid Commission", value: `₹${stats?.paidCommission || "0.00"}`, icon: <CheckCircle size={18} className="text-white"/> },
        { id: "3", title: "Pending Commission", value: `₹${stats?.pendingCommission || "0.00"}`, icon: <Clock size={18} className="text-white"/> },
        { id: "4", title: "Rejected/On hold", value: `₹${stats?.rejectedCommission || "0.00"}`, icon: <AlertCircle size={18} className="text-white"/> },
    ], [stats]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F9FAFB] min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-[#1A1C1E] tracking-tight uppercase">Commission Management</h1>
                <p className="text-sm text-gray-500 mt-1">Track and manage user earnings.</p>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4">
                {statsLoading ? Array(4).fill(0).map((_, i) => <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />) :
                    KpiData.map((item) => (
                        <div key={item.id} className="bg-[#1A1C1E] rounded-2xl p-5 flex items-center gap-4 border border-black">
                            <div className="p-3 bg-white/5 rounded-xl">{item.icon}</div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.title}</p>
                                <p className="text-xl font-black text-white">{item.value}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex gap-4 mt-8">
                <Link to="/admin/comission/set" className="bg-[#1A1C1E] text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-wider">Set Percentage</Link>
                <Link to="/admin/comission/rank" className="bg-[#1A1C1E] text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-wider">Rank Config</Link>
            </div>

            <div className="mt-10 bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                {listLoading ? (
                    <div className="flex items-center justify-center h-[400px]"><Loader2 className="animate-spin" /></div>
                ) : (
                    <GenericTable 
                        title="Recent Commission Transactions"
                        columns={commissionTable} 
                        data={commissions || []}
                    />
                )}
            </div>
        </div>
    );
}

export default CommissionMgt;

