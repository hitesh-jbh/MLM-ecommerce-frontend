import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, getProfile } from "../../utils/Service/apiService";
import { loginSuccess } from "../../utils/Slice/authSlice";

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ 
    resolver: zodResolver(signInSchema) 
  });

  const onSignIn = async (data) => {
    setAuthError('');
    try {
      const loginResponse = await loginUser(data);
      const { success, token } = loginResponse.data;

      if (success && token) {
        const profileResponse = await getProfile(token);
        // const userData = profileResponse.data;
        const userData = {
          ...profileResponse.data,
          firstName: profileResponse.data.firstName || data.firstName,
          lastName: profileResponse.data.lastName || data.lastName,
          contact: profileResponse.data.contact || data.contact,
          dob: profileResponse.data.dob || data.dob,
        };

        dispatch(loginSuccess({ user: userData, token: token }));
        alert(`Welcome back, ${userData.email}`);
        // navigate('/profile');
        navigate('/');
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Invalid credentials.');
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
            <h2 className="text-5xl md:text-6xl font-extralight tracking-tight leading-none">Refined Access.</h2>
            <p className="text-gray-400 font-light max-w-xs text-lg">Experience a curated ecosystem designed for excellence.</p>
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gray-500">© 2025 GentleHaus International</div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-20 bg-white">
          <div className="max-w-md mx-auto">
            <header className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">Member Login</h3>
              <p className="text-gray-400 text-sm">Please enter your credentials.</p>
            </header>

            {authError && (
              <div className="mb-8 text-xs font-bold text-red-500 border-l-2 border-red-500 pl-4 py-1 uppercase tracking-wider">{authError}</div>
            )}

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
                <button type="submit" disabled={isSubmitting} className="group flex items-center justify-between w-full py-4 px-6 bg-black text-white hover:bg-gray-900 transition-all rounded-sm">
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">{isSubmitting ? 'Processing...' : 'Sign In'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <footer className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[12px] text-gray-600 uppercase tracking-widest">Need an account?</span>
              <Link to="/signup" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-all">Sign Up</Link>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}








// import { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';

// // Define Zod schemas for validation
// const signInSchema = z.object({
//   email: z.string()
//     .min(1, { message: 'Email is required' })
//     .email({ message: 'Please enter a valid email address' }),
//   password: z.string()
//     .min(1, { message: 'Password is required' })
//     .min(6, { message: 'Password must be at least 6 characters' })
// });

// const signUpSchema = z.object({
//   fullName: z.string()
//     .min(1, { message: 'Full name is required' })
//     .min(2, { message: 'Full name must be at least 2 characters' }),
//   email: z.string()
//     .min(1, { message: 'Email is required' })
//     .email({ message: 'Please enter a valid email address' }),
//   password: z.string()
//     .min(1, { message: 'Password is required' })
//     .min(6, { message: 'Password must be at least 6 characters' })
//     .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, { 
//       message: 'Password must contain at least one letter and one number' 
//     }),
//   confirmPassword: z.string()
//     .min(1, { message: 'Please confirm your password' })
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"]
// });

// export default function LoginPage() {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [authError, setAuthError] = useState('');

//   // Use react-hook-form with Zod resolver for Sign In
//   const {
//     register: signInRegister,
//     handleSubmit: handleSignInSubmit,
//     formState: { errors: signInErrors, isSubmitting: isSignInSubmitting },
//     reset: resetSignInForm,
//     setError: setSignInError
//   } = useForm({
//     resolver: zodResolver(signInSchema)
//   });

//   // Use react-hook-form with Zod resolver for Sign Up
//   const {
//     register: signUpRegister,
//     handleSubmit: handleSignUpSubmit,
//     formState: { errors: signUpErrors, isSubmitting: isSignUpSubmitting },
//     reset: resetSignUpForm,
//     watch: watchSignUpFields
//   } = useForm({
//     resolver: zodResolver(signUpSchema)
//   });

//   // Watch password field for real-time validation feedback
//   const signUpPassword = watchSignUpFields('password');

//   // Handle Sign In
//   const onSignIn = (data) => {
//     setAuthError('');
    
//     // Check if user exists
//     const user = users.find(
//       user => user.email === data.email && user.password === data.password
//     );
    
//     if (!user) {
//       setAuthError('Invalid email or password. Please try again.');
//       setSignInError('password', {
//         type: 'manual',
//         message: 'Invalid credentials'
//       });
//       return;
//     }
    
//     console.log('Sign In successful:', user);
//     alert('Sign In successful! Welcome back ' + user.fullName);
//     resetSignInForm();
//     setAuthError('');
//   };

//   // Handle Sign Up
//   const onSignUp = (data) => {
//     setAuthError('');
    
//     // Check if email already exists
//     const existingUser = users.find(user => user.email === data.email);
//     if (existingUser) {
//       setAuthError('Email is already registered. Please use a different email.');
//       return;
//     }
    
//     const newUser = {
//       fullName: data.fullName,
//       email: data.email,
//       password: data.password
//     };
    
//     const updatedUsers = [...users, newUser];
//     setUsers(updatedUsers);
//     console.log('All Users:', updatedUsers);
    
//     alert('Account created successfully!\nWelcome ' + data.fullName);
//     resetSignUpForm();
//     setAuthError('');
//     setIsSignIn(true);
//   };

//   // Handle form switching
//   const switchToSignUp = () => {
//     setIsSignIn(false);
//     resetSignInForm();
//     setAuthError('');
//   };

//   const switchToSignIn = () => {
//     setIsSignIn(true);
//     resetSignUpForm();
//     setAuthError('');
//   };

//   // Helper function to render error messages
//   const ErrorMessage = ({ message }) => (
//     <div className="mt-1">
//       <p className="text-red-500 text-sm">{message}</p>
//     </div>
//   );

//   // Password strength indicator component
//   const PasswordStrengthIndicator = ({ password }) => {
//     if (!password) return null;
    
//     const hasMinLength = password.length >= 6;
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const isStrong = hasMinLength && hasLetter && hasNumber;
    
//     return (
//       <div className="mt-2">
//         <div className="text-xs text-gray-500 mb-1">Password strength:</div>
//         <div className="flex items-center space-x-2">
//           <div className={`h-1 flex-1 rounded ${hasMinLength ? 'bg-green-500' : 'bg-gray-300'}`}></div>
//           <div className={`h-1 flex-1 rounded ${hasLetter ? 'bg-green-500' : 'bg-gray-300'}`}></div>
//           <div className={`h-1 flex-1 rounded ${hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}></div>
//         </div>
//         <div className="text-xs text-gray-500 mt-1">
//           {isStrong ? 'Strong password ✓' : 'Include letters, numbers, and at least 6 characters'}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-900 via-rose-700 to-purple-900 flex items-center justify-center p-4">
//       <div className="w-full h-[600px] max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex">
//         {/* Left Side - Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">
//             Hello Again!
//           </h1>

//           {/* Auth Error Message */}
//           {authError && (
//             <div className="mt-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600 text-sm font-medium">{authError}</p>
//             </div>
//           )}

//           {isSignIn ? (
//             // Sign In Form
//             <form onSubmit={handleSignInSubmit(onSignIn)} className="mt-8">
//               <p className="text-gray-600 mb-6 font-medium">Let's get started with your 30 days trial!</p>

//               <div className="mb-4">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   {...signInRegister("email")}
//                   className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 ${
//                     signInErrors.email ? 'focus:ring-red-500 ring-1 ring-red-300' : 'focus:ring-purple-500'
//                   } placeholder-gray-400`}
//                 />
//                 {signInErrors.email && <ErrorMessage message={signInErrors.email.message || ''} />}
//               </div>

//               <div className="mb-2">
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Password"
//                     {...signInRegister("password")}
//                     className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 ${
//                       signInErrors.password ? 'focus:ring-red-500 ring-1 ring-red-300' : 'focus:ring-purple-500'
//                     } placeholder-gray-400`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {signInErrors.password && <ErrorMessage message={signInErrors.password.message || ''} />}
//               </div>

//               <div className="text-right mb-6">
//                 <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
//                   Recovery Password
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSignInSubmitting}
//                 className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 rounded-lg transition duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSignInSubmitting ? 'Signing In...' : 'Sign In'}
//               </button>

//               <div className="text-center mb-6">
//                 <p className="text-gray-600 text-sm">Or continue with</p>
//               </div>

//               <div className="flex gap-4 justify-center mb-6">
//                 <button type="button" className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
//                   <img
//                     src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
//                     alt="Google"
//                     className="w-6 h-6 object-contain"
//                   />
//                 </button>

//                 <button type="button" className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
//                   <img
//                     src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png"
//                     alt="Apple"
//                     className="w-6 h-6 object-contain"
//                   />
//                 </button>

//                 <button type="button" className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition">
//                   <img
//                     src="https://img.freepik.com/premium-vector/facebook-logo-vector-facebook-official-logo-vector-facebook-logo-illustrator_1002350-1803.jpg?semt=ais_hybrid&w=740&q=80"
//                     alt="Facebook"
//                     className="w-6 h-6 object-contain"
//                   />
//                 </button>
//               </div>

//               <div className="text-center">
//                 <p className="text-gray-600 text-sm">
//                   Don't have an account?{' '}
//                   <button
//                     type="button"
//                     onClick={switchToSignUp}
//                     className="text-rose-500 font-semibold hover:text-rose-600"
//                   >
//                     Create Account
//                   </button>
//                 </p>
//               </div>
//             </form>
//           ) : (
//             // Sign Up Form
//             <form onSubmit={handleSignUpSubmit(onSignUp)} className="mt-8">
//               <p className="text-gray-600 mb-6 font-medium">Create your account</p>

//               <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   {...signUpRegister("fullName")}
//                   className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 ${
//                     signUpErrors.fullName ? 'focus:ring-red-500 ring-1 ring-red-300' : 'focus:ring-purple-500'
//                   } placeholder-gray-400`}
//                 />
//                 {signUpErrors.fullName && <ErrorMessage message={signUpErrors.fullName.message || ''} />}
//               </div>

//               <div className="mb-4">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   {...signUpRegister("email")}
//                   className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 ${
//                     signUpErrors.email ? 'focus:ring-red-500 ring-1 ring-red-300' : 'focus:ring-purple-500'
//                   } placeholder-gray-400`}
//                 />
//                 {signUpErrors.email && <ErrorMessage message={signUpErrors.email.message || ''} />}
//               </div>

//               <div className="mb-4">
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Password"
//                     {...signUpRegister("password")}
//                     className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 ${
//                       signUpErrors.password ? 'focus:ring-red-500 ring-1 ring-red-300' : 'focus:ring-purple-500'
//                     } placeholder-gray-400`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {signUpErrors.password && <ErrorMessage message={signUpErrors.password.message || ''} />}
//                 <PasswordStrengthIndicator password={signUpPassword} />
//               </div>

//               <div className="mb-6">
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   {...signUpRegister("confirmPassword")}
//                   className={`w-full px-4 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 ${
//                     signUpErrors.confirmPassword ? 'focus:ring-red-500 ring-1 ring-red-300' : 'focus:ring-purple-500'
//                   } placeholder-gray-400`}
//                 />
//                 {signUpErrors.confirmPassword && <ErrorMessage message={signUpErrors.confirmPassword.message || ''} />}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSignUpSubmitting}
//                 className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 rounded-lg transition duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSignUpSubmitting ? 'Creating Account...' : 'Create Account'}
//               </button>

//               <div className="text-center">
//                 <p className="text-gray-600 text-sm">
//                   Already have an account?{' '}
//                   <button
//                     type="button"
//                     onClick={switchToSignIn}
//                     className="text-rose-500 font-semibold hover:text-rose-600"
//                   >
//                     Sign In
//                   </button>
//                 </p>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* Right Side - Illustration */}
//         <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-gradient-to-b from-purple-400 via-rose-300 to-purple-400">
//           <svg
//             viewBox="0 0 600 700"
//             className="w-full h-full"
//             preserveAspectRatio="xMidYMid slice"
//           >
//             <defs>
//               <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#6B3FA0" />
//                 <stop offset="50%" stopColor="#E8A87C" />
//                 <stop offset="100%" stopColor="#C5A3D4" />
//               </linearGradient>
//               <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#FFE5B4" />
//                 <stop offset="100%" stopColor="#FFC875" />
//               </linearGradient>
//             </defs>

//             {/* Background */}
//             <rect width="600" height="700" fill="url(#skyGradient)" />

//             {/* Sun */}
//             <circle cx="480" cy="150" r="80" fill="url(#sunGradient)" opacity="0.9" />
//             <circle cx="480" cy="150" r="75" fill="url(#sunGradient)" opacity="0.6" />

//             {/* Land waves */}
//             <path
//               d="M 0 400 Q 150 350 300 380 T 600 380 L 600 700 L 0 700 Z"
//               fill="#B8A5D1"
//               opacity="0.7"
//             />
//             <path
//               d="M 0 450 Q 150 420 300 440 T 600 440 L 600 700 L 0 700 Z"
//               fill="#A39AC5"
//               opacity="0.6"
//             />
//             <path
//               d="M 0 500 Q 150 480 300 490 T 600 500 L 600 700 L 0 700 Z"
//               fill="#8F7EB3"
//               opacity="0.5"
//             />

//             {/* Trees on left */}
//             <line x1="50" y1="500" x2="50" y2="600" stroke="#1a1a1a" strokeWidth="8" />
//             <path
//               d="M 30 480 Q 50 450 70 480"
//               fill="none"
//               stroke="#1a1a1a"
//               strokeWidth="6"
//             />

//             <line x1="120" y1="520" x2="120" y2="620" stroke="#1a1a1a" strokeWidth="8" />
//             <path
//               d="M 100 500 Q 120 470 140 500"
//               fill="none"
//               stroke="#1a1a1a"
//               strokeWidth="6"
//             />

//             {/* Trees on right */}
//             <line x1="480" y1="480" x2="480" y2="580" stroke="#1a1a1a" strokeWidth="8" />
//             <path
//               d="M 460 460 Q 480 430 500 460"
//               fill="none"
//               stroke="#1a1a1a"
//               strokeWidth="6"
//             />

//             <line x1="540" y1="500" x2="540" y2="600" stroke="#1a1a1a" strokeWidth="8" />
//             <path
//               d="M 520 480 Q 540 450 560 480"
//               fill="none"
//               stroke="#1a1a1a"
//               strokeWidth="6"
//             />

//             {/* Decorative plants */}
//             <path
//               d="M 180 350 Q 200 320 220 350"
//               fill="none"
//               stroke="#1a1a1a"
//               strokeWidth="5"
//             />

//             {/* "Finally, you're here" text */}
//             <text
//               x="300"
//               y="280"
//               textAnchor="middle"
//               fill="white"
//               fontSize="32"
//               fontWeight="bold"
//               opacity="0.8"
//             >
//               Finally, you're here
//             </text>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }
