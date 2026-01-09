import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../../utils/Slice/authSlice";
import { registerUser, getProfile } from "../../utils/Service/apiService";

const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, '6+ characters').regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Need 1 letter & 1 number'),
  confirmPassword: z.string(),
  gender: z.enum(['Male', 'Female', 'Other'], { errorMap: () => ({ message: "Select gender" })}),
  contact: z.string().min(10, "Contact must be 10 digits").max(15),
  dob: z.string().min(1, "Date of birth is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const SignUp =() => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ 
    resolver: zodResolver(signUpSchema) 
  });

  const dispatch = useDispatch();

  // Sign Up Logic
  const handleSignup = async (data) => {
    setAuthError('');
    try {
      const response = await registerUser(data);
      if (response.data) {
        toast.success(`Registration Successful!`, {
          position: "top-center",
        });
        
        if(response.data.referralToken) {
            toast.info(`Your Referral Token: ${response.data.referralToken}`);
        }

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed. Please try again.";
      setAuthError(message);
      toast.error(message);
      console.error("Signup Error:", error);
    }
  };

  const inputStyle = "w-full py-2 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors placeholder:text-gray-500 text-sm";
  const labelStyle = "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mt-3";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 font-sans text-black">
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
      <div className="w-full max-w-6xl flex flex-col md:flex-row border border-gray-100 shadow-2xl rounded-sm overflow-hidden bg-white">
        
        {/* Brand Side */}
        <div className="w-full md:w-1/2 bg-black p-12 flex flex-col justify-between text-white min-h-[300px] md:min-h-[700px]">
          <div>
            <h1 className="text-3xl font-light tracking-[0.3em] uppercase">GentleHaus</h1>
            <div className="h-[1px] w-12 bg-white mt-4"></div>
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-extralight tracking-tight leading-none">The Modern Standard.</h2>
            <p className="text-gray-400 font-light max-w-xs text-lg">Join a curated ecosystem designed for excellence.</p>
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gray-500">© 2025 GentleHaus International</div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16 bg-white overflow-y-auto max-h-[90vh]">
          <div className="max-w-md mx-auto">
            <header className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">Create Account</h3>
              <p className="text-gray-400 text-sm">Please provide your details below.</p>
            </header>

            {authError && (
              <div className="mb-6 text-xs font-bold text-red-500 border-l-2 border-red-500 pl-4 py-1 uppercase tracking-wider">{authError}</div>
            )}

            <form onSubmit={handleSubmit(handleSignup)} className="space-y-2">
              {/* First Name Section */}
              <div>
                <label className={labelStyle}>First Name</label>
                <input {...register("firstName")} placeholder="First name" className={inputStyle} />
                {errors.firstName && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">{errors.firstName.message}</p>}
              </div>

              {/* Last Name Section */}
              <div>
                <label className={labelStyle}>Last Name</label>
                <input {...register("lastName")} placeholder="Last name" className={inputStyle} />
                {errors.lastName && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">{errors.lastName.message}</p>}
              </div>
              
              <div>
                <label className={labelStyle}>Email Address</label>
                <input {...register("email")} placeholder="email@gentlehaus.com" className={inputStyle} />
                {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">{errors.email.message}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Password</label>
                  <input type="password" {...register("password")} placeholder="••••••••" className={inputStyle} />
                  {errors.password && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">{errors.password.message}</p>}
                </div>
                <div>
                  <label className={labelStyle}>Confirm</label>
                  <input type="password" {...register("confirmPassword")} placeholder="••••••••" className={inputStyle} />
                  {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold uppercase mt-1">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Gender</label>
                  <select {...register("gender")} className={inputStyle}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Date of Birth</label>
                  <input type="date" {...register("dob")} className={inputStyle} />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Contact Number</label>
                <input {...register("contact")} placeholder="Phone number" className={inputStyle} />
              </div>

              <div className="pt-8">
                <button type="submit" disabled={isSubmitting} className="group flex items-center justify-between w-full py-4 px-6 bg-black text-white hover:bg-gray-900 transition-all rounded-sm">
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">{isSubmitting ? 'Registering...' : 'Sign Up'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <footer className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[12px] text-gray-600 uppercase tracking-widest">Have account?</span>
              <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-all">Sign In</Link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;