import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { GenericTable } from "../../components/partials/table/GenericTable";
import TableActionFooter from "./TableActionFooter";
import { walletTable } from "../../utils/constants";
import { walletTransaction } from "../../utils/service/apiService";
import Icons from "../../components/ui/Icon";
import { Loader2, Wallet, RotateCcw, Search } from "lucide-react";

// Fetcher function for SWR - Ensures we return an array
const transactionFetcher = (token) => 
    walletTransaction(token).then(res => res.data?.data || res.data || []);

function NormalWalletMgt() {
    const token = useSelector((state) => state.auth?.token);

    // 1. Fetch Transaction Data
    const { data: transactions, isLoading, refetch: mutate } = useQuery({
        queryKey: ["/api/admin/wallets/transactions", token],
        queryFn: () => transactionFetcher(token),
        enabled: !!token
    });

    // 2. Calculate Dynamic Stats for KPI Cards
    const stats = useMemo(() => {
        if (!Array.isArray(transactions)) return { total: 0, credit: 0, debit: 0 };
        
        const credit = transactions.reduce((acc, curr) => 
            curr.type?.toLowerCase() === 'credit' ? acc + parseFloat(curr.amount || 0) : acc, 0);
        
        const debit = transactions.reduce((acc, curr) => 
            curr.type?.toLowerCase() === 'debit' ? acc + parseFloat(curr.amount || 0) : acc, 0);
            
        return { total: credit - debit, credit, debit };
    }, [transactions]);

    // 3. KPI Data - Using strings for Iconify (Prevents circular JSON error)
    const KpiData = [
        { 
            id: "1", 
            title: "Total Wallet Balance", 
            value: `₹${stats.total.toLocaleString('en-IN')}`, 
            icon: "solar:wallet-money-bold-duotone" 
        },
        { 
            id: "2", 
            title: "Total Credits", 
            value: `₹${stats.credit.toLocaleString('en-IN')}`, 
            icon: "solar:arrow-left-up-bold-duotone" 
        },
        { 
            id: "3", 
            title: "Total Debits", 
            value: `₹${stats.debit.toLocaleString('en-IN')}`, 
            icon: "solar:arrow-right-down-bold-duotone" 
        },
        { 
            id: "4", 
            title: "Pending Requests", 
            value: "0", 
            icon: "solar:clock-circle-bold-duotone" 
        },
    ];

    return (
        <div className="p-8 max-w-[1650px] mx-auto bg-[#F9FAFB] min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-black text-[#1A1C1E] tracking-tight uppercase">
                        Wallet Management
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                        Financial Overview & History
                    </p>
                </div>
                <button 
                    onClick={() => mutate()}
                    className="p-3 bg-white border-2 border-gray-100 rounded-xl hover:border-black transition-all group shadow-sm"
                >
                    <RotateCcw size={18} className="text-gray-400 group-hover:text-black group-hover:rotate-[-45deg] transition-all" />
                </button>
            </div>
            
            {/* KPI Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl border border-gray-100" />
                    ))
                ) : (
                    KpiData.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-[#1A1C1E] rounded-2xl p-4 flex items-center gap-4 border border-black shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                <Icons 
                                    icon={item.icon} 
                                    size={24} 
                                    className="text-gray-300 group-hover:text-white transition-colors" 
                                />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">
                                    {item.title}
                                </p>
                                <p className="text-xl font-black text-white tracking-tight">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1 px-2">
                    <span className="text-gray-900 font-black text-lg">{transactions?.length || 0}</span>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest mr-4">Total Logs</span>
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                        <input 
                            type="text"
                            placeholder="Filter transactions..."
                            className="w-full bg-[#F3F4F6] border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold focus:ring-2 focus:ring-black/5 transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                        <Loader2 className="animate-spin text-black" size={40} />
                    </div>
                ) : transactions?.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <GenericTable 
                                title="Recent Wallet Transactions" 
                                columns={walletTable} 
                                data={transactions} 
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                        <Wallet size={48} strokeWidth={1} className="mb-4 opacity-20" />
                        <p className="font-black uppercase text-xs tracking-[0.3em]">No Transactions Found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NormalWalletMgt;