import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, ArrowRight, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, forgotPassword } from "../../utils/service/apiService";
import { loginSuccess } from "../../utils/slice/authSlice";
import { currentYear, dummyEmail, websiteName } from "../../utils/constants";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSignIn = async (formData) => {
    try {
      const loginResponse = await login(formData);
      // Accessing the data directly from the response
      const responseData = loginResponse.data;

      // FIX: Changed 'token' to 'accessToken' to match your API response
      if (responseData && responseData.accessToken) {
        // Store the token for the Axios interceptor
        localStorage.setItem("token", responseData.accessToken);
        
        // Optional: Store refresh token if you plan to use it later
        if (responseData.refreshToken) {
          localStorage.setItem("refreshToken", responseData.refreshToken);
        }

        // Update Redux state
        dispatch(loginSuccess({ 
            user: responseData.user, 
            token: responseData.accessToken 
        }));

        toast.success("Welcome back.");
        navigate("/");
      } else {
        // This triggers if the 200 OK response doesn't contain accessToken
        toast.error("Authentication failed: Missing token.");
      }
    } catch (err) {
      // Handles 401, 403, or 500 errors from the server
      const message = err.response?.data?.message || "Invalid credentials.";
      toast.error(message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsForgotLoading(true);
    try {
      await forgotPassword({ email: forgotEmail });
      toast.info(`Recovery link sent to ${forgotEmail}`);
      setIsModalOpen(false);
      setForgotEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send link.");
    } finally {
      setIsForgotLoading(false);
    }
  };

  const inputStyle = "w-full py-2 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm";
  const labelStyle = "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mt-4";

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 md:p-6 font-sans antialiased text-black">
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />

      <div className="w-full max-w-4xl flex flex-col lg:flex-row border border-gray-200 shadow-2xl rounded-sm overflow-hidden bg-white">
        
        {/* Brand Side */}
        <div className="w-full lg:w-5/12 bg-black p-8 md:p-12 flex flex-col justify-between text-white relative">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-lg font-light tracking-[0.3em] uppercase">{websiteName}</h1>
            <div className="h-[1px] w-8 bg-white mt-4"></div>
          </div>

          <div className="my-8 lg:my-0">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
              Refined <br className="hidden md:block" /> Access.
            </h2>
            <p className="text-gray-400 font-light max-w-xs text-sm mt-4 leading-relaxed">
              Experience a curated ecosystem designed for excellence.
            </p>
          </div>

          <div className="mt-8 lg:mt-0 text-[9px] tracking-[0.3em] uppercase text-gray-500">
            © {currentYear} {websiteName}
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-7/12 p-6 md:p-12 lg:p-16 bg-white flex items-center justify-center">
          <div className="w-full max-w-sm">
            <header className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-black">Member Login</h3>
              <p className="text-gray-400 text-xs font-light">Enter your digital identity to continue.</p>
            </header>

            <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
              <div>
                <label className={labelStyle}>Email Address</label>
                <input 
                  {...register("email")} 
                  placeholder={dummyEmail} 
                  className={inputStyle} 
                />
                {errors.email && (
                  <p className="text-[9px] text-red-500 mt-1 uppercase font-bold tracking-wider">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelStyle}>Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    {...register("password")} 
                    placeholder="••••••••" 
                    className={inputStyle} 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-0 bottom-2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[9px] text-red-500 mt-1 uppercase font-bold tracking-wider">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="group flex items-center justify-between w-full py-3.5 px-6 bg-black text-white hover:bg-zinc-800 transition-all rounded-sm disabled:bg-gray-400"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                    {isSubmitting ? 'Processing...' : 'Sign In'}
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <footer className="mt-10 pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest">New here?</span>
                <Link to="/signup" className="text-[9px] font-bold uppercase tracking-widest border-b border-black hover:text-gray-500 transition-all">
                  Sign Up
                </Link>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="text-[9px] font-bold uppercase tracking-widest text-gray-700 hover:text-black"
              >
                Forgot Password?
              </button>
            </footer>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 md:p-8 rounded-sm shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Reset Access</h3>
            <p className="text-gray-400 text-xs mb-6 font-light">Enter your email to receive a recovery link.</p>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className={labelStyle}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className={inputStyle} 
                  value={forgotEmail} 
                  onChange={(e) => setForgotEmail(e.target.value)} 
                  disabled={isForgotLoading}
                />
              </div>
              <button 
                type="submit" 
                disabled={isForgotLoading} 
                className="w-full py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-colors"
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




// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Eye, EyeOff, ArrowRight, X } from "lucide-react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login, forgotPassword } from "../../utils/service/apiService";
// import { loginSuccess } from "../../utils/slice/authSlice";
// import { currentYear, dummyEmail, websiteName } from "../../utils/constants";

// const signInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [isForgotLoading, setIsForgotLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(signInSchema),
//   });

//   useEffect(() => {
//     document.documentElement.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.documentElement.style.overflow = "auto";
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const onSignIn = async (formData) => {
//     try {
//       const loginResponse = await login(formData);
//       const responseData = loginResponse.data;

//       if (responseData.token) {
//         localStorage.setItem("token", responseData.token);
//         dispatch(loginSuccess({ user: responseData.user, token: responseData.token }));
//         toast.success("Welcome back.");
//         navigate("/");
//       } else {
//         toast.error("Authentication failed.");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid credentials.");
//     }
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setIsForgotLoading(true);
//     try {
//       await forgotPassword({ email: forgotEmail });
//       toast.info(`Recovery link sent to ${forgotEmail}`);
//       setIsModalOpen(false);
//       setForgotEmail("");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send link.");
//     } finally {
//       setIsForgotLoading(false);
//     }
//   };

//   // Standardized Styles
//   const inputStyle = "w-full py-2 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm";
//   const labelStyle = "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mt-4";

//   return (
//     <div className="w-full bg-gray-100 flex items-center justify-center p-3 font-sans antialiased text-black">
//       <ToastContainer position="bottom-right" autoClose={3000} theme="light" />

//       {/* Main Container - max-w-4xl is the "Normal" industry standard for this layout */}
//       <div className="w-full max-w-4xl flex flex-col md:row lg:flex-row border border-gray-200 shadow-2xl rounded-sm overflow-hidden bg-white">
        
//         {/* Left Side: Brand Identity */}
//         <div className="w-full lg:w-5/12 bg-black p-8 md:p-12 flex flex-col justify-between text-white relative">
//           <div>
//             <h1 className="text-lg font-light tracking-[0.3em] uppercase">{websiteName}</h1>
//             <div className="h-[1px] w-8 bg-white mt-4"></div>
//           </div>

//           <div className="my-12 lg:my-0">
//             <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
//               Refined <br /> Access.
//             </h2>
//             <p className="text-gray-400 font-light max-w-xs text-sm mt-4 leading-relaxed">
//               Experience a curated ecosystem designed for excellence.
//             </p>
//           </div>

//           <div className="hidden lg:block text-[9px] tracking-[0.3em] uppercase text-gray-500">
//             © {currentYear} {websiteName}
//           </div>
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="w-full lg:w-7/12 p-8 md:p-16 bg-white flex items-center justify-center">
//           <div className="w-full max-w-sm">
//             <header className="mb-8">
//               <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-black">Member Login</h3>
//               <p className="text-gray-400 text-xs font-light">Enter your digital identity to continue.</p>
//             </header>

//             <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
//               <div>
//                 <label className={labelStyle}>Email Address</label>
//                 <input 
//                   {...register("email")} 
//                   placeholder={dummyEmail} 
//                   className={inputStyle} 
//                 />
//                 {errors.email && (
//                   <p className="text-[9px] text-red-500 mt-1 uppercase font-bold tracking-wider">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
              
//               <div>
//                 <label className={labelStyle}>Password</label>
//                 <div className="relative">
//                   <input 
//                     type={showPassword ? "text" : "password"} 
//                     {...register("password")} 
//                     placeholder="••••••••" 
//                     className={inputStyle} 
//                   />
//                   <button 
//                     type="button" 
//                     onClick={() => setShowPassword(!showPassword)} 
//                     className="absolute right-0 bottom-2 text-gray-400 hover:text-black transition-colors"
//                   >
//                     {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-[9px] text-red-500 mt-1 uppercase font-bold tracking-wider">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               <div className="pt-6">
//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting} 
//                   className="group flex items-center justify-between w-full py-3.5 px-6 bg-black text-white hover:bg-zinc-800 transition-all rounded-sm disabled:bg-gray-400"
//                 >
//                   <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
//                     {isSubmitting ? 'Processing...' : 'Sign In'}
//                   </span>
//                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </form>

//             <footer className="mt-10 pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-[9px] text-gray-400 uppercase tracking-widest">New here?</span>
//                 <Link to="/signup" className="text-[9px] font-bold uppercase tracking-widest border-b border-black hover:text-gray-500 transition-all">
//                   Sign Up
//                 </Link>
//               </div>
//               <button 
//                 onClick={() => setIsModalOpen(true)} 
//                 className="text-[9px] font-bold uppercase tracking-widest text-gray-700 hover:text-black"
//               >
//                 Forgot Password?
//               </button>
//             </footer>
//           </div>
//         </div>
//       </div>

//       {/* Modal is also sized to "Normal" */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//           <div className="bg-white w-full max-w-md p-8 rounded-sm shadow-2xl relative">
//             <button 
//               onClick={() => setIsModalOpen(false)} 
//               className="absolute right-4 top-4 text-gray-400 hover:text-black"
//             >
//               <X size={20} />
//             </button>
//             <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Reset Access</h3>
//             <p className="text-gray-400 text-xs mb-6 font-light">Enter your email to receive a recovery link.</p>
//             <form onSubmit={handleForgotPassword} className="space-y-6">
//               <div>
//                 <label className={labelStyle}>Email Address</label>
//                 <input 
//                   type="email" 
//                   required 
//                   className={inputStyle} 
//                   value={forgotEmail} 
//                   onChange={(e) => setForgotEmail(e.target.value)} 
//                   disabled={isForgotLoading}
//                 />
//               </div>
//               <button 
//                 type="submit" 
//                 disabled={isForgotLoading} 
//                 className="w-full py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em]"
//               >
//                 {isForgotLoading ? 'Sending...' : 'Send Recovery Link'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


// // import { useState } from 'react';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { Eye, EyeOff, ArrowRight, X } from 'lucide-react';
// // import { z } from 'zod';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { useForm } from 'react-hook-form';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { useDispatch } from 'react-redux';
// // import { login, forgotPassword } from "../../utils/service/apiService";
// // import { loginSuccess } from "../../utils/slice/authSlice";
// // import { currentYear, dummyEmail, websiteName } from '../../utils/constants';

// // const signInSchema = z.object({
// //   email: z.string().min(1, 'Email is required').email('Invalid email'),
// //   password: z.string().min(6, 'Password must be at least 6 characters')
// // });

// // const Login = () => {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [forgotEmail, setForgotEmail] = useState('');
// //   const [isForgotLoading, setIsForgotLoading] = useState(false);

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ 
// //     resolver: zodResolver(signInSchema) 
// //   });

// //   // Main Sign In Logic
// //   const onSignIn = async (formData) => {
// //     try {
// //       const loginResponse = await login(formData);
// //       const responseData = loginResponse.data;

// //       if (responseData.token) {
// //         localStorage.setItem("token", responseData.token);
// //         dispatch(loginSuccess({ 
// //           user: responseData.user, 
// //           token: responseData.token 
// //         }));
// //         toast.success("Welcome back to MLM.",);
// //         navigate('/');
// //         // setTimeout(() => {
// //         //   navigate('/profile');
// //         // }, 2000);
// //       } else {
// //         toast.error("Authentication failed. Please try again.");
// //       }
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || 'Invalid credentials.');
// //     }
// //   };

// //   // Forgot Password API Integration
// //   const handleForgotPassword = async (e) => {
// //     e.preventDefault();
// //     setIsForgotLoading(true);

// //     try {
// //       await forgotPassword({ email: forgotEmail });
      
// //       toast.info(`A recovery link has been sent to ${forgotEmail}`, {
// //         position: "top-center",
// //         autoClose: 5000,
// //       });
      
// //       setIsModalOpen(false);
// //       setForgotEmail('');
// //       setTimeout(() => {
// //         navigate("/reset-password")
// //       }, 2000);
// //     } catch (err) {
// //       const errorMessage = err.response?.data?.message || 'Failed to send reset link.';
// //       toast.error(errorMessage);
// //     } finally {
// //       setIsForgotLoading(false);
// //     }
// //   };

// //   const inputStyle = "w-full py-3 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm";
// //   const labelStyle = "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mt-4";

// //   return (
// //     <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8 font-sans antialiased text-black">
// //       {/* Toast Container Configuration */}
// //       <ToastContainer 
// //         position="bottom-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         newestOnTop
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="light"
// //       />

// //       <div className="w-full max-w-6xl flex flex-col lg:flex-row border border-gray-100 shadow-2xl rounded-sm overflow-hidden bg-white">
        
// //         {/* Brand Side */}
// //         <div className="w-full lg:w-1/2 bg-black p-8 md:p-12 flex flex-col justify-between text-white min-h-[300px] lg:min-h-[700px]">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase">{websiteName}</h1>
// //             <div className="h-[1px] w-12 bg-white mt-4"></div>
// //           </div>
// //           <div className="space-y-6">
// //             <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-none">Refined Access.</h2>
// //             <p className="text-gray-400 font-light max-w-xs text-base md:text-lg">Experience a curated ecosystem designed for excellence.</p>
// //           </div>
// //           <div className="hidden lg:block text-[10px] tracking-[0.4em] uppercase text-gray-500">© {currentYear} {websiteName}</div>
// //         </div>

// //         {/* Form Side */}
// //         <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 bg-white">
// //           <div className="max-w-md mx-auto">
// //             <header className="mb-12">
// //               <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">Login</h3>
// //               <p className="text-gray-400 text-sm">Please enter your credentials.</p>
// //             </header>

// //             <form onSubmit={handleSubmit(onSignIn)} className="space-y-4">
// //               <div>
// //                 <label className={labelStyle}>Email Address</label>
// //                 <input {...register("email")} placeholder={dummyEmail} className={inputStyle} />
// //                 {errors.email && <p className="text-[10px] text-red-500 mt-1 uppercase font-bold">{errors.email.message}</p>}
// //               </div>
              
// //               <div>
// //                 <label className={labelStyle}>Password</label>
// //                 <div className="relative">
// //                   <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="••••••••" className={inputStyle} />
// //                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-3 text-gray-400 hover:text-black">
// //                     {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
// //                   </button>
// //                 </div>
// //                 {errors.password && <p className="text-[10px] text-red-500 mt-1 uppercase font-bold">{errors.password.message}</p>}
// //               </div>

// //               <div className="pt-10">
// //                 <button type="submit" disabled={isSubmitting} className="group flex items-center justify-between w-full py-4 px-6 bg-black text-white hover:bg-gray-900 transition-all rounded-sm disabled:bg-gray-400">
// //                   <span className="text-xs font-bold uppercase tracking-[0.3em]">{isSubmitting ? 'Processing...' : 'Sign In'}</span>
// //                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
// //                 </button>
// //               </div>
// //             </form>

// //             <footer className="mt-12 pt-8 border-t border-gray-50 space-y-4">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-[11px] text-gray-600 uppercase tracking-widest">Need an account?</span>
// //                 <Link to="/signup" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-all">Sign Up</Link>
// //               </div>
              
// //               <div className="flex flex-col gap-2">
// //                 <button 
// //                   type="button"
// //                   onClick={() => setIsModalOpen(true)}
// //                   className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-700 hover:text-black transition-all"
// //                 >
// //                   Forgot Password?
// //                 </button>
// //               </div>
// //             </footer>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Forgot Password Modal */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
// //           <div className="bg-white w-full max-w-md p-8 rounded-sm shadow-2xl relative">
// //             <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-black">
// //               <X size={20} />
// //             </button>
// //             <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">Reset Password</h3>
// //             <p className="text-gray-400 text-xs mb-6 leading-relaxed">Enter your email and we'll send you a link to get back into your account.</p>
            
// //             <form onSubmit={handleForgotPassword} className="space-y-6">
// //               <div>
// //                 <label className={labelStyle}>Email Address</label>
// //                 <input 
// //                   type="email" 
// //                   required 
// //                   className={inputStyle} 
// //                   value={forgotEmail}
// //                   onChange={(e) => setForgotEmail(e.target.value)}
// //                   placeholder="email@gentlehaus.com"
// //                   disabled={isForgotLoading}
// //                 />
// //               </div>
// //               <button 
// //                 type="submit" 
// //                 disabled={isForgotLoading}
// //                 className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all disabled:bg-gray-400 flex items-center justify-center gap-3"
// //               >
// //                 {isForgotLoading ? 'Sending...' : 'Send Recovery Link'}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Login;