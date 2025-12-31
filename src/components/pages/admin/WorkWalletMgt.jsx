import React from "react";
import KpiCard from "./KpiCards";

function WorkWalletMgt() {
    const KpiData = [
        { id: "1", title: "Total MLM Income", value: "320" },
        { id: "2", title: "Referral Income", value: "20" },
        { id: "3", title: "Level Income", value: "20" },
        { id: "4", title: "Pending bonus", value: "20" },


    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {KpiData.map((item) => (
                <KpiCard key={item.id} {...item} />
            ))}
        </div>
    );
}

export default WorkWalletMgt;
