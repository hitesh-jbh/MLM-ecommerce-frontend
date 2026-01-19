

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import KpiCard from "../../components/admin_component/KpiCards";
import { GenericTable } from "../../components/partials/table/GenericTable";
import { userTable } from "../../utils/Constants";
import FilterBar from "../../components/ui/bar/Filterbar";
import AddStaffModal from "../../components/admin_component/AddStaffModal";
import Icons from "../../components/ui/Icon";
import { updateStaff } from "../../utils/service/apiService";

function UserMgt() {
    const { token } = useSelector((state) => state.auth);
    
    // UI States
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    // Selection & Payload States
    const [selectedUser, setSelectedUser] = useState(null);
    const [editPayload, setEditPayload] = useState({ role: "", user_type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Data
    const { data, isLoading, mutate } = useSWR('/api/admin/all');

    const allUsers = useMemo(() => {
        const rawUsers = data?.users || data;
        return Array.isArray(rawUsers) ? rawUsers : [];
    }, [data]);

    useEffect(() => {
        setFilteredUsers(allUsers);
    }, [allUsers]);

    // Handle Edit Click
    const handleOpenEdit = (user) => {
        setSelectedUser(user);
        setEditPayload({
            role: user.role || "user",
            user_type: user.user_type || "general"
        });
        setIsEditModalOpen(true);
    };

    // Handle API Update
    const handleUpdatePermissions = async () => {
    if (!selectedUser || !token) return;
    
    setIsSubmitting(true);
    try {
        const userId = selectedUser.id || selectedUser._id;
        
        console.log("Token exists:", !!token);
        console.log("User ID:", userId);
        console.log("Edit Payload:", editPayload);
        
        // Prepare the data in the correct format
        const staffData = {
            id: userId,
            ...editPayload
        };
        // Call API with token and staffData
        const response = await updateStaff(token, staffData);
        
        toast.success(`Updated ${selectedUser.first_name || selectedUser.firstName} successfully!`);
        mutate(); // Revalidate the data
        
        setIsEditModalOpen(false);
        setSelectedUser(null);
    } catch (error) {
        toast.error(
            error.response?.data?.message || 
            error.response?.data?.error || 
            "Failed to update permissions. Please try again."
        );
    } finally {
        setIsSubmitting(false);
    }
};

    const applyFilters = useCallback((filters) => {
        let result = [...allUsers];
        if (filters.role && filters.role !== "All") {
            result = result.filter(u => u.role?.toLowerCase() === filters.role.toLowerCase());
        }
        setFilteredUsers(result);
    }, [allUsers]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
            <ToastContainer position="bottom-right" />

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">User Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage user roles and partner types.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition"
                >
                    + Add Staff
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard title="Total Users" value={allUsers.length} />
                <KpiCard title="Filtered List" value={filteredUsers.length} />
            </div>
            
            <FilterBar onFilterChange={applyFilters} />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 text-center text-gray-400 animate-pulse font-bold tracking-widest uppercase text-xs">
                        Loading User Directory...
                    </div>
                ) : (
                    <GenericTable columns={userTable(handleOpenEdit)} data={filteredUsers} />
                )}
            </div>

            {/* ASSIGN ROLE & TYPE MODAL */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="font-bold text-gray-800">Assign Permissions</h3>
                                <p className="text-[10px] font-mono text-blue-600 mt-0.5">UID: #{selectedUser?.id || selectedUser?._id}</p>
                            </div>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <Icons icon="heroicons:x-mark" size={20}/>
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Role Select */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">System Role</label>
                                <select 
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none bg-white transition"
                                    value={editPayload.role}
                                    onChange={(e) => setEditPayload({...editPayload, role: e.target.value})}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="inventory_manager">Inventory Manager</option>
                                    <option value="super_admin">Super Administrator</option>
                                </select>
                            </div>

                            {/* User Type Select */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">User Category</label>
                                <select 
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none bg-white transition"
                                    value={editPayload.user_type}
                                    onChange={(e) => setEditPayload({...editPayload, user_type: e.target.value})}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700">
                                Cancel
                            </button>
                            <button 
                                onClick={handleUpdatePermissions} 
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-black text-white rounded-xl font-bold text-sm disabled:bg-gray-400 shadow-lg shadow-black/10 active:scale-95 transition-all"
                            >
                                {isSubmitting ? "Updating..." : "Confirm Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AddStaffModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={() => mutate()} />
        </div>
    );
}

export default UserMgt;