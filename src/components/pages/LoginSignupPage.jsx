import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerUser, loginUser } from "../../utils/Service/apiService";

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be 6+ characters').regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Need 1 letter & 1 number'),
  confirmPassword: z.string(),
  gender: z.enum(['Male', 'Female', 'Other'], { errorMap: () => ({ message: "Select gender" })}),
  contact: z.string().min(10, "Contact must be 10 digits").max(15),
  dob: z.string().min(1, "Date of birth is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export default function LoginSignupPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const { register: signInReg, handleSubmit: handleSignIn, formState: { errors: inErr, isSubmitting: inLoading }, reset: resIn } = useForm({ resolver: zodResolver(signInSchema) });
  const { register: signUpReg, handleSubmit: handleSignUp, formState: { errors: upErr, isSubmitting: upLoading }, reset: resUp } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSignIn = async (data) => {
    setAuthError('');
    try {
      const response = await loginUser(data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Welcome back to GentleHaus.');
        // Redirect logic here
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || 'The credentials provided are incorrect.');
    }
  };

  const onSignUp = async (data) => {
    setAuthError('');
    const [firstName, ...lastNames] = data.fullName.split(" ");
    const apiData = {
      firstName,
      lastName: lastNames.join(" ") || " ",
      email: data.email,
      password: data.password,
      userType: "user",
      role: "user",
      gender: data.gender,
      contact: data.contact,
      dob: data.dob
    };

    try {
      await registerUser(apiData);
      alert('Account created. Please sign in to GentleHaus.');
      setIsSignIn(true);
      resUp();
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Registration could not be completed.');
    }
  };

  const inputStyle = "w-full py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors placeholder:text-gray-500 text-sm";
  const labelStyle = "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mt-4";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 font-sans antialiased text-black">
      <div className="w-full max-w-6xl flex flex-col md:flex-row border border-gray-100 shadow-2xl rounded-sm overflow-hidden bg-white">
        
        {/* Brand Side */}
        <div className="w-full md:w-1/2 bg-black p-12 flex flex-col justify-between text-white min-h-[300px] md:min-h-[700px]">
          <div>
            <h1 className="text-3xl font-light tracking-[0.3em] uppercase">GentleHaus</h1>
            <div className="h-[1px] w-12 bg-white mt-4"></div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-extralight tracking-tight leading-none">
              {isSignIn ? 'Refined Access.' : 'The Modern Standard.'}
            </h2>
            <p className="text-gray-400 font-light max-w-xs text-lg">
              Experience a curated ecosystem designed for excellence.
            </p>
          </div>

          <div className="text-[10px] tracking-[0.4em] uppercase text-gray-500">
            © 2025 GentleHaus International
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-20 bg-white overflow-y-auto">
          <div className="max-w-md mx-auto">
            <header className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">
                {isSignIn ? 'Member Login' : 'Create Account'}
              </h3>
              <p className="text-gray-400 text-sm">Please provide your details below.</p>
            </header>

            {authError && (
              <div className="mb-8 text-xs font-bold text-red-500 border-l-2 border-red-500 pl-4 py-1 uppercase tracking-wider">
                {authError}
              </div>
            )}

            <form onSubmit={isSignIn ? handleSignIn(onSignIn) : handleSignUp(onSignUp)} className="space-y-2">
              {!isSignIn && (
                <div>
                  <label className={labelStyle}>Full Name</label>
                  <input {...signUpReg("fullName")} placeholder="Type your name" className={inputStyle} />
                </div>
              )}
              
              <div>
                <label className={labelStyle}>Email Address</label>
                <input {...(isSignIn ? signInReg("email") : signUpReg("email"))} placeholder="email@gentlehaus.com" className={inputStyle} />
              </div>
              
              <div>
                <label className={labelStyle}>Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} {...(isSignIn ? signInReg("password") : signUpReg("password"))} placeholder="••••••••" className={inputStyle} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-3 text-gray-400 hover:text-black">
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>

              {!isSignIn && (
                <>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className={labelStyle}>Gender</label>
                      <select {...signUpReg("gender")} className={inputStyle}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelStyle}>Date of Birth</label>
                      <input type="date" {...signUpReg("dob")} className={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label className={labelStyle}>Contact Number</label>
                    <input {...signUpReg("contact")} placeholder="Phone number" className={inputStyle} />
                  </div>
                </>
              )}

              <div className="pt-10">
                <button 
                  type="submit" 
                  disabled={inLoading || upLoading} 
                  className="group flex items-center justify-between w-full py-4 px-6 bg-black text-white hover:bg-gray-900 transition-all rounded-sm"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <footer className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[12px] text-gray-600 uppercase tracking-widest">
                {isSignIn ? "Create account?" : "Already have account?"}
              </span>
              <button 
                onClick={() => setIsSignIn(!isSignIn)} 
                className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
              >
                {isSignIn ? "Sign up" : "Sign In"}
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}