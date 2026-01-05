import React from "react";
import StatCard from "./Statscard";
import { GenericTable } from "./GenericTable";
import Icons from "../../ui/Icon";
import KpiCard from "./KpiCards"
import { orderData, orderTable } from "../../../utils/Constants";
import FixedDateLabelWithDropdown from "./Date";

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

  return (
    // 1. Added horizontal padding and responsive max-width
    <div className="space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header Section: Flexbox for Title and Date Picker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight">
          Order Management
        </h1>
        {/* Date picker wrapper to ensure it doesn't overlap on small screens if fixed */}
        <div className="relative z-10">
          <FixedDateLabelWithDropdown />
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* 2. KPI Grid: 
          - 2 columns on very small mobile
          - 3 columns on tablets
          - 4 columns on laptops
          - 5 columns on large desktops 
      */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {KpiData.map((item) => (
          <div key={item.id} className="transition-transform duration-200 hover:scale-[1.02]">
            <KpiCard {...item} />
          </div>
        ))}
      </div>

      {/* 3. Table Section: Wrapper for horizontal scrolling */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[800px] md:min-w-full">
             <GenericTable 
               title="Recent Orders" 
               columns={orderTable} 
               data={orderData} 
             />
          </div>
        </div>
      </div>

    </div>
  );
}

export default OrderManagement;