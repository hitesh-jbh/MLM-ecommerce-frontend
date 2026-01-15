import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";
import { editProfile } from "../../utils/service/apiService";
import { loginSuccess } from "../../utils/Slice/authSlice";
import { X, Phone, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Validation Schema: Only validating the fields we are updating
const editSchema = z.object({
  contact: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.string().min(1, "Date of birth is required"),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get current user and token from Redux
  const { user, token } = useSelector((state) => state.auth);
  
  // Initialize state only with the two fields you want to update
  const [formData, setFormData] = useState({
    contact: user?.contact || "",
    dob: user?.dob ? user.dob.split('T')[0] : "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const handleSave = async () => {
    // 1. Validate inputs
    const result = editSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((is) => { fieldErrors[is.path[0]] = is.message; });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // 2. Prepare payload (matching backend snake_case if necessary)
      const payload = {
        contact: formData.contact.toString().replace(/\D/g, ''), // remove non-digits
        dob: formData.dob
      };
      
      // 3. Call API passing token and data
      const response = await editProfile(token, payload);
      
      // 4. Update Redux with the new user data returned from server
      const updatedUser = response.data?.user || response.data;
      
      dispatch(loginSuccess({ 
        user: updatedUser, 
        token: token 
      }));
      
      // 5. Success Toast and Navigation
      toast.success("Profile information updated!");
      navigate("/profile/account-setting"); 
      
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => navigate("/profile/account-setting")} />
      
      <div className="relative bg-white w-full max-h-[92vh] sm:max-w-xl sm:rounded-3xl rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 sm:px-10 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black tracking-tight uppercase">Update Profile</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Contact & Birthday</p>
          </div>
          <button onClick={() => navigate("/profile/account-setting")} className="p-2 bg-gray-50 hover:bg-gray-200 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 gap-6">
            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Enter phone number"
                    value={formData.contact} 
                    onChange={(e) => setFormData({...formData, contact: e.target.value})} 
                    className={`w-full pl-11 pr-4 py-4 bg-gray-50 border ${errors.contact ? 'border-red-500' : 'border-gray-200'} rounded-2xl outline-none focus:border-black transition-all`} 
                />
              </div>
              {errors.contact && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.contact}</p>}
            </div>

            {/* DOB Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="date" 
                    value={formData.dob} 
                    onChange={(e) => setFormData({...formData, dob: e.target.value})} 
                    className={`w-full pl-11 pr-4 py-4 bg-gray-50 border ${errors.dob ? 'border-red-500' : 'border-gray-200'} rounded-2xl outline-none focus:border-black transition-all`} 
                />
              </div>
              {errors.dob && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.dob}</p>}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-white flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => navigate("/profile/account-setting")} 
            className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSave} 
            disabled={isSubmitting} 
            className="flex-[2] py-4 bg-black text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300"
          >
            {isSubmitting ? "Updating..." : "Save Details"}
            {!isSubmitting && <ChevronRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;