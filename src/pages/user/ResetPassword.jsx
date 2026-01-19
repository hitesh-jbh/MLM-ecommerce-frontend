import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../utils/service/apiService';// Adjust path as needed

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 6) {
        setFormData({ ...formData, [name]: numericValue });
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.otp.trim()) newErrors.otp = 'OTP is required';
    else if (formData.otp.length !== 6) newErrors.otp = 'OTP must be 6 digits';

    if (formData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    try {
      await sendOTP(formData.email);
      setMessage({ text: 'OTP sent successfully!', type: 'success' });
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to send OTP', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const requestData = {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      };

      // INTEGRATION POINT: Using apiService
      await resetPassword(requestData);

      setMessage({ text: 'Password reset successful! Redirecting...', type: 'success' });
      setFormData({ email: '', otp: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => navigate('/login'), 3000);

    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Error resetting password', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-3 rounded-full">
              <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your details to create a new password</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Email Address</label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="you@example.com"
              />
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={isLoading}
                className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-medium transition-colors"
              >
                Send OTP
              </button>
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-900">OTP Code</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              maxLength="6"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="6-digit OTP"
            />
            {errors.otp && <p className="mt-1 text-xs text-red-600">{errors.otp}</p>}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Min 6 characters"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.newPassword && <p className="mt-1 text-xs text-red-600">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Repeat password"
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 shadow-md font-medium transition-colors"
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;