// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useSelector } from "react-redux";
// import useSWR from "swr"; 
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// // API & UI Components
// import { fetcher } from "../../../utils/Api/axiosInstance";
// import KpiCard from "./KpiCards";
// import { GenericTable } from "./GenericTable";
// import { userTable } from "../../../utils/Constants";
// import FilterBar from "./Filterbar";
// import AddStaffModal from "./AddStaffModal";

// function UserMgt() {
//     const { token: reduxToken } = useSelector((state) => state.auth);
//     const [userType, setUserType] = useState("admin"); 
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Fetch data based on active userType
//     const { data, isLoading, mutate } = useSWR(
//         reduxToken ? `/api/admin/all?userType=${userType}` : null, 
//         fetcher
//     );

//     const allUsers = useMemo(() => {
//         const rawUsers = data?.users || data;
//         return Array.isArray(rawUsers) ? rawUsers : [];
//     }, [data]);

//     useEffect(() => {
//         setFilteredUsers(allUsers);
//     }, [allUsers]);

//     const applyFilters = useCallback((filters) => {
//         if (filters.userType && filters.userType.toLowerCase() !== userType) {
//             setUserType(filters.userType.toLowerCase());
//             return;
//         }

//         let result = [...allUsers];
//         if (filters.role && filters.role !== "All") {
//             result = result.filter(u => u.role?.toLowerCase() === filters.role.toLowerCase());
//         }
//         setFilteredUsers(result);
//     }, [allUsers, userType]);

//     const activeCount = useMemo(() => 
//         filteredUsers.filter(u => u.is_active === true || u.status === 'active').length, 
//     [filteredUsers]);

//     return (
//         <div className="p-4 sm:p-6 space-y-8 max-w-[1600px] mx-auto">
//             {/* The single container that handles all toasts in this view */}
//             <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
            
//             <div className="flex justify-between items-center">
//                  <div>
//                      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">User Management</h1>
//                      <p className="text-gray-500 text-sm mt-1">Viewing <span className="font-bold text-black uppercase">{userType}</span> accounts.</p>
//                  </div>
//                  <button 
//                     onClick={() => setIsModalOpen(true)}
//                     className="bg-black text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
//                  >
//                     + Add Staff
//                  </button>
//              </div>

//             <AddStaffModal 
//                 isOpen={isModalOpen} 
//                 onClose={() => setIsModalOpen(false)} 
//                 onSuccess={() => {
//                     mutate(); // Refetch the table data
//                     toast.success("Account created successfully!");
//                 }} 
//             />

//             <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
//                 <KpiCard title="Total Users" value={allUsers.length} />
//                 <KpiCard title="Active Users" value={activeCount} />
//                 <KpiCard title="Inactive Users" value={allUsers.length - activeCount} />
//                 <KpiCard title="New Members" value="--" />
//             </div>

//             <FilterBar onFilterChange={applyFilters} />

//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
//                 {isLoading ? (
//                     <div className="p-24 flex flex-col items-center justify-center">
//                         <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
//                         <p className="mt-4 text-gray-400 text-xs font-bold uppercase tracking-widest">Loading...</p>
//                     </div>
//                 ) : (
//                     <GenericTable columns={userTable} data={filteredUsers} />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UserMgt;


import React, { useState, useEffect, useMemo, useCallback } from "react"; // Added useMemo
import { useSelector } from "react-redux";
import useSWR from "swr"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import KpiCard from "./KpiCards";
import { GenericTable } from "./GenericTable";
import { userData, userTable } from "../../utils/Constants";
import FilterBar from "./Filterbar";
import AddStaffModal from "./AddStaffModal";

function UserMgt() {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Added missing state
    
    const { token: reduxToken } = useSelector((state) => state.auth);

    const { data, error: swrError, isLoading, mutate } = useSWR('/api/admin/all');

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
    console.log(allUsers);

    const activeFilteredCount = useMemo(() => {
        return filteredUsers.filter(u => u.is_active === true || u.status === 'active').length;
    }, [filteredUsers]);

    const isNewThisMonth = (dateString) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        const now = new Date();
        return (
            date.getMonth() === now.getMonth() && 
            date.getFullYear() === now.getFullYear()
        );
    };

    const KpiData = [
        { id: "1", title: "Total Users", value: allUsers.length },
        { id: "2", title: "Active Users", value: filteredUsers.length },
        { id: "3", title: "Inactive Users", value: allUsers.length - filteredUsers.length },
        { id: "4", title: "New This Month", value: isNewThisMonth.length || "0" }, 
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
            <ToastContainer 
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
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