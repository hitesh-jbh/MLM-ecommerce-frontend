import React, { useState } from "react";
import { z } from "zod";

/*  ZOD SCHEMA  */

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
  profileImage: z.string().url(),
  personalInfo: personalInfoSchema,
});

/*  COMPONENT  */

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  // saved data (header reads from this)
  const [userData, setUserData] = useState(user);

  // draft data (form edits)
  const [formData, setFormData] = useState(user);

  // field errors
  const [errors, setErrors] = useState({});

  const handleChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));

    // clear field error while typing 
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSave = () => {
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

    //  save only if valid
    setUserData(formData);
    setIsEditing(false);
    setErrors({});
  };

  const handleEdit = () => {
    setFormData(userData); // reset draft
    setIsEditing(true);
    setErrors({});
  };

  /*  HEADER DATA (saved only)  */
  const { profileImage, personalInfo } = userData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/*  PROFILE HEADER */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 flex items-center gap-4">
          <img
            src={profileImage}
            alt={fullName}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{fullName}</h2>
            <p className="text-sm text-gray-500">{personalInfo.role}</p>
            <p className="text-sm text-gray-500">{personalInfo.location}</p>
          </div>
        </div>

        {/*  PERSONAL INFORMATION  */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>

            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EditableItem
              label="First Name"
              value={formData.personalInfo.firstName}
              error={errors.firstName}
              isEditing={isEditing}
              onChange={(v) =>
                handleChange("personalInfo", "firstName", v)
              }
            />

            <EditableItem
              label="Last Name"
              value={formData.personalInfo.lastName}
              error={errors.lastName}
              isEditing={isEditing}
              onChange={(v) =>
                handleChange("personalInfo", "lastName", v)
              }
            />

            <EditableItem
              label="Email"
              value={formData.personalInfo.email}
              error={errors.email}
              isEditing={isEditing}
              onChange={(v) =>
                handleChange("personalInfo", "email", v)
              }
            />

            <EditableItem
              label="Phone"
              type="tel"
              value={formData.personalInfo.phone}
              error={errors.phone}
              isEditing={isEditing}
              onChange={(v) =>
                handleChange(
                  "personalInfo",
                  "phone",
                  v.replace(/\D/g, "")
                )
              }
            />

            <EditableItem
              label="Location"
              value={formData.personalInfo.location}
              error={errors.location}
              isEditing={isEditing}
              onChange={(v) =>
                handleChange("personalInfo", "location", v)
              }
            />

            <EditableItem
              label="Role"
              value={formData.personalInfo.role}
              error={errors.role}
              isEditing={isEditing}
              onChange={(v) =>
                handleChange("personalInfo", "role", v)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* EDITABLE FIELD*/

const EditableItem = ({
  label,
  value,
  isEditing,
  onChange,
  error,
  type = "text",
}) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>

    {!isEditing ? (
      <p className="text-sm font-medium">{value}</p>
    ) : (
      <>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md border px-3 py-2 text-sm
            ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </>
    )}
  </div>
);

export default UserProfile;
