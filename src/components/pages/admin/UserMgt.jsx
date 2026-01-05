import React, { useState, useEffect, useMemo, useCallback } from "react"; // Added useMemo
import { useSelector } from "react-redux";
import useSWR from "swr"; // Changed to useSWR
import KpiCard from "./KpiCards";
import { GenericTable } from "./GenericTable";
import { userData, userTable } from "../../../utils/Constants";
import FilterBar from "./Filterbar";
import AddStaffModal from "./AddStaffModal";

function UserMgt() {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Added missing state
    
    const { token: reduxToken } = useSelector((state) => state.auth);

    const { data, error: swrError, isLoading, mutate } = useSWR('/admin/all');

    const allUsers = useMemo(() => {
        const rawUsers = data?.users || data;
        return Array.isArray(rawUsers) ? rawUsers : [];
    }, [data]);

    useEffect(() => {
        setFilteredUsers(allUsers);
    }, [allUsers]);

    const applyFilters = useCallback((filters) => {
        let result = [...allUsers];
        if (filters.role && filters.role !== "All") {
            result = result.filter(u => u.role?.toLowerCase() === filters.role.toLowerCase());
        }
        if (filters.rank && filters.rank !== "All") {
            result = result.filter(u => u.rank === filters.rank);
        }
        setFilteredUsers(result);
    }, [allUsers]);

    const KpiData = [
        { id: "1", title: "Total Users", value: allUsers.length },
        { id: "2", title: "Active Users", value: allUsers.filter(u => u.status === 'active').length },
        { id: "3", title: "Inactive Users", value: allUsers.filter(u => u.status === 'inactive').length },
        { id: "4", title: "New This Month", value: "0" }, 
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
             <div className="flex justify-between items-center">
                 <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">User Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Monitor user activity and referral structures.</p>
                 </div>
                 {/* Added a button to actually open your modal */}
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg font-bold text-sm"
                 >
                    Add Staff
                 </button>
             </div>

             <AddStaffModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={() => mutate()} // Tell SWR to refresh data after adding
            />

             <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                 {KpiData.map((item) => (
                    <KpiCard key={item.id} {...item} />
                ))}
            </div>
            
            <FilterBar onFilterChange={applyFilters} />

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center space-y-4">
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Fetching Database...</p>
                    </div>
                ) : (
                    <GenericTable columns={userTable} data={filteredUsers} />
                    // <GenericTable columns={userTable} data={userData} />
                )}
            </div>
        </div>
    );
}

export default UserMgt;



// import { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import KpiCard from "./KpiCards";
// import swr from "swr";
// import { GenericTable } from "./GenericTable";
// import { userTable } from "../../../utils/Constants";
// import FilterBar from "./Filterbar";
// import { getUsers } from "../../../utils/Service/apiService";
// import Icons from "../../ui/Icon";
// import AddStaffModal from "./AddStaffModal";

// function UserMgt() {
//     const [allUsers, setAllUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
    
//     // Get token from Redux
//     const { token: reduxToken } = useSelector((state) => state.auth);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             setIsLoading(true);
//             try {
//                 // FALLBACK: If Redux is empty (on refresh), check localStorage
//                 const activeToken = reduxToken || localStorage.getItem("token");
//                 console.log(activeToken);
                
//                 if (!activeToken) {
//                     console.error("No authorization token found.");
//                     return;
//                 }

//                 const res = await getUsers(activeToken); 
                
//                 // Extract data based on your specific backend response
//                 // Typically: res.data or res.data.users
//                 const data = res.data?.users || (Array.isArray(res.data) ? res.data : []);
                
//                 setAllUsers(data);
//                 setFilteredUsers(data);
//             } catch (err) {
//                 console.error("API Fetch Error:", err);
//                 if (err.response?.status === 401) {
//                     alert("Session expired. Please log in again.");
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchUsers();
//     }, [reduxToken]); // Re-run if token updates

//     const applyFilters = useCallback((filters) => {
//         let result = [...allUsers];
//         if (filters.role !== "All") {
//             result = result.filter(u => u.role?.toLowerCase() === filters.role.toLowerCase());
//         }
//         if (filters.rank !== "All") {
//             result = result.filter(u => u.rank === filters.rank);
//         }
//         // ... rest of your filter logic
//         setFilteredUsers(result);
//     }, [allUsers]);

//     const KpiData = [
//         { id: "1", title: "Total Users", value: allUsers.length },
//         { id: "2", title: "Active Users", value: allUsers.filter(u => u.status === 'active').length || "0" },
//         { id: "3", title: "Inactive Users", value: allUsers.filter(u => u.status === 'inactive').length || "0" },
//         { id: "4", title: "New This Month", value: "0" }, 
//     ];

//     return (
//         <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
//              <div>
//                  <h1 className="text-2xl font-bold text-gray-800 tracking-tight">User Management</h1>
//                  <p className="text-gray-500 text-sm mt-1">Monitor user activity and referral structures.</p>
//              </div>

//              <AddStaffModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 onSuccess={fetchUsers} 
//             />

//              <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
//                  {KpiData.map((item) => (
//                     <KpiCard key={item.id} {...item} />
//                 ))}
//             </div>
            
            
//             <FilterBar onFilterChange={applyFilters} />

//             <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//                 {isLoading ? (
//                     <div className="p-20 flex flex-col items-center justify-center space-y-4">
//                         <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
//                         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Fetching Database...</p>
//                     </div>
//                 ) : (
//                     <GenericTable columns={userTable} data={filteredUsers} />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UserMgt;