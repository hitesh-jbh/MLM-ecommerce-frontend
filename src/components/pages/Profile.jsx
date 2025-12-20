import React from "react";
import UserProfile from "../ui/UserProfile";

const userData = {
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  fullName: "Udit Kumar",
  role: "Admin",
  location: "Leeds, United Kingdom",
  personalInfo: {
    firstName: "Natashia",
    lastName: "Khaleira",
    dob: "12-10-1990",
    email: "info@binary-fusion.com",
    phone: "(+62) 821 2554-5846",
    role: "student",
  },
};

export const Profile = () => {
  return (
    // Changed "data" to "user" to match UserProfile props
    <UserProfile user={userData} />
  );
};

export default Profile;