import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react"; // Optional: for a nice copy button
import StatsDashboard from "../../components/ui/StatsDashboard";

const UserProfile = ({ user }) => {
  const mapUserToState = (u) => ({
    profileImage: u?.imageUrl || "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
    firstName: u?.first_name || u?.firstName || "",
    lastName: u?.last_name || u?.lastName || "",
    email: u?.email || "",
    contact: u?.contact || "", 
    rank: u?.rank || "Rookie",
    dob: u?.dob ? u.dob.split('T')[0] : "Not specified",
    referralCode: u?.referralCode || u?.referral_code || "N/A" // Added field
  });

  const [userData, setUserData] = useState(mapUserToState(user));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUserData(mapUserToState(user));
  }, [user]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { profileImage, firstName, lastName, email, rank, dob, contact, referralCode } = userData;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="w-full bg-[#F9F9F9] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10">
          <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8">
            
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <img
                src={profileImage}
                alt={fullName}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>

            {/* Info Container */}
            <div className="flex-1 w-full overflow-hidden">
              <h1 className="text-2xl md:text-4xl font-black text-[#001f3f] mb-8 uppercase tracking-tight text-center xl:text-left">
                {fullName || "User Name"}
              </h1>
              
              {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 5 on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
                
                {/* 1. Rank */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">Rank</span>
                  <span className="text-sm font-bold text-gray-700 uppercase">{rank}</span>
                </div>
                
                {/* 2. Birth Date */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">Birth Date</span>
                  <span className="text-sm font-bold text-gray-700">{dob}</span>
                </div>

                {/* 3. Referral Code (New Field) */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">Referral Code</span>
                  <div className="flex items-center gap-2 group cursor-pointer" onClick={() => handleCopy(referralCode)}>
                    <span className="text-sm font-bold text-blue-600 uppercase">{referralCode}</span>
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />}
                  </div>
                </div>
                
                {/* 4. Email Address */}
                <div className="flex flex-col gap-1 overflow-hidden sm:col-span-2 lg:col-span-1">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">Email Address</span>
                  <span className="text-sm font-bold text-gray-700 break-all">
                    {email}
                  </span>
                </div>
                
                {/* 5. Verified Contact */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">Verified Contact</span>
                  <span className="text-sm font-bold text-gray-700">{contact}</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <StatsDashboard />
      </div>
    </div>
  );
};

export default UserProfile;