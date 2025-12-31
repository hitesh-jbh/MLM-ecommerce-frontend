import React from "react";
import StatCard from "./Statscard";
import { GenericTable } from "./GenericTable";
import Icons from "../../ui/Icon";
import KpiCard from "./KpiCards"
import { orderData, orderTable } from "../../../utils/Constants";

function OrderManagement() {

  const KpiData = [
        { id: "1", title: "Total Orders", value: "320" },
        { id: "2", title: "Today Orders", value: "240" },
        { id: "3", title: "Pending Orders", value: "$48,972" },
        { id: "4", title: "Shipped Orders", value: "$450" },
        { id: "5", title: "Delivered Orders", value: "$450" },
        { id: "6", title: "Cancelled Orders", value: "$450" },
        { id: "7", title: "Completed Orders", value: "$450" },
        { id: "8", title: "Referral Orders", value: "$450" },
        { id: "9", title: "Admin Referral Orders", value: "$450" },
        { id: "10", title: "Website Orders", value: "$450" },
    ];

  // 🔹 Dashboard stats with Iconify strings
  const statsData = [
    {
      id: "1",
      title: "Total Users",
      value: "320",
      icon: <Icons icon="heroicons:users" className="w-6 h-6 text-white" />,
    },
    {
      id: "2",
      title: "Total Orders",
      value: "240",
      icon: <Icons icon="heroicons:shopping-cart" className="w-6 h-6 text-white" />,
    },
    {
      id: "3",
      title: "Total Revenue",
      value: "$48,972",
      icon: <Icons icon="heroicons:currency-dollar" className="w-6 h-6 text-white" />,
    },
    {
      id: "4",
      title: "Pending Withdrawals",
      value: "$450",
      icon: <Icons icon="heroicons:clock" className="w-6 h-6 text-white" />,
    },
    // Adding more just to demonstrate the grid
    {
      id: "5",
      title: "Active Sessions",
      value: "12",
      icon: <Icons icon="heroicons:bolt" className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      
      {/* Grid Layout for StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatCard 
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {KpiData.map((item) => (
                <KpiCard key={item.id} {...item} />
            ))}
        </div>

      <GenericTable title="Orders" columns={orderTable} data={orderData} />
    </div>
  );
}

export default OrderManagement;