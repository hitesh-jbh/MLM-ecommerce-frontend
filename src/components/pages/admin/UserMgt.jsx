// import React, { useState, useEffect, useCallback } from "react";
import KpiCard from "./KpiCards";
import { GenericTable } from "./GenericTable";
import { userTable } from "../../../utils/Constants";
import FilterBar from "./Filterbar";
import { getUsers } from "../../../utils/Service/apiService";
import { useCallback, useEffect, useState } from "react";

function UserMgt() {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const KpiData = [
        { id: "1", title: "Total Users", value: allUsers.length },
        { id: "2", title: "Active Users", value: "240" },
        { id: "3", title: "Inactive Users", value: "20" },
        { id: "4", title: "New This Month", value: "20" },
    ];
    // value: allUsers.length },
    //     { id: "2", title: "Admins", value: allUsers.filter(u => u.role === 'ADMIN').length },
    //     { id: "3", title: "Staff", value: allUsers.filter(u => u.role === 'STAFF').length },
    //     { id: "4", title: "Customers", value: allUsers.filter(u => u.role === 'USER').length }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers(); // Fetches from GET /admin/all
                const data = res.data?.users || res.data || [];
                setAllUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Logic to filter the list based on current filter values
    const applyFilters = useCallback((filters) => {
        let result = [...allUsers];

        if (filters.role !== "All") {
            result = result.filter(u => u.role?.toLowerCase() === filters.role.toLowerCase());
        }

        if (filters.rank !== "All") {
            result = result.filter(u => u.rank === filters.rank);
        }

        if (filters.startDate) {
            const start = new Date(filters.startDate);
            result = result.filter(u => new Date(u.createdAt) >= start);
        }

        if (filters.endDate) {
            const end = new Date(filters.endDate);
            result = result.filter(u => new Date(u.createdAt) <= end);
        }

        setFilteredUsers(result);
    }, [allUsers]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
            {/* Header Section */}
             <div>
                 <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                 <p className="text-gray-500 text-sm mt-1">Monitor user activity and referral structures.</p>
             </div>

             {/* KPI Grid: Handles 1 col on mobile, 2 on small, 4 on medium/large */}
             <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                 {KpiData.map((item) => (
                    <KpiCard key={item.id} {...item} />
                ))}
            </div>
            
            {/* onFilterChange triggers every time a dropdown or input is touched */}
            <FilterBar onFilterChange={applyFilters} />

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-10 text-center text-gray-400 font-medium">Loading user data...</div>
                ) : (
                    <GenericTable columns={userTable} data={filteredUsers} />
                )}
            </div>
            {/* {console.log(filteredUsers)} */}
        </div>
    );
}

export default UserMgt;





// import React from "react";
// import KpiCard from "./KpiCards";
// import { GenericTable } from "./GenericTable";
// import { referNetworkData, userData, userTable } from "../../../utils/Constants";
// import ReferNetwork from "../../ui/ReferNetwork";
// import FilterBar from "./Filterbar";

// function UserMgt() {
//     const KpiData = [
//         { id: "1", title: "Total Users", value: "320" },
//         { id: "2", title: "Active Users", value: "240" },
//         { id: "3", title: "Inactive Users", value: "20" },
//         { id: "4", title: "New This Month", value: "20" },
//     ];

//     return (
//         // Added padding and max-width for better desktop containment
//         <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
            
//             {/* Header Section */}
//             <div>
//                 <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//                 <p className="text-gray-500 text-sm mt-1">Monitor user activity and referral structures.</p>
//             </div>

//             {/* KPI Grid: Handles 1 col on mobile, 2 on small, 4 on medium/large */}
//             <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
//                 {KpiData.map((item) => (
//                     <KpiCard key={item.id} {...item} />
//                 ))}
//             </div>

//             <div>
//                 <FilterBar />
//             </div>

//             {/* Table Section: Scrollable wrapper prevents layout break */}
//             <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <GenericTable columns={userTable} data={userData} />
//                 </div>
//             </div>

//             {/* Referral Network: Typically requires its own scrollable container */}
//             <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4">Referral Network</h2>
//                 <div className="overflow-auto min-h-[400px]">
//                     <ReferNetwork data={referNetworkData} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserMgt;