import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, ArrowRight, X } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, forgotPassword } from "../../utils/Service/apiService";
import { loginSuccess } from "../../utils/Slice/authSlice";

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ 
    resolver: zodResolver(signInSchema) 
  });

  // Main Sign In Logic
  const onSignIn = async (formData) => {
    try {
      const loginResponse = await login(formData);
      const responseData = loginResponse.data;

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
        dispatch(loginSuccess({ 
          user: responseData.user, 
          token: responseData.token 
        }));
        toast.success("Welcome back to GentleHaus.",);
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      } else {
        toast.error("Authentication failed. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    }
  };

  // Forgot Password API Integration
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsForgotLoading(true);

    try {
      await forgotPassword({ email: forgotEmail });
      
      toast.info(`A recovery link has been sent to ${forgotEmail}`, {
        position: "top-center",
        autoClose: 5000,
      });
      
      setIsModalOpen(false);
      setForgotEmail('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset link.';
      toast.error(errorMessage);
    } finally {
      setIsForgotLoading(false);
    }
  };

  const inputStyle = "w-full py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm";
  const labelStyle = "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mt-4";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 font-sans antialiased text-black">
      {/* Toast Container Configuration */}
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

      <div className="w-full max-w-6xl flex flex-col lg:flex-row border border-gray-100 shadow-2xl rounded-sm overflow-hidden bg-white">
        
        {/* Brand Side */}
        <div className="w-full lg:w-1/2 bg-black p-8 md:p-12 flex flex-col justify-between text-white min-h-[300px] lg:min-h-[700px]">
          <div>
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase">GentleHaus</h1>
            <div className="h-[1px] w-12 bg-white mt-4"></div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-none">Refined Access.</h2>
            <p className="text-gray-400 font-light max-w-xs text-base md:text-lg">Experience a curated ecosystem designed for excellence.</p>
          </div>
          <div className="hidden lg:block text-[10px] tracking-[0.4em] uppercase text-gray-500">© 2026 GentleHaus International</div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 bg-white">
          <div className="max-w-md mx-auto">
            <header className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">Member Login</h3>
              <p className="text-gray-400 text-sm">Please enter your credentials.</p>
            </header>

            <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
              <div>
                <label className={labelStyle}>Email Address</label>
                <input {...register("email")} placeholder="email@gentlehaus.com" className={inputStyle} />
                {errors.email && <p className="text-[10px] text-red-500 mt-1 uppercase font-bold">{errors.email.message}</p>}
              </div>
              
              <div>
                <label className={labelStyle}>Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="••••••••" className={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-3 text-gray-400 hover:text-black">
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                {errors.password && <p className="text-[10px] text-red-500 mt-1 uppercase font-bold">{errors.password.message}</p>}
              </div>

              <div className="pt-10">
                <button type="submit" disabled={isSubmitting} className="group flex items-center justify-between w-full py-4 px-6 bg-black text-white hover:bg-gray-900 transition-all rounded-sm disabled:bg-gray-400">
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">{isSubmitting ? 'Processing...' : 'Sign In'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <footer className="mt-12 pt-8 border-t border-gray-50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-600 uppercase tracking-widest">Need an account?</span>
                <Link to="/signup" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-all">Sign Up</Link>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-all"
                >
                  Forgot Password?
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-8 rounded-sm shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-black">
              <X size={20} />
            </button>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">Reset Password</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">Enter your email and we'll send you a link to get back into your account.</p>
            
            <form onSubmit={handleForgotPassword} className="space-y-6">
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
                {isForgotLoading ? 'Sending...' : 'Send Recovery Link'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;