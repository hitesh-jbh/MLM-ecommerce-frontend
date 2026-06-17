import { useState, useCallback } from "react";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import debounce from "lodash.debounce";

// Internal Imports
import {
  registerUser,
  checkMobile,
  checkEmail,
  checkReferralCode,
} from "../../utils/service/apiService.js";
import { currentYear, dummyEmail, websiteName } from "../../utils/constants";

// ---------------- VALIDATION SCHEMA ----------------
const signUpSchema = z
  .object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "6+ chars")
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "Need 1 letter & 1 number"),
    confirmPassword: z.string().min(1, "Required"),
    referralCode: z.preprocess(
      (val) => (val === "" ? null : val),
      z.string().length(8).nullable().optional(),
    ),
    gender: z.enum(["Male", "Female", "Other"], {
      errorMap: () => ({ message: "Select gender" }),
    }),
    countryCode: z.string().min(1),
    contact: z
      .string()
      .regex(/^\d+$/, "Numbers only")
      .length(10, "Must be 10 digits"),
    dob: z
      .string()
      .min(1, "Required")
      .refine(
        (date) => {
          const age = new Date().getFullYear() - new Date(date).getFullYear();
          return age >= 18;
        },
        { message: "MUST BE 18+" },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingMobile, setIsCheckingMobile] = useState(false);
  const [isCheckingReferral, setIsCheckingReferral] = useState(false);
  const [referralName, setReferralName] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: { countryCode: "+91" },
  });

  const pwd = watch("password");
  const cpwd = watch("confirmPassword");
  const isMismatch = cpwd && pwd !== cpwd;

  // ---------------- UPDATED REMOTE VALIDATION ----------------

  const checkEmailAvailability = useCallback(
    debounce(async (email) => {
      // 1. Don't check if the email format is already invalid via Zod
      if (!email || errors.email) return;

      setIsCheckingEmail(true);
      try {
        const response = await checkEmail(email);

        // 2. LOGIC FLIP: If "available" is false, the email is taken
        if (response.data && response.data.available === true) {
          setError("email", {
            type: "manual",
            message: "Email already in use",
          });
        } else {
          // 3. Clear errors only if the server confirms it is available
          clearErrors("email");
        }
      } catch (err) {
        console.error("Email verification failed", err);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 600),
    [errors.email, setError, clearErrors],
  );

  const checkMobileAvailability = useCallback(
    debounce(async (mobile, countryCode) => {
      // 1. Only check if it's exactly 10 digits and no other Zod errors
      if (mobile.length !== 10 || errors.contact) return;

      setIsCheckingMobile(true);
      try {
        const fullMobile = `${countryCode}${mobile}`;
        const response = await checkMobile(fullMobile);

        // 2. If "available" is false, the phone number is taken
        if (response.data && response.data.available === true) {
          setError("contact", {
            type: "manual",
            message: "Number already exists",
          });
        } else {
          // 3. Available to use
          clearErrors("contact");
        }
      } catch (err) {
        console.error("Mobile verification failed", err);
      } finally {
        setIsCheckingMobile(false);
      }
    }, 600),
    [errors.contact, setError, clearErrors],
  );

  const verifyReferralCode = useCallback(
    debounce(async (code) => {
      if (!code || code.length < 8) {
        setReferralName("");
        if (code && code.length > 0 && code.length < 8) {
            setError("referralCode", { type: "manual", message: "Must be 8 chars" });
        } else {
            clearErrors("referralCode");
        }
        return;
      }
      setIsCheckingReferral(true);
      try {
        const response = await checkReferralCode(code);
        
        const fName = response.data?.first_name || "";
        const lName = response.data?.last_name || "";
        const fullName = `${fName} ${lName}`.trim() || "Valid Referral";
        
        setReferralName(fullName);
        clearErrors("referralCode");
      } catch (err) {
        setReferralName("");
        setError("referralCode", { error : err, type: "manual", message: "Invalid Referral Code" });
      } finally {
        setIsCheckingReferral(false);
      }
    }, 600),
    [setError, clearErrors]
  );

  const handleSignup = async (data) => {
    setAuthError("");
    // Final check for remote validation errors before submitting
    if (errors.email || errors.contact || errors.referralCode) return;

    try {
      const formattedData = {
        ...data,
        contact: `${data.countryCode}${data.contact}`,
      };
      const response = await registerUser(formattedData);
      if (response.data) {
        toast.success("Account Created!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setAuthError(error.response?.data?.message || "Signup failed.");
    }
  };

  // Shared Styles
  const inputStyle =
    "w-full py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors placeholder:text-gray-400 text-sm md:text-xs pr-8";
  const labelStyle =
    "block text-[10px] md:text-[9px] font-black uppercase tracking-widest text-gray-500 mt-3 md:mt-2";
  const errorStyle =
    "text-[10px] md:text-[9px] text-red-500 font-bold mt-1 uppercase";

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 md:p-6 font-sans antialiased text-black">
      <ToastContainer position="bottom-right" theme="light" autoClose={2000} />

      <div className="w-full max-w-5xl md:h-[90vh] flex flex-col md:flex-row border border-gray-100 shadow-2xl rounded-xl overflow-hidden bg-white">
        {/* LEFT SIDE: Branding (Hidden on mobile) */}
        <div className="hidden md:flex w-5/12 bg-black p-10 flex-col justify-between text-white shrink-0">
          <div>
            <h1 className="text-2xl font-light tracking-[0.3em] uppercase">
              {websiteName}
            </h1>
            <div className="h-[1px] w-10 bg-white mt-3"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-extralight tracking-tight leading-none">
              The Modern Standard.
            </h2>
            <p className="text-gray-400 font-light max-w-xs text-base">
              Join a curated ecosystem designed for excellence.
            </p>
          </div>
          <div className="text-[9px] tracking-[0.4em] uppercase text-zinc-600">
            © {currentYear}
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="w-full md:w-7/12 flex flex-col bg-white overflow-hidden">
          {/* Form Header for Mobile */}
          <div className="md:hidden bg-black text-white p-6">
            <h1 className="text-xl font-light tracking-widest uppercase">
              {websiteName}
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10">
            <div className="max-w-md mx-auto">
              <header className="mb-6 md:mb-4">
                <h3 className="text-sm md:text-xs font-black uppercase tracking-[0.2em]">
                  Create Account
                </h3>
                <p className="text-gray-400 text-[11px] md:text-[10px] uppercase tracking-tighter">
                  Please fill in your information
                </p>
              </header>

              <form
                onSubmit={handleSubmit(handleSignup)}
                className="space-y-2 md:space-y-1"
              >
                {authError && (
                  <div className="p-3 bg-red-50 text-red-600 text-[10px] font-bold uppercase text-center rounded mb-4">
                    {authError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>First Name</label>
                    <input
                      {...register("firstName")}
                      className={inputStyle}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className={errorStyle}>{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Last Name</label>
                    <input
                      {...register("lastName")}
                      className={inputStyle}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className={errorStyle}>{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className={labelStyle}>Email Address</label>
                  <div className="relative">
                    <input
                      {...register("email", {
                        onChange: (e) => checkEmailAvailability(e.target.value),
                      })}
                      placeholder={dummyEmail}
                      className={inputStyle}
                    />
                    {isCheckingEmail && (
                      <Loader2
                        className="absolute right-0 bottom-2 animate-spin text-gray-400"
                        size={14}
                      />
                    )}
                  </div>
                  {errors.email && (
                    <p className={errorStyle}>{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className={labelStyle}>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 bottom-2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {errors.password && (
                      <p className={errorStyle}>{errors.password.message}</p>
                    )}
                  </div>
                  <div className="relative">
                    <label className={labelStyle}>Confirm</label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      className={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-0 bottom-2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                    {errors.confirmPassword ? (
                      <p className={errorStyle}>
                        {errors.confirmPassword.message}
                      </p>
                    ) : isMismatch ? (
                      <p className={errorStyle}>Passwords do not match</p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Gender</label>
                    <select {...register("gender")} className={inputStyle}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className={errorStyle}>{errors.gender.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Date of Birth</label>
                    <input
                      type="date"
                      {...register("dob")}
                      className={inputStyle}
                    />
                    {errors.dob && (
                      <p className={errorStyle}>{errors.dob.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>Contact</label>
                    <div className="flex gap-2 relative">
                      <select
                        {...register("countryCode")}
                        className="w-14 py-2 bg-transparent border-b border-gray-200 outline-none text-sm"
                      >
                        <option value="+91">+91</option>
                      </select>
                      <input
                        {...register("contact", {
                          onChange: (e) =>
                            checkMobileAvailability(e.target.value, getValues("countryCode")),
                        })}
                        maxLength={10}
                        placeholder="0000000000"
                        className={inputStyle}
                      />
                      {isCheckingMobile && (
                        <Loader2
                          className="absolute right-0 bottom-2 animate-spin text-gray-400"
                          size={14}
                        />
                      )}
                    </div>
                    {errors.contact && (
                      <p className={errorStyle}>{errors.contact.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelStyle}>Referral</label>
                    <div className="relative">
                      <input
                        {...register("referralCode", {
                          onChange: (e) => verifyReferralCode(e.target.value)
                        })}
                        maxLength={8}
                        className={inputStyle}
                        placeholder="Optional"
                      />
                      {isCheckingReferral && (
                        <Loader2
                          className="absolute right-0 bottom-2 animate-spin text-gray-400"
                          size={14}
                        />
                      )}
                    </div>
                    {referralName && !errors.referralCode && (
                       <p className="text-[10px] md:text-[9px] text-green-600 font-bold mt-1 uppercase">
                         Referred by: {referralName}
                       </p>
                    )}
                    {errors.referralCode && (
                      <p className={errorStyle}>
                        {errors.referralCode.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-8 md:pt-6">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || isCheckingEmail || isCheckingMobile
                    }
                    className="group flex items-center justify-between w-full py-4 md:py-3.5 px-6 bg-black text-white hover:bg-zinc-900 transition-all rounded disabled:bg-gray-400"
                  >
                    <span className="text-[11px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                      {isSubmitting ? "Processing..." : "Create Account"}
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </form>

              <footer className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">
                  Have an account?
                </span>
                <Link
                  to="/login"
                  className="text-[10px] font-black uppercase border-b-2 border-black pb-0.5 hover:text-zinc-500 transition-all"
                >
                  Sign In
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// import { useState } from "react";
// import { ArrowRight, Eye, EyeOff } from "lucide-react";
// import { z } from "zod";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser } from "../../utils/service/apiService";
// import { currentYear, dummyEmail, websiteName } from "../../utils/constants";

// // ---------------- VALIDATION SCHEMA ----------------
// const signUpSchema = z
//   .object({
//     firstName: z.string().min(2, "Required"),
//     lastName: z.string().min(2, "Required"),
//     email: z.string().email("Invalid email"),
//     password: z
//       .string()
//       .min(6, "6+ chars")
//       .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "Need 1 letter & 1 number"),
//     confirmPassword: z.string().min(1, "Required"),
//     referralCode: z.preprocess(
//       (val) => (val === "" || val === undefined ? null : val),
//       z.string().length(8, "Must be 8 characters").regex(/^[a-zA-Z0-9]+$/).nullable()
//     ),
//     gender: z.enum(["Male", "Female", "Other"], {
//       errorMap: () => ({ message: "Select gender" }),
//     }),
//     countryCode: z.string().min(1),
//     contact: z
//       .string()
//       .regex(/^\d+$/, "Numbers only")
//       .length(10, "Must be 10 digits"),
//     dob: z
//       .string()
//       .min(1, "Required")
//       .refine((date) => {
//         const birthDate = new Date(date);
//         const today = new Date();
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//           age--;
//         }
//         return age >= 18;
//       }, { message: "MUST BE 18+" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "MATCH ERROR",
//     path: ["confirmPassword"],
//   });

// // ---------------- COMPONENT ----------------
// const SignUp = () => {
//   const [authError, setAuthError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     trigger,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(signUpSchema),
//     mode: "onChange",
//     defaultValues: { countryCode: "+91" },
//   });

//   const handleSignup = async (data) => {
//     setAuthError("");
//     try {
//       const formattedData = { ...data, contact: `${data.countryCode}${data.contact}` };
//       const response = await registerUser(formattedData);
//       if (response.data) {
//         toast.success("Success!");
//         setTimeout(() => navigate("/login"), 1500);
//       }
//     } catch (error) {
//       setAuthError(error.response?.data?.message || "Signup failed.");
//     }
//   };

//   const inputStyle = "w-full py-1.5 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors placeholder:text-gray-400 text-xs pr-8";
//   const labelStyle = "block text-[9px] font-black uppercase tracking-widest text-gray-500 mt-2";
//   const errorStyle = "text-[9px] text-red-500 font-bold mt-0.5 uppercase";

//   return (
//     <div className="w-full bg-gray-100 flex items-center justify-center mt-1 font-sans antialiased text-black">
//       <ToastContainer position="bottom-right" theme="light" autoClose={2000} />

//       <div className="w-full max-w-5xl h-[85vh] flex border border-gray-100 shadow-2xl rounded-xl overflow-hidden bg-white">

//         {/* LEFT SIDE (REMAINS) */}
//         <div className="hidden md:flex w-5/12 bg-black p-10 flex-col justify-between text-white shrink-0">
//           <div>
//             <h1 className="text-2xl font-light tracking-[0.3em] uppercase">{websiteName}</h1>
//             <div className="h-[1px] w-10 bg-white mt-3"></div>
//           </div>
//           <div className="space-y-4">
//             <h2 className="text-4xl lg:text-5xl font-extralight tracking-tight leading-none">The Modern Standard.</h2>
//             <p className="text-gray-400 font-light max-w-xs text-base">Join a curated ecosystem designed for excellence.</p>
//           </div>
//           <div className="text-[9px] tracking-[0.4em] uppercase text-zinc-600">© {currentYear}</div>
//         </div>

//         {/* RIGHT SIDE (COMPACTED) */}
//         <div className="w-full md:w-7/12 flex flex-col bg-white overflow-hidden">
//           <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 custom-scrollbar">
//             <div className="max-w-md mx-auto">

//               <header className="mb-4">
//                 <h3 className="text-xs font-black uppercase tracking-[0.2em]">Create Account</h3>
//                 <p className="text-gray-400 text-[11px] uppercase tracking-tighter">Enter your details below</p>
//               </header>

//               <form onSubmit={handleSubmit(handleSignup)} className="space-y-1">
//                 {authError && (
//                   <div className="p-2 bg-red-50 text-red-600 text-[9px] font-bold uppercase mb-2 text-center rounded">
//                     {authError}
//                   </div>
//                 )}

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelStyle}>First Name</label>
//                     <input {...register("firstName")} className={inputStyle} placeholder="John" />
//                     {errors.firstName && <p className={errorStyle}>{errors.firstName.message}</p>}
//                   </div>
//                   <div>
//                     <label className={labelStyle}>Last Name</label>
//                     <input {...register("lastName")} className={inputStyle} placeholder="Doe" />
//                     {errors.lastName && <p className={errorStyle}>{errors.lastName.message}</p>}
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelStyle}>Email Address</label>
//                   <input {...register("email")} placeholder={dummyEmail} className={inputStyle} />
//                   {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="relative">
//                     <label className={labelStyle}>Password</label>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       {...register("password", { onChange: () => { if (watch("confirmPassword")) trigger("confirmPassword"); }})}
//                       className={inputStyle}
//                     />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 bottom-1.5 text-gray-400">
//                       {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
//                     </button>
//                     {errors.password && <p className={errorStyle}>{errors.password.message}</p>}
//                   </div>
//                   <div className="relative">
//                     <label className={labelStyle}>Confirm</label>
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       {...register("confirmPassword", { onChange: () => trigger("confirmPassword") })}
//                       className={inputStyle}
//                     />
//                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 bottom-1.5 text-gray-400">
//                       {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
//                     </button>
//                     {errors.confirmPassword && <p className={errorStyle}>{errors.confirmPassword.message}</p>}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelStyle}>Gender</label>
//                     <select {...register("gender")} className={`${inputStyle}`}>
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Prefer not to say</option>
//                     </select>
//                     {errors.gender && <p className={errorStyle}>{errors.gender.message}</p>}
//                   </div>
//                   <div>
//                     <label className={labelStyle}>Date of Birth</label>
//                     <input type="date" {...register("dob")} className={inputStyle} />
//                     {errors.dob && <p className={errorStyle}>{errors.dob.message}</p>}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelStyle}>Contact</label>
//                     <div className="flex gap-1">
//                       <select {...register("countryCode")} className="w-12 py-1.5 bg-transparent border-b border-gray-200 outline-none text-[10px]">
//                         <option value="+91">+91</option>
//                       </select>
//                       <input {...register("contact")} maxLength={10} placeholder="0000000000" className={inputStyle} />
//                     </div>
//                     {errors.contact && <p className={errorStyle}>{errors.contact.message}</p>}
//                   </div>
//                   <div>
//                     <label className={labelStyle}>Referral (Optional)</label>
//                     <input {...register("referralCode")} maxLength={8} className={inputStyle} />
//                     {errors.referralCode && <p className={errorStyle}>{errors.referralCode.message}</p>}
//                   </div>
//                 </div>

//                 <div className="pt-6">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="group flex items-center justify-between w-full py-3.5 px-6 bg-black text-white hover:bg-zinc-900 transition-all rounded disabled:bg-gray-400"
//                   >
//                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">
//                       {isSubmitting ? "Processing..." : "Create Account"}
//                     </span>
//                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </form>

//               <footer className="mt-2 pt-2 border-t border-gray-50 flex justify-between items-center">
//                 <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Have an account?</span>
//                 <Link to="/login" className="text-[10px] font-black uppercase border-b-2 border-black pb-0.5 hover:text-zinc-500 transition-all">
//                   Sign In
//                 </Link>
//               </footer>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// correct

// import { useState } from "react";
// import { ArrowRight } from "lucide-react";
// import { z } from "zod";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../../utils/service/apiService";
// import { currentYear, dummyEmail, websiteName } from "../../utils/constants";

// const signUpSchema = z
//   .object({
//     firstName: z.string().min(2, "First name is required"),
//     lastName: z.string().min(2, "Last name is required"),
//     email: z.string().email("Invalid email address"),
//     password: z
//       .string()
//       .min(6, "6+ characters")
//       .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "Need 1 letter & 1 number"),
//     confirmPassword: z.string(),
//     referralCode: z.preprocess(
//       (val) => (val === "" || val === undefined ? null : val),
//       z
//         .string()
//         .length(8)
//         .regex(/^[a-zA-Z0-9]+$/)
//         .nullable(),
//     ),
//     gender: z.enum(["Male", "Female", "Other"], {
//       errorMap: () => ({ message: "Select gender" }),
//     }),
//     contact: z.string().min(10, "Contact must be 10 digits").max(15),
//     // dob: z.string().min(1, "Date of birth is required")

//     // change in the age
//     dob: z
//       .string()
//       .min(1, "Date of birth is required")
//       .refine(
//         (date) => {
//           const birthDate = new Date(date);
//           const today = new Date();
//           let age = today.getFullYear() - birthDate.getFullYear();
//           const monthDiff = today.getMonth() - birthDate.getMonth();
//           if (
//             monthDiff < 0 ||
//             (monthDiff === 0 && today.getDate() < birthDate.getDate())
//           ) {
//             age--;
//           }
//           return age >= 16;
//         },
//         { message: "You must be at least 16 years old" },
//       ),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// const SignUp = () => {
//   const [authError, setAuthError] = useState("");
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(signUpSchema),
//   });

//   const dispatch = useDispatch();

//   // Sign Up Logic
//   const handleSignup = async (data) => {
//     setAuthError("");
//     try {
//       const response = await registerUser(data);
//       if (response.data) {
//         toast.success(`Registration Successful!`, {
//           position: "top-center",
//         });

//         if (response.data.referralToken) {
//           toast.info(`Your Referral Token: ${response.data.referralToken}`);
//         }

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (error) {
//       const message =
//         error.response?.data?.message || "Signup failed. Please try again.";
//       setAuthError(message);
//       toast.error(message);
//       console.error("Signup Error:", error);
//     }
//   };

//   const inputStyle =
//     "w-full py-2 bg-transparent border-b border-gray-300 focus:border-black outline-none transition-colors placeholder:text-gray-500 text-sm";
//   const labelStyle =
//     "block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 mt-3";

//   return (
//     // Change this line in your code:
//     <div className="h-screen w-screen overflow-hidden bg-white flex items-center justify-center p-4 md:p-8 font-sans antialiased text-black">
//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <div className="w-full max-w-6xl flex flex-col md:flex-row border border-gray-100 shadow-2xl rounded-sm overflow-hidden bg-white">
//         {/* Brand Side */}
//         <div className="w-full md:w-1/2 bg-black p-12 flex flex-col justify-between text-white ">
//           <div>
//             <h1 className="text-3xl font-light tracking-[0.3em] uppercase">
//               {websiteName}
//             </h1>
//             <div className="h-[1px] w-12 bg-white mt-4"></div>
//           </div>
//           <div className="space-y-6">
//             <h2 className="text-5xl md:text-6xl font-extralight tracking-tight leading-none">
//               The Modern Standard.
//             </h2>
//             <p className="text-gray-400 font-light max-w-xs text-lg">
//               Join a curated ecosystem designed for excellence.
//             </p>
//           </div>
//           <div className="text-[10px] tracking-[0.4em] uppercase text-gray-500">
//             © {currentYear} {websiteName}
//           </div>
//         </div>

//         {/* Form Side */}
//         <div className="w-full md:w-1/2 p-8 md:p-16 bg-white overflow-y-auto max-h-[90vh]">
//           <div className="max-w-md mx-auto">
//             <header className="mb-8">
//               <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-2">
//                 Create Account
//               </h3>
//               <p className="text-gray-400 text-sm">
//                 Please provide your details below.
//               </p>
//             </header>

//             {authError && (
//               <div className="mb-6 text-xs font-bold text-red-500 border-l-2 border-red-500 pl-4 py-1 uppercase tracking-wider">
//                 {authError}
//               </div>
//             )}

//             <form onSubmit={handleSubmit(handleSignup)} className="space-y-2">
//               {/* First Name Section */}
//               <div>
//                 <label className={labelStyle}>First Name</label>
//                 <input
//                   {...register("firstName")}
//                   placeholder="First name"
//                   className={inputStyle}
//                 />
//                 {errors.firstName && (
//                   <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
//                     {errors.firstName.message}
//                   </p>
//                 )}
//               </div>

//               {/* Last Name Section */}
//               <div>
//                 <label className={labelStyle}>Last Name</label>
//                 <input
//                   {...register("lastName")}
//                   placeholder="Last name"
//                   className={inputStyle}
//                 />
//                 {errors.lastName && (
//                   <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
//                     {errors.lastName.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className={labelStyle}>Email Address</label>
//                 <input
//                   {...register("email")}
//                   placeholder={dummyEmail}
//                   className={inputStyle}
//                 />
//                 {errors.email && (
//                   <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelStyle}>Password</label>
//                   <input
//                     type="password"
//                     {...register("password")}
//                     placeholder="••••••••"
//                     className={inputStyle}
//                   />
//                   {errors.password && (
//                     <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className={labelStyle}>Confirm</label>
//                   <input
//                     type="password"
//                     {...register("confirmPassword")}
//                     placeholder="••••••••"
//                     className={inputStyle}
//                   />
//                   {errors.confirmPassword && (
//                     <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
//                       {errors.confirmPassword.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelStyle}>Gender</label>
//                   <select {...register("gender")} className={inputStyle}>
//                     <option value="">Select</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Not Prefer to Say</option>{" "}
//                     {/* value in the database */}
//                   </select>
//                 </div>
//                 <div>
//                   <label className={labelStyle}>Date of Birth</label>
//                   <input
//                     type="date"
//                     {...register("dob")}
//                     className={inputStyle}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className={labelStyle}>Contact Number</label>
//                 <input
//                   {...register("contact")}
//                   placeholder="Phone number"
//                   className={inputStyle}
//                 />
//               </div>

//               {/* NEW: Referral Code Section */}
//               <div>
//                 <div className="flex justify-between items-end">
//                   <label className={labelStyle}>Referral Code</label>
//                   <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
//                     (Optional)
//                   </span>
//                 </div>
//                 <input
//                   {...register("referralCode")}
//                   placeholder="enter referral code"
//                   className={`${inputStyle} uppercase placeholder:normal-case`}
//                   maxLength={8}
//                 />
//                 {errors.referralCode && (
//                   <p className="text-[10px] text-red-500 font-bold uppercase mt-1">
//                     {errors.referralCode.message}
//                   </p>
//                 )}
//               </div>

//               <div className="pt-8">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="group flex items-center justify-between w-full py-4 px-6 bg-black text-white hover:bg-gray-900 transition-all rounded-sm"
//                 >
//                   <span className="text-xs font-bold uppercase tracking-[0.3em]">
//                     {isSubmitting ? "Registering..." : "Sign Up"}
//                   </span>
//                   <ArrowRight
//                     size={18}
//                     className="group-hover:translate-x-1 transition-transform"
//                   />
//                 </button>
//               </div>
//             </form>

//             <footer className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
//               <span className="text-[12px] text-gray-600 uppercase tracking-widest">
//                 Have account?
//               </span>
//               <Link
//                 to="/login"
//                 className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 transition-all"
//               >
//                 Sign In
//               </Link>
//             </footer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
