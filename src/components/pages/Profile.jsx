import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// UI Components
import UserProfile from "../ui/UserProfile";
import Wallet from "../ui/Wallet";
import LineChart from "../ui/LineChart";
import HierachyGraph from '../ui/HierachyGraph';

// Logic & Data
import { getProfile } from "../../utils/Service/apiService";
import { loginSuccess, logout } from "../../utils/Slice/authSlice";
import { salesData, treeData } from "../../utils/Constants";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreshProfile = async () => {
      // Check local storage if Redux token is gone (on refresh)
      const activeToken = token || localStorage.getItem("token");

      if (activeToken) {
        try {
          // Identify user by matching the token to the DB ID
          const response = await getProfile(activeToken);
          
          dispatch(loginSuccess({
            user: response.data, // Data directly from your 'users' table
            token: activeToken
          }));
        } catch (error) {
          console.error("Session expired");
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    console.log(user);

    fetchFreshProfile();
  }, [token, dispatch]);

  if (loading) return <div>Syncing with Database...</div>;
  if (!user) return navigate("/login");

  return (
    <div className="bg-[#F9F9F9] min-h-screen p-4 md:p-10 space-y-10 text-black">
      
      {/* HEADER SECTION: Displays User Identity found by Token */}
      <section className="animate-in fade-in duration-700">
        <UserProfile user={user} />
      </section>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Sales/Earnings Analytics */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Performance Analytics
          </h2>
          <div className="h-[300px] w-full">
            <LineChart data={salesData} xKey="month" yKey="total" lineColor="#000" />
          </div>
        </div>

        {/* Network Hierarchy */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Referral Network
          </h2>
          <div className="h-[300px] w-full">
            <HierachyGraph data={treeData} />
          </div>
        </div>
      </div>

      {/* FINANCIAL SECTION */}
      <section className="bg-white border border-gray-100 p-8 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
          Account Balance
        </h2>
        <Wallet balance={user.walletBalance || 0} />
      </section>

    </div>
  );
};

export default Profile;















// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import UserProfile from "../ui/UserProfile";
// import Wallet from "../ui/Wallet";
// import LineChart from "../ui/LineChart";
// import HierachyGraph from '../ui/HierachyGraph';
// import { getProfile } from "../../utils/Service/apiService";
// import { loginSuccess } from "../../utils/Slice/authSlice";
// import { salesData, treeData } from "../../utils/Constants";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const monthlySales = salesData;
//   const referralData = treeData;
  
//   // 1. Get user and token from your Redux authSlice
//   const { user, token } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(!user);

//   useEffect(() => {
//     const fetchFreshProfile = async () => {
//       // 2. If we have a token but no user object (e.g., on page refresh)
//       if (token && !user) {
//         try {
//           // 3. Use the token to fetch the profile from Render backend
//           const response = await getProfile(token);
          
//           // 4. Update Redux so other components (like Nav) also get the data
//           dispatch(loginSuccess({
//             user: response.data,
//             token: token
//           }));
//         } catch (error) {
//           console.error("Profile fetch failed:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchFreshProfile();
//   }, [token, user, dispatch]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white text-black uppercase tracking-widest text-xs font-bold">
//         Loading Refined Profile...
//       </div>
//     );
//   }

//   // 5. If no user is found after loading, show a prompt to login
//   if (!user) {
//     return <div className="p-20 text-center">Please sign in to view your profile.</div>;
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-8 space-y-8 text-black">
//       {/* 6. Pass the real user object (id, email, level, role) to the UI */}
//       <UserProfile user={user} />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-bold mb-6 tracking-tight">Earnings And Referral Overview</h2>
//           <div className="h-[300px] w-full">
//              {/* You can eventually pass real earnings data here from the user object */}
//              <LineChart data={monthlySales} xKey="month" yKey="total" lineColor="#000" />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-bold mb-6 tracking-tight">Referral Hierarchy</h2>
//           <div className="h-[300px] w-full flex items-center justify-center">
//             {/* Pass referral data based on the user's level from the API */}
//             <HierachyGraph data={referralData} />
//           </div>
//         </div>
//       </div>

//       {/* 7. Wallet can also be updated to use user.walletBalance if provided by your API */}
//       <Wallet />
//     </div>
//   );
// };

// export default Profile;
















// import React from "react";
// import UserProfile from "../ui/UserProfile";
// import Wallet from "../ui/Wallet"
// import LineChart from "../ui/LineChart"
// import HierachyGraph from '../ui/HierachyGraph';
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../utils/Slice/authSlice"
// import {user} from "../Store/data"

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

// const Profile = () => {

//   // For GetProfile
//   const dispatch = useDispatch();
  
//   // 1. Get user and token from your Redux authSlice
//   const { user, token } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(!user);

//   useEffect(() => {
//     const fetchFreshProfile = async () => {
//       // 2. If we have a token but no user object (e.g., on page refresh)
//       if (token && !user) {
//         try {
//           // 3. Use the token to fetch the profile from Render backend
//           const response = await getProfile(token);
          
//           // 4. Update Redux so other components (like Nav) also get the data
//           dispatch(loginSuccess({
//             user: response.data,
//             token: token
//           }));
//         } catch (error) {
//           console.error("Profile fetch failed:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//       }
//     };

//     fetchFreshProfile();
//   }, [token, user, dispatch]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white text-black uppercase tracking-widest text-xs font-bold">
//         Loading Refined Profile...
//       </div>
//     );
//   }

//   // 5. If no user is found after loading, show a prompt to login
//   if (!user) {
//     return <div className="p-20 text-center">Please sign in to view your profile.</div>;
//   }


//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-8 space-y-8 text-black">
//       {/* Top Section: User Info */}
//       <UserProfile user={user} />

//       {/* Middle Section: Charts & Hierarchy */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-bold mb-6 tracking-tight">Earnings And Referral Overview</h2>
//           <div className="h-[300px]">
//              <LineChart data={monthlySales} xKey="month" yKey="total" lineColor="#000" />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-lg font-bold mb-6 tracking-tight">Referral Hierarchy</h2>
//           <div className="h-[300px] flex items-center justify-center">
//             <HierachyGraph data={referralData} />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section: Wallet */}
//       <Wallet />
//     </div>
//   );
// };

// export default Profile;

