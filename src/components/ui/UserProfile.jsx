import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import StatsDashboard from "./StatsDashboard";
import ProfileMenuCard from "./ProfileMenuCard";
import { profileMenuIcon } from "../../utils/Constants";

// Define the schema inside or import it to ensure handleSave works
const userSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email(),
  contact: z.string().min(10, "Invalid phone"),
  gender: z.string(),
  dob: z.string(),
});

const UserProfile = ({ user }) => {
  // 1. Map incoming SQL snake_case to Frontend camelCase
  const mapUserToState = (u) => ({
    profileImage: u?.profileImage || "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    firstName: u?.first_name || u?.firstName || "",
    lastName: u?.last_name || u?.lastName || "",
    email: u?.email || "",
    contact: u?.contact || "", 
    rank: u?.role || u?.rank || "Member",
    dob: u?.dob ? u.dob.split('T')[0] : "Not specified", 
    gender: u?.gender || "Male"
  });

  const [userData, setUserData] = useState(mapUserToState(user));
  const [formData, setFormData] = useState(mapUserToState(user));
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(userData.profileImage);

  // Sync state if Redux user updates (e.g., after an edit)
  useEffect(() => {
    const updated = mapUserToState(user);
    setUserData(updated);
    setFormData(updated);
    setImagePreview(updated.profileImage);
  }, [user]);

  // Handle Input Changes (Simplified for non-nested state)
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const { profileImage, firstName, lastName, email, rank, dob, contact } = userData;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="w-full bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* PROFILE HEADER */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
            
            {/* Avatar Section */}
            <div className="relative">
              <img
                src={imagePreview}
                alt={fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 w-full text-center lg:text-left">
              <h1 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                {fullName}
                Ryan Walker
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Rank</p>
                  <p className="text-sm text-black uppercase">{rank}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Birth Date</p>
                  <p className="text-sm font-medium text-gray-700">{dob}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Email Address</p>
                  <p className="text-sm font-medium text-gray-700">{email}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">Verified Contact</p>
                  <p className="text-sm font-medium text-gray-700">{contact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <section className="py-2">
          <ProfileMenuCard
            sections={profileMenuIcon} 
            pageTitle="Account Management" 
          />
        </section>

        {/* Analytics Section */}
        <StatsDashboard />
      </div>
    </div>
  );
};

export default UserProfile;