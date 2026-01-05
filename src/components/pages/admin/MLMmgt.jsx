import React from "react";
import StatCard from "./Statscard";
import {
  User,
  Users,
  UserPlus,
  Wallet,
  IdCard,
  Lock,
  BadgeCheck
} from "lucide-react";
import UserManagementDashboard from "./Chart";

function MlMmgt() {

  const statsData = [
    {
      id: "1",
      title: "Total Users",
      value: "320",
      icon: <User className="w-6 h-6 text-black dark:text-white" />,
    },
    {
      id: "2",
      title: "Active Users",
      value: "240",
      icon: <Users className="w-6 h-6 text-black dark:text-white" />,
    },
    {
      id: "3",
      title: "Today's Joining",
      value: "20",
      icon: <UserPlus className="w-6 h-6 text-black dark:text-white" />,
    },
    {
      id: "4",
      title: "Pending KYC",
      value: "$450",
      icon: <IdCard className="w-6 h-6 text-black dark:text-white" />,
    },
    {
      id: "5",
      title: "Pending Withdrawals",
      value: "$450",
      icon: <Lock className="w-6 h-6 text-black dark:text-white" />,
    },
    {
      id: "6",
      title: "Total CommissioN Paid",
      value: "$450",
      icon: <Wallet className="w-6 h-6 text-black dark:text-white" />,
    },
    {
      id: "7",
      title: "Active referral Codes",
      value: "24",
      icon: <BadgeCheck className="w-6 h-6 text-black dark:text-white" />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((item) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <UserManagementDashboard />
    </>
  );
}

export default MlMmgt;
