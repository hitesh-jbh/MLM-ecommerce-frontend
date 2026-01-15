import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, Key, Camera, Loader2, ShieldCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { editProfileImage } from '../../utils/service/apiService';

const AccountSetting = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.auth?.token);

  // Reusable Styles
  const labelStyle = "block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2";
  const inputStyle = "w-full border-b border-gray-200 py-3 focus:border-black outline-none transition-all text-sm";
  const cardStyle = "group flex flex-col items-center justify-center p-8 border border-gray-100 rounded-sm hover:border-black transition-all duration-300 bg-white cursor-pointer w-full text-center";

  // Modal States
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Logic States
  const [forgotEmail, setForgotEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- PASSWORD RESET LOGIC ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await forgotPassword({ email: forgotEmail });
      toast.success(`Recovery link sent to ${forgotEmail}`);
      setIsForgotModalOpen(false);
      navigate('/reset-password');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send link');
    } finally {
      setLoading(false);
    }
  };

  // --- IMAGE UPLOAD LOGIC ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    console.log(previewUrl)
  };

  const handleUpdateImage = async () => {
    if (!selectedImage) return toast.error("Select an image");
    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await editProfileImage(token, formData);
      toast.success("Profile image updated");
      setIsImageModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">Account Settings</h1>
        <p className="text-xs text-gray-400 mt-2">Manage your profile information and security preferences.</p>
      </header>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Edit Profile Card */}
        <Link to="/profile/edit" className={cardStyle}>
          <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <User size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-widest text-gray-900">Edit Profile</span>
          <span className="text-[11px] text-gray-400 uppercase mt-1">Personal Details</span>
        </Link>

        {/* 2. Security / Forgot Password Card */}
        <button onClick={() => setIsForgotModalOpen(true)} className={cardStyle}>
          <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <Key size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-widest text-gray-900">Security</span>
          <span className="text-[11px] text-gray-400 uppercase mt-1">Reset Password</span>
        </button>

        {/* 3. Edit Profile Image Card */}
        <button onClick={() => setIsImageModalOpen(true)} className={cardStyle}>
          <div className="p-4 bg-gray-50 rounded-full mb-4 group-hover:bg-black group-hover:text-white transition-colors">
            <Camera size={24} strokeWidth={1.5} />
          </div>
          <span className="text-[12px] font-bold uppercase tracking-widest text-gray-900">Profile Image</span>
          <span className="text-[11px] text-gray-400 uppercase mt-1">Change Avatar</span>
        </button>
      </div>

      {/* --- MODAL 1: FORGOT PASSWORD --- */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-10 rounded-sm shadow-2xl relative">
            <button onClick={() => setIsForgotModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black">
              <X size={20} />
            </button>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3">Reset Password</h3>
            <p className="text-gray-400 text-[11px] mb-8">Enter your email to receive a recovery link.</p>
            
            <form onSubmit={handleForgotPassword} className="space-y-8">
              <div>
                <label className={labelStyle}>Email Address</label>
                <input 
                  type="email" required className={inputStyle} 
                  value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="email@gentlehaus.com"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                {loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Request Link'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: UPDATE IMAGE --- */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-10 rounded-sm shadow-2xl relative">
            <button onClick={() => setIsImageModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black">
              <X size={20} />
            </button>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3">Update Image</h3>
            <p className="text-gray-400 text-[11px] mb-8">Click the circle to select a new image.</p>

            <div className="flex flex-col items-center gap-6">
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-32 h-32 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-black transition-all"
              >
                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Camera className="text-gray-300" size={32} />}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              <button onClick={handleUpdateImage} disabled={loading || !selectedImage} className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                {loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Save New Image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSetting;