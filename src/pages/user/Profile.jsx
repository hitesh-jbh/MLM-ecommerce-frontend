import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

// UI Components
import UserProfile from "./UserProfile";
import Wallet from "../../components/ui/Wallet";
import LineChart from "../../components/partials/widget/chart/LineChart";
import HierachyGraph from '../../components/partials/widget/chart/HierachyGraph';

// Logic & Data
import { getProfile, getWallet } from "../../utils/service/apiService";
import { fetcher } from "../../utils/Api/axiosInstance";
import { loginSuccess, logout } from "../../utils/Slice/authSlice";
import { salesData } from "../../utils/Constants";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  
  // SWR for Referral Tree (Refreshes every 60s)
  const { data: referralTreeData, error: treeError, isValidating: isTreeValidating } = useSWR(
    token ? ["/api/referral", token] : null, 
    ([url, t]) => fetcher(url, t),
    { refreshInterval: 60000 }
  );

  // SWR for Wallet Balance (Refreshes every 15s for live updates)
  const { data: walletRes, isValidating: isWalletValidating } = useSWR(
    token ? ["/api/wallet", token] : null,
    ([_, tkn]) => getWallet(tkn).then(res => res.data),
    { refreshInterval: 15000 }
  );

  // Initial Sync: Ensures Redux has the latest user data on mount
  useEffect(() => {
    const syncProfile = async () => {
      const activeToken = token || localStorage.getItem("token");
      if (!activeToken) { navigate("/login"); return; }

      try {
        const profRes = await getProfile(activeToken);
        const userData = profRes.data.user || profRes.data;
        dispatch(loginSuccess({ user: userData, token: activeToken }));
      } catch (err) {
        if (err.response?.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      }
    };
    if (!user) syncProfile();
  }, [token, dispatch, navigate, user]);

  if (!user && !referralTreeData) return (
    <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
      <div className="text-gray-500 font-black uppercase tracking-tighter animate-pulse">Syncing Secure Data...</div>
    </div>
  );

  return (
    <div className="bg-[#F9F9F9] text-black min-h-screen p-4 md:p-8">
      <section className="mb-10">
        <UserProfile user={user} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Performance Analytics */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Performance Analytics</h2>
          <div className="h-[300px] w-full">
            <LineChart data={salesData} xKey="month" yKey="total" lineColor="#000" />
          </div>
        </div>

        {/* Referral Network */}
        <div className="bg-white border border-gray-100 p-8 shadow-sm relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Referral Network</h2>
            {(isTreeValidating || isWalletValidating) && (
              <span className="text-[9px] bg-black text-white px-2 py-1 font-black">LIVE</span>
            )}
          </div>
          <div className="h-[300px] w-full">
            {referralTreeData ? (
              <HierachyGraph data={referralTreeData} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300 text-xs font-bold uppercase">Loading Network...</div>
            )}
          </div>
        </div>
      </div>

      <section className="bg-white border border-gray-100 p-8 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Financial Overview</h2>
        <Wallet balance={walletRes?.balance || user?.walletBalance || 0} />
      </section>
    </div>
  );
};

export default Profile;


// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import useSWR from "swr";

// // UI Components
// import UserProfile from "./UserProfile";
// import Wallet from "../../components/ui/Wallet";
// import LineChart from "../../components/partials/widget/chart/LineChart";
// import HierachyGraph from '../../components/partials/widget/chart/HierachyGraph';

// // Logic & Data
// import { getProfile } from "../../utils/service/apiService";
// import { fetcher } from "../../utils/Api/axiosInstance";
// import { loginSuccess, logout } from "../../utils/Slice/authSlice";
// import { salesData } from "../../utils/Constants";

// const Profile = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, token } = useSelector((state) => state.auth);
  
//   // 1. SWR for Referral Tree - Auto-updates every 30 seconds
//   const { data: referralTreeData, error, isValidating } = useSWR(
//     token ? ["/api/referral/tree", token] : null, 
//     ([url, t]) => fetcher(url, t),
//     { 
//       refreshInterval: 30000, // Polling every 30s
//       revalidateOnFocus: true 
//     }
//   );

//   // 2. Initial Profile Sync
//   useEffect(() => {
//     const syncProfile = async () => {
//       const activeToken = token || localStorage.getItem("token");
//       if (!activeToken) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const profRes = await getProfile(activeToken);
//         dispatch(loginSuccess({ user: profRes.data, token: activeToken }));
//       } catch (err) {
//         if (err.response?.status === 401) {
//           dispatch(logout());
//           navigate("/login");
//         }
//       }
//     };
//     syncProfile();
//   }, [token, dispatch, navigate]);

//   if (!user && !referralTreeData) return (
//     <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
//       <div className="text-gray-500 font-medium animate-pulse">Establishing Secure Connection...</div>
//     </div>
//   );

//   return (
//     <div className="bg-[#F9F9F9] text-black min-h-screen p-4 md:p-8">
      
//       {/* Identity Section */}
//       <section className="mb-10">
//         <UserProfile user={user} />
//       </section>

//       {/* DASHBOARD GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        
//         {/* Performance Analytics */}
//         <div className="bg-white border border-gray-100 p-8 shadow-sm">
//           <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
//             Performance Analytics
//           </h2>
//           <div className="h-[300px] w-full">
//             <LineChart data={salesData} xKey="month" yKey="total" lineColor="#000" />
//           </div>
//         </div>

//         {/* Network Hierarchy - With SWR Loading Indicator */}
//         <div className="bg-white border border-gray-100 p-8 shadow-sm relative">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
//               Referral Network
//             </h2>
//             {/* Small indicator showing background sync */}
//             {isValidating && (
//               <span className="text-[10px] text-blue-500 font-bold animate-pulse">SYNCING...</span>
//             )}
//           </div>
          
//           <div className="h-[300px] w-full">
//             {referralTreeData ? (
//               <HierachyGraph data={referralTreeData} />
//             ) : error ? (
//               <div className="flex items-center justify-center h-full text-red-400 text-xs">
//                 Failed to load network.
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-300 text-sm animate-pulse">
//                 Loading Tree...
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Financial Section */}
//       <section className="bg-white border border-gray-100 p-8 shadow-sm">
//         <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
//           Account Balance
//         </h2>
//         <Wallet balance={user?.walletBalance || 0} />
//       </section>
//     </div>
//   );
// };

// export default Profile;

