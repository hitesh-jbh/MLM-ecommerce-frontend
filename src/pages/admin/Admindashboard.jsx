import React, { useEffect, useState } from "react";
import StatCard from "../../components/admin_component/Statscard";
import ReferralRankingCard from "../../components/admin_component/ReferralRankingCard";
import WalletCard from "./WalletCard";
import { Users, ShoppingCart, DollarSign, Clock,
  UserCheck,
  UserPlus, 
  Ticket } from "lucide-react";
import OrdersOverview from "../../components/admin_component/Ordersoverview";
import { dashboard_Stat, referalRanking, orderTrend } from "../../utils/service/apiService"; 
import { FaRupeeSign } from "react-icons/fa";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [rankings, setRankings] = useState([]); // State for live referral data
    const [trend, setTrend] = useState([]); // State for live order trend
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token"); 
                
                // Fetching both APIs concurrently for better performance
                const [statsRes, rankingsRes, trendRes] = await Promise.all([
                    dashboard_Stat(token),
                    referalRanking(token),
                    orderTrend(token)
                ]);

                // Handle Global Stats
                if (statsRes.data && statsRes.data.success) {
                    setStats(statsRes.data.data);
                }

                // Handle Referral Rankings
                // Based on your previous API structure: response.data.data is the array
                if (rankingsRes.data && rankingsRes.data.success) {
                    setRankings(rankingsRes.data.data);
                }

                // Handle Order Trend
                if (trendRes.data && trendRes.data.success) {
                    setTrend(trendRes.data.data);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Map fetched stats to StatCard format
    const statsData = [
        {
            id: "1",
            title: "Total Users",
            value: stats?.totalUsers || "0",
            icon: <Users className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "2",
            title: "Active Users",
            value: stats?.activeUsers || "0",
            // UserCheck clearly distinguishes "Active" from "Total"
            icon: <UserCheck className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "3",
            title: "Total Commission Paid",
            value: stats?.totalCommissionPaid 
                ? `₹${Math.floor(Number(stats.totalCommissionPaid)).toLocaleString()}` 
                : "₹0",
            icon: <FaRupeeSign className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "4",
            title: "Pending Withdrawals",
            value: stats?.pendingWithdrawals 
                ? `₹${Number(stats.pendingWithdrawals).toLocaleString()}` 
                : "₹0",
            icon: <Clock className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "5",
            title: "Today Joining",
            value: stats?.todaysJoining || "0",
            // UserPlus represents a new addition or "joining"
            icon: <UserPlus className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "6",
            title: "Active ReferalCodes",
            value: stats?.activeReferralCodes || "0",
            // Ticket or Hash usually represents codes/coupons
            icon: <Ticket className="w-6 h-6 text-black dark:text-white" />,
        },
    ];

    const handleViewWallets = () => {
        alert("Viewing Wallets!");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-medium text-gray-500">Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 space-y-6 bg-gray-50">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Dashboard</h1>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statsData.map((item) => (
                    <StatCard
                        key={item.id}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                    />
                ))}
            </div>

            {/* Orders Overview Chart/Section */}
            <div>
                <OrdersOverview data={trend} />
            </div>

            {/* Referral Rankings Section - Now using LIVE data */}
            <div>
                <ReferralRankingCard
                    title="Referral Rankings"
                    linkText="View Leaderboard"
                    users={rankings} // Replaced placeholder with API state
                />
            </div>

            {/* Wallet Section */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Wallets</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <WalletCard 
                        orders={stats?.totalOrders || 0} 
                        pending={stats?.pendingWithdrawals || 0} 
                        onView={handleViewWallets} 
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
