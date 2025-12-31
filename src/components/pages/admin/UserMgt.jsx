import React from "react";
import KpiCard from "./KpiCards";

function UserMgt() {
    const KpiData = [
        { id: "1", title: "Total Users", value: "320" },
        { id: "2", title: "Active Users", value: "240" },
        { id: "3", title: "Inactive Users", value: "20" },
        { id: "4", title: "New This Month", value: "20" },


    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {KpiData.map((item) => (
                <KpiCard key={item.id} {...item} />
            ))}
        </div>
    );
}

export default UserMgt;
