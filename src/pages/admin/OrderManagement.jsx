import React, { useState, useMemo } from "react";
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { GenericTable } from "../../components/partials/table/GenericTable";
import { orderTable } from "../../utils/Constants";
import { statusUpdate, orderList, dashboardStats } from "../../utils/service/apiService";
import FixedDateLabelWithDropdown from "../../components/admin_component/Date";
import KpiCard from "../../components/admin_component/KpiCards"; 
import { toast, ToastContainer } from "react-toastify";
import { Loader2, X, RotateCcw } from "lucide-react";
import PageHeader from "../../components/partials/table/PageHeader";

// Fetchers
const orderFetcher = (token) => orderList(token).then(res => res.data?.data || []);
const statsFetcher = (token) => dashboardStats(token).then(res => res.data?.data || {});

function OrderManagement() {
    const token = useSelector((state) => state.auth?.token);
    
    // --- State Management ---
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newStatus, setNewStatus] = useState("");

    // --- Data Fetching ---
    const { data: orders, isLoading: ordersLoading, mutate: mutateOrders } = useSWR(
        token ? ["/api/orders", token] : null, 
        () => orderFetcher(token)
    );

    const { data: stats, isLoading: statsLoading, mutate: mutateStats } = useSWR(
        token ? ["/api/order/stats", token] : null,
        () => statsFetcher(token)
    );

    const refreshData = () => {
        mutateOrders();
        mutateStats();
    };

    // --- SEARCH & FILTER LOGIC (Updated to include Email) ---
    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        
        const query = searchQuery.toLowerCase().trim();

        return orders.filter((order) => {
            const matchesSearch = 
                order.orderId?.toString().toLowerCase().includes(query) ||
                order.buyerName?.toLowerCase().includes(query) ||
                // Search by Email (Checking both common keys: email and buyerEmail)
                order.email?.toLowerCase().includes(query) ||
                order.buyerEmail?.toLowerCase().includes(query);
            
            const matchesStatus = statusFilter === "ALL" || order.orderStatus === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
    }, [orders, searchQuery, statusFilter]);

    // --- KPI Mapping ---
    const KpiData = useMemo(() => {
        if (!stats) return [];
        return [
            { id: "1", title: "Total Orders", value: stats.totalOrders || 0 },
            { id: "2", title: "Today Orders", value: stats.todayOrders || 0 },
            { id: "3", title: "Pending Orders", value: stats.pendingOrders || 0 },
            { id: "4", title: "Shipped", value: `₹${stats.shippedOrders || 0}` },
            { id: "5", title: "Delivered", value: `₹${stats.deliveredOrders || 0}` },
            { id: "6", title: "Cancelled", value: `₹${stats.cancelledOrders || 0}` },
            { id: "7", title: "Completed", value: `₹${stats.completedOrders || 0}` },
            { id: "8", title: "Referral", value: `₹${stats.referralOrders || 0}` },
            { id: "9", title: "Admin Ref.", value: `₹${stats.adminReferralOrders || 0}` },
            { id: "10", title: "Website", value: `₹${stats.websiteOrders || 0}` },
        ];
    }, [stats]);

    const openStatusModal = (row) => {
        setSelectedOrder(row);
        setNewStatus(row.orderStatus || "CREATED");
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async () => {
        const idToUpdate = selectedOrder?.orderId;
        if (!idToUpdate) return;

        setIsSubmitting(true);
        try {
            const response = await statusUpdate(token, idToUpdate, { status: newStatus });
            if (response.data.success) {
                toast.success(`Order #${idToUpdate} updated to ${newStatus}`);
                setIsModalOpen(false);
                refreshData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetFilters = () => {
        setSearchQuery("");
        setStatusFilter("ALL");
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50">
            <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
            
            <div className="flex justify-between items-center px-1">
                <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
                    Order Management
                </h1>
                <FixedDateLabelWithDropdown />
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {statsLoading 
                    ? Array(10).fill(0).map((_, i) => (
                        <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />
                      ))
                    : KpiData.map((item) => (
                        <div key={item.id} className="transition-transform duration-200 hover:scale-[1.02]">
                            <KpiCard {...item} />
                        </div>
                    ))
                }
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <PageHeader 
                        itemCount={filteredOrders.length}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        title="Orders Found"
                    />
                </div>
                
                <div className="flex gap-2 w-full lg:w-auto mb-6">
                    <select 
                        className="flex-1 lg:w-56 h-[48px] border-2 border-white bg-white rounded-2xl px-4 text-xs font-bold uppercase tracking-wider outline-none focus:border-black shadow-sm transition-all cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Status</option>
                        <option value="CREATED">CREATED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                    </select>
                    
                    <button 
                        onClick={resetFilters}
                        className="p-3 bg-white border-2 border-white rounded-2xl shadow-sm hover:text-red-500 transition-colors"
                        title="Reset All Filters"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative min-h-[400px]">
                {ordersLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                        <Loader2 className="animate-spin text-black" size={40} />
                    </div>
                ) : (
                    <GenericTable 
                        columns={orderTable(openStatusModal)} 
                        data={filteredOrders} 
                    />
                )}
                
                {!ordersLoading && filteredOrders.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <X size={40} className="text-gray-200 mb-4" />
                        <p className="font-bold uppercase text-xs tracking-widest">No matching orders found</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                     <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-black text-gray-800 text-[10px] uppercase tracking-[0.2em]">
                                Update Status #{selectedOrder?.orderId}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-10">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">
                                New Order Status
                            </label>
                            <select 
                                className="w-full border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold outline-none focus:border-black appearance-none bg-gray-50/50 focus:bg-white transition-all cursor-pointer"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="CREATED">CREATED</option>
                                <option value="PACKED">PACKED</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="DELIVERED">DELIVERED</option>
                            </select>
                        </div>
                        <div className="px-8 pb-8">
                            <button 
                                onClick={handleUpdateSubmit}
                                disabled={isSubmitting}
                                className="w-full py-4 text-xs font-black uppercase bg-black text-white rounded-2xl shadow-xl shadow-black/20 hover:bg-zinc-800 disabled:bg-gray-200 transition-all"
                            >
                                {isSubmitting ? "Processing..." : "Confirm Status Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderManagement;