import React from "react";
import Features from "./components/ui/FeatureCard";
import ImageShowcase from "./components/ui/ImageShowcase";
import ReturnPolicy from "./components/ui/ReturnPolicy";
import AnnouncementBar from "./components/ui/AnnouncementBar";
import TopAnnouncement from "./components/ui/TopAnnouncement";
import RotatingBanner from "./components/ui/RotatingBanner";
import CoastalEdition from "./components/ui/CoastalEdition ";
import UserProfile from "./components/ui/UserProfile";

export default function App() {
  const userData = {
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  fullName: "udit kumar",
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

  return (
    <div>
      <RotatingBanner />
      <TopAnnouncement />
      <UserProfile user={userData} />
      <AnnouncementBar />
      <ReturnPolicy />
       <CoastalEdition />
       
      <Features />
      <ImageShowcase />
     

      
     
    </div>
  )
}
