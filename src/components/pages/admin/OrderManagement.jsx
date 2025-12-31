import React from "react";
import KpiCard from "./KpiCards";

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {KpiData.map((item) => (
                <KpiCard key={item.id} {...item} />
            ))}
        </div>
    );
}

export default OrderManagement;
