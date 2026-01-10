import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, Key, ShieldCheck } from 'lucide-react';
import Icons from '../../components/ui/Icon';

const AccountSetting = () => {
  const navigate = useNavigate();

  // Styles
  const labelStyle = "block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2";
  const inputStyle = "w-full border-b border-gray-200 py-3 focus:border-black outline-none transition-all text-sm";
  const cardStyle = "group flex flex-col items-center justify-center p-8 border border-gray-100 rounded-sm hover:border-black transition-all duration-300 bg-white";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsForgotLoading(true);
    setForgotError('');
    try {
      // await forgotPassword({ email: forgotEmail });
      alert(`A recovery link has been sent to ${forgotEmail}`);
      setIsModalOpen(false);
      navigate('/reset-password'); 
    } catch (err) {
      setForgotError(err.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">Account Settings</h1>
        <p className="text-xs text-gray-400 mt-2">Manage your profile information and security preferences.</p>
      </header>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Edit Profile Card */}
        <Link to="/profile/edit" className={cardStyle}>
          <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <User size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-widest text-gray-900">Edit Profile</span>
          <span className="text-[11px] text-gray-400 uppercase mt-1">Update personal details</span>
        </Link>

        {/* Forgot Password Card */}
        <button 
          onClick={() => { setIsModalOpen(true); setForgotError(''); }} 
          className={cardStyle}
        >
          <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <Key size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-widest text-gray-900">Security</span>
          <span className="text-[11px] text-gray-400 uppercase mt-1 ">Reset your password</span>
        </button>

      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-10 rounded-sm shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-6 top-6 text-gray-400 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-gray-900">Reset Password</h3>
            <p className="text-gray-400 text-[11px] mb-8 leading-relaxed">
              Enter your registered email address to receive a recovery link.
            </p>
            
            {forgotError && (
              <div className="mb-6 text-[9px] font-bold text-red-500 bg-red-50 p-4 uppercase tracking-widest border-l-2 border-red-500">
                {forgotError}
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-8">
              <div>
                <label className={labelStyle}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className={inputStyle} 
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="email@gentlehaus.com"
                  disabled={isForgotLoading}
                />
              </div>
              <button 
                type="submit" 
                disabled={isForgotLoading}
                className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all disabled:bg-gray-400 flex items-center justify-center gap-3"
              >
                {isForgotLoading ? (
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Request Link'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSetting;