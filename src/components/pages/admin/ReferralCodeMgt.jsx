import React from "react";
import KpiCard from "./KpiCards";

function ReferralMgt() {
    const KpiData = [
        { id: "1", title: "Total Referral Codes", value: "320" },
        { id: "2", title: "Acrive Codes", value: "20" },
        { id: "3", title: "User Assigned", value: "20" },
        { id: "4", title: "Conversition Today", value: "20" },


    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {KpiData.map((item) => (
                <KpiCard key={item.id} {...item} />
            ))}
        </div>
    );
}

export default ReferralMgt;
