import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";
import { editProfile } from "../../utils/Service/apiService";
import { loginSuccess } from "../../utils/Slice/authSlice";
import { X, ShieldCheck, Mail, Phone, Lock, Calendar, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Validation Schema
const editSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  contact: z.string().min(10, "Invalid phone number"),
  gender: z.string(),
  dob: z.string(),
  // password: z.string().optional().or(z.string().min(6, "6+ chars")),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    firstName: user?.first_name || user?.firstName || "",
    lastName: user?.last_name || user?.lastName || "",
    email: user?.email || "",
    contact: user?.contact || "",
    gender: user?.gender || "Male",
    dob: user?.dob ? user.dob.split('T')[0] : "",
    // password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const handleSave = async () => {
    const result = editSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((is) => { fieldErrors[is.path[0]] = is.message; });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // MAPPING: Convert camelCase state to your SQL snake_case columns
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        contact: formData.contact.toString().replace(/\D/g, ''), // Ensure BIGINT compatibility
        gender: formData.gender,
        dob: formData.dob
      };
      
      // if (formData.password.trim() !== "") {
      //   payload.password = formData.password;
      // }

      const response = await editProfile(payload);
      
      // Update Redux with fresh data from DB
      const updatedUser = response.data.user || response.data;
      dispatch(loginSuccess({ 
        user: updatedUser, 
        token: token 
      }));
      
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Update failed. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => navigate("/profile")} />
      
      <div className="relative bg-white w-full max-h-[92vh] sm:max-w-2xl sm:rounded-3xl rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 sm:px-10 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black tracking-tight">Account Settings</h2>
            <p className="text-xs text-gray-400">Update your member information</p>
          </div>
          <Link to="/profile/account-setting" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
            <X size={20} />
          </Link>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-800 ml-1">First Name</label>
              <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-800 ml-1">Last Name</label>
              <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-800 ml-1">Email (Primary ID)</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <input type="email" value={formData.email} disabled className="w-full pl-11 pr-4 py-3 bg-gray-700 text-gray-400 border border-gray-100 rounded-xl cursor-not-allowed" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-800 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-black" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-800 ml-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-700 rounded-xl outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-gray-800 ml-1">Gender</label>
            <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-700 rounded-xl outline-none cursor-pointer">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-gray-900" />
              <span className="text-[10px] font-black uppercase tracking-widest">Update Security</span>
            </div>
            <input type="password" placeholder="New Password (or leave blank)" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-black" />
          </div> */}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate("/profile")} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black">Discard</button>
          <button onClick={handleSave} disabled={isSubmitting} className="flex-[2] py-4 bg-black text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
            {isSubmitting ? "Syncing..." : "Apply Changes"}
            {!isSubmitting && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;