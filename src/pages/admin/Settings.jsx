import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { Trash2, CheckCircle, Loader2 } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import { forgotPassword } from '../../utils/service/apiService'; // Ensure correct path

/* ---------- Reusable Modal ---------- */
const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h3 className="mb-4 text-lg font-black uppercase tracking-tight text-gray-800">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-4 right-4 hover:text-black transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setIsSending(true);
    try {
      const response = await forgotPassword({ email });
      if (response.data.success || response.status === 200) {
        toast.success("Reset link sent! Redirecting...");
        
        // Wait 2 seconds then navigate
        setTimeout(() => {
          setShowPasswordModal(false);
          navigate("/reset-password"); // Adjust route as needed
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset email");
      setIsSending(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="light" autoClose={3000} />
      
      <div className="max-w-4xl p-4 mx-auto sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Security</h2>
          <p className="text-sm text-gray-500 font-medium">
            Manage your account security and devices.
          </p>
        </div>

        {/* Password Section */}
        <div className="flex flex-col items-start justify-between gap-4 pb-6 border-b sm:flex-row sm:items-center">
          <div>
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-1">Password</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="tracking-tighter font-bold">••••••••••••</span>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span className="text-[10px] font-black text-green-600 uppercase">Very secure</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-6 py-2 text-xs font-black uppercase tracking-widest border-2 border-gray-100 rounded-xl hover:border-black transition-all active:scale-95 shadow-sm"
          >
            Edit
          </button>
        </div>

        {/* Rest of your UI (Two-step, Devices, etc.) */}
      </div>

      {/* Forgot Password Modal */}
      {showPasswordModal && (
        <Modal 
          title="Reset Your Password" 
          onClose={() => !isSending && setShowPasswordModal(false)}
        >
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              Enter your email address below. we will send you a secure link to reset your password.
            </p>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-black focus:bg-white outline-none transition-all font-semibold text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 bg-black text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Settings;