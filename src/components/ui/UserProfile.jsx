// import React, { useState, useRef, useEffect } from "react";
// import { z } from "zod";
// import StatsDashboard from "./StatsDashboard";
// import ProfileMenuCard from "./ProfileMenuCard";
// import { profileMenuIcon } from "../../utils/Constants";

// /* 1. REFINED ZOD SCHEMA to match backend structure */
// const personalInfoSchema = z.object({
//   firstName: z.string().min(2, "First name is required"),
//   lastName: z.string().min(2, "Last name is required"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone must be at least 10 digits"),
//   location: z.string().min(2, "Location is required"),
//   rank: z.string().optional(),
// });

// const userSchema = z.object({
//   profileImage: z.string(),
//   personalInfo: personalInfoSchema,
// });

// const UserProfile = ({ user }) => {
//   // 2. Map incoming API user to the local UI state structure
//   const mapUserToState = (u) => ({
//     profileImage: u?.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
//     personalInfo: {
//       firstName: u?.firstName || "",
//       lastName: u?.lastName || "",
//       email: u?.email || "",
//       phone: u?.contact || "", // Mapping 'contact' from API to 'phone'
//       location: u?.location || "Not specified",
//       rank: u?.role || "Member",
//     },
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState(mapUserToState(user));
//   const [formData, setFormData] = useState(mapUserToState(user));
//   const [errors, setErrors] = useState({});
//   const [imagePreview, setImagePreview] = useState(userData.profileImage);
//   const fileInputRef = useRef(null);

//   // Synchronize state if user prop changes
//   useEffect(() => {
//     const updated = mapUserToState(user);
//     setUserData(updated);
//     setFormData(updated);
//     setImagePreview(updated.profileImage);
//   }, [user]);

//   const handleChange = (section, key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [key]: value },
//     }));
//     if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       setErrors({ profileImage: "Image must be under 2MB" });
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//       setFormData(prev => ({ ...prev, profileImage: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSave = () => {
//     const result = userSchema.safeParse(formData);
//     if (!result.success) {
//       const fieldErrors = {};
//       result.error.issues.forEach((issue) => {
//         fieldErrors[issue.path[issue.path.length - 1]] = issue.message;
//       });
//       setErrors(fieldErrors);
//       return;
//     }
//     // In a real app, you would call an API update here
//     setUserData(formData);
//     setIsEditing(false);
//     setErrors({});
//   };

//   const { profileImage, personalInfo } = userData;

//   return (
//     <div className="w-full bg-transparent">
//       <div className="max-w-6xl mx-auto space-y-6">
        
//         {/* PROFILE HEADER CARD */}
//         <div className="bg-white rounded-sm border border-gray-100 shadow-sm p-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
//             <div className="flex flex-col md:flex-row items-center gap-8">
//               <div className="relative group">
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full object-cover ring-4 ring-gray-50 shadow-inner"
//                 />
//               </div>
              
//               <div className="text-center md:text-left space-y-2">
//                 <h1 className="text-3xl font-light tracking-tight text-black uppercase">
//                   {personalInfo.firstName} {personalInfo.lastName}
//                 </h1>
//                 <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
//                   <span className="bg-gray-100 px-3 py-1 rounded-full text-black">{personalInfo.rank}</span>
//                   <span className="py-1">{personalInfo.location}</span>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsEditing(true)}
//               className="w-full md:w-auto px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all rounded-sm"
//             >
//               Edit Profile
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 pt-8 border-t border-gray-50">
//             <div>
//               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
//               <p className="text-sm font-medium text-black">{personalInfo.email}</p>
//             </div>
//             <div>
//               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
//               <p className="text-sm font-medium text-black">{personalInfo.phone}</p>
//             </div>
//             <div>
//               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Member ID</p>
//               <p className="text-sm font-medium text-black">GH-{user?.id?.toString().slice(-6) || 'N/A'}</p>
//             </div>
//           </div>
//         </div>

//         {/* STATS & MENU SECTION */}
//         <section className="grid grid-cols-1 gap-6">
//           <StatsDashboard />
//           <ProfileMenuCard sections={profileMenuIcon} pageTitle="Account Settings" />
//         </section>

//         {/* EDIT MODAL */}
//         {isEditing && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
//             <div className="bg-white rounded-sm shadow-2xl max-w-lg w-full overflow-hidden">
//               <div className="p-8">
//                 <h2 className="text-lg font-bold uppercase tracking-widest mb-6">Modify Profile</h2>
                
//                 <div className="space-y-5">
//                   {/* Image Upload */}
//                   <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-sm">
//                     <img src={imagePreview} className="w-16 h-16 rounded-full object-cover border" alt="Preview" />
//                     <input 
//                       type="file" 
//                       onChange={handleFileChange} 
//                       className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-black file:text-white" 
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-[10px] font-bold uppercase text-gray-500">First Name</label>
//                       <input 
//                         type="text" 
//                         value={formData.personalInfo.firstName} 
//                         onChange={(e) => handleChange("personalInfo", "firstName", e.target.value)}
//                         className="w-full border-b py-2 outline-none focus:border-black transition-colors text-sm"
//                       />
//                       {errors.firstName && <span className="text-[9px] text-red-500 font-bold uppercase">{errors.firstName}</span>}
//                     </div>
//                     <div>
//                       <label className="text-[10px] font-bold uppercase text-gray-500">Last Name</label>
//                       <input 
//                         type="text" 
//                         value={formData.personalInfo.lastName} 
//                         onChange={(e) => handleChange("personalInfo", "lastName", e.target.value)}
//                         className="w-full border-b py-2 outline-none focus:border-black transition-colors text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="text-[10px] font-bold uppercase text-gray-500">Location</label>
//                     <input 
//                       type="text" 
//                       value={formData.personalInfo.location} 
//                       onChange={(e) => handleChange("personalInfo", "location", e.target.value)}
//                       className="w-full border-b py-2 outline-none focus:border-black transition-colors text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-4 mt-10">
//                   <button onClick={() => setIsEditing(false)} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">Cancel</button>
//                   <button onClick={handleSave} className="bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800">Update Profile</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;






import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import StatsDashboard from "./StatsDashboard";
import ProfileMenuCard from "./ProfileMenuCard";
import { profileMenuIcon } from "../../utils/Constants";
import { Contact } from "lucide-react";
// import { user } from "../Store/data"

/* ZOD SCHEMA */
// const personalInfoSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   phone: z
//     .string()
//     .regex(/^[0-9]+$/, "Phone number must contain only digits")
//     .length(10, "Phone number must be exactly 10 digits"),
//   location: z.string().min(2, "Location is required"),
//   // role: z.string().min(2, "Role is required"),
// });
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  // rank: z.string().optional(),
});

const userSchema = z.object({
  profileImage: z.string().url("Invalid image URL"),
  personalInfo: personalInfoSchema,
});

const UserProfile = ({ user }) => {

  // 2. Map incoming API user to the local UI state structure
  const mapUserToState = (u) => ({
    profileImage: u?.profileImage || "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
      firstName: u?.firstName || "",
      lastName: u?.lastName || "",
      email: u?.email || "",
      contact: u?.contact || "", // Map 'contact' from API to 'phone'
      location: u?.location || "Not specified",
      rank: u?.rank || "Member",
      dob: u?.dob || "Not specified", // Map 'dob' directly into personalInfo
    
  });

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mapUserToState(user));
  const [formData, setFormData] = useState(mapUserToState(user));
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(user.profileImage);
  const fileInputRef = useRef(null);

  // Synchronize state if user prop changes
  useEffect(() => {
    const updated = mapUserToState(user);
    setUserData(updated);
    setFormData(updated);
    setImagePreview(updated.profileImage);
  }, [user]);

  // Handle text input changes
  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    // Clear field error while typing
    // setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ 
        ...prev, 
        profileImage: "Please select an image file" 
      }));
      return;
    }

    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ 
        ...prev, 
        profileImage: "Image size should be less than 5MB" 
      }));
      return;
    }

    // Clear any previous error
    setErrors((prev) => ({ ...prev, profileImage: "" }));

    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setImagePreview(dataUrl);
      // Update formData with the data URL
      setFormData((prev) => ({
        ...prev,
        profileImage: dataUrl
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // First, validate with Zod
    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[issue.path.length - 1];
        fieldErrors[fieldName] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Save the data
    // setUserData({
    //   ...formData,
    //   profileImage: imagePreview // Use the preview URL
    // });
    setUserData(formData);
    setIsEditing(false);
    setErrors({});
  };



  const handleEdit = () => {
    // Reset form to current user data
    setFormData(userData);
    setImagePreview(userData.profileImage);
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    // Reset preview to original image
    setImagePreview(userData.profileImage);
    setIsEditing(false);
    setErrors({});
  };

  // Clear the file input
  const handleClearImage = () => {
    setImagePreview(userData.profileImage);
    setFormData((prev) => ({
      ...prev,
      profileImage: userData.profileImage
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors((prev) => ({ ...prev, profileImage: "" }));
  };

  /* HEADER DATA (saved only) */
  // const { profileImage, personalInfo } = userData;
  // const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
  const { profileImage, firstName, lastName, email, gender, rank, dob, contact } = userData;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* PROFILE HEADER */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{fullName}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-700">Rank</p>
                  <p className="text-sm font-medium text-gray-900">
                    {/* {personalInfo.rank} */}
                    {rank}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-700">D.O.B</p>
                  <p className="text-sm font-medium text-gray-900">
                    {dob}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-700">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {email}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-700">Contact</p>
                  <p className="text-sm font-medium text-gray-900">
                    {contact}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end space-y-4">
              <div className="relative">
                <img
                  src={profileImage}
                  alt={fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* EDIT FORM MODAL */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Edit Profile
                </h2>

                <div className="space-y-4">
                  {/* Profile Image Upload with Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </label>
                    
                    {/* Current Image Preview */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileChange}
                          className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            ${errors.profileImage ? "border-red-500" : ""}`}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG up to 5MB
                        </p>
                        {imagePreview !== userData.profileImage && (
                          <button
                            type="button"
                            onClick={handleClearImage}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            Clear new image
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {errors.profileImage && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.profileImage}
                      </p>
                    )}
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.firstName}
                      onChange={(e) =>
                        handleChange("personalInfo", "firstName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.lastName}
                      onChange={(e) =>
                        handleChange("personalInfo", "lastName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        handleChange("personalInfo", "email", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) =>
                        handleChange("personalInfo", "phone", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.location}
                      onChange={(e) =>
                        handleChange("personalInfo", "location", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.location ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        <section className="py-2">
          <ProfileMenuCard
            sections={profileMenuIcon} 
            pageTitle="Your Account" 
          />
        </section>

        {/* Stats Dashboard */}
        <StatsDashboard />
      </div>
    </div>
  );
};

export default UserProfile;