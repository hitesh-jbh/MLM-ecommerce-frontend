import React, { useState } from "react";
import Icons from "../ui/Icon";
import { createStaff } from "../../utils/Service/apiService";

function AddStaffModal({ isOpen, onClose, onSuccess }) {
    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userType: "staff", // Default User Type
        role: "inventory_manager", // Default Role
        gender: "Male",
        contact: "",
        dob: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createStaff(formData);
            alert("Staff added successfully!");
            onSuccess();
            setFormData(initialState);
            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Error adding staff");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">z
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50/50 shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Add New Member</h2>
                        <p className="text-xs text-gray-500">Configure account type and permissions</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-black">
                        <Icons icon="heroicons:x-mark" size={22}/>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
                    
                    {/* Name Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">First Name</label>
                            <input required name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none transition" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Last Name</label>
                            <input required name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none transition" />
                        </div>
                    </div>

                    {/* Email & Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Email</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@company.com" className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Password</label>
                            <input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none" />
                        </div>
                    </div>

                    {/* --- NEW SECTION: User Type & Role --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">User Type</label>
                            <select 
                                name="userType" 
                                value={formData.userType} 
                                onChange={handleChange} 
                                className="w-full border border-gray-300 rounded-xl p-3 text-sm bg-white outline-none cursor-pointer"
                            >
                                <option value="staff">Staff Member</option>
                                <option value="admin">Administrator</option>
                                <option value="super_admin">Super Admin</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Specific Role</label>
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange} 
                                className="w-full border border-gray-300 rounded-xl p-3 text-sm bg-white outline-none cursor-pointer"
                            >
                                <option value="inventory_manager">Inventory Manager</option>
                                <option value="sales_representative">Sales Rep</option>
                                <option value="support_specialist">Support</option>
                                <option value="delivery_partner">Delivery</option>
                                <option value="accounts_manager">Accounts</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Contact Number</label>
                            <input required name="contact" value={formData.contact} onChange={handleChange} placeholder="+91..." className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 text-sm bg-white outline-none cursor-pointer">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* DOB */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Date of Birth</label>
                        <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t sticky bottom-0 bg-white">
                        <button 
                            disabled={loading} 
                            className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? "Processing..." : "Confirm Add Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStaffModal;