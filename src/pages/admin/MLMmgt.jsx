import React from "react";
import useSWR from "swr";
import StatCard from "../../components/admin_component/Statscard";
import {
  User,
  Users,
  UserPlus,
  Wallet,
  IdCard,
  Lock,
  BadgeCheck,
  Loader2
} from "lucide-react";
import UserManagementDashboard from "../../components/partials/widget/chart/Chart";
import { fetcher } from "../../utils/Api/axiosInstance"; // Path to your axios config

function MlMmgt() {
  // SWR Hook - Simple URL key because interceptor handles the token
  const { data: response, error, isLoading } = useSWR(
    "/api/admin/mlm/dashboard-stats", 
    fetcher
  );

  // Safely extract nested data based on your API response structure
  const stats = response?.data?.stats?.[0] || {};
  const chartsData = response?.data?.charts || {};
  const activityData = response?.data?.recentActivity || [];

  const statsData = [
    {
      id: "1",
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: <User className="w-6 h-6 text-white" />,
    },
    {
      id: "2",
      title: "Active Users",
      value: stats.activeUsers || 0,
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      id: "3",
      title: "Today's Joining",
      value: stats.todayJoining || 0,
      icon: <UserPlus className="w-6 h-6 text-white" />,
    },
    {
      id: "4",
      title: "Pending KYC",
      value: "0", // Add to backend later or map if available
      icon: <IdCard className="w-6 h-6 text-white" />,
    },
    {
      id: "5",
      title: "Pending Withdrawals",
      value: stats.pendingWithdrawals ? `₹${stats.pendingWithdrawals}` : "₹0",
      icon: <Lock className="w-6 h-6 text-white" />,
    },
    {
      id: "6",
      title: "Total Commission Paid",
      value: stats.totalCommissionPaid ? `₹${stats.totalCommissionPaid}` : "₹0",
      icon: <Wallet className="w-6 h-6 text-white" />,
    },
    {
      id: "7",
      title: "Active Referral Codes",
      value: stats.activeReferralCodes || 0,
      icon: <BadgeCheck className="w-6 h-6 text-white" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 font-bold uppercase tracking-widest">
        Failed to load MLM Statistics
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsData.map((item) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Pass the dynamic data to your dashboard/charts */}
      <UserManagementDashboard 
        chartData={chartsData} 
        recentActivity={activityData} 
      />
    </div>
  );
}

export default MlMmgt;

