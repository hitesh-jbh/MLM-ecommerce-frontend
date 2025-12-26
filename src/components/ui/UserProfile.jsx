import React, { useState, useRef } from "react";
import { z } from "zod";
import StatsDashboard from "./StatsDashboard";

/* ZOD SCHEMA */
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9]+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits"),
  location: z.string().min(2, "Location is required"),
  role: z.string().min(2, "Role is required"),
});

const userSchema = z.object({
  profileImage: z.string().url("Invalid image URL"),
  personalInfo: personalInfoSchema,
});

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(user.profileImage);
  const fileInputRef = useRef(null);

  // Handle text input changes
  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));

    // Clear field error while typing
    setErrors((prev) => ({ ...prev, [key]: "" }));
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
    setUserData({
      ...formData,
      profileImage: imagePreview // Use the preview URL
    });
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
  const { profileImage, personalInfo } = userData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

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
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-sm font-medium text-gray-900">
                    {personalInfo.role}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">
                    {personalInfo.location}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">
                    {personalInfo.email}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Contact</p>
                  <p className="text-sm font-medium text-gray-900">
                    {personalInfo.phone}
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

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.role}
                      onChange={(e) =>
                        handleChange("personalInfo", "role", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.role ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.role && (
                      <p className="text-red-500 text-xs mt-1">{errors.role}</p>
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

        {/* Stats Dashboard */}

        <StatsDashboard />

        {/* Account Items Section */}
        {/* <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Your Account</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {accItem.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`${item.bgColor} min-w-sm p-3 rounded flex-shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;