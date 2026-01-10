import React from "react";
// import StatCard from "./Statscard";
import StatCard from "../../components/admin_component/Statscard";
import ReferralRankingCard from "../../components/pages/admin/ReferralRankingCard";
import WalletCard from "../../components/pages/admin/WalletCard";
import { Users, ShoppingCart, DollarSign, Clock } from "lucide-react";
import { GenericTable } from "../../components/partials/table/GenericTable";
import { referData, referTable } from "../../utils/Constants";
import OrdersOverview from "../../components/pages/admin/Ordersoverview";


function AdminDashboard() {
    // 🔹 Dashboard stats
    const statsData = [
        {
            id: "1",
            title: "Total Users",
            value: "320",
            icon: <Users className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "2",
            title: "Total Orders",
            value: "240",
            icon: <ShoppingCart className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "3",
            title: "Total Revenue",
            value: "$48,972",
            icon: <DollarSign className="w-6 h-6 text-black dark:text-white" />,
        },
        {
            id: "4",
            title: "Pending Withdrawals",
            value: "$450",
            icon: <Clock className="w-6 h-6 text-black dark:text-white" />,
        },
    ];

    // 🔹 Referral data
    const referralData = [
        { name: "ABC", level: 2, amount: 2345 },
        { name: "XYZ", level: 3, amount: 5000 },
        { name: "LMN", level: 1, amount: 1000 },
        { name: "PQR", level: 2, amount: 3200 },
    ];

    const handleViewWallets = () => {
        alert("Viewing Wallets!");
    };

    return (
        <div className="min-h-screen p-6 space-y-6 bg-gray-50">
            {/* Stats Section */}
            <div>
                {/* <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1> */}
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
            </div>

            <div>
                <OrdersOverview />
            </div>

            {/* Referral Rankings Section */}
            <div>
                <ReferralRankingCard
                    title="Referral Rankings"
                    linkText="View Leaderboard"
                    users={referralData}
                />
            </div>

            {/* Wallet Cards Section */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Wallets</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <WalletCard orders={1650} pending={450} onView={handleViewWallets} />
                    
                </div>
            </div>

        </div>
    );
}

export default AdminDashboard;
