import React, { useState } from "react";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // 🔥 Later you can send formData to API here
    console.log("Saved Data:", formData);
  };

  const {
    profileImage,
    fullName,
    role,
    location,
    personalInfo,
  } = formData;

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ===== Profile Header ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
          <img
            src={profileImage}
            alt={fullName}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {fullName}
            </h2>
            <p className="text-sm text-gray-500">{role}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>

        {/* ===== Personal Information ===== */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-orange-500 text-white text-sm px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Save
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EditableItem
              label="First Name"
              value={personalInfo.firstName}
              isEditing={isEditing}
              onChange={(val) =>
                handleChange("personalInfo", "firstName", val)
              }
            />

            <EditableItem
              label="Last Name"
              value={personalInfo.lastName}
              isEditing={isEditing}
              onChange={(val) =>
                handleChange("personalInfo", "lastName", val)
              }
            />

            <EditableItem
              label="Date of Birth"
              value={personalInfo.dob}
              isEditing={isEditing}
              onChange={(val) =>
                handleChange("personalInfo", "dob", val)
              }
            />

            <EditableItem
              label="Email Address"
              value={personalInfo.email}
              isEditing={isEditing}
              onChange={(val) =>
                handleChange("personalInfo", "email", val)
              }
            />

            <EditableItem
              label="Phone Number"
              value={personalInfo.phone}
              isEditing={isEditing}
              onChange={(val) =>
                handleChange("personalInfo", "phone", val)
              }
            />

            <EditableItem
              label="User Role"
              value={personalInfo.role}
              isEditing={isEditing}
              onChange={(val) =>
                handleChange("personalInfo", "role", val)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditableItem = ({ label, value, isEditing, onChange }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>

    {!isEditing ? (
      <p className="text-sm font-medium text-gray-900">{value}</p>
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-md
          border
          border-gray-300
          px-3
          py-2
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-orange-500
        "
      />
    )}
  </div>
);

export default UserProfile;
