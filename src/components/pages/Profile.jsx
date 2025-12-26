// import React from "react";
// import UserProfile from "../ui/UserProfile";
// import Wallet from "../ui/Wallet"
// import LineChart from "../ui/LineChart"
// import HierachyGraph from '../ui/HierachyGraph'

// const userData = {
//   profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
//   fullName: "Udit Kumar",
//   role: "Admin",
//   location: "Leeds, United Kingdom",
//   personalInfo: {
//     firstName: "Natashia",
//     lastName: "Khaleira",
//     dob: "12-10-1990",
//     email: "info@binary-fusion.com",
//     phone: "(+62) 821 2554-5846",
//     role: "student",
//   },
// };

// // linechart
// const monthlySales = [
//   { month: "Jan", total: 400 },
//   { month: "Feb", total: 300 },
//   { month: "Mar", total: 600 },
//   { month: "Apr", total: 800 },
//   { month: "May", total: 500 },
//   { month: "Jun", total: 900 },
//   { month: "Jul", total: 1100 },
// ];


// // Refer graph data
// const referralData = {
//       name: "Alex (Root)",
//       referredPersons: [
//         { 
//           name: "John", 
//           referredPersons: [
//             { name: "Sarah" }, 
//             { name: "Mike" }
//           ] 
//         },
//         { 
//           name: "Mark", 
//           referredPersons: [
//             { name: "Ryan" }
//           ] 
//         }
//       ]
//     };

// export const Profile = () => {
//   return (
//     // Changed "data" to "user" to match UserProfile props
//     <>
//       <UserProfile user={userData} />
//       <div className='bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row gap-8'>
//          <div className='flex-1 space-y-4'>
//              <h2>Earning and Referal Overview</h2>
//             <LineChart 
//               data={monthlySales} 
//               xKey="month" 
//               yKey="total" 
//               title="Active Users" 
//               lineColor="blue"
//             />
//          </div>
//          <div className='flex-1 space-y-4'>
//            <h2>Referal Hierachy</h2>
//            <HierachyGraph data={referralData} />
//          </div>
//        </div>
//       <Wallet />
//     </>
//   );
// };

// export default Profile;

import React from "react";
import UserProfile from "../ui/UserProfile";
import Wallet from "../ui/Wallet"
import LineChart from "../ui/LineChart"
import HierachyGraph from '../ui/HierachyGraph'

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

// linechart
const monthlySales = [
  { month: "Jan", total: 400 },
  { month: "Feb", total: 300 },
  { month: "Mar", total: 600 },
  { month: "Apr", total: 800 },
  { month: "May", total: 500 },
  { month: "Jun", total: 900 },
  { month: "Jul", total: 1100 },
];


// Refer graph data
const referralData = {
      name: "Alex (Root)",
      referredPersons: [
        { 
          name: "John", 
          referredPersons: [
            { name: "Sarah" }, 
            { name: "Mike" }
          ] 
        },
        { 
          name: "Mark", 
          referredPersons: [
            { name: "Ryan" }
          ] 
        }
      ]
    };

const Profile = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 space-y-8 text-black">
      {/* Top Section: User Info */}
      <UserProfile user={userData} />

      {/* Middle Section: Charts & Hierarchy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-6 tracking-tight">Earnings And Referral Overview</h2>
          <div className="h-[300px]">
             <LineChart data={monthlySales} xKey="month" yKey="total" lineColor="#000" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-6 tracking-tight">Referral Hierarchy</h2>
          <div className="h-[300px] flex items-center justify-center">
            <HierachyGraph data={referralData} />
          </div>
        </div>
      </div>

      {/* Bottom Section: Wallet */}
      <Wallet />
    </div>
  );
};

export default Profile;