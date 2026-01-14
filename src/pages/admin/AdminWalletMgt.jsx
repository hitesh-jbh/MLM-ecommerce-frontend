import React from "react";
import KpiCard from "../../components/admin_component/KpiCards";

function AdminWalletMgt() {
    const KpiData = [
        { id: "1", title: "Total Wallet Balance", value: "320" },
        { id: "2", title: "Available Balance", value: "20" },
        { id: "3", title: "Pending Balance", value: "20" },
        


    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {KpiData.map((item) => (
                <KpiCard key={item.id} {...item} />
            ))}
        </div>
    );
}

export default AdminWalletMgt;
